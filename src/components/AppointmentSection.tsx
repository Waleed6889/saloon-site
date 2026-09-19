import React, { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Scissors,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  X,
  Server,
  Code2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Database,
  Radio,
  Check
} from 'lucide-react';
import { SERVICES, BARBERS, SALON_INFO } from '../data/salonData';
import {
  BookingState,
  CreateAppointmentPayload,
  AppointmentResponse,
  BookingFormErrors
} from '../types';
import {
  createAppointment,
  checkSlotAvailability,
  validateBookingForm,
  API_BASE_URL,
  isBackendConfigured
} from '../services/appointmentApi';

interface AppointmentSectionProps {
  initialServiceId?: string;
  initialBarberId?: string;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  initialServiceId,
  initialBarberId,
}) => {
  const [formData, setFormData] = useState<BookingState>({
    serviceId: initialServiceId || 'skin-fade',
    barberId: initialBarberId || 'any',
    date: '2026-09-19', // Default next day
    timeSlot: '14:00',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
    addonHotTowel: false,
    addonScalpMassage: false,
  });

  // REST API status & validation state
  const [formErrors, setFormErrors] = useState<BookingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isDoubleBookingConflict, setIsDoubleBookingConflict] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isCheckingSlots, setIsCheckingSlots] = useState(false);

  // Ready-for-backend payload preview (shown when VITE_API_URL is unconfigured, avoiding fake success bookings)
  const [preparedPayload, setPreparedPayload] = useState<CreateAppointmentPayload | null>(null);
  const [showPayloadInspector, setShowPayloadInspector] = useState(false);

  // Real backend confirmed appointment (populated ONLY when a real REST API returns 200/201)
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentResponse | null>(null);

  // Update when external props change (e.g. user clicks "Book This Cut" on a specific card)
  useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: initialServiceId }));
    }
  }, [initialServiceId]);

  useEffect(() => {
    if (initialBarberId) {
      setFormData((prev) => ({ ...prev, barberId: initialBarberId }));
    }
  }, [initialBarberId]);

  // Selected entities
  const selectedService = SERVICES.find((s) => s.id === formData.serviceId) || SERVICES[0];
  const selectedBarber = BARBERS.find((b) => b.id === formData.barberId);

  // Real-time price calculation
  const basePrice = selectedService ? selectedService.price : 55;
  const addonHotTowelPrice = formData.addonHotTowel ? 10 : 0;
  const addonScalpMassagePrice = formData.addonScalpMassage ? 15 : 0;
  const totalPrice = basePrice + addonHotTowelPrice + addonScalpMassagePrice;

  // Duration calculation
  let totalDuration = selectedService ? selectedService.durationMinutes : 45;
  if (formData.addonHotTowel) totalDuration += 10;
  if (formData.addonScalpMassage) totalDuration += 15;

  const availableDates = [
    { label: 'Today', sub: 'Sep 18', value: '2026-09-18' },
    { label: 'Tomorrow', sub: 'Sep 19', value: '2026-09-19' },
    { label: 'Saturday', sub: 'Sep 20', value: '2026-09-20' },
    { label: 'Sunday', sub: 'Sep 21', value: '2026-09-21' },
    { label: 'Monday', sub: 'Sep 22', value: '2026-09-22' },
    { label: 'Tuesday', sub: 'Sep 23', value: '2026-09-23' },
  ];

  const timeSlots = [
    { time: '10:00 AM', value: '10:00', period: 'morning' },
    { time: '11:15 AM', value: '11:15', period: 'morning' },
    { time: '12:30 PM', value: '12:30', period: 'afternoon' },
    { time: '02:00 PM', value: '14:00', period: 'afternoon' },
    { time: '03:15 PM', value: '15:15', period: 'afternoon' },
    { time: '04:30 PM', value: '16:30', period: 'afternoon' },
    { time: '05:45 PM', value: '17:45', period: 'evening' },
    { time: '07:00 PM', value: '19:00', period: 'evening' },
  ];

  // Poll or query backend for booked slots to prevent double-bookings
  const checkAvailability = useCallback(async (date: string, barberId?: string) => {
    if (!isBackendConfigured()) return;
    setIsCheckingSlots(true);
    try {
      const slots = await checkSlotAvailability(date, barberId);
      const unavailable = slots.filter((s) => !s.available).map((s) => s.timeSlot);
      setBookedSlots(unavailable);
    } catch {
      // If backend availability endpoint is not ready, keep default
    } finally {
      setIsCheckingSlots(false);
    }
  }, []);

  useEffect(() => {
    checkAvailability(formData.date, formData.barberId);
  }, [formData.date, formData.barberId, checkAvailability]);

  // Clear specific field error when user modifies that field
  const handleInputChange = (field: keyof BookingState, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof BookingFormErrors]) {
      setFormErrors((prev) => ({ ...prev, [field as keyof BookingFormErrors]: undefined }));
    }
    setApiError(null);
    setIsDoubleBookingConflict(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setIsDoubleBookingConflict(false);

    // 1. Client-Side Validation
    const errors = validateBookingForm({
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      date: formData.date,
      timeSlot: formData.timeSlot,
      serviceId: formData.serviceId,
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    // 2. Build structured REST API Payload
    const payload: CreateAppointmentPayload = {
      serviceId: formData.serviceId,
      serviceName: selectedService ? selectedService.name : 'Skin Fade',
      barberId: formData.barberId,
      barberName: selectedBarber ? selectedBarber.name : 'First Available Master',
      date: formData.date,
      timeSlot: formData.timeSlot,
      durationMinutes: totalDuration,
      totalPrice,
      customerName: formData.customerName.trim(),
      customerEmail: formData.customerEmail.trim(),
      customerPhone: formData.customerPhone.trim(),
      notes: formData.notes.trim() || undefined,
      addons: {
        hotTowel: formData.addonHotTowel,
        scalpMassage: formData.addonScalpMassage,
      },
    };

    // 3. Check if Replit Backend API is configured
    if (!isBackendConfigured()) {
      // Per instructions: DO NOT create a fake backend or fake successful booking.
      // Keep the frontend ready for API integration, show the validated payload and endpoint contract.
      setPreparedPayload(payload);
      return;
    }

    // 4. Send booking to real backend REST API
    setIsSubmitting(true);
    try {
      const result = await createAppointment(payload);

      if (result.success && result.data) {
        // Real appointment created and saved in backend database
        setConfirmedBooking(result.data);
        setPreparedPayload(null);
      } else if (result.isConflict) {
        // Backend detected double booking conflict (HTTP 409)
        setIsDoubleBookingConflict(true);
        setApiError(result.error || 'This slot was just reserved. Please select another time.');
        // Refresh slot availability from server
        checkAvailability(formData.date, formData.barberId);
      } else {
        setApiError(result.error || 'Failed to complete appointment reservation.');
      }
    } catch (err) {
      setApiError((err as Error).message || 'An unexpected error occurred while communicating with the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="relative py-20 lg:py-28 bg-[#0b0c10] border-t border-[#181a24]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-[#d4a373]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181b24] border border-[#272c3b] text-xs font-semibold text-[#d4a373] uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>Online Reservation Engine</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Reserve Your Chair
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9ea4b5] leading-relaxed">
            Select your desired ritual, choose your preferred master barber, and schedule your appointment slot.
          </p>
        </div>

        {/* Backend API Integration Status Indicator */}
        <div className="mb-10 p-3.5 rounded-xl bg-[#151824] border border-[#272e42] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#a0a7bb] max-w-3xl mx-auto">
          <div className="flex items-center space-x-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isBackendConfigured() ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              } shrink-0`}
            />
            <span>
              {isBackendConfigured() ? (
                <>
                  <strong className="text-white">REST API Connected:</strong> Dispatching to{' '}
                  <code className="text-[#d4a373] bg-[#0d0e15] px-1.5 py-0.5 rounded">{API_BASE_URL}</code>
                </>
              ) : (
                <>
                  <strong className="text-amber-300">Backend Ready:</strong> Appointment form prepared for Replit
                  REST API integration (<code className="text-gray-300">POST /api/appointments</code>).
                </>
              )}
            </span>
          </div>
          <span className="text-[10px] bg-[#202538] px-2.5 py-1 rounded text-gray-300 font-mono">
            {isCheckingSlots ? 'Checking Slots...' : isBackendConfigured() ? 'Live API Mode' : 'Ready for Replit API'}
          </span>
        </div>

        {/* Double Booking Conflict Alert (HTTP 409) */}
        {isDoubleBookingConflict && (
          <div className="mb-8 max-w-3xl mx-auto p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-200 text-xs flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-amber-300 text-sm mb-0.5">
                Time Slot Unavailable (Double Booking Prevention)
              </strong>
              <span>
                {apiError || 'This time slot is already reserved in the database. Please select another time or barber.'}
              </span>
            </div>
          </div>
        )}

        {/* General API Error Alert */}
        {apiError && !isDoubleBookingConflict && (
          <div className="mb-8 max-w-3xl mx-auto p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-200 text-xs flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-rose-300 text-sm mb-0.5">Booking Service Notice</strong>
              <span>{apiError}</span>
            </div>
          </div>
        )}

        {/* REST API Integration Ready Notice (shown when user submits before Replit backend is connected) */}
        {preparedPayload && !confirmedBooking && (
          <div className="mb-8 max-w-3xl mx-auto p-5 rounded-2xl bg-[#141724] border border-[#d4a373]/50 shadow-2xl text-xs space-y-3 animate-in fade-in duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#d4a373]/20 border border-[#d4a373]/40 flex items-center justify-center text-[#d4a373]">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Form Validated & Ready for Replit REST API</h4>
                  <p className="text-[#a1a8bd] text-[11px]">
                    Client-side validation passed. No fake booking was generated.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreparedPayload(null)}
                className="text-gray-400 hover:text-white p-1"
                aria-label="Dismiss API payload notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-gray-300 leading-relaxed">
              When your Replit backend is running, set{' '}
              <code className="text-[#d4a373] bg-[#0b0c10] px-1.5 py-0.5 rounded font-mono">VITE_API_URL</code> in{' '}
              <code className="text-white bg-[#0b0c10] px-1.5 py-0.5 rounded font-mono">.env</code> to your Replit URL
              (e.g.{' '}
              <span className="text-[#d4a373] font-mono">https://your-salon-backend.replit.app</span>). The frontend will
              automatically post this booking to{' '}
              <code className="text-emerald-400 font-mono">POST /api/appointments</code>.
            </p>

            <div className="pt-2 border-t border-[#23293d]">
              <button
                type="button"
                onClick={() => setShowPayloadInspector(!showPayloadInspector)}
                className="w-full flex items-center justify-between text-xs font-semibold text-[#d4a373] hover:underline"
              >
                <span className="flex items-center space-x-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{showPayloadInspector ? 'Hide Outgoing REST API JSON Payload' : 'Inspect Outgoing REST API JSON Payload'}</span>
                </span>
                {showPayloadInspector ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showPayloadInspector && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                    <span>Target: POST {API_BASE_URL || 'https://your-replit-app.replit.app'}/api/appointments</span>
                    <span>Content-Type: application/json</span>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-[#0b0c11] border border-[#212638] text-[11px] text-[#e0e4ef] font-mono overflow-x-auto max-h-60 leading-relaxed">
                    {JSON.stringify(preparedPayload, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Booking Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Interactive Form: 8 cols */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-8 bg-[#10121a] border border-[#1e2332] rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl"
            noValidate
          >
            {/* Step 1: Select Service */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="font-display text-base font-bold text-white flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#d4a373] text-[#0b0c10] text-xs font-black flex items-center justify-center mr-2.5">
                    1
                  </span>
                  Select Service Ritual
                </label>
                <span className="text-xs text-[#d4a373] font-semibold">
                  {selectedService ? selectedService.durationMinutes : 45} mins
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((service) => (
                  <button
                    type="button"
                    key={service.id}
                    onClick={() => handleInputChange('serviceId', service.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      formData.serviceId === service.id
                        ? 'bg-[#1a1f2e] border-[#d4a373] ring-1 ring-[#d4a373]/50 shadow-md'
                        : 'bg-[#151722] border-[#222636] hover:border-[#2f354a]'
                    }`}
                  >
                    <div className="pr-3">
                      <div className="font-display font-bold text-sm text-white flex items-center space-x-2">
                        <span>{service.name}</span>
                        {service.popular && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#d4a373]/20 text-[#d4a373] font-bold">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                        {service.shortDescription}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-display font-extrabold text-sm text-[#d4a373]">
                        ${service.price}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Master Barber */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="font-display text-base font-bold text-white flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#d4a373] text-[#0b0c10] text-xs font-black flex items-center justify-center mr-2.5">
                    2
                  </span>
                  Select Master Barber
                </label>
                <span className="text-xs text-gray-400">All stylists master-certified</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {/* First Available Option */}
                <button
                  type="button"
                  onClick={() => handleInputChange('barberId', 'any')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    formData.barberId === 'any'
                      ? 'bg-[#1e2333] border-[#d4a373] ring-1 ring-[#d4a373]/50'
                      : 'bg-[#151722] border-[#222636] hover:border-[#2f354a]'
                  }`}
                >
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#24293a] border border-[#33394e] flex items-center justify-center text-[#d4a373] mb-2">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="font-display font-bold text-xs text-white">First Available</div>
                  <div className="text-[10px] text-emerald-400 font-medium mt-0.5">Fastest Chair</div>
                </button>

                {BARBERS.map((barber) => (
                  <button
                    type="button"
                    key={barber.id}
                    onClick={() => handleInputChange('barberId', barber.id)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      formData.barberId === barber.id
                        ? 'bg-[#1e2333] border-[#d4a373] ring-1 ring-[#d4a373]/50'
                        : 'bg-[#151722] border-[#222636] hover:border-[#2f354a]'
                    }`}
                  >
                    <img
                      src={barber.image}
                      alt={barber.name}
                      className="w-10 h-10 mx-auto rounded-full object-cover border border-[#2a2f42] mb-2"
                    />
                    <div className="font-display font-bold text-xs text-white truncate">
                      {barber.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-[#d4a373] font-medium mt-0.5">
                      ★ {barber.rating}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Select Date & Time */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="font-display text-base font-bold text-white flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#d4a373] text-[#0b0c10] text-xs font-black flex items-center justify-center mr-2.5">
                    3
                  </span>
                  Choose Date & Time Slot
                </label>
                {isCheckingSlots && (
                  <span className="text-xs text-gray-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#d4a373] animate-spin" />
                    <span>Syncing availability...</span>
                  </span>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                {availableDates.map((d) => (
                  <button
                    type="button"
                    key={d.value}
                    onClick={() => handleInputChange('date', d.value)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      formData.date === d.value
                        ? 'bg-[#d4a373] text-[#0b0c10] border-[#d4a373] font-bold shadow-md'
                        : 'bg-[#151722] text-gray-300 border-[#222636] hover:bg-[#1a1d2b]'
                    }`}
                  >
                    <span className="block text-xs font-bold">{d.label}</span>
                    <span className="block text-[10px] opacity-80">{d.sub}</span>
                  </button>
                ))}
              </div>

              {/* Time Slots (with double-booking detection) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeSlots.map((slot) => {
                  const isBooked = bookedSlots.includes(slot.value);

                  return (
                    <button
                      type="button"
                      key={slot.value}
                      disabled={isBooked}
                      onClick={() => handleInputChange('timeSlot', slot.value)}
                      title={isBooked ? 'Slot unavailable / already booked in database' : `Select ${slot.time}`}
                      className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                        isBooked
                          ? 'bg-[#0d0e14] text-gray-600 border-[#1a1d28] cursor-not-allowed line-through opacity-60'
                          : formData.timeSlot === slot.value
                          ? 'bg-[#1e2333] border-[#d4a373] text-white ring-1 ring-[#d4a373] cursor-pointer'
                          : 'bg-[#151722] text-gray-300 border-[#222636] hover:border-[#2f354a] cursor-pointer'
                      }`}
                    >
                      <Clock className="w-3 h-3 inline mr-1 text-[#d4a373]" />
                      {slot.time}
                      {isBooked && (
                        <span className="block text-[9px] text-rose-400 font-normal no-underline">
                          Booked
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Luxury Add-ons */}
            <div className="pt-2 border-t border-[#1d212d]">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                Elevate Your Session (Optional Add-ons)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center space-x-3 p-3 rounded-xl bg-[#151722] border border-[#222636] cursor-pointer hover:border-[#2f354a]">
                  <input
                    type="checkbox"
                    checked={formData.addonHotTowel}
                    onChange={(e) => handleInputChange('addonHotTowel', e.target.checked)}
                    className="w-4 h-4 rounded text-[#d4a373] focus:ring-[#d4a373] bg-[#0b0c10] border-[#2f354a]"
                  />
                  <div className="text-xs">
                    <span className="text-white font-semibold block">Eucalyptus Hot Towel Steam</span>
                    <span className="text-gray-400">+10 mins (+$10)</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 rounded-xl bg-[#151722] border border-[#222636] cursor-pointer hover:border-[#2f354a]">
                  <input
                    type="checkbox"
                    checked={formData.addonScalpMassage}
                    onChange={(e) => handleInputChange('addonScalpMassage', e.target.checked)}
                    className="w-4 h-4 rounded text-[#d4a373] focus:ring-[#d4a373] bg-[#0b0c10] border-[#2f354a]"
                  />
                  <div className="text-xs">
                    <span className="text-white font-semibold block">Tea Tree Scalp Detox & Massage</span>
                    <span className="text-gray-400">+15 mins (+$15)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 4: Client Information with Validation */}
            <div className="pt-4 border-t border-[#1d212d]">
              <div className="flex items-center justify-between mb-4">
                <label className="font-display text-base font-bold text-white flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#d4a373] text-[#0b0c10] text-xs font-black flex items-center justify-center mr-2.5">
                    4
                  </span>
                  Your Information
                </label>
                <span className="text-xs text-gray-400">Confirmation dispatched from server</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#8f96a8] mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. Jordan Miller"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#151722] border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 ${
                        formErrors.customerName
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-[#242938] focus:border-[#d4a373] focus:ring-[#d4a373]'
                      }`}
                    />
                  </div>
                  {formErrors.customerName && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{formErrors.customerName}</span>
                    </p>
                  )}
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[#8f96a8] mb-1.5">
                    Mobile Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#151722] border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 ${
                        formErrors.customerPhone
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-[#242938] focus:border-[#d4a373] focus:ring-[#d4a373]'
                      }`}
                    />
                  </div>
                  {formErrors.customerPhone && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{formErrors.customerPhone}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#8f96a8] mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="jordan@example.com"
                      value={formData.customerEmail}
                      onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#151722] border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 ${
                        formErrors.customerEmail
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-[#242938] focus:border-[#d4a373] focus:ring-[#d4a373]'
                      }`}
                    />
                  </div>
                  {formErrors.customerEmail && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{formErrors.customerEmail}</span>
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#8f96a8] mb-1.5">
                    Notes & Hair Preferences (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Skin fade with low taper, textured fringe on top, sensitive neck skin..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#151722] border border-[#242938] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]"
                  />
                </div>
              </div>
            </div>

            {/* Mobile submit trigger */}
            <div className="pt-4 lg:hidden">
              <button
                type="submit"
                disabled={isSubmitting}
                id="mobile-submit-booking-btn"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4a373] via-[#e2b789] to-[#c59260] text-[#0b0c10] font-bold text-sm shadow-xl shadow-[#d4a373]/20 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin text-[#0b0c10]" />
                    <span>Connecting to Booking Server...</span>
                  </>
                ) : (
                  <>
                    <span>Book Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Right Summary & Checkout Sticky Card: 4 cols */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
            <div className="bg-[#10121a] border border-[#1e2332] rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#1f2331]">
                <h3 className="font-display text-base font-bold text-white">Booking Summary</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#1e2434] text-[#d4a373] font-semibold">
                  {totalDuration} Mins
                </span>
              </div>

              {/* Detail Items */}
              <div className="py-4 space-y-3 text-xs text-gray-300">
                <div className="flex items-start justify-between">
                  <span className="text-gray-400">Service:</span>
                  <span className="font-semibold text-white text-right">
                    {selectedService ? selectedService.name : 'Skin Fade'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Master Barber:</span>
                  <span className="font-semibold text-[#d4a373]">
                    {selectedBarber ? selectedBarber.name : 'First Available Master'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="font-semibold text-white">{formData.date}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Time Slot:</span>
                  <span className="font-semibold text-white">{formData.timeSlot}</span>
                </div>

                {/* Add-ons line items */}
                {formData.addonHotTowel && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>+ Eucalyptus Hot Towel:</span>
                    <span>+$10</span>
                  </div>
                )}
                {formData.addonScalpMassage && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>+ Scalp Detox & Massage:</span>
                    <span>+$15</span>
                  </div>
                )}
              </div>

              {/* Total Price Calculation */}
              <div className="pt-4 border-t border-[#1f2331] flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Estimated Total</span>
                  <span className="text-[10px] text-gray-500">Taxes included</span>
                </div>
                <div className="text-right">
                  <span className="font-display text-3xl font-extrabold text-white">
                    ${totalPrice}
                  </span>
                </div>
              </div>

              {/* Desktop Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                id="desktop-submit-booking-btn"
                className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4a373] via-[#e2b789] to-[#c59260] text-[#0b0c10] font-bold text-sm shadow-xl shadow-[#d4a373]/20 hover:shadow-[#d4a373]/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin text-[#0b0c10]" />
                    <span>Connecting to Server...</span>
                  </>
                ) : (
                  <>
                    <span>Book Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-gray-500 text-center mt-3">
                No cancellation fee up to 2 hours before your cut.
              </p>
            </div>

            {/* Quick Walk-in Note */}
            <div className="p-4 rounded-xl bg-[#141622] border border-[#212534] text-xs text-gray-400 flex items-start space-x-3">
              <Clock className="w-4 h-4 text-[#d4a373] shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold block mb-0.5">Need a walk-in right now?</span>
                <span>Call our concierge desk directly at {SALON_INFO.phone} for immediate chair status.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Backend Booking Confirmation Modal (Displayed ONLY when a real REST API responds) */}
      {confirmedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-lg w-full bg-[#13151f] border border-[#d4a373]/50 rounded-2xl p-5 sm:p-7 shadow-2xl text-center space-y-4 my-auto max-h-[95vh] overflow-y-auto">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Appointment Confirmed by Backend Server
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white mt-1">
                You're Booked at NOIR & FADE
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                Reference Code: <strong className="text-[#d4a373] font-mono">{confirmedBooking.refCode}</strong>
              </p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#1d2334] text-gray-300 border border-[#2b334a]">
                Database ID: {confirmedBooking.id}
              </span>
            </div>

            {/* Quick Summary Card */}
            <div className="bg-[#0b0c10] rounded-xl p-4 border border-[#222736] text-left text-xs space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400">Customer:</span>
                <span className="font-bold text-white">{confirmedBooking.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="font-bold text-[#d4a373] truncate max-w-[200px]">
                  {confirmedBooking.customerEmail}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Service:</span>
                <span className="font-bold text-white">{confirmedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Barber:</span>
                <span className="font-bold text-[#d4a373]">{confirmedBooking.barberName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date & Time:</span>
                <span className="font-bold text-white">
                  {confirmedBooking.date} at {confirmedBooking.timeSlot} ({confirmedBooking.durationMinutes} mins)
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#1a1e2b]">
                <span className="text-gray-300 font-bold">Total Due at Salon:</span>
                <span className="font-extrabold text-[#d4a373] text-sm">${confirmedBooking.totalPrice}</span>
              </div>
            </div>

            {confirmedBooking.message && (
              <p className="text-xs text-emerald-400 font-medium">
                {confirmedBooking.message}
              </p>
            )}

            <button
              onClick={() => {
                setConfirmedBooking(null);
                setFormData((prev) => ({
                  ...prev,
                  customerName: '',
                  customerEmail: '',
                  customerPhone: '',
                  notes: '',
                }));
              }}
              className="w-full py-3 rounded-xl bg-[#202433] hover:bg-[#2a3044] text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              Done & Return to Site
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
