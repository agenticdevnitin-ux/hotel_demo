import React from 'react';
import { Mail, Phone, MapPin, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (view: string) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-[#080B0F] border-t border-gold/15 text-ivory/80 pt-16 pb-8 px-6 lg:px-12 font-sans">
      <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col text-left">
            <span className="text-xs font-serif tracking-[4px] text-gold font-semibold uppercase">Hotel</span>
            <span className="text-2xl font-serif font-bold text-ivory tracking-[1px] leading-none">GRAND SR</span>
            <span className="text-[10px] text-stone-gray tracking-[2.5px] uppercase mt-1">Azamgarh, Uttar Pradesh</span>
          </div>
          <p className="text-xs text-stone-gray leading-relaxed max-w-xs pt-2">
            The landmark hospitality destination in the heart of Azamgarh. Offering premium rooms, elegant banquet halls, and fine multi-cuisine dining at Aroma Cafe.
          </p>
          <div className="pt-2 flex items-center space-x-3 text-[11px] text-stone-gray">
            <ShieldAlert className="w-3.5 h-3.5 text-gold" />
            <span>3 to 3.5-Star Classified Property</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-xs font-semibold text-gold tracking-[2px] uppercase">Navigation</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => handleNav('home')} className="hover:text-gold transition-colors text-left cursor-pointer">
                Home Overview
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('rooms')} className="hover:text-gold transition-colors text-left cursor-pointer">
                Rooms & Suite Rates
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('dining')} className="hover:text-gold transition-colors text-left cursor-pointer">
                Dining at Aroma Cafe
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('events')} className="hover:text-gold transition-colors text-left cursor-pointer">
                Aroma Banquet Hall
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('amenities')} className="hover:text-gold transition-colors text-left cursor-pointer">
                Hotel Amenities
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('my-bookings')} className="hover:text-gold transition-colors text-left cursor-pointer text-gold">
                Manage My Stay
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-xs font-semibold text-gold tracking-[2px] uppercase">Contact Reservations</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span className="text-stone-gray leading-relaxed">
                Hotel Grand SR, Rahul Nagar, Marhaya, Teacher's Colony, Azamgarh, Uttar Pradesh – 276001, India
              </span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <a href="tel:+919990000000" className="hover:text-gold transition-colors">
                +91 99900 00000
              </a>
            </li>
            <li className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <a href="mailto:reservations@hotelgrandsrazamgarh.com" className="hover:text-gold transition-colors">
                reservations@hotelgrandsr.com
              </a>
            </li>
          </ul>
        </div>

        {/* Strict House Rules Panel (Dossier Requirement) */}
        <div className="flex flex-col space-y-4 bg-slate-gray/30 p-5 rounded-md border border-gold/10">
          <div className="flex items-center space-x-2 text-gold">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <h4 className="text-xs font-semibold tracking-[1px] uppercase">Guest Rules Notice</h4>
          </div>
          <ul className="space-y-2 text-[11px] text-stone-gray leading-relaxed list-disc list-inside">
            <li>
              <span className="text-gold font-medium">Unmarried Couples Policy:</span> Per property policy, unmarried couples are strictly not allowed.
            </li>
            <li>
              <span className="text-ivory">ID Requirements:</span> Valid Govt Photo ID (Aadhaar, Passport, DL) required for all check-ins.
            </li>
            <li>
              <span className="text-ivory">Outside Food:</span> Outside food and deliveries are strictly not allowed in rooms/cafes.
            </li>
            <li>
              <span className="text-ivory">Pets:</span> Pets are not permitted.
            </li>
          </ul>
        </div>
      </div>

      {/* Trust Badge Section */}
      <div className="max-w-[1600px] w-full mx-auto border-t border-ivory/5 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-gray gap-4">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <div className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
            <span>Razorpay Payment Verified</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
            <span>PCI-Compliant SSL Checkout</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
            <span>UPI & International Cards Supported</span>
          </div>
        </div>

        <div>
          <button onClick={() => handleNav('policies')} className="hover:text-gold text-xs underline cursor-pointer">
            Terms & Cancellation Policies
          </button>
        </div>
      </div>

      {/* Copyright Footer & Quick Admin Shortcut */}
      <div className="max-w-[1600px] w-full mx-auto flex flex-col md:flex-row items-center justify-between text-[10px] text-stone-gray border-t border-ivory/5 pt-4">
        <span>
          &copy; 2026 Hotel Grand SR, Azamgarh. Crafted for Premium Hospitality. All Rights Reserved.
        </span>
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <span>* GST details, FSSAI numbers are subject to owner confirmation.</span>
          <span>|</span>
          <button onClick={() => handleNav('admin')} className="text-gold/50 hover:text-gold transition-colors cursor-pointer">
            Staff Portal Login
          </button>
        </div>
      </div>
    </footer>
  );
};
