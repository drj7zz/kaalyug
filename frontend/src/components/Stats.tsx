export default function Stats() {
  return (
    <section className="glass w-[min(92%,1100px)] mx-auto mt-[15px] p-[25px] grid grid-cols-2 md:grid-cols-4 gap-y-[22px] md:gap-[0] rounded-[23px]">
      <div className="text-center border-r border-[#e2e8f0]">
        <strong className="text-[24px] font-bold text-[#22a04a]"><i className="fa-solid fa-store text-[#22a04a] mr-2 text-[18px]"></i>100%</strong>
        <span className="block mt-[5px] text-[#64748b] text-[11px]">Community Marketplace</span>
      </div>
      <div className="text-center md:border-r border-[#e2e8f0] border-r-0">
        <strong className="text-[24px] font-bold"><i className="fa-brands fa-osi text-[#22a04a] mr-2 text-[18px]"></i>01</strong>
        <span className="block mt-[5px] text-[#64748b] text-[11px]">Open Source Platform</span>
      </div>
      <div className="text-center border-r border-[#e2e8f0]">
        <strong className="text-[24px] font-bold"><i className="fa-solid fa-download text-[#22a04a] mr-2 text-[18px]"></i>Free</strong>
        <span className="block mt-[5px] text-[#64748b] text-[11px]">To Publish &amp; Download</span>
      </div>
      <div className="text-center">
        <strong className="text-[24px] font-bold"><i className="fa-solid fa-code-branch text-[#e11d48] mr-2 text-[18px]"></i>v0.1</strong>
        <span className="block mt-[5px] text-[#64748b] text-[11px]">Current Stage</span>
      </div>
    </section>
  );
}
