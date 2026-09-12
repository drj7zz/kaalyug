export default function Ecosystem() {
  return (
    <section id="ecosystem" className="w-[min(92%,1100px)] mx-auto mt-[25px] grid grid-cols-1 md:grid-cols-2 gap-[15px]">
      <div className="glass p-[30px] rounded-[24px]">
        <h2 className="text-[23px] leading-[1.1] font-bold"><i className="fa-brands fa-github text-[#22a04a] mr-2"></i>
          Open source
          <br />
          by default.
        </h2>
        <p className="mt-[13px] text-[#64748b] text-[13px] leading-[1.7]">
          Kaalyug itself is intended to be built publicly. Developers can inspect the code, suggest improvements, create features and contribute through GitHub.
        </p>
        <div className="mt-[20px] p-[15px] flex justify-between items-center rounded-[15px] bg-[rgba(15,23,42,0.055)] border border-[#e2e8f0] transition-all duration-300 hover:bg-[#eef2f7] hover:border-[#cbd5e1] cursor-pointer group">
          <div>
            <strong className="block text-[12px] font-bold group-hover:text-[#1b8a3e] transition-colors">kaalyug-marketplace</strong>
            <span className="text-[#64748b] text-[11px]">Public Repository</span>
          </div>
          <i className="fa-solid fa-arrow-up-right-from-square text-[#64748b] group-hover:text-[#1e293b] transition-colors text-[10px]"></i>
        </div>
      </div>

      <div className="glass p-[30px] rounded-[24px]">
        <h2 className="text-[23px] leading-[1.1] font-bold"><i className="fa-solid fa-users text-[#22a04a] mr-2"></i>
          Builders
          <br />
          meet builders.
        </h2>
        <p className="mt-[13px] text-[#64748b] text-[13px] leading-[1.7]">
          Creators publish their work and other developers discover, use and contribute to it — a two-way loop between authors and users.
        </p>
        <div className="mt-[20px] p-[15px] flex justify-between items-center rounded-[15px] bg-[rgba(15,23,42,0.055)] border border-[#e2e8f0] transition-all duration-300 hover:bg-[#eef2f7] hover:border-[#cbd5e1] cursor-pointer group">
          <div>
            <strong className="block text-[12px] font-bold group-hover:text-[#1b8a3e] transition-colors">Community</strong>
            <span className="text-[#64748b] text-[11px]">Publish &amp; Discover</span>
          </div>
          <i className="fa-solid fa-arrow-up-right-from-square text-[#64748b] group-hover:text-[#1e293b] transition-colors text-[10px]"></i>
        </div>
      </div>
    </section>
  );
}
