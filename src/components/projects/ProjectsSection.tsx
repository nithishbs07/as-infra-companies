'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { workImages } from '@/data/workImages';

const gallery = [
  {
    id: '01',
    title: 'CIVIL WORKS',
    img: workImages.civil.road
  },
  {
    id: '02',
    title: 'COMMERCIAL',
    img: workImages.commercial.office
  },
  {
    id: '03',
    title: 'RESIDENTIAL',
    img: workImages.residential.apartment
  },
  {
    id: '04',
    title: 'INDUSTRIAL',
    img: workImages.industrial.factory
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-32 md:py-48 bg-[#05070A]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[var(--color-as-yellow)] tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Visuals</span>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tighter">OUR WORK</h2>
          </div>
          <a href="/gallery" className="text-xs tracking-[0.2em] text-white/60 hover:text-white uppercase transition-colors">
            View Gallery →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {gallery.map((item, i) => {
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                className="flex flex-col gap-6 group cursor-pointer"
              >
                <div className="w-full aspect-[4/3] bg-[#0A1424] relative overflow-hidden">
                  <Image 
                    src={item.img} 
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000"></div>
                </div>

                <div className="flex justify-between items-center px-2">
                  <h3 className="text-lg md:text-2xl font-light text-white tracking-widest uppercase">{item.title}</h3>
                  <div className="text-2xl font-light text-white/20 font-mono tracking-tighter group-hover:text-[var(--color-as-yellow)] transition-colors duration-500">
                    {item.id}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
