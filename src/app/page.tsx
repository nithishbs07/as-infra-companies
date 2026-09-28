'use client';
import HeroScene from "@/components/hero/HeroScene";

import { useState, useEffect } from 'react';
import BootScreen from '@/components/boot/BootScreen';
import NavBar from '@/components/navigation/NavBar';
import AboutSection from '@/components/about/AboutSection';
import ServicesSection from '@/components/services/ServicesSection';
import WorksSection from '@/components/works/WorksSection';
import ProjectsSection from '@/components/projects/ProjectsSection';
import ApproachSection from '@/components/approach/ApproachSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/footer/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import SoundControl from '@/components/ui/SoundControl';
import { FrameManifest } from '@/lib/types';

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [manifest, setManifest] = useState<FrameManifest | null>(null);

  useEffect(() => {
    // Load manifest
    fetch('/sequence/manifest.json')
      .then(res => res.json())
      .then(data => setManifest(data))
      .catch(err => {
        console.error("Failed to load manifest", err);
        // Fallback mock manifest so it doesn't break if not present
        setManifest({
          frameCount: 150,
          fps: 15,
          width: 1920,
          height: 1080,
          pattern: "/sequence/frame-%04d.webp"
        });
      });
  }, []);

  return (
    <main className="bg-black min-h-screen text-white selection:bg-[var(--color-as-yellow)] selection:text-black">
      {!bootComplete && <BootScreen onComplete={() => setBootComplete(true)} />}
      
      <NavBar />
      {manifest && <HeroScene manifest={manifest} />}
      <AboutSection />
      <ServicesSection />
      <WorksSection />
      <ProjectsSection />
      <ApproachSection />
      <ContactSection />
      <Footer />
      <SoundControl />
      <WhatsAppButton />
    </main>
  );
}
