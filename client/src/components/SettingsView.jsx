import React from 'react';
import { motion } from 'framer-motion';

const SettingsView = ({ engine, distance, setDistance, settings, setSettings }) => {
  
  const handleToggle = (key, label) => {
    const newVal = !settings[key];
    setSettings({ ...settings, [key]: newVal });
    engine.speak(`${label} ${newVal ? 'Enabled' : 'Disabled'}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black uppercase tracking-widest border-l-4 border-yellow-400 pl-4 mb-4">System Settings</h2>

      {/* FILTER PANEL */}
      <div className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-6">
        <h3 className="text-[10px] text-zinc-500 font-black mb-4 uppercase tracking-[0.2em]">Priority Filters</h3>
        <ToggleItem 
          label="Safety First" 
          active={settings.safety} 
          onToggle={() => handleToggle('safety', 'Safety Alerts')} 
        />
        <ToggleItem 
          label="Social Detection" 
          active={settings.social} 
          onToggle={() => handleToggle('social', 'Social Detection')} 
        />
        <ToggleItem 
          label="Nature Mode" 
          active={settings.nature} 
          onToggle={() => handleToggle('nature', 'Nature Mapping')} 
          color="bg-blue-500"
        />
      </div>

      {/* DISTANCE RANGE PANEL */}
      <div className="bg-zinc-900/40 border border-blue-500/20 rounded-[2.5rem] p-6">
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Distance Range</h3>
          <span className="text-3xl font-black tracking-tighter">{distance}M</span>
        </div>
        
        <input 
          type="range" 
          min="1" 
          max="20" 
          value={distance} 
          onChange={(e) => setDistance(e.target.value)}
          onMouseUp={() => engine.speak(`Detection range set to ${distance} meters`)}
          className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between mt-2 text-[10px] font-bold text-zinc-600">
          <span>1M</span>
          <span>10M</span>
          <span>20M</span>
        </div>
      </div>
    </div>
  );
};

const ToggleItem = ({ label, active, onToggle, color = "bg-yellow-400" }) => (
  <div 
    className="flex justify-between items-center py-5 border-b border-white/5 last:border-0 cursor-pointer"
    onClick={onToggle}
  >
    <span className={`text-sm font-bold tracking-tight transition-colors ${active ? 'text-white' : 'text-zinc-600'}`}>
      {label}
    </span>
    <div className={`w-14 h-8 rounded-full relative transition-colors ${active ? color : 'bg-zinc-800'}`}>
      <motion.div 
        animate={{ x: active ? 28 : 4 }}
        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
      />
    </div>
  </div>
);

export default SettingsView;