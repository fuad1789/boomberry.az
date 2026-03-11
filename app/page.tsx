import Navbar from "@/components/header/Navbar";
import IconSlider from "@/components/categories/IconSlider";
import Hero from "@/components/hero/Hero";
import Bestsellers from "@/components/bestsellers/Bestsellers";
import CraftPhilosophy from "@/components/philosophy/CraftPhilosophy";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <IconSlider />
      <Hero />
      <Bestsellers />
      <CraftPhilosophy />
    </main>
  );
}
