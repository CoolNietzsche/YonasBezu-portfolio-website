// Style direction: The Velvet Programme — stage the story with offset editorial columns, warm brass details, oxblood accents, and subtle motion that echoes a ball's arc.
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Orbit,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";

// All images live in client/public/images — replace the files there (same names) to update the site.
const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;
const heroImage = img("hero.jpg");
const ballImage = img("act-bouncing-ball.jpg");
const hatsImage = img("act-hat-juggling.jpg");
const markImage = img("mark.svg");

const CONTACT = {
  email: "bezuyonas026@gmail.com",
  phoneDisplay: "+251 913 509 994",
  phoneTel: "+251913509994",
  whatsapp: "https://wa.me/251913509994",
  location: "Addis Ababa, Ethiopia",
};

const experience = [
  {
    place: "Omojah Together",
    role: "Circus Performer",
    location: "Across Africa",
    detail:
      "Performed high-energy hat juggling in an international ensemble touring Kenya, Tanzania, and Mozambique.",
  },
  {
    place: "Rambo Circus",
    role: "Hat Juggler & Bouncing Ball Performer",
    location: "Maharashtra, India",
    detail:
      "Delivered disciplined routines under a renowned circus tent, entertaining large and diverse crowds.",
  },
  {
    place: "Egypt Circus",
    role: "Circus Tent Performer",
    location: "Egypt",
    detail:
      "Presented bouncing ball and hat juggling acts alongside an international group of artists.",
  },
  {
    place: "Dubai Mall",
    role: "Circus Artist",
    location: "Dubai, UAE",
    detail:
      "Captured the attention of a constant flow of visitors with precise, engaging juggling performances.",
  },
];

const acts = [
  {
    number: "01",
    title: "Bouncing Ball",
    kicker: "Rhythm / Precision",
    image: ballImage,
    description:
      "A tactile study in timing: balls meet the floor, the hand, and the eye in a rhythm that keeps the room leaning forward.",
  },
  {
    number: "02",
    title: "Hat Juggling",
    kicker: "Character / Flow",
    image: hatsImage,
    description:
      "A signature mix of character, control, and quick changes — built to read clearly from the front row to the back of the room.",
  },
];

const showreels = [
  {
    number: "01",
    title: "Bouncing Ball",
    detail: "Rhythm, rebound, and precise hand-to-floor timing.",
    videoId: "-xAg5PJbwkc",
    poster: ballImage,
  },
  {
    number: "02",
    title: "Hat Juggling",
    detail: "Character, flow, and a bright stage-ready finish.",
    videoId: "bTOpBWzsnfw",
    poster: hatsImage,
  },
];

// Gallery: add or remove entries here. Files go in client/public/images/gallery/.
const galleryItems = [
  { file: "01.jpg", act: "Hat Juggling", caption: "" },
  { file: "02.jpg", act: "Bouncing Ball", caption: "" },
  { file: "03.jpg", act: "Hat Juggling", caption: "" },
  { file: "04.jpg", act: "Bouncing Ball", caption: "" },
  { file: "05.jpg", act: "On stage", caption: "" },
  { file: "06.jpg", act: "On stage", caption: "" },
  { file: "07.jpg", act: "On tour", caption: "" },
  { file: "08.jpg", act: "On tour", caption: "" },
].map((item, index) => ({
  title: `Photo ${String(index + 1).padStart(2, "0")}`,
  act: item.act,
  image: img(`gallery/${item.file}`),
  caption: item.caption || "A moment from Yonas Bezu’s live performance archive.",
}));

const SECTION_COUNT = 6;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const heroRef = useRef<HTMLElement | null>(null);
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const galleryStripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    if (galleryIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGalleryIndex(null);
      if (event.key === "ArrowRight") setGalleryIndex((index) => index === null ? 0 : (index + 1) % galleryItems.length);
      if (event.key === "ArrowLeft") setGalleryIndex((index) => index === null ? 0 : (index - 1 + galleryItems.length) % galleryItems.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [galleryIndex]);

  const galleryOpen = galleryIndex !== null;
  useEffect(() => {
    if (galleryOpen) {
      lastFocusRef.current = document.activeElement as HTMLElement | null;
      modalCloseRef.current?.focus();
    } else {
      lastFocusRef.current?.focus();
    }
  }, [galleryOpen]);

  useEffect(() => {
    const magneticElements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const cleanups = magneticElements.map((element) => {
      const handleMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
        const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
        element.style.setProperty("--mag-x", `${x * 12}px`);
        element.style.setProperty("--mag-y", `${y * 8}px`);
      };
      const reset = () => {
        element.style.setProperty("--mag-x", "0px");
        element.style.setProperty("--mag-y", "0px");
      };
      element.addEventListener("pointermove", handleMove);
      element.addEventListener("pointerleave", reset);
      return () => {
        element.removeEventListener("pointermove", handleMove);
        element.removeEventListener("pointerleave", reset);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    heroRef.current.style.setProperty("--hero-x", `${(x - 0.5) * 16}px`);
    heroRef.current.style.setProperty("--hero-y", `${(y - 0.5) * 12}px`);
  };

  const resetHeroPointer = () => {
    heroRef.current?.style.setProperty("--hero-x", "0px");
    heroRef.current?.style.setProperty("--hero-y", "0px");
  };

  const closeMenu = () => setMenuOpen(false);

  const nudgeGallery = (direction: number) => {
    galleryStripRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = `Booking inquiry — ${data.get("act") || "Circus performance"}`;
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Act: ${data.get("act") || ""}`,
      `Event date: ${data.get("date") || "Flexible"}`,
      `Venue / location: ${data.get("venue") || ""}`,
      "",
      "Message:",
      `${data.get("message") || ""}`,
    ].join("\n");
    setFormStatus("success");
    window.setTimeout(() => {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, 220);
    form.reset();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-ivory selection:bg-oxblood selection:text-ivory">
      <header
        className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <a className="brand-lockup" href="#top" onClick={closeMenu} aria-label="Yonas Bezu home">
          <img className="brand-mark" src={markImage} alt="" />
          <span className="brand-type">
            <span>YONAS</span>
            <strong>BEZU</strong>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>

        <nav id="site-nav" className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}>
          <a href="#acts" onClick={closeMenu}>Acts</a>
          <a href="#showreels" onClick={closeMenu}>Showreels</a>
          <a href="#gallery" onClick={closeMenu}>Gallery</a>
          <a href="#story" onClick={closeMenu}>Story</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu} data-magnetic>
            Book Yonas <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <aside className="programme-rail" aria-label="Portfolio scroll progress">
        <span className="rail-line"><i style={{ height: `${scrollProgress}%` }} /></span>
        <span className="rail-label">CIRCUS ARTIST / ADDIS ABABA</span>
        <span className="rail-count">{String(Math.min(SECTION_COUNT, Math.max(1, Math.ceil((scrollProgress / 100) * SECTION_COUNT)))).padStart(2, "0")} — {String(SECTION_COUNT).padStart(2, "0")}</span>
      </aside>

      <main id="top">
        <section
          ref={heroRef}
          className="hero-section"
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={resetHeroPointer}
        >
          <img className="hero-image" src={heroImage} fetchPriority="high" alt="Yonas Bezu performing hat juggling under a warm stage light" />
          <div className="hero-vignette" />
          <div className="hero-grid" />
          <div className="hero-copy page-wrap">
            <p className="eyebrow hero-eyebrow"><span /> Ethiopian circus artist / 18+ years in motion</p>
            <h1>
              Make the<br />
              <em>room</em> look up.
            </h1>
            <p className="hero-intro">
              Yonas Bezu creates precise, high-energy circus moments with a distinctly human sense of rhythm, character, and surprise.
            </p>
            <a href="#acts" className="text-link hero-link">
              Discover the acts <ArrowDownRight size={17} />
            </a>
            <div className="hero-spotlight" data-reveal>
              <div className="spotlight-head">
                <span className="spotlight-label">Signature programme</span>
                <span className="spotlight-status"><i /> Open to collaboration</span>
              </div>
              <div className="spotlight-acts">
                <a href="#acts" data-magnetic>
                  <span className="spotlight-number">01</span>
                  <span><strong>Bouncing Ball</strong><small>Rhythm / precision</small></span>
                  <ArrowUpRight size={15} />
                </a>
                <a href="#acts" data-magnetic>
                  <span className="spotlight-number">02</span>
                  <span><strong>Hat Juggling</strong><small>Character / flow</small></span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="spotlight-skills">
                <span>Core skills</span>
                <div><b>Stage presence</b><b>Audience engagement</b><b>Strength & flexibility</b></div>
              </div>
            </div>
          </div>
          <div className="hero-note">
            <span>01</span>
            <p>Live performance<br />portfolio</p>
          </div>
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
        </section>

        <section id="acts" className="acts-section section-pad page-wrap" data-reveal>
          <div className="section-heading split-heading">
            <div>
              <div className="section-signature"><img src={markImage} alt="" /><span>01 / The acts</span></div>
              <p className="eyebrow"><span /> The programme</p>
              <h2>Two acts.<br /><em>One unmistakable</em><br />stage presence.</h2>
            </div>
            <p className="section-lede">
              Built for theatre, festivals, branded events, and cultural spaces that need a live moment with lift, clarity, and edge.
            </p>
          </div>

          <div className="acts-list">
            {acts.map((act) => (
              <article className="act-card" key={act.number}>
                <div className="act-image-wrap">
                  <img src={act.image} alt={`${act.title} performance by Yonas Bezu`} className="act-image" loading="lazy" decoding="async" />
                  <span className="act-number">{act.number}</span>
                  <span className="act-stamp"><Orbit size={17} /> Live act</span>
                </div>
                <div className="act-copy">
                  <p className="eyebrow act-kicker">{act.kicker}</p>
                  <h3>{act.title}</h3>
                  <p>{act.description}</p>
                  <span className="act-rule" />
                  <span className="act-meta">Solo performance / adaptable format</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="showreels" className="showreels-section section-pad" data-reveal>
          <div className="page-wrap">
            <div className="section-heading split-heading showreel-heading">
              <div>
                <div className="section-signature"><img src={markImage} alt="" /><span>02 / In motion</span></div>
                <p className="eyebrow"><span /> Showreels</p>
                <h2>Watch the<br /><em>moment land.</em></h2>
              </div>
              <p className="section-lede">Two signature acts, captured at the instant the room stops being a room and starts becoming a stage.</p>
            </div>
            <div className="showreel-grid">
              {showreels.map((showreel) => (
                <article className="showreel-card" key={showreel.videoId}>
                  <div className="showreel-video-wrap">
                    <img src={showreel.poster} alt="" className="showreel-poster" loading="lazy" decoding="async" />
                    <div className="showreel-video-shade" />
                    <iframe
                      className="showreel-video"
                      src={`https://www.youtube-nocookie.com/embed/${showreel.videoId}?rel=0&modestbranding=1&playsinline=1`}
                      title={`${showreel.title} showreel`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                    <span className="showreel-number">{showreel.number}</span>
                  </div>
                  <div className="showreel-copy">
                    <div><p className="eyebrow">{showreel.title}</p><p>{showreel.detail}</p></div>
                    <a href={`https://www.youtube.com/watch?v=${showreel.videoId}`} target="_blank" rel="noreferrer" className="text-link">Open on YouTube <ArrowUpRight size={15} /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="story" className="story-section section-pad" data-reveal>
          <div className="story-inner page-wrap">
            <div className="story-marker">
              <img className="story-mark" src={markImage} alt="" />
              <span className="story-index">03</span>
              <span className="story-rule" />
              <span className="story-label">The artist</span>
            </div>
            <div className="story-quote">
              <p className="eyebrow"><span /> Behind the spectacle</p>
              <blockquote>“The best trick is the one that makes a stranger smile before they realise they are watching.”</blockquote>
              <p className="quote-note">A practice built from discipline, travel, and the instinct to make a room feel connected.</p>
            </div>
            <div className="story-facts">
              <div className="fact-block">
                <Award size={21} />
                <strong>18+</strong>
                <span>years of experience</span>
              </div>
              <div className="fact-block">
                <Globe2 size={21} />
                <strong>06</strong>
                <span>international markets</span>
              </div>
              <div className="fact-block">
                <Sparkles size={21} />
                <strong>02</strong>
                <span>signature acts</span>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section section-pad page-wrap" data-reveal>
          <div className="experience-topline">
            <div className="section-signature"><img src={markImage} alt="" /><span>04 / The road</span></div>
            <p className="eyebrow"><span /> Selected experience</p>
            <p className="experience-note">A moving stage / 2010 — present</p>
          </div>
          <div className="experience-layout">
            <div className="experience-intro">
              <h2>From the tent<br /><em>to the world.</em></h2>
              <p>Yonas brings the focus of a solo artist and the generosity of an ensemble performer to every room he enters.</p>
              <a href="#contact" className="text-link">Discuss a collaboration <ArrowUpRight size={17} /></a>
            </div>
            <div className="timeline" aria-label="Selected performance experience">
              {experience.map((item) => (
                <article className="timeline-item" key={`${item.place}-${item.location}`}>
                  <span className="timeline-dot" />
                  <div className="timeline-year">ACT</div>
                  <div className="timeline-copy">
                    <h3>{item.place}</h3>
                    <p className="timeline-role">{item.role}</p>
                    <p className="timeline-location">{item.location}</p>
                    <p className="timeline-detail">{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="gallery-section section-pad" data-reveal>
          <div className="page-wrap">
            <div className="experience-topline">
              <div className="section-signature"><img src={markImage} alt="" /><span>05 / Still in motion</span></div>
              <p className="eyebrow"><span /> Performance gallery</p>
              <p className="experience-note">Click to open full screen</p>
            </div>
            <div className="gallery-intro">
              <h2>A little<br /><em>more light.</em></h2>
              <div className="gallery-intro-side">
                <p>A compact visual archive of the shapes, characters, and split-second decisions behind the acts.</p>
                <div className="gallery-actions">
                  <span>{galleryItems.length} photos / swipe or use arrows</span>
                  <button type="button" onClick={() => nudgeGallery(-1)} aria-label="Previous gallery photos"><ChevronLeft size={17} /></button>
                  <button type="button" onClick={() => nudgeGallery(1)} aria-label="Next gallery photos"><ChevronRight size={17} /></button>
                </div>
              </div>
            </div>
            <div className="gallery-grid" ref={galleryStripRef}>
              {galleryItems.map((item, index) => (
                <button type="button" className={`gallery-tile gallery-tile-${index + 1}`} key={item.title} onClick={() => setGalleryIndex(index)} aria-label={`Open ${item.title} performance photo`}>
                  <img src={item.image} alt={`${item.act} performance: ${item.title}`} loading="lazy" decoding="async" />
                  <span className="gallery-tile-shade" />
                  <span className="gallery-tile-meta"><small>{item.act}</small><strong>{item.title}</strong></span>
                  <span className="gallery-tile-open"><ArrowUpRight size={17} /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-pad" data-reveal>
          <div className="contact-wrap page-wrap">
            <div className="contact-topline">
              <div className="section-signature"><img src={markImage} alt="" /><span>06 / The next act</span></div>
              <p className="eyebrow"><span /> The next act</p>
              <span className="contact-number">06</span>
            </div>
            <div className="contact-body">
              <h2>Let’s make<br /><em>something move.</em></h2>
              <div className="contact-side">
                <p>For short-term or long-term collaborations, bring Yonas into the programme and give the room a reason to look up.</p>
                <a className="contact-button" href={`mailto:${CONTACT.email}`} data-magnetic>
                  Start a conversation <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            <div className="contact-details">
              <a href={`mailto:${CONTACT.email}`}><Mail size={16} /> {CONTACT.email}</a>
              <a href={`tel:${CONTACT.phoneTel}`}><Phone size={16} /> {CONTACT.phoneDisplay}</a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
              <span><MapPin size={16} /> {CONTACT.location}</span>
            </div>
            <div className="booking-panel" data-reveal>
              <div className="booking-panel-intro">
                <p className="eyebrow"><span /> Booking inquiry</p>
                <h3>Bring the act<br /><em>into the room.</em></h3>
                <p>Share the essentials and the message will open in your email client, ready to send directly to Yonas.</p>
              </div>
              {formStatus === "success" ? (
                <div className="booking-success" role="status">
                  <span className="booking-success-mark"><Sparkles size={18} /></span>
                  <strong>Your inquiry is ready.</strong>
                  <p>Your email client should open with the booking details prefilled. If it does not, write directly to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>
                  <button type="button" className="booking-reset" onClick={() => setFormStatus("idle")}>Send another inquiry</button>
                </div>
              ) : (
                <form className="booking-form" id="booking-form" onSubmit={handleBookingSubmit}>
                  <div className="booking-field booking-field-wide">
                    <label htmlFor="booking-name">Your name</label>
                    <input id="booking-name" name="name" type="text" autoComplete="name" placeholder="Name or organisation" required />
                  </div>
                  <div className="booking-field">
                    <label htmlFor="booking-email">Email address</label>
                    <input id="booking-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                  </div>
                  <div className="booking-field">
                    <label htmlFor="booking-act">Act of interest</label>
                    <select id="booking-act" name="act" defaultValue="" required>
                      <option value="" disabled>Select an act</option>
                      <option value="Bouncing Ball">Bouncing Ball</option>
                      <option value="Hat Juggling">Hat Juggling</option>
                      <option value="Both acts">Both acts</option>
                    </select>
                  </div>
                  <div className="booking-field">
                    <label htmlFor="booking-date">Event date</label>
                    <input id="booking-date" name="date" type="date" />
                  </div>
                  <div className="booking-field">
                    <label htmlFor="booking-venue">Venue / location</label>
                    <input id="booking-venue" name="venue" type="text" autoComplete="organization" placeholder="City, venue, or event" required />
                  </div>
                  <div className="booking-field booking-field-wide">
                    <label htmlFor="booking-message">Tell us about the room</label>
                    <textarea id="booking-message" name="message" rows={4} placeholder="What are you planning? Audience size, timing, and anything else that will help." required />
                  </div>
                  <div className="booking-form-footer booking-field-wide">
                    <p>Short-term and long-term collaborations welcome.</p>
                    <button type="submit" className="contact-button" data-magnetic>Send inquiry <ArrowUpRight size={17} /></button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer page-wrap">
        <div className="footer-brand"><img src={markImage} alt="" /><span>YONAS BEZU</span></div>
        <p>Hat juggling / Bouncing ball / Live performance</p>
        <p>© {new Date().getFullYear()} Yonas Bezu. All rights reserved.</p>
        <a href="#top">Back to top <ArrowUpRight size={14} /></a>
      </footer>

      {galleryIndex !== null && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label="Full-screen performance gallery">
          <button type="button" className="gallery-modal-backdrop" onClick={() => setGalleryIndex(null)} aria-label="Close gallery" />
          <div className="gallery-modal-card">
            <button type="button" ref={modalCloseRef} className="gallery-modal-close" onClick={() => setGalleryIndex(null)} aria-label="Close gallery"><X size={18} /></button>
            <div className="gallery-modal-image-wrap">
              <img src={galleryItems[galleryIndex].image} alt={`${galleryItems[galleryIndex].act} performance: ${galleryItems[galleryIndex].title}`} />
              <span>{String(galleryIndex + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}</span>
            </div>
            <div className="gallery-modal-copy">
              <p className="eyebrow"><span /> {galleryItems[galleryIndex].act}</p>
              <h2>{galleryItems[galleryIndex].title}</h2>
              <p>{galleryItems[galleryIndex].caption}</p>
              <div className="gallery-modal-controls">
                <button type="button" onClick={() => setGalleryIndex((index) => index === null ? 0 : (index - 1 + galleryItems.length) % galleryItems.length)} aria-label="Previous image"><ChevronLeft size={18} /></button>
                <button type="button" onClick={() => setGalleryIndex((index) => index === null ? 0 : (index + 1) % galleryItems.length)} aria-label="Next image"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
