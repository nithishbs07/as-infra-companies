import NavBar from '@/components/navigation/NavBar';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/footer/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function ContactPage() {
  return (
    <main className="bg-black min-h-[100dvh] text-white pt-24 selection:bg-[var(--color-as-yellow)] selection:text-black">
      <NavBar />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
