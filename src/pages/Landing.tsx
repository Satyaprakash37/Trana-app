import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Clock, 
  MapPin, 
  AlertCircle, 
  Bot, 
  Volume2, 
  Users, 
  ShieldAlert, 
  Radio, 
  Award, 
  Lock, 
  Smartphone, 
  ExternalLink,
  Cpu,
  Layers,
  PhoneCall,
  BellRing,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Globe,
  Database,
  Terminal,
  Compass,
  Check,
  Flame,
  ArrowUpRight
} from 'lucide-react';

interface LandingProps {
  onLaunchDemo: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onLaunchDemo }) => {
  const [activeFeatureTab, setActiveFeatureTab] = useState<number>(0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1B2A4A] selection:bg-[#FF9933] selection:text-white font-body">
      {/* TOP FLOATING NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1B2A4A]/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={scrollToTop}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF9933] to-[#E91E63] p-0.5 shadow-md flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading font-extrabold text-white text-lg tracking-wider leading-none">
                TRANA
              </span>
              <span className="text-[9px] text-[#FF9933] font-bold tracking-widest uppercase">
                Product Spec
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <button
              type="button"
              onClick={() => scrollToSection('vision')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Vision
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('architecture')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Architecture
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('features')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('status')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Status
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('tech-stack')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Tech Stack
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onLaunchDemo}
              className="py-2 px-4 rounded-xl bg-[#FF9933] hover:bg-[#e88825] text-white font-bold text-xs tracking-wide shadow-md shadow-[#FF9933]/30 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 touch-target"
            >
              <span>Launch Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] bg-gradient-to-b from-[#1B2A4A] via-[#122038] to-[#0a1a3a] text-white pt-28 pb-16 px-6 flex flex-col justify-between items-center text-center overflow-hidden">
        {/* Subtle geometric pattern / glow effect */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#FF9933] to-[#E91E63] blur-[140px]"></div>
          <div className="absolute -bottom-20 left-10 w-80 h-80 rounded-full bg-indigo-500 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto my-auto flex flex-col items-center">
          {/* TRANA logo 🛡️ (large, white, 100px) */}
          <div className="relative mb-6">
            <div className="w-[100px] h-[100px] rounded-3xl bg-gradient-to-tr from-white/20 to-white/5 backdrop-blur-md border-2 border-white/30 shadow-[0_10px_40px_rgba(255,153,51,0.35)] flex items-center justify-center p-2 group hover:scale-105 transition-transform">
              <ShieldCheck className="w-[68px] h-[68px] text-white stroke-[2.2] drop-shadow-md" />
            </div>
            <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#FF9933] text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
              AI 2.0
            </span>
          </div>

          {/* Main Heading: "Every step, safe." (Playfair Display, 48px, white, bold) */}
          <h1 className="text-4xl sm:text-5xl md:text-[52px] font-bold text-white font-heading tracking-tight leading-[1.15] mb-4">
            Every step, safe.
          </h1>

          {/* Subheading: "India's first AI-powered women safety app with community first responders." (Inter, 18px, light gray) */}
          <p className="text-base sm:text-lg md:text-[18px] text-slate-300 font-normal max-w-2xl mx-auto mb-9 leading-relaxed font-body">
            India's first AI-powered women safety app with community first responders.
          </p>

          {/* 2 Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            {/* "Launch Demo" (saffron #FF9933 bg, white text, large, prominent) */}
            <button
              type="button"
              onClick={onLaunchDemo}
              className="w-full sm:w-auto min-h-[52px] py-4 px-8 rounded-2xl bg-[#FF9933] hover:bg-[#e88825] text-white font-extrabold text-base tracking-wide shadow-[0_8px_30px_rgba(255,153,51,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 touch-target"
            >
              <span>Launch Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* "Learn More" (transparent bg, white border) */}
            <button
              type="button"
              onClick={() => scrollToSection('vision')}
              className="w-full sm:w-auto min-h-[52px] py-4 px-8 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-white font-semibold text-base border border-white/40 transition-colors flex items-center justify-center gap-2 cursor-pointer touch-target"
            >
              <span>Explore Specification</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll indicator at bottom */}
        <div 
          onClick={() => scrollToSection('vision')}
          className="relative z-10 pt-8 cursor-pointer text-slate-400 hover:text-white flex flex-col items-center gap-1 text-xs transition-colors"
        >
          <span>Scroll to explore full architecture</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* NEW SECTION: "Our Vision" (after Hero) */}
      <section id="vision" className="bg-[#1B2A4A] text-white py-24 px-6 relative border-t border-white/10 scroll-mt-14">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#FF9933] tracking-widest uppercase mb-2 block">
              The Purpose & Genesis
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
              Our Vision
            </h2>
          </div>

          <div className="space-y-6 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
            <p className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-[#FF9933] font-bold">TRANA</span> (Sanskrit: <span className="font-serif italic font-normal text-amber-200">त्राण</span>, meaning 'refuge' or 'protection') was born from a simple observation: in India, police response takes 15-30 minutes on average. But a verified community member can reach in 2-5 minutes. We bridge that critical gap.
            </p>

            <p className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xs">
              Our mission is to build a community-first safety network where every woman carries an invisible bodyguard — powered by AI, backed by her community, and always on. We're not building another SOS app. We're building a movement where helping someone is rewarded, recognized, and celebrated.
            </p>

            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent border border-[#FF9933]/30">
              <p className="font-heading italic text-xl text-amber-200 mb-2">
                "Police se pehle, apahe log."
              </p>
              <p className="text-sm sm:text-base text-slate-300">
                Before police, our people. This is more than a tagline — it's our architectural philosophy. The community responds first, police follows. Every TRANA user can be both protected and protector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section id="problem" className="bg-white py-20 px-6 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-[#FF9933] tracking-widest uppercase mb-1 block">
              Current Landscape
            </span>
            <h2 className="text-3xl sm:text-[36px] font-bold text-[#1B2A4A] font-heading leading-tight">
              The Reality
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto mt-2">
              Every day, millions navigate fears that conventional emergency systems fail to prevent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#CC344D]/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-2xl flex items-center justify-center mb-5 border border-red-100">
                  📊
                </div>
                <h3 className="text-lg font-bold text-[#1B2A4A] font-heading leading-snug mb-3">
                  8 in 10 women face harassment in public spaces
                </h3>
              </div>
              <p className="text-xs font-semibold text-[#787F83] pt-4 border-t border-slate-100">
                Source: National Crime Records Bureau
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#CC344D]/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-2xl flex items-center justify-center mb-5 border border-amber-100">
                  ⏱️
                </div>
                <h3 className="text-lg font-bold text-[#1B2A4A] font-heading leading-snug mb-3">
                  Police response time: 15-30 minutes average
                </h3>
              </div>
              <p className="text-xs font-semibold text-[#787F83] pt-4 border-t border-slate-100">
                In remote areas, even longer
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#CC344D]/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-2xl flex items-center justify-center mb-5 border border-indigo-100">
                  📍
                </div>
                <h3 className="text-lg font-bold text-[#1B2A4A] font-heading leading-snug mb-3">
                  Most attacks happen in low-footfall areas
                </h3>
              </div>
              <p className="text-xs font-semibold text-[#787F83] pt-4 border-t border-slate-100">
                Bus stops, highways, isolated stretches
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE SOLUTION SECTION */}
      <section id="solution" className="bg-[#FAFAF9] py-20 px-6 border-t border-slate-200/70 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-[#438158] tracking-widest uppercase mb-1 block">
              Architected for Protection
            </span>
            <h2 className="text-3xl sm:text-[36px] font-bold text-[#1B2A4A] font-heading leading-tight">
              Meet TRANA
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto mt-2">
              Three layers of protection, always with you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#FF9933]/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center mb-5 text-2xl shadow-sm">
                🤖
              </div>
              <h3 className="text-xl font-bold text-[#1B2A4A] font-heading mb-3">
                AI Risk Detection
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Real-time location analysis using OpenStreetMap data. Identifies danger zones before you enter them.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#FF9933]/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#E91E63] flex items-center justify-center mb-5 text-2xl shadow-sm">
                🗣️
              </div>
              <h3 className="text-xl font-bold text-[#1B2A4A] font-heading mb-3">
                AI Voice Guardian
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Speaks to you when you enter risky areas. Auto-escalates to SOS if you don't respond.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#FF9933]/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#FF9933] flex items-center justify-center mb-5 text-2xl shadow-sm">
                👥
              </div>
              <h3 className="text-xl font-bold text-[#1B2A4A] font-heading mb-3">
                APAHE LOG Community
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Verified nearby volunteers get alerts before police. Help arrives in minutes, not hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: "Complete Architecture" (after Vision) */}
      <section id="architecture" className="bg-[#FAFAF9] py-24 px-6 border-t border-slate-200/80 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#438158] tracking-widest uppercase mb-1 block">
              Full System Topology
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B2A4A] font-heading">
              How TRANA is Built
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto mt-2">
              Three-layer protection system, engineered for India.
            </p>
          </div>

          <div className="space-y-8">
            {/* LAYER 1: AI GUARDIAN */}
            <div className="bg-white rounded-3xl p-8 border-2 border-primary shadow-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-primary text-white text-[11px] font-bold rounded-bl-2xl uppercase tracking-wider">
                Layer 01 • Client & Cloud Edge
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-primary/20 flex items-center justify-center text-3xl shrink-0">
                  🤖
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary font-heading mb-2">
                    AI Guardian Layer
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mb-4 leading-relaxed">
                    Background AI continuously monitors your journey using OpenStreetMap data, GPS tracking, and risk analysis. No user interaction needed.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {["OpenStreetMap API", "Web Speech API", "Geolocation", "Risk Scoring"].map((badge) => (
                      <span key={badge} className="px-3 py-1 rounded-full bg-slate-100 text-primary border border-slate-200 text-xs font-bold">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Core Layer Components:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Real-time location tracking (60-sec intervals)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        POI density analysis (500m radius)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Risk zone detection (High/Moderate/Safe)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        AI voice alerts (male guardian voice)
                      </li>
                      <li className="flex items-center gap-2 sm:col-span-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Auto-escalation after 2-min no response
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* LAYER 2: COMMUNITY NETWORK */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#FF9933] shadow-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#FF9933] text-white text-[11px] font-bold rounded-bl-2xl uppercase tracking-wider">
                Layer 02 • Mesh Network
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-secondary/30 flex items-center justify-center text-3xl shrink-0">
                  👥
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary font-heading mb-2">
                    APAHE LOG Community Layer
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mb-4 leading-relaxed">
                    Verified nearby volunteers receive emergency alerts before police. First responders arrive in minutes, not hours.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Firebase Cloud Messaging", "Trust Tiers", "Volunteer Verification"].map((badge) => (
                      <span key={badge} className="px-3 py-1 rounded-full bg-amber-50 text-[#FF9933] border border-secondary/30 text-xs font-bold">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Core Layer Components:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Volunteer verification tiers (User → Lifesaver)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Smart matching (female priority, rating, distance)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Live location sharing with helpers
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Lifesaver badge system
                      </li>
                      <li className="flex items-center gap-2 sm:col-span-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        TRANA Coins rewards
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* LAYER 3: ESCALATION SYSTEM */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#CC344D] shadow-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#CC344D] text-white text-[11px] font-bold rounded-bl-2xl uppercase tracking-wider">
                Layer 03 • Telephony & Dispatch
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-red-50 border border-error/30 flex items-center justify-center text-3xl shrink-0">
                  🚨
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary font-heading mb-2">
                    Escalation Layer
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mb-4 leading-relaxed">
                    If community cannot respond, automatic escalation to police (112), women helpline (181), and trusted contacts with AI voice calls.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Twilio Voice", "Exotel", "ERSS 112", "DLT SMS"].map((badge) => (
                      <span key={badge} className="px-3 py-1 rounded-full bg-red-50 text-error border border-error/30 text-xs font-bold">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Core Layer Components:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                        Auto-call to trusted contacts (AI voice)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                        Police station auto-call (geocoded)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                        SMS fallback (DLT-registered)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                        Silent SOS (triple-press power button)
                      </li>
                      <li className="flex items-center gap-2 sm:col-span-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                        Decoy screen (Phase 3)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: "Features in Detail" (8 Interactive Demo Cards with realistic phone mockups) */}
      <section id="features" className="bg-white py-24 px-6 border-t border-slate-200/80 scroll-mt-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 block">
              Deep Product Breakdown
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary font-heading">
              Every Feature, Explained
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto mt-2">
              Click through to see exactly how each feature works and looks in the app.
            </p>

            {/* Feature selector tabs */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[
                "1. Silent SOS",
                "2. AI Risk Zone",
                "3. Voice Guardian",
                "4. Live Tracking",
                "5. Trusted Contacts",
                "6. Coins Rewards",
                "7. Lifesaver Ranks",
                "8. APAHE LOG (P2)"
              ].map((tabName, idx) => (
                <button
                  key={tabName}
                  type="button"
                  onClick={() => setActiveFeatureTab(idx)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeFeatureTab === idx
                      ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tabName}
                </button>
              ))}
            </div>
          </div>

          {/* Feature 1: SILENT SOS */}
          {activeFeatureTab === 0 && (
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-error text-xs font-bold">
                  <span>Feature 01</span>
                  <span>•</span>
                  <span>Zero-Interaction Emergency</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary font-heading flex items-center gap-2">
                  <span>🆘</span>
                  <span>Silent SOS</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Trigger emergency SOS without unlocking your phone or looking at the screen. Triple-press the power button (even from inside your pocket) to silently alert your trusted contacts and nearby volunteers. No sound, no vibration, no visible UI — the attacker never knows.
                </p>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <p className="font-bold text-primary">⚙️ Technical Execution:</p>
                  <p>• Native Android hardware broadcast receiver captures rapid power-key events.</p>
                  <p>• Telemetry payload includes 10-meter precision GPS coordinates, speed, and heading.</p>
                  <p>• Dispatches dual-path alert: WebSocket real-time push + DLT-registered priority SMS.</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Power Button 3x", "Silent Trigger", "Background Service"].map((badge) => (
                    <span key={badge} className="px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-bold">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Realistic Phone Mockup: SOS Screen */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[280px] h-[540px] bg-black rounded-[42px] p-3 shadow-2xl border-4 border-slate-800 relative">
                  {/* Dynamic Island / Notch */}
                  <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 border border-slate-800"></div>
                  {/* Phone Screen Frame */}
                  <div className="w-full h-[486px] rounded-[32px] bg-gradient-to-b from-[#8B0000] via-[#CC344D] to-[#4A000D] p-4 text-white flex flex-col justify-between overflow-hidden">
                    <div className="text-center pt-2">
                      <div className="w-14 h-14 rounded-full bg-white text-error flex items-center justify-center mx-auto mb-2 shadow-lg animate-pulse text-2xl">
                        🆘
                      </div>
                      <h4 className="text-xl font-black font-heading tracking-wider">
                        SOS ACTIVE
                      </h4>
                      <p className="text-[10px] text-amber-300 font-mono font-bold mt-1">
                        Elapsed: 00:42
                      </p>
                      <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-white/20 text-[9px] font-bold">
                        ✓ 3 Contacts Notified
                      </span>
                    </div>

                    <div className="bg-black/40 rounded-xl p-2.5 border border-white/20 text-[10px] font-mono">
                      <p className="text-amber-200">GPS Live Broadcast</p>
                      <p className="text-white/80">Lat: 28.6139° N, 77.2090° E</p>
                    </div>

                    <div className="space-y-2">
                      <div className="w-full py-2.5 bg-white text-error font-extrabold rounded-xl text-center text-xs tracking-wider uppercase shadow">
                        Call Police (112)
                      </div>
                      <div className="w-full py-2 bg-transparent border border-white/60 text-white font-bold rounded-xl text-center text-[10px] uppercase">
                        Cancel (False Alarm)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feature 2: AI RISK ZONE DETECTION */}
          {activeFeatureTab === 1 && (
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-primary text-xs font-bold">
                  <span>Feature 02</span>
                  <span>•</span>
                  <span>Predictive Intelligence</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary font-heading flex items-center gap-2">
                  <span>🤖</span>
                  <span>AI Risk Zone Detection</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Every 2 minutes during an active journey, TRANA queries OpenStreetMap Overpass API to analyze Points of Interest (POI) density within 500m of your location. Areas with less than 5 POIs are flagged as HIGH RISK. The app warns you BEFORE you enter danger zones.
                </p>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <p className="font-bold text-primary">⚙️ Scoring Logic:</p>
                  <p>• <span className="font-semibold text-error">POI &lt; 5</span> = HIGH RISK (Score 80–100) → AI Voice activated immediately.</p>
                  <p>• <span className="font-semibold text-warning">POI 5–15</span> = MODERATE RISK (Score 40–79) → Visual cautionary banner.</p>
                  <p>• <span className="font-semibold text-success">POI &gt; 15</span> = SAFE (Score 0–39) → Normal regular monitoring.</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["OpenStreetMap API", "POI Density", "Risk Score 0-100", "2-min Interval"].map((badge) => (
                    <span key={badge} className="px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-bold">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mockup: Risk Zone Map */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[280px] h-[540px] bg-black rounded-[42px] p-3 shadow-2xl border-4 border-slate-800 relative">
                  <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 border border-slate-800"></div>
                  <div className="w-full h-[486px] rounded-[32px] bg-slate-900 p-3 text-white flex flex-col justify-between overflow-hidden relative">
                    {/* Simulated Map View */}
                    <div className="absolute inset-0 bg-[#0f172a] flex flex-col">
                      <div className="h-1/2 w-full bg-slate-800 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute w-24 h-24 rounded-full bg-red-500/20 border-2 border-red-500 animate-ping"></div>
                        <div className="absolute w-12 h-12 rounded-full bg-red-500/40 border border-red-400 flex items-center justify-center text-xs">
                          📍
                        </div>
                        <span className="absolute bottom-2 left-2 text-[9px] bg-black/60 px-1.5 py-0.5 rounded text-slate-300">
                          Overpass OSM 500m
                        </span>
                      </div>
                      <div className="h-1/2 bg-white p-3 text-slate-900 space-y-2">
                        <div className="p-2 bg-red-50 rounded-xl border border-red-200 text-error text-[10px] font-bold">
                          ⚠️ HIGH RISK ZONE — Low footfall area.
                        </div>
                        <div className="flex justify-between text-[11px] font-bold border-b pb-1">
                          <span>Risk Score:</span>
                          <span className="text-error">88 / 100</span>
                        </div>
                        <div className="flex justify-between text-[11px] border-b pb-1">
                          <span>Amenity POIs:</span>
                          <span className="font-bold">2 detected</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>Scan Interval:</span>
                          <span className="text-slate-500">Every 120s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feature 3: AI VOICE GUARDIAN */}
          {activeFeatureTab === 2 && (
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-[#E91E63] text-xs font-bold">
                  <span>Feature 03</span>
                  <span>•</span>
                  <span>Synthesized Audible Safety</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary font-heading flex items-center gap-2">
                  <span>🗣️</span>
                  <span>AI Voice Guardian</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  When you enter a high-risk zone, TRANA's AI Guardian speaks to you in a calm male voice: "Attention. You are in a low footfall area. Please move to a more populated area." If you don't respond in 2 minutes, SOS auto-triggers and calls your contacts.
                </p>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <p className="font-bold text-primary">⚙️ Psychology & Speech Engine:</p>
                  <p>• A calm, deep male voice acts as an assertive psychological deterrent to predators.</p>
                  <p>• Uses browser Web Speech API with pitch-shift optimization (`pitch=0.85`, `rate=0.95`).</p>
                  <p>• Visual 2-minute countdown starts immediately after voice synthesis ends.</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Web Speech API", "Male Voice", "2-min Countdown", "Auto-Escalation"].map((badge) => (
                    <span key={badge} className="px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-bold">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mockup: Voice Guardian Active */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[280px] h-[540px] bg-black rounded-[42px] p-3 shadow-2xl border-4 border-slate-800 relative">
                  <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 border border-slate-800"></div>
                  <div className="w-full h-[486px] rounded-[32px] bg-slate-900 p-4 text-white flex flex-col justify-between overflow-hidden">
                    <div className="text-center pt-4">
                      <div className="w-16 h-16 rounded-2xl bg-secondary text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-secondary/30">
                        <Bot className="w-9 h-9 animate-bounce" />
                      </div>
                      <h4 className="text-lg font-bold font-heading">AI Guardian Speaking</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Calm Male Voice Synthesis</p>
                    </div>

                    <div className="p-3 bg-red-600/30 border border-red-500 rounded-2xl text-center space-y-1">
                      <p className="text-[10px] uppercase font-bold text-amber-200">Safety Confirmation</p>
                      <div className="text-2xl font-mono font-black text-white">01:47</div>
                      <p className="text-[9px] text-slate-300">Auto-triggering SOS if unresponsive</p>
                    </div>

                    <div className="space-y-2">
                      <div className="w-full py-2.5 bg-success text-white font-bold rounded-xl text-center text-xs">
                        ✓ I'm Safe (Dismiss)
                      </div>
                      <div className="w-full py-2.5 bg-error text-white font-bold rounded-xl text-center text-xs">
                        Trigger SOS Now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feature 4: LIVE JOURNEY TRACKING */}
          {activeFeatureTab === 3 && (
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-success text-xs font-bold">
                  <span>Feature 04</span>
                  <span>•</span>
                  <span>Real-time Geofence</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary font-heading flex items-center gap-2">
                  <span>📍</span>
                  <span>Live Journey Tracking</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Share your real-time location with trusted contacts during an active journey. They see your live position on a map, your ETA, and your check-in status. Auto check-in every 15/30/60 minutes — if you miss one, alerts escalate automatically.
                </p>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <p className="font-bold text-primary">⚙️ Telemetry Specs:</p>
                  <p>• High-accuracy Geolocation API refresh every 60 seconds with satellite fallback.</p>
                  <p>• Configurable safe interval timers (15m, 30m, 60m) suited for cabs, autos, or metro.</p>
                  <p>• On journey conclusion, users earn +50 TRANA Coins directly to their profile balance.</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Geolocation API", "Google Maps", "Auto Check-in", "ETA Countdown"].map((badge) => (
                    <span key={badge} className="px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-bold">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mockup: Live Safar */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[280px] h-[540px] bg-black rounded-[42px] p-3 shadow-2xl border-4 border-slate-800 relative">
                  <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 border border-slate-800"></div>
                  <div className="w-full h-[486px] rounded-[32px] bg-slate-50 p-3 text-slate-900 flex flex-col justify-between overflow-hidden">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-primary">Active Safar</span>
                        <span className="text-[9px] bg-emerald-100 text-success font-bold px-2 py-0.5 rounded-full">
                          LIVE
                        </span>
                      </div>
                      <div className="h-32 bg-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center">
                        <span className="text-xs font-mono font-bold text-slate-600">Google Maps Live</span>
                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5 text-[10px]">
                      <div className="flex justify-between font-bold">
                        <span>To: South Ext. Metro</span>
                        <span className="text-secondary">Auto 🛺</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Target ETA:</span>
                        <span className="text-slate-800 font-bold">18:45 PM</span>
                      </div>
                      <div className="flex justify-between text-success font-bold">
                        <span>Next Check-In:</span>
                        <span>12m 30s</span>
                      </div>
                    </div>

                    <div className="w-full py-2.5 bg-success text-white font-bold rounded-xl text-center text-xs shadow-sm">
                      ✓ I'm Safe (Reset Timer)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feature 5: TRUSTED CONTACTS */}
          {activeFeatureTab === 4 && (
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#93773E] text-xs font-bold">
                  <span>Feature 05</span>
                  <span>•</span>
                  <span>Guardians Network</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary font-heading flex items-center gap-2">
                  <span>👥</span>
                  <span>Trusted Contacts</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Add family members and close friends as trusted contacts. Two-tier verification (SMS OTP + optional QR scan). Contacts receive live updates during journeys and instant alerts during SOS. Sharing can be revoked anytime with 5-second propagation.
                </p>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <p className="font-bold text-primary">⚙️ Privacy Architecture:</p>
                  <p>• Zero continuous tracking: location is shared ONLY when you explicitly start a journey.</p>
                  <p>• Unverified contacts can be validated via dev simulation or 6-digit SMS OTP.</p>
                  <p>• Contact relationship tagging supports Father, Mother, Sister, Spouse, and Close Friends.</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["OTP Verification", "QR Verification", "Instant Revoke", "Live Sync"].map((badge) => (
                    <span key={badge} className="px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-bold">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mockup: Contacts screen */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[280px] h-[540px] bg-black rounded-[42px] p-3 shadow-2xl border-4 border-slate-800 relative">
                  <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 border border-slate-800"></div>
                  <div className="w-full h-[486px] rounded-[32px] bg-slate-50 p-3 text-slate-900 flex flex-col justify-between overflow-hidden">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-primary">Trusted Contacts</span>
                        <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">+</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-accent text-white font-bold flex items-center justify-center text-[10px]">P</div>
                          <div>
                            <p className="text-[11px] font-bold">Papa</p>
                            <p className="text-[9px] text-slate-500">+91 9876543210</p>
                          </div>
                        </div>
                        <span className="text-[8px] bg-emerald-100 text-success font-bold px-1.5 py-0.5 rounded">✓ Verified</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-accent text-white font-bold flex items-center justify-center text-[10px]">A</div>
                          <div>
                            <p className="text-[11px] font-bold">Ananya (Sister)</p>
                            <p className="text-[9px] text-slate-500">+91 9811223344</p>
                          </div>
                        </div>
                        <span className="text-[8px] bg-yellow-100 text-warning font-bold px-1.5 py-0.5 rounded">Pending</span>
                      </div>
                    </div>

                    <div className="w-full py-2.5 bg-secondary text-white font-bold rounded-xl text-center text-xs shadow-sm">
                      + Add New Contact
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feature 6: TRANA COINS REWARDS */}
          {activeFeatureTab === 5 && (
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  <span>Feature 06</span>
                  <span>•</span>
                  <span>Incentivized Civic Safety</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary font-heading flex items-center gap-2">
                  <span>🏆</span>
                  <span>TRANA Coins Rewards</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Earn TRANA Coins for every safe journey completed (+50 coins) and for helping others as a volunteer (+200 coins per help). Redeem coins for Swiggy vouchers, mobile recharge, and TRANA Lifesaver merchandise. Sponsored by CSR partners.
                </p>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <p className="font-bold text-primary">⚙️ Economic Model:</p>
                  <p>• CSR & enterprise sponsorship pools fund real micro-incentives for active responders.</p>
                  <p>• Coins can be exchanged for safety equipment: personal alarms, pepper sprays, flashlights.</p>
                  <p>• Every coin transaction is cryptographically ledgered to prevent spoofing.</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["+50 per Safe Journey", "+200 per Help", "CSR Sponsored", "Voucher Redemption"].map((badge) => (
                    <span key={badge} className="px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-bold">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mockup: Coins screen */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[280px] h-[540px] bg-black rounded-[42px] p-3 shadow-2xl border-4 border-slate-800 relative">
                  <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 border border-slate-800"></div>
                  <div className="w-full h-[486px] rounded-[32px] bg-gradient-to-b from-amber-50 to-white p-4 text-slate-900 flex flex-col justify-between overflow-hidden">
                    <div className="text-center pt-2">
                      <div className="text-3xl mb-1">💎</div>
                      <h4 className="text-2xl font-black text-primary font-heading">1,250 TC</h4>
                      <p className="text-[10px] text-amber-700 font-bold uppercase">Lifesaver (Gold Tier)</p>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-amber-200 space-y-2 text-[10px]">
                      <p className="font-bold text-slate-700">Available Redemptions:</p>
                      <div className="flex justify-between items-center py-1 border-b">
                        <span>🍔 Swiggy ₹250 Voucher</span>
                        <span className="font-bold text-secondary">500 TC</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b">
                        <span>⚡ Mobile Recharge (₹199)</span>
                        <span className="font-bold text-secondary">400 TC</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span>🛡️ Safety Whistle & Siren</span>
                        <span className="font-bold text-secondary">300 TC</span>
                      </div>
                    </div>

                    <div className="w-full py-2.5 bg-primary text-white font-bold rounded-xl text-center text-xs shadow">
                      Redeem Vouchers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feature 7: LIFESAVER RANKS */}
          {activeFeatureTab === 6 && (
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                  <span>Feature 07</span>
                  <span>•</span>
                  <span>Social Recognition Ladder</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary font-heading flex items-center gap-2">
                  <span>🎖️</span>
                  <span>Lifesaver Ranks</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Progress through 7 ranks as you help more people: Beginner → Helper → Supporter → Guardian → Lifesaver → Champion → Legend. Each rank unlocks new privileges. Top Lifesavers receive physical medals and certificates.
                </p>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <p className="font-bold text-primary">⚙️ Rank Progression Milestones:</p>
                  <p>• <b>Beginner (0)</b>: Base responder tier.</p>
                  <p>• <b>Helper (1+)</b>: Green badge, first emergency attendance.</p>
                  <p>• <b>Supporter (5+)</b>: Blue badge, priority emergency beacon.</p>
                  <p>• <b>Guardian (15+)</b>: Purple badge, community safety lead.</p>
                  <p>• <b>Lifesaver (30+)</b>: Gold badge, state recognition eligible.</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["7 Ranks", "Permanent Badges", "Physical Rewards", "Leaderboard"].map((badge) => (
                    <span key={badge} className="px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-bold">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mockup: Rank Progression Ladder */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[280px] h-[540px] bg-black rounded-[42px] p-3 shadow-2xl border-4 border-slate-800 relative">
                  <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 border border-slate-800"></div>
                  <div className="w-full h-[486px] rounded-[32px] bg-slate-900 p-4 text-white flex flex-col justify-between overflow-hidden">
                    <div className="text-center">
                      <span className="text-2xl">🎖️</span>
                      <h4 className="text-base font-bold font-heading">Rank Ladder</h4>
                      <p className="text-[10px] text-slate-400">7 Tiers of Community Honor</p>
                    </div>

                    <div className="space-y-1.5 text-[10px]">
                      <div className="p-1.5 bg-yellow-500/20 border border-yellow-400 rounded-lg flex justify-between items-center text-amber-200 font-bold">
                        <span>🌟 Lifesaver</span>
                        <span>30+ Helps</span>
                      </div>
                      <div className="p-1.5 bg-purple-500/20 border border-purple-400 rounded-lg flex justify-between items-center text-purple-300">
                        <span>🛡️ Guardian</span>
                        <span>15+ Helps</span>
                      </div>
                      <div className="p-1.5 bg-blue-500/20 border border-blue-400 rounded-lg flex justify-between items-center text-blue-300">
                        <span>🤝 Supporter</span>
                        <span>5+ Helps</span>
                      </div>
                      <div className="p-1.5 bg-emerald-500/20 border border-emerald-400 rounded-lg flex justify-between items-center text-emerald-300">
                        <span>🌱 Helper</span>
                        <span>1+ Help</span>
                      </div>
                      <div className="p-1.5 bg-gray-500/20 border border-gray-400 rounded-lg flex justify-between items-center text-gray-300">
                        <span>⚪ Beginner</span>
                        <span>0 Helps</span>
                      </div>
                    </div>

                    <div className="w-full py-2 bg-gradient-to-r from-[#FF9933] to-[#E91E63] text-white font-bold rounded-xl text-center text-xs">
                      View Certificate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feature 8: APAHE LOG COMMUNITY (Phase 2) */}
          {activeFeatureTab === 7 && (
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-accent text-xs font-bold">
                  <span>Feature 08</span>
                  <span>•</span>
                  <span>Phase 2 Flagship Protocol</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary font-heading flex items-center gap-2">
                  <span>🛡️</span>
                  <span>APAHE LOG Community (Phase 2)</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  The flagship feature. When SOS triggers, nearby TRANA volunteers (within 500m) receive instant alerts. Female volunteers get priority. First responder arrives in 2-5 minutes — before police. Community-powered safety network.
                </p>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <p className="font-bold text-primary">⚙️ P2 Architecture:</p>
                  <p>• Bluetooth Low Energy (BLE) beacon broadcast triggers alarms on nearby peer phones.</p>
                  <p>• Strict volunteer vetting via government ID / DigiLocker verification in production.</p>
                  <p>• Dispatch dashboard routes responder with live step-by-step navigation.</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Phase 2", "Bluetooth Broadcast", "Volunteer Tiers", "Female Priority"].map((badge) => (
                    <span key={badge} className="px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-bold">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mockup: Volunteer Mesh */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[280px] h-[540px] bg-black rounded-[42px] p-3 shadow-2xl border-4 border-slate-800 relative">
                  <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 border border-slate-800"></div>
                  <div className="w-full h-[486px] rounded-[32px] bg-slate-900 p-3 text-white flex flex-col justify-between overflow-hidden">
                    <div className="space-y-2">
                      <div className="p-2 bg-rose-500/20 border border-rose-500 rounded-xl text-center">
                        <span className="text-[10px] font-bold text-rose-300">🚨 2 Volunteers En Route</span>
                      </div>
                      <div className="h-36 bg-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center">
                        <div className="absolute w-4 h-4 rounded-full bg-red-600 animate-ping"></div>
                        <div className="absolute top-4 left-6 text-xs bg-amber-500 text-black px-1.5 py-0.5 rounded font-bold">
                          Pooja (2m away)
                        </div>
                        <div className="absolute bottom-4 right-6 text-xs bg-amber-500 text-black px-1.5 py-0.5 rounded font-bold">
                          Rohan (4m away)
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/20 text-[10px] space-y-1">
                      <p className="font-bold text-amber-300">Nearby Responders:</p>
                      <p className="text-white/80">• Pooja S. (Guardian Tier) • ETA 2 mins</p>
                      <p className="text-white/80">• Rohan M. (Helper Tier) • ETA 4 mins</p>
                    </div>

                    <div className="w-full py-2.5 bg-secondary text-white font-bold rounded-xl text-center text-xs">
                      Live Responder Channel
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="bg-gradient-to-b from-[#1B2A4A] via-[#142340] to-[#0f1c33] text-white py-20 px-6 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#FF9933] tracking-widest uppercase mb-1 block">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-[36px] font-bold text-white font-heading leading-tight">
              How TRANA Works
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto mt-2">
              Proactive safety automated at every kilometer of your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm flex flex-col items-center text-center hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FF9933] text-white font-extrabold text-sm flex items-center justify-center mb-4 shadow-md">
                1
              </div>
              <div className="text-3xl mb-3">📱</div>
              <h3 className="text-base font-bold text-white mb-1.5 font-heading">
                Create Journey
              </h3>
              <p className="text-xs text-slate-300">
                Set destination & contacts
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm flex flex-col items-center text-center hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FF9933] text-white font-extrabold text-sm flex items-center justify-center mb-4 shadow-md">
                2
              </div>
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-base font-bold text-white mb-1.5 font-heading">
                AI Monitors
              </h3>
              <p className="text-xs text-slate-300">
                Background risk analysis
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm flex flex-col items-center text-center hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FF9933] text-white font-extrabold text-sm flex items-center justify-center mb-4 shadow-md">
                3
              </div>
              <div className="text-3xl mb-3">⚠️</div>
              <h3 className="text-base font-bold text-white mb-1.5 font-heading">
                Smart Alerts
              </h3>
              <p className="text-xs text-slate-300">
                Voice + visual warnings
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm flex flex-col items-center text-center hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#CC344D] text-white font-extrabold text-sm flex items-center justify-center mb-4 shadow-md">
                4
              </div>
              <div className="text-3xl mb-3">🚨</div>
              <h3 className="text-base font-bold text-white mb-1.5 font-heading">
                Auto-SOS
              </h3>
              <p className="text-xs text-slate-300">
                Escalation if unresponsive
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY TRANA SECTION */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-[#FF9933] tracking-widest uppercase mb-1 block">
              Core Pillars
            </span>
            <h2 className="text-3xl sm:text-[36px] font-bold text-[#1B2A4A] font-heading leading-tight">
              Why TRANA?
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto mt-2">
              Designed from the ground up for instantaneous safety when seconds matter most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-3xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-2xl flex items-center justify-center shrink-0">
                🆘
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1B2A4A] font-heading mb-1">
                  Silent SOS
                </h3>
                <p className="text-sm text-slate-600">
                  Triple-press power button, no screen interaction required.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-3xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-2xl flex items-center justify-center shrink-0">
                📍
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1B2A4A] font-heading mb-1">
                  Live Tracking
                </h3>
                <p className="text-sm text-slate-600">
                  Contacts see your location in real-time with satellite accuracy.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-3xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-2xl flex items-center justify-center shrink-0">
                🏆
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1B2A4A] font-heading mb-1">
                  Rewards
                </h3>
                <p className="text-sm text-slate-600">
                  Earn TRANA Coins for helping others and completing safe safars.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-3xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-2xl flex items-center justify-center shrink-0">
                🔒
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1B2A4A] font-heading mb-1">
                  Privacy First
                </h3>
                <p className="text-sm text-slate-600">
                  Your data, your control. Always encrypted and never sold to third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: "Implementation Status" (after Features) */}
      <section id="status" className="bg-[#FAFAF9] py-24 px-6 border-t border-slate-200/80 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-1 block">
              Roadmap & Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary font-heading">
              What's Built vs What's Coming
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto mt-2">
              Transparent engineering milestones from prototype to national mesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT: "✅ Available Now (Phase 1)" */}
            <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500/40 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="text-xl font-bold text-primary font-heading">
                    Available Now (Phase 1)
                  </h3>
                  <p className="text-xs text-success font-semibold">Live in Current Demo</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                {[
                  "Phone + OTP login",
                  "Profile setup",
                  "SOS button (3-sec hold)",
                  "Live journey tracking",
                  "Trusted contacts management",
                  "AI Risk Zone Detection",
                  "AI Voice Guardian",
                  "Auto-escalation (2-min)",
                  "TRANA Coins + ranks",
                  "Journey history",
                  "Settings + logout",
                  "PWA installable"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: "🚧 Coming Soon (Phase 2-3)" */}
            <div className="bg-white rounded-3xl p-8 border-2 border-amber-500/40 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <span className="text-2xl">🚧</span>
                <div>
                  <h3 className="text-xl font-bold text-primary font-heading">
                    Coming Soon (Phase 2-3)
                  </h3>
                  <p className="text-xs text-warning font-semibold">Under Active Development</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                {[
                  "Native Android app (Flutter)",
                  "Background location tracking",
                  "Silent SOS (power button)",
                  "APAHE LOG community alerts",
                  "AI voice calls to contacts",
                  "Police station auto-call",
                  "DLT-registered SMS",
                  "Decoy PIN screen",
                  "Phone snatching detection",
                  "Multi-language (Hindi + 5 regional)",
                  "Wearable integration",
                  "ERSS 112 integration"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-warning shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: "Technology Stack" (after Status) */}
      <section id="tech-stack" className="bg-white py-24 px-6 border-t border-slate-200/80 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 block">
              Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary font-heading">
              Built With Modern Tech
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto mt-2">
              High-availability web standards and telecommunication APIs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <span className="text-2xl mb-2 block">⚡</span>
              <h3 className="text-base font-bold text-primary font-heading mb-1">Frontend</h3>
              <p className="text-xs text-slate-600">
                React 18, TypeScript, Vite, Tailwind CSS v4, Progressive Web App (PWA) offline cache.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <span className="text-2xl mb-2 block">🗄️</span>
              <h3 className="text-base font-bold text-primary font-heading mb-1">Backend</h3>
              <p className="text-xs text-slate-600">
                Supabase (PostgreSQL, Auth, Realtime row-level security, edge functions).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <span className="text-2xl mb-2 block">🧠</span>
              <h3 className="text-base font-bold text-primary font-heading mb-1">AI & Telemetry</h3>
              <p className="text-xs text-slate-600">
                OpenStreetMap Overpass API, Web Speech API (calm male model), HTML5 Geolocation.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <span className="text-2xl mb-2 block">🗺️</span>
              <h3 className="text-base font-bold text-primary font-heading mb-1">Maps</h3>
              <p className="text-xs text-slate-600">
                Google Maps Embed, OpenStreetMap GIS vector nodes, 60-second coordinate stream.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <span className="text-2xl mb-2 block">☁️</span>
              <h3 className="text-base font-bold text-primary font-heading mb-1">Deploy & CDN</h3>
              <p className="text-xs text-slate-600">
                Vercel Edge Global CDN, Service Worker Asset Caching, HTTPS TLS 1.3 encryption.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <span className="text-2xl mb-2 block">🚀</span>
              <h3 className="text-base font-bold text-primary font-heading mb-1">Future Mesh</h3>
              <p className="text-xs text-slate-600">
                Flutter (native), Firebase Cloud Messaging, Twilio Voice, MSG91 DLT SMS gateway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STATS SECTION */}
      <section className="bg-[#FF9933] text-white py-14 px-6 shadow-inner">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black font-heading mb-1">
                100%
              </div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-100">
                Free Forever
              </p>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black font-heading mb-1">
                24/7
              </div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-100">
                Active Guardian
              </p>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black font-heading mb-1">
                0
              </div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-100">
                Data Leaks
              </p>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black font-heading mb-1">
                ∞
              </div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-100">
                Lives Protected
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: "Founder's Note" (after Tech Stack) */}
      <section className="bg-gradient-to-b from-[#1B2A4A] via-[#162544] to-[#0f1c33] text-white py-24 px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF9933] to-[#E91E63] p-1 mx-auto mb-6 shadow-xl flex items-center justify-center">
            <span className="text-2xl">✍️</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mb-6">
            Founder's Note
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-sm text-left">
            <p className="italic text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              "I'm a 21-year-old B.Tech student from Bhubaneswar. TRANA started as an idea when I realized that every woman in my life — my mother, sister, friends — has felt unsafe while traveling alone. I don't have all the answers, but I have a vision: a world where every woman carries an invisible bodyguard, powered by her community. This prototype is just the beginning. With your support, we can build the safety network India needs. — Satya, Founder, Bhubaneswar, Odisha 🇮🇳"
            </p>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="bg-gradient-to-b from-[#0f1c33] to-[#0a1424] text-white py-24 px-6 text-center relative overflow-hidden border-t border-white/10">
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-[36px] font-bold text-white font-heading mb-3">
            Ready to feel safe?
          </h2>

          <p className="text-base text-slate-300 mb-8">
            Try the live demo now. No signup required.
          </p>

          <div className="inline-block">
            <button
              type="button"
              onClick={onLaunchDemo}
              className="py-4 px-10 rounded-2xl bg-[#FF9933] hover:bg-[#e88825] text-white font-black text-lg tracking-wide shadow-[0_0_50px_rgba(255,153,51,0.6)] animate-pulse hover:animate-none transition-all cursor-pointer flex items-center justify-center gap-2 touch-target active:scale-95"
            >
              <span>Launch Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 text-xs text-amber-300 font-semibold flex items-center justify-center gap-2">
            <span>Built with ❤️ in Bhubaneswar, India 🇮🇳</span>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronUp className="w-4 h-4" />
              <span>Back to top</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-white/10 text-xs text-slate-500 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 TRANA. Police se pehle, apahe log. Every step, safe.</p>
          <div className="flex items-center gap-2 text-slate-400 font-semibold">
            <span>Emergency: 112 | Women Helpline: 181</span>
          </div>
        </div>
      </section>
    </div>
  );
};
