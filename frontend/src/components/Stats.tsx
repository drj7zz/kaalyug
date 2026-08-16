export default function Stats() {
  return (
    <section className="glass w-[min(92%,1100px)] mx-auto mt-[15px] p-[25px] grid grid-cols-2 md:grid-cols-4 gap-y-[22px] md:gap-[0] rounded-[23px]">
      <div className="text-center border-r border-[rgba(255,255,255,0.08)]">
        <strong className="text-[23px] font-bold">LIVE</strong>
        <span className="block mt-[5px] text-[#71737d] text-[9px]">Community Marketplace</span>
      </div>
      <div className="text-center md:border-r border-[rgba(255,255,255,0.08)] border-r-0">
        <strong className="text-[23px] font-bold">01</strong>
        <span className="block mt-[5px] text-[#71737d] text-[9px]">Open Source Platform</span>
      </div>
      <div className="text-center border-r border-[rgba(255,255,255,0.08)]">
        <strong className="text-[23px] font-bold">YC</strong>
        <span className="block mt-[5px] text-[#71737d] text-[9px]">Native Wallet</span>
      </div>
      <div className="text-center">
        <strong className="text-[23px] font-bold">v0.1</strong>
        <span className="block mt-[5px] text-[#71737d] text-[9px]">Current Stage</span>
      </div>
    </section>
  );
}
