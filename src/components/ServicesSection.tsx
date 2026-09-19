import React, { useState } from 'react';
import { Clock, Check, ArrowRight, Sparkles, Filter, Info } from 'lucide-react';
import { SERVICES } from '../data/salonData';
import { Service, ServiceCategory } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);

  const filterTabs: { key: ServiceCategory; label: string }[] = [
    { key: 'all', label: 'All Services (8)' },
    { key: 'haircuts', label: 'Haircuts & Fades' },
    { key: 'beard', label: 'Beard & Shave' },
    { key: 'combos', label: 'Signature Combos' },
    { key: 'treatments', label: 'Styling & Care' },
  ];

  const filteredServices = SERVICES.filter((service) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'haircuts') return service.category === 'haircuts';
    if (selectedCategory === 'beard') return service.category === 'beard';
    if (selectedCategory === 'combos') return service.category === 'combos';
    if (selectedCategory === 'treatments') return service.category === 'treatments';
    return true;
  });

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-[#0e1017] border-t border-[#181a24]">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-64 bg-[#d4a373]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181b24] border border-[#262b3a] text-xs font-semibold text-[#d4a373] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>Master Grooming Menu</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Crafted Cuts. Surgical Lineups.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9da3b5] leading-relaxed">
            Every service begins with a tailored consultation to evaluate your face shape, natural hair growth pattern, and daily lifestyle demands.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === tab.key
                    ? 'bg-[#d4a373] text-[#0b0c10] shadow-md shadow-[#d4a373]/20 scale-105'
                    : 'bg-[#151722] text-[#9ca2b5] hover:text-white hover:bg-[#1f2230] border border-[#232736]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid (All 8 Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl bg-[#13151f] border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                service.popular
                  ? 'border-[#d4a373]/60 shadow-xl shadow-[#d4a373]/10 ring-1 ring-[#d4a373]/30'
                  : 'border-[#222634] hover:border-[#d4a373]/40 hover:shadow-lg hover:shadow-[#000]/40'
              }`}
            >
              {/* Popular / Tag Ribbon */}
              {service.tag && (
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider ${
                      service.popular
                        ? 'bg-[#d4a373] text-[#0b0c10]'
                        : 'bg-[#1e2230] text-[#cfd3df] border border-[#2f354a]'
                    }`}
                  >
                    {service.tag}
                  </span>
                </div>
              )}

              {/* Service Image Header */}
              <div className="relative h-44 w-full overflow-hidden bg-[#181a24]">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13151f] via-[#13151f]/40 to-transparent" />

                {/* Duration pill overlay */}
                <div className="absolute bottom-3 left-4 flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#0b0c10]/80 backdrop-blur-sm border border-[#272c3d] text-xs font-medium text-[#c4c9d8]">
                  <Clock className="w-3.5 h-3.5 text-[#d4a373]" />
                  <span>{service.durationMinutes} mins</span>
                </div>
              </div>

              {/* Service Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-[#d4a373] transition-colors">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#959caa] leading-relaxed line-clamp-2 mb-4">
                    {service.shortDescription}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-1.5 mb-5 border-t border-[#1d212d] pt-3">
                    {service.inclusions.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-center text-[11px] text-[#abb0bf]">
                        <Check className="w-3 h-3 text-[#d4a373] mr-2 shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Booking Button */}
                <div className="pt-3 border-t border-[#1d212d] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#7d8394] block uppercase font-medium">Standard</span>
                    <span className="text-2xl font-extrabold font-display text-white">
                      ${service.price}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveModalService(service)}
                      title="View service details"
                      className="p-2 rounded-xl bg-[#1a1d28] hover:bg-[#252a3a] text-gray-400 hover:text-white border border-[#292f42] transition-colors"
                      aria-label={`More info about ${service.name}`}
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onSelectService(service.id)}
                      id={`book-service-${service.id}`}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                        service.popular
                          ? 'bg-[#d4a373] text-[#0b0c10] hover:bg-[#e4b88b]'
                          : 'bg-[#202433] hover:bg-[#d4a373] text-white hover:text-[#0b0c10]'
                      }`}
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Micro Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#141722] border border-[#242938] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-white text-base sm:text-lg">
              Not sure which cut suits your jawline and hair density?
            </h4>
            <p className="text-xs sm:text-sm text-[#9399aa]">
              Every cut includes an in-depth consultation. Or explore our interactive Grooming Guide below.
            </p>
          </div>
          <a
            href="#guide"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#1c202d] hover:bg-[#272c3d] border border-[#2d3345] text-xs sm:text-sm font-semibold text-[#d4a373] transition-colors inline-flex items-center"
          >
            <span>Read Face Shape Guide</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </a>
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-[#141620] border border-[#2f3548] rounded-2xl p-6 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#222736]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4a373]">
                  Service Breakdown
                </span>
                <h3 className="font-display text-xl font-extrabold text-white">
                  {activeModalService.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#202534]"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-[#b0b5c4] leading-relaxed">
              {activeModalService.detailedDescription}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                What’s Included in This Ritual
              </h4>
              <ul className="space-y-2 bg-[#0d0f16] p-4 rounded-xl border border-[#1e2230]">
                {activeModalService.inclusions.map((item, i) => (
                  <li key={i} className="flex items-center text-xs text-gray-200">
                    <Check className="w-3.5 h-3.5 text-[#d4a373] mr-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">Investment</span>
                <span className="font-display text-2xl font-extrabold text-white">
                  ${activeModalService.price}
                </span>
                <span className="text-xs text-gray-400 ml-2">({activeModalService.durationMinutes} mins)</span>
              </div>

              <button
                onClick={() => {
                  const id = activeModalService.id;
                  setActiveModalService(null);
                  onSelectService(id);
                }}
                className="px-6 py-3 rounded-xl bg-[#d4a373] hover:bg-[#e4b88b] text-[#0b0c10] font-bold text-sm flex items-center space-x-2 shadow-lg cursor-pointer"
              >
                <span>Select & Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
