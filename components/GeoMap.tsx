"use client";
import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type StateInfo = { name: string; ev: number; winner: "shumard" | "howell"; margin: number; abbr: string };

/* FIPS id → state data */
const STATES: Record<string, StateInfo> = {
  "1":  { name: "Alabama",              ev: 9,  winner: "shumard", margin: 24.5, abbr: "AL" },
  "2":  { name: "Alaska",               ev: 3,  winner: "shumard", margin: 14.2, abbr: "AK" },
  "4":  { name: "Arizona",              ev: 11, winner: "shumard", margin: 4.6,  abbr: "AZ" },
  "5":  { name: "Arkansas",             ev: 6,  winner: "shumard", margin: 21.8, abbr: "AR" },
  "6":  { name: "California",           ev: 54, winner: "howell",  margin: 18.3, abbr: "CA" },
  "8":  { name: "Colorado",             ev: 10, winner: "shumard", margin: 1.2,  abbr: "CO" },
  "9":  { name: "Connecticut",          ev: 7,  winner: "howell",  margin: 12.3, abbr: "CT" },
  "10": { name: "Delaware",             ev: 3,  winner: "howell",  margin: 9.8,  abbr: "DE" },
  "11": { name: "D.C.",                 ev: 3,  winner: "howell",  margin: 84.5, abbr: "DC" },
  "12": { name: "Florida",              ev: 30, winner: "shumard", margin: 13.6, abbr: "FL" },
  "13": { name: "Georgia",              ev: 16, winner: "shumard", margin: 3.9,  abbr: "GA" },
  "15": { name: "Hawaii",               ev: 4,  winner: "howell",  margin: 12.6, abbr: "HI" },
  "16": { name: "Idaho",                ev: 4,  winner: "shumard", margin: 28.4, abbr: "ID" },
  "17": { name: "Illinois",             ev: 19, winner: "howell",  margin: 7.9,  abbr: "IL" },
  "18": { name: "Indiana",              ev: 11, winner: "shumard", margin: 16.3, abbr: "IN" },
  "19": { name: "Iowa",                 ev: 6,  winner: "shumard", margin: 12.6, abbr: "IA" },
  "20": { name: "Kansas",               ev: 6,  winner: "shumard", margin: 16.5, abbr: "KS" },
  "21": { name: "Kentucky",             ev: 8,  winner: "shumard", margin: 23.6, abbr: "KY" },
  "22": { name: "Louisiana",            ev: 8,  winner: "shumard", margin: 17.4, abbr: "LA" },
  "23": { name: "Maine",                ev: 4,  winner: "shumard", margin: 1.8,  abbr: "ME" },
  "24": { name: "Maryland",             ev: 10, winner: "howell",  margin: 19.0, abbr: "MD" },
  "25": { name: "Massachusetts",        ev: 11, winner: "howell",  margin: 21.8, abbr: "MA" },
  "26": { name: "Michigan",             ev: 15, winner: "shumard", margin: 4.1,  abbr: "MI" },
  "27": { name: "Minnesota",            ev: 10, winner: "shumard", margin: 1.9,  abbr: "MN" },
  "28": { name: "Mississippi",          ev: 6,  winner: "shumard", margin: 16.9, abbr: "MS" },
  "29": { name: "Missouri",             ev: 10, winner: "shumard", margin: 14.7, abbr: "MO" },
  "30": { name: "Montana",              ev: 4,  winner: "shumard", margin: 18.7, abbr: "MT" },
  "31": { name: "Nebraska",             ev: 5,  winner: "shumard", margin: 19.8, abbr: "NE" },
  "32": { name: "Nevada",               ev: 6,  winner: "shumard", margin: 5.0,  abbr: "NV" },
  "33": { name: "New Hampshire",        ev: 4,  winner: "shumard", margin: 2.3,  abbr: "NH" },
  "34": { name: "New Jersey",           ev: 14, winner: "howell",  margin: 6.7,  abbr: "NJ" },
  "35": { name: "New Mexico",           ev: 5,  winner: "shumard", margin: 0.9,  abbr: "NM" },
  "36": { name: "New York",             ev: 28, winner: "howell",  margin: 11.5, abbr: "NY" },
  "37": { name: "North Carolina",       ev: 16, winner: "shumard", margin: 5.7,  abbr: "NC" },
  "38": { name: "North Dakota",         ev: 3,  winner: "shumard", margin: 26.1, abbr: "ND" },
  "39": { name: "Ohio",                 ev: 17, winner: "shumard", margin: 9.8,  abbr: "OH" },
  "40": { name: "Oklahoma",             ev: 7,  winner: "shumard", margin: 31.7, abbr: "OK" },
  "41": { name: "Oregon",               ev: 8,  winner: "howell",  margin: 6.2,  abbr: "OR" },
  "42": { name: "Pennsylvania",         ev: 19, winner: "shumard", margin: 3.0,  abbr: "PA" },
  "44": { name: "Rhode Island",         ev: 4,  winner: "howell",  margin: 9.4,  abbr: "RI" },
  "45": { name: "South Carolina",       ev: 9,  winner: "shumard", margin: 12.1, abbr: "SC" },
  "46": { name: "South Dakota",         ev: 3,  winner: "shumard", margin: 25.1, abbr: "SD" },
  "47": { name: "Tennessee",            ev: 11, winner: "shumard", margin: 22.3, abbr: "TN" },
  "48": { name: "Texas",                ev: 40, winner: "shumard", margin: 11.2, abbr: "TX" },
  "49": { name: "Utah",                 ev: 6,  winner: "shumard", margin: 22.5, abbr: "UT" },
  "50": { name: "Vermont",              ev: 3,  winner: "howell",  margin: 14.2, abbr: "VT" },
  "51": { name: "Virginia",             ev: 13, winner: "shumard", margin: 1.5,  abbr: "VA" },
  "53": { name: "Washington",           ev: 12, winner: "howell",  margin: 9.6,  abbr: "WA" },
  "54": { name: "West Virginia",        ev: 4,  winner: "shumard", margin: 35.2, abbr: "WV" },
  "55": { name: "Wisconsin",            ev: 10, winner: "shumard", margin: 3.4,  abbr: "WI" },
  "56": { name: "Wyoming",              ev: 3,  winner: "shumard", margin: 39.4, abbr: "WY" },
};

function stateColor(info: StateInfo | undefined, focused: boolean): string {
  if (!info) return "#ccc";
  const { winner, margin } = info;
  const base = winner === "shumard"
    ? (margin >= 20 ? "#7a0f1f" : margin >= 10 ? "#b22234" : "#e63946")
    : (margin >= 20 ? "#050d2d" : margin >= 10 ? "#0a2463" : "#1d3893");
  if (!focused) return base;
  return winner === "shumard" ? "#ff4455" : "#2d5aff";
}

export default function GeoMap() {
  const [hoveredFips, setHoveredFips] = useState<string | null>(null);
  const [selectedFips, setSelectedFips] = useState<string | null>("42"); // PA default
  const [tooltip, setTooltip] = useState<{ x: number; y: number; fips: string } | null>(null);

  const focusFips = hoveredFips ?? selectedFips;
  const focus = focusFips ? STATES[focusFips] : null;

  return (
    <div style={{ width: "100%" }}>
      {/* EV tally bar */}
      <div style={{
        display: "flex", alignItems: "stretch", marginBottom: 24,
        borderRadius: 8, overflow: "hidden", border: "2px solid #0a2463",
        boxShadow: "0 8px 24px rgba(10,36,99,0.18)",
      }}>
        <div style={{ flex: 291, background: "linear-gradient(90deg, #7a0f1f, #b22234)", padding: "18px 20px", color: "#fff" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.9 }}>SHUMARD / CENTLIVRE</div>
          <div style={{ fontSize: 36, fontWeight: 900, fontFamily: "var(--font-playfair), Georgia, serif" }}>
            291 <span style={{ fontSize: 14, fontWeight: 500, opacity: 0.85 }}>EV</span>
          </div>
        </div>
        <div style={{ width: 4, background: "repeating-linear-gradient(180deg, #f5c518 0 8px, #fff 8px 16px)" }} />
        <div style={{ flex: 247, background: "linear-gradient(90deg, #1d3893, #0a2463)", padding: "18px 20px", color: "#fff", textAlign: "right" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.9 }}>HOWELL / RIVERA</div>
          <div style={{ fontSize: 36, fontWeight: 900, fontFamily: "var(--font-playfair), Georgia, serif" }}>
            247 <span style={{ fontSize: 14, fontWeight: 500, opacity: 0.85 }}>EV</span>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: 12, color: "#0a2463", fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>
        ★ 270 ELECTORAL VOTES NEEDED TO WIN ★
      </div>

      {/* Map + sidebar */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,300px)", gap: 24, alignItems: "start" }}>
        {/* Map */}
        <div style={{
          background: "linear-gradient(180deg, #f7f3e8, #fff)",
          borderRadius: 12, border: "2px solid #0a2463",
          boxShadow: "0 12px 30px rgba(10,36,99,0.15)",
          overflow: "hidden", position: "relative",
        }}>
          <ComposableMap
            projection="geoAlbersUsa"
            width={960}
            height={560}
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => {
                  const fips = String(Number(geo.id));
                  const info = STATES[fips];
                  const isFocus = focusFips === fips;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={stateColor(info, isFocus)}
                      stroke="#fff"
                      strokeWidth={0.7}
                      style={{
                        default: { outline: "none" },
                        hover:   { outline: "none", cursor: "pointer" },
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={(evt: any) => {
                        setHoveredFips(fips);
                        setTooltip({ x: evt.clientX, y: evt.clientY, fips });
                      }}
                      onMouseMove={(evt: any) => {
                        setTooltip((t) => t ? { ...t, x: evt.clientX, y: evt.clientY } : null);
                      }}
                      onMouseLeave={() => { setHoveredFips(null); setTooltip(null); }}
                      onClick={() => setSelectedFips(fips)}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>

          {/* Floating tooltip */}
          {tooltip && STATES[tooltip.fips] && (
            <div style={{
              position: "fixed", left: tooltip.x + 14, top: tooltip.y - 48,
              background: "rgba(5,13,45,0.94)", color: "#fff",
              padding: "6px 13px", borderRadius: 6, fontSize: 13,
              pointerEvents: "none", zIndex: 999, whiteSpace: "nowrap",
              border: "1px solid rgba(245,197,24,0.4)", backdropFilter: "blur(4px)",
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}>
              <strong>{STATES[tooltip.fips].name}</strong>
              {" — "}{STATES[tooltip.fips].ev} EV
              {" — "}{
                STATES[tooltip.fips].winner === "shumard" ? "Shumard" : "Howell"
              } +{STATES[tooltip.fips].margin.toFixed(1)}%
            </div>
          )}

          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", padding: "10px 14px", fontSize: 11, color: "#444", borderTop: "1px solid #e4e2de" }}>
            <Swatch color="#7a0f1f" label="Shumard +20%" />
            <Swatch color="#b22234" label="Shumard +10%" />
            <Swatch color="#e63946" label="Shumard" />
            <Swatch color="#1d3893" label="Howell" />
            <Swatch color="#0a2463" label="Howell +10%" />
            <Swatch color="#050d2d" label="Howell +20%" />
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{
          background: "linear-gradient(180deg, #050d2d, #0a2463)",
          color: "#fff", borderRadius: 12, padding: 24,
          minHeight: 380, position: "sticky", top: 96,
          border: "2px solid #f5c518",
        }}>
          {focus ? (
            <div className="fade-up" key={focusFips}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#f5c518" }}>SELECTED STATE</div>
              <h3 style={{ margin: "8px 0 4px", fontSize: 26, fontFamily: "var(--font-playfair), Georgia, serif" }}>{focus.name}</h3>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 18 }}>
                {focus.abbr} · {focus.ev} Electoral Votes
              </div>

              <div style={{
                background: focus.winner === "shumard" ? "rgba(178,34,52,0.22)" : "rgba(29,56,147,0.38)",
                border: `1px solid ${focus.winner === "shumard" ? "#e63946" : "#1d3893"}`,
                borderRadius: 8, padding: 14, marginBottom: 16,
              }}>
                <div style={{ fontSize: 10, letterSpacing: 2, opacity: 0.8 }}>WINNER</div>
                <div style={{ fontSize: 17, fontWeight: 800, marginTop: 3, lineHeight: 1.2 }}>
                  {focus.winner === "shumard" ? "SHUMARD / CENTLIVRE" : "HOWELL / RIVERA"}
                </div>
                <div style={{ fontSize: 13, marginTop: 5, color: "#f5c518" }}>
                  +{focus.margin.toFixed(1)}% margin of victory
                </div>
              </div>

              {/* Vote share bars */}
              {(() => {
                const winPct = +(50 + focus.margin / 2).toFixed(1);
                const losePct = +(50 - focus.margin / 2).toFixed(1);
                const [sPct, hPct] = focus.winner === "shumard" ? [winPct, losePct] : [losePct, winPct];
                return (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, opacity: 0.65, marginBottom: 8 }}>VOTE SHARE (ESTIMATED)</div>
                    {[{ label: "Shumard", pct: sPct, gradient: "linear-gradient(90deg,#7a0f1f,#e63946)" },
                      { label: "Howell",  pct: hPct, gradient: "linear-gradient(90deg,#050d2d,#1d3893)" }
                    ].map(({ label, pct, gradient }) => (
                      <div key={label} style={{ marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                          <span style={{ opacity: 0.85 }}>{label}</span>
                          <span style={{ fontWeight: 700 }}>{pct}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: gradient, borderRadius: 3, transition: "width 0.45s ease" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

              <div style={{ fontSize: 12, lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}>
                {focus.winner === "shumard"
                  ? `${focus.name} backed Shumard / Centlivre on a message of jobs, border security, and constitutional government.`
                  : `${focus.name} went for Howell / Rivera, though the margin tightened from the previous cycle.`}
              </div>

              <p style={{ marginTop: 18, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                Click any state to pin · hover to preview
              </p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#f5c518" }}>★ FINAL RESULT</div>
              <h3 style={{ margin: "8px 0", fontSize: 24, fontFamily: "var(--font-playfair), Georgia, serif" }}>A Decisive Mandate</h3>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}>
                Shumard / Centlivre carries 291 electoral votes. Hover any state to preview results, or click to pin the detail view.
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
      <span style={{ width: 14, height: 14, borderRadius: 3, background: color, border: "1px solid rgba(0,0,0,0.12)" }} />
      <span>{label}</span>
    </div>
  );
}
