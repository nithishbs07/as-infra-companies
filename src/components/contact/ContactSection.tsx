'use client';

import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Header & Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-light text-white text-base tracking-tighter mb-6 leading-tight">
                LET&apos;S BUILD<br/>WHAT COMES NEXT.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-8 text-white text-base/80 font-light"
            >
              <div>
                <div className="text-xs tracking-[0.2em] text-white text-base/50 uppercase mb-2">Headquarters</div>
                <div className="text-xl">
                  AS Infra Companies<br/>
                  Thanjavur, Tamil Nadu
                </div>
              </div>
              
              <div className="flex flex-col gap-2 text-xl">
                <a href="mailto:asinfracompanies@gmail.com" className="hover:text-[var(--color-as-yellow)] transition-colors w-fit">asinfracompanies@gmail.com</a>
                <a href="tel:+91868000882" className="hover:text-[var(--color-as-yellow)] transition-colors w-fit">+91 868000882</a>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form className="flex flex-col gap-8 bg-[#0A1424] p-8 md:p-12 border border-white/10" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.2em] text-white text-base/50 uppercase">Name</label>
                <input type="text" className="bg-transparent border-b border-white/20 pb-2 text-white text-base focus:outline-none focus:border-[var(--color-as-yellow)] transition-colors rounded-none" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.2em] text-white text-base/50 uppercase">Phone</label>
                  <input type="tel" className="bg-transparent border-b border-white/20 pb-2 text-white text-base focus:outline-none focus:border-[var(--color-as-yellow)] transition-colors rounded-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.2em] text-white text-base/50 uppercase">Email</label>
                  <input type="email" className="bg-transparent border-b border-white/20 pb-2 text-white text-base focus:outline-none focus:border-[var(--color-as-yellow)] transition-colors rounded-none" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.2em] text-white text-base/50 uppercase">Project Type</label>
                <select className="bg-transparent border-b border-white/20 pb-2 text-white text-base focus:outline-none focus:border-[var(--color-as-yellow)] transition-colors rounded-none appearance-none">
                  <option value="" className="bg-[#0A1424]">Select</option>
                  <option value="civil" className="bg-[#0A1424]">Civil & Public</option>
                  <option value="commercial" className="bg-[#0A1424]">Commercial</option>
                  <option value="residential" className="bg-[#0A1424]">Residential</option>
                  <option value="industrial" className="bg-[#0A1424]">Industrial</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.2em] text-white text-base/50 uppercase">Message</label>
                <textarea rows={4} className="bg-transparent border-b border-white/20 pb-2 text-white text-base focus:outline-none focus:border-[var(--color-as-yellow)] transition-colors rounded-none resize-none"></textarea>
              </div>

              <button className="bg-[var(--color-as-yellow)] text-black py-4 font-medium tracking-[0.2em] uppercase text-sm hover:bg-white transition-colors mt-4">
                Submit Inquiry
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
