// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThreadProgress from "@/components/ThreadProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import { COTTON_BG } from "@/components/Reception";
import WaveDivider from "@/components/WaveDivider";
import ButterflyDivider from "@/components/ButterflyDivider";

// Sections
import Hero from "@/components/Hero";
import Reception from "@/components/Reception";
import Autonomy from "@/components/Autonomy";
import Vulnerability from "@/components/Vulnerability";
import Connection from "@/components/Connection";
import Expression from "@/components/Expression";
import Textile from "@/components/Textile";
import Contact from "@/components/Contact";
import Community from "@/components/Community";

const C = {
  heroDark: "#1a0a08", // bg-primary-dark do Hero
  cotton: "#f0e6d2", // COTTON_BG do Reception
  blushLight: "#f9f0ea", // bg-acolhimento-light do Connection (ajuste se necessário)
  warmWhite: "#fdf7f2", // bg-warm-white do Expression / Vulnerability
  warmBeige: "#f5ece2", // bg-warm-beige do Textile
  primary: "#7c070c", // bg-primary do Autonomy (Vulnerability usa warmWhite)
};

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

      {/* 
      <div
        className="w-full h-32"
        style={{
          background:
            "linear-gradient(to top, rgba(139, 103, 60, 0.16), transparent 100%)",
          marginTop: "8rem", // Puxa a recepção para cima do degradê
          position: "relative",
          zIndex: 10,
        }}
      />
      */}

      <div id="reception">
        <Reception />
      </div>

      {/* 
      <div
        className="w-full h-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(139, 103, 60, 0.16), transparent 100%)",
          marginBottom: "-8rem", // Puxa a recepção para debaixo do degradê
          position: "relative",
          zIndex: 10,
        }}
      />
      */}

      <div id="expression">
        <Expression />
      </div>

      {/* <ButterflyDivider /> */}

      <div id="community">
        <Community />
      </div>

      <div id="autonomy">
        <Autonomy />
      </div>

      <div id="vulnerability">
        <Vulnerability />
      </div>

      <div id="textile">
        <Textile />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
