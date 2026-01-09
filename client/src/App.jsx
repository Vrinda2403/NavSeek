import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Settings, Info, User, Mic, MicOff, Camera } from 'lucide-react';

import { useVisionEngine } from './hooks/useVisionEngine';
import Dashboard from './components/Dashboard';
import SettingsView from './components/SettingsView';
import AboutView from './components/AboutView';
import ProfileView from './components/profileView';
import CameraVision from './components/CameraVision'; // New Component

export default function AssistiveNavApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [isNavigating, setIsNavigating] = useState(false);
  const [distance, setDistance] = useState(5);
  const [isListening, setIsListening] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [settings, setSettings] = useState({ 
    safety: true, social: true, nature: false, vehicle: true 
  });

  const engine = useVisionEngine({ 
    setIsNavigating, setDistance, setActiveTab, 
    setSettings, settings, distance, isListening 
  });

  // Handle first interaction to unlock Audio/Speech
  const handleInitialTap = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsListening(true);
      engine.speak("System initialized. Voice control active. Tap the top of the screen anytime to toggle the microphone.");
      if (window.navigator.vibrate) window.navigator.vibrate([50, 50, 50]);
    }
  };

  const toggleMic = (e) => {
    e.stopPropagation(); // Prevent triggering initial tap twice
    const nextState = !isListening;
    setIsListening(nextState);
    engine.speak(nextState ? "Microphone on" : "Microphone off");
    if (window.navigator.vibrate) window.navigator.vibrate(nextState ? 100 : 300);
  };

  return (
    <div 
      className="min-h-screen bg-black text-white font-sans overflow-x-hidden select-none"
      onClick={handleInitialTap}
    >
      {/* MASSIVE MIC TOGGLE AREA (Top 25% of screen) */}
      <header 
        onClick={toggleMic}
        className={`fixed top-0 left-0 right-0 z-50 p-6 h-32 flex justify-between items-center transition-colors border-b border-white/10 ${isListening ? 'bg-red-950/20' : 'bg-black'}`}
      >
        <div className="flex flex-col">
          <span className="text-yellow-400 font-black italic text-2xl tracking-tighter uppercase">NavSeek</span>
          <span className="text-[10px] text-zinc-500 font-bold tracking-widest mt-1">
            {isListening ? "LISTENING..." : "TAP TOP TO START MIC"}
          </span>
        </div>
        
        <div className={`p-5 rounded-full shadow-2xl transition-all ${isListening ? 'bg-red-600 animate-pulse' : 'bg-zinc-800'}`}>
          {isListening ? <Mic size={32} /> : <MicOff size={32} />}
        </div>
      </header>

      {/* CONTENT AREA */}
      <main className="max-w-md mx-auto pt-36 pb-32 px-6">
        <Suspense fallback={<div className="text-yellow-400 font-black">SYNCING...</div>}>
          <AnimatePresence mode="wait">
            {/* Show Camera if navigating, else show Tabs */}
            {isNavigating ? (
              <CameraVision key="camera" distance={distance} />
            ) : (
              <>
                {activeTab === 'home' && <Dashboard key="dash" engine={engine} isNavigating={isNavigating} setIsNavigating={setIsNavigating} />}
                {activeTab === 'settings' && <SettingsView key="sett" engine={engine} distance={distance} setDistance={setDistance} settings={settings} setSettings={setSettings} />}
                {activeTab === 'about' && <AboutView key="about" />}
                {activeTab === 'profile' && <ProfileView key="prof" engine={engine} />}
              </>
            )}
          </AnimatePresence>
        </Suspense>
      </main>

      {/* NAVIGATION FOOTER */}
      <nav className="fixed bottom-8 left-6 right-6 h-20 bg-zinc-900/95 backdrop-blur-xl rounded-[2.5rem] border border-white/10 flex items-center justify-around shadow-2xl z-50">
        <NavButton icon={Map} active={activeTab === 'home'} onClick={() => {setActiveTab('home'); engine.speak("Home");}} />
        <NavButton icon={Settings} active={activeTab === 'settings'} onClick={() => {setActiveTab('settings'); engine.speak("Settings");}} />
        <NavButton icon={Info} active={activeTab === 'about'} onClick={() => {setActiveTab('about'); engine.speak("About");}} />
        <NavButton icon={User} active={activeTab === 'profile'} onClick={() => {setActiveTab('profile'); engine.speak("Profile");}} />
      </nav>
    </div>
  );
}

function NavButton({ icon: Icon, active, onClick }) {
  return (
    <button onClick={onClick} className={`p-4 rounded-2xl transition-all ${active ? 'bg-yellow-400 text-black scale-110' : 'text-zinc-500'}`}>
      <Icon size={28} />
    </button>
  );
}