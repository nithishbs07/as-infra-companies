'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import { workImages } from '@/data/workImages';

const catalogue = [
  { id: '01', title: 'ROADS & CIVIL WORKS', img: workImages.civil.road },
  { id: '02', title: 'DRAINAGE & WATER INFRASTRUCTURE', img: workImages.civil.drainage },
  { id: '03', title: 'UNDERGROUND UTILITIES', img: workImages.civil.utilities },
  { id: '04', title: 'LAND DEVELOPMENT', img: workImages.civil.land },
  { id: '05', title: 'COMMERCIAL BUILDINGS', img: workImages.commercial.office },
  { id: '06', title: 'RESIDENTIAL DEVELOPMENTS', img: workImages.residential.gated },
  { id: '07', title: 'WAREHOUSES & PEB STRUCTURES', img: workImages.industrial.warehouse },
  { id: '08', title: 'INDUSTRIAL FACILITIES', img: workImages.industrial.factory },
  { id: '09', title: 'INSTITUTIONAL BUILDINGS', img: workImages.commercial.institutional },
  { id: '10', title: 'STRUCTURAL RENOVATION', img: workImages.residential.renovation },
];

export default function WorksSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section className="py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[var(--color-as-yellow)] tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Catalogue</span>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tighter">WHAT WE BUILD</h2>
          </div>
          <p className="text-white/50 text-sm md:text-base max-w-md font-light leading-relaxed">
            From ground preparation to completed structures, we deliver civil, structural, utility and construction solutions across multiple development environments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative">
          
          {/* Interactive List */}
          <div className="flex flex-col border-t border-white/10">
            {catalogue.map((item, i) => (
              <div 
                key={item.id}
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={() => setHoveredIndex(i)}
                className={`py-6 md:py-8 border-b border-white/10 flex flex-col cursor-pointer transition-colors duration-500 ${hoveredIndex === i ? 'bg-white/[0.03] px-4 -mx-4' : 'hover:bg-white/[0.01]'}`}
              >
                <div className="flex items-center gap-8">
                  <span className={`font-mono text-sm tracking-widest transition-colors duration-500 ${hoveredIndex === i ? 'text-[var(--color-as-yellow)]' : 'text-white/20'}`}>
                    {item.id}
                  </span>
                  <h3 className={`text-xl md:text-3xl font-light tracking-wide transition-colors duration-500 ${hoveredIndex === i ? 'text-white' : 'text-white/60'}`}>
                    {item.title}
                  </h3>
                </div>

                {/* Mobile Inline Image Reveal */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      className="lg:hidden relative w-full aspect-[4/3] overflow-hidden bg-[#0A1424]"
                    >
                      <Image 
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="100vw"
                        className="object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Sticky Image Reveal (Desktop) */}
          <div className="hidden lg:block sticky top-32 aspect-[4/5] w-full bg-[#0A1424] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image 
                  src={catalogue[hoveredIndex].img}
                  alt={catalogue[hoveredIndex].title}
                  fill
                  sizes="50vw"
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                   <div className="text-[var(--color-as-yellow)] text-xs font-mono tracking-widest mb-2">{catalogue[hoveredIndex].id}</div>
                   <div className="text-white text-2xl font-light tracking-wide">{catalogue[hoveredIndex].title}</div>
                   <div className="text-white/50 text-xs tracking-widest uppercase mt-2">Capabilities • Construction • Engineering</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
