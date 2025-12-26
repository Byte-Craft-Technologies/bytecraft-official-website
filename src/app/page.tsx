import Hero from "./components/Hero";
import Realisations from "./components/Realisations";
import FAQ from "./ui/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Realisations />
      <FAQ />
    </main>
  );
}