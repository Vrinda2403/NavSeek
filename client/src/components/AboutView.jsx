import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Globe, Shield, Cpu, Volume2 } from 'lucide-react';

const AboutView = () => {
  const features = [
    {
      icon: <Cpu className="text-blue-400" />,
      title: "Neural Engine",
      desc: "Real-time object detection using YOLOv8 to identify hazards, vehicles, and pedestrians.",
      color: "border-blue-500/30"
    },
    {
      icon: <Volume2 className="text-yellow-400" />,
      title: "Spatial Audio",
      desc: "Translates visual coordinates into 3D directional sound for 360° awareness.",
      color: "border-yellow-500/30"
    },
    {
      icon: <Shield className="text-green-500" />,
      title: "Safety First",
      desc: "Integrated SOS protocols and high-priority haptic alerts for fast-approaching objects.",
      color: "border-green-500/30"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <header className="mb-8">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter border-l-4 border-blue-500 pl-4">
          The Mission
        </h2>
        <p className="text-sm text-zinc-500 mt-2 font-medium">
          Empowering independence through intelligent environmental mapping.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-zinc-900/40 p-6 rounded-[2rem] border-2 ${item.color} shadow-lg`}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-black/50 rounded-2xl">
                {item.icon}
              </div>
              <h3 className="font-black text-xs uppercase tracking-widest text-zinc-200">
                {item.title}
              </h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-500/10 p-5 rounded-3xl border border-blue-500/20 mt-8 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Build Status</p>
          <p className="text-sm font-bold text-white">v1.0.2 Stable Release</p>
        </div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
      </div>
    </motion.div>
  );
};

export default AboutView;