import React, { useState } from 'react';
import { RoomType } from '../types';
import { ROOM_TYPES, RATE_PLANS } from '../data';
import { X, Check, Coffee, Star, Tv, Shield, ArrowRight, Bed, Eye } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

interface RoomDetailModalProps {
  roomId: string;
  onClose: () => void;
  onStartBooking: (roomId: string, ratePlanId: string) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ roomId, onClose, onStartBooking }) => {
  const { getAvailableCount, searchParams } = useBooking();
  const room = ROOM_TYPES.find(r => r.id === roomId);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  if (!room) return null;

  const availableCount = getAvailableCount(room.id, searchParams.checkIn, searchParams.checkOut);
  const isAvailable = availableCount > 0;

  // Render modal
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-midnight/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f141c] border border-gold/30 w-full max-w-4xl rounded-md overflow-hidden relative shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-midnight/80 border border-gold/20 p-2 text-gold rounded-full hover:bg-gold hover:text-midnight transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Photo Showcase & Lightbox slider */}
          <div className="p-6 border-r border-gold/10">
            <div className="relative h-72 md:h-96 bg-slate-gray rounded-sm overflow-hidden mb-4 border border-gold/10">
              <img
                src={room.images[activePhotoIdx]}
                alt={room.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-4 left-4 bg-midnight/80 border border-gold/20 px-3 py-1.5 text-gold text-[10px] font-bold tracking-[1px] uppercase rounded">
                Photo {activePhotoIdx + 1} of {room.images.length}
              </div>
            </div>

            {/* Thumbnail selector row */}
            <div className="grid grid-cols-2 gap-3">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`h-20 rounded-sm overflow-hidden border cursor-pointer transition-all ${
                    activePhotoIdx === idx ? 'border-gold scale-95 shadow-md shadow-gold/20' : 'border-gold/10 hover:border-gold/30'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Room Specifications Table */}
            <div className="mt-8">
              <h4 className="text-xs font-sans font-bold tracking-[1.5px] text-gold uppercase mb-4">ROOM SPECIFICATIONS</h4>
              <table className="w-full text-xs text-stone-gray font-sans border-t border-gold/15">
                <tbody>
                  <tr className="border-b border-gold/10">
                    <td className="py-2.5 font-bold text-ivory">Floor Area</td>
                    <td className="py-2.5 text-right">{room.sizeSqFt} sq ft (~{Math.round(room.sizeSqFt / 10.76)} sq m)</td>
                  </tr>
                  <tr className="border-b border-gold/10">
                    <td className="py-2.5 font-bold text-ivory">Bed Arrangement</td>
                    <td className="py-2.5 text-right">{room.bedType}</td>
                  </tr>
                  <tr className="border-b border-gold/10">
                    <td className="py-2.5 font-bold text-ivory">Max Occupancy</td>
                    <td className="py-2.5 text-right">{room.maxOccupancy} Adults</td>
                  </tr>
                  <tr className="border-b border-gold/10">
                    <td className="py-2.5 font-bold text-ivory">Bathrooms</td>
                    <td className="py-2.5 text-right">1 Attached, Hot & Cold Water</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Room copy detail & Booking selection */}
          <div className="p-8 flex flex-col justify-between h-full bg-slate-gray/5">
            <div>
              <span className="text-[10px] text-gold font-bold tracking-[1.5px] uppercase">GUESTROOM SUITE RETREAT</span>
              <h2 className="text-3xl font-serif font-bold text-ivory mt-1 mb-4">{room.name}</h2>
              <p className="text-xs text-stone-gray leading-relaxed mb-6">
                {room.description}
              </p>

              {/* Full Amenities list */}
              <div className="mb-8">
                <h4 className="text-xs font-sans font-bold tracking-[1.5px] text-gold uppercase mb-4">IN-ROOM AMENITIES</h4>
                <div className="grid grid-cols-2 gap-3 text-xs text-stone-gray">
                  {room.baseAmenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure policies notification */}
              <div className="bg-midnight/60 border border-gold/10 p-4 rounded-md mb-6 flex items-start space-x-3 text-[11px] text-stone-gray font-sans">
                <Shield className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-ivory">Hassle-Free Booking Assured</h4>
                  <p className="mt-0.5 leading-relaxed">
                    100% Secure SSL reservation. Standard rate plans include free cancellation up to 24 hrs prior to arrival. No unmarried couples allowed per house policies.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions at bottom */}
            <div className="border-t border-gold/15 pt-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Standard Base Rate</span>
                  <span className="text-2xl font-serif font-bold text-gold">
                    ₹{room.basePrice.toLocaleString('en-IN')}
                    <span className="text-xs font-sans text-stone-gray font-normal"> / night</span>
                  </span>
                </div>
                <div className="text-right">
                  {isAvailable ? (
                    <span className="text-xs font-sans text-emerald-400 font-bold">
                      ✓ Rooms Available
                    </span>
                  ) : (
                    <span className="text-xs font-sans text-red-400 font-bold">
                      ✕ Fully Booked
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onClose}
                  className="border border-gold text-gold hover:bg-gold/10 text-xs font-bold tracking-[1px] py-4 uppercase rounded-sm cursor-pointer"
                >
                  GO BACK
                </button>
                {isAvailable ? (
                  <button
                    onClick={() => {
                      onStartBooking(room.id, RATE_PLANS[0].id);
                      onClose();
                    }}
                    className="bg-gold hover:bg-gold-hover text-midnight text-xs font-bold tracking-[1.5px] py-4 uppercase rounded-sm transition-all duration-300 cursor-pointer shadow-md shadow-gold/25"
                  >
                    BOOK STAY NOW
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-stone-gray text-midnight text-xs font-bold tracking-[1px] py-4 uppercase rounded-sm opacity-50 cursor-not-allowed"
                  >
                    SOLD OUT
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
