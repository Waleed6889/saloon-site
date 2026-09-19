/**
 * REST API Client for NOIR & FADE Appointment Booking
 *
 * Prepared for integration with your external REST API backend (built in Replit).
 *
 * Backend Responsibilities:
 * - POST /api/appointments: Creates appointment in database, prevents double bookings, triggers email notifications.
 * - GET  /api/availability: Returns booked/available time-slots for a specific date & barber.
 * - GET  /api/appointments/:id: Fetches appointment details.
 */

import {
  CreateAppointmentPayload,
  AppointmentResponse,
  SlotAvailability,
  BookingFormErrors
} from '../types';

/**
 * Base URL for the Replit backend REST API.
 * Set VITE_API_URL in your environment (or .env file) to point to your Replit instance:
 * e.g., VITE_API_URL="https://your-salon-backend.replit.app"
 */
export const API_BASE_URL: string = (
  import.meta.env.VITE_API_URL || ''
).replace(/\/$/, '');

/**
 * Checks whether an external backend URL is currently configured in environment variables.
 */
export function isBackendConfigured(): boolean {
  return Boolean(API_BASE_URL && API_BASE_URL.trim().length > 0);
}

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
  isConflict?: boolean; // For 409 double-booking detection
}

/**
 * Client-side validation before sending data to backend
 */
export function validateBookingForm(payload: Partial<CreateAppointmentPayload>): BookingFormErrors {
  const errors: BookingFormErrors = {};

  if (!payload.customerName || !payload.customerName.trim()) {
    errors.customerName = 'Please enter your full name.';
  } else if (payload.customerName.trim().length < 2) {
    errors.customerName = 'Name must be at least 2 characters.';
  }

  if (!payload.customerEmail || !payload.customerEmail.trim()) {
    errors.customerEmail = 'Please enter your email address.';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.customerEmail.trim())) {
      errors.customerEmail = 'Please enter a valid email address.';
    }
  }

  if (!payload.customerPhone || !payload.customerPhone.trim()) {
    errors.customerPhone = 'Please enter your phone number.';
  } else {
    const phoneClean = payload.customerPhone.replace(/[^0-9+]/g, '');
    if (phoneClean.length < 7) {
      errors.customerPhone = 'Please enter a valid phone number with area code.';
    }
  }

  if (!payload.date) {
    errors.date = 'Please select an appointment date.';
  }

  if (!payload.timeSlot) {
    errors.timeSlot = 'Please select a preferred time slot.';
  }

  if (!payload.serviceId) {
    errors.serviceId = 'Please select a service ritual.';
  }

  return errors;
}

/**
 * Sends booking request to the backend REST API.
 * Handles 201 (Created), 409 (Double-booking conflict), and 400/500 errors.
 */
export async function createAppointment(
  payload: CreateAppointmentPayload
): Promise<ApiResult<AppointmentResponse>> {
  const endpoint = `${API_BASE_URL}/api/appointments`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json().catch(() => null);

    if (response.status === 201 || response.status === 200) {
      // Backend successfully saved appointment in database
      const appointment: AppointmentResponse = responseData?.appointment || {
        id: responseData?.id || 'apt_' + Date.now(),
        refCode: responseData?.refCode || responseData?.confirmationCode || 'NF-CONFIRMED',
        status: responseData?.status || 'confirmed',
        serviceName: payload.serviceName,
        barberName: payload.barberName,
        date: payload.date,
        timeSlot: payload.timeSlot,
        durationMinutes: payload.durationMinutes,
        totalPrice: payload.totalPrice,
        customerName: payload.customerName,
        customerEmail: payload.customerEmail,
        customerPhone: payload.customerPhone,
        createdAt: responseData?.createdAt || new Date().toISOString(),
        message: responseData?.message,
      };

      return {
        success: true,
        data: appointment,
        statusCode: response.status,
      };
    }

    if (response.status === 409) {
      // Double booking conflict detected by backend database lock
      return {
        success: false,
        statusCode: 409,
        isConflict: true,
        error:
          responseData?.message ||
          `The time slot ${payload.timeSlot} on ${payload.date} was just reserved by another client. Please select an alternate time slot.`,
      };
    }

    // Other API errors (validation, 500, etc.)
    return {
      success: false,
      statusCode: response.status,
      error:
        responseData?.message ||
        responseData?.error ||
        `Server returned status ${response.status}. Unable to complete booking.`,
    };
  } catch (err: unknown) {
    const isNetworkError = err instanceof TypeError;
    return {
      success: false,
      statusCode: 0,
      error: isNetworkError
        ? `Could not reach backend API at "${endpoint}". Ensure your Replit backend is running and CORS is enabled.`
        : (err as Error).message || 'Failed to connect to backend booking service.',
    };
  }
}

/**
 * Checks time slot availability from backend (GET /api/availability?date=...&barberId=...)
 * Allows backend to inform frontend which slots are already booked to prevent double-booking.
 */
export async function checkSlotAvailability(
  date: string,
  barberId?: string
): Promise<SlotAvailability[]> {
  if (!API_BASE_URL) {
    return [];
  }

  const queryParams = new URLSearchParams({ date });
  if (barberId && barberId !== 'any') {
    queryParams.append('barberId', barberId);
  }

  const endpoint = `${API_BASE_URL}/api/availability?${queryParams.toString()}`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data?.slots) ? data.slots : Array.isArray(data) ? data : [];
  } catch {
    // Backend availability endpoint offline or unconfigured
    return [];
  }
}
