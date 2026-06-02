import { useState, useRef, useEffect, useCallback } from "react";

const SKILLS_TAGS = ["Brand Identity", "Motion Design", "Generative UI", "Liquid Aesthetics"];

const SKILL_CATEGORIES = [
  {
    title: "Digital Identity",
    items: ["Brand Strategy & Visual Identity", "Liquid Typography & Morphing Logos", "Generative Identity Systems"],
  },
  {
    title: "Motion & Immersion",
    items: ["Cinema 4D / Houdini", "After Effects & Rive", "Interactive WebGL (Three.js)"],
  },
  {
    title: "Code & Tools",
    items: ["HTML/CSS/JS (Creative Dev)", "Framer, Webflow, GSAP", "TouchDesigner, Figma"],
  },
];

const EXTRA_TAGS = ["Art Direction", "AI + Creative Coding", "Sound Design Integration", "Experimental Publishing"];

// ── helpers ───────────────────────────────────────────────────────────────────

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ── sub-components ────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav style={navStyle}>
      <div style={navContainerStyle}>
        <a
          href="#"
          style={logoStyle}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          ✦ Kaelen Vance
        </a>
        <ul style={navLinksStyle}>
          {["home", "about", "skills-section", "contact"].map((id) => (
            <li key={id} style={{ listStyle: "none" }}>
              <NavLink id={id} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function NavLink({ id }) {
  const [hovered, setHovered] = useState(false);
  const label = id === "skills-section" ? "Skills" : id.charAt(0).toUpperCase() + id.slice(1);
  return (
    <a
      href={`#${id}`}
      style={{
        ...navLinkBaseStyle,
        color: hovered ? "#ffffff" : "#e2eaff",
        borderBottom: hovered ? "1px solid #5f7eff" : "1px solid transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => { e.preventDefault(); smoothScrollTo(id); }}
    >
      {label}
    </a>
  );
}

function LiquidMaskCard() {
  const cardRef = useRef(null);
  const backRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const updateOrigin = useCallback((x, y) => {
    if (backRef.current) {
      backRef.current.style.setProperty("--x", `${x}%`);
      backRef.current.style.setProperty("--y", `${y}%`);
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const relY = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    updateOrigin(relX * 100, relY * 100);
    const shiftX = (relX - 0.5) * 6;
    const shiftY = (relY - 0.5) * 4;
    cardRef.current.style.transform = `translate(${shiftX}px, ${shiftY}px) scale(1.02)`;
  }, [updateOrigin]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    if (cardRef.current) cardRef.current.style.transform = "translate(0,0) scale(1)";
    updateOrigin(50, 50);
  }, [updateOrigin]);

  useEffect(() => { updateOrigin(50, 50); }, [updateOrigin]);

  const clipPath = hovered
    ? "circle(75% at var(--x, 50%) var(--y, 50%))"
    : "circle(0% at var(--x, 50%) var(--y, 50%))";

  return (
    <div style={liquidMaskAreaStyle}>
      <div style={{ width: "100%", maxWidth: 520, margin: "0 auto" }}>
        <div
          ref={cardRef}
          style={maskCardStyle}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Front: gradient placeholder styled as an abstract portrait */}
          <div style={frontImgStyle} />
          {/* Back: contrasting gradient revealed by liquid mask */}
          <div
            ref={backRef}
            style={{
              ...backImgStyle,
              clipPath,
              transition: hovered
                ? "clip-path 0.42s cubic-bezier(0.2,0.95,0.4,1.05)"
                : "clip-path 0.48s cubic-bezier(0.34,1.2,0.55,1)",
            }}
          />
          <div style={grainOverlayStyle} />
        </div>
      </div>
    </div>
  );
}

function SkillTag({ label, style: extraStyle }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      style={{
        ...skillTagBase,
        ...(hovered ? skillTagHover : {}),
        ...extraStyle,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </span>
  );
}

function PrimaryBtn({ children, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{ ...btnPrimary, ...(hovered ? btnPrimaryHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function OutlineBtn({ children, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{ ...btnOutline, ...(hovered ? btnOutlineHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function SkillCategoryCard({ title, items }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...skillCatBase,
        ...(hovered ? skillCatHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 style={{ fontSize: "1.4rem", fontWeight: 500, marginBottom: "1.2rem", color: "#d1ddff" }}>{title}</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li key={item} style={skillCatLiStyle}>
            <span style={{ color: "#5f7eff", fontSize: "0.7rem" }}>✦</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({ name: "", email: "", message: "" }); }, 3000);
  };

  return (
    <div style={contactFormStyle}>
      {submitted ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#cbd5ff" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📩</div>
          <p>Thanks! Kaelen will reach out within 48 hours. Creative vibrations.</p>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: "1.2rem" }}>
            <input
              type="text"
              placeholder="Full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = "#5f7eff"; e.target.style.background = "rgba(0,0,0,0.6)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.background = "rgba(0,0,0,0.45)"; }}
            />
          </div>
          <div style={{ marginBottom: "1.2rem" }}>
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = "#5f7eff"; e.target.style.background = "rgba(0,0,0,0.6)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.background = "rgba(0,0,0,0.45)"; }}
            />
          </div>
          <div style={{ marginBottom: "1.2rem" }}>
            <textarea
              rows={3}
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) => { e.target.style.borderColor = "#5f7eff"; e.target.style.background = "rgba(0,0,0,0.6)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.background = "rgba(0,0,0,0.45)"; }}
            />
          </div>
          <SubmitBtn onClick={handleSubmit}>Send message</SubmitBtn>
        </div>
      )}
    </div>
  );
}

function SubmitBtn({ children, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{ ...submitBtnBase, ...(hovered ? submitBtnHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function KaelenVance() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#05070c", color: "#edeff5", overflowX: "hidden" }}>
      <style>{globalCSS}</style>

      <Nav />

      {/* HOME */}
      <section id="home" style={heroStyle}>
        <div style={heroBeforeStyle} />
        <div style={containerSplitStyle}>
          {/* LEFT */}
          <div style={introAreaStyle}>
            <div style={introLabelStyle}>✦ DESIGNER &amp; ART DIRECTOR</div>
            <h1 style={introNameStyle}>Kaelen Vance</h1>
            <div style={introTitleStyle}>Crafting fluid identities, digital morphologies</div>
            <p style={introDescStyle}>
              Multidisciplinary designer focused on immersive brand experiences,
              liquid typography, and interactive narratives. Pushing boundaries
              between the organic and the digital.
            </p>
            <div style={skillTagsRowStyle}>
              {SKILLS_TAGS.map((tag) => <SkillTag key={tag} label={tag} />)}
            </div>
            <div style={ctaGroupStyle}>
              <PrimaryBtn onClick={() => alert("✨ Explore fluid projects: immersive brand & motion design.")}>
                Explore work →
              </PrimaryBtn>
              <OutlineBtn onClick={() => smoothScrollTo("contact")}>Contact</OutlineBtn>
            </div>
          </div>

          {/* RIGHT */}
          <LiquidMaskCard />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={sectionStyle}>
        <div style={sectionContainerStyle}>
          <h2 style={sectionTitleStyle}>/ About the studio</h2>
          <div style={aboutGridStyle}>
            <div style={aboutTextStyle}>
              <p style={{ marginBottom: "1.4rem" }}>
                Kaelen Vance is a multidisciplinary designer and art director based between Berlin and NYC. With over 8 years of experience crafting fluid identities for emerging tech, fashion, and cultural institutions, his practice blends parametric design, organic motion, and narrative-driven visuals.
              </p>
              <p>
                His work has been featured in It's Nice That, Awwwards, and The Design Kids. Kaelen believes that interaction should feel like a living organism—responsive, tactile, and poetic. The liquid mask concept embodies his philosophy: transformation as an aesthetic language.
              </p>
            </div>
            <div style={aboutQuoteStyle}>
              <i style={{ fontSize: "1.1rem", fontWeight: 400, color: "#eef3ff", display: "block", marginBottom: "1rem" }}>
                "I design for the space where code meets intuition. Every project is an ecosystem of motion, light, and identity."
              </i>
              <p style={{ marginTop: "1rem" }}>— Kaelen Vance, 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills-section" style={sectionStyle}>
        <div style={sectionContainerStyle}>
          <h2 style={sectionTitleStyle}>/ Core competencies</h2>
          <div style={skillsExpandedStyle}>
            {SKILL_CATEGORIES.map((cat) => <SkillCategoryCard key={cat.title} {...cat} />)}
          </div>
          <div style={{ marginTop: "2.2rem", display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center" }}>
            {EXTRA_TAGS.map((tag) => <SkillTag key={tag} label={tag} />)}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={sectionStyle}>
        <div style={sectionContainerStyle}>
          <h2 style={sectionTitleStyle}>/ Let's connect</h2>
          <div style={contactWrapperStyle}>
            <div style={{ flex: 1 }}>
              <p style={contactRowStyle}>📍 Studio: Berlin / NYC (remote worldwide)</p>
              <p style={contactRowStyle}>📧 <a href="mailto:kaelen@studioflux.com" style={contactLinkStyle}>kaelen@studioflux.com</a></p>
              <p style={contactRowStyle}>📱 +49 176 20394821</p>
              <p style={contactRowStyle}>
                🌐{" "}
                <a href="#" style={contactLinkStyle}>instagram.com/kaelen.vance</a>
                {" / "}
                <a href="#" style={contactLinkStyle}>are.na/kaelen</a>
              </p>
              <p style={{ ...contactRowStyle, marginTop: "1.5rem" }}>
                ✨ Open for select collaborations, talks, and immersive commissions. Let's make something fluid.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <PrimaryBtn onClick={() => smoothScrollTo("contact")}>Send an inquiry →</PrimaryBtn>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer style={footerStyle}>
        LIQUID MASK HOVER — designed by Kaelen Vance • immersive interaction
      </footer>

      {/* SVG filter */}
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="liquidGrain" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.042" numOctaves="3" result="noise" seed="4" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="0.35" result="blurredEdge" />
            <feComposite in="blurredEdge" in2="SourceGraphic" operator="over" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

// ── styles ────────────────────────────────────────────────────────────────────

const globalCSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: #05070c; }
  @media (max-width: 860px) {
    .container-split { flex-direction: column-reverse !important; text-align: center; }
    .intro-area { align-items: center !important; }
    .skill-tags-row { justify-content: center !important; }
    .cta-group { justify-content: center !important; }
    .about-grid { flex-direction: column !important; }
    .contact-wrapper { flex-direction: column !important; }
    .section-title { text-align: center; border-left: none !important; padding-left: 0 !important; }
  }
`;

const navStyle = {
  position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
  background: "rgba(5,7,12,0.75)", backdropFilter: "blur(12px)",
  borderBottom: "0.5px solid rgba(255,255,255,0.08)",
  padding: "0.9rem 2rem", transition: "all 0.3s ease",
};

const navContainerStyle = {
  maxWidth: 1400, margin: "0 auto", display: "flex",
  justifyContent: "space-between", alignItems: "center",
  flexWrap: "wrap", gap: "1rem",
};

const logoStyle = {
  fontWeight: 700, fontSize: "1.45rem", letterSpacing: "-0.02em",
  background: "linear-gradient(120deg,#FFFFFF,#9bb6ff)",
  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
  textDecoration: "none", fontFamily: "monospace",
};

const navLinksStyle = { display: "flex", gap: "2rem", listStyle: "none", flexWrap: "wrap" };

const navLinkBaseStyle = {
  textDecoration: "none", fontWeight: 500, fontSize: "0.9rem",
  letterSpacing: "0.3px", transition: "0.2s", padding: "0.3rem 0",
};

const heroStyle = {
  minHeight: "100vh", width: "100%", display: "flex", alignItems: "center",
  justifyContent: "center", padding: "6rem 5% 3rem",
  background: "radial-gradient(ellipse at 70% 30%,#0c0f18,#020406)",
  position: "relative", isolation: "isolate",
};

const heroBeforeStyle = {
  content: '""', position: "absolute", inset: 0,
  backgroundImage: "radial-gradient(rgba(255,255,240,0.02) 1px, transparent 1px)",
  backgroundSize: "36px 36px", pointerEvents: "none", zIndex: 0,
};

const containerSplitStyle = {
  maxWidth: 1400, width: "100%", display: "flex", flexWrap: "wrap",
  alignItems: "center", justifyContent: "space-between", gap: "3rem",
  position: "relative", zIndex: 2,
};

const introAreaStyle = {
  flex: "1.1", minWidth: 280, backdropFilter: "blur(2px)",
  display: "flex", flexDirection: "column",
};

const introLabelStyle = {
  display: "inline-block", background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(5px)", border: "0.5px solid rgba(255,255,255,0.15)",
  borderRadius: 80, padding: "0.35rem 1rem", fontSize: "0.75rem",
  fontWeight: 500, letterSpacing: "0.3px", textTransform: "uppercase",
  color: "#cbd5ff", marginBottom: "1.5rem", fontFamily: "monospace",
  alignSelf: "flex-start",
};

const introNameStyle = {
  fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 700, lineHeight: 1.1,
  letterSpacing: "-0.02em",
  background: "linear-gradient(135deg,#FFFFFF 30%,#9bb6ff 80%)",
  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
  marginBottom: "0.75rem",
};

const introTitleStyle = {
  fontSize: "1.2rem", fontWeight: 450, color: "#a6b3e0",
  borderLeft: "3px solid #5f7eff", paddingLeft: "1rem", marginBottom: "1.5rem",
};

const introDescStyle = {
  fontSize: "1rem", lineHeight: 1.6, color: "#ccd6f6",
  maxWidth: 500, marginBottom: "2rem", fontWeight: 350,
};

const skillTagsRowStyle = {
  display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2rem",
};

const ctaGroupStyle = { display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "0.5rem" };

const skillTagBase = {
  background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.2)",
  borderRadius: 40, padding: "0.3rem 1rem", fontSize: "0.75rem",
  fontWeight: 450, color: "#d6e0ff", transition: "all 0.2s ease", cursor: "default",
};

const skillTagHover = {
  background: "rgba(95,126,255,0.2)", borderColor: "#5f7eff",
};

const btnPrimary = {
  background: "rgba(95,126,255,0.9)", border: "none", padding: "0.7rem 1.5rem",
  borderRadius: 40, fontWeight: 600, fontSize: "0.85rem", color: "white",
  cursor: "pointer", transition: "0.25s ease", backdropFilter: "blur(4px)",
  fontFamily: "inherit",
};

const btnPrimaryHover = {
  background: "#5f7eff", transform: "scale(1.02)",
  boxShadow: "0 6px 14px rgba(95,126,255,0.25)",
};

const btnOutline = {
  background: "transparent", border: "1px solid rgba(255,255,255,0.35)",
  padding: "0.7rem 1.5rem", borderRadius: 40, fontWeight: 500,
  fontSize: "0.85rem", color: "#eef3ff", transition: "0.2s", cursor: "pointer",
  fontFamily: "inherit",
};

const btnOutlineHover = { borderColor: "#5f7eff", background: "rgba(95,126,255,0.1)" };

// liquid mask card
const liquidMaskAreaStyle = {
  flex: 1, minWidth: 320, display: "flex", justifyContent: "center", alignItems: "center",
  perspective: 900,
};

const maskCardStyle = {
  position: "relative", width: "100%", aspectRatio: "4/4.2",
  borderRadius: "2rem", overflow: "hidden", cursor: "pointer",
  boxShadow: "0 30px 45px -12px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.1)",
  transition: "transform 0.4s cubic-bezier(0.2,0.9,0.4,1.1),box-shadow 0.3s ease",
  filter: "url(#liquidGrain)", willChange: "transform",
};

const frontImgStyle = {
  position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
  zIndex: 2,
  background: "linear-gradient(135deg,#0d1123 0%,#1a2040 40%,#0c2245 70%,#060d1a 100%)",
};

const backImgStyle = {
  position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
  zIndex: 3, willChange: "clip-path",
  background: "linear-gradient(135deg,#2a1060 0%,#5f2eff 35%,#9b3fff 65%,#ff6ec7 100%)",
};

const grainOverlayStyle = {
  position: "absolute", inset: 0,
  backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"1\" stitchTiles=\"stitch\"/><feColorMatrix type=\"matrix\" values=\"1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.08 0\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noise)\" opacity=\"0.35\"/></svg>')",
  backgroundRepeat: "repeat", opacity: 0.2, pointerEvents: "none", zIndex: 4,
  mixBlendMode: "overlay", borderRadius: "inherit",
};

// sections
const sectionStyle = {
  padding: "5rem 5% 6rem", position: "relative",
  borderTop: "1px solid rgba(255,255,255,0.03)",
};

const sectionContainerStyle = { maxWidth: 1200, margin: "0 auto" };

const sectionTitleStyle = {
  fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 600, letterSpacing: "-0.02em",
  background: "linear-gradient(145deg,#fff,#b7c5ff)",
  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
  marginBottom: "2rem", borderLeft: "4px solid #5f7eff", paddingLeft: "1.2rem",
};

const aboutGridStyle = { display: "flex", flexWrap: "wrap", gap: "3rem", alignItems: "flex-start" };

const aboutTextStyle = { flex: "1.5", fontSize: "1.05rem", lineHeight: 1.65, color: "#cdd9ff" };

const aboutQuoteStyle = {
  flex: 1, background: "rgba(95,126,255,0.08)", borderRadius: "1.8rem",
  padding: "2rem", border: "0.5px solid rgba(95,126,255,0.3)", backdropFilter: "blur(4px)",
};

const skillsExpandedStyle = { display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-between" };

const skillCatBase = {
  flex: 1, minWidth: 200, background: "rgba(12,15,24,0.7)", backdropFilter: "blur(5px)",
  borderRadius: "1.6rem", padding: "1.6rem", border: "0.5px solid rgba(255,255,255,0.05)",
  transition: "transform 0.2s, background 0.2s, border-color 0.2s",
};

const skillCatHover = {
  transform: "translateY(-6px)", background: "rgba(20,25,40,0.8)",
  borderColor: "rgba(95,126,255,0.4)",
};

const skillCatLiStyle = {
  marginBottom: "0.7rem", fontSize: "0.9rem", color: "#a9b8e0",
  display: "flex", alignItems: "center", gap: "0.5rem",
};

// contact
const contactWrapperStyle = { display: "flex", flexWrap: "wrap", gap: "3rem", alignItems: "center" };

const contactRowStyle = {
  margin: "1.2rem 0", display: "flex", alignItems: "center", gap: "1rem", fontSize: "1rem",
};

const contactLinkStyle = { color: "#cbd5ff", textDecoration: "none", borderBottom: "1px dotted #5f7eff" };

const contactFormStyle = {
  flex: 1, background: "rgba(8,10,20,0.6)", backdropFilter: "blur(8px)",
  padding: "2rem", borderRadius: "2rem", border: "0.5px solid rgba(255,255,255,0.1)",
};

const inputStyle = {
  width: "100%", background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.2)",
  padding: "0.9rem 1rem", borderRadius: "1.2rem", color: "white",
  fontFamily: "inherit", transition: "0.2s", outline: "none",
};

const submitBtnBase = {
  background: "#5f7eff", border: "none", padding: "0.8rem 1.8rem",
  borderRadius: "2rem", fontWeight: 600, color: "white", cursor: "pointer",
  transition: "0.2s", fontFamily: "inherit",
};

const submitBtnHover = { background: "#7f99ff", transform: "scale(1.01)" };

const footerStyle = {
  textAlign: "center", padding: "2rem 1rem 1.5rem", fontSize: "0.7rem",
  color: "#5f6a8a", background: "#020407", borderTop: "0.5px solid rgba(255,255,255,0.05)",
};