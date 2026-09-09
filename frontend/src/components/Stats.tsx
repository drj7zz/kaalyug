export default function Stats() {
  return (
    <section className="glass w-[min(92%,1100px)] mx-auto mt-[15px] p-[25px] grid grid-cols-2 md:grid-cols-4 gap-y-[22px] md:gap-[0] rounded-[23px]">
      <div className="text-center border-r border-[rgba(255,255,255,0.08)]">
        <strong className="text-[24px] font-bold text-[#71dfcc]"><i className="fa-solid fa-satellite-dish mr-2 text-[18px]"></i>LIVE</strong>
        <span className="block mt-[5px] text-[#8f919c] text-[11px]">Community Marketplace</span>
      </div>
      <div className="text-center md:border-r border-[rgba(255,255,255,0.08)] border-r-0">
        <strong className="text-[24px] font-bold"><i className="fa-brands fa-osi text-[#71dfcc] mr-2 text-[18px]"></i>01</strong>
        <span className="block mt-[5px] text-[#8f919c] text-[11px]">Open Source Platform</span>
      </div>
      <div className="text-center border-r border-[rgba(255,255,255,0.08)]">
        <strong className="text-[24px] font-bold"><i className="fa-solid fa-coins text-[#71dfcc] mr-2 text-[18px]"></i>YC</strong>
        <span className="block mt-[5px] text-[#8f919c] text-[11px]">Native Wallet</span>
      </div>
      <div className="text-center">
        <strong className="text-[24px] font-bold"><i className="fa-solid fa-code-branch text-[#ff8799] mr-2 text-[18px]"></i>v0.1</strong>
        <span className="block mt-[5px] text-[#8f919c] text-[11px]">Current Stage</span>
      </div>
    </section>
  );
}
