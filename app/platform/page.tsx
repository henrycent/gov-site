import Link from "next/link";

const PILLARS = [
  {
    icon: "🏭",
    title: "Economy & Jobs",
    summary:
      "Restore American manufacturing, cut taxes on working families, and reward small businesses for hiring.",
    bullets: [
      "Permanent middle-class tax cut indexed to inflation",
      "Reshore critical supply chains in semiconductors, pharma, and steel",
      "Slash federal regulations strangling Main Street",
      "Apprenticeship-first jobs program in every state",
    ],
  },
  {
    icon: "🛡️",
    title: "National Security",
    summary:
      "Rebuild a peerless military, secure the southern border, and restore deterrence on the world stage.",
    bullets: [
      "Modernize the Navy, Air Force, and Space Force",
      "Finish the southern border barrier within 24 months",
      "Crush fentanyl trafficking through targeted enforcement",
      "Restore credibility with allies and our adversaries alike",
    ],
  },
  {
    icon: "🏥",
    title: "Healthcare",
    summary:
      "Bring market competition to healthcare while protecting Americans with pre-existing conditions.",
    bullets: [
      "Price transparency at every hospital and pharmacy",
      "Expand HSAs and tax-free direct primary care",
      "Cap insulin and EpiPen prices for working families",
      "Veterans care — fixed, not bandaged",
    ],
  },
  {
    icon: "⚖️",
    title: "Rule of Law",
    summary:
      "Back our police, appoint constitutionalist judges, and equal justice under law for every American.",
    bullets: [
      "Federal grant program to recruit & retain officers",
      "Bipartisan judicial reforms targeting docket backlogs",
      "End political prosecutions — from any party",
      "Protect the Bill of Rights, full stop",
    ],
  },
  {
    icon: "🎓",
    title: "Education",
    summary:
      "Return power to parents, expand school choice, and invest in skills that lead to good jobs.",
    bullets: [
      "Universal school choice via portable per-pupil funding",
      "Defund radical curriculum, invest in core literacy",
      "Restore civics: every graduate passes the citizenship test",
      "Modern vocational programs in every high school",
    ],
  },
  {
    icon: "⚡",
    title: "Energy & Environment",
    summary:
      "Achieve American energy dominance through an all-of-the-above approach — oil, gas, nuclear, and innovation.",
    bullets: [
      "Approve next-gen nuclear & SMRs at scale",
      "Open responsible drilling on federal lands",
      "Modernize the grid — stop blackouts, stop blackmail",
      "Innovation, not regulation, on emissions",
    ],
  },
];

export default function PlatformPage() {
  return (
    <main style={{ background: "#fbfbfd" }}>
      <PageHero
        eyebrow="What we stand for"
        title="Our Platform"
        subtitle="Six pillars. One unifying belief: America’s best days are ahead."
      />

      <section style={{ padding: "80px 1.5rem 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
          {PILLARS.map((p, i) => (
            <article
              key={p.title}
              style={{
                background: "#fff",
                border: "1px solid #e3e3ea",
                borderRadius: 14,
                padding: "clamp(24px, 4vw, 40px)",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 1.4fr)",
                gap: 32,
                alignItems: "start",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, bottom: 0,
                  width: 6,
                  background: i % 2 === 0
                    ? "linear-gradient(180deg, #b22234, #7a0f1f)"
                    : "linear-gradient(180deg, #1d3893, #0a2463)",
                }}
              />
              <div>
                <div style={{ fontSize: 44, marginBottom: 12 }}>{p.icon}</div>
                <p style={{ color: i % 2 === 0 ? "#b22234" : "#0a2463", fontSize: 11, letterSpacing: 4, fontWeight: 700, margin: 0 }}>
                  PILLAR {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#0a2463", margin: "6px 0 14px", lineHeight: 1.1 }}>
                  {p.title}
                </h2>
                <p style={{ color: "#444", fontSize: 16, lineHeight: 1.7, margin: 0 }}>{p.summary}</p>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {p.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "14px 16px",
                      background: "#f7f3e8",
                      borderRadius: 8,
                      borderLeft: `3px solid ${i % 2 === 0 ? "#b22234" : "#0a2463"}`,
                    }}
                  >
                    <span style={{ color: "#f5c518", fontSize: 18, marginTop: -1 }}>★</span>
                    <span style={{ color: "#0c1024", fontSize: 14, lineHeight: 1.5 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 56 }}>
          <Link href="/volunteer" className="btn-primary">Get involved</Link>
        </div>
      </section>
    </main>
  );
}

function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section
      style={{
        background:
          "linear-gradient(160deg, #050d2d 0%, #0a2463 60%, #1d3893 100%)",
        color: "#fff",
        padding: "140px 1.5rem 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "#f5c518", letterSpacing: 5, fontSize: 12, fontWeight: 700, margin: 0, textTransform: "uppercase" }}>
          {eyebrow}
        </p>
        <h1 className="serif" style={{ fontSize: "clamp(44px, 7vw, 88px)", margin: "12px 0", letterSpacing: -1, lineHeight: 1 }}>
          {title}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(15px, 2vw, 19px)", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
