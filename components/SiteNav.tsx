"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Platform" },
  { href: "/team", label: "The Ticket" },
  { href: "/map", label: "2024 Map" },
  { href: "/news", label: "News" },
  { href: "/volunteer", label: "Volunteer" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top thin stripe banner */}
      <div style={{
        height: 6,
        background: "linear-gradient(90deg, #b22234 0 33%, #fff 33% 66%, #0a2463 66% 100%)",
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 110,
      }} />

      <nav
        style={{
          position: "fixed",
          top: 6, left: 0, right: 0, zIndex: 100,
          background: scrolled
            ? "rgba(5, 13, 45, 0.92)"
            : "linear-gradient(180deg, rgba(5,13,45,0.85), rgba(5,13,45,0.55))",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: scrolled ? "1px solid rgba(245,197,24,0.25)" : "1px solid transparent",
          transition: "all 0.3s ease",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 clamp(1rem, 4vw, 2.5rem)", height: 70,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
          <SealLogo />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ color: "#fff", fontSize: 17, fontWeight: 800, letterSpacing: 0.5, fontFamily: "var(--font-playfair), Georgia, serif" }}>
              SHUMARD <span style={{ color: "#f5c518" }}>/</span> CENTLIVRE
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 4, marginTop: 2 }}>2028 · UNITED STATES</div>
          </div>
        </Link>

        <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: "clamp(0.6rem, 1.4vw, 1.6rem)" }}>
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} style={{
                color: active ? "#f5c518" : "#fff",
                fontSize: 13, fontWeight: 600, textTransform: "uppercase",
                letterSpacing: 1.5, textDecoration: "none", padding: "6px 4px",
                borderBottom: active ? "2px solid #f5c518" : "2px solid transparent",
                transition: "all 0.2s ease",
              }}>
                {l.label}
              </Link>
            );
          })}
          <Link href="/volunteer" style={{
            background: "linear-gradient(180deg, #f5c518, #c79a16)",
            color: "#0a0a0f", padding: "10px 20px", borderRadius: 4,
            fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase",
            textDecoration: "none", boxShadow: "0 4px 0 #7a0f1f",
          }}>Donate</Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="mobile-only"
          style={{
            background: "transparent", border: "1px solid rgba(255,255,255,0.4)",
            color: "#fff", width: 44, height: 44, borderRadius: 4, cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 20 }}>{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open && (
        <div className="mobile-only" style={{
          position: "fixed", top: 76, left: 0, right: 0, zIndex: 99,
          background: "rgba(5,13,45,0.97)", backdropFilter: "blur(20px)",
          padding: "1.25rem", display: "flex", flexDirection: "column", gap: 4,
          borderBottom: "3px solid #f5c518",
        }}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              color: pathname === l.href ? "#f5c518" : "#fff",
              padding: "14px 12px", borderRadius: 6, textDecoration: "none",
              fontSize: 15, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
              borderLeft: pathname === l.href ? "3px solid #f5c518" : "3px solid transparent",
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/volunteer" onClick={() => setOpen(false)} style={{
            marginTop: 10, background: "#f5c518", color: "#0a0a0f", padding: "14px",
            borderRadius: 6, textAlign: "center", fontWeight: 800, letterSpacing: 1.5,
            textTransform: "uppercase", textDecoration: "none",
          }}>Donate</Link>
        </div>
      )}
    </>
  );
}

function SealLogo() {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: "50%",
      background: "radial-gradient(circle at 30% 30%, #fff 0%, #f5c518 60%, #c79a16 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      border: "2px solid #fff", boxShadow: "0 0 0 2px #b22234, 0 6px 14px rgba(0,0,0,0.35)",
      position: "relative",
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0a2463" aria-hidden>
        <path d="M12 2l2.39 4.84L20 7.6l-4 3.9.94 5.5L12 14.77 7.06 17l.94-5.5-4-3.9 5.61-.76L12 2z" />
      </svg>
    </div>
  );
}
