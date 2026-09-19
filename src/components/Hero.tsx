import React from 'react';
import { Calendar, ArrowRight, Star, ShieldCheck, Award, Sparkles, Scissors } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreServices }) => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0b0c10] pt-8 pb-16 lg:pt-14 lg:pb-24"
    >
      {/* Ambient background glow & subtle grid pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d4a373]/10 rounded-full blur-[130px] opacity-70" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#3a445d]/10 rounded-full blur-[100px]" />
        {/* Subtle geometric line accents */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#d4a373 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy, CTAs, Trust Metrics */}
          <div className="lg:col-span-7 text-left space-y-7 z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171922] border border-[#2b3040] text-xs font-semibold text-[#d4a373]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
              <span>SOHO’S PREMIER MEN’S GROOMING LOUNGE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6.5xl font-extrabold tracking-tight text-white leading-[1.08]">
              Precision Cuts. <br />
              <span className="gold-gradient-text">Architectural Fades.</span> <br />
              Define Your Edge.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#9ea4b5] max-w-xl leading-relaxed font-normal">
              Tailored grooming crafted for modern men who value razor-sharp discipline and bespoke style.
              From blurry skin tapers to artisan beard sculpting, elevate your presence with our master barbers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onBookClick}
                id="hero-book-now-btn"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-[#d4a373] via-[#e4ba8f] to-[#b37d46] text-[#0b0c10] shadow-xl shadow-[#d4a373]/20 hover:shadow-[#d4a373]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-5 h-5 mr-2.5" />
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreServices}
                id="hero-explore-services-btn"
                className="inline-flex items-center justify-center px-7 py-4 text-base font-semibold rounded-xl bg-[#151720] hover:bg-[#1f2230] border border-[#2c3142] text-white hover:text-[#d4a373] hover:border-[#d4a373]/50 transition-all duration-200 cursor-pointer"
              >
                <Scissors className="w-4 h-4 mr-2.5 text-[#d4a373]" />
                <span>Explore Services & Prices</span>
              </button>
            </div>

            {/* Trust Indicators Pill Bar */}
            <div className="pt-6 border-t border-[#1a1d29] grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
              <div className="flex flex-col">
                <div className="flex items-center text-[#d4a373] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-[#d4a373]" />
                  ))}
                  <span className="text-white text-xs font-bold ml-1.5">4.9/5</span>
                </div>
                <span className="text-xs text-[#848a9c] font-medium">500+ Verified Reviews</span>
              </div>

              <div className="flex flex-col border-l border-[#1f2331] pl-3 sm:pl-6">
                <div className="flex items-center space-x-1 text-white text-base font-extrabold font-display">
                  <ShieldCheck className="w-4 h-4 text-[#d4a373]" />
                  <span>100%</span>
                </div>
                <span className="text-xs text-[#848a9c] font-medium">Master Barbers Only</span>
              </div>

              <div className="flex flex-col border-l border-[#1f2331] pl-3 sm:pl-6">
                <div className="flex items-center space-x-1 text-white text-base font-extrabold font-display">
                  <Award className="w-4 h-4 text-[#d4a373]" />
                  <span>NYC Best</span>
                </div>
                <span className="text-xs text-[#848a9c] font-medium">Soho Grooming Award</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with Layered Floating Cards */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative framing */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#d4a373]/20 via-[#272a38] to-transparent blur-md opacity-80" />

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#292e3f] bg-[#12141c] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=85"
                  alt="Professional Master Barber executing precision fade haircut at NOIR & FADE"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />

                {/* Subtle dark gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent opacity-85" />

                {/* Bottom caption card inside image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#10121a]/85 backdrop-blur-md border border-[#2b3042] text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#d4a373]">
                      Master Barber Chair #1
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                      Accepting Bookings
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    Signature Low Fade + Hot Lather Beard Sculpt
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Consultation • Japanese Shears • Organic Matte Clay Finish
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-[#161822] border border-[#2b3040] shadow-2xl rounded-xl p-3 sm:p-3.5 flex items-center space-x-3 backdrop-blur-md animate-bounce-slow">
                <div className="w-10 h-10 rounded-lg bg-[#d4a373]/15 border border-[#d4a373]/30 flex items-center justify-center text-[#d4a373]">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-display">Blended to Perfection</div>
                  <div className="text-[11px] text-[#9096a9]">Zero-gap precision foil finish</div>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-[#161822] border border-[#2b3040] shadow-2xl rounded-xl p-3.5 items-center space-x-3 backdrop-blur-md">
                <div className="flex -space-x-2">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-[#161822] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Barber Marcus"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-[#161822] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Barber Leo"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-[#161822] object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                    alt="Barber Kai"
                  />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">4 Master Barbers On-Duty</div>
                  <div className="text-[11px] text-emerald-400 font-medium">Next slot in 35 mins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
