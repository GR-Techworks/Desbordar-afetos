// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThreadProgress from "@/components/ThreadProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import ButterflyDivider from "@/components/ButterflyDivider";
import FloatingButterfly from "@/components/FloatingButterfly";

// Sections
import Hero from "@/components/Sections/Hero";
import Reception from "@/components/Sections/Reception";
import Autonomy from "@/components/Sections/Autonomy";
import Vulnerability from "@/components/Sections/Vulnerability";
import Connection from "@/components/Sections/Connection";
import Expression from "@/components/Sections/Expression";
import Textile from "@/components/Sections/Textile";
import Contact from "@/components/Sections/Contact";
import Community from "@/components/Sections/Community";

export default function Home() {
  return (
    <main>
      <Header />
      <ThreadProgress />
      <WhatsAppButton />

      <div id="hero">
        <Hero />
      </div>

      <div id="connection">
        <Connection />
      </div>

      <div id="reception" className="relative w-full overflow-hidden">
        <FloatingButterfly side="left" top="5%" scale={1.2} rotation={12} />
        <Reception />
      </div>

      <div id="expression">
        <Expression />
      </div>

      <ButterflyDivider />
      <div className="h-24" />

      <div id="community">
        <Community />
      </div>

      <div id="autonomy">
        <Autonomy />
      </div>

      <div id="vulnerability">
        <Vulnerability />
      </div>

      <div id="textile" className="relative w-full overflow-hidden">
        <FloatingButterfly side="right" top="15%" scale={0.8} rotation={15} />
        <Textile />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
