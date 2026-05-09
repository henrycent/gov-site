"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import StarField from "@/components/StarField";

export default function Home() {
  const [evCount, setEvCount] = useState(0);
  const [statesCount, setStatesCount] = useState(0);
  const [marginCount, setMarginCount] = useState(0);
  const [donationCount, setDonationCount] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const onScroll = () => setParallax(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = { ev: 358, states: 36, margin: 8, donations: 142 };
    const dur = 1800;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setEvCount(Math.round(targets.ev * e));
      setStatesCount(Math.round(targets.states * e));
      setMarginCount(Math.round(targets.margin * e));
      setDonationCount(Math.round(targets.donations * e));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <main style={{ background: "#fbfbfd", color: "#0c1024" }}>
      {/* HERO */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          paddingTop: 76,
          background:
            "radial-gradient(ellipse at 80% 0%, #1d3893 0%, transparent 50%), radial-gradient(ellipse at 0% 80%, #b22234 0%, transparent 55%), linear-gradient(160deg, #050d2d 0%, #0a2463 50%, #7a0f1f 100%)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 1.5rem 80px",
        }}
      >
        <StarField count={120} goldRatio={0.22} />

        {/* Big floating star */}
        <div
          style={{
            position: "absolute",
            right: "-40px",
            top: "15%",
            opacity: 0.08,
            transform: `translateY(${parallax * 0.15}px) rotate(${parallax * 0.05}deg)`,
            pointerEvents: "none",
          }}
        >
          <Star size={260} color="#f5c518" />
        </div>
        <div
          style={{
            position: "absolute",
            left: "-30px",
            bottom: "10%",
            opacity: 0.06,
            transform: `translateY(${parallax * -0.1}px) rotate(${parallax * -0.05}deg)`,
            pointerEvents: "none",
          }}
        >
          <Star size={200} color="#fff" />
        </div>

        {/* Animated stripes ribbon */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,1) 0 2px, transparent 2px 60px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto" }} className="fade-up">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 18px",
              border: "1px solid rgba(245, 197, 24, 0.5)",
              borderRadius: 999,
              fontSize: 11,
              letterSpacing: 4,
              color: "#f5c518",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#f5c518", animation: "pulse-ring 1.6s infinite" }} />
            Officially declared · 2028 cycle
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(56px, 11vw, 144px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 0.95,
              letterSpacing: "-2px",
              margin: 0,
              textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            }}
          >
            SHUMARD
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              margin: "6px 0 14px",
            }}
          >
            <span style={{ height: 1, width: 60, background: "rgba(245,197,24,0.5)" }} />
            <span
              className="gold-shine"
              style={{
                fontSize: 14,
                letterSpacing: 6,
                fontWeight: 700,
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              ★ ★ ★
            </span>
            <span style={{ height: 1, width: 60, background: "rgba(245,197,24,0.5)" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(28px, 5.5vw, 64px)",
              fontWeight: 400,
              color: "#f5c518",
              letterSpacing: 6,
              margin: 0,
            }}
          >
            CENTLIVRE
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(17px, 2.2vw, 22px)",
              fontStyle: "italic",
              maxWidth: 720,
              margin: "32px auto 40px",
              lineHeight: 1.5,
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            “Strength, integrity, and a future we build together.”
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/volunteer" className="btn-primary">
              Join the Movement →
            </Link>
            <Link href="/platform" className="btn-ghost">
              Our Platform
            </Link>
          </div>

          {/* Live counter strip */}
          <div
            style={{
              marginTop: 64,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 16,
              maxWidth: 880,
              margin: "64px auto 0",
            }}
          >
            <Stat number={evCount} label="Electoral Votes" suffix="" />
            <Stat number={statesCount} label="States Won" suffix="" />
            <Stat number={marginCount} label="Popular Vote Margin" suffix="%" />
            <Stat number={donationCount} label="Counties Flipped" suffix="+" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.55)",
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "float 2.6s ease-in-out infinite",
          }}
        >
          Scroll
          <span style={{ fontSize: 18 }}>↓</span>
        </div>
      </section>

      {/* STRIPE DIVIDER */}
      <div className="stripe-divider" />

      {/* QUOTE / MISSION */}
      <section
        style={{
          background: "linear-gradient(180deg, #f7f3e8 0%, #fff 100%)",
          padding: "96px 1.5rem",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 64, color: "#b22234", lineHeight: 0.5, fontFamily: "Georgia, serif" }}>
            “
          </span>
          <p
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(22px, 3.4vw, 38px)",
              fontStyle: "italic",
              color: "#0a2463",
              lineHeight: 1.45,
              margin: "0 0 24px",
            }}
          >
            America’s greatest days are not behind us — they are ahead of us, if we are bold enough to reach for them.
          </p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
            <span style={{ height: 1, width: 40, background: "#b22234" }} />
            <span style={{ color: "#b22234", fontSize: 12, letterSpacing: 4 }}>CAL SHUMARD</span>
            <span style={{ height: 1, width: 40, background: "#b22234" }} />
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section style={{ background: "#fff", padding: "96px 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="section-eyebrow">Six Pillars</p>
            <h2 className="section-title serif">A Platform Built for Americans</h2>
            <div className="section-divider" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {[
              { icon: "🏭", title: "Economy & Jobs", text: "Cut taxes for working families, bring manufacturing home, and unleash small business growth." },
              { icon: "🛡️", title: "National Security", text: "Rebuild our military, secure the border, and restore America’s standing in the world." },
              { icon: "🏥", title: "Healthcare", text: "Lower costs through competition, protect coverage, and rein in prescription drug prices." },
              { icon: "⚖️", title: "Rule of Law", text: "Back the blue, appoint constitutionalist judges, and ensure equal justice for every American." },
              { icon: "🎓", title: "Education", text: "Hand control back to parents, expand school choice, and invest in vocational training." },
              { icon: "⚡", title: "Energy", text: "Achieve American energy dominance and pursue innovation-led environmental progress." },
            ].map((p) => (
              <Link
                key={p.title}
                href="/platform"
                className="card"
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{p.icon}</div>
                <h3 style={{ color: "#0a2463", fontSize: 22, margin: "0 0 10px", fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {p.title}
                </h3>
                <p style={{ color: "#444", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{p.text}</p>
                <div style={{ marginTop: 16, color: "#b22234", fontSize: 12, letterSpacing: 2, fontWeight: 700 }}>
                  LEARN MORE →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MAP TEASER */}
      <section
        style={{
          background: "linear-gradient(160deg, #050d2d 0%, #0a2463 100%)",
          padding: "96px 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <StarField count={50} goldRatio={0.4} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 48,
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ color: "#f5c518", letterSpacing: 4, fontSize: 12, fontWeight: 700, margin: 0 }}>
                A NATIONAL MANDATE
              </p>
              <h2
                className="serif"
                style={{
                  fontSize: "clamp(34px, 5vw, 56px)",
                  color: "#fff",
                  margin: "10px 0 18px",
                  letterSpacing: -1,
                  lineHeight: 1.05,
                }}
              >
                The 2028 path to <span style={{ color: "#f5c518" }}>358</span> electoral votes.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
                Explore the interactive electoral map showing how Shumard / Centlivre carry every region of the country — from the heartland to the coasts.
              </p>
              <Link href="/map" className="btn-primary">Open the Map →</Link>
            </div>
            <div
              style={{
                position: "relative",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(245,197,24,0.3)",
                borderRadius: 12,
                padding: 28,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, color: "#fff", fontSize: 12, letterSpacing: 2 }}>
                <span>SHUMARD</span>
                <span>HOWELL</span>
              </div>
              <div
                style={{
                  display: "flex",
                  height: 28,
                  borderRadius: 6,
                  overflow: "hidden",
                  border: "2px solid rgba(245,197,24,0.5)",
                }}
              >
                <div style={{ width: "66.5%", background: "linear-gradient(90deg, #7a0f1f, #b22234)" }} />
                <div style={{ width: "33.5%", background: "linear-gradient(90deg, #1d3893, #0a2463)" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
                <span style={{ color: "#f5c518", fontWeight: 700 }}>358 EV</span>
                <span>180 EV</span>
              </div>
              <div style={{ marginTop: 18, fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                Projected based on certified results across all 50 states + DC. 270 electoral votes needed to win.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "96px 1.5rem",
          background:
            "linear-gradient(135deg, #b22234 0%, #7a0f1f 100%)",
          color: "#fff",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1.5px, transparent 2px)",
            backgroundSize: "32px 32px",
            opacity: 0.18,
          }}
        />
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <h2 className="serif" style={{ fontSize: "clamp(34px, 5vw, 54px)", margin: 0, letterSpacing: -1 }}>
            Be part of history.
          </h2>
          <p style={{ fontSize: 17, marginTop: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
            Volunteer, donate, or just say hello. Every voice matters in this campaign.
          </p>
          <div style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link href="/volunteer" className="btn-primary">Sign Me Up</Link>
            <Link href="/team" className="btn-ghost">Meet the Ticket</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ number, label, suffix }: { number: number; label: string; suffix: string }) {
  return (
    <div
      className="glass"
      style={{
        padding: "18px 14px",
        borderRadius: 10,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: 38,
          fontWeight: 900,
          color: "#f5c518",
          lineHeight: 1,
        }}
      >
        {number}
        <span style={{ fontSize: 22 }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", marginTop: 8 }}>
        {label}
      </div>
    </div>
  );
}

function Star({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 2l2.39 4.84L20 7.6l-4 3.9.94 5.5L12 14.77 7.06 17l.94-5.5-4-3.9 5.61-.76L12 2z" />
    </svg>
  );
}
