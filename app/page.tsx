// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Sections
import Hero from "@/components/Hero";
import Reception from "@/components/Reception";
import Autonomy from "@/components/Autonomy";
import Vulnerability from "@/components/Vulnerability";
import Connection from "@/components/Connection";
import Expression from "@/components/Expression";
import Textile from "@/components/Textile";

export default function Home() {
  return (
    <main>
      <Header />

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

      <Footer />
    </main>
  );
}
