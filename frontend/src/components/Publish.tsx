"use client";

import { useState } from "react";
import { apiUrl } from "../lib/api";

export default function Publish() {
  const [access, setAccess] = useState("free");
  const [isPublishing, setIsPublishing] = useState(false);
  const [buttonText, setButtonText] = useState("Publish Project →");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "development",
    tag: "Complete Project",
    githubUrl: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePublish = async () => {
    setError("");
    if (!formData.name || !formData.description) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsPublishing(true);
    setButtonText("Publishing...");

    try {
      const userInfoString = localStorage.getItem("userInfo");
      if (!userInfoString) {
        throw new Error("You must be logged in to publish a project.");
      }
      const userInfo = JSON.parse(userInfoString);

      const payload = {
        ...formData,
        price: access === "free" ? "FREE" : "100 YC", // Dummy pricing for now
        symbol: formData.name.charAt(0).toUpperCase() || "P",
        previewClass: `product-preview-${Math.floor(Math.random() * 6) + 1}`,
      };

      const response = await fetch(`${apiUrl}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to publish project.");
      }

      setButtonText("✓ Project Published");
      setTimeout(() => {
        setIsPublishing(false);
        setButtonText("Publish Another Project →");
        setFormData({ name: "", description: "", category: "development", tag: "Complete Project", githubUrl: "" });
      }, 2500);
    } catch (err: any) {
      setError(err.message);
      setIsPublishing(false);
      setButtonText("Publish Project →");
    }
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
            LIVE
          </div>
        </div>

        {error && <div className="mt-4 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-xs text-center">{error}</div>}

        <div className="mt-[22px] pb-[18px] flex items-center gap-[11px] border-b border-[rgba(255,255,255,0.07)]">
          <div className="w-[35px] h-[35px] grid place-items-center rounded-[11px] text-[13px] font-bold bg-gradient-to-br from-[#784bff] to-[#4fcfff] shadow-[0_0_20px_rgba(120,70,255,0.25)] text-white">
            {formData.name.charAt(0).toUpperCase() || "K"}
          </div>
          <div>
            <strong className="block text-[10px]">{formData.name || "Your Project"}</strong>
            <small className="block mt-[3px] text-[#696b76] text-[8px]">by You</small>
          </div>
        </div>

        <div className="relative mt-[17px]">
          <label className="block mb-[7px] text-[#676974] text-[8px] tracking-[0.1em]">PROJECT NAME</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="My Awesome Project"
            className="w-full min-h-[38px] flex items-center justify-between px-[12px] py-[10px] rounded-[11px] text-[#a9aab4] bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] text-[12px] outline-none focus:border-[#7647ff] transition-colors"
          />
        </div>

        <div className="relative mt-[17px]">
          <label className="block mb-[7px] text-[#676974] text-[8px] tracking-[0.1em]">DESCRIPTION</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="A complete project built for the community..."
            rows={3}
            className="w-full min-h-[48px] flex items-start px-[12px] py-[10px] rounded-[11px] text-[#a9aab4] bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] text-[12px] outline-none focus:border-[#7647ff] transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] mt-[17px]">
          <div className="relative">
            <label className="block mb-[7px] text-[#676974] text-[8px] tracking-[0.1em]">CATEGORY</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full min-h-[38px] flex items-center justify-between px-[12px] py-[10px] rounded-[11px] text-[#a9aab4] bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] text-[12px] outline-none focus:border-[#7647ff] transition-colors appearance-none"
            >
              <option value="development">Web Development</option>
              <option value="ui">UI / Components</option>
              <option value="templates">Templates</option>
              <option value="tools">Tools</option>
            </select>
          </div>
          <div className="relative">
            <label className="block mb-[7px] text-[#676974] text-[8px] tracking-[0.1em]">PROJECT TYPE</label>
            <select
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
              className="w-full min-h-[38px] flex items-center justify-between px-[12px] py-[10px] rounded-[11px] text-[#a9aab4] bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] text-[12px] outline-none focus:border-[#7647ff] transition-colors appearance-none"
            >
              <option value="Complete Project">Complete Project</option>
              <option value="Open Source">Open Source</option>
              <option value="Design Asset">Design Asset</option>
            </select>
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
              } border transition-colors`}
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
              } border transition-colors`}
              onClick={() => setAccess("paid")}
            >
              <strong className={`block text-[9px] ${access === "paid" ? "text-[#66dfca]" : "text-[#a9abb6]"}`}>PAID</strong>
              <small className="block mt-[4px] text-[#656773] text-[8px]">YugCoin price</small>
            </div>
          </div>
        </div>

        <div className="relative mt-[17px]">
          <label className="block mb-[7px] text-[#676974] text-[8px] tracking-[0.1em]">SOURCE / DEMO</label>
          <div className="relative w-full">
            <i className="fa-brands fa-github absolute left-[12px] top-1/2 -translate-y-1/2 text-[#676974] text-[12px]"></i>
            <input
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleInputChange}
              placeholder="github.com/your-project"
              className="w-full min-h-[38px] flex items-center justify-between pl-[32px] pr-[12px] py-[10px] rounded-[11px] text-[#a9aab4] bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] text-[12px] outline-none focus:border-[#7647ff] transition-colors"
            />
          </div>
        </div>

        <button
          className="btn-hover w-full mt-[20px] p-[13px] border-0 rounded-[13px] text-white text-[10px] font-semibold flex justify-center items-center gap-[6px] shadow-[0_10px_30px_rgba(110,70,255,0.25)]"
          style={{ background: isPublishing ? "linear-gradient(100deg,#36c9a5,#51d7c2)" : "linear-gradient(100deg,#51c9ff,#9853ff)" }}
          onClick={handlePublish}
          disabled={isPublishing}
        >
          {isPublishing ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>} {buttonText}
        </button>

        <p className="mt-[10px] text-[#555761] text-center text-[8px]"><i className="fa-solid fa-circle-check mr-1"></i>Publishing is now live and connects to the backend database.</p>
      </div>
    </section>
  );
}
