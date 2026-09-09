import Ecosystem from "../components/Ecosystem";
import Stats from "../components/Stats";

/** Ecosystem page — open-source layer + YugCoin connection. */
export default function EcosystemPage() {
  return (
    <>
      <div className="pt-[40px]"><Ecosystem /></div>
      <Stats />
    </>
  );
}
