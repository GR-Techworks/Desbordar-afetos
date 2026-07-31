// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThreadProgress from "@/components/ThreadProgress";
import WhatsAppButton from "@/components/WhatsAppButton";

// Sections
import Hero from "@/components/Hero";
import Reception from "@/components/Reception";
import Autonomy from "@/components/Autonomy";
import Vulnerability from "@/components/Vulnerability";
import Connection from "@/components/Connection";
import Expression from "@/components/Expression";
import Textile from "@/components/Textile";
import Contact from "@/components/Contact";

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
