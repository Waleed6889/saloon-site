export type ServiceCategory = 'all' | 'haircuts' | 'beard' | 'combos' | 'treatments';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  detailedDescription: string;
  price: number;
  durationMinutes: number;
  popular?: boolean;
  tag?: string;
  inclusions: string[];
  image: string;
}

export interface Barber {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  experienceYears: number;
  specialty: string;
  bio: string;
  image: string;
  rating: number;
  reviewsCount: number;
  instagram: string;
  tiktok?: string;
  availableDays: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'fades' | 'beards' | 'textures' | 'lounge' | 'craft';
  image: string;
  barberName: string;
  description: string;
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  haircut: string;
  barber: string;
  comment: string;
  verified: boolean;
}

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  popular?: boolean;
  savings?: string;
  durationMinutes: number;
  features: string[];
  recommendedFor: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'booking' | 'services' | 'policies';
}

export interface BookingState {
  serviceId: string;
  barberId: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  addonHotTowel: boolean;
  addonScalpMassage: boolean;
}

/** Payload sent to REST API backend (e.g. POST /api/appointments) */
export interface CreateAppointmentPayload {
  serviceId: string;
  serviceName: string;
  barberId: string;
  barberName: string;
  date: string; // Format: YYYY-MM-DD
  timeSlot: string; // Format: HH:mm
  durationMinutes: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  addons: {
    hotTowel: boolean;
    scalpMassage: boolean;
  };
}

/** Confirmed appointment response returned by backend database */
export interface AppointmentResponse {
  id: string;
  refCode: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  serviceName: string;
  barberName: string;
  date: string;
  timeSlot: string;
  durationMinutes: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: string;
  message?: string;
}

/** Slot availability item returned by backend (e.g. GET /api/availability?date=...) */
export interface SlotAvailability {
  timeSlot: string; // e.g. "14:00"
  available: boolean;
  reason?: 'booked' | 'break' | 'past' | 'unavailable';
}

/** Form validation error map */
export interface BookingFormErrors {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  date?: string;
  timeSlot?: string;
  serviceId?: string;
}

export interface GroomingTip {
  id: string;
  title: string;
  readTime: string;
  category: string;
  summary: string;
  content: string;
  image: string;
}
