/** About page — the story, principles and ecosystem layers. */
export default function About() {
  const principles = [
    { icon: 'fa-code', title: 'Built in public', text: 'Every layer of Kaalyug is developed openly. Inspect the code, suggest changes, ship features.' },
    { icon: 'fa-cube', title: 'Projects, not snippets', text: 'We showcase complete, working digital products — tools, kits and full codebases.' },
    { icon: 'fa-users', title: 'Community exchange', text: 'Builders discover and exchange work directly — no middlemen, no listing fees.' },
  ];

  const layers = [
    { num: '01', title: 'Discover', text: 'Browse the community marketplace and find useful things built by real developers.' },
    { num: '02', title: 'Publish', text: 'Turn your finished project into a discoverable Kaalyug product — free or paid.' },
    { num: '03', title: 'Exchange', text: 'Download, remix and share work back with the community.' },
  ];

  return (
    <main className="w-[min(94%,900px)] mx-auto pt-[50px] pb-[70px]">
      <div className="text-center">
        <p className="eyebrow m-0" style={{ fontFamily: 'var(--font-body)' }}>ABOUT</p>
        <h1 className="mt-[8px] text-[clamp(28px,4vw,40px)] font-black tracking-[-1px] text-[#1e293b] m-0">
          Useful things, made by developers.
        </h1>
        <p className="max-w-[560px] mx-auto mt-[14px] text-[#64748b] text-[14px] leading-[1.75]">
          Kaalyug is an open ecosystem where developers publish complete projects, discover each
          other's work and exchange it directly. No listing fees, no approval queues.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-[14px] mt-[40px]">
        {principles.map((p) => (
          <div key={p.title} className="glass-card p-[22px]">
            <span className="w-[38px] h-[38px] grid place-items-center rounded-[11px] text-[#22a04a] bg-[rgba(34,160,74,0.1)] text-[15px]">
              <i className={`fa-solid ${p.icon}`}></i>
            </span>
            <h3 className="mt-[14px] text-[14px] font-bold text-[#1e293b] m-0">{p.title}</h3>
            <p className="mt-[8px] text-[#64748b] text-[12px] leading-[1.7] m-0">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-[28px] mt-[40px]">
        <p className="profile-section-head">HOW THE ECOSYSTEM WORKS</p>
        <h2 className="mt-[4px] text-[1.2rem] font-bold text-[#1e293b] m-0">Three layers, one loop.</h2>
        <div className="flex flex-col mt-[16px]">
          {layers.map((l) => (
            <div key={l.num} className="flex gap-[16px] items-start py-[14px] border-b border-[#e2e8f0] last:border-0">
              <strong className="text-[#22a04a] text-[13px] font-black mt-[2px]">{l.num}</strong>
              <div>
                <strong className="block text-[13px] text-[#1e293b]">{l.title}</strong>
                <small className="block text-[#64748b] text-[12px] mt-[3px] leading-[1.6]">{l.text}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
