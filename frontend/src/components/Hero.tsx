export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden px-[24px] pt-[70px] md:pt-[90px] pb-[60px]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-center bg-cover bg-no-repeat opacity-[0.05]"
        style={{ backgroundImage: "url('/logo.jpeg')" }}
      />

      <div className="w-[min(94%,1150px)] mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-[48px] items-center">
        {/* Left — copy */}
        <div className="text-center md:text-left">
          <div className="slide-in inline-flex items-center gap-[8px] px-[14px] py-[8px] rounded-full text-[#1b8a3e] bg-[rgba(34,160,74,0.1)] border border-[rgba(34,160,74,0.3)] text-[11px] tracking-[0.08em] font-bold">
            <span className="w-[6px] h-[6px] rounded-full bg-[#22a04a]"></span>
            OPEN-SOURCE DIGITAL ECOSYSTEM
          </div>

          <h1 className="slide-in mt-[22px] text-[clamp(36px,5.2vw,58px)] leading-[1.06] tracking-[-1.5px] md:tracking-[-2px] font-black text-[#1e293b]">
            Build. Publish.
            <br />
            <span className="text-[#22a04a]">Discover.</span>
          </h1>

          <p className="slide-in max-w-[480px] mx-auto md:mx-0 mt-[20px] text-[#64748b] text-[15px] leading-[1.7]">
            Kaalyug is a developer-first marketplace. Ship complete projects, get discovered
            by other builders, and grow with an open community.
          </p>

          <div className="slide-in flex flex-wrap gap-[14px] mt-[30px] justify-center md:justify-start">
            <a href="/marketplace" className="btn-primary no-underline text-[13px]" style={{ textDecoration: 'none' }}>
              Explore Marketplace
            </a>
            <a href="/publish" className="btn-secondary no-underline text-[13px]" style={{ textDecoration: 'none' }}>
              Publish Your Project
            </a>
          </div>

          <div className="slide-in flex flex-wrap gap-[26px] mt-[38px] justify-center md:justify-start text-left">
            {[
              ['100%', 'Open source'],
              ['0 fees', 'To publish'],
              ['24/7', 'Always live'],
            ].map(([big, small]) => (
              <div key={small}>
                <strong className="block text-[20px] font-black text-[#1e293b]">{big}</strong>
                <span className="block text-[11px] text-[#64748b] tracking-[0.06em] uppercase">{small}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — product mock cluster */}
        <div className="relative hidden md:block h-[380px]">
          <div className="glass-card slide-in absolute top-[30px] right-[10px] w-[280px] p-[20px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <div className="w-[34px] h-[34px] grid place-items-center rounded-full text-[12px] font-extrabold text-white bg-[#22a04a]">
                  <i className="fa-solid fa-store"></i>
                </div>
                <div>
                  <strong className="block text-[13px]">Marketplace</strong>
                  <small className="block text-[10px] text-[#64748b]">LIVE</small>
                </div>
              </div>
              <span className="px-[9px] py-[5px] rounded-[8px] text-[10px] text-[#1b8a3e] bg-[rgba(34,160,74,0.1)] font-bold">OPEN</span>
            </div>
            <div className="mt-[22px] text-[10px] text-[#64748b] tracking-[0.1em]">PROJECTS PUBLISHED</div>
            <div className="mt-[6px] text-[32px] font-black text-[#1e293b]">
              1,250 <span className="text-[13px] font-medium text-[#64748b]">&amp; counting</span>
            </div>
          </div>

          <div className="glass-card slide-in absolute bottom-[40px] left-[0px] w-[250px] p-[18px]" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center gap-[12px]">
              <div className="w-[40px] h-[40px] grid place-items-center rounded-[12px] text-[#22a04a] bg-[rgba(34,160,74,0.1)]">
                <i className="fa-solid fa-cube"></i>
              </div>
              <div>
                <strong className="block text-[12px] text-[#1e293b]">Neon UI Kit</strong>
                <small className="block text-[10px] text-[#64748b]">Published · Free</small>
              </div>
            </div>
            <div className="mt-[14px] flex items-center justify-between text-[10px] text-[#64748b]">
              <span><i className="fa-solid fa-download mr-1"></i>312</span>
              <span><i className="fa-solid fa-star mr-1"></i>4.8</span>
            </div>
          </div>

          <div className="glass-card slide-in absolute bottom-[0px] right-[40px] w-[220px] p-[16px]" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-[10px]">
              <span className="avatar" style={{ width: '2rem', height: '2rem', fontSize: '0.8rem' }}>A</span>
              <div>
                <strong className="block text-[11px] text-[#1e293b]">Arjun published</strong>
                <small className="block text-[10px] text-[#64748b]">a new project · 2m ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
