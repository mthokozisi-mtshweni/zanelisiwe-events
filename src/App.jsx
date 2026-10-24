import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  FiArrowRight, FiArrowUpRight, FiArrowDown, FiMenu, FiX,
  FiMapPin, FiMail, FiInstagram, FiFacebook, FiStar, FiCheck,
  FiHeart, FiFeather, FiMessageCircle, FiSend, FiArrowLeft
} from "react-icons/fi";

import ScrollCinematicHero from "./components/ScrollCinematicHero";

// import SecondHero from "./components/SecondHero";

/* ------------------------------------------------------------------ */
/*  BRAND                                                              */
/* ------------------------------------------------------------------ */
const BRAND = {
  whatsapp: "", // e.g. "27721234567"
  email: "",    // e.g. "hello@zanelisiweevents.co.za"
  phone: "+27 00 000 0000",
  address: "Gauteng & Mpumalanga, South Africa"
};

const IMAGES = {
  hero: "/hero.mp4",
  wedding:     "/images/pic1.jpg",
  birthday:    "/images/pic2.jpg",
  baby:        "/images/pic3.jpg",
  bridal:      "/images/pic4.png",
  traditional: "/images/pic5.png",
  corporate:   "/images/pic6.png",
  table:       "/images/pic7.png",
  flowers:     "/images/pic8.png",
  tradition:   "/images/tradition.png"
};

const EVENTS = [
  // Weddings (2)
  { title: "Timeless Weddings", category: "Weddings", image: IMAGES.wedding, text: "Romantic, elegant, unforgettable." },
  { title: "Reception Styling", category: "Weddings", image: IMAGES.table, text: "Tablescapes designed for the moment." },

  // Birthdays (2)
  { title: "Birthday Celebrations", category: "Birthdays", image: IMAGES.birthday, text: "Celebrate in your own style." },
  { title: "Milestone Florals", category: "Birthdays", image: IMAGES.flowers, text: "Marking the years with beauty." },

  // Baby Showers (2)
  { title: "Baby Showers", category: "Baby showers", image: IMAGES.baby, text: "Little moments. Big joy." },
  { title: "Soft Arrivals", category: "Baby showers", image: IMAGES.bridal, text: "Gentle tones for a sweet welcome." },

  // Bridal Showers (2)
  { title: "Bridal Showers", category: "Bridal showers", image: IMAGES.bridal, text: "A beautiful start to forever." },
  { title: "Before the Vows", category: "Bridal showers", image: IMAGES.table, text: "An intimate gathering before the day." },

  // Traditional (2)
  { title: "Traditional Celebrations", category: "Traditional", image: IMAGES.traditional, text: "Honour your heritage." },
  { title: "Heritage Ceremonies", category: "Traditional", image: IMAGES.tradition, text: "Rooted in culture and love." },

  // Corporate (2)
  { title: "Corporate Events", category: "Corporate", image: IMAGES.corporate, text: "Professional. Polished. Memorable." },
  { title: "Brand Experiences", category: "Corporate", image: IMAGES.wedding, text: "Events that tell your story." }
];

const SERVICES = [
  {
    num: "01",
    title: "Event Planning & Coordination",
    tag: "Most Popular",
    image: IMAGES.wedding,
    video: "/Event.mp4",   // ← add yours, or delete the line
    text: "Complete planning from concept to cleanup. Venue selection, vendor management, timeline coordination, and professional day-of execution."
  },
  {
    num: "02",
    title: "Traditional ceremony",
    tag: "Full Inventory",
    image: IMAGES.tradition,
    video: "/Tradition.mp4",
    text: "Quality furniture and elegant décor at accessible prices. Extensive inventory of chairs, tables, linens, and styling elements."
  },
  {
    num: "03",
    title: "Wedding Coordination",
    tag: "Premium Service",
    image: IMAGES.bridal,
    video: "/wedding.mp4",
    text: "From intimate ceremonies to dream celebrations. Professional planning, beautiful décor, and seamless execution."
  },
  {
    num: "04",
    title: "Corporate Events",
    tag: "B2B Specialists",
    image: IMAGES.corporate,
    video: "/Corporate.mp4",
    text: "Professional event management for business functions, conferences, product launches, year-end functions, and film production."
  }
];

const STATS = [
  { value: "14",   suffix: "+",  label: "Years of Excellence" },
  { value: "1,000", suffix: "s",  label: "Happy Memories Created" },
  { value: "100",  suffix: "K+", label: "Growing Social Audience" },
  { value: "4.6",  suffix: "★",  label: "Google Rating" }
];

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Process", id: "process" },
  { label: "Contact", id: "contact" }
];


const REVIEWS = [
  {
    quote: "From the first conversation to the final detail, everything felt considered. Our guests are still talking about the room.",
    name: "Naledi M.",
    event: "Wedding · Johannesburg",
    rating: 5
  },
  {
    quote: "Zanelisiwe Events took every idea we had and made it feel warm, cohesive, and completely ours.",
    name: "Thandeka K.",
    event: "Traditional · Pretoria",
    rating: 5
  },
  {
    quote: "Professional, calm, and deeply thoughtful. The day ran beautifully — we didn't have to worry about a thing.",
    name: "Sipho & Lerato",
    event: "Wedding · Mpumalanga",
    rating: 5
  },
  {
    quote: "The décor was exactly what we envisioned — elegant, warm, and full of personal touches we didn't even know we needed.",
    name: "Zanele D.",
    event: "Bridal Shower · Sandton",
    rating: 5
  },
  {
    quote: "Our corporate year-end function was flawless. Every detail was handled with care and the team was a joy to work with.",
    name: "Mandla N.",
    event: "Corporate · Midrand",
    rating: 5
  },
  {
    quote: "They listened to what we wanted and delivered something even better. Truly thoughtful, truly personal.",
    name: "Ayanda B.",
    event: "Birthday · Soweto",
    rating: 5
  }
];

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */
function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ */
/*  UI PIECES                                                          */
/* ------------------------------------------------------------------ */
function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${p / 100})` }} />;
}

function Header({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 👇 ADD THIS NEW EFFECT
  useEffect(() => {
    document.body.classList.toggle("drawer-open", open);
    return () => document.body.classList.remove("drawer-open");
  }, [open]);
  
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <button className="brand" onClick={() => onNavigate("home")} aria-label="Zanelisiwe Events home">
          <span className="brand-mark">Z<span>✧</span></span>
          <span className="brand-name">ZANELISIWE<small>EVENTS</small></span>
        </button>

        <button className="mobile-toggle" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>


        <nav className={`nav ${open ? "nav-open" : ""}`}>
          {NAV_LINKS.map(({ label, id }) => (
            <button key={id} className="nav-link" onClick={() => { onNavigate(id); setOpen(false); }}>
              {label}
            </button>
          ))}
          <button className="button button-gold nav-cta" onClick={() => { onNavigate("contact"); setOpen(false); }}>
            Get a quote <FiArrowUpRight size={15} />
          </button>
        </nav>
      </div>
    </header>
  );
}

function SectionHeading({ eyebrow, title, text, center = true }) {
  return (
    <div className={`section-heading ${center ? "center" : ""}`} data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTIONS                                                           */
/* ------------------------------------------------------------------ */
// function Hero({ onNavigate }) {
//   return (
//     <section id="home" className="hero">
//       <div className="hero-bg" style={{ backgroundImage: `url("${IMAGES.hero}")` }} />
//       <div className="hero-overlay" />

//       <div className="hero-content">
//         <span className="hero-tag" data-reveal>
//           <FiStar size={12} /> Haute Eventing · For People with Exquisite Taste
//         </span>

//         <h1 data-reveal style={{ "--reveal-delay": "120ms" }}>
//           Every detail.<br />
//           Every moment.<br />
//           <em>Beautifully remembered.</em>
//         </h1>

//         <p data-reveal style={{ "--reveal-delay": "240ms" }}>
//           Professional planning, exquisite décor, and unforgettable experiences
//           across Gauteng and Mpumalanga.
//         </p>

//         <div className="hero-actions" data-reveal style={{ "--reveal-delay": "360ms" }}>
//           <button className="button button-gold" onClick={() => onNavigate("contact")}>
//             Plan your event <FiArrowRight size={16} />
//           </button>
//           <button className="button button-ghost" onClick={() => onNavigate("portfolio")}>
//             Explore our work
//           </button>
//         </div>
//       </div>


     

//       <button className="scroll-cue" onClick={() => onNavigate("about")} aria-label="Scroll down">
//         <FiArrowDown size={16} />
//       </button>
//     </section>
//   );
// }

function Hero({ onNavigate }) {

  useEffect(() => {
  const onScroll = () => {
    const cue = document.querySelector(".scroll-cue");
    if (cue) cue.classList.toggle("is-visible", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  return (
    <section id="home" className="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={IMAGES.hero} type="video/mp4" />
      </video>
      <div className="hero-overlay" />

      <div className="hero-content">
        {/* ...existing hero content... */}
        <div className="hero-content">
        <span className="hero-tag" data-reveal>
          <FiStar size={12} /> Haute Eventing · For People with Exquisite Taste
        </span>

        <h1 data-reveal style={{ "--reveal-delay": "120ms" }}>
          Every detail.<br />
          Every moment.<br />
          <em>Beautifully remembered.</em>
        </h1>

        <p data-reveal style={{ "--reveal-delay": "240ms" }}>
          Professional planning, exquisite décor, and unforgettable experiences
          across Gauteng and Mpumalanga.
        </p>

       <div className="hero-actions" data-reveal style={{ "--reveal-delay": "360ms" }}>
        <button className="hero-btn hero-btn-primary" onClick={() => onNavigate("contact")}>
          <span>Plan your event</span>
          <FiArrowRight size={16} className="btn-icon" />
        </button>
        <button className="hero-btn hero-btn-secondary" onClick={() => onNavigate("portfolio")}>
          <span>Explore our work</span>
          <FiArrowUpRight size={16} className="btn-icon" />
        </button>
      </div>
      </div>
      </div>

      <button className="scroll-cue" onClick={() => onNavigate("about")} aria-label="Scroll down">
        <FiArrowDown size={16} />
      </button>
    </section>
  );


  
}

// function StatsBand() {
//   return (
//     <section className="stats-band" aria-label="Our track record">
//       <div className="stats-inner">
//         {STATS.map((s, i) => (
//           <div
//             className="stat-item"
//             key={s.label}
//             data-reveal
//             style={{ "--reveal-delay": `${i * 90}ms` }}
//           >
//             <div className="stat-value-row">
//               <span className="stat-value">{s.value}</span>
//               <span className="stat-suffix">{s.suffix}</span>
//             </div>
//             <span className="stat-label">{s.label}</span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

function About({ navigate }) {
  return (
    <section id="about" className="about">
      <div className="about-grid">
        {/* Image composition — slides in from the LEFT */}
        <div className="about-visual" data-reveal="left">
          <div className="about-image-main">
            <img
              src={IMAGES.wedding}
              alt="Elegant wedding reception styling by Zanelisiwe Events"
              loading="lazy"
            />
          </div>
          <div className="about-image-detail">
            <img
              src={IMAGES.table}
              alt="Considered table setting and centrepiece detail"
              loading="lazy"
            />
          </div>
        </div>

        {/* Copy — each line slides in from the RIGHT, staggered */}
        <div className="about-copy">
          <span className="kicker" data-reveal="right">Our Story</span>
          <h2 data-reveal="right" style={{ "--reveal-delay": "100ms" }}>
            A studio built on<br />
            <em>listening first.</em>
          </h2>
          <p data-reveal="right" style={{ "--reveal-delay": "180ms" }}>
            Zanelisiwe Events is a planning and décor studio creating
            celebrations for people who want their day to feel personal —
            not pulled from a template.
          </p>
          <p data-reveal="right" style={{ "--reveal-delay": "240ms" }}>
            We start with your story — your people, your place, the details
            that matter to you — and shape a day that feels warm, cohesive,
            and unmistakably yours.
          </p>

          <blockquote className="about-quote" data-reveal="right" style={{ "--reveal-delay": "320ms" }}>
            “Every celebration we touch<br />
            should feel like the people it's for.”
          </blockquote>

          <button
            className="link-arrow"
            onClick={() => navigate("contact")}
            data-reveal="right"
            style={{ "--reveal-delay": "400ms" }}
          >
            Work with us <FiArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Services({ onNavigate }) {
  const videoRefs = useRef({});
  const activeRef = useRef(null);
  const tokenRef = useRef(0);
  const readyRef = useRef({});
  const [activeIndex, setActiveIndex] = useState(null);

  // Pre-warm videos on mount — decode frames so first hold is instant
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([idx, v]) => {
      if (!v) return;
      const warm = () => {
        try {
          v.muted = true;
          v.currentTime = 0;
          const p = v.play();
          if (p?.then) {
            p.then(() => {
              v.pause();
              v.currentTime = 0;
              readyRef.current[idx] = true;
            }).catch(() => {});
          } else {
            v.pause();
            v.currentTime = 0;
            readyRef.current[idx] = true;
          }
        } catch {}
      };
      if (v.readyState >= 2) warm();
      else v.addEventListener("loadeddata", warm, { once: true });
    });
  }, []);

  const pauseVideo = (i) => {
    const v = videoRefs.current[i];
    if (!v) return;
    try {
      v.pause();
      v.currentTime = 0;
    } catch {}
  };

  const activate = async (i) => {
    const v = videoRefs.current[i];
    if (!v) return;

    if (activeRef.current !== null && activeRef.current !== i) {
      pauseVideo(activeRef.current);
    }

    activeRef.current = i;
    const token = ++tokenRef.current;

    v.currentTime = 0;
    try {
      await v.play();
    } catch {
      if (tokenRef.current === token) activeRef.current = null;
      return;
    }

    const start = Date.now();
    const painted = await new Promise((resolve) => {
      const check = () => {
        if (tokenRef.current !== token || activeRef.current !== i) {
          return resolve(false);
        }
        if (v.videoWidth > 0 && v.readyState >= 2 && v.currentTime > 0.03) {
          return resolve(true);
        }
        if (Date.now() - start > 3000) {
          return resolve(false);
        }
        requestAnimationFrame(check);
      };
      check();
    });

    if (tokenRef.current !== token || activeRef.current !== i) return;

    if (painted) {
      setActiveIndex(i);
    } else {
      pauseVideo(i);
      activeRef.current = null;
    }
  };

  const deactivate = () => {
    tokenRef.current += 1;
    if (activeRef.current !== null) pauseVideo(activeRef.current);
    activeRef.current = null;
    setActiveIndex(null);
  };

  const onPointerDown = (e, i) => {
    if (e.pointerType === "mouse") return;
    if (e.target.closest(".block-cta")) return;
    activate(i);
  };

  const onPointerUp = (e) => {
    if (e.pointerType === "mouse") return;
    deactivate();
  };

  return (
    <section id="services" className="services">
      <div className="services-header">
        <span className="kicker" data-reveal>Complete Event Solutions</span>
        <h2 data-reveal style={{ "--reveal-delay": "100ms" }}>
          Four ways we can<br />
          <em>shape your day.</em>
        </h2>
      </div>

      <div className="services-blocks">
        {SERVICES.map((s, i) => (
          <article
            key={s.title}
            className={`service-block ${activeIndex === i ? "is-active" : ""}`}
            onPointerDown={(e) => onPointerDown(e, i)}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover)").matches) activate(i);
            }}
            onMouseLeave={() => {
              if (window.matchMedia("(hover: hover)").matches) deactivate();
            }}
            tabIndex={0}
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` }}
          >
            <div className="block-media">
              <img src={s.image} alt={s.title} loading="lazy" />
              {s.video && (
                <video
                  ref={(el) => { if (el) videoRefs.current[i] = el; }}
                  src={s.video}
                  poster={s.image}
                  muted
                  playsInline
                  preload="auto"
                  onError={() => { readyRef.current[i] = false; }}
                  onEnded={deactivate}
                  aria-hidden="true"
                />
              )}
            </div>

            <div className="block-overlay" />

            <div className="block-content">
              <div className="block-top">
                <span className="block-num">{s.num}</span>
                {s.tag && <span className="block-tag">{s.tag}</span>}
              </div>
              <div className="block-bottom">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <button
                  type="button"
                  className="block-cta"
                  onClick={(e) => { e.stopPropagation(); onNavigate("contact"); }}
                >
                  Enquire <FiArrowRight size={15} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const categories = ["All", "Weddings", "Birthdays", "Baby showers", "Bridal showers", "Traditional", "Corporate"];
  const filtered = useMemo(
    () => filter === "All" ? EVENTS : EVENTS.filter((e) => e.category === filter),
    [filter]
  );

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="portfolio" className="portfolio section-pad">
      <SectionHeading
        eyebrow="Our Work"
        title={<>Creating beautiful<br /><em>moments.</em></>}
        text="Fresh from our portfolio — real events, real moments."
      />

      <div className="filter-row" data-reveal>
        {categories.map((c) => (
          <button
            key={c}
            className={`filter-chip ${filter === c ? "selected" : ""}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {filtered.map((e, i) => (
  <button
    className="portfolio-item"
    key={`${filter}-${e.title}`}
    onClick={() => setLightbox(e)}
    style={{ "--reveal-delay": `${i * 60}ms` }}
  >
            <img src={e.image} alt={e.title} loading="lazy" />
            <span className="portfolio-overlay">
              <small>{e.category}</small>
              <strong>{e.title}</strong>
              <FiArrowUpRight size={18} />
            </span>
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
            <FiX size={22} />
          </button>
          <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image} alt={lightbox.title} />
            <div>
              <span className="eyebrow">{lightbox.category}</span>
              <h2>{lightbox.title}</h2>
              <p>{lightbox.text}</p>
              <button className="button button-gold" onClick={() => { setLightbox(null); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                Plan something similar <FiArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Reviews() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardStep, setCardStep] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(null);

  // Resize-aware visible count
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCount(w <= 700 ? 1 : w <= 1080 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Measure card + gap step
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector(".review-card");
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
      setCardStep(card.offsetWidth + gap);
    };
    const id = setTimeout(measure, 60);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", measure);
    };
  }, [visibleCount]);

  const maxIndex = Math.max(0, REVIEWS.length - visibleCount);

  useEffect(() => {
    setActiveIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const slide = (dir) => {
    setActiveIndex((i) => Math.max(0, Math.min(maxIndex, i + dir)));
  };

  const goTo = (i) => setActiveIndex(Math.min(i, maxIndex));

  // Drag handlers
  const onPointerDown = (e) => {
    dragStartX.current = e.clientX;
    setIsDragging(true);
  };
  const onPointerMove = (e) => {
    if (dragStartX.current === null) return;
    setDragOffset(e.clientX - dragStartX.current);
  };
  const endDrag = () => {
    if (dragStartX.current === null) return;
    const drag = dragOffset;
    dragStartX.current = null;
    setIsDragging(false);
    setDragOffset(0);
    if (Math.abs(drag) > 60) {
      slide(drag < 0 ? 1 : -1);
    }
  };

  const atEnd = activeIndex >= maxIndex;
  const canPrev = activeIndex > 0;
  const translateX = -activeIndex * cardStep + (isDragging ? dragOffset : 0);

  return (
    <section id="reviews" className="reviews">
      <div className="reviews-header">
        <div className="reviews-header-left">
          <span className="kicker">Client Stories</span>
          <h2>
            Words that<br />
            <em>stayed with us.</em>
          </h2>
        </div>

        <div className="reviews-header-right">
          <div className="reviews-counter">
            <span className="reviews-counter-current">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="reviews-counter-divider">/</span>
            <span className="reviews-counter-total">
              {String(maxIndex + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="reviews-nav">
            <button
              className="reviews-nav-btn"
              onClick={() => slide(-1)}
              disabled={!canPrev}
              aria-label="Previous"
            >
              <FiArrowLeft size={18} />
            </button>
            <button
              className="reviews-nav-btn"
              onClick={() => slide(1)}
              disabled={atEnd}
              aria-label="Next"
            >
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={`reviews-clip ${atEnd ? "is-end" : ""}`}>
        <div
          ref={trackRef}
          className="reviews-track"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isDragging
              ? "none"
              : "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
        >
          {REVIEWS.map((r, i) => {
            const initials = r.name
              .split(" ")
              .filter(Boolean)
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <article
                key={i}
                className={`review-card ${i === activeIndex ? "is-active" : ""}`}
              >
                <span className="review-quote-mark" aria-hidden="true">"</span>

                <p className="review-text">{r.quote}</p>

                <div className="review-meta-row">
                  <div className="review-avatar" aria-hidden="true">
                    {initials}
                  </div>
                  <div className="review-user">
                    <div className="review-user-row">
                      <span className="review-name">{r.name}</span>
                      <span className="review-verified">✓</span>
                    </div>
                    <span className="review-event">{r.event}</span>
                  </div>
                  <div className="review-stars">
                    {Array.from({ length: r.rating }).map((_, n) => (
                      <FiStar key={n} size={10} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <div className="review-footer">
                  <span className="review-footer-likes">
                    <FiHeart size={11} fill="currentColor" />{" "}
                    {18 + i * 7} people found this helpful
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="reviews-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={`reviews-dot ${i === activeIndex ? "is-active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to position ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { num: "01", title: "The Conversation", text: "Tell us about your occasion, what you have in mind, your date, and the details that matter most." },
    { num: "02", title: "The Concept", text: "We discuss the look, services, and practical requirements that fit your vision and budget." },
    { num: "03", title: "The Planning", text: "Once the proposal is agreed, we work through the details and align the plan for your event." },
    { num: "04", title: "The Styling", text: "We bring the chosen look together through considered décor and coordinated details." },
    { num: "05", title: "The Celebration", text: "Enjoy your special moment, knowing every detail has been planned with care." }
  ];

  return (
    <section id="process" className="process">
      <div className="process-header">
        <span className="kicker" data-reveal>How We Work</span>
        <h2 data-reveal style={{ "--reveal-delay": "100ms" }}>
          From your vision<br />
          <em>to your occasion.</em>
        </h2>
        <p data-reveal style={{ "--reveal-delay": "180ms" }}>
          A clear, collaborative process from first conversation to celebration.
        </p>
      </div>

      <div className="process-rail">
        {steps.map((s, i) => (
          <div
            className="process-step"
            key={s.num}
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` }}
          >
            <div className="step-marker">
              <span className="step-num">{s.num}</span>
            </div>
            <div className="step-body">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="process-footer" data-reveal>
        <p>Every step is designed so you feel informed, in control,<br />and free to enjoy the moment.</p>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", eventType: "", eventDate: "",
    location: "", guests: "", budget: "", services: [], details: ""
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState("");
  const [copied, setCopied] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const toggleService = (s) =>
    setForm((p) => ({
      ...p,
      services: p.services.includes(s) ? p.services.filter((x) => x !== s) : [...p.services, s]
    }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.eventType) e.eventType = "Required";
    if (!form.location.trim()) e.location = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    setStatus("");
    setPrepared("");
    setCopied(false);
    if (!validate()) { setStatus("Please review the highlighted fields."); return; }

    const subject = encodeURIComponent(`Enquiry — ${form.eventType} | ${form.name}`);
    const body = encodeURIComponent(
      `Zanelisiwe Events enquiry\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "—"}\n` +
      `Event: ${form.eventType}\nDate: ${form.eventDate || "TBC"}\nLocation: ${form.location}\n` +
      `Guests: ${form.guests || "TBC"}\nBudget: ${form.budget || "To discuss"}\n` +
      `Services: ${form.services.join(", ") || "To discuss"}\n\nDetails:\n${form.details || "—"}`
    );

    if (BRAND.email) {
      window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
      setStatus("Your email app should open with the enquiry ready to send.");
    } else {
      setPrepared(`Subject: ${decodeURIComponent(subject)}\n\n${decodeURIComponent(body)}`);
      setStatus("Your enquiry is ready below — copy it or send via WhatsApp once a number is added.");
    }
  };

  const copyPrepared = () => {
    if (!prepared) return;
    navigator.clipboard?.writeText(prepared);
    setCopied(true);
    setStatus("Enquiry copied to clipboard.");
  };

  const whatsappMsg = encodeURIComponent(
    `Hi Zanelisiwe Events! I'd like to enquire about an event.\nName: ${form.name || "—"}\nEvent: ${form.eventType || "TBC"}`
  );
  const whatsUrl = BRAND.whatsapp ? `https://wa.me/${BRAND.whatsapp}?text=${whatsappMsg}` : "";

  return (
    <section id="contact" className="contact">
      <div className="contact-head" data-reveal>
        <span className="kicker">Start the conversation</span>
        <h2>Tell us about<br /><em>your celebration.</em></h2>
      </div>

      <div className="contact-grid">
        {/* ---- Info column ---- */}
        <div className="contact-info" data-reveal="left">
          <div className="contact-info-header">
            <span className="kicker">Prefer to talk directly?</span>
            <h3>Reach us through<br /><em>whichever feels best.</em></h3>
            <p>Whether by message, email, or a quick call — we'd love to hear from you.</p>
          </div>

          <div className="contact-methods-list">
            <div className="contact-method">
              <span className="method-num">01</span>
              <div className="contact-method-body">
                <h4>WhatsApp</h4>
                <p>{BRAND.whatsapp ? "Send a message and we'll reply within the day." : "Number to be confirmed."}</p>
                {BRAND.whatsapp && (
                  <a href={whatsUrl} target="_blank" rel="noreferrer">
                    Chat now <FiArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>

            <div className="contact-method">
              <span className="method-num">02</span>
              <div className="contact-method-body">
                <h4>Email</h4>
                <p>{BRAND.email || "Email to be confirmed."}</p>
                {BRAND.email && (
                  <a href={`mailto:${BRAND.email}`}>
                    Send an email <FiArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>

            <div className="contact-method">
              <span className="method-num">03</span>
              <div className="contact-method-body">
                <h4>Where we work</h4>
                <p>Gauteng &amp; Mpumalanga, South Africa.</p>
              </div>
            </div>
          </div>

          <div className="response-note">
            <strong>We respond within 48 hours</strong>
            <p>Every enquiry receives a personal reply — usually much sooner.</p>
          </div>
        </div>

        {/* ---- Form column ---- */}
        <form className="enquiry-form" onSubmit={submit} noValidate data-reveal="right" style={{ "--reveal-delay": "120ms" }}>

          {/* Section 01 — About you */}
          <div className="form-section">
            <div className="form-section-head">
              <span className="section-num">01</span>
              <div>
                <h4>About you</h4>
                <p>So we know who we're speaking with.</p>
              </div>
            </div>
            <div className="form-section-fields">
              <label className="span-2">
                Full name *
                <input name="name" value={form.name} onChange={update} placeholder="Your full name" className={errors.name ? "has-error" : ""} />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </label>
              <label>
                Email address *
                <input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" className={errors.email ? "has-error" : ""} />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </label>
              <label>
                Phone / WhatsApp
                <input name="phone" value={form.phone} onChange={update} placeholder="+27 ..." />
              </label>
            </div>
          </div>

          {/* Section 02 — Your event */}
          <div className="form-section">
            <div className="form-section-head">
              <span className="section-num">02</span>
              <div>
                <h4>Your event</h4>
                <p>The details you know so far — the rest can come later.</p>
              </div>
            </div>
            <div className="form-section-fields">
              <label>
                Event type *
                <select name="eventType" value={form.eventType} onChange={update} className={errors.eventType ? "has-error" : ""}>
                  <option value="">Choose an event</option>
                  {["Wedding", "Birthday", "Baby shower", "Bridal shower", "Traditional", "Corporate", "Other"].map((o) => <option key={o}>{o}</option>)}
                </select>
                {errors.eventType && <span className="field-error">{errors.eventType}</span>}
              </label>
              <label>
                Event date
                <input name="eventDate" type="date" value={form.eventDate} onChange={update} />
              </label>
              <label className="span-2">
                Location *
                <input name="location" value={form.location} onChange={update} placeholder="Town or venue" className={errors.location ? "has-error" : ""} />
                {errors.location && <span className="field-error">{errors.location}</span>}
              </label>
              <label>
                Guests
                <select name="guests" value={form.guests} onChange={update}>
                  <option value="">Not sure yet</option>
                  <option>Under 30</option>
                  <option>30–60</option>
                  <option>61–100</option>
                  <option>101–200</option>
                  <option>200+</option>
                </select>
              </label>
              <label>
                Budget
                <select name="budget" value={form.budget} onChange={update}>
                  <option value="">Prefer to discuss</option>
                  <option>Under R5,000</option>
                  <option>R5,000–R15,000</option>
                  <option>R15,000–R30,000</option>
                  <option>R30,000–R60,000</option>
                  <option>R60,000+</option>
                </select>
              </label>
            </div>
          </div>

          {/* Section 03 — Details */}
          <div className="form-section">
            <div className="form-section-head">
              <span className="section-num">03</span>
              <div>
                <h4>Tell us more</h4>
                <p>What would you like help with, and anything else we should know.</p>
              </div>
            </div>
            <div className="form-section-fields">
              <fieldset className="service-checks span-2">
                <legend>What would you like help with?</legend>
                <div>
                  {["Event planning", "Décor & styling", "Venue setup", "Coordination", "Not sure yet"].map((s) => (
                    <label className="check-label" key={s}>
                      <input type="checkbox" checked={form.services.includes(s)} onChange={() => toggleService(s)} />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="span-2">
                Anything else we should know?
                <textarea name="details" value={form.details} onChange={update} rows={4} placeholder="Your theme, colours, ideas, or anything else…" />
              </label>
            </div>
          </div>

          {status && <div className={`form-status ${status.startsWith("Please") ? "form-error" : ""}`}>{status}</div>}

          {prepared && (
            <div className="prepared-email">
              <textarea readOnly value={prepared} />
              <button type="button" className="copy-btn" onClick={copyPrepared}>
                {copied ? "Copied ✓" : "Copy details"}
              </button>
            </div>
          )}

          <button className="submit-btn" type="submit">
            <span>Send enquiry</span>
            <FiArrowRight size={15} />
          </button>
          <p className="form-privacy">Your details are only used to respond to this enquiry — never shared.</p>
        </form>
      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <button className="brand brand-light" onClick={() => onNavigate("home")}>
            <span className="brand-mark">Z<span>✧</span></span>
            <span className="brand-name">ZANELISIWE<small>EVENTS</small></span>
          </button>
          <p className="footer-note">Haute eventing for people<br />with exquisite taste.</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          {NAV_LINKS.map(({ label, id }) => (
            <button key={id} className="footer-link" onClick={() => onNavigate(id)}>{label}</button>
          ))}
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <a href={`mailto:${BRAND.email || "#"}`} className="footer-link"><FiMail size={14} /> Email us</a>
          <a href="#" className="footer-link"><FiInstagram size={14} /> Instagram</a>
          <a href="#" className="footer-link"><FiFacebook size={14} /> Facebook</a>
        </div>

        <div className="footer-cta">
          <span className="eyebrow">Your day, your way</span>
          <h3>Let's make something beautiful.</h3>
          <button className="button button-gold" onClick={() => onNavigate("contact")}>
            Start planning <FiArrowRight size={15} />
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Zanelisiwe Events. All rights reserved.</span>
        <span>Made for meaningful moments.</span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  useScrollReveal();

    const [heroMode, setHeroMode] = useState("cinematic");
  const navigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <ScrollProgress />
      <Header onNavigate={navigate} />

<main>
  {/* <ScrollCinematicHero onNavigate={navigate} /> */}

  
<div className="hero-test-switch">
  {/* <button
    onClick={() => setHeroMode("cinematic")}
    className={heroMode === "cinematic" ? "active" : ""}
  >
    Cinematic scroll
  </button> */}

  {/* <button
    onClick={() => setHeroMode("second")}
    className={heroMode === "second" ? "active" : ""}
  >
    Second video
  </button> */}
</div>

{heroMode === "cinematic" ? (
  <ScrollCinematicHero onNavigate={navigate} />
) : (
  <SecondHero onNavigate={navigate} />
)}


  <About navigate={navigate} />
  <Services onNavigate={navigate} />
  <Portfolio />
  <Reviews />
  <Process />
  <Contact />
</main>

      <Footer onNavigate={navigate} />
    </>
  );
}