import React from 'react';
import { Check, Sparkles, Clock, ArrowRight, Shield } from 'lucide-react';
import { PRICING_PACKAGES, SERVICES } from '../data/salonData';

interface PricingSectionProps {
  onSelectPackage: (packageName: string) => void;
  onBookService: (serviceId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPackage,
  onBookService,
}) => {
  return (
    <section id="pricing" className="relative py-20 lg:py-28 bg-[#0e1017] border-t border-[#181a24]">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-[#d4a373]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181b24] border border-[#272c3b] text-xs font-semibold text-[#d4a373] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>Transparent Grooming Plans</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Curated Packages & Simple Rates
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9ea4b5] leading-relaxed">
            No surprise surcharges. Every session includes hot towel steam, neck razor polish, and premium matte styling clay.
          </p>
        </div>

        {/* 3 Featured Bundled Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-16">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl bg-[#13151f] border p-7 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'border-[#d4a373] shadow-2xl shadow-[#d4a373]/10 ring-1 ring-[#d4a373]/30 scale-[1.02] bg-gradient-to-b from-[#181b27] to-[#12141c]'
                  : 'border-[#222634] hover:border-[#d4a373]/40'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#d4a373] to-[#b37d46] text-[#0b0c10] text-[11px] font-extrabold uppercase px-4 py-1 rounded-full tracking-wider shadow-md">
                  Most Requested Ritual
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#d4a373] uppercase tracking-wider">
                    {pkg.recommendedFor}
                  </span>
                  {pkg.savings && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-700/50 text-emerald-400">
                      {pkg.savings}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-extrabold text-white mb-1">
                  {pkg.name}
                </h3>
                <p className="text-xs text-[#8f95a5] leading-relaxed mb-6">
                  {pkg.tagline}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline space-x-2 pb-6 border-b border-[#1f2331]">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold text-white">
                    ${pkg.price}
                  </span>
                  <div className="text-xs text-gray-400">
                    <span className="block font-medium">/ session</span>
                    <span className="flex items-center text-[#d4a373]">
                      <Clock className="w-3 h-3 mr-1 inline" /> {pkg.durationMinutes} mins
                    </span>
                  </div>
                </div>

                {/* Feature Checklist */}
                <ul className="space-y-3 py-6">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-xs sm:text-sm text-[#cbd0de]">
                      <Check className="w-4 h-4 text-[#d4a373] mr-2.5 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Package CTA */}
              <button
                onClick={() => onSelectPackage(pkg.name)}
                id={`book-package-${pkg.id}`}
                className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer ${
                  pkg.popular
                    ? 'bg-[#d4a373] hover:bg-[#e4b98c] text-[#0b0c10] shadow-lg shadow-[#d4a373]/20'
                    : 'bg-[#1b1e2a] hover:bg-[#d4a373] text-white hover:text-[#0b0c10] border border-[#272c3b]'
                }`}
              >
                <span>Book This Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Mobile-Friendly Scannable A La Carte Rate Card */}
        <div className="rounded-2xl bg-[#12141c] border border-[#232736] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1f2331]">
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Individual A La Carte Services
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Targeted single treatments and maintenance appointments
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#d4a373] font-medium bg-[#1a1d28] px-3.5 py-1.5 rounded-lg border border-[#282d3e]">
              <Shield className="w-3.5 h-3.5" />
              <span>Complimentary Hair Wash with All Cuts</span>
            </div>
          </div>

          <div className="divide-y divide-[#1b1f2b]">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#151722]/60 px-3 rounded-xl transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-display font-bold text-white text-sm sm:text-base">
                      {srv.name}
                    </span>
                    {srv.popular && (
                      <span className="text-[10px] bg-[#d4a373]/15 text-[#d4a373] border border-[#d4a373]/30 px-2 py-0.5 rounded font-bold uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1">
                    {srv.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-6 shrink-0">
                  <div className="text-right">
                    <span className="font-display text-lg font-bold text-white block">
                      ${srv.price}
                    </span>
                    <span className="text-[11px] text-gray-500">{srv.durationMinutes} mins</span>
                  </div>

                  <button
                    onClick={() => onBookService(srv.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#1c202d] hover:bg-[#d4a373] text-gray-200 hover:text-[#0b0c10] border border-[#292e40] text-xs font-semibold transition-colors"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
