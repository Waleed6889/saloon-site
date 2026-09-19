import React from 'react';
import { Award, Users, Scissors, Star, CheckCircle2, Coffee, ShieldCheck, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: 'Japanese Steel & Master Craft',
      description: 'We exclusively work with handcrafted 440C Japanese shears and zero-gapped cordless clippers calibrated weekly for feather-weight skin blends.'
    },
    {
      icon: ShieldCheck,
      title: 'Natural & Organic Formulations',
      description: 'No harsh sulfates or artificial fragrances. Our pomades, matte clays, and eucalyptus shave oils nourish hair follicles and prevent scalp irritation.'
    },
    {
      icon: Coffee,
      title: 'Soho Sanctuary Atmosphere',
      description: 'Step into a serene, ambient lounge. Custom leather Belmont chairs, curated lo-fi vinyl soundscapes, and complimentary single-origin espresso.'
    },
    {
      icon: Users,
      title: 'Unrushed Bespoke Consultations',
      description: 'We allocate 45–90 full minutes per client. We never double-book or rush through chairs, ensuring every edge and taper is scrutinized.'
    }
  ];

  return (
    <section id="about" className="relative py-20 lg:py-32 bg-[#0b0c10] border-t border-[#181b24] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#d4a373]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase Collage */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-lg">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden border border-[#272b3a] shadow-2xl bg-[#131620]">
                <img
                  src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80"
                  alt="NOIR & FADE Soho Barbershop interior lounge with vintage barber chairs"
                  className="w-full h-[480px] object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10]/90 via-transparent to-transparent" />

                {/* Floating experience pill */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#12141c]/90 backdrop-blur-md border border-[#2c3244] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#d4a373]/15 border border-[#d4a373]/30 flex items-center justify-center text-[#d4a373]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                        The Soho Standard
                      </h4>
                      <p className="text-[11px] text-[#9399aa]">
                        Established 2017 • Mercer Street
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-[#d4a373] font-display">9+ Yrs</span>
                    <span className="block text-[10px] text-gray-400">Continuous Craft</span>
                  </div>
                </div>
              </div>

              {/* Smaller overlay card */}
              <div className="hidden sm:block absolute -top-6 -right-6 w-48 rounded-xl bg-[#171924] border border-[#2f3548] p-4 shadow-xl">
                <div className="flex items-center space-x-1 text-[#d4a373] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div className="text-sm font-bold text-white font-display">4.9 / 5.0 Rating</div>
                <div className="text-[10px] text-gray-400 mt-0.5">540+ Google Reviews</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181b24] border border-[#282d3e] text-xs font-semibold text-[#d4a373] uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#d4a373]" />
              <span>Our Philosophy & Heritage</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Where Old-World Barbering Meets <span className="gold-gradient-text">Modern Precision.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#9ba2b3] leading-relaxed">
              Founded in 2017 on Mercer Street in Soho, <strong>NOIR & FADE</strong> was created as an antidote to clinical chain salons and rushed 15-minute haircut factories.
            </p>

            <p className="text-sm sm:text-base text-[#9ba2b3] leading-relaxed">
              We believe a haircut is an architecture of self-confidence. By combining disciplined Japanese blade techniques with London street aesthetics and modern downtown New York swagger, we deliver cuts that don’t just look flawless walking out our door—they maintain clean geometry as they grow out over weeks.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#12141c] border border-[#202534] hover:border-[#d4a373]/30 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#1a1d28] border border-[#2b3142] flex items-center justify-center text-[#d4a373] mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-white mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#8c92a2] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#1d212d] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {SALON_INFO.stats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#12141d] border border-[#202432]">
              <div className="font-display text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-white gold-gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#8f96a8]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
