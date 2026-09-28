import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black py-16 md:py-24 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          <div className="md:col-span-1">
            <div className="text-xl font-bold tracking-tighter text-white flex items-center gap-2 mb-4">
              <span className="text-[var(--color-as-yellow)]">AS</span> INFRA COMPANIES
            </div>
            <p className="text-white/50 text-sm tracking-wide">Building Today for a Better Tomorrow.</p>
          </div>

          <div>
            <h4 className="text-[var(--color-as-yellow)] text-xs font-bold uppercase tracking-[0.2em] mb-6">Services</h4>
            <div className="flex flex-col gap-4 text-white/50 text-sm">
              <Link href="/service/civil-public-infrastructure" className="hover:text-white transition-colors">Civil & Public Infrastructure</Link>
              <Link href="/service/commercial-development" className="hover:text-white transition-colors">Commercial Development</Link>
              <Link href="/service/residential-construction" className="hover:text-white transition-colors">Residential Construction</Link>
              <Link href="/service/industrial-logistics-engineering" className="hover:text-white transition-colors">Industrial & Logistics Engineering</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[var(--color-as-yellow)] text-xs font-bold uppercase tracking-[0.2em] mb-6">Navigation</h4>
            <div className="flex flex-col gap-4 text-white/50 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/#about" className="hover:text-white transition-colors">About</Link>
              <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
              <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
              <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[var(--color-as-yellow)] text-xs font-bold uppercase tracking-[0.2em] mb-6">Contact</h4>
            <div className="flex flex-col gap-4 text-white/50 text-sm">
              <p>Thanjavur, Tamil Nadu</p>
              <a href="tel:+91868000882" className="hover:text-white transition-colors">+91 868000882</a>
              <a href="mailto:asinfracompanies@gmail.com" className="hover:text-white transition-colors">asinfracompanies@gmail.com</a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/30 text-xs tracking-wider text-center md:text-left">
            © 2024. All rights reserved. | Asraaz Business Solutions
          </div>
        </div>
      </div>
    </footer>
  );
}
