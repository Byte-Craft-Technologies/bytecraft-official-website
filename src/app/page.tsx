import Hero from "./components/Hero";
import Services from "./components/Services";
import Realisations from "./components/Realisations";
import FAQ from "./ui/FAQ";
import Contact from "./components/Contact";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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