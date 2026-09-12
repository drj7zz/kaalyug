import Ecosystem from "../components/Ecosystem";
import Stats from "../components/Stats";

/** Ecosystem page — open-source layer + community connection. */
export default function EcosystemPage() {
  return (
    <>
      <div className="pt-[40px]"><Ecosystem /></div>
      <Stats />
    </>
  );
}
