"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronDown, Coffee, Sparkles } from "lucide-react";

interface IcedLatteExperienceProps {
  frameCount?: number;
  sequencePath?: (index: number) => string[];
  className?: string;
  onExploreClick?: () => void;
}

export default function IcedLatteExperience({
  frameCount = 120,
  sequencePath,
  className = "",
  onExploreClick,
}: IcedLatteExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stable Image Cache via Ref - eliminates re-render cycles and canvas resets
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // Active frame tracking
  const activeFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Unified Motion Value representing the exact scroll progress [0, 1]
  const scrollProgress = useMotionValue(0);

  // Smooth scroll progress using spring as specified (stiffness: 100, damping: 30)
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001,
  });

  // Fast splash fade-out in 150ms
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 150);
    return () => clearTimeout(splashTimer);
  }, []);

  // -------------------------------------------------------------
  // STORYTELLING BEATS (Transforms synchronized with scroll)
  // Normalized Opacity Mapping: [start, start + 0.1, end - 0.1, end] -> [0, 1, 1, 0]
  // Normalized Y Mapping:       [start, start + 0.1, end - 0.1, end] -> [20, 0, 0, -20]
  // -------------------------------------------------------------

  // Scroll indicator (0% to 10%)
  const scrollIndicatorOpacity = useTransform(
    smoothProgress,
    [0, 0.06, 0.1],
    [1, 0.5, 0]
  );
  const scrollIndicatorY = useTransform(
    smoothProgress,
    [0, 0.1],
    [0, -15]
  );

  // Beat A: 0% - 20% (The First Sip)
  const beatAOpacity = useTransform(
    smoothProgress,
    [0, 0.02, 0.18, 0.22],
    [0, 1, 1, 0]
  );
  const beatAY = useTransform(
    smoothProgress,
    [0, 0.02, 0.18, 0.22],
    [20, 0, 0, -20]
  );

  // Beat B: 25% - 45% (The Perfect Pour)
  const beatBOpacity = useTransform(
    smoothProgress,
    [0.23, 0.27, 0.42, 0.46],
    [0, 1, 1, 0]
  );
  const beatBY = useTransform(
    smoothProgress,
    [0.23, 0.27, 0.42, 0.46],
    [20, 0, 0, -20]
  );

  // Beat C: 50% - 70% (Every Detail Matters)
  const beatCOpacity = useTransform(
    smoothProgress,
    [0.48, 0.52, 0.68, 0.72],
    [0, 1, 1, 0]
  );
  const beatCY = useTransform(
    smoothProgress,
    [0.48, 0.52, 0.68, 0.72],
    [20, 0, 0, -20]
  );

  // Beat D: 75% - 95% (Your Moment. Your Latte.)
  const beatDOpacity = useTransform(
    smoothProgress,
    [0.74, 0.78, 0.94, 0.98],
    [0, 1, 1, 0]
  );
  const beatDY = useTransform(
    smoothProgress,
    [0.74, 0.78, 0.94, 0.98],
    [20, 0, 0, -20]
  );

  // -------------------------------------------------------------
  // CANVAS RENDERING ENGINE (Contain aspect ratio & DPR scaling)
  // Stable function referencing imagesRef directly
  // -------------------------------------------------------------
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      // Select frame from imagesRef with closest-frame fallback
      let img = imagesRef.current[frameIndex];
      if (!img) {
        for (let offset = 1; offset < frameCount; offset++) {
          if (frameIndex - offset >= 0 && imagesRef.current[frameIndex - offset]) {
            img = imagesRef.current[frameIndex - offset];
            break;
          }
          if (frameIndex + offset < frameCount && imagesRef.current[frameIndex + offset]) {
            img = imagesRef.current[frameIndex + offset];
            break;
          }
        }
      }
      if (!img) img = imagesRef.current[0];

      // Handle Device Pixel Ratio (clamped to 2 for performance)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = canvas.clientWidth || window.innerWidth;
      const displayHeight = canvas.clientHeight || window.innerHeight;

      const expectedW = Math.round(displayWidth * dpr);
      const expectedH = Math.round(displayHeight * dpr);

      if (canvas.width !== expectedW || canvas.height !== expectedH) {
        canvas.width = expectedW;
        canvas.height = expectedH;
      }

      const cw = canvas.width;
      const ch = canvas.height;

      // Base Void Fill - exactly #050505
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, cw, ch);

      if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // object-fit: contain logic with optical centering
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = cw / ch;

        let drawW: number;
        let drawH: number;
        let offsetX: number;
        let offsetY: number;

        if (canvasAspect > imgAspect) {
          drawH = ch;
          drawW = drawH * imgAspect;
          offsetX = (cw - drawW) / 2;
          offsetY = 0;
        } else {
          drawW = cw;
          drawH = drawW / imgAspect;
          offsetX = 0;
          offsetY = (ch - drawH) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

        // Seamless dark void perimeter blending:
        const gradient = ctx.createRadialGradient(
          cw / 2,
          ch / 2,
          Math.min(drawW, drawH) * 0.45,
          cw / 2,
          ch / 2,
          Math.max(cw, ch) * 0.72
        );
        gradient.addColorStop(0, "rgba(5, 5, 5, 0)");
        gradient.addColorStop(0.7, "rgba(5, 5, 5, 0.15)");
        gradient.addColorStop(1, "rgba(5, 5, 5, 0.98)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, cw, ch);
      }
    },
    [frameCount]
  );

  // -------------------------------------------------------------
  // HIGH-SPEED ASSET PRELOADER (Runs once, populates imagesRef)
  // -------------------------------------------------------------
  useEffect(() => {
    let isCancelled = false;

    // Load Frame 0 immediately with high priority
    const frame0 = new Image();
    frame0.crossOrigin = "anonymous";
    frame0.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = frame0;
      renderFrame(activeFrameRef.current);
    };
    frame0.onerror = () => {
      const frame0Jpg = new Image();
      frame0Jpg.crossOrigin = "anonymous";
      frame0Jpg.onload = () => {
        if (isCancelled) return;
        imagesRef.current[0] = frame0Jpg;
        renderFrame(activeFrameRef.current);
      };
      frame0Jpg.src = "/sequence/frame_0.jpg";
    };
    frame0.src = "/sequence/frame_0.webp";

    // Stream the remaining 119 frames in background
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        if (!isCancelled) {
          imagesRef.current[i] = img;
          // If the user is currently paused on this frame, re-render with higher fidelity
          if (activeFrameRef.current === i) {
            renderFrame(i);
          }
        }
      };

      img.onerror = () => {
        const fallback = new Image();
        fallback.crossOrigin = "anonymous";
        fallback.onload = () => {
          if (!isCancelled) {
            imagesRef.current[i] = fallback;
            if (activeFrameRef.current === i) {
              renderFrame(i);
            }
          }
        };
        fallback.src = `/sequence/frame_${i}.jpg`;
      };

      img.src = `/sequence/frame_${i}.webp`;
    }

    return () => {
      isCancelled = true;
    };
  }, [frameCount, renderFrame]);

  // -------------------------------------------------------------
  // UNIFIED SPRING-SMOOTHED SCROLL-TO-FRAME ENGINE
  // Single source of truth: scrollProgress -> smoothProgress -> renderFrame
  // -------------------------------------------------------------
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScroll = rect.height - window.innerHeight;
    if (totalScroll <= 0) return;

    // Current scroll offset into the sticky container
    const scrolled = -rect.top;
    const rawProgress = Math.max(0, Math.min(1, scrolled / totalScroll));

    // Sets motion value. Spring smoothly glides to this position and STAYS there.
    scrollProgress.set(rawProgress);
  }, [scrollProgress]);

  useEffect(() => {
    // Initial sync
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // ONLY the spring drives the canvas frames: perfect inertia, zero resets
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));
      const targetFrame = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(clamped * frameCount))
      );

      if (targetFrame !== activeFrameRef.current) {
        activeFrameRef.current = targetFrame;
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }
        rafIdRef.current = requestAnimationFrame(() => {
          renderFrame(targetFrame);
        });
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      unsubscribe();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll, smoothProgress, frameCount, renderFrame]);

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* LUXURY EDITORIAL LOADING SCREEN */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
            className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-[#050505] text-[#FAF7F2] select-none"
          >
            {/* Background subtle radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(111,62,40,0.18)_0%,rgba(5,5,5,1)_70%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
              {/* Minimal Centered Spinner */}
              <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-white/10 border-t-[#B87945] border-r-[#6F3E28]"
                />
                <Coffee className="w-6 h-6 text-[#E9D6B8] animate-pulse relative z-10" />
              </div>

              {/* Brand Label */}
              <p className="text-[11px] font-sans tracking-epic uppercase text-[#E9D6B8]/75 mb-3">
                PREPARING YOUR EXPERIENCE
              </p>

              {/* Headline */}
              <h2 className="font-serif text-2xl tracking-wide text-white/95 mb-6 font-light">
                Velvet &amp; Single Origin
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* 400vh SCROLL CONTAINER & STICKY 100vh CANVAS */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={containerRef}
        id="experience-container"
        className={`relative w-full bg-[#050505] ${className}`}
        style={{
          height: "400vh",
          minHeight: "400vh",
        }}
      >
        <div
          className="sticky top-0 w-full flex items-center justify-center overflow-hidden z-10"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            maxHeight: "100vh",
          }}
        >
          {/* HTML5 Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block touch-none"
            style={{ width: "100%", height: "100%" }}
          />

          {/* Canvas Edge Vignette - dark void integration */}
          <div className="absolute inset-0 canvas-vignette pointer-events-none" />

          {/* --------------------------------------------------------- */}
          {/* BEAT A — 0–20%: THE FIRST SIP */}
          {/* --------------------------------------------------------- */}
          <motion.div
            style={{
              opacity: beatAOpacity,
              y: beatAY,
            }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between p-8 sm:p-14 z-20 text-center"
          >
            {/* Top brand accent */}
            <div className="pt-8 sm:pt-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B87945]/30 bg-[#050505]/40 backdrop-blur-md text-[10px] tracking-luxury uppercase text-[#E9D6B8]">
                <Sparkles className="w-3 h-3 text-[#B87945]" />
                Artisanal Cold Extraction
              </span>
            </div>

            {/* Main Headline */}
            <div className="max-w-3xl my-auto">
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white/95 leading-[1.08] mb-6">
                COLD. CREAMY. <br />
                <span className="italic font-normal text-[#E9D6B8]">
                  UNFORGETTABLE.
                </span>
              </h1>
              <p className="font-sans text-sm sm:text-base md:text-lg text-white/60 font-light tracking-wide max-w-xl mx-auto leading-relaxed">
                A little moment of indulgence, crafted to slow everything down.
              </p>
            </div>

            {/* Scroll Indicator (fades out in first 10%) */}
            <motion.div
              style={{
                opacity: scrollIndicatorOpacity,
                y: scrollIndicatorY,
              }}
              className="pb-4 flex flex-col items-center gap-2 text-white/50"
            >
              <span className="text-[10px] tracking-epic uppercase font-sans">
                Scroll to Experience
              </span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-[#B87945] to-transparent animate-pulse" />
              <ChevronDown className="w-4 h-4 text-[#B87945] animate-bounce" />
            </motion.div>
          </motion.div>

          {/* --------------------------------------------------------- */}
          {/* BEAT B — 25–45%: THE PERFECT POUR */}
          {/* --------------------------------------------------------- */}
          <motion.div
            style={{
              opacity: beatBOpacity,
              y: beatBY,
            }}
            className="pointer-events-none absolute inset-0 flex items-center justify-start p-8 sm:p-14 md:p-20 z-20"
          >
            <div className="max-w-md lg:max-w-lg text-left bg-[#050505]/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
              <div className="text-[11px] font-sans tracking-luxury uppercase text-[#B87945] mb-3">
                02 / Liquid Physics
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white/95 leading-[1.15] mb-4">
                A BEAUTIFUL <br />
                <span className="italic text-[#E9D6B8]">COLLISION.</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed">
                Bold espresso meets silky-smooth milk in a swirl of pure indulgence.
                Watch dark roasted amber collide with velvety white cream.
              </p>
            </div>
          </motion.div>

          {/* --------------------------------------------------------- */}
          {/* BEAT C — 50–70%: EVERY DETAIL MATTERS */}
          {/* --------------------------------------------------------- */}
          <motion.div
            style={{
              opacity: beatCOpacity,
              y: beatCY,
            }}
            className="pointer-events-none absolute inset-0 flex items-center justify-end p-8 sm:p-14 md:p-20 z-20"
          >
            <div className="max-w-md lg:max-w-lg text-right bg-[#050505]/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
              <div className="text-[11px] font-sans tracking-luxury uppercase text-[#B87945] mb-3">
                03 / Micro Refraction
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white/95 leading-[1.15] mb-4">
                CHILLED TO <br />
                <span className="italic text-[#E9D6B8]">PERFECTION.</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed">
                Crystal-clear ice. Velvety milk. Deep, aromatic espresso. Glistening
                droplets of condensation capturing ambient light in pristine clarity.
              </p>
            </div>
          </motion.div>

          {/* --------------------------------------------------------- */}
          {/* BEAT D — 75–95%: YOUR MOMENT. YOUR LATTE. */}
          {/* --------------------------------------------------------- */}
          <motion.div
            style={{
              opacity: beatDOpacity,
              y: beatDY,
            }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-14 z-20 text-center"
          >
            <div className="max-w-2xl bg-[#050505]/70 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/10 glow-espresso">
              <span className="text-[11px] font-sans tracking-epic uppercase text-[#B87945] mb-3 inline-block">
                04 / The Final Masterpiece
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white/95 leading-[1.1] mb-5">
                MAKE TIME <br />
                <span className="italic text-[#E9D6B8]">TASTE BETTER.</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/70 font-light max-w-md mx-auto mb-8 leading-relaxed">
                Your everyday coffee ritual, elevated. Hand-poured, slow-tempered, and
                crafted for connoisseurs of fine coffee.
              </p>

              {/* CTA Button */}
              <div className="pointer-events-auto">
                <a
                  href="#order"
                  onClick={(e) => {
                    if (onExploreClick) {
                      e.preventDefault();
                      onExploreClick();
                    }
                  }}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#6F3E28] to-[#B87945] text-[#FAF7F2] font-sans text-xs tracking-luxury uppercase font-medium shadow-2xl transition-all duration-300 hover:scale-105 hover:from-[#B87945] hover:to-[#C98854] hover:shadow-[0_0_30px_rgba(184,121,69,0.5)] focus:outline-none focus:ring-2 focus:ring-[#B87945]"
                >
                  <span>DISCOVER YOUR LATTE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FAF7F2] transition-transform duration-300 group-hover:scale-150" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
