'use client';

import { useEffect, useRef, useState } from "react";
import config from "../wedding.config.json";

function Reveal({ children, className = "" }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach(node => io.observe(node));
    return () => io.disconnect();
  }, []);
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Countdown({ date }) {
  const [remaining, setRemaining] = useState({});
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, new Date(date).getTime() - Date.now());
      setRemaining({
        Days: Math.floor(diff / 86400000),
        Hours: Math.floor(diff / 3600000) % 24,
        Minutes: Math.floor(diff / 60000) % 60,
        Seconds: Math.floor(diff / 1000) % 60
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [date]);
  return <div className="countdown">{Object.entries(remaining).map(([label, value]) =>
    <div className="count" key={label}><strong>{String(value ?? 0).padStart(2, "0")}</strong><small>{label}</small></div>
  )}</div>;
}

function WeddingAtmosphere() {
  return <div className="wedding-petals" aria-hidden="true">
    <span /><span /><span /><span /><span /><span />
  </div>;
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;

    const startOnLoad = () => {
      audio.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
    };

    startOnLoad();

    const enableAfterGesture = () => {
      if (audio.paused) startOnLoad();
    };
    window.addEventListener("pointerdown", enableAfterGesture, { once: true });
    window.addEventListener("keydown", enableAfterGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", enableAfterGesture);
      window.removeEventListener("keydown", enableAfterGesture);
    };
  }, []);

  const openInvitation = () => {
    if (opening || opened) return;
    setOpening(true);
    musicRef.current?.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpened(true);
      return;
    }
    window.setTimeout(() => setOpened(true), 1200);
  };

  const toggleMusic = () => {
    if (!musicRef.current) return;
    if (musicRef.current.paused) {
      musicRef.current.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
    } else {
      musicRef.current.pause();
      setMusicOn(false);
    }
  };

  return (
    <>
      <audio ref={musicRef} src="/wedding-music.mp3" loop preload="auto" autoPlay />
      {!opened ? (
        <main className={`cover${opening ? " is-opening" : ""}`}>
          <WeddingAtmosphere />
          <div className="cover-flower" aria-hidden="true">
            ✿
          </div>
          <p className="cover-kicker">A WEDDING INVITATION</p>
          <button
            className="envelope-button"
            onClick={openInvitation}
            disabled={opening}
            aria-label={`Open the wedding invitation for ${config.couple.bride} and ${config.couple.groom}`}
          >
            <span className="envelope" aria-hidden="true">
              <span className="envelope-back" />
              <span className="envelope-letter">
                <span className="letter-rule" />
                <span className="letter-names">
                  {config.couple.bride}
                  <i>&</i>
                  {config.couple.groom}
                </span>
                <span className="letter-caption">YOU ARE INVITED</span>
              </span>
              <span className="envelope-front" />
              <span className="envelope-flap" />
              <span className="wax">❧</span>
            </span>
            <span className="cover-names">
              {config.couple.bride} <i>&</i> {config.couple.groom}
            </span>
            <span className="tap">
              {opening ? "OPENING YOUR INVITATION" : "TAP THE ENVELOPE TO OPEN"}
            </span>
          </button>
          <span className="open-hint">
            A little invitation, a lifetime of memories
          </span>
        </main>
      ) : (
        <main className="invitation">
          <WeddingAtmosphere />
          <button className="back" onClick={() => setOpened(false)}>
            ← Back
          </button>
          <section className="hero">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster="/romantic-blush-palace.png"
            >
              <source src="/together-families-hero.mp4" type="video/mp4" />
            </video>
            <p className="eyebrow">TOGETHER WITH THEIR FAMILIES</p>
            <p className="invite-line">request the pleasure of your company</p>
            <h1>
              <span>{config.couple.bride}</span>
              <em>&</em>
              <span>{config.couple.groom}</span>
            </h1>
            <p className="date-line">{config.wedding.dateLabel}</p>
            <p className="place-line">{config.wedding.city}</p>
            <p className="scroll-note">SCROLL TO EXPLORE ↓</p>
          </section>

          <section className="couple section">
            <Reveal>
              <p className="eyebrow">WITH LOVE AND BLESSINGS</p>
              <h2>Meet the Couple</h2>
            </Reveal>
            <div className="couple-grid">
              <Reveal className="couple-card">
                <p className="couple-role">The Bride</p>
                <div className="portrait">
                  <div className="portrait-placeholder">♛</div>
                </div>
                <h3>Pallavi</h3>
                <p>
                  Daughter of Smt. Geetarani Sahoo &amp;
                  <br />
                  Shri Kanhu Charan Behera
                </p>
              </Reveal>
              <div className="couple-love" aria-label="Love symbol">
                <span>♥</span>
              </div>
              <Reveal className="couple-card">
                <p className="couple-role">The Groom</p>
                <div className="portrait">
                  <div className="portrait-placeholder">♚</div>
                </div>
                <h3>Lalit</h3>
                <p>
                  Son of Smt. Manjulata Behera &amp;
                  <br />
                  Shri Prasanta Kumar Majhi
                </p>
              </Reveal>
            </div>
            <Reveal className="couple-card couple-blessing">
              <p className="blessing">
                "Under the celestial canopy of love and divine grace, two hearts
                unite in sacred matrimony to walk as one forever."
              </p>
              <p className="family-compliments">
                — With Best Compliments From Families
              </p>
            </Reveal>
          </section>

          <section className="count-section section">
            <Reveal>
              <p className="eyebrow">THE COUNTDOWN BEGINS</p>
              <h2>Save The Date</h2>
              <p>{config.wedding.dateLabel}</p>
              <Countdown date={config.wedding.isoDate} />
            </Reveal>
          </section>

          <div className="wedding-divider" aria-hidden="true">
            <img src="/bengali-wedding-arch-divider.png" alt="" />
          </div>

          <section className="events section">
            <Reveal>
              <p className="eyebrow">JOIN OUR CELEBRATION</p>
              <h2>Wedding Events</h2>
            </Reveal>
            {config.events.map((event, index) => (
              <Reveal key={event.name}>
                <article className="event-card">
                  <span className="event-number">EVENT 0{index + 1}</span>
                  <h3>{event.name}</h3>
                  <p className="event-date">{event.date}</p>
                  <p>{event.description}</p>
                  <p className="venue">⌖ {event.venue}</p>
                  <a
                    className="map-link"
                    href={event.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    VIEW VENUE & DIRECTIONS ↗
                  </a>
                </article>
              </Reveal>
            ))}
          </section>

          <section className="gallery section">
            <Reveal>
              <p className="eyebrow">A FEW FAVOURITE MOMENTS</p>
              <h2>Captured Memories</h2>
            </Reveal>
            <div className="gallery-grid">
              {config.gallery.map((item, i) => (
                <Reveal key={item.caption}>
                  <div
                    className={`gallery-tile tile-${i % 3}`}
                    style={{
                      backgroundImage: `url("${i % 2 === 0 ? "/captured-memory-1.jpeg" : "/captured-memory-2.jpeg"}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <p>{item.caption}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <footer className="footer">
            <div className="footer-flower">✿</div>
            <p className="eyebrow">WITH LOVE</p>
            <h2>Thank You</h2>
            <p>We can't wait to celebrate with you.</p>
            <h3>
              {config.couple.bride} <i>&</i> {config.couple.groom}
            </h3>
            <small>
              {config.wedding.dateLabel} · {config.wedding.city}
            </small>
          </footer>
          <button
            className="music"
            aria-label="Toggle music"
            onClick={toggleMusic}
          >
            {musicOn ? "♫ On" : "♫"}
          </button>
        </main>
      )}
    </>
  );
}
