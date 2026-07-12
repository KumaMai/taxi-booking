export type VehicleType = "SEDAN" | "SUV" | "VAN";

export type PickupType = "AIRPORT" | "HOTEL" | "OTHER";

export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export type ContactChannel = "WHATSAPP" | "LINE" | "WECHAT" | "EMAIL";

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
