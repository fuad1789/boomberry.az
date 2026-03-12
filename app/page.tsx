import Navbar from "@/components/header/Navbar";
import IconSlider from "@/components/categories/IconSlider";
import Hero from "@/components/hero/Hero";
import Bestsellers from "@/components/bestsellers/Bestsellers";
import CraftPhilosophy from "@/components/philosophy/CraftPhilosophy";
import CustomBoxBuilder from "@/components/Customboxbuilder/Customboxbuilder";
import CorporateGifting from "@/components/Corperative/corperativ";
import DeliveryGuarantee from "@/components/DeliveryGuarantee/DeliveryGuarantee";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <IconSlider />
      <Hero />
      <Bestsellers />
      <CustomBoxBuilder />
      <CraftPhilosophy />
      <CorporateGifting />
      <DeliveryGuarantee />
    </main>
  );
}
