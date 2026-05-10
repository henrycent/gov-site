import GeoMap from "@/components/GeoMap";

const RED = "#9B2335";
const NAVY = "#1D3461";
const F = "var(--font-inter), system-ui, -apple-system, sans-serif";

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
          <GeoMap />
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

      {/* ROAD TO 270 */}
      <section style={{ background: "#f6f5f3", padding: "60px 1.5rem 96px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <p className="section-eyebrow" style={{ textAlign: "center" }}>Electoral Strategy</p>
          <h2 className="section-title" style={{ textAlign: "center", fontFamily: F }}>Road to 270: Strategy Explained</h2>
          <div className="section-divider" />

          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>

            {/* Safe States */}
            <div className="card" style={{ borderTop: `3px solid ${RED}` }}>
              <h3 style={{ color: RED, fontFamily: F, fontSize: 18, fontWeight: 800, margin: "0 0 1rem" }}>Safe States (Shumard / Centlivre)</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {([
                  ["Texas", 40, "Reliable Republican base; strong on border security and energy"],
                  ["Florida", 30, "Shifted red; Cuban-American and retiree coalition solidified"],
                  ["Ohio", 17, "Working-class realignment makes this a consistent R lean"],
                  ["Georgia", 16, "Suburban growth offset by rural and exurban turnout advantage"],
                  ["North Carolina", 16, "Slight R lean; military and rural coalition delivers"],
                  ["Indiana", 11, "Deep red; manufacturing and agriculture base"],
                  ["Tennessee", 11, "Solid R; Nashville suburbs the only Democratic pocket"],
                  ["Missouri", 10, "Rural margins consistently overcome urban centers"],
                  ["Alabama", 9, "Deep South anchor; reliable base state"],
                  ["South Carolina", 9, "Trending R; suburban growth reinforcing the coalition"],
                  ["Kentucky", 8, "Coal country and Appalachian base solidly Republican"],
                  ["Louisiana", 8, "Oil industry and rural vote secures this state"],
                  ["Oklahoma", 7, "Solid red; energy sector and evangelical base"],
                  ["Utah", 6, "Moderate R; strong community turnout"],
                  ["Kansas", 6, "Agriculture and small business base holds firm"],
                  ["Arkansas", 6, "Deep red; rural vote dominates"],
                  ["Mississippi", 6, "Reliable red base; strong evangelical turnout"],
                  ["Idaho", 4, "Liberty-minded newcomers reinforce solid R lean"],
                  ["West Virginia", 4, "Coal and gas worker base; strong realignment"],
                  ["Nebraska", 4, "Agriculture base; Omaha-2 a watch district"],
                ] as [string, number, string][]).map(([state, ev, note]) => (
                  <div key={state} style={{ display: "flex", gap: 10, padding: "8px 12px", background: "#f9f8f7", borderRadius: 6, borderLeft: `3px solid ${RED}` }}>
                    <span style={{ color: RED, fontWeight: 800, fontSize: 14, minWidth: 28, flexShrink: 0 }}>{ev}</span>
                    <div>
                      <span style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 14 }}>{state}</span>
                      <p style={{ fontSize: 12, color: "#666", margin: "2px 0 0", lineHeight: 1.4 }}>{note}</p>
                    </div>
                  </div>
                ))}
                <div style={{ padding: "10px 12px", background: "#fff0f1", borderRadius: 6, textAlign: "center", marginTop: 4 }}>
                  <span style={{ fontWeight: 800, color: RED, fontSize: 15 }}>~230 Safe Electoral Votes</span>
                </div>
              </div>
            </div>

            {/* Battleground States */}
            <div className="card" style={{ borderTop: `3px solid ${NAVY}` }}>
              <h3 style={{ color: NAVY, fontFamily: F, fontSize: 18, fontWeight: 800, margin: "0 0 1rem" }}>Battleground States</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {([
                  ["Pennsylvania", 19, "Key rust belt prize; must win Scranton/Erie while holding Philadelphia suburbs"],
                  ["Michigan", 15, "Union voter erosion and Dearborn Arab-American community in play; competitive on energy and trade message"],
                  ["Wisconsin", 10, "Rural turnout + Green Bay corridor must offset Madison/Milwaukee margin"],
                  ["Arizona", 11, "Sun Belt swing; suburban Phoenix women the key persuasion target"],
                  ["Nevada", 6, "Reno suburbs trending R; Hispanic voter share a key variable"],
                ] as [string, number, string][]).map(([state, ev, note]) => (
                  <div key={state} style={{ display: "flex", gap: 10, padding: "8px 12px", background: "#eef2ff", borderRadius: 6, borderLeft: `3px solid ${NAVY}` }}>
                    <span style={{ color: NAVY, fontWeight: 800, fontSize: 14, minWidth: 28, flexShrink: 0 }}>{ev}</span>
                    <div>
                      <span style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 14 }}>{state}</span>
                      <p style={{ fontSize: 12, color: "#666", margin: "2px 0 0", lineHeight: 1.4 }}>{note}</p>
                    </div>
                  </div>
                ))}
                <div style={{ padding: "10px 12px", background: "#eef2ff", borderRadius: 6, textAlign: "center", marginTop: 4 }}>
                  <span style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>61 Battleground Electoral Votes</span>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "#fff", borderRadius: 8, borderLeft: "4px solid #f5c518" }}>
                <p style={{ fontSize: 14, color: "#333", lineHeight: 1.8, margin: 0 }}>
                  Winning Pennsylvania, Michigan, Wisconsin, and Arizona &mdash; all states that have flipped between parties in recent cycles &mdash; puts Shumard/Centlivre at{" "}
                  <strong>291 electoral votes</strong>. Our campaign&rsquo;s blue-collar economic message and border security platform are engineered precisely for the voters in those states who feel left behind by Washington&rsquo;s political class.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
