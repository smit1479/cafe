"use client";

import React, { useState } from "react";
import IcedLatteExperience from "@/components/IcedLatteExperience";
import {
  Volume2,
  VolumeX,
  Sparkles,
  Flame,
  Droplets,
  Wind,
  ArrowRight,
  Check,
  ShieldCheck,
  Heart,
} from "lucide-react";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [selectedSize, setSelectedSize] = useState<"12oz" | "16oz">("16oz");
  const [selectedMilk, setSelectedMilk] = useState<"jersey" | "oat" | "almond">("jersey");
  const [ordered, setOrdered] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#FAF7F2] relative selection:bg-[#6F3E28] selection:text-[#FAF7F2]">
      {/* ------------------------------------------------------------- */}
      {/* LUXURY EDITORIAL HEADER */}
      {/* ------------------------------------------------------------- */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-12 py-6 bg-gradient-to-b from-[#050505]/90 via-[#050505]/50 to-transparent backdrop-blur-md border-b border-white/[0.04]">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#B87945] animate-pulse" />
          <span className="font-serif text-lg sm:text-xl tracking-wider text-white font-medium">
            NOIR &amp; CRÈME
          </span>
          <span className="hidden md:inline-block text-[9px] font-sans tracking-luxury uppercase text-[#B87945] border border-[#B87945]/30 px-2 py-0.5 rounded-full">
            Artisanal Reserve
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-sans tracking-luxury uppercase text-white/70">
          <button
            onClick={() => scrollToSection("experience")}
            className="hover:text-[#E9D6B8] transition-colors"
          >
            The Ritual
          </button>
          <button
            onClick={() => scrollToSection("craft")}
            className="hover:text-[#E9D6B8] transition-colors"
          >
            The Craft
          </button>
          <button
            onClick={() => scrollToSection("ingredients")}
            className="hover:text-[#E9D6B8] transition-colors"
          >
            Terroir
          </button>
          <button
            onClick={() => scrollToSection("discover")}
            className="hover:text-[#E9D6B8] transition-colors"
          >
            Tasting Notes
          </button>
        </nav>

        {/* Right Actions: Sound of Ritual Toggle & Reserve CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:border-[#B87945]/40 hover:bg-[#B87945]/10 text-white/70 hover:text-white transition-all duration-200"
            title={isMuted ? "Unmute Ambient Ritual" : "Mute Sound"}
            aria-label="Toggle ambient ritual sound"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white/50" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#B87945] animate-pulse" />
            )}
          </button>

          <button
            onClick={() => scrollToSection("order")}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#B87945]/40 bg-[#6F3E28]/30 hover:bg-[#B87945]/20 text-[11px] font-sans tracking-luxury uppercase text-[#E9D6B8] transition-all hover:border-[#B87945]"
          >
            Reserve Your Cup
          </button>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 400vh SCROLL-LINKED CANVAS EXPERIENCE */}
      {/* ------------------------------------------------------------- */}
      <section id="experience" className="relative">
        <IcedLatteExperience
          frameCount={120}
          onExploreClick={() => scrollToSection("order")}
        />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* POST-SCROLL EDITORIAL SECTION: THE TRIAD OF CRAFT */}
      {/* ------------------------------------------------------------- */}
      <section id="craft" className="relative py-28 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] font-sans tracking-epic uppercase text-[#B87945] mb-3 block">
            The Science of Cold Indulgence
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white leading-tight mb-6">
            Engineered for <br />
            <span className="italic text-[#E9D6B8]">Sensory Gravity</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/60 font-light leading-relaxed">
            Every millimeter of our iced latte is governed by strict temperature
            differentials, density calibration, and extraction precision.
          </p>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/[0.06] hover:border-[#B87945]/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-[#6F3E28]/20 flex items-center justify-center mb-6 border border-[#6F3E28]/40 text-[#B87945] group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-sans tracking-epic uppercase text-white/40 mb-2">
              Phase 01 / Heat &amp; Extraction
            </div>
            <h3 className="font-serif text-2xl font-light text-white mb-3">
              Volcanic Arabica
            </h3>
            <p className="font-sans text-sm text-white/60 font-light leading-relaxed mb-6">
              Harvested at 1,850m elevation in Antigua, Guatemala. Slow-roasted over
              olive wood to unlock rich nuances of roasted hazelnut and dark cacao.
            </p>
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#E9D6B8]/80 font-mono">
              <span>Temp: 93.4°C</span>
              <span>Bar: 9.2 Bar</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/[0.06] hover:border-[#B87945]/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-[#B87945]/20 flex items-center justify-center mb-6 border border-[#B87945]/40 text-[#E9D6B8] group-hover:scale-110 transition-transform">
              <Droplets className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-sans tracking-epic uppercase text-white/40 mb-2">
              Phase 02 / The Foundation
            </div>
            <h3 className="font-serif text-2xl font-light text-white mb-3">
              Grass-Fed Cream &amp; Oat
            </h3>
            <p className="font-sans text-sm text-white/60 font-light leading-relaxed mb-6">
              Cold-spun to preserve natural sweet lactose. Creates micro-viscosity
              that cushions the espresso cascade without neutralizing acidity.
            </p>
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#E9D6B8]/80 font-mono">
              <span>Fat Ratio: 4.8%</span>
              <span>Texture: Velvety</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/[0.06] hover:border-[#B87945]/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/20 text-white group-hover:scale-110 transition-transform">
              <Wind className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-sans tracking-epic uppercase text-white/40 mb-2">
              Phase 03 / Pure Cryo
            </div>
            <h3 className="font-serif text-2xl font-light text-white mb-3">
              Directional Glacial Ice
            </h3>
            <p className="font-sans text-sm text-white/60 font-light leading-relaxed mb-6">
              Frozen continuously under directional flow to eliminate microscopic air
              pockets. Melts 400% slower, preserving equilibrium to the final sip.
            </p>
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#E9D6B8]/80 font-mono">
              <span>Purity: 99.9%</span>
              <span>Dilution: Slow</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* TASTING PROFILE & ORDER SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="order" className="relative py-24 sm:py-32 px-6 sm:px-12 bg-gradient-to-b from-[#050505] via-[#090807] to-[#050505] border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Sensory Narrative */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B87945]/30 bg-[#6F3E28]/10 text-[10px] font-sans tracking-luxury uppercase text-[#E9D6B8] mb-6">
              <Sparkles className="w-3 h-3 text-[#B87945]" />
              Signature Flight Selection
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
              Crafted Fresh to <br />
              <span className="italic text-[#E9D6B8]">Your Exact Preference</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-white/60 font-light leading-relaxed mb-8">
              Order your artisanal iced latte for instant table presentation or pick up
              freshly pulled at our flagship coffee lab.
            </p>

            {/* Flavor Matrix */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] tracking-luxury uppercase text-white/40 mb-1">Top Note</div>
                <div className="text-white font-serif text-lg">Orange Blossom &amp; Cacao</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] tracking-luxury uppercase text-white/40 mb-1">Body</div>
                <div className="text-white font-serif text-lg">Silk &amp; Salted Butterscotch</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] tracking-luxury uppercase text-white/40 mb-1">Finish</div>
                <div className="text-white font-serif text-lg">Smoked Bourbon Vanilla</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] tracking-luxury uppercase text-white/40 mb-1">Acidity</div>
                <div className="text-white font-serif text-lg">Gentle Malic Crispness</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Order Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0d0b0a] border border-[#B87945]/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#6F3E28]/30 to-transparent blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/[0.06]">
              <div>
                <span className="text-[10px] tracking-epic uppercase text-[#B87945]">Artisanal Specification</span>
                <h3 className="font-serif text-2xl text-white font-normal mt-1">Noir Cold Reserve</h3>
              </div>
              <div className="text-right">
                <div className="font-serif text-3xl text-[#FAF7F2] font-light">
                  {selectedSize === "12oz" ? "$7.50" : "$8.75"}
                </div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Complimentary Ice Sphere</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="text-[11px] font-sans tracking-luxury uppercase text-white/50 block mb-3">
                Volume &amp; Ice Ratio
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSize("12oz")}
                  className={`py-3 px-4 rounded-xl text-xs font-sans tracking-wider border transition-all ${
                    selectedSize === "12oz"
                      ? "border-[#B87945] bg-[#B87945]/15 text-white"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                  }`}
                >
                  12 oz — Intense Ratio
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSize("16oz")}
                  className={`py-3 px-4 rounded-xl text-xs font-sans tracking-wider border transition-all ${
                    selectedSize === "16oz"
                      ? "border-[#B87945] bg-[#B87945]/15 text-white"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                  }`}
                >
                  16 oz — Classic Balance
                </button>
              </div>
            </div>

            {/* Milk Base Selector */}
            <div className="mb-8">
              <label className="text-[11px] font-sans tracking-luxury uppercase text-white/50 block mb-3">
                Dairy / Botanical Matrix
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "jersey", label: "Jersey Farm" },
                  { id: "oat", label: "Oat Reserve" },
                  { id: "almond", label: "Marcona Almond" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedMilk(item.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-[11px] font-sans tracking-wide border transition-all text-center ${
                      selectedMilk === item.id
                        ? "border-[#B87945] bg-[#B87945]/15 text-[#E9D6B8]"
                        : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Action Button */}
            <button
              type="button"
              onClick={() => {
                setOrdered(true);
                setTimeout(() => setOrdered(false), 3500);
              }}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#6F3E28] via-[#B87945] to-[#C98854] text-[#FAF7F2] font-sans text-xs tracking-luxury uppercase font-medium shadow-xl hover:shadow-[0_0_35px_rgba(184,121,69,0.5)] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {ordered ? (
                <>
                  <Check className="w-4 h-4 text-[#FAF7F2]" />
                  <span>PREPARATION INITIATED</span>
                </>
              ) : (
                <>
                  <span>ORDER YOUR ATELIER LATTE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-white/40 tracking-wider">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B87945]" /> Zero Preservatives
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-[#B87945]" /> Single-Estate Farmed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* LUXURY EDITORIAL FOOTER */}
      {/* ------------------------------------------------------------- */}
      <footer className="border-t border-white/[0.06] py-16 px-6 sm:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <div className="font-serif text-2xl text-white font-light tracking-wide mb-2">
              NOIR &amp; CRÈME
            </div>
            <p className="text-xs text-white/50 font-light tracking-wider">
              Artisanal Coffee Laboratory • Zurich &amp; Tokyo
            </p>
          </div>

          <div className="flex items-center gap-8 text-xs font-sans tracking-luxury uppercase text-white/60">
            <a href="#experience" className="hover:text-white transition-colors">
              The Journey
            </a>
            <a href="#craft" className="hover:text-white transition-colors">
              Craftsmanship
            </a>
            <a href="#order" className="hover:text-white transition-colors">
              Reserve
            </a>
          </div>

          <div className="text-[11px] text-white/40 font-mono tracking-wider">
            © {new Date().getFullYear()} NOIR &amp; CRÈME. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </main>
  );
}
