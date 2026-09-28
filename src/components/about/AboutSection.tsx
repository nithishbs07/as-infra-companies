'use client';

import { motion } from 'framer-motion';

const features = [
  { num: '01', title: 'PRECISION ENGINEERING', desc: 'Exact structural tolerances and rigorous planning.' },
  { num: '02', title: 'PROJECT MANAGEMENT', desc: 'Streamlined resource allocation and timeline control.' },
  { num: '03', title: 'STRUCTURAL INTEGRITY', desc: 'Uncompromising material selection and safety standards.' },
  { num: '04', title: 'LOCAL EXPERTISE', desc: 'Deep understanding of Tamil Nadu\'s environmental factors.' },
];

const missionPillars = [
  {
    title: "EXCELLENCE IN EXECUTION",
    desc: "To deliver top-tier construction and infrastructure projects on time and within budget, never compromising on safety or structural integrity."
  },
  {
    title: "SUSTAINABLE GROWTH",
    desc: "To implement eco-friendly building practices and smart engineering solutions that respect the local environment while driving modern development."
  },
  {
    title: "CLIENT-CENTRIC TRUST",
    desc: "To foster transparent, long-term relationships with our clients, partners, and stakeholders through honest communication and exceptional craftsmanship."
  },
  {
    title: "COMMUNITY EMPOWERMENT",
    desc: "To contribute meaningfully to the socio-economic growth of Tamil Nadu by creating employment opportunities and developing critical, reliable infrastructure."
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="pt-32 pb-16 md:pt-48 md:pb-32 bg-transparent relative z-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* ABOUT HEADER & INTRO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-6 sticky top-32"
            >
              <h4 className="text-[var(--color-as-yellow)] text-sm tracking-[0.3em] font-medium mb-6 uppercase">About AS Infra Companies</h4>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tighter leading-[1.1]">
                BUILDING<br/>
                THE<br/>
                <span className="text-white/50">FOUNDATION</span><br/>
                OF TOMORROW.
              </h2>
            </motion.div>

            <div className="lg:col-span-6 flex flex-col gap-10 lg:pt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-white font-light leading-relaxed tracking-wide"
              >
                Welcome to AS INFRA COMPANIES, where we transform blueprints into enduring realities. Headquartered in the historic city of Thanjavur, Tamil Nadu, we are a premier infrastructure and civil construction firm dedicated to building the foundations of a progressive tomorrow.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-base md:text-lg text-white/60 font-light leading-relaxed space-y-6"
              >
                <p>
                  From modern residential developments and commercial complexes to critical civic infrastructure, we bring precision engineering, robust project management, and unyielding integrity to every square foot we construct.
                </p>
                <p>
                  At AS INFRA COMPANIES, we believe that infrastructure isn&apos;t just about concrete, steel, and stone—it&apos;s about connecting communities, enabling businesses, and improving the quality of life for generations to come. Leveraging localized expertise with contemporary construction methodologies, our team of seasoned engineers, architects, and project planners ensures that every project stands as a testament to durability, safety, and architectural excellence.
                </p>
              </motion.div>

              {/* Grid of Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {features.map((feature, i) => (
                  <motion.div 
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                    className="bg-white/[0.03] border border-white/10 p-6 rounded-lg hover:bg-white/[0.05] transition-colors"
                  >
                    <span className="text-[var(--color-as-yellow)] text-xs tracking-widest font-bold mb-4 block">{feature.num}</span>
                    <h5 className="text-white text-sm font-medium tracking-wider mb-2">{feature.title}</h5>
                    <p className="text-white/50 text-xs leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* VISION */}
          <div className="py-24 border-y border-white/10 mb-32 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-as-navy)]/20 via-transparent to-transparent pointer-events-none" />
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="lg:col-span-5"
                >
                  <h4 className="text-[var(--color-as-yellow)] text-sm tracking-[0.3em] font-medium mb-6 uppercase">Our Vision</h4>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tighter leading-tight">
                    SHAPING<br/>
                    <span className="text-white/50">SUSTAINABLE</span><br/>
                    LANDSCAPES.
                  </h2>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="lg:col-span-7"
                >
                  <p className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed">
                    &quot;To be recognized as the most trusted and innovative infrastructure leader in the region, shaping sustainable landscapes and setting benchmarks of engineering excellence that empower communities and inspire future generations.&quot;
                  </p>
                </motion.div>
             </div>
          </div>

          {/* MISSION */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h4 className="text-[var(--color-as-yellow)] text-sm tracking-[0.3em] font-medium mb-4 uppercase">Our Mission</h4>
                <h2 className="text-3xl md:text-5xl font-light text-white tracking-tighter">THE PILLARS OF OUR WORK</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {missionPillars.map((pillar, i) => (
                <motion.div 
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-[#0A0A0A] border border-white/5 p-8 flex flex-col h-full group hover:border-white/20 transition-colors"
                >
                  <span className="text-white/20 text-3xl font-light mb-6 block group-hover:text-[var(--color-as-yellow)] transition-colors">0{i + 1}</span>
                  <h3 className="text-white text-lg font-medium tracking-wide mb-4 uppercase">{pillar.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mt-auto">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
