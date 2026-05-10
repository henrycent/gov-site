"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import StarField from "@/components/StarField";

const F = "var(--font-inter), system-ui, -apple-system, sans-serif";

const RED = "#9B2335";
const NAVY = "#1D3461";

const HIGHLIGHTS = [
  {
    href: "/platform",
    label: "Our Platform",
    sub: "Ten pillars for a stronger, freer America.",
    accent: RED,
  },
  {
    href: "/admin",
    label: "Administration Plan",
    sub: "Budget, cabinet picks, and the day-one agenda.",
    accent: NAVY,
  },
  {
    href: "/map",
    label: "Electoral Map",
    sub: "291 EV — explore every state's results.",
    accent: RED,
  },
  {
    href: "/team",
    label: "The Ticket",
    sub: "Shumard & Centlivre — who they are and why they're running.",
    accent: NAVY,
  },
  {
    href: "/news",
    label: "News",
    sub: "Campaign updates, speeches, and press releases.",
    accent: RED,
  },
  {
    href: "/volunteer",
    label: "Volunteer",
    sub: "Join the movement and help build the coalition.",
    accent: NAVY,
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main style={{ background: "#fff", color: "#1a1a1a" }}>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #050d2d 0%, #0a1f4d 35%, #0f2a5e 55%, #6b0e1a 85%, #9b1525 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "clamp(100px, 14vw, 140px) clamp(2rem, 8vw, 7rem) 60px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Radial gold glow — upper left */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(245,197,24,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        {/* Soft vignette bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(0deg, rgba(0,0,0,0.35) 0%, transparent 100%)", pointerEvents: "none" }} />
        {mounted && <StarField count={100} goldRatio={0.15} />}

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "2rem" }}>
            <p style={{ color: "#f5c518", fontSize: "11px", letterSpacing: "6px", textTransform: "uppercase", margin: 0 }}>2028 Presidential Campaign</p>
          </div>

          {/* SHUMARD — dominant */}
          <h1 style={{
            fontSize: "clamp(74px, 16vw, 172px)",
            fontWeight: "900",
            color: "#fff",
            lineHeight: 0.88,
            margin: "0 0 0.15em",
            letterSpacing: "-3px",
            fontFamily: F,
          }}>SHUMARD</h1>

          {/* Divider with stars */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", margin: "0.4em 0" }}>
            <span style={{ color: "#f5c518", fontSize: "13px", letterSpacing: "10px" }}>&#9733; &#9733; &#9733;</span>
          </div>

          {/* CENTLIVRE — lighter, italic */}
          <h2 style={{
            fontSize: "clamp(36px, 7.5vw, 84px)",
            fontWeight: "500",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.82)",
            letterSpacing: "clamp(3px, 1.5vw, 12px)",
            margin: "0 0 2.5rem",
            fontFamily: F,
          }}>CENTLIVRE</h2>

          {/* Tagline */}
          <p style={{
            fontSize: "clamp(14px, 1.7vw, 18px)",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "480px",
            lineHeight: 1.85,
            marginBottom: "3rem",
            fontStyle: "italic",
            margin: "0 auto 3rem",
          }}>
            &ldquo;Strength, Integrity, and a Future We Build Together&rdquo;
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/volunteer" className="btn-primary" style={{ background: "linear-gradient(180deg,#f2ede4,#ddd7ca)", color: "#0a1628", border: "2px solid #c8c2b4", boxShadow: "0 6px 0 rgba(0,0,0,0.28), 0 14px 30px rgba(0,0,0,0.35)" }}>Join Our Campaign</Link>
            <Link href="/platform" className="btn-ghost">Our Platform</Link>
          </div>
        </div>
      </section>

      {/* CONSTITUTION PREAMBLE TICKER + BUMPER STICKER — parchment scroll */}
      <div style={{
        background: "linear-gradient(180deg, #f8edd2 0%, #e9cf8c 40%, #f2e0a8 70%, #e6c97a 100%)",
        padding: "22px 0 18px",
        overflow: "hidden",
        borderTop: "2px solid #b8923a",
        borderBottom: "2px solid #b8923a",
        boxShadow: "inset 0 2px 8px rgba(100,60,0,0.12), inset 0 -2px 8px rgba(100,60,0,0.12)",
        position: "relative",
      }}>
        {/* aged paper grain overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(97deg, rgba(160,100,20,0.04) 0 1px, transparent 1px 6px), repeating-linear-gradient(4deg, rgba(180,120,30,0.03) 0 1px, transparent 1px 9px)", pointerEvents: "none" }} />
        {/* Bumper sticker + fade strips — absolutely fills the section, flex-centered */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 4, pointerEvents: "none",
        }}>
          {/* Left fade */}
          <div style={{ alignSelf: "stretch", width: "clamp(80px, 16vw, 220px)", flexShrink: 0, background: "linear-gradient(to right, transparent, rgba(234,208,142,0.97))" }} />
          {/* Bumper sticker */}
          <div style={{ flexShrink: 0, pointerEvents: "auto" }}>
            <div style={{
              display: "inline-flex", alignItems: "stretch",
              borderRadius: 8, overflow: "hidden",
              border: "2px solid #b22234",
              boxShadow: "0 4px 18px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.15)",
            }}>
              <div style={{ width: 13, background: "repeating-linear-gradient(180deg, #b22234 0 33%, #fff 33% 66%, #0a2463 66% 100%)" }} />
              <div style={{ background: NAVY, padding: "9px 26px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <span style={{ color: "#f5c518", fontWeight: 900, fontSize: "clamp(14px, 2.5vw, 20px)", letterSpacing: "3px", textTransform: "uppercase", fontFamily: F }}>SHUMARD &middot; CENTLIVRE 2028</span>
                <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(10px, 1.4vw, 13px)", fontStyle: "italic", letterSpacing: "2px" }}>Strength. Integrity. Together.</span>
              </div>
              <div style={{ width: 13, background: "repeating-linear-gradient(180deg, #b22234 0 33%, #fff 33% 66%, #0a2463 66% 100%)" }} />
            </div>
          </div>
          {/* Right fade */}
          <div style={{ alignSelf: "stretch", width: "clamp(80px, 16vw, 220px)", flexShrink: 0, background: "linear-gradient(to left, transparent, rgba(234,208,142,0.97))" }} />
        </div>
        {/* Scrolling preamble */}
        <div className="ticker-track" style={{ position: "relative" }}>
          {[0, 1].map((n) => (
            <span key={n} style={{ display: "inline-block", whiteSpace: "nowrap", paddingRight: "5rem", color: "rgba(72,38,6,0.82)", fontSize: "clamp(18px, 2.4vw, 26px)", letterSpacing: "2px", fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic" }}>
              We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America
              <span style={{ color: "rgba(120,70,10,0.4)", margin: "0 2rem" }}>&#9733;</span>
            </span>
          ))}
        </div>
      </div>

      {/* EV TALLY */}
      <section style={{ background: NAVY, padding: "2.5rem 2rem" }} className="reveal">
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", letterSpacing: "4px", textAlign: "center", marginBottom: "1rem", textTransform: "uppercase" }}>
            2028 Electoral College Projection
          </p>
          <div style={{ display: "flex", borderRadius: "6px", overflow: "hidden", border: "2px solid #f5c518", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
            <div style={{ flex: 291, background: "linear-gradient(90deg, #7a0f1f, #b22234)", padding: "1.25rem 2rem", color: "#fff" }}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", opacity: 0.85 }}>SHUMARD / CENTLIVRE</div>
              <div style={{ fontSize: "2.8rem", fontWeight: "900", fontFamily: F, lineHeight: 1 }}>291 <span style={{ fontSize: "14px", fontWeight: "500" }}>EV</span></div>
            </div>
            <div style={{ flex: 247, background: "linear-gradient(90deg, #1d3893, #0a2463)", padding: "1.25rem 2rem", color: "#fff", textAlign: "right" }}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", opacity: 0.85 }}>HOWELL / RIVERA</div>
              <div style={{ fontSize: "2.8rem", fontWeight: "900", fontFamily: F, lineHeight: 1 }}>247 <span style={{ fontSize: "14px", fontWeight: "500" }}>EV</span></div>
            </div>
          </div>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "11px", marginTop: "0.6rem", letterSpacing: "2px" }}>
            ★ 270 ELECTORAL VOTES NEEDED TO WIN ★
          </p>
          <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
            <Link href="/map" style={{ color: "#f5c518", fontSize: "13px", letterSpacing: "2px", textDecoration: "none", textTransform: "uppercase" }}>
              Explore the map →
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ padding: "90px 2rem", maxWidth: "940px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
          <p style={{ color: RED, letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase", margin: 0 }}>Our Story</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", color: NAVY, marginTop: "0.5rem", fontFamily: F }}>Why We&rsquo;re Running</h2>
          <div style={{ width: "50px", height: "3px", background: RED, margin: "1rem auto 0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          <div style={{ background: "#f9f8f7", borderLeft: `4px solid ${RED}`, padding: "2rem", borderRadius: "0 6px 6px 0" }} className="reveal-left">
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "#444", margin: 0 }}>
              America stands at a crossroads. Families are struggling, trust in institutions is at a low, and the political establishment has failed to deliver results. The American people deserve leaders who work for them — not for special interests or party bosses.
            </p>
          </div>
          <div style={{ background: "#f9f8f7", borderLeft: `4px solid ${NAVY}`, padding: "2rem", borderRadius: "0 6px 6px 0" }} className="reveal-right">
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "#444", margin: 0 }}>
              Cal Shumard and Henry Centlivre are running because they believe in a government that is honest, effective, and accountable. Guided by deep faith and grounded in service, integrity, and family — their values form the bedrock of this campaign.
            </p>
          </div>
        </div>
      </section>

      {/* QUOTE BANNER */}
      <section style={{ background: "#f6f5f3", padding: "3rem 2rem", textAlign: "center" }} className="reveal">
        <p style={{ color: NAVY, fontSize: "clamp(16px, 2.2vw, 21px)", fontStyle: "italic", maxWidth: "780px", margin: "0 auto", lineHeight: 1.7 }}>
          &ldquo;America&rsquo;s greatest days are not behind us — they are ahead of us, if we are bold enough to reach for them.&rdquo;
        </p>
        <p style={{ color: "#999", marginTop: "1rem", letterSpacing: "3px", fontSize: "11px", textTransform: "uppercase" }}>— Cal Shumard</p>
      </section>

      {/* EXPLORE SECTION */}
      <section style={{ padding: "90px 2rem" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
            <p style={{ color: RED, letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase", margin: 0 }}>Explore the Campaign</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", color: NAVY, marginTop: "0.5rem", fontFamily: F }}>Everything You Need to Know</h2>
            <div style={{ width: "50px", height: "3px", background: RED, margin: "1rem auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {HIGHLIGHTS.map((h, i) => (
              <Link key={h.href} href={h.href} style={{ textDecoration: "none" }}>
                <div
                  className={`reveal stagger-${(i % 6) + 1}`}
                  style={{
                    background: "#fff", border: "1px solid #e4e2de", borderRadius: "8px",
                    padding: "1.75rem", borderTop: `3px solid ${h.accent}`,
                    transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer", height: "100%",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  <h3 style={{ color: NAVY, fontSize: "19px", marginBottom: "0.5rem", fontWeight: "700", fontFamily: F, marginTop: 0 }}>{h.label}</h3>
                  <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>{h.sub}</p>
                  <p style={{ color: h.accent, fontSize: "13px", marginTop: "1rem", marginBottom: 0, fontWeight: "600" }}>Learn more →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SLOGAN CTA */}
      <section style={{ background: RED, padding: "4rem 2rem", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", marginBottom: "1rem" }}>
          The 2028 Campaign
        </p>
        <h2 style={{ color: "#fff", fontSize: "clamp(24px, 4vw, 42px)", fontWeight: "800", letterSpacing: "3px", fontFamily: F, marginBottom: "2rem", textTransform: "uppercase" }}>
          Strength &middot; Integrity &middot; Together
        </h2>
        <Link href="/volunteer" className="btn-primary">Join the Movement</Link>
      </section>

    </main>
  );
}
