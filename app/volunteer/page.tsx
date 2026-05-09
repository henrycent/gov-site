"use client";
import { useState } from "react";

export default function VolunteerPage() {
  const [data, setData] = useState({
    name: "", email: "", zip: "", reason: "",
    interests: { volunteer: true, donate: false, sign: false, host: false },
  });
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <main
      style={{
        minHeight: "calc(100vh - 70px)",
        background:
          "radial-gradient(ellipse at 100% 0%, #1d3893 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, #b22234 0%, transparent 50%), linear-gradient(160deg, #050d2d 0%, #0a2463 100%)",
        position: "relative",
        overflow: "hidden",
        color: "#fff",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <section style={{ position: "relative", padding: "140px 1.5rem 96px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 56,
            alignItems: "start",
          }}
        >
          <div>
            <p style={{ color: "#f5c518", letterSpacing: 5, fontSize: 12, fontWeight: 700, margin: 0, textTransform: "uppercase" }}>
              Get Involved
            </p>
            <h1
              className="serif"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", margin: "12px 0 18px", letterSpacing: -1, lineHeight: 1 }}
            >
              Join the movement.
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
              Whether you have ten minutes or ten hours, there’s a place for you on this campaign. Sign up below — a member of our team will reach out within 48 hours.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["🗳️", "Knock doors in your neighborhood"],
                ["📞", "Make calls to undecided voters"],
                ["🏠", "Host a small house party"],
                ["📬", "Write postcards to voters"],
                ["✍️", "Pen letters to your local paper"],
              ].map(([icon, text]) => (
                <li key={text} style={{ display: "flex", alignItems: "center", gap: 14, color: "rgba(255,255,255,0.85)" }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <span style={{ fontSize: 15 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(245,197,24,0.4)",
              borderRadius: 14,
              padding: "clamp(24px, 4vw, 40px)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            {done ? (
              <div style={{ textAlign: "center", padding: "32px 8px" }}>
                <div style={{ fontSize: 64 }}>🇺🇸</div>
                <h2 className="serif" style={{ color: "#f5c518", fontSize: 32, margin: "18px 0 10px" }}>
                  Welcome aboard.
                </h2>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.7 }}>
                  Thank you for stepping up. Watch your inbox — we’ll be in touch with next steps within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Field label="Full Name">
                  <input
                    required
                    type="text"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    style={inputStyle}
                  />
                </Field>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="ZIP">
                    <input
                      type="text"
                      value={data.zip}
                      onChange={(e) => setData({ ...data, zip: e.target.value })}
                      style={inputStyle}
                      maxLength={5}
                    />
                  </Field>
                </div>

                <Field label="How do you want to help? (pick all that apply)">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {([
                      ["volunteer", "Volunteer"],
                      ["donate", "Donate"],
                      ["sign", "Yard sign"],
                      ["host", "Host event"],
                    ] as const).map(([key, label]) => (
                      <label
                        key={key}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "12px 14px", borderRadius: 8, cursor: "pointer",
                          background: data.interests[key] ? "rgba(245,197,24,0.18)" : "rgba(255,255,255,0.04)",
                          border: data.interests[key] ? "1px solid #f5c518" : "1px solid rgba(255,255,255,0.15)",
                          fontSize: 14,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={data.interests[key]}
                          onChange={(e) =>
                            setData({
                              ...data,
                              interests: { ...data.interests, [key]: e.target.checked },
                            })
                          }
                          style={{ accentColor: "#f5c518" }}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </Field>

                <Field label="Why do you want to get involved? (optional)">
                  <textarea
                    rows={3}
                    value={data.reason}
                    onChange={(e) => setData({ ...data, reason: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </Field>

                <button type="submit" className="btn-primary" style={{ marginTop: 8, justifyContent: "center" }}>
                  Sign Me Up
                </button>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", textAlign: "center", margin: 0 }}>
                  By submitting, you agree to receive periodic email updates. We never sell your information.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: 8,
  color: "#fff",
  fontSize: 15,
  fontFamily: "inherit",
  outline: "none",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", color: "#f5c518", fontSize: 11, letterSpacing: 2, marginBottom: 6, textTransform: "uppercase", fontWeight: 700 }}>
        {label}
      </span>
      {children}
    </label>
  );
}
