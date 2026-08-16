"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

type UserSession = {
  _id: string;
  name: string;
  email: string;
  token: string;
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
        <Link href="#marketplace" className="text-[#92939e] no-underline text-[11px] transition duration-200 hover:text-white">
          Marketplace
        </Link>
        <Link href="#wallet" className="text-[#92939e] no-underline text-[11px] transition duration-200 hover:text-white">
          YugCoin
        </Link>
        <Link href="#publish" className="text-[#92939e] no-underline text-[11px] transition duration-200 hover:text-white">
          Publish
        </Link>
        <Link href="/#ecosystem" className="text-[#92939e] no-underline text-[11px] transition duration-200 hover:text-white">
          Ecosystem
        </Link>
        {userInfo ? (
          <div className="flex items-center gap-[15px]">
            <span className="text-white text-[11px]">Hello, {userInfo.name}</span>
            <button
              onClick={handleLogout}
              className="text-[#ff8799] bg-[rgba(255,135,153,0.1)] px-[10px] py-[6px] rounded-[8px] text-[10px] hover:bg-[rgba(255,135,153,0.2)]"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="px-[13px] py-[9px] text-[#71e5d1] border border-[rgba(94,225,197,0.2)] rounded-[12px] bg-[rgba(94,225,197,0.05)] text-[11px] transition duration-200 hover:bg-[rgba(94,225,197,0.1)]">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
