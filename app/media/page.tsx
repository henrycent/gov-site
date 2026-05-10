"use client";
import { useState, useEffect } from "react";
import StarField from "@/components/StarField";

const F = "var(--font-inter), system-ui, -apple-system, sans-serif";
const RED = "#9B2335";
const NAVY = "#1D3461";

const MEDIA_OUTLETS = [
  {
    name: "Fox News",
    type: "Television",
    accent: RED,
    why: "Fox News reaches 2.5 million nightly viewers, skewing toward our core coalition of rural voters, working-class whites, and conservatives over 45. Appearances on Hannity, Ingraham Angle, and Fox & Friends drive national name recognition and fundraising.",
    audience: "Base mobilization, senior voters, rural and suburban conservatives",
  },
  {
    name: "The Wall Street Journal",
    type: "Print & Digital",
    accent: NAVY,
    why: "The WSJ's editorial board is the most influential voice in center-right economic policy circles. A favorable op-ed or interview with their political reporters reaches business owners, investors, and fiscally conservative independents who may be persuadable. Critical for fundraising credibility on Wall Street.",
    audience: "Business community, fiscal conservatives, high-income independents",
  },
  {
    name: "The Joe Rogan Experience",
    type: "Podcast / Digital",
    accent: RED,
    why: "With 14–17 million listeners per episode across demographics, Rogan is the single most effective media platform for reaching young, non-partisan male voters aged 18–35 who distrust legacy media. A long-form appearance allows the candidate to speak unfiltered and demonstrate authenticity — a key closing argument with persuadable millennials.",
    audience: "Young male voters, political independents, first-time voters",
  },
];

const INTEREST_GROUPS = [
  {
    name: "National Rifle Association (NRA)",
    accent: RED,
    why: "Our platform explicitly protects Second Amendment rights, opposes red flag laws without due process, and commits to appointing originalist judges. The NRA Political Victory Fund has a history of endorsing and mobilizing for candidates who score an A rating on gun rights. Our judicial and legislative agenda aligns directly with NRA priorities.",
  },
  {
    name: "U.S. Chamber of Commerce",
    accent: NAVY,
    why: "Our platform calls for cutting 30% of federal regulations, reducing the corporate tax rate, reshoring supply chains through domestic investment incentives, and expanding trade agreements that benefit American business. The Chamber has historically supported center-right candidates who prioritize business-friendly policy and opposes excessive regulatory expansion from either party.",
  },
];

export default function MediaPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <main style={{ background: "#fbfbfd" }}>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(160deg, #050d2d 0%, #0a2463 55%, #7a0f1f 100%)",
        color: "#fff", padding: "140px 1.5rem 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.08,
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px", pointerEvents: "none" }} />
        {mounted && <StarField count={80} goldRatio={0.15} />}
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#f5c518", letterSpacing: 5, fontSize: 12, fontWeight: 700, margin: 0, textTransform: "uppercase" }}>
            Outreach & Influence
          </p>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 7vw, 80px)", margin: "12px 0", lineHeight: 1 }}>
            Media & Interest Groups
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 17, maxWidth: 660, margin: "0 auto", lineHeight: 1.65 }}>
            The outlets, platforms, and organizations amplifying our message and mobilizing our coalition.
          </p>
        </div>
      </section>

      {/* MEDIA OUTLETS */}
      <section style={{ padding: "80px 1.5rem 60px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-eyebrow">Media Exposure</p>
            <h2 className="section-title" style={{ fontFamily: F }}>Reaching the American People</h2>
            <p style={{ color: "#666", fontSize: 15, maxWidth: 600, margin: "1rem auto 0", lineHeight: 1.65 }}>
              The outlets, journalists, and platforms driving our message to targeted audiences.
            </p>
            <div className="section-divider" style={{ margin: "1.5rem auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {MEDIA_OUTLETS.map((m) => (
              <div key={m.name} style={{
                background: "#fff", border: "1px solid #e3e3ea", borderRadius: 10,
                borderTop: `3px solid ${m.accent}`, padding: "1.75rem",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <h3 style={{ color: NAVY, fontSize: 18, fontWeight: 800, margin: 0, fontFamily: F }}>{m.name}</h3>
                  <span style={{
                    fontSize: 11, color: m.accent, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
                    background: m.accent === RED ? "#fff0f1" : "#eef2ff",
                    padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap", marginLeft: 8, flexShrink: 0,
                  }}>
                    {m.type}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75, margin: "0 0 1rem" }}>{m.why}</p>
                <div style={{ borderTop: "1px solid #eee", paddingTop: "0.75rem" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: 1, textTransform: "uppercase" }}>Target Audience</span>
                  <p style={{ fontSize: 13, color: m.accent, fontWeight: 600, margin: "4px 0 0", lineHeight: 1.5 }}>{m.audience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEREST GROUPS */}
      <section style={{ background: "#f6f5f3", padding: "60px 1.5rem 96px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-eyebrow">Coalition</p>
            <h2 className="section-title" style={{ fontFamily: F }}>Our Coalition of Support</h2>
            <p style={{ color: "#666", fontSize: 15, maxWidth: 600, margin: "1rem auto 0", lineHeight: 1.65 }}>
              The organizations and movements that stand with Shumard / Centlivre 2028.
            </p>
            <div className="section-divider" style={{ margin: "1.5rem auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 24 }}>
            {INTEREST_GROUPS.map((g) => (
              <div key={g.name} style={{
                background: "#fff", border: "1px solid #e3e3ea", borderRadius: 10,
                borderTop: `3px solid ${g.accent}`, padding: "2rem",
              }}>
                <h3 style={{ color: NAVY, fontSize: 19, fontWeight: 800, margin: "0 0 1rem", fontFamily: F }}>{g.name}</h3>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#f5c518", fontSize: 20, flexShrink: 0, marginTop: 1 }}>&#9733;</span>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75, margin: 0 }}>{g.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
