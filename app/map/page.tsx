import ElectionMap from "@/components/ElectionMap";

export default function MapPage() {
  return (
    <main style={{ background: "#fbfbfd" }}>
      <section
        style={{
          background:
            "linear-gradient(160deg, #050d2d 0%, #0a2463 50%, #7a0f1f 100%)",
          color: "#fff",
          padding: "140px 1.5rem 60px",
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
            Interactive 2024 Results ★ Updated
          </p>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 7vw, 80px)", margin: "12px 0", letterSpacing: -1, lineHeight: 1 }}>
            Electoral College Map
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, maxWidth: 680, margin: "0 auto", lineHeight: 1.6 }}>
            Hover or tap any state to see the result, electoral votes, and margin of victory.
          </p>
        </div>
      </section>

      <section style={{ padding: "60px 1.5rem 96px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ElectionMap />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "60px 1.5rem 96px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <p className="section-eyebrow" style={{ textAlign: "center" }}>How we got here</p>
          <h2 className="section-title serif" style={{ textAlign: "center" }}>The Coalition</h2>
          <div className="section-divider" />

          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { stat: "+12", label: "Pts. with rural voters", color: "#b22234" },
              { stat: "+7", label: "Pts. with independents", color: "#0a2463" },
              { stat: "+9", label: "Pts. with working families", color: "#b22234" },
              { stat: "+5", label: "Pts. with first-time voters", color: "#0a2463" },
            ].map((s) => (
              <div key={s.label} className="card" style={{ textAlign: "center" }}>
                <div
                  className="serif"
                  style={{ fontSize: 56, fontWeight: 900, color: s.color, lineHeight: 1 }}
                >
                  {s.stat}
                </div>
                <div style={{ marginTop: 10, fontSize: 13, color: "#444" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
