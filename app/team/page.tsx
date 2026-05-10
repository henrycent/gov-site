import Link from "next/link";

const PEOPLE = [
  {
    name: "Cal Shumard",
    role: "Candidate for President",
    initials: "CS",
    accent: "#b22234",
    bio: "Cal Shumard is a proven leader who has spent his career fighting for working Americans. A former governor and small business owner, he believes in plain talk, honest work, and the boundless promise of the American dream.",
    facts: [
      ["Born", "Toledo, Ohio"],
      ["Family", "Wife Margaret, three children"],
      ["Faith", "Practicing Methodist"],
      ["Service", "U.S. Army Reserve, 1992–2000"],
    ],
  },
  {
    name: "Henry Centlivre",
    role: "Candidate for Vice President",
    initials: "HC",
    accent: "#0a2463",
    bio: "Henry Centlivre brings decades of experience in finance and a fierce commitment to fiscal responsibility. A former senator from Indiana, he is known across the aisle for his sharp mind, steady temperament, and unwavering integrity.",
    facts: [
      ["Born", "Fort Wayne, Indiana"],
      ["Family", "Wife Eleanor, two children"],
      ["Faith", "Practicing Catholic"],
      ["Career", "30 years in public service"],
    ],
  },
];

export default function TeamPage() {
  return (
    <main style={{ background: "#fbfbfd" }}>
      <PageHero
        eyebrow="The Ticket"
        title="Meet the Candidates"
        subtitle="Two Americans, one mission — a stronger, freer, more prosperous nation."
      />

      <section style={{ padding: "80px 1.5rem" }}>
        <div
          style={{
            maxWidth: 1100, margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 32,
          }}
        >
          {PEOPLE.map((p) => (
            <article
              key={p.name}
              style={{
                background: "#fff",
                border: "1px solid #e3e3ea",
                borderRadius: 14,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 12px 40px rgba(10,36,99,0.08)",
              }}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${p.accent} 0%, #050d2d 100%)`,
                  padding: "40px 28px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1.5px)",
                    backgroundSize: "22px 22px",
                    opacity: 0.4,
                  }}
                />
                <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 22 }}>
                  <div
                    style={{
                      width: 96, height: 96, borderRadius: "50%",
                      background: "radial-gradient(circle at 30% 30%, #fff 0%, #f5c518 60%, #c79a16 100%)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: p.accent, fontWeight: 900, fontSize: 30,
                      border: "4px solid #fff",
                      boxShadow: "0 0 0 3px #f5c518, 0 8px 20px rgba(0,0,0,0.3)",
                      flexShrink: 0,
                    }}
                  >
                    {p.initials}
                  </div>
                  <div>
                    <h2 className="serif" style={{ color: "#fff", fontSize: 30, margin: 0, lineHeight: 1.1 }}>
                      {p.name}
                    </h2>
                    <p style={{ color: "#f5c518", letterSpacing: 3, fontSize: 11, marginTop: 8, textTransform: "uppercase" }}>
                      {p.role}
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ padding: "28px" }}>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "#333", margin: 0 }}>{p.bio}</p>

                <dl style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 20px" }}>
                  {p.facts.map(([k, v]) => (
                    <div key={k}>
                      <dt style={{ fontSize: 10, letterSpacing: 2, color: p.accent, fontWeight: 700, textTransform: "uppercase" }}>{k}</dt>
                      <dd style={{ margin: 0, color: "#0c1024", fontSize: 14, marginTop: 2 }}>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 56 }}>
          <Link href="/volunteer" className="btn-primary">Stand With the Ticket</Link>
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
          "linear-gradient(160deg, #050d2d 0%, #7a0f1f 100%)",
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
          opacity: 0.1,
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
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
