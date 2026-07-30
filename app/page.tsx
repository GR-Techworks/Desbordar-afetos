// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Sections
import Hero from "@/components/Hero";
import About from "@/components/About";
import Intersection from "@/components/Intersection";
import Journey from "@/components/Journey";
import Practices from "@/components/Practices";
import Ana from "@/components/Ana";
import Invitation from "@/components/Invitation";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Header />
      <div id="hero">
        <Hero />
      </div>

      <Intersection />

      <div id="journey">
        <Journey />
      </div>

      <div id="practices">
        <Practices />
      </div>

      <div id="ana">
        <Ana />
      </div>

      <Invitation />

      <div id="about">
        <About />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
