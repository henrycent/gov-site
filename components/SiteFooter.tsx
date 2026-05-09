import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer style={{
      background: "linear-gradient(180deg, #050d2d 0%, #000 100%)",
      color: "rgba(255,255,255,0.7)",
      paddingTop: 64,
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="stripe-divider" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 40, marginBottom: 48,
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 14, letterSpacing: 1,
            }}>
              SHUMARD <span style={{ color: "#f5c518" }}>/</span> CENTLIVRE
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: 0 }}>
              An American campaign for a stronger, freer, more prosperous nation. Built by citizens, for citizens.
            </p>
          </div>

          <div>
            <h4 style={{ color: "#f5c518", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Campaign</h4>
            <FooterLinks links={[["/platform", "Our Platform"], ["/team", "The Ticket"], ["/map", "2024 Map"], ["/news", "News"]]} />
          </div>

          <div>
            <h4 style={{ color: "#f5c518", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Get Involved</h4>
            <FooterLinks links={[["/volunteer", "Volunteer"], ["/volunteer", "Donate"], ["/volunteer", "Yard Sign"]]} />
          </div>

          <div>
            <h4 style={{ color: "#f5c518", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Contact</h4>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", margin: 0 }}>
              Shumard / Centlivre HQ<br />
              1776 Liberty Lane<br />
              Washington, DC 20500
            </p>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 24, paddingBottom: 24,
          display: "flex", flexWrap: "wrap", gap: 16,
          justifyContent: "space-between", alignItems: "center",
          fontSize: 12, color: "rgba(255,255,255,0.4)",
        }}>
          <p style={{ margin: 0 }}>
            © 2028 Shumard-Centlivre Campaign Committee. Paid for and authorized.
          </p>
          <p style={{ margin: 0, letterSpacing: 2 }}>★ E PLURIBUS UNUM ★</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ links }: { links: [string, string][] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
      {links.map(([href, label], i) => (
        <li key={i}>
          <Link href={href} className="footer-link">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
