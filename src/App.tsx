/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { BarbersSection } from './components/BarbersSection';
import { GallerySection } from './components/GallerySection';
import { PricingSection } from './components/PricingSection';
import { GroomingGuideSection } from './components/GroomingGuideSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AppointmentSection } from './components/AppointmentSection';
import { LocationContactSection } from './components/LocationContactSection';
import { FaqSection } from './components/FaqSection';
import { AdSenseBanner } from './components/AdSenseBanner';
import { PolicyModal } from './components/PolicyModals';
import { Footer } from './components/Footer';
import { Calendar, Phone } from 'lucide-react';
import { SALON_INFO } from './data/salonData';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('skin-fade');
  const [selectedBarberId, setSelectedBarberId] = useState<string>('any');
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | 'cookie' | null>(null);
  const [showFloatingBookBtn, setShowFloatingBookBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating quick book CTA on mobile/tablet after scrolling 400px
      setShowFloatingBookBtn(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAppointment = () => {
    const el = document.getElementById('appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollToAppointment();
  };

  const handleSelectBarber = (barberId: string) => {
    setSelectedBarberId(barberId);
    scrollToAppointment();
  };

  const handleSelectPackage = (packageName: string) => {
    // Map package selection to appropriate service
    if (packageName.toLowerCase().includes('royal')) {
      setSelectedServiceId('premium-grooming');
    } else if (packageName.toLowerCase().includes('icon')) {
      setSelectedServiceId('hair-beard');
    } else {
      setSelectedServiceId('skin-fade');
    }
    scrollToAppointment();
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7ec] flex flex-col selection:bg-[#d4a373] selection:text-[#0b0c10]">
      {/* Primary Sticky Header */}
      <Navbar onOpenBooking={scrollToAppointment} />

      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onBookClick={scrollToAppointment}
          onExploreServices={scrollToServices}
        />

        {/* 2. Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 3. About Section */}
        <AboutSection />

        {/* 4. Barbers Section */}
        <BarbersSection onSelectBarber={handleSelectBarber} />

        {/* 5. Gallery Section */}
        <GallerySection onBookStyle={scrollToAppointment} />

        {/* AdSense Ready Slot (Non-intrusive, placed between primary sections) */}
        <AdSenseBanner format="horizontal" />

        {/* 6. Pricing Section */}
        <PricingSection
          onSelectPackage={handleSelectPackage}
          onBookService={handleSelectService}
        />

        {/* 7. Grooming Guide & Editorial Journal (High SEO & AdSense value) */}
        <GroomingGuideSection />

        {/* 8. Reviews Section */}
        <ReviewsSection />

        {/* 9. Appointment Section */}
        <AppointmentSection
          initialServiceId={selectedServiceId}
          initialBarberId={selectedBarberId}
        />

        {/* 10. Location & Direct Contact Section */}
        <LocationContactSection />

        {/* 11. FAQ Section */}
        <FaqSection />
      </main>

      {/* 12. Footer */}
      <Footer
        onOpenPolicy={(type) => setActivePolicy(type)}
        onBookClick={scrollToAppointment}
      />

      {/* Legal & Compliance Modals (Privacy, Terms, Cookies for AdSense compliance) */}
      <PolicyModal
        type={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Mobile Floating Quick Action Bar */}
      {showFloatingBookBtn && (
        <div className="fixed bottom-4 inset-x-4 z-40 sm:hidden flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <a
            href={`tel:${SALON_INFO.phoneClean}`}
            className="p-3.5 rounded-xl bg-[#141620] border border-[#272d3f] text-[#d4a373] shadow-2xl flex items-center justify-center shrink-0"
            aria-label="Call salon directly"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={scrollToAppointment}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#d4a373] via-[#e4ba8f] to-[#b37d46] text-[#0b0c10] font-black text-sm shadow-2xl shadow-[#d4a373]/30 flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment Online</span>
          </button>
        </div>
      )}
    </div>
  );
}

