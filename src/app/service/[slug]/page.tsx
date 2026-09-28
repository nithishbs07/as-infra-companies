import NavBar from '@/components/navigation/NavBar';
import Footer from '@/components/footer/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ContactSection from '@/components/contact/ContactSection';
import Image from 'next/image';
import { workImages } from '@/data/workImages';

const serviceData: Record<string, { title: string, capabilities: string[], heroImage: string }> = {
  'civil-public-infrastructure': {
    title: 'CIVIL & PUBLIC INFRASTRUCTURE',
    capabilities: ['Roadways & Highways', 'Bridges, Overpasses & Culverts', 'Water & Utility Management', 'Bulk Land Development'],
    heroImage: workImages.civil.road
  },
  'commercial-development': {
    title: 'COMMERCIAL DEVELOPMENT',
    capabilities: ['Corporate Offices & Business Hubs', 'Retail Complexes & Shopping Centers', 'Institutional & Public Buildings'],
    heroImage: workImages.commercial.office
  },
  'residential-construction': {
    title: 'RESIDENTIAL CONSTRUCTION',
    capabilities: ['Apartment Complexes & Gated Layouts', 'Custom Villas & Independent Homes', 'Structural Retrofitting & Renovation'],
    heroImage: workImages.residential.villa
  },
  'industrial-logistics-engineering': {
    title: 'INDUSTRIAL & LOGISTICS ENGINEERING',
    capabilities: ['Warehouses & Cold Storage Units', 'Industrial Sheds & Factories'],
    heroImage: workImages.industrial.warehouse
  }
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = serviceData[slug];

  if (!service) {
    return (
      <main className="bg-black min-h-screen text-white flex items-center justify-center">
        <h1 className="text-4xl">Service Not Found</h1>
      </main>
    );
  }

  return (
    <main className="bg-[var(--color-as-black)] min-h-screen text-white selection:bg-[var(--color-as-yellow)] selection:text-black">
      <NavBar />
      
      {/* Cinematic Hero */}
      <section className="relative w-full h-[60vh] bg-[#0A1424] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src={service.heroImage} 
            alt={service.title}
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-[var(--color-as-yellow)] tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Service Area</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tighter max-w-5xl mx-auto">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-32">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h2 className="text-3xl font-light tracking-wide mb-16 border-b border-white/10 pb-4">Our Capabilities</h2>
          <div className="flex flex-col gap-8">
            {service.capabilities.map((cap, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <span className="text-[var(--color-as-yellow)] font-mono text-xl opacity-50 group-hover:opacity-100 transition-opacity">
                  0{i + 1}
                </span>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white/80 group-hover:text-white transition-colors">
                  {cap}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
