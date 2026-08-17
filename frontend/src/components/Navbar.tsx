import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type UserSession = {
  _id: string;
  name: string;
  email: string;
  token: string;
  role: "user" | "admin";
};

export default function Navbar() {
  const [userInfo, setUserInfo] = useState<UserSession | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const info = localStorage.getItem("userInfo");
        setUserInfo(info ? (JSON.parse(info) as UserSession) : null);
      } catch {
        localStorage.removeItem("userInfo");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  return (
    <nav className="sticky top-[14px] z-[100] w-[min(94%,1150px)] mx-auto mt-[14px] px-[18px] py-[11px] flex items-center justify-between border border-[rgba(255,255,255,0.1)] rounded-[22px] bg-[rgba(9,9,14,0.72)] backdrop-blur-[28px] shadow-[inset_0_1px_rgba(255,255,255,0.07),0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-[10px]">
        <div className="w-[40px] h-[40px] grid place-items-center rounded-[13px] text-[22px] font-extrabold bg-gradient-to-br from-[#7647ff] to-[#50d8ff] shadow-[0_0_28px_rgba(120,70,255,0.35),inset_0_1px_rgba(255,255,255,0.35)]">
          K
        </div>
        <div className="font-extrabold tracking-[0.08em] leading-tight">
          KAALYUG
          <small className="block mt-[2px] text-[#6e707a] text-[8px] font-medium tracking-[0.04em]">
            OPEN SOURCE. BUILT IN PUBLIC.
          </small>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-[22px]">
        <a href="#marketplace" className="text-[#92939e] no-underline text-[12px] font-medium transition duration-200 hover:text-white flex items-center gap-1.5">
          <i className="fa-solid fa-store text-[10px]"></i> Marketplace
        </a>
        <a href="#wallet" className="text-[#92939e] no-underline text-[12px] font-medium transition duration-200 hover:text-white flex items-center gap-1.5">
          <i className="fa-solid fa-wallet text-[10px]"></i> YugCoin
        </a>
        <a href="#publish" className="text-[#92939e] no-underline text-[12px] font-medium transition duration-200 hover:text-white flex items-center gap-1.5">
          <i className="fa-solid fa-cloud-arrow-up text-[10px]"></i> Publish
        </a>
        <a href="#ecosystem" className="text-[#92939e] no-underline text-[12px] font-medium transition duration-200 hover:text-white flex items-center gap-1.5">
          <i className="fa-solid fa-globe text-[10px]"></i> Ecosystem
        </a>
        {userInfo ? (
          <div className="flex items-center gap-[15px]">
            <span className="text-white text-[12px] flex items-center gap-1.5"><i className="fa-solid fa-user text-[#7647ff]"></i> {userInfo.name}</span>
            {userInfo.role === "admin" && <Link to="/admin" className="text-[#71e5d1] text-[11px] font-medium flex items-center gap-1"><i className="fa-solid fa-shield-halved"></i> Admin</Link>}
            <button
              onClick={handleLogout}
              className="btn-hover text-[#ff8799] bg-[rgba(255,135,153,0.1)] px-[12px] py-[8px] rounded-[10px] text-[11px] font-medium flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-hover flex items-center gap-1.5 px-[16px] py-[10px] text-[#71e5d1] border border-[rgba(94,225,197,0.2)] rounded-[12px] bg-[rgba(94,225,197,0.05)] text-[12px] font-medium">
            <i className="fa-solid fa-right-to-bracket"></i> Login
          </Link>
        )}
      </div>
    </nav>
  );
}
