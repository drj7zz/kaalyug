"use client";

import { useState } from "react";

export default function Publish() {
  const [access, setAccess] = useState("free");
  const [isPublishing, setIsPublishing] = useState(false);
  const [buttonText, setButtonText] = useState("Publish Project →");

  const handlePublish = () => {
    setIsPublishing(true);
    setButtonText("✓ Project Ready for Review");
    setTimeout(() => {
      setIsPublishing(false);
      setButtonText("Publish Project →");
    }, 2500);
  };

  return (
    <section id="publish" className="w-[min(92%,1100px)] mx-auto mt-[90px] grid grid-cols-1 md:grid-cols-2 gap-[25px]">
      <div className="md:self-center py-[25px] px-[10px] md:py-[40px] md:px-[15px]">
        <div className="inline-flex items-center gap-[8px] px-[11px] py-[7px] rounded-[30px] text-[#c0adff] bg-[rgba(150,90,255,0.08)] border border-[rgba(150,90,255,0.18)] text-[9px] tracking-[0.08em]">
          <span className="w-[5px] h-[5px] rounded-full bg-[#a366ff] shadow-[0_0_12px_#a366ff]"></span>
          FOR DEVELOPERS & CREATORS
        </div>

        <h2 className="mt-[22px] text-[clamp(36px,4vw,55px)] leading-none tracking-[-2.5px] font-bold">
          Built something?
          <br />
          <span className="text-gradient">Publish it to Kaalyug.</span>
        </h2>

        <p className="max-w-[470px] mt-[22px] text-[#858792] text-[13px] leading-[1.8]">
          Turn your complete project into a discoverable Kaalyug product. Publish it as free or paid, showcase the author, connect the source code, and eventually receive YugCoin through ecosystem activity.
        </p>

        <div className="mt-[35px] grid grid-cols-1 md:grid-cols-2 gap-[10px]">
          {[
            { num: "01", text: "Complete Project" },
            { num: "02", text: "Author Profile" },
            { num: "03", text: "Free or Paid" },
            { num: "04", text: "YugCoin Economy" },
          ].map((point, i) => (
            <div key={i} className="p-[14px] flex items-center gap-[12px] border border-[rgba(255,255,255,0.07)] rounded-[14px] bg-[rgba(255,255,255,0.025)]">
              <b className="text-[#765d9d] text-[9px]">{point.num}</b>
              <span className="text-[#b4b5be] text-[10px]">{point.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="publish-card-bg relative p-[25px] overflow-hidden rounded-[27px] border border-[rgba(255,255,255,0.13)] backdrop-blur-[30px] shadow-[inset_0_1px_rgba(255,255,255,0.09),0_30px_90px_rgba(0,0,0,0.4)]">
        <div className="relative flex justify-between items-start">
          <div>
            <span className="text-[#777984] text-[8px] tracking-[0.15em]">NEW PROJECT</span>
            <h3 className="mt-[6px] text-[17px] font-bold">Publish to Kaalyug</h3>
          </div>
          <div className="px-[9px] py-[6px] rounded-[8px] text-[#888a95] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[8px]">
            DRAFT
          </div>
        </div>

        <div className="mt-[22px] pb-[18px] flex items-center gap-[11px] border-b border-[rgba(255,255,255,0.07)]">
          <div className="w-[35px] h-[35px] grid place-items-center rounded-[11px] text-[13px] font-bold bg-gradient-to-br from-[#784bff] to-[#4fcfff] shadow-[0_0_20px_rgba(120,70,255,0.25)] text-white">
            K
          </div>
          <div>
            <strong className="block text-[10px]">Your Project</strong>
            <small className="block mt-[3px] text-[#696b76] text-[8px]">by Author</small>
          </div>
        </div>

        <div className="relative mt-[17px]">
          <label className="block mb-[7px] text-[#676974] text-[8px] tracking-[0.1em]">PROJECT NAME</label>
          <div className="min-h-[38px] flex items-center justify-between px-[12px] py-[10px] rounded-[11px] text-[#a9aab4] bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] text-[9px]">
            My Awesome Project
          </div>
        </div>

        <div className="relative mt-[17px]">
          <label className="block mb-[7px] text-[#676974] text-[8px] tracking-[0.1em]">DESCRIPTION</label>
          <div className="min-h-[48px] flex items-start px-[12px] py-[10px] rounded-[11px] text-[#70727d] bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] text-[9px]">
            A complete project built for the community...
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] mt-[17px]">
          <div className="relative">
            <label className="block mb-[7px] text-[#676974] text-[8px] tracking-[0.1em]">CATEGORY</label>
            <div className="min-h-[38px] flex items-center justify-between px-[12px] py-[10px] rounded-[11px] text-[#a9aab4] bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] text-[9px]">
              Web Development <span>⌄</span>
            </div>
          </div>
          <div className="relative">
            <label className="block mb-[7px] text-[#676974] text-[8px] tracking-[0.1em]">PROJECT TYPE</label>
            <div className="min-h-[38px] flex items-center justify-between px-[12px] py-[10px] rounded-[11px] text-[#a9aab4] bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] text-[9px]">
              Complete Project <span>⌄</span>
            </div>
          </div>
        </div>

        <div className="relative mt-[17px]">
          <label className="block mb-[7px] text-[#676974] text-[8px] tracking-[0.1em]">PROJECT ACCESS</label>
          <div className="grid grid-cols-2 gap-[8px]">
            <div
              className={`p-[11px] rounded-[11px] cursor-pointer ${
                access === "free"
                  ? "bg-[rgba(60,220,190,0.06)] border-[rgba(100,220,200,0.3)]"
                  : "bg-[rgba(255,255,255,0.025)] border-[rgba(255,255,255,0.08)]"
              } border`}
              onClick={() => setAccess("free")}
            >
              <strong className={`block text-[9px] ${access === "free" ? "text-[#66dfca]" : "text-[#a9abb6]"}`}>FREE</strong>
              <small className="block mt-[4px] text-[#656773] text-[8px]">Open access</small>
            </div>
            <div
              className={`p-[11px] rounded-[11px] cursor-pointer ${
                access === "paid"
                  ? "bg-[rgba(60,220,190,0.06)] border-[rgba(100,220,200,0.3)]"
                  : "bg-[rgba(255,255,255,0.025)] border-[rgba(255,255,255,0.08)]"
              } border`}
              onClick={() => setAccess("paid")}
            >
              <strong className={`block text-[9px] ${access === "paid" ? "text-[#66dfca]" : "text-[#a9abb6]"}`}>PAID</strong>
              <small className="block mt-[4px] text-[#656773] text-[8px]">YugCoin price</small>
            </div>
          </div>
        </div>

        <div className="relative mt-[17px]">
          <label className="block mb-[7px] text-[#676974] text-[8px] tracking-[0.1em]">SOURCE / DEMO</label>
          <div className="min-h-[38px] flex items-center justify-between px-[12px] py-[10px] rounded-[11px] text-[#a9aab4] bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] text-[9px]">
            <span>github.com/your-project</span>
            <span>↗</span>
          </div>
        </div>

        <button
          className="w-full mt-[20px] p-[13px] border-0 rounded-[13px] text-white text-[10px] font-semibold cursor-pointer shadow-[0_10px_30px_rgba(110,70,255,0.25)] transition duration-250 hover:-translate-y-[2px]"
          style={{ background: isPublishing ? "linear-gradient(100deg,#36c9a5,#51d7c2)" : "linear-gradient(100deg,#51c9ff,#9853ff)" }}
          onClick={handlePublish}
        >
          {buttonText}
        </button>

        <p className="mt-[10px] text-[#555761] text-center text-[8px]">Publishing is currently part of the Kaalyug demo.</p>
      </div>
    </section>
  );
}
