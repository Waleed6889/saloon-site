import React, { useState } from 'react';
import { BookOpen, Sparkles, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { GROOMING_TIPS } from '../data/salonData';
import { GroomingTip } from '../types';

export const GroomingGuideSection: React.FC = () => {
  const [selectedTip, setSelectedTip] = useState<GroomingTip | null>(null);

  return (
    <section id="guide" className="relative py-20 bg-[#0b0c10] border-t border-[#181a24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181b24] border border-[#272c3b] text-xs font-semibold text-[#d4a373] uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>The Style Journal & Grooming Guide</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Knowledge from the Barber’s Chair
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9ea4b5] leading-relaxed">
            Curated grooming protocols, haircut selection guides, and maintenance rituals engineered for men ages 18–25.
          </p>
        </div>

        {/* 3 Editorial Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {GROOMING_TIPS.map((tip) => (
            <article
              key={tip.id}
              onClick={() => setSelectedTip(tip)}
              className="group rounded-2xl bg-[#13151f] border border-[#222634] hover:border-[#d4a373]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#181a24]">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13151f] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-[#0b0c10]/80 backdrop-blur-sm border border-[#2b3040] px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#d4a373]">
                  {tip.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400 mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#d4a373]" />
                    <span>{tip.readTime}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#d4a373] transition-colors leading-snug mb-3">
                    {tip.title}
                  </h3>

                  <p className="text-xs text-[#959baa] leading-relaxed line-clamp-3 mb-4">
                    {tip.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1d212d] flex items-center justify-between text-xs font-bold text-[#d4a373]">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedTip && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-xl bg-[#141622] border border-[#2f3548] rounded-2xl p-6 sm:p-8 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#222736]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4a373]">
                {selectedTip.category}
              </span>
              <button
                onClick={() => setSelectedTip(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#202534]"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <h3 className="font-display text-2xl font-extrabold text-white">
              {selectedTip.title}
            </h3>

            <p className="text-xs text-[#8f96a8] italic">
              {selectedTip.summary}
            </p>

            <div className="text-sm text-[#cbd0de] leading-relaxed space-y-3 bg-[#0d0f17] p-5 rounded-xl border border-[#202536]">
              <p>{selectedTip.content}</p>
              <p className="text-xs text-gray-400 pt-2 border-t border-[#1a1f2e]">
                💡 <strong>Master Barber Recommendation:</strong> Bring this guide into your next appointment so our barbers can calibrate the exact clipper guard numbers (#0.5 to #2) to your head shape.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTip(null)}
                className="px-5 py-2.5 rounded-xl bg-[#1d212f] hover:bg-[#d4a373] text-white hover:text-[#0b0c10] text-xs font-bold transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
