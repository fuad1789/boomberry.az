import Navbar from "@/components/header/Navbar";
import IconSlider from "@/components/categories/IconSlider";
import Hero from "@/components/hero/Hero";
import Bestsellers from "@/components/bestsellers/Bestsellers";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <IconSlider />
      <Hero />
      <Bestsellers />
      
      {/* Demo məzmun üçün boş hissə */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-gray-800 mb-4">
            Əsas Məzmun Tezliklə
          </h2>
          <p className="text-gray-500">
            Boomberry premium şokolad və hədiyyəlik məhsulları
          </p>
        </div>
      </div>
    </main>
  );
}