import React, { useState } from 'react';
import { useBooking, getDatesInRange } from '../context/BookingContext';
import { ROOM_TYPES, RATE_PLANS } from '../data';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, Printer, Trash2, Calendar, Users } from 'lucide-react';

export const MyBookingsView: React.FC = () => {
  const { bookings, cancelBooking } = useBooking();
  const [searchRef, setSearchRef] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [activeBookingResult, setActiveBookingResult] = useState<any | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [cancelSubmitted, setCancelSubmitted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    setCancelSubmitted(false);

    // lookup match (case insensitive)
    const match = bookings.find(b => 
      b.bookingRef.trim().toLowerCase() === searchRef.trim().toLowerCase() &&
      b.email.trim().toLowerCase() === searchEmail.trim().toLowerCase()
    );

    setActiveBookingResult(match || null);
  };

  const handleRequestCancel = (bookingId: string) => {
    if (window.confirm('Are you absolutely sure you want to cancel this reservation? Allotted rooms will be released immediately.')) {
      cancelBooking(bookingId);
      setCancelSubmitted(true);
      // Re-fetch match to update local view state
      const match = bookings.find(b => b.id === bookingId);
      setActiveBookingResult(match ? { ...match, bookingStatus: 'cancelled', paymentStatus: 'refunded' } : null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getRoomName = (id: string) => ROOM_TYPES.find(r => r.id === id)?.name || id;
  const getRatePlanName = (id: string) => RATE_PLANS.find(p => p.id === id)?.name || id;

  return (
    <div className="w-full bg-midnight min-h-screen pt-28 pb-16 px-6 lg:px-12 font-sans text-white">
      <div className="max-w-[1200px] w-full mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="text-xs font-sans font-bold tracking-[3px] text-gold uppercase">SELF SERVICE PORTAL</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ivory">Manage My Stay</h1>
          <p className="text-sm text-stone-gray leading-relaxed">
            Lookup your confirmed reservations, download official hotel stay vouchers, edit special requests, or request cancellations.
          </p>
        </div>

        {/* 50/50 Layout: Left search, Right Result */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Search box column */}
          <div className="lg:col-span-4 bg-slate-gray/20 border border-gold/15 p-6 rounded-md">
            <form onSubmit={handleSearch} className="space-y-4 text-left">
              <h3 className="text-sm font-sans font-bold text-gold uppercase tracking-[1px] mb-2">Search Reservation</h3>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Booking Reference</label>
                <input
                  type="text"
                  required
                  value={searchRef}
                  onChange={(e) => setSearchRef(e.target.value)}
                  placeholder="e.g., GSR-2026-8841"
                  className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold placeholder-stone-gray/40"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Booker Email Address</label>
                <input
                  type="email"
                  required
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="e.g., anil@kapoor.com"
                  className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold placeholder-stone-gray/40"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-hover text-midnight text-xs font-bold py-3 uppercase tracking-[1px] rounded-sm cursor-pointer shadow-md shadow-gold/25 flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>SEARCH BOOKING LEDGER</span>
              </button>
            </form>

            <div className="mt-6 bg-midnight/40 border border-gold/10 p-4 rounded text-[11px] text-stone-gray leading-relaxed text-left">
              <span className="text-gold font-bold uppercase tracking-[0.5px] block mb-1">Sandbox Demo references:</span>
              - Ref: <strong className="text-ivory">GSR-2026-8841</strong> <br />
              - Email: <strong className="text-ivory">anil@kapoor.com</strong> <br />
              (Seeded mock confirmed stays in local database)
            </div>
          </div>

          {/* Results card column */}
          <div className="lg:col-span-8">
            {activeBookingResult ? (
              <div className="bg-[#0f141c] border border-gold/15 p-8 rounded-md shadow-2xl space-y-6 text-left relative">
                
                {/* Status sticker */}
                <div className="absolute top-6 right-6 flex items-center space-x-1.5">
                  {activeBookingResult.bookingStatus === 'confirmed' ? (
                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-sans font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-full">
                      ✓ STAY CONFIRMED
                    </span>
                  ) : activeBookingResult.bookingStatus === 'cancelled' ? (
                    <span className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-sans font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-full">
                      ✕ STAY CANCELLED
                    </span>
                  ) : (
                    <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-sans font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-full">
                      {activeBookingResult.bookingStatus.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Info summary */}
                <div className="border-b border-gold/10 pb-5">
                  <span className="text-[9px] text-gold font-bold tracking-[1.5px] uppercase">OFFICIAL HOTEL GRANDS SR RECORD</span>
                  <h3 className="text-2xl font-serif font-bold text-ivory mt-0.5">{activeBookingResult.bookingRef}</h3>
                </div>

                {/* Stay specifics grids */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-gray font-sans border-b border-gold/10 pb-5">
                  <div className="space-y-1.5">
                    <p className="font-bold text-ivory uppercase tracking-[0.5px]">Guest Details</p>
                    <p>Primary Booker: <strong className="text-ivory">{activeBookingResult.guestName}</strong></p>
                    <p>Phone: {activeBookingResult.phone}</p>
                    <p>Email: {activeBookingResult.email}</p>
                    <p>ID proof: {activeBookingResult.idProofType}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-bold text-ivory uppercase tracking-[0.5px]">Stay Specifics</p>
                    <p>Check-In Date: <strong className="text-ivory">{activeBookingResult.checkIn}</strong></p>
                    <p>Check-Out Date: <strong className="text-ivory">{activeBookingResult.checkOut}</strong></p>
                    <p>Room Category: <strong className="text-gold">{getRoomName(activeBookingResult.roomTypeId)}</strong></p>
                    <p>Rate Plan: {getRatePlanName(activeBookingResult.ratePlanId)}</p>
                    <p>Rooms Allotted: {activeBookingResult.numRooms} Room(s)</p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-midnight/60 border border-gold/10 p-5 rounded">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-gray font-bold uppercase tracking-[0.5px]">Gross Stay Invoice:</span>
                    <span className="text-base font-serif font-bold text-gold">₹{activeBookingResult.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs mt-2 border-t border-gold/10 pt-2 text-emerald-400">
                    <span className="font-bold">Total Amount Paid (via {activeBookingResult.paymentGateway}):</span>
                    <span className="font-bold text-sm">₹{activeBookingResult.amountPaid.toLocaleString('en-IN')}</span>
                  </div>
                  {activeBookingResult.totalAmount > activeBookingResult.amountPaid && (
                    <div className="flex justify-between items-center text-xs mt-1 text-amber-500 font-bold">
                      <span>Balance Outstanding (Settle at hotel):</span>
                      <span>₹{(activeBookingResult.totalAmount - activeBookingResult.amountPaid).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>

                {/* Cancel request success msg */}
                {cancelSubmitted && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded text-xs leading-relaxed">
                    <strong>Reservation Cancelled Successfully!</strong> <br />
                    The allotted rooms have been released into the active daily inventory ledger. Any eligible refund has been queued and will be processed back to the original source account via your gateway (Razorpay/Stripe) within 5-7 banking days.
                  </div>
                )}

                {/* Actions row */}
                <div className="pt-4 flex justify-between gap-4">
                  <button
                    onClick={handlePrint}
                    className="border border-gold text-gold hover:bg-gold/10 text-xs font-bold tracking-[1px] px-5 py-3.5 uppercase flex items-center space-x-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>PRINT STAY VOUCHER</span>
                  </button>

                  {/* Active cancellations button */}
                  {activeBookingResult.bookingStatus === 'confirmed' && (
                    <button
                      onClick={() => handleRequestCancel(activeBookingResult.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-[1px] px-5 py-3.5 uppercase flex items-center space-x-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>REQUEST CANCELLATION</span>
                    </button>
                  )}
                </div>

              </div>
            ) : searchAttempted ? (
              <div className="bg-slate-gray/10 border border-gold/10 p-12 rounded text-center space-y-4">
                <AlertTriangle className="w-10 h-10 text-gold mx-auto" />
                <h3 className="text-lg font-serif font-bold text-ivory">No Reservation Records Found</h3>
                <p className="text-xs text-stone-gray max-w-sm mx-auto">
                  We were unable to locate any matching reservation for Reference <strong className="text-ivory">"{searchRef}"</strong> and email <strong className="text-gold">"{searchEmail}"</strong>. Please verify spelling.
                </p>
              </div>
            ) : (
              <div className="bg-slate-gray/10 border border-gold/5 p-16 rounded text-center space-y-2">
                <Calendar className="w-10 h-10 text-gold/40 mx-auto" />
                <h3 className="text-base font-serif font-bold text-stone-gray">Enter Reservation Details to Retrieve Stay</h3>
                <p className="text-xs text-stone-gray max-w-xs mx-auto">Enter stay references in the left panel to query the hotel database.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
