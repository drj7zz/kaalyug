import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import CTA from "../components/CTA";

/** Landing page — hero + stats + closing call-to-action. */
export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Stats />
      <CTA />
    </>
  );
}
