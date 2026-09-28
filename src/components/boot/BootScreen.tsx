'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [step, setStep] = useState<'WAITING' | 'PLAYING' | 'DONE'>('WAITING');

  useEffect(() => {
    const hasBooted = sessionStorage.getItem('hasBooted');
    if (hasBooted === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep('DONE');
      onComplete();
    }
  }, [onComplete]);

  const handleVideoEnd = () => {
    sessionStorage.setItem('hasBooted', 'true');
    setStep('DONE');
    setTimeout(onComplete, 800);
  };

  useEffect(() => {
    let fallback: NodeJS.Timeout;
    if (step === 'PLAYING') {
      // Fallback timer to guarantee transition if video onEnded drops
      fallback = setTimeout(() => {
        handleVideoEnd();
      }, 8500);
    }
    return () => clearTimeout(fallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setStep('PLAYING');
    if (videoRef.current) {
       videoRef.current.play().catch(() => console.log('Autoplay blocked'));
    }
  };

  if (step === 'DONE') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="boot-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      >
        <video
          ref={videoRef}
          src="/boot/logo-reveal-voiced.mp4"
          playsInline
          onEnded={handleVideoEnd}
          className={`w-full h-full object-cover origin-center ${step === 'PLAYING' ? 'block' : 'hidden'}`}
        />

        {step === 'WAITING' && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnter}
            className="text-white tracking-[0.3em] font-light text-sm uppercase border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all"
          >
            Enter Experience
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
