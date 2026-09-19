import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { FAQS } from '../data/salonData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-[#0b0c10] border-t border-[#181a24]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d4a373]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181b24] border border-[#272c3b] text-xs font-semibold text-[#d4a373] uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>Common Questions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-[#9ea4b5] leading-relaxed">
            Everything you need to know about our Soho studio appointments, master barbers, and grooming policies.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#141723] border-[#d4a373]/40 shadow-lg'
                    : 'bg-[#12141c] border-[#222635] hover:border-[#2f3549]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="font-display font-bold text-sm sm:text-base text-white pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#d4a373] text-[#0b0c10] rotate-180'
                        : 'bg-[#1b1f2d] text-gray-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#a4abbd] leading-relaxed border-t border-[#1b1f2d] animate-in fade-in duration-200"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#131520] border border-[#232738]">
          <p className="text-xs sm:text-sm text-[#9298a8]">
            Have a question that isn't answered here? Reach out to our concierge at{' '}
            <a href="mailto:concierge@noirandfade.com" className="text-[#d4a373] font-semibold underline">
              concierge@noirandfade.com
            </a>{' '}
            or call{' '}
            <a href="tel:+12125550198" className="text-[#d4a373] font-semibold underline">
              +1 (212) 555-0198
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};
