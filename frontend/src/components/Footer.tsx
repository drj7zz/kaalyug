export default function Footer() {
  return (
    <footer className="py-[35px] mt-[80px] border-t border-[rgba(255,255,255,0.07)]">
      <div className="w-[min(92%,1100px)] mx-auto flex flex-col md:flex-row items-center justify-between gap-[15px] md:gap-[0]">
        <div className="text-center md:text-left">
          <strong className="text-[13px] font-bold"><i className="fa-solid fa-code text-[#7647ff] mr-2"></i>KAALYUG</strong>
          <span className="block mt-[5px] text-[#60616c] text-[9px]">Open Source. Built in Public.</span>
        </div>
        <div className="flex items-center gap-[20px]">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[#888994] no-underline text-[14px] hover:text-[#7647ff] transition-colors">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="#wallet" className="btn-hover text-[#888994] no-underline text-[10px] hover:text-[#50d8ff] transition-colors flex items-center gap-[6px]">
            <i className="fa-solid fa-wallet"></i> YugCoin Wallet
          </a>
        </div>
      </div>
    </footer>
  );
}
