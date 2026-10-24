
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiArrowDown,
  FiStar,
} from "react-icons/fi";
import "./ScrollCinematicHero.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollCinematicHero({ onNavigate }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);

  const openingRef = useRef(null);
  const middleRef = useRef(null);
  const endingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;

    video.addEventListener("error", () => {
  console.error("Hero video error:", video.error);
});

video.addEventListener("loadeddata", () => {
  console.log("Hero first frame loaded");
});

video.addEventListener("canplay", () => {
  console.log("Hero video can play");
});

    if (!section || !stage || !video) return;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let ctx;
    let disposed = false;

    const setup = () => {
      if (disposed) return;

      // Clean up any previous timeline before rebuilding.
      ctx?.revert();
      ctx = undefined;

      section.classList.toggle(
        "cinematic-hero--static",
        motionQuery.matches
      );

      if (motionQuery.matches) {
        // video.pause();
        // video.currentTime = 0;
        return;
      }

      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }

      ctx = gsap.context(() => {
        const opening = openingRef.current;
        const middle = middleRef.current;
        const ending = endingRef.current;

        gsap.set(opening, { autoAlpha: 1, y: 0 });
        gsap.set(middle, { autoAlpha: 0, y: 28 });
        gsap.set(ending, { autoAlpha: 0, y: 28 });

        video.pause();
        video.currentTime = 0;

        const timeline = gsap.timeline({
  defaults: { ease: "none" },
  scrollTrigger: {
    trigger: section,
    pin: stage,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.4,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  },
});

        // One continuous timeline controls both the video and text.
//         timeline.to(
//   video,
//   {
//     currentTime: video.duration,
//     duration: 1,
//     ease: "none",
//   },
//   0
// );

        timeline.to(
          opening,
          {
            autoAlpha: 0,
            y: -24,
            duration: 0.1,
          },
          0.16
        );

        timeline.to(
          middle,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.08,
          },
          0.34
        );

        timeline.to(
          middle,
          {
            autoAlpha: 0,
            y: -20,
            duration: 0.08,
          },
          0.57
        );

        timeline.to(
          ending,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.1,
          },
          0.72
        );
      }, section);

      ScrollTrigger.refresh();
    };


let videoInitialized = false;

const handleVideoReady = async () => {
  if (
    videoInitialized ||
    disposed ||
    video.readyState < 2 ||
    !Number.isFinite(video.duration) ||
    video.duration <= 0
  ) {
    return;
  }

  videoInitialized = true;

  try {
    // await video.play();
    // video.pause();
    // video.currentTime = 0;
  } catch (error) {
    console.warn("Hero video warm-up failed:", error);
  }

  if (!disposed) {
    setup();
  }
};

video.addEventListener("loadedmetadata", handleVideoReady);
video.addEventListener("loadeddata", handleVideoReady);
motionQuery.addEventListener("change", setup);

if (video.readyState >= 2) {
  handleVideoReady();
}

video.addEventListener("loadedmetadata", handleVideoReady);
video.addEventListener("loadeddata", handleVideoReady);
    motionQuery.addEventListener("change", setup);

    if (video.readyState >= 1 && video.duration > 0) {
      setup();
    }

    return () => {
      disposed = true;
      video.removeEventListener("loadedmetadata", handleVideoReady);
video.removeEventListener("loadeddata", handleVideoReady);
      motionQuery.removeEventListener("change", setup);
      ctx?.revert();
      section.classList.remove("cinematic-hero--static");
    };
  }, []);

  const navigate = (id) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="cinematic-hero"
      aria-label="Discover Zanelisiwe Events"
    >
      <div className="cinematic-stage" ref={stageRef}>
        {/* <video
          ref={videoRef}
          className="cinematic-video"
          src="/hero-scrub.mp4"
          poster="/images/pic1.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        /> */}


<video
  ref={videoRef}
  className="cinematic-video"
  src="/hero-scrub.mp4"
  poster="/images/pic1.jpg"
  muted
  playsInline
  autoPlay
  loop
  preload="auto"
  aria-hidden="true"
  tabIndex={-1}
/>

        <div className="cinematic-overlay" aria-hidden="true" />
        <div className="cinematic-grain" aria-hidden="true" />

        {/* Opening state */}
        <div
          className="cinematic-copy cinematic-copy--opening"
          ref={openingRef}
        >
          <span className="cinematic-eyebrow">
            <FiStar size={12} />
            Haute Eventing · For People with Exquisite Taste
          </span>

          <h1>
            Every detail.
            <br />
            Every moment.
            <br />
            <em>Beautifully remembered.</em>
          </h1>

          <p className="cinematic-description">
            Professional planning, exquisite décor, and unforgettable
            experiences across Gauteng and Mpumalanga.
          </p>

          <div className="cinematic-actions">
            <button
              className="cinematic-cta cinematic-cta--gold"
              onClick={() => navigate("contact")}
            >
              Plan your event <FiArrowRight />
            </button>

            <button
              className="cinematic-cta cinematic-cta--outline"
              onClick={() => navigate("portfolio")}
            >
              Explore our work <FiArrowUpRight />
            </button>
          </div>
        </div>

        {/* Middle state */}
        <div
          className="cinematic-copy cinematic-copy--middle"
          ref={middleRef}
          aria-hidden="true"
        >
          <span className="cinematic-eyebrow">
            THE ART OF CELEBRATION
          </span>

          <h2>
            Your vision.
            <br />
            <em>Our creativity.</em>
          </h2>

          <p className="cinematic-description">
            Every detail considered. Every moment created with intention.
          </p>
        </div>

        {/* Final state */}
        <div
          className="cinematic-copy cinematic-copy--ending"
          ref={endingRef}
        >
          <span className="cinematic-eyebrow">
            LET'S MAKE IT MEMORABLE
          </span>

          <h2>
            Your story,
            <br />
            <em>beautifully celebrated.</em>
          </h2>

          <p className="cinematic-description">
            From the first idea to the final detail, let's create
            something that feels unmistakably yours.
          </p>

          <button
            className="cinematic-cta cinematic-cta--gold"
            onClick={() => navigate("contact")}
          >
            Start planning <FiArrowRight />
          </button>
        </div>

        <div className="cinematic-footer">
          <span>EVENTS, THOUGHTFULLY REIMAGINED</span>

          <button
            className="cinematic-scroll-cue"
            onClick={() => navigate("about")}
            aria-label="Continue to About"
          >
            SCROLL TO DISCOVER <FiArrowDown />
          </button>
        </div>
      </div>
    </section>
  );
}
