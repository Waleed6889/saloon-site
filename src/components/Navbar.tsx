import React, { useState, useEffect } from 'react';
import { Scissors, Phone, Menu, X, Clock, Calendar, ChevronRight } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Barbers', href: '#barbers' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#contact' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#12141a] text-xs border-b border-[#1f232e] text-[#a0a5b5] py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-emerald-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
              Open Today: 9:00 AM – 8:00 PM
            </span>
            <span className="hidden sm:inline text-gray-500">•</span>
            <span className="hidden sm:inline">Soho District, New York</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={`tel:${SALON_INFO.phoneClean}`}
              className="flex items-center space-x-1.5 hover:text-[#d4a373] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4a373]" />
              <span>{SALON_INFO.phone}</span>
            </a>
            <span className="text-gray-500 hidden md:inline">|</span>
            <span className="hidden md:inline text-gray-400">Walk-ins Welcome</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#202430] shadow-xl py-3.5'
            : 'bg-[#0b0c10]/80 backdrop-blur-sm border-b border-[#181a24] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a
            href="#home"
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-[#d4a373] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a2622] to-[#16171d] border border-[#d4a373]/40 flex items-center justify-center text-[#d4a373] shadow-md group-hover:border-[#d4a373] transition-colors">
              <Scissors className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-white flex items-center">
                NOIR <span className="text-[#d4a373] mx-1">&</span> FADE
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#8e94a5] uppercase font-medium">
                Barbershop Soho
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#b5bac7] hover:text-[#d4a373] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenBooking}
              id="nav-book-appointment-btn"
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#d4a373] via-[#e2b789] to-[#c59260] px-5 py-2.5 text-sm font-bold text-[#0c0d11] shadow-lg shadow-[#d4a373]/15 transition-all duration-300 hover:shadow-[#d4a373]/30 hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 xl:hidden">
            <button
              onClick={onOpenBooking}
              className="sm:hidden text-xs font-bold bg-[#d4a373] text-[#0b0c10] px-3 py-2 rounded-lg"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#191c26] focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0e1017] border-b border-[#202534] px-4 pt-4 pb-6 space-y-3 transition-all animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#1b1f2b]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#1a1d28] hover:text-[#d4a373] flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                </a>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4a373] to-[#b37d46] text-[#0b0c10] font-bold text-sm flex items-center justify-center space-x-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>

              <div className="flex items-center justify-between text-xs text-gray-400 px-2 pt-1">
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-[#d4a373]" /> Mon-Fri: 9am-8pm
                </span>
                <a href={`tel:${SALON_INFO.phoneClean}`} className="text-[#d4a373] font-medium">
                  {SALON_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
