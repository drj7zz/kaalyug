export default function Ecosystem() {
  return (
    <section id="ecosystem" className="w-[min(92%,1100px)] mx-auto mt-[25px] grid grid-cols-1 md:grid-cols-2 gap-[15px]">
      <div className="glass p-[30px] rounded-[24px]">
        <h2 className="text-[23px] leading-[1.1] font-bold"><i className="fa-brands fa-github text-[#71dfcc] mr-2"></i>
          Open source
          <br />
          by default.
        </h2>
        <p className="mt-[13px] text-[#a3a5b0] text-[13px] leading-[1.7]">
          Kaalyug itself is intended to be built publicly. Developers can inspect the code, suggest improvements, create features and contribute through GitHub.
        </p>
        <div className="mt-[20px] p-[15px] flex justify-between items-center rounded-[15px] bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] transition-all duration-300 hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] cursor-pointer group">
          <div>
            <strong className="block text-[12px] font-bold group-hover:text-[#71dfcc] transition-colors">kaalyug-marketplace</strong>
            <span className="text-[#9b9da8] text-[11px]">Public Repository</span>
          </div>
          <i className="fa-solid fa-arrow-up-right-from-square text-[#60616c] group-hover:text-white transition-colors text-[10px]"></i>
        </div>
      </div>

      <div className="glass p-[30px] rounded-[24px]">
        <h2 className="text-[23px] leading-[1.1] font-bold"><i className="fa-solid fa-wallet text-[#71dfcc] mr-2"></i>
          Marketplace
          <br />
          meets wallet.
        </h2>
        <p className="mt-[13px] text-[#a3a5b0] text-[13px] leading-[1.7]">
          The long-term ecosystem can connect creator projects with YugCoin, allowing the marketplace and wallet to operate as two connected layers.
        </p>
        <div className="mt-[20px] p-[15px] flex justify-between items-center rounded-[15px] bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] transition-all duration-300 hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] cursor-pointer group">
          <div>
            <strong className="block text-[12px] font-bold group-hover:text-[#71dfcc] transition-colors">YugCoin Wallet</strong>
            <span className="text-[#9b9da8] text-[11px]">Ecosystem Payment Layer</span>
          </div>
          <i className="fa-solid fa-arrow-up-right-from-square text-[#60616c] group-hover:text-white transition-colors text-[10px]"></i>
        </div>
      </div>
    </section>
  );
}
