"use client";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main style={{ fontFamily: "'Georgia', serif", background: "#fff", color: "#111" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#B22234", borderBottom: "4px solid #3C3B6E",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem", height: "64px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: 40, height: 40, background: "#fff", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "bold", color: "#B22234", fontSize: "14px"
          }}>S·C</div>
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: "18px", letterSpacing: "0.5px" }}>
            Shumard / Centlivre 2028
          </span>
        </div>

        {/* Desktop nav links */}
        <div style={{ display: "flex", gap: "2rem" }} className="desktop-nav">
          {["about", "platform", "meet-the-team", "volunteer"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: "none", border: "none", color: "#fff",
              fontSize: "15px", cursor: "pointer", fontFamily: "Georgia, serif",
              textTransform: "capitalize", letterSpacing: "0.5px",
              padding: "4px 0", borderBottom: "2px solid transparent",
            }}
              onMouseEnter={e => (e.currentTarget.style.borderBottom = "2px solid #fff")}
              onMouseLeave={e => (e.currentTarget.style.borderBottom = "2px solid transparent")}
            >
              {id.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "none", color: "#fff", fontSize: "28px",
          cursor: "pointer", display: "none"
        }} className="hamburger">☰</button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "64px", left: 0, right: 0, zIndex: 99,
          background: "#B22234", padding: "1rem 2rem", display: "flex",
          flexDirection: "column", gap: "1rem"
        }}>
          {["about", "platform", "meet-the-team", "volunteer"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: "none", border: "none", color: "#fff",
              fontSize: "18px", cursor: "pointer", textAlign: "left",
              fontFamily: "Georgia, serif", textTransform: "capitalize"
            }}>{id.replace("-", " ")}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section style={{
        minHeight: "100vh", paddingTop: "64px",
        background: "linear-gradient(160deg, #3C3B6E 0%, #B22234 60%, #8B0000 100%)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center", padding: "80px 2rem 60px",
        position: "relative", overflow: "hidden"
      }}>
        {/* Star pattern overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.05,
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            color: "#FFD700", fontSize: "14px", letterSpacing: "4px",
            textTransform: "uppercase", marginBottom: "1.5rem", fontFamily: "Georgia, serif"
          }}>A New Vision for America</p>

          <h1 style={{
            fontSize: "clamp(48px, 8vw, 96px)", fontWeight: "bold",
            color: "#fff", lineHeight: 1.05, marginBottom: "0.5rem",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)"
          }}>
            SHUMARD
          </h1>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 48px)", fontWeight: "normal",
            color: "#FFD700", letterSpacing: "6px", marginBottom: "1.5rem"
          }}>
            CENTLIVRE
          </h2>
          <p style={{
            fontSize: "clamp(18px, 2.5vw, 26px)", color: "rgba(255,255,255,0.9)",
            fontStyle: "italic", maxWidth: "600px", margin: "0 auto 3rem"
          }}>
            "Strength, Integrity, and a Future We Build Together"
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("volunteer")} style={{
              background: "#FFD700", color: "#111", border: "none",
              padding: "16px 40px", fontSize: "17px", fontWeight: "bold",
              cursor: "pointer", borderRadius: "4px", letterSpacing: "1px",
              fontFamily: "Georgia, serif", transition: "transform 0.15s"
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              JOIN OUR CAMPAIGN
            </button>
            <button onClick={() => scrollTo("platform")} style={{
              background: "transparent", color: "#fff",
              border: "2px solid rgba(255,255,255,0.7)",
              padding: "16px 40px", fontSize: "17px", cursor: "pointer",
              borderRadius: "4px", letterSpacing: "1px", fontFamily: "Georgia, serif"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              OUR PLATFORM
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.5)", fontSize: "13px", letterSpacing: "2px",
          textTransform: "uppercase"
        }}>
          ↓ Scroll
        </div>
      </section>

      {/* QUOTE BANNER */}
      <section style={{
        background: "#3C3B6E", padding: "2.5rem 2rem", textAlign: "center"
      }}>
        <p style={{
          color: "#fff", fontSize: "clamp(16px, 2.5vw, 22px)",
          fontStyle: "italic", maxWidth: "800px", margin: "0 auto",
          lineHeight: 1.6
        }}>
          "America's greatest days are not behind us — they are ahead of us, if we are bold enough to reach for them."
        </p>
        <p style={{ color: "#FFD700", marginTop: "1rem", letterSpacing: "2px", fontSize: "13px" }}>
          — CAL SHUMARD
        </p>
      </section>

      {/* ABOUT */}
      <section id="about" style={{
        padding: "80px 2rem", maxWidth: "900px", margin: "0 auto"
      }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#B22234", letterSpacing: "3px", fontSize: "13px", textTransform: "uppercase" }}>Our Story</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#3C3B6E", marginTop: "0.5rem" }}>
            Why We're Running
          </h2>
          <div style={{ width: "60px", height: "4px", background: "#B22234", margin: "1rem auto 0" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          <div style={{
            background: "#f9f9f9", borderLeft: "5px solid #B22234",
            padding: "2rem", borderRadius: "0 8px 8px 0"
          }}>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#333" }}>
              America stands at a crossroads. Families are struggling, trust in institutions is at a low, and the political establishment has failed to deliver. We believe the American people deserve leaders who work for them — not for special interests or party bosses.
            </p>
          </div>
          <div style={{
            background: "#f9f9f9", borderLeft: "5px solid #3C3B6E",
            padding: "2rem", borderRadius: "0 8px 8px 0"
          }}>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#333" }}>
              Cal Shumard and Henry Centlivre are running because they believe in a government that is honest, effective, and accountable. Their campaign is about restoring the promise of America — one family, one community, one state at a time.
            </p>
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section id="platform" style={{
        background: "#f4f4f8", padding: "80px 2rem"
      }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ color: "#B22234", letterSpacing: "3px", fontSize: "13px", textTransform: "uppercase" }}>What We Stand For</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#3C3B6E", marginTop: "0.5rem" }}>
              Our Platform
            </h2>
            <div style={{ width: "60px", height: "4px", background: "#B22234", margin: "1rem auto 0" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🏭", title: "Economy & Jobs", desc: "Cut taxes for working families, bring manufacturing back to American soil, and invest in small business growth." },
              { icon: "🛡️", title: "National Security", desc: "Rebuild our military, secure our borders, and restore America's standing on the world stage." },
              { icon: "🏥", title: "Healthcare", desc: "Lower costs through free market competition, protect coverage for pre-existing conditions, and reduce prescription drug prices." },
              { icon: "⚖️", title: "Rule of Law", desc: "Support law enforcement, appoint constitutionalist judges, and ensure equal justice under law for every American." },
              { icon: "🎓", title: "Education", desc: "Return control to parents and local communities, expand school choice, and invest in vocational training." },
              { icon: "⚡", title: "Energy", desc: "Achieve American energy dominance, lower gas prices, and pursue innovation-led environmental solutions." },
            ].map((item) => (
              <div key={item.title} style={{
                background: "#fff", border: "1px solid #e0e0e0",
                borderRadius: "8px", padding: "2rem",
                borderTop: "4px solid #B22234",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "1rem" }}>{item.icon}</div>
                <h3 style={{ color: "#3C3B6E", fontSize: "20px", marginBottom: "0.75rem" }}>{item.title}</h3>
                <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section id="meet-the-team" style={{
        padding: "80px 2rem", maxWidth: "900px", margin: "0 auto", textAlign: "center"
      }}>
        <p style={{ color: "#B22234", letterSpacing: "3px", fontSize: "13px", textTransform: "uppercase" }}>The Ticket</p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#3C3B6E", marginTop: "0.5rem" }}>
          Meet the Candidates
        </h2>
        <div style={{ width: "60px", height: "4px", background: "#B22234", margin: "1rem auto 2.5rem" }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {[
            {
              name: "Cal Shumard",
              role: "Candidate for President",
              accent: "#B22234",
              initials: "CS",
              bio: "Cal Shumard is a proven leader with a vision for a stronger, more prosperous America. His commitment to conservative values and common-sense governance has earned him the trust of people across the country."
            },
            {
              name: "Henry Centlivre",
              role: "Candidate for Vice President",
              accent: "#3C3B6E",
              initials: "HC",
              bio: "Henry Centlivre brings a background in finance and a deep commitment to fiscal responsibility. His sharp analytical mind and dedication to service make him the ideal partner to lead this nation forward."
            }
          ].map((person) => (
            <div key={person.name} style={{
              background: "#fff", border: "1px solid #e0e0e0",
              borderRadius: "12px", padding: "2.5rem 2rem", textAlign: "center"
            }}>
              <div style={{
                width: "90px", height: "90px", borderRadius: "50%",
                background: person.accent, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "28px", fontWeight: "bold", margin: "0 auto 1.5rem",
                border: "4px solid #FFD700"
              }}>
                {person.initials}
              </div>
              <h3 style={{ fontSize: "24px", color: "#111", marginBottom: "0.25rem" }}>{person.name}</h3>
              <p style={{
                color: person.accent, fontSize: "13px", letterSpacing: "2px",
                textTransform: "uppercase", marginBottom: "1rem"
              }}>{person.role}</p>
              <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.7 }}>{person.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VOLUNTEER / CONTACT */}
      <section id="volunteer" style={{
        background: "#3C3B6E", padding: "80px 2rem"
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#FFD700", letterSpacing: "3px", fontSize: "13px", textTransform: "uppercase" }}>Get Involved</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#fff", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            Join the Movement
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2.5rem", fontSize: "15px" }}>
            Sign up to volunteer, get campaign updates, or show your support.
          </p>

          {submitted ? (
            <div style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "8px", padding: "3rem", color: "#FFD700", fontSize: "20px"
            }}>
              🇺🇸 Thank you! We'll be in touch soon.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{
                  padding: "14px 16px", fontSize: "15px", borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)",
                  color: "#fff", fontFamily: "Georgia, serif", outline: "none"
                }}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{
                  padding: "14px 16px", fontSize: "15px", borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)",
                  color: "#fff", fontFamily: "Georgia, serif", outline: "none"
                }}
              />
              <textarea
                placeholder="Why do you want to get involved? (optional)"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                style={{
                  padding: "14px 16px", fontSize: "15px", borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)",
                  color: "#fff", fontFamily: "Georgia, serif", resize: "vertical", outline: "none"
                }}
              />
              <button onClick={handleSubmit} style={{
                background: "#B22234", color: "#fff", border: "none",
                padding: "16px", fontSize: "17px", fontWeight: "bold",
                cursor: "pointer", borderRadius: "6px", letterSpacing: "1px",
                fontFamily: "Georgia, serif", marginTop: "0.5rem",
                transition: "background 0.2s"
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#8B0000")}
                onMouseLeave={e => (e.currentTarget.style.background = "#B22234")}
              >
                SIGN ME UP
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "#111", color: "rgba(255,255,255,0.5)",
        textAlign: "center", padding: "2rem",
        fontSize: "13px", letterSpacing: "1px"
      }}>
        <p style={{ color: "#FFD700", fontWeight: "bold", marginBottom: "0.5rem" }}>
          SHUMARD / CENTLIVRE 2028
        </p>
        <p>Paid for by the Shumard-Centlivre Campaign Committee · Built with pride in America</p>
      </footer>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </main>
  );
}
