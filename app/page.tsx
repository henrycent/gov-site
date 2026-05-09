"use client";
import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Shumard wins 291 EV, Opponent 247 EV
const RED_FIPS = new Set(["1","2","4","5","12","13","16","18","19","20","21","22","28","29","30","31","37","38","39","40","42","45","46","47","48","49","54","55","56"]);

const STATE_EV: Record<string,{name:string;ev:number}> = {
  "1":{name:"Alabama",ev:9},"2":{name:"Alaska",ev:3},"4":{name:"Arizona",ev:11},
  "5":{name:"Arkansas",ev:6},"6":{name:"California",ev:54},"8":{name:"Colorado",ev:10},
  "9":{name:"Connecticut",ev:7},"10":{name:"Delaware",ev:3},"11":{name:"D.C.",ev:3},
  "12":{name:"Florida",ev:30},"13":{name:"Georgia",ev:16},"15":{name:"Hawaii",ev:4},
  "16":{name:"Idaho",ev:4},"17":{name:"Illinois",ev:19},"18":{name:"Indiana",ev:11},
  "19":{name:"Iowa",ev:6},"20":{name:"Kansas",ev:6},"21":{name:"Kentucky",ev:8},
  "22":{name:"Louisiana",ev:8},"23":{name:"Maine",ev:4},"24":{name:"Maryland",ev:10},
  "25":{name:"Massachusetts",ev:11},"26":{name:"Michigan",ev:15},"27":{name:"Minnesota",ev:10},
  "28":{name:"Mississippi",ev:6},"29":{name:"Missouri",ev:10},"30":{name:"Montana",ev:4},
  "31":{name:"Nebraska",ev:5},"32":{name:"Nevada",ev:6},"33":{name:"New Hampshire",ev:4},
  "34":{name:"New Jersey",ev:14},"35":{name:"New Mexico",ev:5},"36":{name:"New York",ev:28},
  "37":{name:"North Carolina",ev:16},"38":{name:"North Dakota",ev:3},"39":{name:"Ohio",ev:17},
  "40":{name:"Oklahoma",ev:7},"41":{name:"Oregon",ev:8},"42":{name:"Pennsylvania",ev:19},
  "44":{name:"Rhode Island",ev:4},"45":{name:"South Carolina",ev:9},"46":{name:"South Dakota",ev:3},
  "47":{name:"Tennessee",ev:11},"48":{name:"Texas",ev:40},"49":{name:"Utah",ev:6},
  "50":{name:"Vermont",ev:3},"51":{name:"Virginia",ev:13},"53":{name:"Washington",ev:12},
  "54":{name:"West Virginia",ev:4},"55":{name:"Wisconsin",ev:10},"56":{name:"Wyoming",ev:3},
};

const PLATFORM = [
  { title: "Economy & Jobs", desc: "Cut income taxes for working and middle-class families, reshore manufacturing through targeted trade policy, and reduce regulatory burdens on small businesses." },
  { title: "National Security", desc: "Rebuild a 350-ship Navy, fully fund military readiness, and ensure allies contribute their fair share. Peace through strength is not a slogan — it is a strategy." },
  { title: "Healthcare", desc: "Lower costs through free-market competition, protect coverage for pre-existing conditions without a government takeover, and negotiate prescription drug prices directly with manufacturers." },
  { title: "Rule of Law", desc: "Support and fund law enforcement at every level, appoint constitutionalist judges, and ensure equal justice under law for every American regardless of political affiliation." },
  { title: "Education", desc: "Return control to parents and local communities, expand school choice and charter schools, and invest in vocational training as a pathway to good-paying careers." },
  { title: "Energy & Environment", desc: "Achieve full American energy independence through an all-of-the-above strategy: domestic oil, natural gas, nuclear, and next-generation clean energy innovation." },
  { title: "Immigration", desc: "Secure the southern border with barriers, technology, and personnel. Reform legal immigration to prioritize merit and skills while enforcing existing law." },
  { title: "Fiscal Responsibility", desc: "Commit to balancing the federal budget within ten years by cutting wasteful spending, reforming entitlements for future generations, and growing the economy." },
  { title: "Social Security", desc: "Protect current retirees' benefits while modernizing the program for younger generations through expanded personal investment accounts." },
  { title: "Foreign Policy", desc: "Restore American leadership abroad, stand firmly with democratic allies, confront authoritarian adversaries from a position of strength, and put American interests first." },
];

const CABINET = [
  { dept: "Secretary of State", name: "Marco Rubio", why: "Deep foreign policy expertise and strong advocate for democratic alliances." },
  { dept: "Secretary of the Treasury", name: "Larry Kudlow", why: "Decades of economic expertise; supply-side growth advocate and former NEC Director." },
  { dept: "Secretary of Defense", name: "Pete Hegseth", why: "Army combat veteran with a record of advocating for military readiness and troop welfare." },
  { dept: "Attorney General", name: "Ted Cruz", why: "Harvard Law, former Solicitor General of Texas; deep constitutional expertise." },
  { dept: "Secretary of the Interior", name: "Doug Burgum", why: "Former North Dakota Governor; understands Western land use, energy, and conservation." },
  { dept: "Secretary of Agriculture", name: "Sonny Perdue", why: "Former USDA Secretary; lifelong farmer with proven record managing rural policy." },
  { dept: "Secretary of Commerce", name: "Vivek Ramaswamy", why: "Successful entrepreneur who understands business competitiveness and deregulation." },
  { dept: "Secretary of Labor", name: "Scott Walker", why: "Former Wisconsin Governor who championed public-sector reform and workforce development." },
  { dept: "Sec. of Health & Human Services", name: "Dr. Ben Carson", why: "Renowned neurosurgeon; believes in personal responsibility and market-based healthcare." },
  { dept: "Sec. of Housing & Urban Dev.", name: "Tim Scott", why: "Grew up in poverty; passionate advocate for opportunity zones and economic empowerment." },
  { dept: "Secretary of Transportation", name: "Nikki Haley", why: "Former UN Ambassador and SC Governor with executive management experience." },
  { dept: "Secretary of Energy", name: "Dan Crenshaw", why: "Navy SEAL and Congressman; strong advocate for American energy dominance." },
  { dept: "Secretary of Education", name: "Betsy DeVos", why: "Lifelong champion of school choice and parental rights in education policy." },
  { dept: "Secretary of Veterans Affairs", name: "Robert Wilkie", why: "Former VA Secretary with a track record of reforming veteran healthcare delivery." },
  { dept: "Secretary of Homeland Security", name: "Tom Cotton", why: "Army Ranger and Senator with deep expertise in border security and counter-terrorism." },
];

const CURRENT_BUDGET = [
  { label: "Social Security", value: 21, color: "#4A6FA5" },
  { label: "Medicare & Medicaid", value: 24, color: "#6B9AC4" },
  { label: "Defense", value: 13, color: "#2C3E6B" },
  { label: "Interest on Debt", value: 13, color: "#8FA8C8" },
  { label: "Other Mandatory", value: 18, color: "#A8B8CC" },
  { label: "Discretionary", value: 11, color: "#C5D0DC" },
];

const PROPOSED_BUDGET = [
  { label: "Social Security", value: 19, color: "#9B2335" },
  { label: "Medicare & Medicaid", value: 20, color: "#B84A5A" },
  { label: "Defense", value: 19, color: "#6B1A26" },
  { label: "Interest on Debt", value: 10, color: "#CC7A85" },
  { label: "Other Mandatory", value: 16, color: "#D99AA2" },
  { label: "Discretionary", value: 16, color: "#E5BEC2" },
];

function PieChart({ slices, title, size = 200 }: { slices: { label: string; value: number; color: string }[]; title: string; size?: number }) {
  const total = slices.reduce((s, d) => s + d.value, 0);
  let cum = -Math.PI / 2;
  const r = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;
  const paths = slices.map(d => {
    const start = cum;
    const sweep = (d.value / total) * 2 * Math.PI;
    cum += sweep;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(cum), y2 = cy + r * Math.sin(cum);
    const large = sweep > Math.PI ? 1 : 0;
    return { path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`, ...d };
  });
  const F = "var(--font-playfair), Georgia, serif";
  return (
    <div style={{ textAlign: "center" }}>
      <h4 style={{ fontSize: "13px", color: "#1D3461", marginBottom: "1rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", fontFamily: F }}>{title}</h4>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ margin: "0 auto", display: "block" }}>
        {paths.map((p, i) => <path key={i} d={p.path} fill={p.color} stroke="#fff" strokeWidth="1.5" />)}
      </svg>
      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "4px", textAlign: "left", maxWidth: size }}>
        {paths.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#444" }}>
            <span style={{ width: 11, height: 11, background: p.color, display: "inline-block", flexShrink: 0, borderRadius: "2px" }} />
            {p.label}: {p.value}%
          </div>
        ))}
      </div>
    </div>
  );
}

const F = "var(--font-playfair), Georgia, serif";
const RED = "#9B2335";
const NAVY = "#1D3461";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const NAV_ITEMS = [["about","About"],["platform","Platform"],["strategy","Strategy"],["administration","Our Plan"],["meet-the-team","Team"],["volunteer","Volunteer"]];

  return (
    <main style={{ fontFamily: F, background: "#fff", color: "#1a1a1a" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: RED, borderBottom: `3px solid ${NAVY}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem", height: "60px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 36, height: 36, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: RED, fontSize: "12px" }}>S·C</div>
          <span style={{ color: "#fff", fontWeight: "700", fontSize: "16px", letterSpacing: "0.5px", fontFamily: F }}>Shumard / Centlivre 2028</span>
        </div>
        <div style={{ display: "flex", gap: "1.75rem" }} className="desktop-nav">
          {NAV_ITEMS.map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", color: "#fff", fontSize: "14px", cursor: "pointer", fontFamily: F, letterSpacing: "0.5px", padding: "4px 0", borderBottom: "2px solid transparent" }}
              onMouseEnter={e => (e.currentTarget.style.borderBottom = "2px solid rgba(255,255,255,0.8)")}
              onMouseLeave={e => (e.currentTarget.style.borderBottom = "2px solid transparent")}
            >{label}</button>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#fff", fontSize: "26px", cursor: "pointer", display: "none" }} className="hamburger">&#9776;</button>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99, background: RED, padding: "1rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {NAV_ITEMS.map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", color: "#fff", fontSize: "17px", cursor: "pointer", textAlign: "left", fontFamily: F }}>{label}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section style={{ minHeight: "100vh", paddingTop: "60px", background: `linear-gradient(155deg, ${NAVY} 0%, #2C4A7C 40%, ${RED} 85%, #7A1A28 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 2rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", letterSpacing: "5px", textTransform: "uppercase", marginBottom: "1.5rem" }}>A New Vision for America</p>
          <h1 style={{ fontSize: "clamp(52px, 9vw, 100px)", fontWeight: "800", color: "#fff", lineHeight: 1.0, marginBottom: "0.4rem", textShadow: "0 2px 24px rgba(0,0,0,0.35)", fontFamily: F }}>SHUMARD</h1>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 46px)", fontWeight: "400", color: "rgba(255,255,255,0.8)", letterSpacing: "8px", marginBottom: "1.75rem", fontFamily: F }}>CENTLIVRE</h2>
          <p style={{ fontSize: "clamp(17px, 2.2vw, 24px)", color: "rgba(255,255,255,0.75)", fontStyle: "italic", maxWidth: "580px", margin: "0 auto 3rem" }}>
            &ldquo;Strength, Integrity, and a Future We Build Together&rdquo;
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("volunteer")} style={{ background: "#fff", color: RED, border: "none", padding: "15px 38px", fontSize: "15px", fontWeight: "700", cursor: "pointer", borderRadius: "3px", letterSpacing: "1.5px", fontFamily: F, transition: "transform 0.15s, box-shadow 0.15s", textTransform: "uppercase" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >Join Our Campaign</button>
            <button onClick={() => scrollTo("platform")} style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.55)", padding: "15px 38px", fontSize: "15px", cursor: "pointer", borderRadius: "3px", letterSpacing: "1.5px", fontFamily: F, textTransform: "uppercase" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >Our Platform</button>
          </div>
        </div>
      </section>

      {/* QUOTE BANNER */}
      <section style={{ background: NAVY, padding: "2.5rem 2rem", textAlign: "center" }} className="reveal">
        <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "clamp(16px, 2.2vw, 21px)", fontStyle: "italic", maxWidth: "780px", margin: "0 auto", lineHeight: 1.7 }}>
          &ldquo;America&rsquo;s greatest days are not behind us — they are ahead of us, if we are bold enough to reach for them.&rdquo;
        </p>
        <p style={{ color: "rgba(255,255,255,0.45)", marginTop: "1rem", letterSpacing: "3px", fontSize: "11px", textTransform: "uppercase" }}>— Cal Shumard</p>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "90px 2rem", maxWidth: "940px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
          <p style={{ color: RED, letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase" }}>Our Story</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", color: NAVY, marginTop: "0.5rem", fontFamily: F }}>Why We&rsquo;re Running</h2>
          <div style={{ width: "50px", height: "3px", background: RED, margin: "1rem auto 0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          <div style={{ background: "#f9f8f7", borderLeft: `4px solid ${RED}`, padding: "2rem", borderRadius: "0 6px 6px 0" }} className="reveal-left">
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "#444" }}>America stands at a crossroads. Families are struggling, trust in institutions is at a low, and the political establishment has failed to deliver results. The American people deserve leaders who work for them — not for special interests or party bosses.</p>
          </div>
          <div style={{ background: "#f9f8f7", borderLeft: `4px solid ${NAVY}`, padding: "2rem", borderRadius: "0 6px 6px 0" }} className="reveal-right">
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "#444" }}>Cal Shumard and Henry Centlivre are running because they believe in a government that is honest, effective, and accountable. Guided by his deep faith as a member of The Church of Jesus Christ of Latter-day Saints — grounded in service, integrity, and family — Cal&rsquo;s values form the bedrock of this campaign.</p>
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section id="platform" style={{ background: "#f6f5f3", padding: "90px 2rem" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
            <p style={{ color: RED, letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase" }}>What We Stand For</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", color: NAVY, marginTop: "0.5rem", fontFamily: F }}>Our Platform</h2>
            <div style={{ width: "50px", height: "3px", background: RED, margin: "1rem auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {PLATFORM.map((item, i) => (
              <div key={item.title} className={`reveal stagger-${(i % 6) + 1}`} style={{ background: "#fff", border: "1px solid #e4e2de", borderRadius: "6px", padding: "1.75rem", borderTop: `3px solid ${i % 2 === 0 ? RED : NAVY}`, transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <h3 style={{ color: NAVY, fontSize: "18px", marginBottom: "0.6rem", fontWeight: "700", fontFamily: F }}>{item.title}</h3>
                <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELECTION STRATEGY */}
      <section id="strategy" style={{ padding: "90px 2rem" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
            <p style={{ color: RED, letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase" }}>Election Strategy</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", color: NAVY, marginTop: "0.5rem", fontFamily: F }}>Road to 270</h2>
            <div style={{ width: "50px", height: "3px", background: RED, margin: "1rem auto 0" }} />
          </div>

          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
            <div style={{ display: "inline-block", border: `3px solid ${RED}`, padding: "1rem 3rem", borderRadius: "4px" }}>
              <p style={{ fontSize: "11px", color: "#999", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "0.4rem" }}>Campaign Slogan</p>
              <p style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: "800", color: RED, fontFamily: F, letterSpacing: "2px" }}>STRENGTH &middot; INTEGRITY &middot; TOGETHER</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "1.5rem", flexWrap: "wrap" }} className="reveal">
            <div style={{ background: RED, color: "#fff", borderRadius: "6px", padding: "1.25rem 2.5rem", textAlign: "center", minWidth: "160px" }}>
              <div style={{ fontSize: "52px", fontWeight: "900", fontFamily: F, lineHeight: 1 }}>291</div>
              <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px", opacity: 0.8 }}>Shumard / Centlivre</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", padding: "0 0.5rem" }}>
              <span style={{ fontSize: "22px", fontWeight: "300", color: "#bbb", fontFamily: F }}>vs</span>
            </div>
            <div style={{ background: "#2E5CA8", color: "#fff", borderRadius: "6px", padding: "1.25rem 2.5rem", textAlign: "center", minWidth: "160px" }}>
              <div style={{ fontSize: "52px", fontWeight: "900", fontFamily: F, lineHeight: 1 }}>247</div>
              <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px", opacity: 0.8 }}>Opponent</div>
            </div>
          </div>

          <div style={{ position: "relative", background: "#F2F1EE", borderRadius: "8px", padding: "0.5rem", overflow: "hidden" }} className="reveal">
            {mounted && (
              <ComposableMap projection="geoAlbersUsa" width={960} height={560} style={{ width: "100%", height: "auto" }}>
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const fips = String(geo.id);
                      const isRed = RED_FIPS.has(fips);
                      const info = STATE_EV[fips];
                      return (
                        <Geography key={geo.rsmKey} geography={geo}
                          fill={isRed ? "#B03040" : "#2E5CA8"}
                          stroke="#fff" strokeWidth={0.6}
                          style={{ default: { outline: "none" }, hover: { fill: isRed ? "#821727" : "#1B3D7A", outline: "none", cursor: "pointer" }, pressed: { outline: "none" } }}
                          onMouseEnter={(evt: React.MouseEvent<SVGPathElement>) => { if (info) setTooltip({ text: `${info.name} — ${info.ev} EV`, x: (evt as unknown as MouseEvent).clientX, y: (evt as unknown as MouseEvent).clientY }); }}
                          onMouseMove={(evt: React.MouseEvent<SVGPathElement>) => { setTooltip(t => t ? { ...t, x: (evt as unknown as MouseEvent).clientX, y: (evt as unknown as MouseEvent).clientY } : null); }}
                          onMouseLeave={() => setTooltip(null)}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            )}
            {tooltip && (
              <div style={{ position: "fixed", left: tooltip.x + 12, top: tooltip.y - 36, background: "rgba(15,15,15,0.9)", color: "#fff", padding: "5px 10px", borderRadius: "4px", fontSize: "13px", pointerEvents: "none", zIndex: 999, fontFamily: F, whiteSpace: "nowrap" }}>
                {tooltip.text}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginTop: "0.75rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#555" }}>
              <span style={{ width: 14, height: 14, background: "#B03040", display: "inline-block", borderRadius: "2px" }} /> Shumard / Centlivre (291 EV)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#555" }}>
              <span style={{ width: 14, height: 14, background: "#2E5CA8", display: "inline-block", borderRadius: "2px" }} /> Opponent (247 EV)
            </div>
          </div>

          <div style={{ marginTop: "2.5rem", background: "#f6f5f3", borderRadius: "6px", padding: "1.5rem 2rem" }} className="reveal">
            <h4 style={{ color: NAVY, fontSize: "16px", fontWeight: "700", marginBottom: "1rem", fontFamily: F }}>Key Battleground States</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
              {[
                { state: "Pennsylvania (19 EV)", note: "Decisive. Won on manufacturing revival and economic message." },
                { state: "Wisconsin (10 EV)", note: "Flipped with rural turnout and fair trade policy." },
                { state: "Georgia (16 EV)", note: "Held with evangelical and suburban coalitions." },
                { state: "North Carolina (16 EV)", note: "Solid red; key to early-night momentum." },
                { state: "Arizona (11 EV)", note: "Won on border security and economic growth." },
              ].map(b => (
                <div key={b.state} style={{ borderLeft: `3px solid ${RED}`, paddingLeft: "0.75rem" }}>
                  <p style={{ fontWeight: "700", fontSize: "14px", color: NAVY, fontFamily: F }}>{b.state}</p>
                  <p style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}>{b.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MEDIA & INTEREST GROUPS */}
      <section style={{ background: "#f6f5f3", padding: "90px 2rem" }}>
        <div style={{ maxWidth: "940px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
            <p style={{ color: RED, letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase" }}>Outreach</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", color: NAVY, marginTop: "0.5rem", fontFamily: F }}>Media &amp; Interest Groups</h2>
            <div style={{ width: "50px", height: "3px", background: RED, margin: "1rem auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2.5rem" }}>
            <div className="reveal-left">
              <h3 style={{ color: NAVY, fontFamily: F, fontSize: "20px", marginBottom: "1rem", borderBottom: `2px solid ${RED}`, paddingBottom: "0.5rem" }}>Media Outlets</h3>
              {[
                { name: "Fox News (Television)", why: "Reaches the largest conservative cable news audience; ideal for primetime announcements and debate coverage." },
                { name: "The Wall Street Journal (Print/Digital)", why: "Targets the business community and fiscal conservatives who respond to our economic and tax policy message." },
                { name: "Breitbart News (Online)", why: "Grassroots conservative readership; vital for base mobilization and reaching voters outside traditional media markets." },
              ].map(m => (
                <div key={m.name} style={{ marginBottom: "1.25rem" }}>
                  <p style={{ fontWeight: "700", fontSize: "15px", color: "#1a1a1a", fontFamily: F }}>{m.name}</p>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.65, marginTop: "3px" }}>{m.why}</p>
                </div>
              ))}
            </div>
            <div className="reveal-right">
              <h3 style={{ color: NAVY, fontFamily: F, fontSize: "20px", marginBottom: "1rem", borderBottom: `2px solid ${NAVY}`, paddingBottom: "0.5rem" }}>Supporting Interest Groups</h3>
              {[
                { name: "National Rifle Association (NRA)", why: "Aligned with our 2nd Amendment platform; provides grassroots volunteer infrastructure and voter outreach in key rural states." },
                { name: "U.S. Chamber of Commerce", why: "Supports our pro-growth tax and regulatory agenda; adds credibility with the business community and moderate suburban voters." },
                { name: "Heritage Action for America", why: "Leading conservative policy network that validates our platform and activates policy-motivated donors and volunteers." },
              ].map(g => (
                <div key={g.name} style={{ marginBottom: "1.25rem" }}>
                  <p style={{ fontWeight: "700", fontSize: "15px", color: "#1a1a1a", fontFamily: F }}>{g.name}</p>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.65, marginTop: "3px" }}>{g.why}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ADMINISTRATION PLAN */}
      <section id="administration" style={{ padding: "90px 2rem" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
            <p style={{ color: RED, letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase" }}>Administration Plan</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", color: NAVY, marginTop: "0.5rem", fontFamily: F }}>How We Will Govern</h2>
            <div style={{ width: "50px", height: "3px", background: RED, margin: "1rem auto 0" }} />
          </div>

          {/* Constitutional Underpinnings */}
          <div style={{ marginBottom: "4.5rem" }} className="reveal">
            <h3 style={{ color: NAVY, fontFamily: F, fontSize: "26px", marginBottom: "0.4rem", fontWeight: "700" }}>Constitutional Underpinnings &amp; Civil Liberties</h3>
            <div style={{ width: "40px", height: "2px", background: RED, marginBottom: "1.5rem" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              <div style={{ background: "#f6f5f3", padding: "1.5rem", borderRadius: "6px" }}>
                <h4 style={{ color: RED, fontFamily: F, fontSize: "16px", marginBottom: "0.75rem", fontWeight: "700" }}>Proposed Amendments</h4>
                <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.8, marginBottom: "0.75rem" }}><strong>1. Balanced Budget Amendment:</strong> Require Congress to pass a balanced federal budget each fiscal year, with exceptions only for declared national emergencies. This forces Washington to make the same responsible choices American families make every day.</p>
                <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.8 }}><strong>2. Congressional Term Limits:</strong> Limit Senators to two terms (12 years) and Representatives to six terms (12 years). Career politicians have little incentive to solve problems — term limits restore citizen governance without altering the separation of powers.</p>
              </div>
              <div style={{ background: "#f6f5f3", padding: "1.5rem", borderRadius: "6px" }}>
                <h4 style={{ color: NAVY, fontFamily: F, fontSize: "16px", marginBottom: "0.75rem", fontWeight: "700" }}>Most Cherished Civil Liberties</h4>
                <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.8, marginBottom: "0.75rem" }}><strong>First Amendment:</strong> Free speech, religious exercise, and a free press are the foundation of every other liberty. This administration will never weaponize government against political opponents or suppress religious conscience.</p>
                <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.8 }}><strong>Second Amendment:</strong> The right of law-abiding citizens to keep and bear arms is an individual right affirmed by the Supreme Court. We will appoint justices and sign legislation that protects this guarantee without compromise.</p>
              </div>
            </div>
          </div>

          {/* Executive Branch */}
          <div style={{ marginBottom: "4.5rem" }} className="reveal">
            <h3 style={{ color: NAVY, fontFamily: F, fontSize: "26px", marginBottom: "0.4rem", fontWeight: "700" }}>Executive Branch</h3>
            <div style={{ width: "40px", height: "2px", background: RED, marginBottom: "1.5rem" }} />
            <div style={{ background: "#f6f5f3", padding: "1.5rem 2rem", borderRadius: "6px", borderLeft: `4px solid ${RED}`, marginBottom: "2rem" }}>
              <h4 style={{ color: RED, fontFamily: F, fontSize: "15px", marginBottom: "0.5rem" }}>Bureaucracy Vision Statement</h4>
              <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.8, fontStyle: "italic" }}>&ldquo;On day one, this administration will begin a top-to-bottom audit of the federal bureaucracy. We will eliminate redundant agencies, reduce regulatory burdens that strangle American enterprise, and restore accountability to every department. Government must serve the people — not the other way around.&rdquo;</p>
            </div>
            <h4 style={{ color: NAVY, fontFamily: F, fontSize: "18px", marginBottom: "1rem" }}>Cabinet Selections</h4>
            <div style={{ overflowX: "auto", borderRadius: "6px", border: "1px solid #e4e2de" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ background: NAVY, color: "#fff" }}>
                    <th style={{ padding: "10px 14px", textAlign: "left", fontFamily: F, fontWeight: "600" }}>Department</th>
                    <th style={{ padding: "10px 14px", textAlign: "left", fontFamily: F, fontWeight: "600" }}>Nominee</th>
                    <th style={{ padding: "10px 14px", textAlign: "left", fontFamily: F, fontWeight: "600" }}>Justification</th>
                  </tr>
                </thead>
                <tbody>
                  {CABINET.map((c, i) => (
                    <tr key={c.dept} style={{ background: i % 2 === 0 ? "#fff" : "#f9f8f7", borderBottom: "1px solid #e8e6e2" }}>
                      <td style={{ padding: "9px 14px", color: NAVY, fontWeight: "600", whiteSpace: "nowrap", fontSize: "13px" }}>{c.dept}</td>
                      <td style={{ padding: "9px 14px", fontWeight: "700", color: "#1a1a1a", whiteSpace: "nowrap" }}>{c.name}</td>
                      <td style={{ padding: "9px 14px", color: "#555", lineHeight: 1.6 }}>{c.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Judicial Branch */}
          <div style={{ marginBottom: "4.5rem" }} className="reveal">
            <h3 style={{ color: NAVY, fontFamily: F, fontSize: "26px", marginBottom: "0.4rem", fontWeight: "700" }}>Judicial Branch</h3>
            <div style={{ width: "40px", height: "2px", background: RED, marginBottom: "1.5rem" }} />
            <div style={{ background: "#f6f5f3", padding: "1.75rem 2rem", borderRadius: "6px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
                <div>
                  <h4 style={{ color: RED, fontFamily: F, fontSize: "18px", marginBottom: "0.5rem" }}>Supreme Court Nominee</h4>
                  <p style={{ fontSize: "22px", fontWeight: "800", color: NAVY, fontFamily: F, marginBottom: "0.25rem" }}>Judge Don Willett</p>
                  <p style={{ fontSize: "12px", color: "#888", textTransform: "uppercase", letterSpacing: "1.5px" }}>U.S. Court of Appeals, 5th Circuit</p>
                </div>
                <div>
                  <h4 style={{ color: NAVY, fontFamily: F, fontSize: "15px", marginBottom: "0.5rem" }}>Judicial Philosophy</h4>
                  <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.8 }}><strong>Originalism &amp; Textualism.</strong> Judge Willett interprets the Constitution as written and laws as Congress enacted them — not as evolving documents subject to judicial rewriting. His record on the 5th Circuit demonstrates intellectual rigor and fidelity to the Founders&rsquo; design.</p>
                </div>
                <div>
                  <h4 style={{ color: NAVY, fontFamily: F, fontSize: "15px", marginBottom: "0.5rem" }}>Major Litmus Tests</h4>
                  <ul style={{ fontSize: "14px", color: "#444", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
                    <li>Strong protection of 2nd Amendment individual rights</li>
                    <li>Respect for religious liberty under the 1st Amendment</li>
                    <li>Limits on federal regulatory overreach</li>
                    <li>Deference to democratic processes over judicial activism</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* State of the Union */}
          <div style={{ marginBottom: "4.5rem" }} className="reveal">
            <h3 style={{ color: NAVY, fontFamily: F, fontSize: "26px", marginBottom: "0.4rem", fontWeight: "700" }}>State of the Union Address</h3>
            <div style={{ width: "40px", height: "2px", background: RED, marginBottom: "0.5rem" }} />
            <p style={{ fontSize: "11px", color: "#999", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1.5rem" }}>Three themes: Economic Revival &middot; National Security &middot; Constitutional Restoration</p>
            <div style={{ background: "#f6f5f3", padding: "2rem 2.5rem", borderRadius: "6px", borderLeft: `4px solid ${NAVY}` }}>
              {[
                "Mr. Speaker, Mr. Vice President, Members of Congress, and my fellow Americans: I stand before you tonight not as the leader of a party, but as a servant of a nation — the greatest nation the world has ever known. The state of our Union is tested, but I have seen the resilience of this people, and I am here to tell you: we are rising. Together, we will rise.",
                "The first priority of this administration is the economic revival of the American worker. For too long, Washington has rewarded corporations that offshore jobs while working families struggle to make ends meet. Our tax reform plan cuts rates for every family earning under $400,000 a year. Our trade policy will bring manufacturing back to Pennsylvania, Ohio, Wisconsin, and every state in this union. American energy independence will lower gas prices, cut utility bills, and create millions of high-paying jobs that do not require a four-year degree. The American Dream was built by workers with calloused hands — and this administration will honor that legacy.",
                "The second priority is national security and securing our borders. America cannot be strong abroad if it is not secure at home. We have deployed additional personnel and technology to the southern border and are working with regional partners to address the root causes of illegal migration. Internationally, we are rebuilding our alliances while demanding partners meet their defense commitments. Our adversaries — whether in Beijing, Moscow, or Tehran — must understand that American strength is not up for debate. We will rebuild our Navy, fund our troops, and give them everything they need to defend this nation.",
                "The third priority is the restoration of constitutional governance. This administration believes in three co-equal branches of government. I will not govern by executive order where Congress should act. I will appoint judges who respect the limits of their role and the text of the Constitution. I will work with this body to pursue a Balanced Budget Amendment and Congressional term limits — because the American people deserve a government that lives within its means and serves them, not itself. The First Amendment belongs to every American. The Second Amendment belongs to every law-abiding citizen. On these principles, this administration will not waver.",
                "My fellow Americans, the road ahead requires courage — the courage to make hard choices, to reform entrenched systems, and to trust the people over the powerful. I ran for this office not because it was easy, but because I believe this country is worth fighting for. The next four years will be defined not by what Washington gives you, but by what free Americans build together. Our campaign was built on Strength, Integrity, and Together — and together, we will write the next great chapter of the American story. God bless you, God bless our troops, and God bless the United States of America."
              ].map((para, i) => (
                <p key={i} style={{ fontSize: "15px", color: "#333", lineHeight: 1.9, marginBottom: i < 4 ? "1.25rem" : 0 }}>{para}</p>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="reveal">
            <h3 style={{ color: NAVY, fontFamily: F, fontSize: "26px", marginBottom: "0.4rem", fontWeight: "700" }}>Budget Proposal</h3>
            <div style={{ width: "40px", height: "2px", background: RED, marginBottom: "0.5rem" }} />
            <p style={{ fontSize: "13px", color: "#888", marginBottom: "2rem" }}>Prepared using <a href="http://usa.v1.abalancingact.com/" target="_blank" rel="noopener noreferrer" style={{ color: RED }}>usa.v1.abalancingact.com</a></p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "3rem", justifyItems: "center" }}>
              <PieChart title="Current Federal Budget (FY2028 Projected)" slices={CURRENT_BUDGET} size={200} />
              <PieChart title="Shumard / Centlivre Proposed Budget" slices={PROPOSED_BUDGET} size={200} />
            </div>
            <div style={{ marginTop: "1.5rem", background: "#f6f5f3", padding: "1rem 1.5rem", borderRadius: "6px", fontSize: "13px", color: "#666", lineHeight: 1.75 }}>
              <strong style={{ color: NAVY }}>Key Changes:</strong> Defense spending rises from 13% to 19%, reflecting our commitment to military readiness. Interest on the debt falls from 13% to 10% through disciplined fiscal policy and sustained economic growth. Mandatory entitlements are modernized for long-term solvency.
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section id="meet-the-team" style={{ background: "#f6f5f3", padding: "90px 2rem" }}>
        <div style={{ maxWidth: "940px", margin: "0 auto", textAlign: "center" }}>
          <div className="reveal">
            <p style={{ color: RED, letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase" }}>The Ticket</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", color: NAVY, marginTop: "0.5rem", fontFamily: F }}>Meet the Candidates</h2>
            <div style={{ width: "50px", height: "3px", background: RED, margin: "1rem auto 2.5rem" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[{
              name: "Cal Shumard", role: "Candidate for President", accent: RED, initials: "CS",
              bio: "Cal Shumard is a proven leader whose values of service, integrity, and family — rooted in his faith as a member of The Church of Jesus Christ of Latter-day Saints — drive his vision for a stronger, more prosperous America. His principled conservatism and commitment to constitutional governance have earned him trust across the country."
            },{
              name: "Henry Centlivre", role: "Candidate for Vice President", accent: NAVY, initials: "HC",
              bio: "Henry Centlivre brings a deep background in finance and a steadfast commitment to fiscal responsibility. His analytical mind, business expertise, and dedication to public service make him the ideal partner to help rebuild America's economic foundation and restore trust in government."
            }].map((person, i) => (
              <div key={person.name} className={i === 0 ? "reveal-left" : "reveal-right"} style={{ background: "#fff", border: "1px solid #e4e2de", borderRadius: "10px", padding: "2.5rem 2rem", textAlign: "center" }}>
                <div style={{ width: "88px", height: "88px", borderRadius: "50%", background: person.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "800", margin: "0 auto 1.5rem", border: "3px solid #e0ddd8", fontFamily: F }}>{person.initials}</div>
                <h3 style={{ fontSize: "24px", color: "#1a1a1a", marginBottom: "0.25rem", fontFamily: F }}>{person.name}</h3>
                <p style={{ color: person.accent, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1rem" }}>{person.role}</p>
                <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.8 }}>{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOLUNTEER */}
      <section id="volunteer" style={{ background: NAVY, padding: "90px 2rem" }}>
        <div style={{ maxWidth: "580px", margin: "0 auto", textAlign: "center" }} className="reveal">
          <p style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase" }}>Get Involved</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#fff", marginTop: "0.5rem", marginBottom: "0.5rem", fontFamily: F }}>Join the Movement</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: "2.5rem", fontSize: "15px" }}>Sign up to volunteer, receive campaign updates, or show your support.</p>
          {submitted ? (
            <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "8px", padding: "3rem", color: "#fff", fontSize: "20px", fontFamily: F }}>Thank you — we&rsquo;ll be in touch soon.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ padding: "13px 16px", fontSize: "15px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.07)", color: "#fff", fontFamily: F, outline: "none" }} />
              <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ padding: "13px 16px", fontSize: "15px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.07)", color: "#fff", fontFamily: F, outline: "none" }} />
              <textarea placeholder="Why do you want to get involved? (optional)" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={4} style={{ padding: "13px 16px", fontSize: "15px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.07)", color: "#fff", fontFamily: F, resize: "vertical", outline: "none" }} />
              <button onClick={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ background: RED, color: "#fff", border: "none", padding: "15px", fontSize: "16px", fontWeight: "700", cursor: "pointer", borderRadius: "4px", letterSpacing: "1.5px", fontFamily: F, marginTop: "0.25rem", textTransform: "uppercase", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#7A1A28")}
                onMouseLeave={e => (e.currentTarget.style.background = RED)}
              >Sign Me Up</button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0e0e0e", color: "rgba(255,255,255,0.38)", textAlign: "center", padding: "2rem", fontSize: "12px", letterSpacing: "1px" }}>
        <p style={{ color: "rgba(255,255,255,0.65)", fontWeight: "700", marginBottom: "0.4rem", fontFamily: F, letterSpacing: "2px" }}>SHUMARD / CENTLIVRE 2028</p>
        <p>Paid for by the Shumard-Centlivre Campaign Committee &middot; Built with pride in America</p>
      </footer>
    </main>
  );
}
