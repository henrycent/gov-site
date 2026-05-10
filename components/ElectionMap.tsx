"use client";
import { useMemo, useState } from "react";

type Winner = "shumard" | "howell";
type State = {
  abbr: string;
  name: string;
  ev: number;
  c: number; // column
  r: number; // row
  w: Winner;
  margin: number; // % margin of victory (positive favoring winner)
};

// Tile cartogram positions roughly approximating US geography.
const STATES: State[] = [
  // Top row (NE corner)
  { abbr: "ME", name: "Maine", ev: 4, c: 11, r: 0, w: "shumard", margin: 1.8 },
  { abbr: "VT", name: "Vermont", ev: 3, c: 10, r: 1, w: "howell", margin: 14.2 },
  { abbr: "NH", name: "New Hampshire", ev: 4, c: 11, r: 1, w: "shumard", margin: 2.3 },
  // Row 2
  { abbr: "WA", name: "Washington", ev: 12, c: 2, r: 2, w: "howell", margin: 9.6 },
  { abbr: "ID", name: "Idaho", ev: 4, c: 3, r: 2, w: "shumard", margin: 28.4 },
  { abbr: "MT", name: "Montana", ev: 4, c: 4, r: 2, w: "shumard", margin: 18.7 },
  { abbr: "ND", name: "North Dakota", ev: 3, c: 5, r: 2, w: "shumard", margin: 26.1 },
  { abbr: "MN", name: "Minnesota", ev: 10, c: 6, r: 2, w: "shumard", margin: 1.9 },
  { abbr: "WI", name: "Wisconsin", ev: 10, c: 7, r: 2, w: "shumard", margin: 3.4 },
  { abbr: "MI", name: "Michigan", ev: 15, c: 8, r: 2, w: "shumard", margin: 4.1 },
  { abbr: "NY", name: "New York", ev: 28, c: 9, r: 2, w: "howell", margin: 11.5 },
  { abbr: "MA", name: "Massachusetts", ev: 11, c: 10, r: 2, w: "howell", margin: 21.8 },
  { abbr: "RI", name: "Rhode Island", ev: 4, c: 11, r: 2, w: "howell", margin: 9.4 },
  // Row 3
  { abbr: "OR", name: "Oregon", ev: 8, c: 2, r: 3, w: "howell", margin: 6.2 },
  { abbr: "NV", name: "Nevada", ev: 6, c: 3, r: 3, w: "shumard", margin: 5.0 },
  { abbr: "WY", name: "Wyoming", ev: 3, c: 4, r: 3, w: "shumard", margin: 39.4 },
  { abbr: "SD", name: "South Dakota", ev: 3, c: 5, r: 3, w: "shumard", margin: 25.1 },
  { abbr: "IA", name: "Iowa", ev: 6, c: 6, r: 3, w: "shumard", margin: 12.6 },
  { abbr: "IL", name: "Illinois", ev: 19, c: 7, r: 3, w: "howell", margin: 7.9 },
  { abbr: "IN", name: "Indiana", ev: 11, c: 8, r: 3, w: "shumard", margin: 16.3 },
  { abbr: "OH", name: "Ohio", ev: 17, c: 9, r: 3, w: "shumard", margin: 9.8 },
  { abbr: "PA", name: "Pennsylvania", ev: 19, c: 10, r: 3, w: "shumard", margin: 3.0 },
  { abbr: "NJ", name: "New Jersey", ev: 14, c: 11, r: 3, w: "howell", margin: 6.7 },
  // Row 4
  { abbr: "CA", name: "California", ev: 54, c: 2, r: 4, w: "howell", margin: 18.3 },
  { abbr: "UT", name: "Utah", ev: 6, c: 3, r: 4, w: "shumard", margin: 22.5 },
  { abbr: "CO", name: "Colorado", ev: 10, c: 4, r: 4, w: "shumard", margin: 1.2 },
  { abbr: "NE", name: "Nebraska", ev: 5, c: 5, r: 4, w: "shumard", margin: 19.8 },
  { abbr: "MO", name: "Missouri", ev: 10, c: 6, r: 4, w: "shumard", margin: 14.7 },
  { abbr: "KY", name: "Kentucky", ev: 8, c: 7, r: 4, w: "shumard", margin: 23.6 },
  { abbr: "WV", name: "West Virginia", ev: 4, c: 8, r: 4, w: "shumard", margin: 35.2 },
  { abbr: "VA", name: "Virginia", ev: 13, c: 9, r: 4, w: "shumard", margin: 1.5 },
  { abbr: "MD", name: "Maryland", ev: 10, c: 10, r: 4, w: "howell", margin: 19.0 },
  { abbr: "DE", name: "Delaware", ev: 3, c: 11, r: 4, w: "howell", margin: 9.8 },
  // Row 5
  { abbr: "HI", name: "Hawaii", ev: 4, c: 0, r: 5, w: "howell", margin: 12.6 },
  { abbr: "AZ", name: "Arizona", ev: 11, c: 3, r: 5, w: "shumard", margin: 4.6 },
  { abbr: "NM", name: "New Mexico", ev: 5, c: 4, r: 5, w: "shumard", margin: 0.9 },
  { abbr: "KS", name: "Kansas", ev: 6, c: 5, r: 5, w: "shumard", margin: 16.5 },
  { abbr: "AR", name: "Arkansas", ev: 6, c: 6, r: 5, w: "shumard", margin: 21.8 },
  { abbr: "TN", name: "Tennessee", ev: 11, c: 7, r: 5, w: "shumard", margin: 22.3 },
  { abbr: "NC", name: "North Carolina", ev: 16, c: 8, r: 5, w: "shumard", margin: 5.7 },
  { abbr: "SC", name: "South Carolina", ev: 9, c: 9, r: 5, w: "shumard", margin: 12.1 },
  { abbr: "DC", name: "District of Columbia", ev: 3, c: 10, r: 5, w: "howell", margin: 84.5 },
  { abbr: "CT", name: "Connecticut", ev: 7, c: 11, r: 5, w: "howell", margin: 12.3 },
  // Row 6
  { abbr: "AK", name: "Alaska", ev: 3, c: 0, r: 6, w: "shumard", margin: 14.2 },
  { abbr: "OK", name: "Oklahoma", ev: 7, c: 5, r: 6, w: "shumard", margin: 31.7 },
  { abbr: "LA", name: "Louisiana", ev: 8, c: 6, r: 6, w: "shumard", margin: 17.4 },
  { abbr: "MS", name: "Mississippi", ev: 6, c: 7, r: 6, w: "shumard", margin: 16.9 },
  { abbr: "AL", name: "Alabama", ev: 9, c: 8, r: 6, w: "shumard", margin: 24.5 },
  { abbr: "GA", name: "Georgia", ev: 16, c: 9, r: 6, w: "shumard", margin: 3.9 },
  // Row 7
  { abbr: "TX", name: "Texas", ev: 40, c: 5, r: 7, w: "shumard", margin: 11.2 },
  { abbr: "FL", name: "Florida", ev: 30, c: 9, r: 7, w: "shumard", margin: 13.6 },
];

const TILE = 56;
const GAP = 4;
const PAD = 16;
const COLS = 12;
const ROWS = 8;

function shadeFor(state: State) {
  const baseRed = state.margin >= 15 ? "#7a0f1f" : state.margin >= 8 ? "#b22234" : "#e63946";
  const baseBlue = state.margin >= 15 ? "#050d2d" : state.margin >= 8 ? "#0a2463" : "#1d3893";
  return state.w === "shumard" ? baseRed : baseBlue;
}

export default function ElectionMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>("PA");

  const totals = useMemo(() => {
    let s = 0, h = 0;
    for (const st of STATES) {
      if (st.w === "shumard") s += st.ev;
      else h += st.ev;
    }
    return { s, h };
  }, []);

  const focus = STATES.find((s) => s.abbr === (hovered || selected)) ?? null;

  const width = COLS * TILE + (COLS - 1) * GAP + PAD * 2;
  const height = ROWS * TILE + (ROWS - 1) * GAP + PAD * 2;

  return (
    <div style={{ width: "100%" }}>
      {/* Tally bar */}
      <div style={{
        display: "flex", alignItems: "stretch", marginBottom: 24,
        borderRadius: 8, overflow: "hidden", border: "2px solid #0a2463",
        boxShadow: "0 8px 24px rgba(10,36,99,0.18)",
      }}>
        <div style={{
          flex: totals.s, background: "linear-gradient(90deg, #7a0f1f, #b22234)",
          padding: "18px 20px", color: "#fff",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.9 }}>SHUMARD / CENTLIVRE</div>
          <div style={{ fontSize: 36, fontWeight: 900, fontFamily: "var(--font-playfair), Georgia, serif" }}>
            {totals.s} <span style={{ fontSize: 14, fontWeight: 500, opacity: 0.85 }}>EV</span>
          </div>
        </div>
        <div style={{
          width: 4, background: "repeating-linear-gradient(180deg, #f5c518 0 8px, #fff 8px 16px)",
        }} />
        <div style={{
          flex: totals.h, background: "linear-gradient(90deg, #1d3893, #0a2463)",
          padding: "18px 20px", color: "#fff", textAlign: "right",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.9 }}>HOWELL / RIVERA</div>
          <div style={{ fontSize: 36, fontWeight: 900, fontFamily: "var(--font-playfair), Georgia, serif" }}>
            {totals.h} <span style={{ fontSize: 14, fontWeight: 500, opacity: 0.85 }}>EV</span>
          </div>
        </div>
      </div>

      <div style={{
        position: "relative", textAlign: "center", fontSize: 12,
        color: "#0a2463", fontWeight: 700, letterSpacing: 2, marginBottom: 12,
      }}>
        ★ 270 ELECTORAL VOTES NEEDED TO WIN ★
      </div>

      {/* Map + sidebar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0, 320px)",
        gap: 24,
        alignItems: "start",
      }}>
        <div style={{
          background: "linear-gradient(180deg, #f7f3e8 0%, #fff 100%)",
          borderRadius: 12, border: "2px solid #0a2463",
          boxShadow: "0 12px 30px rgba(10,36,99,0.15)",
          padding: 12, overflowX: "auto",
        }}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            style={{ display: "block", maxWidth: width }}
            aria-label="2024 Electoral Map"
          >
            <defs>
              <pattern id="diag" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              </pattern>
            </defs>
            {STATES.map((s) => {
              const x = PAD + s.c * (TILE + GAP);
              const y = PAD + s.r * (TILE + GAP);
              const isFocus = (hovered || selected) === s.abbr;
              const fill = shadeFor(s);
              return (
                <g
                  key={s.abbr}
                  className={`tile${isFocus ? " selected" : ""}`}
                  onMouseEnter={() => setHovered(s.abbr)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(s.abbr)}
                  style={{ color: fill }}
                >
                  <rect
                    x={x}
                    y={y}
                    width={TILE}
                    height={TILE}
                    rx={6}
                    fill={fill}
                    stroke={isFocus ? "#f5c518" : "#fff"}
                    strokeWidth={isFocus ? 3 : 1.5}
                  />
                  <rect x={x} y={y} width={TILE} height={TILE} rx={6} fill="url(#diag)" />
                  <text
                    x={x + TILE / 2}
                    y={y + TILE / 2 - 4}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={14}
                    fontWeight={800}
                    style={{ pointerEvents: "none", fontFamily: "system-ui, sans-serif" }}
                  >
                    {s.abbr}
                  </text>
                  <text
                    x={x + TILE / 2}
                    y={y + TILE / 2 + 12}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.85)"
                    fontSize={10}
                    fontWeight={600}
                    style={{ pointerEvents: "none", fontFamily: "system-ui, sans-serif" }}
                  >
                    {s.ev}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center",
            padding: "12px 8px 4px", fontSize: 11, color: "#333",
          }}>
            <Swatch color="#7a0f1f" label="Shumard +15%" />
            <Swatch color="#b22234" label="Shumard +8%" />
            <Swatch color="#e63946" label="Shumard" />
            <Swatch color="#1d3893" label="Howell" />
            <Swatch color="#0a2463" label="Howell +8%" />
            <Swatch color="#050d2d" label="Howell +15%" />
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{
          background: "linear-gradient(180deg, #050d2d 0%, #0a2463 100%)",
          color: "#fff", borderRadius: 12, padding: 24,
          minHeight: 360, position: "sticky", top: 96,
          border: "2px solid #f5c518",
        }}>
          {focus ? (
            <div className="fade-up" key={focus.abbr}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#f5c518" }}>SELECTED STATE</div>
              <h3 style={{ margin: "8px 0 4px", fontSize: 28, fontFamily: "var(--font-playfair), Georgia, serif" }}>{focus.name}</h3>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 18 }}>
                {focus.abbr} · {focus.ev} Electoral Votes
              </div>

              <div style={{
                background: focus.w === "shumard" ? "rgba(178,34,52,0.25)" : "rgba(29,56,147,0.4)",
                border: `1px solid ${focus.w === "shumard" ? "#e63946" : "#1d3893"}`,
                borderRadius: 8, padding: 14, marginBottom: 16,
              }}>
                <div style={{ fontSize: 10, letterSpacing: 2, opacity: 0.85 }}>WINNER</div>
                <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>
                  {focus.w === "shumard" ? "SHUMARD / CENTLIVRE" : "HOWELL / RIVERA"}
                </div>
                <div style={{ fontSize: 13, marginTop: 4, color: "#f5c518" }}>
                  +{focus.margin.toFixed(1)}% margin
                </div>
              </div>

              {/* Vote split bars */}
              {(() => {
                const winPct = parseFloat((50 + focus.margin / 2).toFixed(1));
                const losePct = parseFloat((50 - focus.margin / 2).toFixed(1));
                const [sPct, hPct] = focus.w === "shumard" ? [winPct, losePct] : [losePct, winPct];
                return (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, opacity: 0.7, marginBottom: 8 }}>VOTE SHARE (EST.)</div>
                    <div style={{ marginBottom: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                        <span style={{ color: "#e63946" }}>Shumard</span>
                        <span style={{ color: "rgba(255,255,255,0.8)" }}>{sPct}%</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${sPct}%`, background: "linear-gradient(90deg,#7a0f1f,#e63946)", borderRadius: 3, transition: "width 0.4s ease" }} />
                      </div>
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                        <span style={{ color: "#1d3893" }}>Howell</span>
                        <span style={{ color: "rgba(255,255,255,0.8)" }}>{hPct}%</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${hPct}%`, background: "linear-gradient(90deg,#050d2d,#1d3893)", borderRadius: 3, transition: "width 0.4s ease" }} />
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div style={{ fontSize: 12, lineHeight: 1.7, color: "rgba(255,255,255,0.65)" }}>
                {focus.w === "shumard"
                  ? `${focus.name} backed Shumard / Centlivre on a message of jobs, security, and common sense governance.`
                  : `${focus.name} went for Howell / Rivera, though the margin was tighter than the previous cycle.`}
              </div>

              <div style={{ marginTop: 18, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                Hover or tap any state to explore.
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#f5c518" }}>★ FINAL RESULT</div>
              <h3 style={{ margin: "8px 0", fontSize: 26, fontFamily: "var(--font-playfair), Georgia, serif" }}>
                A Decisive Mandate
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>
                Shumard / Centlivre carries the day with {totals.s} electoral votes — a clear mandate from the American people. Click any state to explore the results.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 14, height: 14, borderRadius: 3, background: color, border: "1px solid rgba(0,0,0,0.15)" }} />
      <span>{label}</span>
    </div>
  );
}
