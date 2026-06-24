import React, { useState, useEffect, useRef } from 'react';
import { useBooking } from '../context/BookingContext';
import { ROOM_TYPES, RATE_PLANS } from '../data';
import { Coffee, ShieldCheck, Users, HelpCircle, Check, Search, Calendar } from 'lucide-react';
import { Lens } from './Lens';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';
import gsap from 'gsap';

interface RoomsViewProps {
  onSelectRoom: (roomId: string) => void;
  onStartBooking: (roomId: string, ratePlanId: string) => void;
}

export const RoomsView: React.FC<RoomsViewProps> = ({ onSelectRoom, onStartBooking }) => {
  const { searchParams, setSearchParams, getAvailableCount } = useBooking();

  // local filter states
  const [checkIn, setCheckIn] = useState(searchParams.checkIn);
  const [checkOut, setCheckOut] = useState(searchParams.checkOut);
  const [guestsFilter, setGuestsFilter] = useState(searchParams.guests);
  const [ratePlanSelection, setRatePlanSelection] = useState<Record<string, string>>(() => {
    // default rate plan mapping for each room type
    const initial: Record<string, string> = {};
    ROOM_TYPES.forEach(r => {
      initial[r.id] = RATE_PLANS[0].id; // default to Room Only - Non-Refundable
    });
    return initial;
  });

  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleUpdateDates = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({
      checkIn,
      checkOut,
      guests: guestsFilter,
      roomsCount: searchParams.roomsCount
    });
  };

  const handleRatePlanChange = (roomId: string, ratePlanId: string) => {
    setRatePlanSelection(prev => ({ ...prev, [roomId]: ratePlanId }));
  };

  // Get total nights
  const start = new Date(searchParams.checkIn);
  const end = new Date(searchParams.checkOut);
  const nights = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div id="rooms-root" className="w-full bg-midnight min-h-screen pt-28 pb-16 px-6 lg:px-12">
      <div className="max-w-[1600px] w-full mx-auto">
        
        {/* Banner header */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3 opacity-0">
          <span className="text-xs font-sans font-bold tracking-[3px] text-gold uppercase">OUR LUXURIOUS RETREATS</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-ivory">Designed For Your Comfort</h1>
          <p className="text-sm text-stone-gray leading-relaxed">
            Choose from our premium accommodations, styled meticulously to offer high-end hospitality in Azamgarh. Filter dates below to secure real-time availability and live pricing.
          </p>
        </div>

        {/* Date Filter Bar */}
        <div className="bg-slate-gray/30 border border-gold/15 p-6 rounded-md mb-12 shadow-xl">
          <form onSubmit={handleUpdateDates} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="flex flex-col space-y-1.5">
              <span className="text-[10px] text-gold font-bold uppercase tracking-[1.5px] flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Check-In Date</span>
              </span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <span className="text-[10px] text-gold font-bold uppercase tracking-[1.5px] flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Check-Out Date</span>
              </span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <span className="text-[10px] text-gold font-bold uppercase tracking-[1.5px] flex items-center space-x-1">
                <Users className="w-3.5 h-3.5" />
                <span>Total Guests</span>
              </span>
              <select
                value={guestsFilter}
                onChange={(e) => setGuestsFilter(Number(e.target.value))}
                className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold"
              >
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n} className="bg-midnight text-ivory">
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0px 0px 20px rgba(212,175,55,0.4)" }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-gold hover:bg-gold-hover text-midnight text-xs font-bold tracking-[1.5px] py-3.5 uppercase rounded font-sans transition-all duration-300 cursor-pointer text-center"
            >
              UPDATE SEARCH & RATES
            </motion.button>
          </form>

          {/* Search Summary details */}
          <div className="border-t border-gold/10 pt-4 mt-4 flex items-center justify-between text-[11px] text-stone-gray font-sans">
            <span>
              Searching for: <strong className="text-ivory">{searchParams.checkIn}</strong> to <strong className="text-ivory">{searchParams.checkOut}</strong> • <strong className="text-gold">{nights} {nights === 1 ? 'Night' : 'Nights'}</strong>
            </span>
            <span>
              Couples Check-In Policy: <strong className="text-red-400">Government Photo ID Required. Unmarried Couples Restricted per House Rules.</strong>
            </span>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="space-y-12">
          {ROOM_TYPES.map((room, idx) => {
            const availableCount = getAvailableCount(room.id, searchParams.checkIn, searchParams.checkOut);
            const isAvailable = availableCount > 0;
            const currentSelectedRatePlanId = ratePlanSelection[room.id] || RATE_PLANS[0].id;
            const activeRatePlan = RATE_PLANS.find(p => p.id === currentSelectedRatePlanId) || RATE_PLANS[0];
            
            // Calculate rate-modified pricing
            const rateMultiplier = activeRatePlan.priceModifier;
            const finalPricePerNight = Math.round(room.basePrice * rateMultiplier);
            const totalBookingAmount = finalPricePerNight * nights;

            return (
              <ScrollReveal key={room.id} direction="up" delay={idx * 0.1} duration={0.8}>
                <div
                  className="bg-[#0f141c] border border-gold/10 hover:border-gold/20 rounded-md overflow-hidden shadow-2xl flex flex-col lg:flex-row gap-6 transition-all duration-300"
                >
                {/* Photo Gallery block with magnifying glass lens on hover */}
                <div className="lg:w-2/5 relative min-h-[300px] bg-midnight">
                  <Lens zoomFactor={1.8} lensSize={140}>
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </Lens>
                  
                  {/* Floating Specs */}
                  <div className="absolute top-4 left-4 bg-midnight/90 backdrop-blur-md border border-gold/20 px-3 py-1.5 rounded-sm text-[10px] font-sans text-gold font-bold uppercase tracking-[1px] z-10 pointer-events-none">
                    {room.sizeSqFt} SQ FT • {room.bedType}
                  </div>

                  {!isAvailable && (
                    <div className="absolute inset-0 bg-red-950/80 backdrop-blur-xs flex items-center justify-center z-10 pointer-events-none">
                      <div className="text-center border border-white/30 p-6 bg-midnight/90">
                        <h4 className="text-white text-lg font-bold tracking-[1.5px] uppercase">Fully Booked</h4>
                        <p className="text-xs text-stone-gray mt-1 max-w-xs">No allotments left in this category for searched dates.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Block */}
                <div className="p-8 lg:w-3/5 flex flex-col justify-between">
                  <div>
                    {/* Header line */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-ivory">{room.name}</h2>
                        <span className="text-[10px] text-stone-gray font-bold tracking-[1px] uppercase mt-1 block">
                          MAX CAPACITY: {room.maxOccupancy} ADULTS
                        </span>
                      </div>
                      <div className="text-right">
                        {isAvailable ? (
                          <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-[1px] uppercase px-2.5 py-1.5 rounded-full">
                            {availableCount} Rooms Available
                          </span>
                        ) : (
                          <span className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold tracking-[1px] uppercase px-2.5 py-1.5 rounded-full">
                            Sold Out
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Room Description */}
                    <p className="text-xs text-stone-gray leading-relaxed mb-6">
                      {room.description}
                    </p>

                    {/* Key amenities icons */}
                    <div className="flex flex-wrap gap-4 mb-8">
                      {room.baseAmenities.slice(0, 5).map((amenity, idx) => (
                        <div key={idx} className="flex items-center space-x-1.5 bg-slate-gray/20 px-2.5 py-1 rounded text-[11px] text-ivory border border-gold/5">
                          <Check className="w-3 h-3 text-gold" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                      {room.baseAmenities.length > 5 && (
                        <button
                          onClick={() => onSelectRoom(room.id)}
                          className="text-[11px] text-gold font-bold uppercase tracking-[0.5px] hover:underline"
                        >
                          + {room.baseAmenities.length - 5} More
                        </button>
                      )}
                    </div>

                    {/* Rate Plan Selector Grid */}
                    {isAvailable && (
                      <div className="bg-slate-gray/20 border border-gold/10 p-5 rounded-sm mb-6">
                        <span className="text-[10px] text-gold font-bold uppercase tracking-[1.5px] mb-3 block">
                          SELECT RATE PLAN
                        </span>
                        <div className="space-y-3">
                          {RATE_PLANS.map((plan) => {
                            const planPricePerNight = Math.round(room.basePrice * plan.priceModifier);
                            return (
                              <label
                                key={plan.id}
                                className={`flex items-start justify-between p-3 border rounded-sm cursor-pointer transition-all ${
                                  currentSelectedRatePlanId === plan.id
                                    ? 'border-gold bg-gold/5'
                                    : 'border-gold/10 hover:border-gold/30 bg-midnight/35'
                                }`}
                              >
                                <div className="flex items-start space-x-3">
                                  <input
                                    type="radio"
                                    name={`rateplan-${room.id}`}
                                    value={plan.id}
                                    checked={currentSelectedRatePlanId === plan.id}
                                    onChange={() => handleRatePlanChange(room.id, plan.id)}
                                    className="mt-1 accent-gold"
                                  />
                                  <div>
                                    <h4 className="text-xs font-bold text-ivory">{plan.name}</h4>
                                    <p className="text-[10px] text-stone-gray mt-0.5 leading-relaxed">
                                      {plan.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <span className="text-xs font-bold text-gold">
                                    +₹{(planPricePerNight - room.basePrice).toLocaleString('en-IN')}/night
                                  </span>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Booking & Pricing Row */}
                  <div className="border-t border-gold/15 pt-6 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Price Per Night</span>
                        <span className="text-2xl font-serif font-bold text-ivory">
                          ₹{finalPricePerNight.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Total stay ({nights} {nights === 1 ? 'Night' : 'Nights'})</span>
                        <span className="text-xl font-serif font-bold text-gold">
                          ₹{totalBookingAmount.toLocaleString('en-IN')}
                          <span className="text-[10px] font-sans font-normal text-stone-gray"> + 12% GST</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.04, backgroundColor: "rgba(212,175,55,0.15)" }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => onSelectRoom(room.id)}
                        className="border border-gold text-gold text-xs font-bold tracking-[1px] px-5 py-3.5 uppercase rounded-sm cursor-pointer transition-all duration-300"
                      >
                        VIEW ROOM DETAILS
                      </motion.button>
                      {isAvailable && (
                        <motion.button
                          whileHover={{ scale: 1.04, boxShadow: "0px 0px 20px rgba(212,175,55,0.55)" }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => onStartBooking(room.id, currentSelectedRatePlanId)}
                          className="bg-gold hover:bg-gold-hover text-midnight text-xs font-bold tracking-[1px] px-6 py-3.5 uppercase rounded-sm cursor-pointer"
                        >
                          BOOK ROOM NOW
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
        </div>
      </div>
    </div>
  );
};
