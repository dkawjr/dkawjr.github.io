<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>D.K. Adrian Williams Jr. | MD-PhD Candidate & Future Physician-Scientist</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg: #0a0a0c;
  --bg-elevated: #111115;
  --bg-card: #16161b;
  --text: #e8e6e1;
  --text-dim: #8a8880;
  --text-muted: #5a5850;
  --accent: #c9a84c;
  --accent-glow: #c9a84c33;
  --accent-bright: #e0c166;
  --border: #2a2a30;
  --serif: 'Cormorant Garamond', Georgia, serif;
  --sans: 'DM Sans', -apple-system, sans-serif;
  --mono: 'JetBrains Mono', monospace;
}

html { scroll-behavior: smooth; font-size: 16px; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  line-height: 1.7;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::selection { background: var(--accent); color: var(--bg); }

/* ── Grain Overlay ── */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
}

/* ── Navigation ── */
nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 1.25rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(20px);
  background: rgba(10,10,12,0.7);
  border-bottom: 1px solid transparent;
  transition: border-color 0.4s;
}

nav.scrolled { border-bottom-color: var(--border); }

.nav-logo {
  font-family: var(--serif);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
  letter-spacing: 0.02em;
}

.nav-logo span { color: var(--accent); }

.nav-links { display: flex; gap: 2.5rem; align-items: center; }

.nav-links a {
  color: var(--text-dim);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color 0.3s;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 0.3s;
}

.nav-links a:hover { color: var(--text); }
.nav-links a:hover::after { width: 100%; }

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 5px;
}

.hamburger span {
  width: 24px;
  height: 1.5px;
  background: var(--text);
  transition: all 0.3s;
}

/* ── Hero ── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem 3rem 4rem;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 70% 20%, var(--accent-glow), transparent),
    radial-gradient(ellipse 40% 60% at 10% 80%, rgba(100,80,200,0.06), transparent);
}

.hero-content {
  max-width: 900px;
  position: relative;
  z-index: 1;
}

.hero-tag {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--accent);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeUp 0.8s ease forwards 0.2s;
}

.hero-name {
  font-family: var(--serif);
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 300;
  line-height: 1.08;
  margin-bottom: 1.8rem;
  opacity: 0;
  animation: fadeUp 0.8s ease forwards 0.4s;
}

.hero-name em {
  font-style: italic;
  color: var(--accent);
  font-weight: 400;
}

.hero-desc {
  font-size: 1.15rem;
  color: var(--text-dim);
  max-width: 620px;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: fadeUp 0.8s ease forwards 0.6s;
}

.hero-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeUp 0.8s ease forwards 0.8s;
}

.hero-links a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  transition: all 0.3s;
}

.btn-primary {
  background: var(--accent);
  color: var(--bg);
}

.btn-primary:hover {
  background: var(--accent-bright);
  box-shadow: 0 0 30px var(--accent-glow);
}

.btn-outline {
  border: 1px solid var(--border);
  color: var(--text-dim);
}

.btn-outline:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.hero-scroll {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0;
  animation: fadeUp 0.8s ease forwards 1.2s;
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  animation: scrollPulse 2s ease infinite;
}

/* ── Sections ── */
section {
  padding: 7rem 3rem;
  position: relative;
}

.section-header {
  margin-bottom: 4rem;
}

.section-label {
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--accent);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.section-title {
  font-family: var(--serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1.2;
}

.section-divider {
  width: 60px;
  height: 1px;
  background: var(--accent);
  margin-top: 1.5rem;
}

/* ── About ── */
#about { background: var(--bg-elevated); }

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1100px;
}

.about-text p {
  color: var(--text-dim);
  margin-bottom: 1.5rem;
  font-size: 1.02rem;
}

.about-text p:first-child::first-letter {
  font-family: var(--serif);
  font-size: 3.5rem;
  float: left;
  line-height: 1;
  margin-right: 0.5rem;
  color: var(--accent);
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.stat-card {
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 1.75rem;
  border-radius: 3px;
  transition: border-color 0.3s, transform 0.3s;
}

.stat-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.stat-number {
  font-family: var(--serif);
  font-size: 2.5rem;
  font-weight: 300;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* ── Research ── */
.research-areas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1100px;
}

.research-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 2.5rem 2rem;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s;
}

.research-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), transparent);
  opacity: 0;
  transition: opacity 0.4s;
}

.research-card:hover { border-color: var(--accent); transform: translateY(-3px); }
.research-card:hover::before { opacity: 1; }

.research-icon {
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
}

.research-card h3 {
  font-family: var(--serif);
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.research-card p {
  color: var(--text-dim);
  font-size: 0.92rem;
  line-height: 1.7;
}

/* ── Experience Timeline ── */
#experience { background: var(--bg-elevated); }

.timeline {
  max-width: 800px;
  position: relative;
  padding-left: 3rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, var(--accent), var(--border), transparent);
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--border);
}

.timeline-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

.timeline-item::before {
  content: '';
  position: absolute;
  left: -3rem;
  top: 0.5rem;
  width: 7px;
  height: 7px;
  background: var(--accent);
  border-radius: 50%;
  transform: translateX(-3px);
}

.timeline-date {
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.timeline-item h3 {
  font-family: var(--serif);
  font-size: 1.35rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.timeline-item h4 {
  font-size: 0.88rem;
  color: var(--text-dim);
  font-weight: 400;
  margin-bottom: 0.75rem;
}

.timeline-item p {
  color: var(--text-dim);
  font-size: 0.92rem;
}

/* ── Publications ── */
.pub-list {
  max-width: 900px;
}

.pub-item {
  padding: 2rem 0;
  border-bottom: 1px solid var(--border);
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  gap: 1.5rem;
  align-items: start;
  transition: background 0.3s;
}

.pub-number {
  font-family: var(--serif);
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--text-muted);
  text-align: right;
}

.pub-content h3 {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  line-height: 1.5;
}

.pub-content h3 a {
  color: var(--text);
  text-decoration: none;
  transition: color 0.3s;
}

.pub-content h3 a:hover { color: var(--accent); }

.pub-meta {
  font-size: 0.82rem;
  color: var(--text-dim);
  line-height: 1.6;
}

.pub-tag {
  display: inline-block;
  font-family: var(--mono);
  font-size: 0.65rem;
  padding: 0.2rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 2px;
  color: var(--accent);
  letter-spacing: 0.05em;
  margin-top: 0.5rem;
}

/* ── Leadership ── */
#leadership { background: var(--bg-elevated); }

/* ── News Grid ── */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
  max-width: 1100px;
}

.news-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 2rem;
  border-radius: 3px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: all 0.4s;
  position: relative;
  overflow: hidden;
}

.news-card::after {
  content: '→';
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: var(--text-muted);
  font-size: 1.1rem;
  transition: all 0.3s;
  opacity: 0;
}

.news-card:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}

.news-card:hover::after {
  opacity: 1;
  color: var(--accent);
}

.news-source {
  font-family: var(--mono);
  font-size: 0.68rem;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.news-date {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.news-card h3 {
  font-family: var(--serif);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 0.6rem;
  line-height: 1.35;
}

.news-card p {
  font-size: 0.88rem;
  color: var(--text-dim);
  line-height: 1.65;
  flex-grow: 1;
}

.news-tag {
  display: inline-block;
  font-family: var(--mono);
  font-size: 0.62rem;
  padding: 0.25rem 0.65rem;
  border: 1px solid var(--border);
  border-radius: 2px;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 1rem;
  align-self: flex-start;
}

.leadership-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1100px;
}

.leadership-card {
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 2rem;
  border-radius: 3px;
  transition: all 0.3s;
}

.leadership-card:hover { border-color: var(--accent); }

.leadership-card .role {
  font-family: var(--serif);
  font-size: 1.15rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.leadership-card .org {
  font-size: 0.85rem;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.leadership-card p {
  font-size: 0.88rem;
  color: var(--text-dim);
  line-height: 1.7;
}

/* ── Contact ── */
.contact-inner {
  max-width: 700px;
  text-align: center;
  margin: 0 auto;
}

.contact-inner .section-header { text-align: center; }
.contact-inner .section-divider { margin: 1.5rem auto 0; }

.contact-text {
  color: var(--text-dim);
  font-size: 1.05rem;
  margin-bottom: 3rem;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 3px;
  text-decoration: none;
  color: var(--text-dim);
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.3s;
}

.contact-link:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

.contact-link svg { width: 18px; height: 18px; }

/* ── Footer ── */
footer {
  padding: 3rem;
  border-top: 1px solid var(--border);
  text-align: center;
  font-size: 0.78rem;
  color: var(--text-muted);
}

footer span { color: var(--accent); }

/* ── Animations ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Mobile Nav ── */
.mobile-menu {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(10,10,12,0.97);
  z-index: 999;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  backdrop-filter: blur(20px);
}

.mobile-menu.open { display: flex; }

.mobile-menu a {
  font-family: var(--serif);
  font-size: 2rem;
  color: var(--text);
  text-decoration: none;
  font-weight: 300;
  transition: color 0.3s;
}

.mobile-menu a:hover { color: var(--accent); }

.close-menu {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: none;
  border: none;
  color: var(--text);
  font-size: 2rem;
  cursor: pointer;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  nav { padding: 1rem 1.5rem; }
  .nav-links { display: none; }
  .hamburger { display: flex; }
  .hero { padding: 7rem 1.5rem 4rem; }
  section { padding: 4rem 1.5rem; }
  .about-grid { grid-template-columns: 1fr; gap: 3rem; }
  .stats-grid { grid-template-columns: 1fr 1fr; gap: 1rem; }
  .pub-item { grid-template-columns: 2.5rem 1fr; gap: 1rem; }
  .contact-links { flex-direction: column; align-items: center; }
}

@media (max-width: 480px) {
  .stats-grid { grid-template-columns: 1fr; }
  .hero-links { flex-direction: column; }
  .hero-links a { text-align: center; justify-content: center; }
}
</style>
</head>
<body>

<!-- Navigation -->
<nav id="navbar">
  <a href="#" class="nav-logo">D.K.A. <span>Williams</span></a>
  <div class="nav-links">
    <a href="#about">About</a>
    <a href="#research">Research</a>
    <a href="#experience">Experience</a>
    <a href="#publications">Publications</a>
    <a href="#news">News</a>
    <a href="#leadership">Leadership</a>
    <a href="#contact">Contact</a>
  </div>
  <button class="hamburger" onclick="toggleMenu()" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- Mobile Menu -->
<div class="mobile-menu" id="mobileMenu">
  <button class="close-menu" onclick="toggleMenu()">&times;</button>
  <a href="#about" onclick="toggleMenu()">About</a>
  <a href="#research" onclick="toggleMenu()">Research</a>
  <a href="#experience" onclick="toggleMenu()">Experience</a>
  <a href="#publications" onclick="toggleMenu()">Publications</a>
  <a href="#news" onclick="toggleMenu()">News</a>
  <a href="#leadership" onclick="toggleMenu()">Leadership</a>
  <a href="#contact" onclick="toggleMenu()">Contact</a>
</div>

<!-- Hero -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-content">
    <div class="hero-tag">MD-PhD Candidate · Computational Neuroscientist · Innovator</div>
    <h1 class="hero-name">D.K. Adrian<br><em>Williams</em> Jr.</h1>
    <p class="hero-desc">Future physician-scientist advancing the intersection of computational neuroscience, biomedical imaging, and health innovation. Using EEG, machine learning, and AI to decode the brain and transform clinical care.</p>
    <div class="hero-links">
      <a href="#contact" class="btn-primary">Get in Touch</a>
      <a href="https://scholar.google.com/citations?user=YP4eTi4AAAAJ&hl=en" target="_blank" class="btn-outline">Google Scholar</a>
      <a href="https://x.com/dkawjr" target="_blank" class="btn-outline">@dkawjr</a>
    </div>
  </div>
  <div class="hero-scroll">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<!-- About -->
<section id="about">
  <div class="section-header reveal">
    <div class="section-label">01 — About</div>
    <h2 class="section-title">Physician-Scientist<br>in the Making</h2>
    <div class="section-divider"></div>
  </div>
  <div class="about-grid">
    <div class="about-text reveal">
      <p>Adrian is an MD-PhD student in the NIH-funded Medical Scientist Training Program (MSTP) at Albert Einstein College of Medicine. His PhD research, conducted in the Coen-Cagli Lab, sits at the convergence of computational neuroscience, EEG-based neuroimaging, and machine learning — focused on decoding real-time visual segmentation processes in autism to uncover neural biomarkers for early diagnosis and precision subtyping.</p>
      <p>Beyond the lab, Adrian is a builder. As COO and Co-founder of Focused Future LLC, he develops AI-powered tools for mental health assessment. He has held leadership positions spanning student government, faculty senate, institutional review boards, and national advocacy organizations — from the Ohio statehouse to the World Health Assembly in Geneva.</p>
      <p>He is a 2025 Cell Rising Black Scientist Awardee (Honorable Mention), a Harvard Medical School research fellow, and a Weill Cornell Leadership Alliance alumnus. His work has been published in JCI Insight, iScience, IEEE Access, and Translational Cancer Research, among others.</p>
    </div>
    <div class="stats-grid reveal">
      <div class="stat-card">
        <div class="stat-number">11+</div>
        <div class="stat-label">Publications</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">7+</div>
        <div class="stat-label">Abstracts & Presentations</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">5</div>
        <div class="stat-label">Research Institutions</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">3</div>
        <div class="stat-label">Mentored Student Projects</div>
      </div>
    </div>
  </div>
</section>

<!-- Research -->
<section id="research">
  <div class="section-header reveal">
    <div class="section-label">02 — Research</div>
    <h2 class="section-title">Areas of Investigation</h2>
    <div class="section-divider"></div>
  </div>
  <div class="research-areas">
    <div class="research-card reveal">
      <div class="research-icon">🧠</div>
      <h3>Computational Neuroelectrophysiology</h3>
      <p>Using EEG and machine learning to decode real-time visual processing in autism spectrum disorder, uncovering neural biomarkers for diagnosis and precision subtyping.</p>
    </div>
    <div class="research-card reveal">
      <div class="research-icon">🤖</div>
      <h3>AI & Machine Learning in Healthcare</h3>
      <p>Developing deep learning architectures for medical imaging, clinical decision support, and large language model evaluation across medical specialties.</p>
    </div>
    <div class="research-card reveal">
      <div class="research-icon">🔬</div>
      <h3>Biomedical Imaging</h3>
      <p>Advanced computational approaches to neuroimaging (EEG/fMRI/DTI) and digital pathology for cancer detection and neurodevelopmental research.</p>
    </div>
    <div class="research-card reveal">
      <div class="research-icon">📊</div>
      <h3>Clinical Informatics & Health Innovation</h3>
      <p>EHR-based research, automated clinical research platforms, and digital health tools bridging data science with patient outcomes and health equity.</p>
    </div>
    <div class="research-card reveal">
      <div class="research-icon">⚕️</div>
      <h3>Translational Psychiatry</h3>
      <p>Investigating interventional psychiatry approaches including ketamine's network plasticity effects and psychiatric comorbidities in critical care settings.</p>
    </div>
    <div class="research-card reveal">
      <div class="research-icon">🌍</div>
      <h3>Health Disparities & Public Health</h3>
      <p>Research on sociodemographic factors in medical education, retention initiatives, and equitable access to emerging healthcare technologies.</p>
    </div>
  </div>
</section>

<!-- Experience -->
<section id="experience">
  <div class="section-header reveal">
    <div class="section-label">03 — Experience</div>
    <h2 class="section-title">Research & Professional<br>Journey</h2>
    <div class="section-divider"></div>
  </div>
  <div class="timeline">
    <div class="timeline-item reveal">
      <div class="timeline-date">2023 — Present</div>
      <h3>PhD Research — Coen-Cagli Lab</h3>
      <h4>Albert Einstein College of Medicine — Computational Neuroscience & Systems Biology</h4>
      <p>Applying EEG and machine learning to decode real-time visual segmentation in autism. Qualifying exam passed; MSc in Biomedical Sciences (Neuroscience) awarded May 2025.</p>
    </div>
    <div class="timeline-item reveal">
      <div class="timeline-date">2022 — Present</div>
      <h3>JEDI Program — Development Innovation Unit</h3>
      <h4>Regeneron Pharmaceuticals</h4>
      <p>Reviewing clinical research and biotechnology literature. Assembling rapid market landscape research, scientific literature reviews, and operational innovation cases.</p>
    </div>
    <div class="timeline-item reveal">
      <div class="timeline-date">2020 — Present</div>
      <h3>Chief Operating Officer & Co-Founder</h3>
      <h4>Focused Future, LLC</h4>
      <p>Third employee of a mental health AI assessment startup. Leading quantitative and qualitative analysis of opportunities in the mental health sector and supporting business development.</p>
    </div>
    <div class="timeline-item reveal">
      <div class="timeline-date">Spring 2026</div>
      <h3>Adjunct Faculty — Teaching Specialist</h3>
      <h4>University of Minnesota — College of Continuing and Professional Studies</h4>
      <p>Co-teaching INET 3011W (Social Impact of Information Technology) and INET 4082W (IT Infrastructure Projects and Processes).</p>
    </div>
    <div class="timeline-item reveal">
      <div class="timeline-date">2019 — 2022</div>
      <h3>Research Associate — Liston Lab</h3>
      <h4>Weill Cornell Medical College — Computational Neuroscience</h4>
      <p>Developed a computational neuroimaging pipeline for analyzing individual differences in brain responses to TMS using DTI. Collaborated with the Max Planck Institute.</p>
    </div>
    <div class="timeline-item reveal">
      <div class="timeline-date">Summer 2018</div>
      <h3>Research Fellow — Gunawardena Lab</h3>
      <h4>Harvard Medical School — Computational Neurobiology</h4>
      <p>Developed a modular pipeline predicting cis-regulatory elements and transcription factor binding sites in C. elegans. Led comparative analysis of neuronal type specification evolution.</p>
    </div>
  </div>
</section>

<!-- Publications -->
<section id="publications">
  <div class="section-header reveal">
    <div class="section-label">04 — Publications</div>
    <h2 class="section-title">Selected Works</h2>
    <div class="section-divider"></div>
  </div>
  <div class="pub-list">
    <div class="pub-item reveal">
      <div class="pub-number">01</div>
      <div class="pub-content">
        <h3><a href="https://doi.org/10.1016/j.isci.2025.108641" target="_blank">The Sprained Mind</a></h3>
        <div class="pub-meta">Williams Jr., D. K. A. · Cell Press - iScience · 2025</div>
        <span class="pub-tag">Cell Rising Black Scientist Award</span>
      </div>
    </div>
    <div class="pub-item reveal">
      <div class="pub-number">02</div>
      <div class="pub-content">
        <h3><a href="https://doi.org/10.1172/jci.insight.176146" target="_blank">Sociodemographic Factors and Research Experience Impact MD-PhD Program Acceptance</a></h3>
        <div class="pub-meta">Williams DKA, Christophers B, Keyes T, et al. · JCI Insight · 2024</div>
        <span class="pub-tag">Original Research</span>
      </div>
    </div>
    <div class="pub-item reveal">
      <div class="pub-number">03</div>
      <div class="pub-content">
        <h3><a href="https://doi.org/10.1212/CPJ.0000000000200450" target="_blank">Cerebrovascular Health Among Sex- and Gender-Diverse People</a></h3>
        <div class="pub-meta">L'Erario ZP, ... Adrian Williams DK, et al. · Neurology: Clinical Practice · 2025</div>
        <span class="pub-tag">Narrative Review</span>
      </div>
    </div>
    <div class="pub-item reveal">
      <div class="pub-number">04</div>
      <div class="pub-content">
        <h3><a href="https://doi.org/10.1109/ACCESS.2024.3523745" target="_blank">Breast Cancer Detection using Mammography: Image Processing to Deep Learning</a></h3>
        <div class="pub-meta">Qureshi SA, et al. · IEEE Access · 2024</div>
        <span class="pub-tag">IEEE</span>
      </div>
    </div>
    <div class="pub-item reveal">
      <div class="pub-number">05</div>
      <div class="pub-content">
        <h3><a href="https://doi.org/10.21037/tcr-23-964" target="_blank">Digital Pathology, Deep Learning, and Cancer: A Narrative Review</a></h3>
        <div class="pub-meta">Williams Jr. DKA, Graifman G, Hussain N, et al. · Translational Cancer Research · 2024</div>
        <span class="pub-tag">First Author</span>
      </div>
    </div>
    <div class="pub-item reveal">
      <div class="pub-number">06</div>
      <div class="pub-content">
        <h3><a href="https://doi.org/10.1016/j.ibmed.2024.100172" target="_blank">Exploring the Business Aspects of Digital Pathology, Deep Learning in Cancers</a></h3>
        <div class="pub-meta">Reddy A, Williams DKA, et al. · Intelligence-Based Medicine · 2024</div>
        <span class="pub-tag">Original Research</span>
      </div>
    </div>
    <div class="pub-item reveal">
      <div class="pub-number">07</div>
      <div class="pub-content">
        <h3><a href="https://doi.org/10.1177/23821205241264695" target="_blank">Exploring the Usage of ChatGPT Among Medical Students in the United States</a></h3>
        <div class="pub-meta">Zhang JS, Yoon C, Williams DKA, Pinkas A · J Med Educ Curric Dev · 2024</div>
        <span class="pub-tag">Medical Education</span>
      </div>
    </div>
  </div>
  <div style="text-align: center; margin-top: 3rem;" class="reveal">
    <a href="https://scholar.google.com/citations?user=YP4eTi4AAAAJ&hl=en" target="_blank" class="btn-outline" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.75rem; font-size: 0.82rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; border-radius: 2px; border: 1px solid var(--border); color: var(--text-dim); transition: all 0.3s;">View All on Google Scholar →</a>
  </div>
</section>

<!-- In the News -->
<section id="news">
  <div class="section-header reveal">
    <div class="section-label">05 — In the News</div>
    <h2 class="section-title">Press & Features</h2>
    <div class="section-divider"></div>
  </div>
  <div class="news-grid">
    <a href="https://www.cell.com/iscience/fulltext/S2589-0042(25)00036-7" target="_blank" class="news-card reveal">
      <div class="news-source">Cell Press · iScience</div>
      <div class="news-date">February 2025</div>
      <h3>"The Sprained Mind"</h3>
      <p>Award-winning essay published as part of the 5th Annual Rising Black Scientists Awards, exploring the parallels between visible physical injuries and invisible psychiatric suffering.</p>
      <div class="news-tag">Rising Black Scientist Award</div>
    </a>
    <a href="https://elsevierfoundation.org/winners-of-5th-annual-rising-black-scientists-awards-announced/" target="_blank" class="news-card reveal">
      <div class="news-source">Elsevier Foundation</div>
      <div class="news-date">February 2025</div>
      <h3>5th Annual Rising Black Scientists Awards Announced</h3>
      <p>Selected as an honorable mention alongside winners from Stanford, Morehouse, and other leading institutions for contributions to life and health sciences.</p>
      <div class="news-tag">National Recognition</div>
    </a>
    <a href="https://montefioreeinstein.org/news/2023/05/01/inaugural-impact-day-showcases-medical-student-research-and-commitment-service" target="_blank" class="news-card reveal">
      <div class="news-source">Montefiore Einstein</div>
      <div class="news-date">May 2023</div>
      <h3>Inaugural Impact Day — Research Award Winner</h3>
      <p>Won an award at Einstein's first annual Impact Day for a poster on sociodemographic factors impacting MD-PhD program acceptance — later published in JCI Insight.</p>
      <div class="news-tag">Research Award</div>
    </a>
    <a href="https://montefioreeinsteinnow.org/update/2022-sep-14/einstein-2026-annual-white-coat-ceremony" target="_blank" class="news-card reveal">
      <div class="news-source">Montefiore Einstein Now</div>
      <div class="news-date">September 2022</div>
      <h3>Class of 2026 White Coat Ceremony</h3>
      <p>Led the recitation of the class oath at the White Coat Ceremony, helping coordinate the oath-writing activity for incoming Einstein medical students.</p>
      <div class="news-tag">Einstein MD/PhD</div>
    </a>
    <a href="https://blogs.einsteinmed.edu/blog/2023/08/23/first-year-medical-student-aftershocks/" target="_blank" class="news-card reveal">
      <div class="news-source">Einstein Blog · Pulse Magazine</div>
      <div class="news-date">August 2023</div>
      <h3>"Aftershocks" — My First Code</h3>
      <p>A deeply personal essay about experiencing a patient code during an ER rotation, now included in Einstein's core curriculum for first-year medical students.</p>
      <div class="news-tag">Published Narrative</div>
    </a>
    <a href="https://www.watchtheyard.com/leadership-highlight/leadership-highlight-d-k-adrian-williams-the-sga-president-of-wright-state-university/" target="_blank" class="news-card reveal">
      <div class="news-source">Watch The Yard</div>
      <div class="news-date">March 2021</div>
      <h3>Leadership Highlight: SGA President of Wright State</h3>
      <p>Featured interview as one of the nation's standout college student leaders, discussing the Retain the 9 Initiative, navigating a pandemic, and the path to medicine.</p>
      <div class="news-tag">Leadership Feature</div>
    </a>
    <a href="https://webapp2.wright.edu/web1/newsroom/2021/04/26/governor-dewine-to-address-students-during-wright-state-universitys-spring-commencement-ceremonies/" target="_blank" class="news-card reveal">
      <div class="news-source">Wright State Newsroom</div>
      <div class="news-date">April 2021</div>
      <h3>Spring Commencement Speaker with Gov. DeWine</h3>
      <p>Selected to deliver the spring commencement address, graduating magna cum laude after serving as student body president through a faculty strike and a pandemic.</p>
      <div class="news-tag">Commencement Speaker</div>
    </a>
    <a href="https://higherlearningadvocates.org/2020/04/15/adrian-williams-wright-state-university/" target="_blank" class="news-card reveal">
      <div class="news-source">Higher Learning Advocates</div>
      <div class="news-date">April 2020</div>
      <h3>Leading a Student Body Through a Pandemic</h3>
      <p>Invited essay on leading 13,000+ students through the early days of COVID-19 — advocating for pass/fail policies and equitable academic accommodations.</p>
      <div class="news-tag">National Think Tank</div>
    </a>
    <a href="https://webapp2.wright.edu/web1/newsroom/2019/03/11/wright-state-working-to-retain-and-support-more-underrepresented-students/" target="_blank" class="news-card reveal">
      <div class="news-source">Wright State Newsroom</div>
      <div class="news-date">March 2019</div>
      <h3>Retain the 9: A Retention Initiative</h3>
      <p>Co-founded an initiative that achieved a 4% increase in minority retention, created a new office of retention, and established endowed scholarships.</p>
      <div class="news-tag">Founding Initiative</div>
    </a>
    <a href="https://ccaps.umn.edu/people/adrian-williams" target="_blank" class="news-card reveal">
      <div class="news-source">University of Minnesota · CCAPS</div>
      <div class="news-date">Spring 2026</div>
      <h3>Teaching Specialist — UMN Information Technology</h3>
      <p>Faculty appointment at the University of Minnesota's College of Continuing & Professional Studies, teaching INET 3011W (Social Impact of IT) and INET 4082W (IT Projects and Processes).</p>
      <div class="news-tag">Faculty Appointment</div>
    </a>
  </div>
</section>

<!-- Leadership -->
<section id="leadership">
  <div class="section-header reveal">
    <div class="section-label">06 — Leadership & Service</div>
    <h2 class="section-title">Beyond the Bench</h2>
    <div class="section-divider"></div>
  </div>
  <div class="leadership-grid">
    <div class="leadership-card reveal">
      <div class="role">MSTP Admissions Committee</div>
      <div class="org">Albert Einstein College of Medicine · 2025–2027</div>
      <p>One of two selected student members with full voting rights on MD-PhD admissions decisions for the Medical Scientist Training Program.</p>
    </div>
    <div class="leadership-card reveal">
      <div class="role">Faculty Senate Senator</div>
      <div class="org">Albert Einstein College of Medicine · 2023–2024</div>
      <p>Served as student senator representing the medical student body in institutional governance and policy decisions.</p>
    </div>
    <div class="leadership-card reveal">
      <div class="role">73rd Student Body President</div>
      <div class="org">Wright State University · 2018–2021</div>
      <p>Represented 13,000+ students. Led through a faculty strike and pandemic. Managed $120K+ budget, founded retention initiatives, and testified at the Ohio statehouse.</p>
    </div>
    <div class="leadership-card reveal">
      <div class="role">Co-Founder, Retain the 9 Initiative</div>
      <div class="org">Wright State University</div>
      <p>Addressed minority student retention disparities. Achieved a 4% (+374) increase in retention and established a new office of retention with 12 positions.</p>
    </div>
    <div class="leadership-card reveal">
      <div class="role">North American Representative</div>
      <div class="org">Universities Allied for Essential Medicines · WHO · 2018</div>
      <p>One of three individuals chosen to represent North America at the 71st World Health Assembly at the UN in Geneva. Lobbied global health leaders on access to medicines.</p>
    </div>
    <div class="leadership-card reveal">
      <div class="role">Executive Director</div>
      <div class="org">Ohio Student Government Association · 2018–2020</div>
      <p>Represented over 500,000 students from 14 public institutions. Served as the primary student perspective to Ohio legislators and the Department of Higher Education.</p>
    </div>
  </div>
</section>

<!-- Contact -->
<section id="contact">
  <div class="contact-inner">
    <div class="section-header reveal">
      <div class="section-label">07 — Connect</div>
      <h2 class="section-title">Let's Work Together</h2>
      <div class="section-divider"></div>
    </div>
    <p class="contact-text reveal">Open to research collaborations, speaking engagements, consulting opportunities, and conversations about the future of computational neuroscience and health innovation.</p>
    <div class="contact-links reveal">
      <a href="mailto:connectdkaw@gmail.com" class="contact-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        Email
      </a>
      <a href="https://www.linkedin.com/in/dkawjr" target="_blank" class="contact-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
        LinkedIn
      </a>
      <a href="https://x.com/dkawjr" target="_blank" class="contact-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.4L19.5 4h-2l-5.2 6.4L8 4H4z"/></svg>
        X / Twitter
      </a>
      <a href="https://scholar.google.com/citations?user=YP4eTi4AAAAJ&hl=en" target="_blank" class="contact-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path d="M12 14l-6.16-3.422"/></svg>
        Google Scholar
      </a>
    </div>
  </div>
</section>

<!-- Footer -->
<footer>
  <p>&copy; 2025 D.K. Adrian Williams Jr. · Built with <span>♦</span> · Man of <span>KAPsi</span></p>
</footer>

<script>
// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
</script>

</body>
</html>
