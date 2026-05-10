"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import StarField from "@/components/StarField";

const F = "var(--font-playfair), Georgia, serif";
const RED = "#9B2335";
const NAVY = "#1D3461";
const TOTAL_B = 7100;

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

type BudgetItem = {
  label: string;
  icon: string;
  currentPct: number;
  proposedPct: number;
  detail: string;
  subs: { name: string; pct: number }[];
};

const BUDGET: BudgetItem[] = [
  {
    label: "Social Security",
    icon: "👴",
    currentPct: 21,
    proposedPct: 19,
    detail: "Modernize for long-term solvency while protecting current retirees. Expand personal investment accounts for workers under 50.",
    subs: [
      { name: "Retirement Benefits", pct: 72 },
      { name: "Disability Insurance", pct: 14 },
      { name: "Survivor Benefits", pct: 14 },
    ],
  },
  {
    label: "Medicare & Medicaid",
    icon: "🏥",
    currentPct: 24,
    proposedPct: 20,
    detail: "Inject market competition to reduce costs while protecting beneficiaries. Cap prescription drug price increases at CPI.",
    subs: [
      { name: "Medicare Part A/B", pct: 38 },
      { name: "Medicare Part D", pct: 12 },
      { name: "Medicaid", pct: 38 },
      { name: "CHIP & Other", pct: 12 },
    ],
  },
  {
    label: "National Defense",
    icon: "🛡️",
    currentPct: 13,
    proposedPct: 19,
    detail: "Rebuild military readiness: 350-ship Navy, next-gen Air Force, Space Force expansion. Fully fund personnel and modernize equipment.",
    subs: [
      { name: "Operations & Maintenance", pct: 38 },
      { name: "Military Personnel", pct: 31 },
      { name: "Procurement", pct: 19 },
      { name: "Research & Development", pct: 12 },
    ],
  },
  {
    label: "Interest on Debt",
    icon: "📉",
    currentPct: 13,
    proposedPct: 10,
    detail: "Reduced through disciplined fiscal policy and sustained economic growth. Balanced Budget Amendment to prevent future debt accumulation.",
    subs: [
      { name: "Interest to Public", pct: 90 },
      { name: "Intragovernmental", pct: 10 },
    ],
  },
  {
    label: "Other Mandatory",
    icon: "📋",
    currentPct: 18,
    proposedPct: 16,
    detail: "Reform and modernize entitlement programs. Target benefits to those who need them most through means-testing and work requirements.",
    subs: [
      { name: "SNAP & Nutrition", pct: 10 },
      { name: "Veterans Benefits", pct: 15 },
      { name: "Federal Pensions", pct: 18 },
      { name: "Agriculture Programs", pct: 7 },
      { name: "Other Programs", pct: 50 },
    ],
  },
  {
    label: "Discretionary",
    icon: "🏛️",
    currentPct: 11,
    proposedPct: 16,
    detail: "Increase investment in infrastructure, border security, and vocational education while eliminating redundant agencies and bureaucratic waste.",
    subs: [
      { name: "Non-Defense Domestic", pct: 55 },
      { name: "Veterans & Housing", pct: 15 },
      { name: "International Affairs", pct: 10 },
      { name: "Justice & Science", pct: 20 },
    ],
  },
];

function BudgetRow({ item }: { item: BudgetItem }) {
  const [open, setOpen] = useState(false);
  const currentAmt = Math.round((TOTAL_B * item.currentPct) / 100);
  const proposedAmt = Math.round((TOTAL_B * item.proposedPct) / 100);
  const diff = item.proposedPct - item.currentPct;

  return (
    <div style={{ borderRadius: "8px", border: "1px solid #e4e2de", overflow: "hidden", marginBottom: "8px" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", textAlign: "left", background: open ? "#f6f5f3" : "#fff",
          border: "none", cursor: "pointer", padding: "1rem 1.25rem",
          display: "flex", alignItems: "center", gap: "1rem",
        }}
      >
        <span style={{ fontSize: "1.4rem", flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontWeight: "700", color: NAVY, fontSize: "15px", fontFamily: F }}>{item.label}</span>
            <span style={{
              fontSize: "12px", fontWeight: "700", padding: "2px 8px", borderRadius: "12px",
              background: diff > 0 ? "#fff0f1" : diff < 0 ? "#f0f4ff" : "#f5f5f5",
              color: diff > 0 ? RED : diff < 0 ? NAVY : "#888",
            }}>
              {diff > 0 ? `▲ +${diff}pp` : diff < 0 ? `▼ ${diff}pp` : "No change"}
            </span>
          </div>
          {/* Current bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
            <span style={{ fontSize: "10px", color: "#888", width: "56px", textAlign: "right", flexShrink: 0 }}>Current</span>
            <div style={{ flex: 1, height: "7px", borderRadius: "4px", background: "#eee", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${item.currentPct}%`, background: "#4A6FA5", borderRadius: "4px", transition: "width 0.4s ease" }} />
            </div>
            <span style={{ fontSize: "11px", color: "#555", width: "80px", flexShrink: 0 }}>{item.currentPct}% · ${currentAmt}B</span>
          </div>
          {/* Proposed bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "10px", color: RED, width: "56px", textAlign: "right", flexShrink: 0 }}>Proposed</span>
            <div style={{ flex: 1, height: "7px", borderRadius: "4px", background: "#eee", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${item.proposedPct}%`, background: RED, borderRadius: "4px", transition: "width 0.4s ease" }} />
            </div>
            <span style={{ fontSize: "11px", color: RED, width: "80px", flexShrink: 0 }}>{item.proposedPct}% · ${proposedAmt}B</span>
          </div>
        </div>
        <span style={{ color: "#bbb", fontSize: "14px", flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{ padding: "1rem 1.25rem 1.25rem", background: "#f9f8f7", borderTop: "1px solid #e4e2de" }}>
          <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, marginBottom: "1.25rem", marginTop: 0 }}>{item.detail}</p>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#999", letterSpacing: "1px", marginBottom: "0.75rem", textTransform: "uppercase" }}>Current Allocation Breakdown</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {item.subs.map((sub) => (
              <div key={sub.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                  <span style={{ fontSize: "13px", color: "#444" }}>{sub.name}</span>
                  <span style={{ fontSize: "13px", color: NAVY, fontWeight: "600" }}>{sub.pct}%</span>
                </div>
                <div style={{ height: "5px", borderRadius: "3px", background: "#e4e2de", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${sub.pct}%`, background: NAVY, borderRadius: "3px", opacity: 0.6 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FighterJet() {
  return (
    <svg viewBox="0 0 180 56" width="170" height="52" aria-hidden>
      {/* fuselage */}
      <polygon points="8,28 45,20 168,22 168,34 45,36" fill="#d0d0d0" />
      {/* nose cone */}
      <polygon points="3,28 45,20 45,36" fill="#e0e0e0" />
      {/* main swept wing */}
      <polygon points="88,24 115,50 68,50 72,26" fill="#b8b8b8" />
      {/* vertical stabilizer */}
      <polygon points="44,22 58,6 52,22" fill="#c4c4c4" />
      {/* horizontal stabilizer */}
      <polygon points="44,34 58,46 52,34" fill="#c0c0c0" />
      {/* canopy */}
      <ellipse cx="136" cy="21" rx="20" ry="5.5" fill="#7aafdf" opacity="0.9" />
      {/* afterburner */}
      <ellipse cx="170" cy="28" rx="6" ry="3" fill="#ff8c00" />
      <ellipse cx="175" cy="28" rx="10" ry="2" fill="#ffd000" opacity="0.65" />
    </svg>
  );
}

function JetFlyby() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: "relative", height: "80px", overflow: "hidden", borderRadius: "8px",
      background: "linear-gradient(180deg, #050d2d 0%, #0d1f3c 100%)",
      margin: "2.5rem 0",
    }}>
      {/* stars */}
      {Array.from({ length: 32 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: i % 5 === 0 ? "3px" : "2px",
          height: i % 5 === 0 ? "3px" : "2px",
          borderRadius: "50%",
          background: i % 7 === 0 ? "#f5c518" : "#fff",
          top: `${((i * 19 + 5) % 88) + 6}%`,
          left: `${((i * 37 + 11) % 96) + 2}%`,
          opacity: 0.5 + (i % 3) * 0.2,
        }} />
      ))}
      {/* contrail */}
      {started && <div className="jet-contrail" style={{ top: "calc(50% - 1px)" }} />}
      {/* jet */}
      {started && (
        <div className="jet-fly">
          <FighterJet />
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main style={{ fontFamily: F, background: "#fff", color: "#1a1a1a" }}>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(160deg, #050d2d 0%, #0a2463 55%, #7a0f1f 100%)",
        color: "#fff", padding: "140px 1.5rem 80px", position: "relative", overflow: "hidden",
      }}>
        {mounted && <StarField count={100} goldRatio={0.15} />}
        <div style={{ position: "relative", maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#f5c518", letterSpacing: "5px", fontSize: "12px", fontWeight: "700", margin: 0, textTransform: "uppercase" }}>Day One Agenda</p>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 7vw, 80px)", margin: "12px 0", lineHeight: 1 }}>Administration Plan</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "17px", maxWidth: "660px", margin: "0 auto", lineHeight: 1.65 }}>
            Cabinet picks, constitutional priorities, federal budget, and the agenda for the first term.
          </p>
        </div>
      </section>

      {/* CONSTITUTIONAL */}
      <section style={{ padding: "80px 2rem" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
            <p style={{ color: RED, letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase", margin: 0 }}>Foundation</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", color: NAVY, marginTop: "0.5rem", fontFamily: F }}>Constitutional Priorities</h2>
            <div style={{ width: "50px", height: "3px", background: RED, margin: "1rem auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <div style={{ background: "#f9f8f7", padding: "1.75rem", borderRadius: "8px", borderTop: `3px solid ${RED}` }} className="reveal-left">
              <h4 style={{ color: RED, fontFamily: F, fontSize: "17px", marginBottom: "0.75rem", marginTop: 0, fontWeight: "700" }}>Proposed Amendments</h4>
              <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.8, marginBottom: "0.75rem" }}>
                <strong>1. Balanced Budget Amendment:</strong> Require Congress to pass a balanced federal budget each fiscal year, with exceptions only for declared national emergencies.
              </p>
              <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.8, margin: 0 }}>
                <strong>2. Congressional Term Limits:</strong> Senators limited to two terms (12 years); Representatives to six terms (12 years). Citizen governance over career politics.
              </p>
            </div>
            <div style={{ background: "#f9f8f7", padding: "1.75rem", borderRadius: "8px", borderTop: `3px solid ${NAVY}` }} className="reveal-right">
              <h4 style={{ color: NAVY, fontFamily: F, fontSize: "17px", marginBottom: "0.75rem", marginTop: 0, fontWeight: "700" }}>Cherished Civil Liberties</h4>
              <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.8, marginBottom: "0.75rem" }}>
                <strong>First Amendment:</strong> Free speech, religious exercise, and a free press are the foundation of every other liberty. Government will never be weaponized against political opponents.
              </p>
              <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.8, margin: 0 }}>
                <strong>Second Amendment:</strong> The right to keep and bear arms is an individual right. Constitutionalist judges and legislation will protect this guarantee without compromise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CABINET */}
      <section style={{ background: "#f6f5f3", padding: "80px 2rem" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
            <p style={{ color: RED, letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase", margin: 0 }}>Executive Branch</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", color: NAVY, marginTop: "0.5rem", fontFamily: F }}>Cabinet Selections</h2>
            <div style={{ width: "50px", height: "3px", background: RED, margin: "1rem auto 0" }} />
          </div>
          <div style={{ overflowX: "auto", borderRadius: "8px", border: "1px solid #e4e2de", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }} className="reveal">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: NAVY, color: "#fff" }}>
                  <th style={{ padding: "10px 16px", textAlign: "left", fontFamily: F, fontWeight: "600", whiteSpace: "nowrap" }}>Department</th>
                  <th style={{ padding: "10px 16px", textAlign: "left", fontFamily: F, fontWeight: "600", whiteSpace: "nowrap" }}>Nominee</th>
                  <th style={{ padding: "10px 16px", textAlign: "left", fontFamily: F, fontWeight: "600" }}>Justification</th>
                </tr>
              </thead>
              <tbody>
                {CABINET.map((c, i) => (
                  <tr key={c.dept} style={{ background: i % 2 === 0 ? "#fff" : "#f9f8f7", borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "9px 16px", color: NAVY, fontWeight: "600", whiteSpace: "nowrap", fontSize: "13px" }}>{c.dept}</td>
                    <td style={{ padding: "9px 16px", fontWeight: "700", color: "#1a1a1a", whiteSpace: "nowrap" }}>{c.name}</td>
                    <td style={{ padding: "9px 16px", color: "#555", lineHeight: 1.6 }}>{c.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* JUDICIAL */}
      <section style={{ padding: "80px 2rem" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
            <p style={{ color: RED, letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase", margin: 0 }}>Judicial Branch</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", color: NAVY, marginTop: "0.5rem", fontFamily: F }}>Supreme Court Nominee</h2>
            <div style={{ width: "50px", height: "3px", background: RED, margin: "1rem auto 0" }} />
          </div>
          <div style={{ background: "#f6f5f3", padding: "2rem", borderRadius: "8px" }} className="reveal">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
              <div>
                <p style={{ color: RED, fontFamily: F, fontSize: "14px", margin: 0, fontWeight: "700" }}>Nominee</p>
                <h3 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: "900", color: NAVY, fontFamily: F, margin: "6px 0 4px" }}>Judge Don Willett</h3>
                <p style={{ fontSize: "12px", color: "#888", textTransform: "uppercase", letterSpacing: "1.5px", margin: 0 }}>U.S. Court of Appeals, 5th Circuit</p>
              </div>
              <div>
                <p style={{ color: NAVY, fontFamily: F, fontSize: "14px", margin: "0 0 6px", fontWeight: "700" }}>Philosophy</p>
                <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.8, margin: 0 }}>
                  <strong>Originalism & Textualism.</strong> Judge Willett interprets the Constitution as written and laws as Congress enacted them — not as evolving documents subject to judicial rewriting.
                </p>
              </div>
              <div>
                <p style={{ color: NAVY, fontFamily: F, fontSize: "14px", margin: "0 0 6px", fontWeight: "700" }}>Litmus Tests</p>
                <ul style={{ fontSize: "14px", color: "#444", lineHeight: 1.9, paddingLeft: "1.25rem", margin: 0 }}>
                  <li>Strong protection of 2nd Amendment rights</li>
                  <li>Religious liberty under the 1st Amendment</li>
                  <li>Limits on federal regulatory overreach</li>
                  <li>Deference to democratic processes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUDGET */}
      <section style={{ background: "#f6f5f3", padding: "80px 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
            <p style={{ color: RED, letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase", margin: 0 }}>Fiscal Policy</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", color: NAVY, marginTop: "0.5rem", fontFamily: F }}>Federal Budget Proposal</h2>
            <div style={{ width: "50px", height: "3px", background: RED, margin: "1rem auto 0" }} />
            <p style={{ fontSize: "13px", color: "#888", marginTop: "1rem" }}>Click any category to see a detailed breakdown.</p>
          </div>

          <div className="reveal">
            {/* Legend */}
            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#555" }}>
                <span style={{ width: 12, height: 12, background: "#4A6FA5", display: "inline-block", borderRadius: "2px" }} />
                Current Budget (FY2028 Projected, $7.1T total)
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#555" }}>
                <span style={{ width: 12, height: 12, background: RED, display: "inline-block", borderRadius: "2px" }} />
                Shumard / Centlivre Proposed
              </div>
            </div>

            {BUDGET.map((item) => (
              <BudgetRow key={item.label} item={item} />
            ))}

            <div style={{ marginTop: "1.5rem", background: "#fff", padding: "1.25rem 1.5rem", borderRadius: "8px", fontSize: "13px", color: "#555", lineHeight: 1.75, borderLeft: `4px solid ${NAVY}` }}>
              <strong style={{ color: NAVY, fontFamily: F }}>Key Changes: </strong>
              Defense rises from 13% to 19% (+$426B) reflecting military readiness investment.
              Debt interest drops from 13% to 10% through disciplined fiscal policy.
              Healthcare savings of 4pp ($284B) through market-based reform.
            </div>
          </div>

          {/* FIGHTER JET */}
          {mounted && <JetFlyby />}
        </div>
      </section>

      {/* SOTU EXCERPT */}
      <section style={{ padding: "80px 2rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
            <p style={{ color: RED, letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase", margin: 0 }}>State of the Union</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", color: NAVY, marginTop: "0.5rem", fontFamily: F }}>A Message to the Nation</h2>
            <div style={{ width: "50px", height: "3px", background: RED, margin: "1rem auto 0" }} />
          </div>
          <div style={{ background: "#f6f5f3", padding: "2.5rem", borderRadius: "8px", borderLeft: `4px solid ${NAVY}` }} className="reveal">
            <p style={{ fontSize: "16px", color: "#333", lineHeight: 1.9, marginBottom: "1.25rem", fontStyle: "italic" }}>
              &ldquo;Mr. Speaker, Mr. Vice President, Members of Congress, and my fellow Americans: I stand before you tonight not as the leader of a party, but as a servant of a nation — the greatest nation the world has ever known. The state of our Union is tested, but I have seen the resilience of this people, and I am here to tell you: we are rising. Together, we will rise.
            </p>
            <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.9, marginBottom: "1.25rem" }}>
              The first priority of this administration is the economic revival of the American worker. Our tax reform plan cuts rates for every family earning under $400,000 a year. Our trade policy will bring manufacturing back to Pennsylvania, Ohio, Wisconsin, and every state in this union. American energy independence will lower gas prices and create millions of high-paying jobs.
            </p>
            <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.9, marginBottom: 0 }}>
              The American Dream was built by workers with calloused hands — and this administration will honor that legacy. God bless you, God bless our troops, and God bless the United States of America.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: RED, padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(22px, 4vw, 36px)", fontWeight: "800", fontFamily: F, marginBottom: "2rem" }}>
          Ready to Help Build This Future?
        </h2>
        <Link href="/volunteer" className="btn-primary">Volunteer Today</Link>
      </section>

    </main>
  );
}
