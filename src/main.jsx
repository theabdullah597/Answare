import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { I18N, RTL_LANGS } from './data';
import './styles.css';

const CONFIG = {
  downloadUrl: '#',
  youtubeUrl: 'https://www.youtube.com/channel/UCZbRCVmyteq8q6Ks5pQDcdA',
  instagramUrl: '#',
  emailAddress: 'hello@answare.com',
};

const languages = [
  ['en', 'English'], ['ar', 'العربية'], ['ur', 'اردو'], ['fr', 'Français'],
  ['de', 'Deutsch'], ['hi', 'हिन्दी'], ['zh', '中文'],
];

const Icon = ({ children, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">{children}</svg>
);

function HeroVisual() {
  return (
    <div className="hero-visual glass" aria-hidden="true">
      <svg viewBox="0 0 420 320">
        <rect x="18" y="90" width="150" height="100" rx="10" fill="none" stroke="var(--accent)" strokeWidth="1.6" opacity=".85" />
        <rect x="18" y="196" width="150" height="10" rx="4" fill="var(--accent)" opacity=".5" />
        <rect x="34" y="106" width="118" height="68" rx="4" fill="var(--accent)" opacity=".10" />
        <rect x="300" y="60" width="90" height="180" rx="16" fill="none" stroke="var(--accent)" strokeWidth="1.6" opacity=".85" />
        <rect x="312" y="76" width="66" height="148" rx="4" fill="var(--accent)" opacity=".10" />
        <g transform="translate(324 96)" opacity=".9">
          <rect width="42" height="42" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
          <rect x="4" y="4" width="10" height="10" fill="var(--accent)" />
          <rect x="28" y="4" width="10" height="10" fill="var(--accent)" />
          <rect x="4" y="28" width="10" height="10" fill="var(--accent)" />
          <rect x="18" y="18" width="6" height="6" fill="var(--accent)" />
          <rect x="28" y="28" width="6" height="6" fill="var(--accent)" />
        </g>
        <path className="beam-dash" d="M170 130 C 220 90, 250 170, 298 140" fill="none" stroke="var(--accent)" strokeWidth="2" />
        <circle className="pulse-dot" cx="298" cy="140" r="5" fill="var(--accent)" />
      </svg>
    </div>
  );
}

function App() {
  const browserLanguage = typeof navigator !== 'undefined' ? navigator.language.slice(0, 2) : 'en';
  const [language, setLanguage] = useState(() => localStorage.getItem('weshare_lang') || (I18N[browserLanguage] ? browserLanguage : 'en'));
  const [theme, setTheme] = useState(() => localStorage.getItem('weshare_theme') || 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const dict = I18N[language] || I18N.en;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = RTL_LANGS.includes(language) ? 'rtl' : 'ltr';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('weshare_lang', language);
    localStorage.setItem('weshare_theme', theme);
  }, [language, theme]);

  const nav = (label, href) => <a href={href} onClick={() => setMenuOpen(false)}>{label}</a>;
  return (
    <>
      <div className="bg-decor" aria-hidden="true"><span /><span /><span /></div>
      <header className="site-header glass">
        <div className="brand">
          <div className="brand-mark"><Icon size={20}><path d="M4 12L11 5M4 12L11 19M4 12H16M20 12a4 4 0 100-8 4 4 0 000 8zm0 12a4 4 0 100-8 4 4 0 000 8z" stroke="#15140c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></Icon></div>
          <div className="brand-text"><span className="brand-name">WE SHARE</span><span className="brand-by">by Answare</span></div>
        </div>
        <button className="nav-toggle glass" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></Icon>
        </button>
        <nav className={`main-nav${menuOpen ? ' open' : ''}`}>
          {nav(dict.nav.home, '#home')}{nav(dict.nav.features, '#features')}{nav(dict.nav.download, '#download')}{nav(dict.nav.connect, '#connect')}
        </nav>
        <div className="controls">
          <div className="theme-switch" role="group" aria-label="Theme">
            {['light', 'dark', 'contrast'].map((value, index) => <button key={value} data-theme-btn={value} aria-pressed={theme === value} aria-label={`${value} theme`} onClick={() => setTheme(value)}>{['☀', '●', '◐'][index]}</button>)}
          </div>
          <select aria-label="Language" value={language} onChange={(event) => setLanguage(event.target.value)}>
            {languages.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-copy">
            <h1>{dict.hero.title}</h1><p>{dict.hero.subtitle}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={CONFIG.downloadUrl}><Icon><path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Icon>{dict.hero.ctaDownload}</a>
              <a className="btn btn-ghost" href={CONFIG.youtubeUrl} target="_blank" rel="noopener"><Icon><path d="M22 12s0-3.2-.4-4.7a2.9 2.9 0 00-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.3a2.9 2.9 0 00-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7a2.9 2.9 0 002 2C6.1 19 12 19 12 19s5.9 0 7.6-.3a2.9 2.9 0 002-2C22 15.2 22 12 22 12z" stroke="currentColor" strokeWidth="1.6" /><path d="M10 9l5 3-5 3V9z" fill="currentColor" /></Icon>{dict.hero.ctaYoutube}</a>
            </div>
          </div>
          <HeroVisual />
        </section>

        <section className="steps"><h2>{dict.steps.title}</h2><div className="steps-row">
          {dict.steps.items.map((item, index) => <div className="step-card glass" key={item.t}><div className="step-num">{index + 1}</div><h3>{item.t}</h3><p>{item.d}</p></div>)}
        </div></section>

        <section id="features" className="features">
          <div className="section-head"><h2>{dict.features.title}</h2><p>{dict.features.subtitle}</p></div>
          {dict.features.categories.map((category) => <div className="feature-category" key={category.title}><h3>{category.title}</h3><div className="feature-grid">
            {category.items.map((item) => <div className="feature-card glass" key={item.t}><h4>{item.t}</h4><p>{item.d}</p></div>)}
          </div></div>)}
        </section>

        <section id="download" className="download-cta glass"><h2>{dict.download.title}</h2><p>{dict.download.subtitle}</p><a className="btn btn-primary btn-lg" href={CONFIG.downloadUrl}><Icon><path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Icon>{dict.download.cta}</a></section>

        <section id="connect" className="connect"><div className="section-head"><h2>{dict.connect.title}</h2><p>{dict.connect.subtitle}</p></div><div className="connect-grid">
          <a className="connect-card glass" href={CONFIG.youtubeUrl} target="_blank" rel="noopener"><div className="connect-icon">▶</div><h4>{dict.connect.youtube}</h4><p>{dict.connect.youtubeDesc}</p></a>
          <a className="connect-card glass" href={CONFIG.instagramUrl} target="_blank" rel="noopener"><div className="connect-icon">◎</div><h4>{dict.connect.instagram}</h4><p>{dict.connect.instagramDesc}</p></a>
          <a className="connect-card glass" href={`mailto:${CONFIG.emailAddress}`}><div className="connect-icon">@</div><h4>{dict.connect.email}</h4><p>{dict.connect.emailDesc}</p></a>
        </div></section>
      </main>
      <footer className="site-footer"><span>WE SHARE — Answare</span><span>© {new Date().getFullYear()} · {dict.footer.rights}</span></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
