import Link from "next/link";

const POSTS = [
  {
    date: "April 28, 2026",
    tag: "Press Release",
    title: "Shumard Unveils ‘Made-in-America’ Manufacturing Plan in Detroit",
    excerpt:
      "At a steel plant on the banks of the Rouge River, Cal Shumard laid out a sweeping plan to bring critical supply chains back to American soil and put a million people back to work.",
  },
  {
    date: "April 14, 2026",
    tag: "Speech",
    title: "Centlivre Delivers Keynote on Fiscal Sanity at Heritage",
    excerpt:
      "‘We can’t spend our way to prosperity,’ the Senator told a packed room. ‘But we can earn it back — one balanced budget at a time.’",
  },
  {
    date: "March 30, 2026",
    tag: "Endorsement",
    title: "Fraternal Order of Police Endorses Shumard / Centlivre",
    excerpt:
      "The nation’s largest police union throws its support behind the ticket, citing a clear, principled stance on law and order.",
  },
  {
    date: "March 12, 2026",
    tag: "Town Hall",
    title: "Iowa Town Hall Draws Record Crowd in Cedar Rapids",
    excerpt:
      "Over 4,000 Iowans turned out on a snowy Tuesday night to hear from the candidates — the largest grassroots event of the cycle so far.",
  },
  {
    date: "February 27, 2026",
    tag: "Op-Ed",
    title: "Shumard in WSJ: ‘A New American Compact’",
    excerpt:
      "In a feature opinion piece, Cal Shumard outlines his vision for a renewed agreement between the government and the governed.",
  },
];

export default function NewsPage() {
  return (
    <main style={{ background: "#fbfbfd" }}>
      <PageHero
        eyebrow="From the campaign"
        title="News & Updates"
        subtitle="The latest from the trail — speeches, endorsements, op-eds, and more."
      />

      <section style={{ padding: "80px 1.5rem 96px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
          {POSTS.map((p, i) => (
            <article
              key={i}
              style={{
                background: "#fff",
                border: "1px solid #e3e3ea",
                borderRadius: 12,
                padding: "clamp(20px, 3vw, 32px)",
                display: "grid",
                gridTemplateColumns: "110px 1fr",
                gap: 24,
                alignItems: "start",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  background: i % 2 === 0
                    ? "linear-gradient(135deg, #b22234, #7a0f1f)"
                    : "linear-gradient(135deg, #1d3893, #0a2463)",
                  color: "#fff",
                  borderRadius: 10,
                  padding: "16px 12px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: 10, letterSpacing: 2, opacity: 0.85 }}>{p.date.split(",")[0].split(" ")[0].toUpperCase()}</div>
                <div className="serif" style={{ fontSize: 30, fontWeight: 900, lineHeight: 1, margin: "4px 0" }}>
                  {p.date.split(" ")[1].replace(",", "")}
                </div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>{p.date.split(", ")[1]}</div>
              </div>
              <div>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 10,
                    letterSpacing: 2,
                    fontWeight: 700,
                    color: "#b22234",
                    border: "1px solid #b22234",
                    padding: "4px 10px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                  }}
                >
                  {p.tag}
                </span>
                <h3 className="serif" style={{ color: "#0a2463", fontSize: 22, margin: "10px 0 8px", lineHeight: 1.25 }}>
                  {p.title}
                </h3>
                <p style={{ color: "#444", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{p.excerpt}</p>
                <div style={{ marginTop: 12, color: "#b22234", fontWeight: 700, fontSize: 12, letterSpacing: 2 }}>
                  READ MORE →
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 56 }}>
          <Link href="/volunteer" className="btn-primary">Subscribe to Updates</Link>
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
          "linear-gradient(160deg, #7a0f1f 0%, #050d2d 100%)",
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
