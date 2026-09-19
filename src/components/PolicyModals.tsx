import React from 'react';
import { X, Shield, FileText, Cookie } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | 'cookie' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-[#13151f] border border-[#2b3042] rounded-2xl p-6 sm:p-8 shadow-2xl text-left space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#212636]">
          <div className="flex items-center space-x-2.5">
            {type === 'privacy' && <Shield className="w-5 h-5 text-[#d4a373]" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-[#d4a373]" />}
            {type === 'cookie' && <Cookie className="w-5 h-5 text-[#d4a373]" />}
            <h3 className="font-display text-xl font-bold text-white">
              {type === 'privacy' && 'Privacy Policy'}
              {type === 'terms' && 'Terms & Conditions'}
              {type === 'cookie' && 'Cookie Policy'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1d212f] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs sm:text-sm text-[#a4abba] leading-relaxed space-y-4">
          {type === 'privacy' && (
            <>
              <p>
                <strong>Last Updated: September 2026</strong>
              </p>
              <p>
                At <strong>NOIR & FADE Barbershop</strong>, we respect your privacy and are committed to protecting the personal information you share with us when booking appointments, contacting our concierge, or using our digital services.
              </p>
              <h4 className="font-bold text-white text-sm">1. Information We Collect</h4>
              <p>
                When reserving a chair or communicating with our team, we collect your name, email address, mobile phone number, and haircut preferences. This data is exclusively used to process your reservations, send appointment reminders, and customize your grooming experience.
              </p>
              <h4 className="font-bold text-white text-sm">2. Use of Information</h4>
              <p>
                We do not sell, rent, or trade your personal data to third parties. Information is solely retained for internal salon scheduling, client history records, and service fulfillment.
              </p>
              <h4 className="font-bold text-white text-sm">3. Data Security & Storage</h4>
              <p>
                We employ industry-standard encryption and operational safeguards to protect your personal details against unauthorized access, loss, or disclosure.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                <strong>Last Updated: September 2026</strong>
              </p>
              <p>
                Welcome to the <strong>NOIR & FADE</strong> website. By browsing our website, reserving appointments, or engaging our master barbers, you agree to comply with and be bound by the following terms and conditions.
              </p>
              <h4 className="font-bold text-white text-sm">1. Booking & Cancellation Policy</h4>
              <p>
                Appointments may be canceled or rescheduled without penalty up to two (2) hours prior to the scheduled start time. Cancellations with less than 2 hours notice or failure to appear may result in a non-refundable booking hold fee for future sessions.
              </p>
              <h4 className="font-bold text-white text-sm">2. Salon Etiquette & Punctuality</h4>
              <p>
                To respect all patrons and maintain our dedicated time slots, please arrive 5–10 minutes prior to your appointment. Late arrivals exceeding 15 minutes may necessitate modifying or rescheduling the service.
              </p>
              <h4 className="font-bold text-white text-sm">3. Demonstration Disclaimer</h4>
              <p>
                This website is presented as a high-fidelity demonstration of modern web design and digital salon booking. Real payment processing and SMS gateways connect to authorized production merchant partners upon launch.
              </p>
            </>
          )}

          {type === 'cookie' && (
            <>
              <p>
                <strong>Last Updated: September 2026</strong>
              </p>
              <p>
                This Cookie Policy explains how <strong>NOIR & FADE</strong> uses cookies and similar tracking technologies to improve user experience, remember your booking selections, and analyze traffic.
              </p>
              <h4 className="font-bold text-white text-sm">1. Essential Cookies</h4>
              <p>
                Required for core website navigation, keeping your selected appointment ritual saved in memory, and maintaining secure sessions.
              </p>
              <h4 className="font-bold text-white text-sm">2. Analytics & Performance Cookies</h4>
              <p>
                Help us understand how visitors interact with our service menu, gallery, and grooming guides so we can optimize load times and readability.
              </p>
              <h4 className="font-bold text-white text-sm">3. Managing Your Preferences</h4>
              <p>
                You can configure your browser settings to decline or delete cookies at any time. Disabling essential cookies may impact certain booking interactions.
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-[#212636] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#d4a373] text-[#0b0c10] font-bold text-xs hover:bg-[#e4ba8f] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
