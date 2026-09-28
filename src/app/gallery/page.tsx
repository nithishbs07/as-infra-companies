import NavBar from '@/components/navigation/NavBar';
import GalleryView from '@/components/gallery/GalleryView';
import Footer from '@/components/footer/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function GalleryPage() {
  return (
    <main className="bg-[#05070A] min-h-screen text-white pt-24 selection:bg-[var(--color-as-yellow)] selection:text-black">
      <NavBar />
      <GalleryView />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
