'use client';

import { motion } from 'framer-motion';

const processSteps = [
  {
    num: '01',
    title: 'UNDERSTAND',
    items: ['Site requirements', 'Client objectives', 'Project constraints']
  },
  {
    num: '02',
    title: 'PLAN',
    items: ['Engineering', 'Planning', 'Resource coordination']
  },
  {
    num: '03',
    title: 'EXECUTE',
    items: ['Construction', 'Quality control', 'Safety']
  },
  {
    num: '04',
    title: 'DELIVER',
    items: ['Finishing', 'Inspection', 'Handover']
  }
];

export default function ApproachSection() {
  return (
    <section id="approach" className="py-32 bg-[#020202] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-24 text-center">
          <span className="text-[var(--color-as-yellow)] tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Process</span>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter">OUR APPROACH</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 relative max-w-6xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-[1px] bg-white/10 z-0"></div>
          
          {processSteps.map((step, i) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center group mb-12 md:mb-0"
            >
              {/* Node */}
              <div className="w-14 h-14 rounded-full bg-[#05070A] border-2 border-white/10 flex items-center justify-center mb-8 group-hover:border-[var(--color-as-yellow)] transition-colors duration-500">
                <span className="text-white/40 font-mono text-sm group-hover:text-[var(--color-as-yellow)] transition-colors duration-500">{step.num}</span>
              </div>
              
              <h3 className="text-xl font-medium text-white tracking-widest uppercase mb-6">{step.title}</h3>
              
              <ul className="flex flex-col gap-3 text-white/50 text-sm font-light">
                {step.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
