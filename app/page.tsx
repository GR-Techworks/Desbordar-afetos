// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThreadProgress from "@/components/ThreadProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import WaveDivider from "@/components/WaveDivider";

// Sections
import Hero from "@/components/Hero";
import Reception from "@/components/Reception";
import Autonomy from "@/components/Autonomy";
import Vulnerability from "@/components/Vulnerability";
import Connection from "@/components/Connection";
import Expression from "@/components/Expression";
import Textile from "@/components/Textile";
import Contact from "@/components/Contact";

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

      <div id="reception">
        <Reception />
      </div>

      <WaveDivider from={C.cotton} to={C.blushLight} height={70} />

      <div id="connection">
        <Connection />
      </div>

      <div id="expression">
        <Expression />
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
