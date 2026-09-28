'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { workImages } from '@/data/workImages';

const services = [
  {
    num: '01',
    title: 'CIVIL & PUBLIC INFRASTRUCTURE',
    subServices: 'Roads · Drainage · Water · Utilities · Land Development',
    desc: 'We deliver foundational civil and public infrastructure works with a focus on durability, safety, utility, and long-term performance.',
    img: workImages.civil.road,
    href: '/service/civil-public-infrastructure'
  },
  {
    num: '02',
    title: 'COMMERCIAL DEVELOPMENT',
    subServices: 'Offices · Retail · Institutional · Public Buildings',
    desc: 'We design and construct functional, modern commercial spaces engineered to handle high foot traffic, optimize space utilization, and support business growth.',
    img: workImages.commercial.office,
    href: '/service/commercial-development'
  },
  {
    num: '03',
    title: 'RESIDENTIAL CONSTRUCTION',
    subServices: 'Villas · Apartments · Gated Communities · Renovation',
    desc: 'From premium individual homes to multi-unit complexes, we combine aesthetic design with uncompromising structural integrity to build spaces where families thrive.',
    img: workImages.residential.apartment,
    href: '/service/residential-construction'
  },
  {
    num: '04',
    title: 'INDUSTRIAL & LOGISTICS',
    subServices: 'Warehouses · PEB · Factories · Cold Storage · Utilities',
    desc: 'We deliver heavy-duty engineering solutions built to withstand heavy machinery loads, extensive storage demands, and demanding manufacturing workflows.',
    img: workImages.industrial.warehouse,
    href: '/service/industrial-logistics-engineering'
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-32 md:py-48 bg-transparent">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-24">
          <span className="text-[var(--color-as-yellow)] tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Our Expertise</span>
          <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter">CAPABILITIES</h2>
        </div>

        <div className="flex flex-col gap-8 md:gap-16">
          {services.map((service, i) => (
            <motion.a
              href={service.href}
              key={service.num}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative aspect-square md:aspect-[21/9] w-full overflow-hidden group block"
            >
              {/* Background Image */}
              <Image 
                src={service.img} 
                alt={service.title} 
                fill 
                sizes="100vw"
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out opacity-40 group-hover:opacity-70"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between">
                <div className="text-[var(--color-as-yellow)] text-xl md:text-3xl font-mono tracking-tighter opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                  {service.num}
                </div>
                
                <div className="transform group-hover:-translate-y-4 transition-transform duration-700 ease-out">
                  <h3 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-2 group-hover:text-[var(--color-as-yellow)] transition-colors duration-700">
                    {service.title}
                  </h3>
                  <div className="text-[var(--color-as-yellow)] text-xs font-mono tracking-widest uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {service.subServices}
                  </div>
                  <p className="text-white/70 font-light text-lg md:text-2xl mb-8 max-w-2xl">
                    {service.desc}
                  </p>
                  
                  {/* Yellow Accent Line + Explore */}
                  <div className="flex items-center gap-4 text-xs tracking-[0.2em] text-white uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    <span className="w-0 group-hover:w-16 h-[2px] bg-[var(--color-as-yellow)] transition-all duration-700 ease-out"></span>
                    Explore Capability
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
