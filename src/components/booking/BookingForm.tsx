"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";
import VehicleSelector from "./VehicleSelector";
import { bookingSchema, type BookingSchemaType } from "@/validations/booking";
import type { VehicleType } from "@/types";
import { cn } from "@/lib/utils";

// ─── Country codes ────────────────────────────────────────────
const COUNTRY_CODES = [
  { code: "+66", label: "🇹🇭 +66" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+81", label: "🇯🇵 +81" },
  { code: "+86", label: "🇨🇳 +86" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+60", label: "🇲🇾 +60" },
];

// ─── Helpers ─────────────────────────────────────────────────
function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-white/70 text-sm mb-1.5 font-medium">
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  );
}

function ErrorMsg({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-400 text-xs mt-1">{msg}</p>;
}

function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full bg-[#0a1628] border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#d4af37]/60 transition-colors ${className}`}
      {...props}
    />
  );
}

function Select({
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full bg-[#0a1628] border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37]/60 transition-colors appearance-none",
        className,
      )}
      {...props}
    />
  );
}

// ─── Success Card ─────────────────────────────────────────────
function SuccessCard({ bookingRef }: { bookingRef: string }) {
  return (
    <div className="text-center py-12 px-6">
      <CheckCircle className="w-16 h-16 text-[#d4af37] mx-auto mb-4" />
      <h2 className="text-white font-bold text-2xl mb-2">Booking Received!</h2>
      <p className="text-white/60 text-sm mb-4">
        We will contact you within{" "}
        <span className="text-[#d4af37] font-medium">1 minute</span>
      </p>
      <div className="bg-[#0f2040] border border-[#d4af37]/30 rounded-xl px-6 py-4 inline-block mb-6">
        <p className="text-white/50 text-xs mb-1">Booking Reference</p>
        <p className="text-[#d4af37] font-bold text-xl tracking-wider">
          {bookingRef}
        </p>
      </div>
      <p className="text-white/40 text-xs mb-6">
        Save this reference number for your records
      </p>
      <a
        href={
          "https://wa.me/66986822951?text=Hi!%20My%20booking%20ref%20is%20" +
          encodeURIComponent(bookingRef)
        }
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#20bc5a] text-white font-bold px-6 py-3 rounded-full transition-colors"
      >
        💬 Confirm via WhatsApp
      </a>
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────
export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [bookingRef, setBookingRef] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<BookingSchemaType>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      phoneCountry: "+66",
      adultPassengers: 1,
      childPassengers: 0,
      vehicleType: "SUV",
      pickupType: "AIRPORT",
      contactChannel: "WHATSAPP",
    },
  });

  const pickupType = watch("pickupType");

  // ─── Submit ─────────────────────────────────────────────────
  const onSubmit = async (data: BookingSchemaType) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.success) {
        setBookingRef(result.bookingRef);
        setStatus("success");
        toast.success("Booking submitted successfully!");
      } else {
        setStatus("idle");
        toast.error(
          result.message || "Something went wrong. Please try again.",
        );
      }
    } catch {
      setStatus("idle");
      toast.error("Network error. Please check your connection.");
    }
  };

  // ─── Success Screen ──────────────────────────────────────────
  if (status === "success") {
    return <SuccessCard bookingRef={bookingRef} />;
  }

  const isLoading = status === "loading";

  // ─── Form ────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ── Section 1: Personal Info ── */}
      <div className="bg-[#0f2040] border border-white/10 rounded-2xl p-6">
        <h3 className="text-[#d4af37] font-semibold text-base mb-5">
          👤 Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="md:col-span-2">
            <Label required>Full Name</Label>
            <Input placeholder="John Smith" {...register("fullName")} />
            <ErrorMsg msg={errors.fullName?.message} />
          </div>

          {/* Phone */}
          <div>
            <Label required>Phone Number</Label>
            <div className="flex gap-2 items-center">
              <Select className="w-28 shrink-0" {...register("phoneCountry")}>
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </Select>
              <Input
                className="min-w-0"
                placeholder="0912345678"
                {...register("phone")}
              />
            </div>
            <ErrorMsg msg={errors.phone?.message} />
          </div>

          {/* Email */}
          <div>
            <Label>Email (optional)</Label>
            <Input
              type="email"
              placeholder="example@email.com"
              {...register("email")}
            />
            <ErrorMsg msg={errors.email?.message} />
          </div>
        </div>
      </div>

      {/* ── Section 2: Trip Details ── */}
      <div className="bg-[#0f2040] border border-white/10 rounded-2xl p-6">
        <h3 className="text-[#d4af37] font-semibold text-base mb-5">
          🚗 Trip Details
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          {/* Adults */}
          <div>
            <Label required>Adults</Label>
            <Input
              type="number"
              min={1}
              max={9}
              {...register("adultPassengers", { valueAsNumber: true })}
            />
            <ErrorMsg msg={errors.adultPassengers?.message} />
          </div>

          {/* Children */}
          <div>
            <Label>Children</Label>
            <Input
              type="number"
              min={0}
              max={9}
              {...register("childPassengers", { valueAsNumber: true })}
            />
          </div>

          {/* Date */}
          <div>
            <Label required>Pickup Date</Label>
            <Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("pickupDate")}
            />
            <ErrorMsg msg={errors.pickupDate?.message} />
          </div>

          {/* Time */}
          <div>
            <Label required>Pickup Time</Label>
            <Input type="time" {...register("pickupTime")} />
            <ErrorMsg msg={errors.pickupTime?.message} />
          </div>
        </div>

        {/* Vehicle Type */}
        <div className="mb-5">
          <Label required>Vehicle Type</Label>
          <Controller
            name="vehicleType"
            control={control}
            render={({ field }) => (
              <VehicleSelector
                value={field.value as VehicleType}
                onChange={field.onChange}
                error={errors.vehicleType?.message}
              />
            )}
          />
        </div>

        {/* Pickup Type */}
        <div className="mb-4">
          <Label required>Pickup Location</Label>
          <div className="flex gap-4">
            {(["AIRPORT", "HOTEL", "OTHER"] as const).map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  value={type}
                  className="accent-[#d4af37]"
                  {...register("pickupType")}
                />
                <span className="text-white/70 text-sm capitalize">
                  {type === "AIRPORT"
                    ? "✈️ Airport"
                    : type === "HOTEL"
                      ? "🏨 Hotel"
                      : "📍 Other"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Pickup Detail (conditional) */}
        {pickupType && (
          <div className="mb-4">
            <Label>
              {pickupType === "AIRPORT"
                ? "Flight Number"
                : pickupType === "HOTEL"
                  ? "Hotel Name"
                  : "Pickup Address"}
            </Label>
            <Input
              placeholder={
                pickupType === "AIRPORT"
                  ? "e.g. TG208, FD3012"
                  : pickupType === "HOTEL"
                    ? "e.g. Le Meridien Khao Lak"
                    : "e.g. 123 Beach Road, Khao Lak"
              }
              {...register("pickupDetail")}
            />
          </div>
        )}

        {/* Drop-off */}
        <div className="mb-4">
          <Label required>Drop-off Location</Label>
          <Input
            placeholder="e.g. Patong Beach, Phuket Airport, Bangkok Hotel"
            {...register("dropoffLocation")}
          />
          <ErrorMsg msg={errors.dropoffLocation?.message} />
        </div>

        {/* Maps Link */}
        <div>
          <Label>Google Maps Link (optional)</Label>
          <Input
            placeholder="https://maps.app.goo.gl/..."
            {...register("mapsLink")}
          />
        </div>
      </div>

      {/* ── Section 3: Contact ── */}
      <div className="bg-[#0f2040] border border-white/10 rounded-2xl p-6">
        <h3 className="text-[#d4af37] font-semibold text-base mb-5">
          📱 Contact for Confirmation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contact Channel */}
          <div>
            <Label required>Contact Channel</Label>
            <Select {...register("contactChannel")}>
              <option value="WHATSAPP">💬 WhatsApp</option>
              <option value="LINE">📱 LINE</option>
              <option value="WECHAT">💚 WeChat</option>
              <option value="EMAIL">✉️ Email</option>
            </Select>
            <ErrorMsg msg={errors.contactChannel?.message} />
          </div>

          {/* Contact Info */}
          <div>
            <Label required>Your WhatsApp / LINE / Email</Label>
            <Input
              placeholder="+66812345678 or @lineid"
              {...register("contactInfo")}
            />
            <ErrorMsg msg={errors.contactInfo?.message} />
          </div>
        </div>
      </div>

      {/* ── Section 4: Notes ── */}
      <div className="bg-[#0f2040] border border-white/10 rounded-2xl p-6">
        <h3 className="text-[#d4af37] font-semibold text-base mb-5">
          📝 Notes / Special Requests
        </h3>
        <textarea
          rows={3}
          placeholder="e.g. Please provide a child seat. We have extra luggage."
          className="w-full bg-[#0a1628] border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#d4af37]/60 transition-colors resize-none"
          {...register("notes")}
        />
      </div>

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#d4af37] hover:bg-[#f4c430] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a1628] font-bold text-lg py-4 rounded-full transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Book Now"
        )}
      </button>

      <p className="text-center text-white/40 text-xs">
        ✓ No deposit required — Pay after your trip
      </p>
    </form>
  );
}
