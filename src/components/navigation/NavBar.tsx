'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

import Link from 'next/link';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'SERVICES', href: '/services' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'CONTACT-US', href: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link href="/" className="z-50 relative flex items-center">
            <div className="relative w-[80px] md:w-[90px] aspect-[1024/649] bg-white rounded-sm overflow-hidden shadow-md">
              <div className="relative w-full h-full">
                <Image 
                  src="/images/as-infra-companies-logo-white.png"
                  alt="AS Infra Companies"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-xs font-medium tracking-[0.2em] text-white/80 hover:text-[var(--color-as-yellow)] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[var(--color-as-navy)] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-2xl font-light tracking-widest text-white hover:text-[var(--color-as-yellow)] inline-block"
                >
                  {link.name}
                </motion.span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
