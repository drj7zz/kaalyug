import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/** Shared shell for every page: navbar on top, footer at the bottom. */
export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top whenever the route changes (no more long one-pager scroll jumps).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
