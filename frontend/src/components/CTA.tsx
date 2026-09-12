export default function CTA() {
  return (
    <section className="max-w-[750px] mx-auto mt-[80px] mb-[80px] px-[30px] py-[55px] text-center rounded-[30px] border border-[#e2e8f0] bg-[rgba(15,23,42,0.055)]">
      <h2 className="text-[clamp(28px,4vw,36px)] tracking-[-1px] font-bold">Build. Publish. Discover.</h2>
      <p className="max-w-[520px] mx-auto mt-[13px] mb-[25px] text-[#64748b] text-[13px] leading-[1.6]">
        Kaalyug connects developer projects and an open ecosystem into one platform.
      </p>
      <a
        href="/publish"
        className="btn-hover bg-primary-gradient inline-flex items-center justify-center gap-[8px] px-[24px] py-[14px] rounded-[16px] text-white no-underline text-[13px] font-semibold border border-[rgba(255,255,255,0.15)]"
      >
        Start Publishing <i className="fa-solid fa-arrow-right text-[11px]"></i>
      </a>
    </section>
  );
}
