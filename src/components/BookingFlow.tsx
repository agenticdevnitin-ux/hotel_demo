import React, { useState } from 'react';
import { useBooking, getDatesInRange } from '../context/BookingContext';
import { ROOM_TYPES, RATE_PLANS } from '../data';
import { CheckCircle2, ChevronRight, CreditCard, ShieldCheck, Printer, AlertTriangle, Sparkles, Building, Loader2, ArrowLeft, ArrowRight, Download, Eye } from 'lucide-react';
import { Booking } from '../types';

interface BookingFlowProps {
  onSuccess: (bookingRef: string) => void;
  onNavigate: (view: string) => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ onSuccess, onNavigate }) => {
  const { activeBooking, setActiveBooking, createBooking, searchParams } = useBooking();

  // local steps state: 1 = guest info, 2 = simulated gateway payment, 3 = success confirmation
  const [step, setStep] = useState(1);

  // Form states
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idProofType, setIdProofType] = useState('Aadhaar Card');
  const [specialRequests, setSpecialRequests] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState<'razorpay' | 'stripe'>('razorpay');
  const [paymentMode, setPaymentMode] = useState<'full' | 'advance'>('full'); // full or 20% advance

  // Payment loading / gateway states
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [showStripeModal, setShowStripeModal] = useState(false);
  
  // Confirmed booking storage
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!activeBooking || !activeBooking.roomTypeId || !activeBooking.ratePlanId) {
    return (
      <div className="pt-32 text-center min-h-[60vh] bg-midnight flex flex-col items-center justify-center font-sans px-6">
        <AlertTriangle className="w-12 h-12 text-gold mb-4" />
        <h2 className="text-xl font-bold font-serif text-ivory">No Active Reservation Found</h2>
        <p className="text-xs text-stone-gray mt-2 mb-6">Please select a room and click book stay to activate checkout.</p>
        <button
          onClick={() => onNavigate('rooms')}
          className="bg-gold text-midnight text-xs font-bold uppercase px-6 py-3 tracking-[1.5px] rounded-sm cursor-pointer"
        >
          BROWSE ROOMS
        </button>
      </div>
    );
  }

  const room = ROOM_TYPES.find(r => r.id === activeBooking.roomTypeId)!;
  const ratePlan = RATE_PLANS.find(p => p.id === activeBooking.ratePlanId)!;

  // Nights calculation
  const start = new Date(searchParams.checkIn);
  const end = new Date(searchParams.checkOut);
  const nights = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  // Pricing calculations
  const pricePerNight = Math.round(room.basePrice * ratePlan.priceModifier);
  const subtotal = pricePerNight * nights * (searchParams.roomsCount || 1);
  const gstTax = Math.round(subtotal * 0.12); // standard 12% Indian hotel GST
  const extraBedCharge = (searchParams.guests > (searchParams.roomsCount || 1) * 2) ? 1000 * nights : 0; // ₹1000 per night extra bed
  const totalAmount = subtotal + gstTax + extraBedCharge;
  const advanceAmount = Math.round(totalAmount * 0.20); // 20% advance
  const actualChargeAmount = paymentMode === 'full' ? totalAmount : advanceAmount;

  const handleSubmitGuestInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('You must accept our Guest Rules & Cancellation Policy to continue.');
      return;
    }
    setStep(2);
  };

  // Trigger simulated Razorpay or Stripe
  const handleOpenGateway = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      if (paymentGateway === 'razorpay') {
        setShowRazorpayModal(true);
      } else {
        setShowStripeModal(true);
      }
    }, 1500);
  };

  // Complete Payment successfully
  const handlePaymentSuccess = () => {
    setShowRazorpayModal(false);
    setShowStripeModal(false);
    setIsProcessingPayment(true);

    // Simulate Server-side webhook capture & signature validation
    setTimeout(() => {
      const bData: Omit<Booking, 'id' | 'bookingRef' | 'createdAt'> = {
        guestName,
        email,
        phone,
        idProofType,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        roomTypeId: activeBooking.roomTypeId!,
        ratePlanId: activeBooking.ratePlanId!,
        numGuests: searchParams.guests,
        numRooms: searchParams.roomsCount || 1,
        totalAmount,
        amountPaid: actualChargeAmount,
        paymentStatus: 'paid',
        bookingStatus: 'confirmed',
        specialRequests,
        paymentGateway
      };

      const result = createBooking(bData);
      setConfirmedBooking(result);
      setIsProcessingPayment(false);
      setStep(3);
      onSuccess(result.bookingRef);
    }, 2000);
  };

  // Print voucher method
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-screen bg-midnight text-ivory pt-28 pb-16 px-6 lg:px-12 font-sans">
      <div className="max-w-[1400px] w-full mx-auto">
        
        {/* Step Indicator Header */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gold/15 pb-8 mb-12 gap-4">
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-gold font-bold tracking-[2.5px] uppercase">GUEST CHECKOUT CONSOLE</span>
            <h1 className="text-3xl font-serif font-bold text-ivory">Complete Your Reservation</h1>
          </div>

          <div className="flex items-center space-x-3 text-xs tracking-[1px] font-medium text-stone-gray font-sans">
            <span className={step === 1 ? 'text-gold font-bold' : 'text-ivory/60'}>1. GUEST PARTICULARS</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={step === 2 ? 'text-gold font-bold' : 'text-ivory/60'}>2. SECURE PAYMENT</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={step === 3 ? 'text-emerald-400 font-bold' : 'text-ivory/60'}>3. STAY CONFIRMED</span>
          </div>
        </div>

        {/* STEP 1 & 2: Form columns */}
        {step < 3 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Checkout Form forms */}
            <div className="lg:col-span-8 bg-slate-gray/10 border border-gold/15 p-8 rounded-md shadow-2xl">
              
              {/* STEP 1: Guest Credentials input form */}
              {step === 1 && (
                <form onSubmit={handleSubmitGuestInfo} className="space-y-6">
                  <h3 className="text-xs font-bold tracking-[1.5px] text-gold uppercase border-b border-gold/10 pb-2">
                    Primary Booker Particulars
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] text-stone-gray uppercase tracking-[1px] font-bold">Full Name (as on ID proof)</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g., Vikram Singh"
                        className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded-md focus:border-gold focus:outline-none placeholder-stone-gray/40"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] text-stone-gray uppercase tracking-[1px] font-bold">Email Address (for confirmation voucher)</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., vikram@singh.com"
                        className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded-md focus:border-gold focus:outline-none placeholder-stone-gray/40"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] text-stone-gray uppercase tracking-[1px] font-bold">Mobile Phone (or WhatsApp number)</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g., +91 98765 43210"
                        className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded-md focus:border-gold focus:outline-none placeholder-stone-gray/40"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] text-stone-gray uppercase tracking-[1px] font-bold">Select ID Proof Type (Government Issued)</label>
                      <select
                        value={idProofType}
                        onChange={(e) => setIdProofType(e.target.value)}
                        className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded-md focus:border-gold focus:outline-none"
                      >
                        <option value="Aadhaar Card">Aadhaar Card (Indian Residents)</option>
                        <option value="Passport">Passport (Foreign / NRI Guests)</option>
                        <option value="Driving License">Driving License</option>
                        <option value="Voter ID Card">Voter ID Card</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5 pt-2">
                    <label className="text-[10px] text-stone-gray uppercase tracking-[1px] font-bold">Special Requests (e.g. late check-in, extra bed)</label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Add any request regarding bedding configuration, high floors, food allergies, etc."
                      className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded-md focus:border-gold focus:outline-none placeholder-stone-gray/40 h-24"
                    />
                  </div>

                  {/* MANDATORY Rule Accept checkbox */}
                  <div className="bg-midnight/60 border border-gold/10 p-5 rounded-md space-y-3 mt-4">
                    <div className="flex items-start space-x-2.5">
                      <AlertTriangle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gold uppercase tracking-[0.5px]">Strict Hotel Policy Disclaimer</h4>
                        <p className="text-[11px] text-stone-gray mt-1 leading-relaxed">
                          By checking this box, you confirm that you have read and agree to Hotel Grand SR policies: <br />
                          1. <strong className="text-red-400">Unmarried Couples Policy:</strong> Unmarried couples are strictly not allowed at this property per local regulations. Check-in will be denied without refund if violated. <br />
                          2. <strong className="text-ivory">ID Requirements:</strong> Valid Govt Photo ID (Aadhaar/Passport/DL) must be produced for all checking-in adults. <br />
                          3. <strong className="text-ivory">Outside Deliveries:</strong> Swiggy, Zomato, or external outside food delivery is strictly prohibited.
                        </p>
                      </div>
                    </div>

                    <label className="flex items-start space-x-3.5 pt-3 border-t border-gold/10 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-1 accent-gold scale-110"
                      />
                      <span className="text-xs text-ivory/95 font-medium leading-relaxed">
                        I hereby confirm that I understand and will abide by the strict House Rules, Couples check-in policies, and cancellation guidelines.
                      </span>
                    </label>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => onNavigate('rooms')}
                      className="border border-gold text-gold hover:bg-gold/10 text-xs font-bold tracking-[1px] px-6 py-3.5 uppercase cursor-pointer"
                    >
                      CHOOSE DIFFERENT ROOM
                    </button>
                    <button
                      type="submit"
                      className="bg-gold hover:bg-gold-hover text-midnight text-xs font-bold tracking-[1.5px] px-8 py-3.5 uppercase transition-all shadow-md shadow-gold/25 cursor-pointer flex items-center space-x-2"
                    >
                      <span>PROCEED TO PAYMENT</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Secure Payment selections */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 border-b border-gold/10 pb-3">
                    <CreditCard className="w-5 h-5 text-gold" />
                    <h3 className="text-xs font-bold tracking-[1.5px] text-gold uppercase">
                      Payment Configuration & Gateway Integration
                    </h3>
                  </div>

                  {/* Advance vs Full toggle */}
                  <div className="bg-midnight/60 border border-gold/10 p-5 rounded-md">
                    <span className="text-[10px] text-gold font-bold uppercase tracking-[1px] mb-3 block">
                      CHOOSE CHARGE METHOD
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label
                        className={`p-4 border rounded-md cursor-pointer transition-all ${
                          paymentMode === 'full' ? 'border-gold bg-gold/5' : 'border-gold/15 hover:border-gold/30'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <input
                            type="radio"
                            name="paymentMode"
                            checked={paymentMode === 'full'}
                            onChange={() => setPaymentMode('full')}
                            className="mt-1 accent-gold"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-ivory uppercase tracking-[0.5px]">PAY TOTAL AMOUNT</h4>
                            <span className="text-lg font-bold text-gold block mt-1">
                              ₹{totalAmount.toLocaleString('en-IN')}
                            </span>
                            <p className="text-[10px] text-stone-gray mt-1 leading-relaxed">
                              Complete payment now. Pay zero charges during check-out for booking base rates.
                            </p>
                          </div>
                        </div>
                      </label>

                      <label
                        className={`p-4 border rounded-md cursor-pointer transition-all ${
                          paymentMode === 'advance' ? 'border-gold bg-gold/5' : 'border-gold/15 hover:border-gold/30'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <input
                            type="radio"
                            name="paymentMode"
                            checked={paymentMode === 'advance'}
                            onChange={() => setPaymentMode('advance')}
                            className="mt-1 accent-gold"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-ivory uppercase tracking-[0.5px]">PAY 20% CONFIRMATION ADVANCE</h4>
                            <span className="text-lg font-bold text-gold block mt-1">
                              ₹{advanceAmount.toLocaleString('en-IN')}
                            </span>
                            <p className="text-[10px] text-stone-gray mt-1 leading-relaxed">
                              Pay ₹{advanceAmount.toLocaleString('en-IN')} now to reserve booking. Balance ₹{(totalAmount - advanceAmount).toLocaleString('en-IN')} to be settled directly at hotel reception desk.
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Gateway toggle */}
                  <div className="bg-midnight/60 border border-gold/10 p-5 rounded-md">
                    <span className="text-[10px] text-gold font-bold uppercase tracking-[1px] mb-3 block">
                      SELECT GATEWAY INFRASTRUCTURE
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label
                        className={`p-4 border rounded-md cursor-pointer flex justify-between items-center transition-all ${
                          paymentGateway === 'razorpay' ? 'border-gold bg-gold/5' : 'border-gold/15 hover:border-gold/30'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="paymentGateway"
                            checked={paymentGateway === 'razorpay'}
                            onChange={() => setPaymentGateway('razorpay')}
                            className="accent-gold"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-ivory font-serif">Razorpay Checkout (Domestic India)</h4>
                            <p className="text-[9px] text-stone-gray mt-0.5">Supports UPI, NetBanking, RuPay, Paytm, Cards</p>
                          </div>
                        </div>
                      </label>

                      <label
                        className={`p-4 border rounded-md cursor-pointer flex justify-between items-center transition-all ${
                          paymentGateway === 'stripe' ? 'border-gold bg-gold/5' : 'border-gold/15 hover:border-gold/30'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="paymentGateway"
                            checked={paymentGateway === 'stripe'}
                            onChange={() => setPaymentGateway('stripe')}
                            className="accent-gold"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-ivory font-serif">Stripe Gateway (International Fallback)</h4>
                            <p className="text-[9px] text-stone-gray mt-0.5">Supports foreign debit/credit cards, NRIs, ApplePay</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Pay button */}
                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="border border-gold text-gold hover:bg-gold/10 text-xs font-bold tracking-[1px] px-6 py-3.5 uppercase cursor-pointer"
                    >
                      EDIT PARTICULARS
                    </button>

                    <button
                      onClick={handleOpenGateway}
                      className="bg-gold hover:bg-gold-hover text-midnight text-xs font-bold tracking-[1.5px] px-8 py-3.5 uppercase transition-all shadow-md shadow-gold/25 cursor-pointer flex items-center space-x-2"
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>CONTACTING API...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>PAY SECURELY ₹{actualChargeAmount.toLocaleString('en-IN')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right side: Summary Details Panel */}
            <div className="lg:col-span-4 bg-slate-gray/20 border border-gold/15 p-6 rounded-md shadow-lg space-y-6">
              <h3 className="text-xs font-bold tracking-[1.5px] text-gold uppercase border-b border-gold/10 pb-2">
                Stay Pricing Summary
              </h3>

              {/* Room card miniature */}
              <div className="flex items-center space-x-3">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded border border-gold/10 shrink-0"
                />
                <div>
                  <h4 className="text-xs font-serif font-bold text-ivory">{room.name}</h4>
                  <p className="text-[10px] text-stone-gray font-sans mt-0.5">{room.bedType} • Max {room.maxOccupancy} Guests</p>
                </div>
              </div>

              {/* Specific details */}
              <div className="space-y-2 border-t border-b border-gold/10 py-4 text-xs font-sans">
                <div className="flex justify-between">
                  <span className="text-stone-gray">Check-In:</span>
                  <span className="font-semibold text-ivory">{searchParams.checkIn} (2 PM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-gray">Check-Out:</span>
                  <span className="font-semibold text-ivory">{searchParams.checkOut} (12 PM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-gray">Total Nights:</span>
                  <span className="font-bold text-gold">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-gray">Rooms Allotted:</span>
                  <span className="font-semibold text-ivory">{searchParams.roomsCount || 1} Room(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-gray">Rate Plan Selected:</span>
                  <span className="font-semibold text-ivory text-right max-w-[180px]">{ratePlan.name}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs font-sans">
                <div className="flex justify-between text-stone-gray">
                  <span>Room Charge ({nights} Nights × ₹{pricePerNight}/n):</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {extraBedCharge > 0 && (
                  <div className="flex justify-between text-stone-gray">
                    <span>Extra Bed Charge:</span>
                    <span>₹{extraBedCharge.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-gray">
                  <span>CGST & SGST Taxes (12%):</span>
                  <span>₹{gstTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-t border-gold/20 pt-3 text-sm font-serif font-bold text-ivory">
                  <span>Total Gross Invoice:</span>
                  <span className="text-gold">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Transaction lock icon */}
              <div className="border-t border-gold/10 pt-4 flex items-center space-x-2 text-[10px] text-stone-gray leading-relaxed">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>SSL Secured Checkout. Official Hotel Grand SR booking ledger interface. Payments processed securely via Razorpay Merchant API.</span>
              </div>
            </div>

          </div>
        ) : (
          
          /* CONFIRMED SCREEN (Step 3): Voucher voucher receipt */
          confirmedBooking && (
            <div className="max-w-3xl mx-auto bg-white text-midnight p-8 md:p-12 border border-gold rounded shadow-2xl relative" id="printable-voucher">
              
              {/* Header stamp */}
              <div className="absolute top-6 right-6 border-2 border-emerald-500 text-emerald-500 font-sans font-bold text-[10px] tracking-[1.5px] uppercase px-3 py-1.5 rounded rotate-12 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Stay Confirmed</span>
              </div>

              {/* Voucher Top Brand section */}
              <div className="flex flex-col items-center text-center border-b border-gold/20 pb-6 mb-8">
                <span className="text-xs font-serif tracking-[4px] text-gold font-bold uppercase leading-none">Hotel</span>
                <span className="text-3xl font-serif font-bold tracking-[1px] leading-tight">GRAND SR AZAMGARH</span>
                <span className="text-[10px] text-stone-gray tracking-[2.5px] uppercase mt-1">RAHUL NAGAR, MARHAYA, AZAMGARH – UP 276001</span>
                <span className="text-xs font-sans text-stone-gray font-semibold mt-4">OFFICIAL BOOKING CONFIRMATION VOUCHER</span>
              </div>

              {/* Client specifications and Ref code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-sans text-xs">
                <div className="space-y-1.5">
                  <p className="text-stone-gray uppercase tracking-[0.5px]">CONFIRMATION CODE</p>
                  <p className="text-lg font-bold text-midnight">{confirmedBooking.bookingRef}</p>
                  <p className="text-stone-gray mt-2 font-bold">Booker Name: <span className="text-midnight font-semibold">{confirmedBooking.guestName}</span></p>
                  <p className="text-stone-gray">Phone: <span className="text-midnight">{confirmedBooking.phone}</span></p>
                  <p className="text-stone-gray">Email: <span className="text-midnight">{confirmedBooking.email}</span></p>
                  <p className="text-stone-gray">ID Proof Type: <span className="text-midnight">{confirmedBooking.idProofType} (Produced at desk)</span></p>
                </div>

                <div className="space-y-1.5 md:text-right">
                  <p className="text-stone-gray uppercase tracking-[0.5px]">STAY PERIOD</p>
                  <p className="text-base font-bold text-midnight">{confirmedBooking.checkIn} to {confirmedBooking.checkOut}</p>
                  <p className="text-stone-gray font-bold">{nights} Nights • {confirmedBooking.numRooms} Room(s)</p>
                  <p className="text-stone-gray">Room Category: <span className="text-midnight font-semibold">{room.name}</span></p>
                  <p className="text-stone-gray">Rate Plan: <span className="text-midnight">{ratePlan.name}</span></p>
                  <p className="text-stone-gray">Gateway: <span className="text-midnight uppercase">{confirmedBooking.paymentGateway} capture</span></p>
                </div>
              </div>

              {/* Financial calculations */}
              <div className="bg-ivory border border-gold/15 p-5 rounded-sm mb-8 font-sans text-xs">
                <h4 className="font-bold uppercase tracking-[0.5px] border-b border-gold/10 pb-1.5 mb-2 text-gold">Invoice Summary</h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-stone-gray">
                    <span>Base Room Fare:</span>
                    <span className="text-midnight">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {extraBedCharge > 0 && (
                    <div className="flex justify-between text-stone-gray">
                      <span>Extra Bed Charge:</span>
                      <span className="text-midnight">₹{extraBedCharge.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-gray">
                    <span>CGST & SGST Tax charges (12%):</span>
                    <span className="text-midnight">₹{gstTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between border-t border-gold/20 pt-2 font-bold text-sm text-midnight">
                    <span>Total stay Invoice:</span>
                    <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-bold mt-1">
                    <span>Simulated Amount Paid:</span>
                    <span>₹{confirmedBooking.amountPaid.toLocaleString('en-IN')}</span>
                  </div>
                  {confirmedBooking.totalAmount > confirmedBooking.amountPaid && (
                    <div className="flex justify-between text-amber-600 font-bold">
                      <span>Balance due at Reception Desk:</span>
                      <span>₹{(confirmedBooking.totalAmount - confirmedBooking.amountPaid).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Instructions and Barcode simulation */}
              <div className="border-t border-gold/25 pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 font-sans text-xs items-center">
                <div className="md:col-span-8 space-y-1 text-stone-gray text-[11px] leading-relaxed">
                  <h4 className="font-bold text-midnight uppercase tracking-[0.5px]">Important Check-In Guidelines</h4>
                  <p>1. Check-In opens at <strong className="text-midnight">2:00 PM</strong>. Check-Out time is strictly <strong className="text-midnight">12:00 PM noon</strong>.</p>
                  <p>2. Physical Govt. Photo ID matching booker name must be produced during arrival check validation.</p>
                  <p>3. <strong className="text-red-600 font-bold">Strict Policy Warning:</strong> Unmarried couples check-ins are restricted per house rules.</p>
                </div>

                {/* Simulated check-in barcode */}
                <div className="md:col-span-4 flex flex-col items-center border border-gold/10 p-3 rounded bg-white">
                  {/* barcode lines representation */}
                  <div className="flex space-x-0.5 h-10 w-full justify-center">
                    {[1,3,1,4,2,1,5,1,2,3,1,4,1,2,5,1,3,1,2].map((w, i) => (
                      <span key={i} className="bg-midnight h-full shrink-0" style={{ width: `${w * 1.5}px` }} />
                    ))}
                  </div>
                  <span className="text-[9px] text-stone-gray font-mono mt-1.5 font-semibold">Ref-{confirmedBooking.bookingRef.split('-')[2]}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-12 flex justify-between gap-4 border-t border-gold/10 pt-6 no-print">
                <button
                  onClick={() => onNavigate('home')}
                  className="bg-midnight hover:bg-slate-gray text-white text-xs font-bold tracking-[1px] px-6 py-3.5 uppercase rounded-sm cursor-pointer"
                >
                  RETURN TO HOME
                </button>
                <div className="flex space-x-3">
                  <button
                    onClick={handlePrint}
                    className="border border-midnight text-midnight hover:bg-slate-gray/10 text-xs font-bold tracking-[1px] px-6 py-3.5 uppercase rounded-sm cursor-pointer flex items-center space-x-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>PRINT VOUCHER</span>
                  </button>
                </div>
              </div>

            </div>
          )
        )}

      </div>

      {/* RAZORPAY GATEWAY SIMULATED MODAL */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-[110] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1a2332] w-full max-w-md rounded-lg overflow-hidden border border-sky-400/30 shadow-2xl animate-scale-up font-sans text-white">
            {/* Razorpay frame header */}
            <div className="bg-sky-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded-full p-1 shrink-0 w-8 h-8 flex items-center justify-center text-sky-600 font-serif font-bold text-sm">
                  SR
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-none">Hotel Grand SR</h4>
                  <span className="text-[10px] text-sky-200">Payment ID: pay_9903ns82bba1</span>
                </div>
              </div>
              <span className="text-sm font-mono font-bold">₹{actualChargeAmount.toLocaleString('en-IN')}</span>
            </div>

            {/* Methods body */}
            <div className="p-6 space-y-6">
              <div className="bg-midnight/40 p-4 border border-gold/10 rounded">
                <span className="text-[9px] font-bold tracking-[1px] text-gold uppercase">GUEST TRANSACTION SECURED BY RAZORPAY</span>
                <p className="text-xs text-stone-gray mt-1 leading-relaxed">
                  This represents a secure, high-fidelity Razorpay payment sandbox capturing credentials safely. Click complete below to process simulated signatures.
                </p>
              </div>

              {/* UPI option selection */}
              <div className="space-y-3">
                <div className="border border-sky-500/20 bg-sky-500/5 p-3.5 rounded flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">📱</span>
                    <div>
                      <h4 className="text-xs font-bold">Pay via BHIM UPI / GPay / PhonePe</h4>
                      <p className="text-[9px] text-stone-gray mt-0.5">Instant secure UPI transfer</p>
                    </div>
                  </div>
                  <span className="text-[9px] text-sky-400 font-bold uppercase tracking-[1px]">Popular</span>
                </div>

                <div className="border border-gold/10 p-3.5 rounded flex items-center justify-between opacity-60">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">💳</span>
                    <div>
                      <h4 className="text-xs font-bold">Credit / Debit Card (Visa, RuPay, MasterCard)</h4>
                      <p className="text-[9px] text-stone-gray mt-0.5">Secure Indian bank cards</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gold/10 p-3.5 rounded flex items-center justify-between opacity-60">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🏦</span>
                    <div>
                      <h4 className="text-xs font-bold">Net Banking</h4>
                      <p className="text-[9px] text-stone-gray mt-0.5">All major Indian banks supported</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gold/10">
                <button
                  onClick={() => setShowRazorpayModal(false)}
                  className="bg-midnight hover:bg-slate-gray border border-gold/10 text-xs font-bold py-3 uppercase rounded cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  onClick={handlePaymentSuccess}
                  className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold py-3 uppercase rounded cursor-pointer animate-pulse"
                >
                  COMPLETE TRANSACTION
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STRIPE GATEWAY SIMULATED MODAL */}
      {showStripeModal && (
        <div className="fixed inset-0 z-[110] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1f2937] w-full max-w-md rounded-lg overflow-hidden border border-indigo-400/30 shadow-2xl animate-scale-up font-sans text-white">
            
            {/* Stripe Header */}
            <div className="bg-[#635bff] p-5 flex flex-col">
              <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-[1.5px]">Stripe Checkout</span>
              <div className="flex items-center justify-between mt-2">
                <h3 className="font-serif text-lg font-bold">Hotel Grand SR</h3>
                <span className="text-xl font-bold font-mono">₹{actualChargeAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="bg-midnight border border-stone-700 text-stone-400 text-xs p-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Card Particulars</label>
                <div className="bg-midnight border border-stone-700 p-3 rounded flex items-center justify-between">
                  {/* Card mockup */}
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-indigo-400">VISA</span>
                    <span className="text-xs text-ivory font-mono">•••• •••• •••• 4242</span>
                  </div>
                  <span className="text-xs text-stone-gray font-mono">12/28</span>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Country or Region</label>
                <select className="bg-midnight border border-stone-700 text-stone-300 text-xs p-2.5 rounded focus:outline-none">
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-700">
                <button
                  onClick={() => setShowStripeModal(false)}
                  className="bg-midnight hover:bg-stone-800 border border-stone-700 text-xs font-bold py-3 uppercase rounded cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  onClick={handlePaymentSuccess}
                  className="bg-[#635bff] hover:bg-[#4f46e5] text-white text-xs font-bold py-3 uppercase rounded cursor-pointer"
                >
                  PAY NOW WITH STRIPE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
