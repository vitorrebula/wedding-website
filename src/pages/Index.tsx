import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import AboutSection from "@/components/AboutSection";
import LocationsSection from "@/components/LocationsSection";
import TicketsSection from "@/components/TicketsSection";
import GiftsSection from "@/components/GiftsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <AboutSection />
      <LocationsSection />
      <TicketsSection />
      <GiftsSection />
      <Footer />
    </div>
  );
};

export default Index;
