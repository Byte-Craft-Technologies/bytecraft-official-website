import NaveNav from "../app/ui/Navbar";


export default function Home() {
  const handleClick = () => {
    console.log('Le bouton a été cliqué !');
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#F5F5F5]">
      <NaveNav />
      <div className="flex flex-col items-center justify-center space-y-8">
      </div>
    </main>
  );
}
