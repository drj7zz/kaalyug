const STEPS = [
  {
    icon: "fa-user-plus",
    title: "Create an account",
    text: "Sign up in seconds with just a name, email and password. Your marketplace account is your creator identity across Kaalyug.",
  },
  {
    icon: "fa-magnifying-glass",
    title: "Discover projects",
    text: "Browse the community marketplace — templates, UI kits, tools and complete codebases, all published by real developers.",
  },
  {
    icon: "fa-cloud-arrow-up",
    title: "Publish your work",
    text: "Share what you built. List it as free or paid, attach the GitHub source and let others find, use and learn from your project.",
  },
];

/** Landing "how it works" strip — real content between hero and stats. */
export default function HowItWorks() {
  return (
    <section className="w-[min(92%,1100px)] mx-auto mt-[80px]">
      <div className="text-center">
        <p className="text-[#22a04a] text-[11px] font-semibold tracking-[0.14em]">GETTING STARTED</p>
        <h2 className="mt-[10px] text-[clamp(26px,3.4vw,38px)] tracking-[-1px] font-bold">Three steps. That's it.</h2>
        <p className="max-w-[520px] mx-auto mt-[12px] text-[#64748b] text-[13px] leading-[1.7]">
          No listing fees, no approval queue. The marketplace is open to every registered developer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px] mt-[34px]">
        {STEPS.map((step, index) => (
          <article key={step.title} className="glass p-[26px] rounded-[22px] relative">
            <span className="absolute top-[22px] right-[24px] text-[#64748b] text-[26px] font-bold">
              0{index + 1}
            </span>
            <div className="w-[44px] h-[44px] grid place-items-center rounded-[13px] text-[#22a04a] bg-[rgba(34,160,74,0.08)] border border-[rgba(34,160,74,0.2)] text-[17px]">
              <i className={`fa-solid ${step.icon}`}></i>
            </div>
            <h3 className="mt-[18px] text-[15px] font-bold">{step.title}</h3>
            <p className="mt-[9px] text-[#64748b] text-[12px] leading-[1.7]">{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
