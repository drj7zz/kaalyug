export default function Footer() {
  return (
    <footer className="py-[35px] mt-[80px] border-t border-[rgba(255,255,255,0.07)]">
      <div className="w-[min(92%,1100px)] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-[15px] md:gap-[0]">
        <div>
          <strong className="text-[13px] font-bold">KAALYUG</strong>
          <span className="block mt-[5px] text-[#60616c] text-[9px]">Open Source. Built in Public.</span>
        </div>
        <a href="#wallet" className="text-[#888994] no-underline text-[10px]">
          YugCoin Wallet ↑
        </a>
      </div>
    </footer>
  );
}
