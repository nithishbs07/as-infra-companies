import NavBar from '@/components/navigation/NavBar';
import AboutSection from '@/components/about/AboutSection';
import Footer from '@/components/footer/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen text-white pt-24 selection:bg-[var(--color-as-yellow)] selection:text-black">
      <NavBar />
      <AboutSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
