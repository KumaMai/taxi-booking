export type VehicleType = "sedan" | "suv" | "van";

export type PickupType = "airport" | "hotel" | "other";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type ContactChannel = "whatsapp" | "line" | "wechat" | "email";

export interface BookingFormData {
  fullName: string;
  phoneCountry: string;
  phone: string;
  email?: string;
  adultPassengers: number;
  childPassengers: number;
  pickupDate: string;
  pickupTime: string;
  vehicleType: VehicleType;
  pickupType: PickupType;
  pickupDetail?: string;
  dropoffLocation: string;
  mapsLink?: string;
  contactChannel: ContactChannel;
  contactInfo: string;
  notes?: string;
}
