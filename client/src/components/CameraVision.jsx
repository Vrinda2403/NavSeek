import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Car, User, AlertTriangle } from 'lucide-react';

const CameraVision = ({ distance }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });

        streamRef.current = stream;
        video.srcObject = stream;

        // 🔑 SAFARI / IOS FIX
        video.setAttribute("playsinline", true);
        video.setAttribute("muted", true);
        video.muted = true;

        video.onloadedmetadata = () => {
          video.play().catch(console.warn);
        };

      } catch (err) {
        console.error("Camera error:", err);
      }
    }

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="space-y-4"> {/* ❌ no motion wrapper */}
      <div className="relative aspect-[3/4] bg-zinc-900 rounded-[3rem] overflow-hidden border-2 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.2)]">

        {/* VIDEO */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 z-10 pointer-events-none">

          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-green-400/50 shadow-[0_0_20px_#22c55e]"
          />

          <div className="absolute top-1/4 left-8 p-2 border-2 border-blue-500 rounded-xl bg-blue-500/10 backdrop-blur-[2px]">
            <Car className="text-blue-500" size={20} />
            <span className="text-[10px] font-black text-blue-500 uppercase ml-1">Car: 3M</span>
          </div>

          <div className="absolute bottom-1/3 right-8 p-2 border-2 border-yellow-400 rounded-xl bg-yellow-400/10 backdrop-blur-[2px]">
            <User className="text-yellow-400" size={20} />
            <span className="text-[10px] font-black text-yellow-400 uppercase ml-1">Person: 1.5M</span>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20">
          <div className="bg-red-600/30 border border-red-500 rounded-2xl p-4 backdrop-blur-md flex items-center justify-center gap-3 animate-pulse">
            <AlertTriangle className="text-red-500" />
            <span className="text-xs font-black uppercase tracking-widest text-white">
              Obstacle Close
            </span>
          </div>
        </div>
      </div>

      <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] text-center">
        AI Detection Active • Radius {distance}M
      </p>
    </div>
  );
};

export default CameraVision;
