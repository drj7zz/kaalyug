import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marketplace from "@/components/Marketplace";
import Wallet from "@/components/Wallet";
import Publish from "@/components/Publish";
import Ecosystem from "@/components/Ecosystem";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marketplace />
      <Wallet />
      <Publish />
      <Ecosystem />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
