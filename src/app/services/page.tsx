import NavBar from '@/components/navigation/NavBar';
import ServicesSection from '@/components/services/ServicesSection';
import Footer from '@/components/footer/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function ServicesPage() {
  return (
    <main className="bg-black min-h-[100dvh] text-white pt-24 selection:bg-[var(--color-as-yellow)] selection:text-black">
      <NavBar />
      <ServicesSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
