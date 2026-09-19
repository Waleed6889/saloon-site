import React from 'react';
import { Scissors, Phone, Mail, MapPin, Instagram, Clock, ArrowUp } from 'lucide-react';
import { SALON_INFO, SERVICES } from '../data/salonData';

interface FooterProps {
  onOpenPolicy: (type: 'privacy' | 'terms' | 'cookie') => void;
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onBookClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090d] border-t border-[#181a24] text-[#8e95a7] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#171924]">
          {/* Column 1: Brand & Tagline (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a2622] to-[#16171d] border border-[#d4a373]/40 flex items-center justify-center text-[#d4a373]">
                <Scissors className="w-5 h-5 transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-wider text-white">
                  NOIR <span className="text-[#d4a373]">&</span> FADE
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#8e94a5] uppercase font-medium">
                  Barbershop Soho
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9298a8] max-w-sm leading-relaxed">
              Precision men’s grooming, surgical skin fades, and artisan beard architecture. Delivering distinguished confidence to modern gentlemen worldwide.
            </p>

            <div className="flex items-center space-x-3 pt-1">
              <a
                href={SALON_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141620] border border-[#232736] flex items-center justify-center text-gray-300 hover:text-[#d4a373] hover:border-[#d4a373] transition-colors"
                aria-label="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141620] border border-[#232736] flex items-center justify-center text-gray-300 hover:text-[#d4a373] hover:border-[#d4a373] transition-colors font-bold text-[11px]"
                aria-label="Follow on TikTok"
              >
                TT
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141620] border border-[#232736] flex items-center justify-center text-gray-300 hover:text-[#d4a373] hover:border-[#d4a373] transition-colors font-bold text-[11px]"
                aria-label="Follow on YouTube"
              >
                YT
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onBookClick}
                className="px-5 py-2.5 rounded-xl bg-[#d4a373] hover:bg-[#e2b789] text-[#0b0c10] font-bold text-xs transition-colors shadow-md"
              >
                Reserve a Chair Today
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services & Menu</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">Our Story & Heritage</a>
              </li>
              <li>
                <a href="#barbers" className="hover:text-white transition-colors">Master Barbers</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Visual Portfolio</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">Pricing Packages</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Client Testimonials</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Services */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Popular Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.id} className="flex justify-between items-center text-xs">
                  <span className="truncate pr-2">{s.name}</span>
                  <span className="text-[#d4a373] font-semibold">${s.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Flagship Soho
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4a373] shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}, {SALON_INFO.cityStateZip}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#d4a373] shrink-0" />
                <a href={`tel:${SALON_INFO.phoneClean}`} className="hover:text-white">
                  {SALON_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#d4a373] shrink-0" />
                <a href={`mailto:${SALON_INFO.email}`} className="hover:text-white">
                  {SALON_INFO.email}
                </a>
              </div>
              <div className="flex items-start space-x-2 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#d4a373] shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <div>Mon-Fri: 9:00 AM – 8:00 PM</div>
                  <div>Sat: 9:00 AM – 7:00 PM</div>
                  <div>Sun: 10:00 AM – 5:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71788a]">
          <div>
            © {new Date().getFullYear()} NOIR & FADE Barbershop LLC. All rights reserved. Precision Grooming Craft.
          </div>

          <div className="flex items-center space-x-5">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicy('cookie')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-[#141620] hover:bg-[#202534] text-gray-400 hover:text-white border border-[#232736] transition-colors flex items-center space-x-1"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
