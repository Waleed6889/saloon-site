import React from 'react';
import { Star, CheckCircle, Quote, MessageSquare } from 'lucide-react';
import { REVIEWS } from '../data/salonData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="relative py-20 lg:py-28 bg-[#0e1017] border-t border-[#181a24]">
      {/* Background ambient light */}
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-[#d4a373]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181b24] border border-[#272c3b] text-xs font-semibold text-[#d4a373] uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>Client Voices</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Rated 4.9★ by Over 500+ Clients
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9ea4b5] leading-relaxed">
            Real feedback from gentlemen, creatives, students, and professionals who trust our chairs week after week.
          </p>

          {/* Rating Summary Bar */}
          <div className="inline-flex items-center gap-4 mt-6 px-5 py-2.5 rounded-2xl bg-[#141620] border border-[#262c3d]">
            <div className="flex items-center text-[#d4a373]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-[#d4a373]" />
              ))}
            </div>
            <span className="text-xs font-semibold text-white">
              4.9 out of 5 based on <strong>540+ verified appointments</strong>
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl bg-[#12141d] border border-[#222634] hover:border-[#d4a373]/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl relative"
            >
              <Quote className="absolute top-4 right-4 w-7 h-7 text-[#252a3a] pointer-events-none" />

              <div>
                {/* Rating stars & date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-[#d4a373]">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current text-[#d4a373]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#cbd0df] leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1c202d] space-y-3">
                {/* Style badge */}
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-[#1a1d29] text-[#d4a373] font-medium border border-[#2a3044]">
                    {rev.haircut}
                  </span>
                  <span className="text-gray-400 text-[10px]">by {rev.barber}</span>
                </div>

                {/* Author info */}
                <div className="flex items-center space-x-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-9 h-9 rounded-full object-cover border border-[#292e40]"
                    loading="lazy"
                  />
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-bold text-white font-display">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <span title="Verified Customer">
                          <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" aria-label="Verified Customer" />
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400 block">Verified Soho Client</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
