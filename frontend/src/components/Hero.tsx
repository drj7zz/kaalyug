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

      <div className="flex flex-col sm:flex-row gap-[16px] mt-[35px] w-full sm:w-auto justify-center items-center">
        <a
          href="#marketplace"
          className="btn-hover bg-primary-gradient inline-flex items-center justify-center gap-[8px] px-[24px] py-[14px] rounded-[16px] text-white no-underline text-[13px] font-semibold border border-[rgba(255,255,255,0.15)] w-full sm:w-auto"
        >
          Explore Marketplace <i className="fa-solid fa-arrow-right text-[11px]"></i>
        </a>

        <a
          href="#publish"
          className="btn-hover bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] inline-flex items-center justify-center gap-[8px] px-[24px] py-[14px] rounded-[16px] text-white no-underline text-[13px] font-semibold border border-[rgba(255,255,255,0.1)] w-full sm:w-auto"
        >
          <i className="fa-solid fa-cloud-arrow-up text-[12px]"></i> Publish Your Project
        </a>
      </div>
    </section>
  );
}
