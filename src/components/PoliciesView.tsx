import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, FileText, Ban, Trash2 } from 'lucide-react';

export const PoliciesView: React.FC = () => {
  return (
    <div className="w-full bg-midnight min-h-screen pt-28 pb-16 px-6 lg:px-12 font-sans text-white">
      <div className="max-w-[1200px] w-full mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="text-xs font-sans font-bold tracking-[3px] text-gold uppercase">HOTEL DISCLOSURES</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ivory">House Rules & Policies</h1>
          <p className="text-sm text-stone-gray leading-relaxed">
            Please read our official property disclosures, unmarried couples check-in limitations, and booking cancellation terms carefully to prevent any confusion during arrival.
          </p>
        </div>

        {/* Categories of disclosures */}
        <div className="space-y-10 text-left">
          
          {/* Couple Policy (Highly highlighted) */}
          <div className="bg-red-950/25 border border-red-500/30 p-8 rounded-md space-y-4 shadow-xl">
            <div className="flex items-center space-x-2.5 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-serif font-bold uppercase tracking-[1px]">Unmarried Couples Limitation</h3>
            </div>
            <p className="text-xs text-stone-gray leading-relaxed">
              Per strict administrative guidelines and municipal regulations of Azamgarh, Uttar Pradesh, <strong className="text-red-300">unmarried couples are strictly not permitted to check-in or share accommodations at this property</strong>. 
            </p>
            <p className="text-xs text-stone-gray leading-relaxed">
              Check-in will be immediately denied by the front desk management if a booking violates this regulation. No refund will be issued or processed under these circumstances. Couples may be requested to produce valid proof of marriage (e.g. spouse name matching in government records or marital certificates) if queried by the front office management.
            </p>
          </div>

          {/* Identification proof policy */}
          <div className="bg-[#0f141c] border border-gold/10 p-8 rounded-md space-y-4">
            <div className="flex items-center space-x-2.5 text-gold">
              <ShieldAlert className="w-5.5 h-5.5" />
              <h3 className="text-base font-sans font-bold uppercase tracking-[1px]">Mandatory Identification (ID) Proof</h3>
            </div>
            <p className="text-xs text-stone-gray leading-relaxed">
              Every adult checking into the hotel must produce an original, valid, government-issued photo identity proof. <br />
              - <strong className="text-ivory">Residents of India:</strong> Aadhaar Card, Passport, Voter ID Card, or Driving License. (PAN card is strictly NOT accepted as proof of residence). <br />
              - <strong className="text-ivory">Foreign Nationals & NRIs:</strong> Original Passport along with a valid Indian Visa or OCI card is mandatory for check-in. Form-C details will be logged per regulations.
            </p>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-[#0f141c] border border-gold/10 p-8 rounded-md space-y-4">
            <div className="flex items-center space-x-2.5 text-gold">
              <Trash2 className="w-5.5 h-5.5" />
              <h3 className="text-base font-sans font-bold uppercase tracking-[1px]">Cancellation & Refund Policy</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-gray leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-ivory uppercase tracking-[0.5px]">Flexible Booking Rates</h4>
                <p>
                  Reservations booked under our Standard Flexible Rate plans may be cancelled free of charge up to <strong className="text-gold">24 hours prior to standard check-in time (2:00 PM on arrival date)</strong>. Cancellations within the 24-hour window will incur a penalty charge equivalent to one night's stay base fare.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-ivory uppercase tracking-[0.5px]">Advance Purchase - Non-Refundable</h4>
                <p>
                  Reservations booked under special discounted advance purchase, promotional packages, or Non-Refundable options are strictly non-modifiable and non-refundable. Prepayment cannot be cancelled or refunded under any conditions.
                </p>
              </div>
            </div>
          </div>

          {/* Check-in details and deliveries */}
          <div className="bg-[#0f141c] border border-gold/10 p-8 rounded-md space-y-4">
            <div className="flex items-center space-x-2.5 text-gold">
              <Ban className="w-5.5 h-5.5" />
              <h3 className="text-base font-sans font-bold uppercase tracking-[1px]">General House Rules</h3>
            </div>
            <ul className="text-xs text-stone-gray space-y-3.5 leading-relaxed list-disc list-inside">
              <li>
                <strong>Check-In & Check-Out:</strong> Standard check-in starts at <strong className="text-ivory">2:00 PM</strong>. Early check-ins are subject to block availability. Check-out is strictly <strong className="text-ivory">12:00 PM noon</strong>. Late check-outs may attract hourly surcharges.
              </li>
              <li>
                <strong>Outside Deliveries:</strong> To maintain strict clinical hygiene and safety, food delivery agents (Swiggy, Zomato, etc.) are strictly not permitted inside hotel room corridors. External food deliveries cannot be consumed inside rooms or in the Aroma Cafe dining lounges.
              </li>
              <li>
                <strong>Pet Policy:</strong> Pets are strictly not permitted within the guestroom or lobby properties to maintain sanitization standards.
              </li>
              <li>
                <strong>Smoking Policy:</strong> All guestrooms, corridors, cafes, and conference boardrooms are 100% smoke-free zones. Heavy sanitization fees will be levied for violations.
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
