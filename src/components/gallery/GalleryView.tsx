'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import { workImages } from '@/data/workImages';

const categories = ['ALL', 'CIVIL', 'COMMERCIAL', 'RESIDENTIAL', 'INDUSTRIAL', 'INFRASTRUCTURE'];

const galleryItems = [
  { id: 1, title: 'Roadways & Paving', category: 'CIVIL', img: workImages.civil.road },
  { id: 2, title: 'Corporate Offices', category: 'COMMERCIAL', img: workImages.commercial.office },
  { id: 3, title: 'Custom Villas', category: 'RESIDENTIAL', img: workImages.residential.villa },
  { id: 4, title: 'PEB Warehouses', category: 'INDUSTRIAL', img: workImages.industrial.peb },
  { id: 5, title: 'Underground Utilities', category: 'INFRASTRUCTURE', img: workImages.civil.utilities },
  { id: 6, title: 'Water Infrastructure', category: 'INFRASTRUCTURE', img: workImages.civil.water },
  { id: 7, title: 'Multi-storey Apartments', category: 'RESIDENTIAL', img: workImages.residential.apartment },
  { id: 8, title: 'Drainage Systems', category: 'CIVIL', img: workImages.civil.drainage },
  { id: 9, title: 'Retail Centers', category: 'COMMERCIAL', img: workImages.commercial.retail },
  { id: 10, title: 'Institutional Buildings', category: 'COMMERCIAL', img: workImages.commercial.institutional },
  { id: 11, title: 'Industrial Factories', category: 'INDUSTRIAL', img: workImages.industrial.factory },
  { id: 12, title: 'Structural Renovation', category: 'RESIDENTIAL', img: workImages.residential.renovation },
];

export default function GalleryView() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filtered = activeTab === 'ALL' ? galleryItems : galleryItems.filter(item => item.category === activeTab);

  return (
    <section className="py-24 bg-[#05070A] min-h-[100dvh]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tighter mb-12">GALLERY</h1>
          
          <div className="flex flex-wrap gap-4 md:gap-8 border-b border-white/10 pb-4">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-xs tracking-[0.2em] font-medium uppercase transition-colors ${activeTab === cat ? 'text-[var(--color-as-yellow)]' : 'text-white/40 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square md:aspect-[4/5] bg-[#0A1424] overflow-hidden group cursor-pointer"
                onClick={() => setSelectedImage(item.img)}
              >
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-6">
                  <div className="text-[var(--color-as-yellow)] text-[10px] tracking-[0.3em] font-bold uppercase mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-light text-white tracking-widest uppercase">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative w-full max-w-6xl aspect-[16/9] shadow-2xl">
              <Image src={selectedImage} alt="Fullscreen" fill className="object-contain" />
              <button className="absolute top-4 right-4 text-white hover:text-[var(--color-as-yellow)] text-xl font-mono">
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
