import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { getSession, clearSession, type UserSession } from "../lib/auth";

const NAV_LINKS = [
  { to: "/", label: "Home", icon: "fa-house", authOnly: false },
  { to: "/marketplace", label: "Marketplace", icon: "fa-store", authOnly: false },
  { to: "/publish", label: "Publish", icon: "fa-cloud-arrow-up", authOnly: true },
  { to: "/dashboard", label: "Dashboard", icon: "fa-gauge-high", authOnly: true },
  { to: "/ecosystem", label: "Ecosystem", icon: "fa-globe", authOnly: false },
  { to: "/about", label: "About", icon: "fa-circle-info", authOnly: false },
];

export default function Navbar() {
  const [userInfo, setUserInfo] = useState<UserSession | null>(() => getSession());
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => setUserInfo(getSession()), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Close open menus on navigation and whenever we cross the desktop breakpoint.
  useEffect(() => { setMenuOpen(false); setUserMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 769px)");
    const sync = () => {
      if (desktop.matches) setMenuOpen(false);
      else setUserMenuOpen(false);
    };
    sync();
    desktop.addEventListener("change", sync);
    return () => desktop.removeEventListener("change", sync);
  }, []);

  // Standard dropdown behavior: close when clicking outside or pressing Escape.
  useEffect(() => {
    if (!userMenuOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setUserMenuOpen(false); };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [userMenuOpen]);

  const handleLogout = () => {
    clearSession();
    setUserInfo(null);
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  const visibleLinks = NAV_LINKS.filter((item) => !item.authOnly || userInfo);
  const initial = userInfo?.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <nav className="glass-card sticky top-[14px] z-[100] w-[min(94%,1150px)] mx-auto mt-[14px] relative" style={{ padding: "0.75rem 1.25rem", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px) saturate(150%)", WebkitBackdropFilter: "blur(20px) saturate(150%)" }}>
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-[10px] no-underline">
          <img src="/logo.jpeg" alt="Kaalyug logo" className="logo-blend w-[40px] h-[40px] rounded-[13px] object-cover" />
          <div className="wordmark-nav text-[#1e293b] leading-tight">
            Kaalyug
            <small className="hide-tight block mt-[2px] text-[#64748b] text-[8px] font-medium tracking-[0.04em]" style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
              OPEN SOURCE. BUILT IN PUBLIC.
            </small>
          </div>
        </Link>

        <div className="nav-links flex flex-wrap items-center justify-end gap-[14px] md:gap-[22px]">
          {visibleLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={"no-underline text-[12px] font-medium transition duration-200 " +
                (pathname.startsWith(item.to) ? "text-[#1e293b] font-bold" : "text-[#64748b] hover:text-[#1e293b]")}
            >
              {item.label}
            </Link>
          ))}
          {userInfo ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                className="flex items-center gap-[8px] bg-transparent border-0 p-0 cursor-pointer"
              >
                <span className="avatar" style={{ width: "2rem", height: "2rem", fontSize: "0.85rem" }}>{initial}</span>
                {/* Name + email preview — visible on any screen wide enough for it */}
                <span className="hidden min-[520px]:block text-left leading-tight max-w-[130px] lg:max-w-[170px] whitespace-nowrap">
                  <span className="block text-[12px] font-semibold text-[#1e293b] truncate">{userInfo.name}</span>
                  <span className="block text-[10px] text-[#64748b] truncate">{userInfo.email}</span>
                </span>
                <i className={"fa-solid fa-chevron-down text-[#64748b] text-[9px] transition-transform duration-200 " + (userMenuOpen ? "rotate-180" : "")}></i>
              </button>

              {userMenuOpen && (
                <div className="dropdown slide-in absolute right-0 top-[calc(100%+10px)] w-[min(84vw,260px)]" role="menu">
                  <div className="dropdown-header flex items-center gap-[10px]">
                    <span className="avatar" style={{ width: "2.4rem", height: "2.4rem", fontSize: "1rem" }}>{initial}</span>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-[#1e293b] truncate">{userInfo.name}</div>
                      <div className="text-[#64748b] text-[11px] truncate">{userInfo.email}</div>
                    </div>
                  </div>
                  <Link to="/profile" className="dropdown-item no-underline" role="menuitem">
                    <i className="fa-solid fa-user w-[18px] text-[#64748b]"></i> Profile
                  </Link>
                  {userInfo.role === "admin" && (
                    <Link to="/admin" className="dropdown-item no-underline" role="menuitem">
                      <i className="fa-solid fa-shield-halved w-[18px] text-[#64748b]"></i> Admin
                    </Link>
                  )}
                  <button onClick={handleLogout} className="dropdown-item" style={{ color: "#e11d48" }} role="menuitem">
                    <i className="fa-solid fa-arrow-right-from-bracket w-[18px]"></i> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-[10px]">
              <Link to="/login" className="no-underline text-[12px] font-medium text-[#64748b] hover:text-[#1e293b] transition duration-200">
                Login
              </Link>
              <Link to="/register" className="btn-primary no-underline text-[12px] !py-[7px] !px-[13px]">
                Sign up
              </Link>
            </div>
          )}
        </div>

        <button
          className="hamburger btn-secondary"
          style={{ padding: "0.5rem 0.75rem", display: "none" }}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <i className={"fa-solid " + (menuOpen ? "fa-xmark" : "fa-bars") + " text-[14px]"}></i>
        </button>
      </div>

      {menuOpen && (
        <div className="dropdown slide-in absolute right-0 top-[calc(100%+8px)] w-[min(92vw,280px)] max-h-[70vh] overflow-y-auto">
          <div className="dropdown-header">
            {userInfo ? (
              <div className="flex items-center gap-[10px]">
                <span className="avatar" style={{ width: "2.4rem", height: "2.4rem", fontSize: "1rem" }}>{initial}</span>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-[#1e293b] truncate">{userInfo.name}</div>
                  <div className="text-[#64748b] text-[11px] truncate">{userInfo.email}</div>
                </div>
              </div>
            ) : (
              <div className="wordmark text-[15px] text-[#1e293b]">Kaalyug</div>
            )}
          </div>
          {visibleLinks.map((item) => (
            <Link key={item.to} to={item.to} className="dropdown-item no-underline">
              <i className={`fa-solid ${item.icon} w-[18px] text-[#64748b]`}></i> {item.label}
            </Link>
          ))}
          {userInfo ? (
            <>
              <Link to="/profile" className="dropdown-item no-underline">
                <i className="fa-solid fa-user w-[18px] text-[#64748b]"></i> Profile
              </Link>
              {userInfo.role === "admin" && (
                <Link to="/admin" className="dropdown-item no-underline">
                  <i className="fa-solid fa-shield-halved w-[18px] text-[#64748b]"></i> Admin
                </Link>
              )}
              <button onClick={handleLogout} className="dropdown-item" style={{ color: "#e11d48" }}>
                <i className="fa-solid fa-arrow-right-from-bracket w-[18px]"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="dropdown-item no-underline">
                <i className="fa-solid fa-right-to-bracket w-[18px] text-[#64748b]"></i> Login
              </Link>
              <Link to="/register" className="dropdown-item no-underline">
                <i className="fa-solid fa-user-plus w-[18px] text-[#64748b]"></i> Create account
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
