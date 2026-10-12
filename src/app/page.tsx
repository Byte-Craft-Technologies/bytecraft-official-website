import Hero from "./components/Hero";
import Services from "./components/Services";
import Realisations from "./components/Realisations";
import FAQ from "./ui/FAQ";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Realisations />
      <FAQ />
      <Contact />
    </main>
  );
}