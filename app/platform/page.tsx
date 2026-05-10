import Link from "next/link";

const PILLARS = [
  {
    title: "Economy & Jobs",
    summary:
      "Restore American manufacturing, cut taxes on working families, and build an economy where every worker can get ahead without government permission.",
    bullets: [
      "Permanent middle-class tax cut indexed to inflation — no family earning under $400,000 pays more",
      "Reshore critical supply chains in semiconductors, pharmaceuticals, and steel through targeted domestic investment incentives",
      "Cut 30% of federal regulations strangling Main Street businesses within the first 100 days in office",
      "Funded apprenticeship programs in every state, connecting employers directly with trained workers",
      "Zero capital-gains tax on investments held five or more years in domestic manufacturing",
      "Expand the Earned Income Tax Credit for two-parent working families raising children",
      "Renegotiate trade agreements that put American workers first, not multinational financial institutions",
    ],
  },
  {
    title: "National Security",
    summary:
      "Rebuild a peerless military, secure the border, and restore deterrence so that no adversary ever doubts the cost of challenging America.",
    bullets: [
      "Expand to a 350-ship Navy and grow the Air Force's fifth-generation fighter fleet within four years",
      "Complete the southern border barrier and implement a modernized, merit-based legal immigration system",
      "Crush fentanyl trafficking through enforcement partnerships with Mexico and Central American governments",
      "Restore NATO credibility and reaffirm Pacific security commitments with treaty allies",
      "Increase defense R&D by 25%, prioritizing hypersonics, cyber operations, and space warfare capabilities",
      "End open-ended nation-building missions abroad — refocus military power on direct American interests",
      "Modernize the nuclear triad to maintain strategic deterrence for the next generation of Americans",
    ],
  },
  {
    title: "Healthcare",
    summary:
      "Bring genuine market competition to healthcare, protect Americans with pre-existing conditions, and make prices transparent so patients can make real choices.",
    bullets: [
      "Mandate full price transparency at every hospital, pharmacy, and insurance provider — no exceptions",
      "Triple HSA contribution limits and make accounts fully transferable across employers and life changes",
      "Cap insulin at $35 per month and EpiPen prices at $50 for every American, not just select beneficiaries",
      "Reform VA healthcare through private-sector partnerships and strict appointment accountability standards",
      "Allow importation of FDA-equivalent prescription drugs from Canada, the UK, and Australia",
      "Protect pre-existing condition coverage while repealing costly mandates that drive up premiums for healthy workers",
      "Fund community health centers in rural hospital deserts where millions of Americans have no local care",
    ],
  },
  {
    title: "Rule of Law",
    summary:
      "Back our law enforcement, appoint constitutionalist judges, and guarantee equal justice under law — from the courthouse to the White House.",
    bullets: [
      "Federal grant program to recruit, retain, and train law enforcement officers in high-crime communities",
      "Reform federal judiciary scheduling to cut docket backlogs through senior-judge programs and streamlined procedures",
      "Establish independent DOJ oversight to end politically weaponized prosecutions from either party",
      "Protect every right in the Bill of Rights — including the Second Amendment — against executive overreach",
      "Reform civil asset forfeiture so that property cannot be seized without a criminal conviction",
      "Invest in mental health courts and drug diversion programs to address root causes driving recidivism",
      "Restore qualified immunity protections for officers acting in good faith while mandating enhanced training standards",
    ],
  },
  {
    title: "Education",
    summary:
      "Return power to parents, expand school choice, and invest in the skills and knowledge that lead to real jobs and civic participation.",
    bullets: [
      "Universal school choice through portable per-pupil funding — every child, regardless of zip code or income",
      "Replace ideologically driven curriculum with rigorous standards in reading, mathematics, and American civics",
      "Restore the U.S. citizenship test as a high school graduation requirement in all fifty states",
      "Expand accredited vocational and technical education programs in every public high school in America",
      "Cut K-12 administrative overhead by 20% and redirect those dollars directly into classrooms",
      "Incentivize states to offer year-round schooling options that work for single-parent and dual-income families",
      "Replace open-ended federal student loan expansion with income-share agreements and vocational pathway grants",
    ],
  },
  {
    title: "Energy & Environment",
    summary:
      "Achieve full American energy dominance through an all-of-the-above approach — oil, gas, nuclear, and homegrown innovation — and stop depending on adversaries for the power that runs our lives.",
    bullets: [
      "Approve next-generation nuclear reactors and small modular reactors at commercial scale within four years",
      "Open responsible drilling on federal lands with strict environmental monitoring and mandatory reclamation bonds",
      "Modernize the national grid to eliminate rolling blackouts and end dependence on Chinese-manufactured components",
      "Fund a National Energy Prize to reward private-sector breakthroughs in storage, fusion, and carbon capture",
      "Withdraw from the Paris Climate Accord and negotiate direct bilateral agreements with the world's largest emitters",
      "Achieve full North American energy independence by 2030 through expanded production and infrastructure buildout",
      "Develop domestic rare earth mining capacity to eliminate dependence on Chinese supply chains for critical minerals",
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
