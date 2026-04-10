"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    src: "/assets/rain-bennett-Z5JJifMtbCo-unsplash.jpg",
    alt: "Team collaboration",
  },
  {
    src: "/assets/mahmudul-hasan-1mEOQ8KdUjk-unsplash.jpg",
    alt: "Learning and growth",
  },
  {
    src: "/assets/lilly-rum-iyKVGRu79G4-unsplash.jpg",
    alt: "Focus and productivity",
  },
  {
    src: "/images/hero-home.png",
    alt: "INP Africa marketplace",
  },
  {
    src: "/assets/charlesdeluvio-Lks7vei-eAg-unsplash.jpg",
    alt: "Digital learning",
  },
] as const;

const INTERVAL_MS = 5500;

/**
 * Full-bleed background carousel for the hero. Parent must be `relative min-h-[...] overflow-hidden`.
 */
export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIndex((n) => (n + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(t);
  }, []);

  return (
    <>
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
              i === index ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 bg-[#f5a623]"
                : "w-1.5 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </>
  );
}
