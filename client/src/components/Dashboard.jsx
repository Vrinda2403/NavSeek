import React from 'react';
import { Play, Square, Map, RotateCcw, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = ({ engine, isNavigating, setIsNavigating }) => {
  const handleStartStop = () => {
    const nextState = !isNavigating;
    setIsNavigating(nextState);
    engine.speak(nextState ? "Navigation started" : "Navigation stopped");
    engine.playTone('center');
  };

  return (
    <div className="space-y-6">
      {/* NAVIGATE SECTION */}
      <div className="bg-zinc-900/30 border-2 border-yellow-400/20 rounded-[2.5rem] p-6 shadow-2xl">
        <h2 className="text-yellow-400 text-[10px] font-black tracking-[0.4em] mb-6 uppercase text-center">Navigate</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-10">
          <NavButton 
            icon={isNavigating ? Square : Play} 
            label="START/STOP" 
            color="bg-green-500" 
            onClick={handleStartStop} 
            darkText 
          />
          <NavButton 
            icon={Map} 
            label="MODE" 
            color="bg-blue-500" 
            onClick={() => engine.speak("Indoor mode active")} 
          />
          <NavButton 
            icon={RotateCcw} 
            label="REPLAY" 
            color="bg-yellow-400" 
            onClick={() => engine.speak("Replaying last obstacle alert")} 
            darkText 
          />
          <NavButton 
            icon={Shield} 
            label="SOS" 
            color="bg-red-600" 
            onClick={() => {
              engine.speak("Emergency alert sent");
              engine.playTone('center', 'sawtooth');
            }} 
          />
        </div>

        {/* RADAR VISUALIZATION */}
        <div className="relative h-24 flex items-center justify-center border-t border-white/5 pt-6 overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-12 h-12 border border-yellow-400 rounded-full" 
          />
          <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_15px_#facc15]" />
        </div>
      </div>

      {/* QUICK STATUS CARD */}
      <div className="bg-zinc-900/50 p-6 rounded-[2rem] border border-white/5 flex justify-between items-center">
        <div>
          <p className="text-[10px] text-zinc-500 font-black uppercase">Environment</p>
          <p className="text-sm font-bold">Clear Path Detected</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-zinc-500 font-black uppercase">Battery</p>
          <p className="text-sm font-bold text-green-500">88%</p>
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ icon: Icon, label, color, onClick, darkText }) => (
  <button 
    onClick={onClick}
    className={`aspect-square ${color} rounded-3xl flex flex-col items-center justify-center transition-all active:scale-90 shadow-lg ${darkText ? 'text-black' : 'text-white'}`}
  >
    <Icon size={32} strokeWidth={2.5} />
    <span className="text-[10px] font-black mt-2 tracking-tighter uppercase">{label}</span>
  </button>
);

export default Dashboard;