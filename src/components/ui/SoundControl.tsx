'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SoundControl() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const pref = sessionStorage.getItem('soundEnabled');
    if (pref === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSoundEnabled(true);
    }

    const handlePrefChange = () => {
      const updated = sessionStorage.getItem('soundEnabled');
      setSoundEnabled(updated === 'true');
    };

    window.addEventListener('soundprefchange', handlePrefChange);
    return () => window.removeEventListener('soundprefchange', handlePrefChange);
  }, []);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    sessionStorage.setItem('soundEnabled', String(newState));
    window.dispatchEvent(new Event('soundprefchange'));
  };

  if (!mounted) return null;

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={toggleSound}
      className="fixed bottom-8 left-8 z-50 text-white/50 hover:text-white transition-colors flex items-center gap-3"
      aria-label="Toggle Sound"
    >
      <div className="w-6 h-6 flex items-center justify-center">
        {soundEnabled ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
        )}
      </div>
      <span className="text-xs tracking-[0.2em] uppercase font-light hidden md:block">
        Sound {soundEnabled ? 'On' : 'Off'}
      </span>
    </motion.button>
  );
}
