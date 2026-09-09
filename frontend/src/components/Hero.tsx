export default function Hero() {
  return (
    <section className="relative min-h-[620px] md:min-h-[720px] pt-[70px] md:pt-[90px] pb-[70px] text-center flex flex-col items-center justify-center w-full overflow-hidden">
      {/* cosmic whale backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-center bg-cover bg-no-repeat opacity-[0.28]"
        style={{ backgroundImage: "url('/logo.jpeg')" }}
      />
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, rgba(5,5,7,0.55), rgba(5,5,7,0.25) 45%, rgba(5,5,7,0.95))" }} />

      <div className="inline-flex items-center gap-[8px] px-[14px] py-[8px] rounded-[30px] text-[#a9ede1] bg-[rgba(113,229,209,0.07)] border border-[rgba(113,229,209,0.22)] text-[11px] tracking-[0.06em] font-medium">
        <span className="w-[6px] h-[6px] rounded-full bg-[#71e5d1]"></span>
        OPEN-SOURCE DIGITAL ECOSYSTEM
      </div>

      <h1 className="max-w-[860px] mt-[26px] text-[clamp(40px,6vw,72px)] leading-[1.02] tracking-[-1.5px] md:tracking-[-2.5px] font-bold">
        Useful things,
        <br />
        <span className="text-gradient">made by developers.</span>
      </h1>

      <p className="max-w-[580px] mt-[24px] text-[#a3a5b0] text-[15px] leading-[1.7]">
        Kaalyug is a developer-focused ecosystem where creators can publish complete projects, discover useful digital products and exchange them through the native YugCoin wallet system.
      </p>

      <div className="flex flex-col sm:flex-row gap-[16px] mt-[35px] w-full sm:w-auto justify-center items-center">
        <a
          href="/marketplace"
          className="btn-hover bg-primary-gradient inline-flex items-center justify-center gap-[8px] px-[24px] py-[14px] rounded-[16px] text-white no-underline text-[13px] font-semibold border border-[rgba(255,255,255,0.15)] w-full sm:w-auto"
        >
          Explore Marketplace <i className="fa-solid fa-arrow-right text-[11px]"></i>
        </a>

        <a
          href="/publish"
          className="btn-hover bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] inline-flex items-center justify-center gap-[8px] px-[24px] py-[14px] rounded-[16px] text-white no-underline text-[13px] font-semibold border border-[rgba(255,255,255,0.1)] w-full sm:w-auto"
        >
          <i className="fa-solid fa-cloud-arrow-up text-[12px]"></i> Publish Your Project
        </a>
      </div>
    </section>
  );
}
