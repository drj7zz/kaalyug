import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/marketplace", label: "Marketplace", icon: "fa-store", authOnly: false },
  { to: "/wallet", label: "YugCoin", icon: "fa-wallet", authOnly: false },
  { to: "/publish", label: "Publish", icon: "fa-cloud-arrow-up", authOnly: true },
  { to: "/ecosystem", label: "Ecosystem", icon: "fa-globe", authOnly: false },
];

function readSession(): UserSession | null {
  try {
    const info = localStorage.getItem("userInfo");
    return info ? (JSON.parse(info) as UserSession) : null;
  } catch {
    localStorage.removeItem("userInfo");
    return null;
  }
}

type UserSession = {
  _id: string;
  name: string;
  email: string;
  token: string;
  role: "user" | "admin";
};

export default function Navbar() {
  const [userInfo, setUserInfo] = useState<UserSession | null>(() => readSession());
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => setUserInfo(readSession()), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);


  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  return (
    <nav className="sticky top-[14px] z-[100] w-[min(94%,1150px)] mx-auto mt-[14px] px-[18px] py-[11px] flex items-center justify-between border border-[rgba(255,255,255,0.1)] rounded-[22px] bg-[rgba(9,9,14,0.72)] backdrop-blur-[28px] shadow-[inset_0_1px_rgba(255,255,255,0.07),0_20px_60px_rgba(0,0,0,0.35)]">
      <Link to="/" className="flex items-center gap-[10px] no-underline">
        <img src="/logo.jpeg" alt="Kaalyug logo" className="w-[40px] h-[40px] rounded-[13px] object-cover" />
        <div className="font-extrabold tracking-[0.08em] leading-tight text-white">
          KAALYUG
          <small className="block mt-[2px] text-[#6e707a] text-[8px] font-medium tracking-[0.04em]">
            OPEN SOURCE. BUILT IN PUBLIC.
          </small>
        </div>
      </Link>

      <div className="flex flex-wrap items-center justify-end gap-[14px] md:gap-[22px]">
        {NAV_LINKS.filter((item) => !item.authOnly || userInfo).map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`no-underline text-[12px] font-medium transition duration-200 flex items-center gap-1.5 ${
              pathname.startsWith(item.to) ? "text-white" : "text-[#92939e] hover:text-white"
            }`}
          >
            <i className={`fa-solid ${item.icon} text-[10px]`}></i> {item.label}
          </Link>
        ))}
        {userInfo ? (
          <div className="flex items-center gap-[15px]">
            <span className="text-white text-[12px] flex items-center gap-1.5"><i className="fa-solid fa-user text-[#71e5d1]"></i> {userInfo.name}</span>
            {userInfo.role === "admin" && <Link to="/admin" className="text-[#71e5d1] text-[11px] font-medium flex items-center gap-1"><i className="fa-solid fa-shield-halved"></i> Admin</Link>}
            <button
              onClick={handleLogout}
              className="btn-hover text-[#ff8799] bg-[rgba(255,135,153,0.1)] px-[12px] py-[8px] rounded-[10px] text-[11px] font-medium flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-[10px]">
            <Link to="/login" className="btn-hover flex items-center gap-1.5 px-[14px] py-[9px] text-[#c9cad1] border border-[rgba(255,255,255,0.12)] rounded-[12px] bg-[rgba(255,255,255,0.04)] text-[12px] font-medium hover:text-white">
              <i className="fa-solid fa-right-to-bracket"></i> Login
            </Link>
            <Link to="/register" className="btn-hover flex items-center gap-1.5 px-[14px] py-[9px] text-[#0b0b0d] rounded-[12px] bg-[#71e5d1] text-[12px] font-bold">
              <i className="fa-solid fa-user-plus"></i> Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
