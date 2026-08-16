export default function CTA() {
  return (
    <section className="max-w-[750px] mx-auto mt-[80px] mb-[80px] px-[30px] py-[55px] text-center rounded-[30px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.035)]" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, rgba(150,80,255,0.16), transparent 45%)" }}>
      <h2 className="text-[34px] tracking-[-1.5px] font-bold">Build. Publish. Discover.</h2>
      <p className="max-w-[520px] mx-auto mt-[13px] mb-[25px] text-[#858691] text-[12px] leading-[1.6]">
        Kaalyug connects developer projects, an open ecosystem and the YugCoin demonstration wallet into one platform.
      </p>
      <a
        href="#publish"
        className="btn-hover bg-primary-gradient inline-flex items-center justify-center px-[19px] py-[13px] rounded-[14px] text-white no-underline text-[12px] font-semibold border border-[rgba(255,255,255,0.1)]"
      >
        Start Publishing →
      </a>
    </section>
  );
}
