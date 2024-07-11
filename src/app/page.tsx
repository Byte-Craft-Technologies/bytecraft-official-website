import NavBar from "../app/ui/Navbar";
import Card from "./components/card";
import About from "./ui/About";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-10 bg-default">
      <NavBar />
      <Card
        title="Prêt à propulser votre Business vers de nouveaux sommets de croissance ?"
        description="Boostez votre entreprise avec notre expertise. Contactez-nous dès aujourd'hui !"
        image="/hero-image-1.png"
        link="/"
        buttonText="Contactez-nous"
      />
      <div className="flex flex-col items-center justify-center space-y-8">
      </div>
      <About/>
    </main>
  );
}
