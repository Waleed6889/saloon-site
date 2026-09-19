import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, CheckCircle2, ExternalLink } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const LocationContactSection: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [contactMessage, setContactMessage] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setContactMessage({ name: '', email: '', subject: 'General Question', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-[#0e1017] border-t border-[#181a24]">
      {/* Background ambient light */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#d4a373]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181b24] border border-[#272c3b] text-xs font-semibold text-[#d4a373] uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>Visit Our Soho Studio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Location & Direct Contact
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9ea4b5] leading-relaxed">
            Conveniently situated in the historic cobblestone heart of Soho, between Prince & Spring Street.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Address, Hours, Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Contact Card */}
            <div className="rounded-2xl bg-[#12141c] border border-[#232736] p-6 sm:p-7 shadow-xl space-y-6">
              <h3 className="font-display text-xl font-bold text-white pb-3 border-b border-[#1f2331]">
                Salon Concierge
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1a1d28] border border-[#282d3e] flex items-center justify-center text-[#d4a373] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">Flagship Address</span>
                    <span className="text-white font-bold block">{SALON_INFO.address}</span>
                    <span className="text-gray-400 block">{SALON_INFO.cityStateZip}</span>
                    <a
                      href="https://maps.google.com/?q=442+Mercer+St+New+York+NY"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#d4a373] hover:underline font-semibold mt-1 inline-flex items-center"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1a1d28] border border-[#282d3e] flex items-center justify-center text-[#d4a373] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">Direct Line & Walk-ins</span>
                    <a
                      href={`tel:${SALON_INFO.phoneClean}`}
                      className="text-white font-bold hover:text-[#d4a373] transition-colors"
                    >
                      {SALON_INFO.phone}
                    </a>
                    <span className="text-[11px] text-gray-500 block">Available during opening hours</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1a1d28] border border-[#282d3e] flex items-center justify-center text-[#d4a373] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">Email Desk</span>
                    <a
                      href={`mailto:${SALON_INFO.email}`}
                      className="text-white font-bold hover:text-[#d4a373] transition-colors"
                    >
                      {SALON_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours Schedule Box */}
              <div className="pt-4 border-t border-[#1f2331]">
                <div className="flex items-center space-x-2 text-xs font-bold text-white mb-3 uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-[#d4a373]" />
                  <span>Operating Hours</span>
                </div>
                <div className="space-y-2 text-xs">
                  {SALON_INFO.hours.map((h, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-[#181b24] last:border-0">
                      <span className="text-gray-400 font-medium">{h.days}</span>
                      <span className="text-white font-bold">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="p-5 rounded-2xl bg-[#12141c] border border-[#232736] flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white block">Follow Our Work</span>
                <span className="text-[11px] text-gray-400">Daily fades & backstage styling</span>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={SALON_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-[#1a1d28] border border-[#272c3b] flex items-center justify-center text-gray-300 hover:text-[#d4a373] hover:border-[#d4a373] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map Placeholder + Quick Message Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Map Visual Placeholder */}
            <div className="relative rounded-2xl overflow-hidden border border-[#282d3e] bg-[#11131b] shadow-xl h-64 sm:h-72">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                alt="Map view showing Soho district Mercer street location"
                className="w-full h-full object-cover object-center opacity-40 filter contrast-125"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0d0f16]/60 backdrop-blur-[1px]" />

              {/* Pin Marker Card in center of Map */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-xl bg-[#131520]/95 border border-[#d4a373]/60 shadow-2xl backdrop-blur-md text-center max-w-xs">
                <div className="w-10 h-10 rounded-full bg-[#d4a373] text-[#0b0c10] flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="font-display font-bold text-sm text-white">NOIR & FADE SOHO</div>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  442 Mercer Street, Soho, NY 10013
                </p>
                <a
                  href="https://maps.google.com/?q=442+Mercer+St+New+York+NY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-block text-xs font-bold text-[#0b0c10] bg-[#d4a373] hover:bg-[#e4ba8f] px-3.5 py-1.5 rounded-lg shadow"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="rounded-2xl bg-[#12141c] border border-[#232736] p-6 sm:p-7 shadow-xl">
              <h3 className="font-display text-lg font-bold text-white mb-1">
                Direct Inquiry or Event Booking
              </h3>
              <p className="text-xs text-gray-400 mb-5">
                Have a special request, private salon buyout, or media inquiry? Drop us a note.
              </p>

              {formSent ? (
                <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-700/50 text-emerald-300 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Thank you! Your message has been routed to our Soho concierge desk. We will respond within 2 business hours.</span>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Parker"
                        value={contactMessage.name}
                        onChange={(e) => setContactMessage({ ...contactMessage, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#161823] border border-[#262b3a] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4a373]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={contactMessage.email}
                        onChange={(e) => setContactMessage({ ...contactMessage, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#161823] border border-[#262b3a] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4a373]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Topic</label>
                    <select
                      value={contactMessage.subject}
                      onChange={(e) => setContactMessage({ ...contactMessage, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161823] border border-[#262b3a] text-xs text-white focus:outline-none focus:border-[#d4a373]"
                    >
                      <option>General Question</option>
                      <option>Wedding Party & Groomsmen Buyout</option>
                      <option>Product & Styling Advice</option>
                      <option>Career / Master Barber Auditions</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Message</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="How can our master barbers assist you?"
                      value={contactMessage.message}
                      onChange={(e) => setContactMessage({ ...contactMessage, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161823] border border-[#262b3a] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4a373]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#d4a373] hover:bg-[#e4ba8f] text-[#0b0c10] font-bold text-xs flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Concierge</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
