import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";

/** Landing page — hero + how it works + stats. */
export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Stats />
    </>
  );
}
