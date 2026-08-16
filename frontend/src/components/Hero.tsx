export default function Hero() {
  return (
    <section className="min-h-[600px] md:min-h-[660px] pt-[70px] md:pt-[100px] pb-[70px] text-center flex flex-col items-center justify-center w-[min(92%,1100px)] mx-auto">
      <div className="inline-flex items-center gap-[8px] px-[13px] py-[8px] rounded-[30px] text-[#c5b6ff] bg-[rgba(145,85,255,0.07)] border border-[rgba(145,85,255,0.18)] text-[10px] tracking-[0.05em]">
        <span className="w-[6px] h-[6px] rounded-full bg-[#9b5dff] shadow-[0_0_12px_#9b5dff]"></span>
        OPEN-SOURCE DIGITAL ECOSYSTEM
      </div>

      <h1 className="max-w-[900px] mt-[25px] text-[clamp(48px,7vw,82px)] leading-[0.96] tracking-[-2px] md:tracking-[-4px] font-bold">
        Useful things,
        <br />
        <span className="text-gradient">made by developers.</span>
      </h1>

      <p className="max-w-[590px] mt-[25px] text-[#858691] text-[14px] leading-[1.75]">
        Kaalyug is a developer-focused ecosystem where creators can publish complete projects, discover useful digital products and eventually exchange them through the native YugCoin wallet system.
      </p>

      <div className="flex flex-col md:flex-row gap-[12px] mt-[30px] w-full md:w-auto">
        <a
          href="#marketplace"
          className="btn-hover bg-primary-gradient inline-flex items-center justify-center px-[19px] py-[13px] rounded-[14px] text-white no-underline text-[12px] font-semibold border border-[rgba(255,255,255,0.1)] w-full md:w-auto"
        >
          Explore Marketplace →
        </a>

        <a
          href="#publish"
          className="btn-hover bg-[rgba(255,255,255,0.035)] inline-flex items-center justify-center px-[19px] py-[13px] rounded-[14px] text-white no-underline text-[12px] font-semibold border border-[rgba(255,255,255,0.1)] w-full md:w-auto"
        >
          Publish Your Project
        </a>
      </div>
    </section>
  );
}
