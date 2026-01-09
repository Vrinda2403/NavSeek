import { useRef, useCallback, useEffect } from 'react';

export const useVisionEngine = (stateHooks) => {
  const {
    setIsNavigating,
    setDistance,
    setActiveTab,
    setSettings,
    isListening
  } = stateHooks;

  const recognition = useRef(null);
  const audioCtx = useRef(null);
  const isSpeakingRef = useRef(false);
  const lastCommandRef = useRef('');

  // --- 1. SPEECH OUTPUT (TTS) ---
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;

    utterance.onstart = () => { isSpeakingRef.current = true; };
    utterance.onend = () => { isSpeakingRef.current = false; };

    window.speechSynthesis.speak(utterance);
  }, []);

  // --- 2. COMMAND PROCESSOR ---
  // We keep this separate so we don't have to restart the mic to update logic
  const processCommand = useCallback((raw) => {
    const cmd = raw.toLowerCase().replace(/[^\w\s]/g, '').trim();
    if (!cmd || cmd === lastCommandRef.current) return;
    
    lastCommandRef.current = cmd;
    console.log('Processed Command:', cmd);

    if (cmd.includes('start')) {
      setIsNavigating(true);
      speak('Navigation started');
    } else if (cmd.includes('stop')) {
      setIsNavigating(false);
      speak('Navigation stopped');
    } else if (cmd.includes('setting')) {
      setActiveTab('settings');
      speak('Opening settings');
    } else if (cmd.includes('home')) {
      setActiveTab('home');
      speak('Home screen');
    } else if (cmd.includes('profile')) {
      setActiveTab('profile');
      speak('Profile opened');
    } else if (cmd.includes('safety on')) {
      setSettings(s => ({ ...s, safety: true }));
      speak('Safety alerts enabled');
    } else if (cmd.includes('safety off')) {
      setSettings(s => ({ ...s, safety: false }));
      speak('Safety alerts disabled');
    } else if (cmd.includes('distance') || cmd.includes('range')) {
      setDistance(d => {
        let val = d;
        if (cmd.includes('increase') || cmd.includes('up')) val = Math.min(d + 2, 20);
        else if (cmd.includes('decrease') || cmd.includes('down')) val = Math.max(d - 2, 2);
        speak(`Range set to ${val} meters`);
        return val;
      });
    }
    
    // Clear last command after 2 seconds to allow repeats if desired
    setTimeout(() => { lastCommandRef.current = ''; }, 2000);
  }, [setActiveTab, setDistance, setIsNavigating, setSettings, speak]);

  // --- 3. RECOGNITION LIFECYCLE ---
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported in this browser.");
      return;
    }

    if (!recognition.current) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';
    }

    recognition.current.onresult = (event) => {
      if (isSpeakingRef.current) return;
      const result = event.results[event.results.length - 1][0].transcript;
      processCommand(result);
    };

    recognition.current.onend = () => {
      // Auto-restart logic
      if (isListening && !isSpeakingRef.current) {
        try { recognition.current.start(); } catch (e) {}
      }
    };

    if (isListening) {
      try { recognition.current.start(); } catch (e) {}
    } else {
      recognition.current.stop();
    }

    return () => {
      if (recognition.current) {
        recognition.current.onresult = null;
        recognition.current.onend = null;
        recognition.current.stop();
      }
    };
  }, [isListening, processCommand]);

  return { speak };
};