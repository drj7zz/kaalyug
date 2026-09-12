export default function Footer() {
  return (
    <footer className="py-[35px] mt-[80px] border-t border-[#e2e8f0]">
      <div className="w-[min(92%,1100px)] mx-auto flex flex-col md:flex-row items-center justify-between gap-[15px] md:gap-[0]">
        <div className="text-center md:text-left">
          <strong className="text-[13px] font-bold"><i className="fa-solid fa-code text-[#22a04a] mr-2"></i>KAALYUG</strong>
          <span className="block mt-[5px] text-[#64748b] text-[9px]">Open Source. Built in Public.</span>
        </div>
        <div className="flex items-center gap-[20px]">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[#64748b] no-underline text-[14px] hover:text-[#1b8a3e] transition-colors">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="/marketplace" className="btn-hover text-[#64748b] no-underline text-[11px] hover:text-[#1b8a3e] transition-colors flex items-center gap-[6px]">
            <i className="fa-solid fa-store"></i> Marketplace
          </a>
        </div>
      </div>
    </footer>
  );
}
