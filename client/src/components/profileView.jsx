import React from 'react';
import { motion } from 'framer-motion'; // <--- ADD THIS
import { User } from 'lucide-react';

const ProfileView = ({ engine }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-zinc-900/50 rounded-[2.5rem] border border-green-500/20 text-center"
    >
      <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-black shadow-lg shadow-green-500/20">
        <User size={40} />
      </div>
      <h3 className="text-xl font-black mb-1 uppercase tracking-tighter">VRINDA</h3>
      <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Emergency Contact: Enabled</p>
      
      <button 
        onClick={() => engine.speak("Profile details: Account active.")}
        className="mt-6 text-green-500 text-[10px] font-black tracking-widest uppercase border border-green-500/30 px-4 py-2 rounded-full"
      >
        Check Status
      </button>
    </motion.div>
  );
};

export default ProfileView;