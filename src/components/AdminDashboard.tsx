import React, { useState } from 'react';
import { useBooking, getDatesInRange } from '../context/BookingContext';
import { ROOM_TYPES, RATE_PLANS } from '../data';
import { ShieldCheck, UserCheck, Calendar, Settings, Coins, LayoutDashboard, Users, FileText, TrendingUp, BarChart3, LogOut, CheckCircle, Clock, Trash, AlertTriangle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    bookings,
    enquiries,
    currentAdmin,
    loginAdmin,
    logoutAdmin,
    updateBookingStatus,
    updatePaymentStatus,
    updateEnquiryStatus,
    updateRoomPrice,
    roomPrices,
    inventory
  } = useBooking();

  // local auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // active tab: 'overview', 'bookings', 'banquet', 'pricing', 'inventory'
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'banquet' | 'pricing' | 'inventory'>('overview');

  // local pricing override edit state
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [overridePrice, setOverridePrice] = useState<number>(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(email, password);
    if (!success) {
      setAuthError('Invalid credentials. Please enter official admin/staff logins.');
    } else {
      setAuthError('');
    }
  };

  const handlePriceSave = (roomId: string) => {
    updateRoomPrice(roomId, overridePrice);
    setEditingRoomId(null);
  };

  const handleStartPriceEdit = (roomId: string, currentVal: number) => {
    setEditingRoomId(roomId);
    setOverridePrice(currentVal);
  };

  // 1. Unauthenticated Login Screen
  if (!currentAdmin) {
    return (
      <div className="w-full bg-[#080B0F] min-h-screen pt-32 pb-16 px-6 flex items-center justify-center font-sans text-white">
        <div className="bg-[#0f141c] border border-gold/35 rounded-md p-8 max-w-md w-full shadow-2xl space-y-6 text-left">
          
          <div className="flex flex-col items-center text-center">
            <Settings className="w-8 h-8 text-gold animate-spin-slow mb-3" />
            <span className="text-xs font-serif tracking-[4px] text-gold font-bold uppercase leading-none">HOTEL</span>
            <span className="text-2xl font-serif font-bold text-ivory tracking-[1px] leading-tight">GRAND SR ADMIN</span>
            <p className="text-[11px] text-stone-gray mt-1 leading-relaxed">
              Official staff gateway for Room Reservation CRM, Banquet Leads, and Dynamic pricing.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Staff Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hotelgrandsr.com"
                className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold placeholder-stone-gray/40"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold placeholder-stone-gray/40"
              />
            </div>

            {authError && (
              <p className="text-[11px] text-red-400 font-bold">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gold hover:bg-gold-hover text-midnight text-xs font-bold py-3.5 tracking-[1px] uppercase rounded-sm cursor-pointer shadow-md shadow-gold/25"
            >
              LOG INTO LEDGER PANEL
            </button>
          </form>

          {/* Credentials helper */}
          <div className="bg-midnight border border-gold/10 p-4 rounded text-[11px] text-stone-gray leading-relaxed">
            <span className="text-gold font-bold uppercase tracking-[0.5px] block mb-1">Official staff access codes:</span>
            - Super Admin role: <br />
            Email: <strong className="text-ivory">admin@hotelgrandsr.com</strong> | Pass: <strong className="text-ivory">admin123</strong> <br />
            - Desk Front Office role: <br />
            Email: <strong className="text-ivory">staff@hotelgrandsr.com</strong> | Pass: <strong className="text-ivory">staff123</strong>
          </div>

        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard Layout
  const isSuperAdmin = currentAdmin.role === 'super_admin';

  // Calculations for Business Analytics Overview
  const totalBookingsCount = bookings.length;
  const activeBookingsCount = bookings.filter(b => b.bookingStatus === 'confirmed' || b.bookingStatus === 'checked-in').length;
  const grossTotalInvoiced = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const paidCashCollected = bookings.reduce((sum, b) => sum + (b.paymentStatus === 'paid' ? b.amountPaid : 0), 0);
  const pendingCollections = bookings.reduce((sum, b) => sum + (b.paymentStatus === 'pending' ? (b.totalAmount - b.amountPaid) : 0), 0);

  const getRoomName = (id: string) => ROOM_TYPES.find(r => r.id === id)?.name || id;

  return (
    <div className="w-full bg-midnight min-h-screen pt-28 pb-16 px-6 lg:px-12 font-sans text-white">
      <div className="max-w-[1600px] w-full mx-auto">
        
        {/* Banner with staff info and logout */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gold/15 pb-6 mb-10 gap-4">
          <div className="flex flex-col text-left">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-gold" />
              <span className="text-[10px] bg-gold/10 border border-gold/20 text-gold px-2.5 py-1 rounded-full text-xs uppercase tracking-[1px] font-bold">
                {currentAdmin.role === 'super_admin' ? '♛ SUPER ADMIN OVERLORD' : '⌨ FRONT DESK MANAGER'}
              </span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-ivory mt-1">Staff Administration Portal</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs text-stone-gray font-sans font-medium">
              Active ledger: <strong className="text-ivory">{currentAdmin.email}</strong>
            </span>
            <button
              onClick={logoutAdmin}
              className="border border-red-500/30 hover:border-red-500 text-red-400 text-xs px-4 py-2 font-bold tracking-[1px] rounded uppercase flex items-center space-x-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Multi-tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { id: 'overview', label: 'METRIC OVERVIEW', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'bookings', label: 'BOOKING CRM LEDGER', icon: <Users className="w-4 h-4" /> },
            { id: 'banquet', label: 'AROMA BANQUET LEADS', icon: <FileText className="w-4 h-4" /> },
            { id: 'pricing', label: 'ROOM RATE OVERRIDES', icon: <Coins className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs font-sans font-bold tracking-[1px] uppercase px-5 py-3 rounded border transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gold border-gold text-midnight shadow-md shadow-gold/25'
                  : 'bg-slate-gray/10 border-gold/15 text-ivory hover:border-gold'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fade-in">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
              <div className="bg-[#0f141c] border border-gold/10 p-6 rounded shadow-xl flex flex-col justify-between">
                <div>
                  <LayoutDashboard className="w-5 h-5 text-gold mb-3" />
                  <p className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Total Stays Registered</p>
                  <h3 className="text-3xl font-serif font-bold text-ivory mt-1">{totalBookingsCount}</h3>
                </div>
                <p className="text-[10px] text-emerald-400 mt-4">Active & Confirmed stays: {activeBookingsCount}</p>
              </div>

              <div className="bg-[#0f141c] border border-gold/10 p-6 rounded shadow-xl flex flex-col justify-between">
                <div>
                  <Coins className="w-5 h-5 text-gold mb-3" />
                  <p className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Paid revenue captured</p>
                  <h3 className="text-3xl font-serif font-bold text-emerald-400 mt-1">₹{paidCashCollected.toLocaleString('en-IN')}</h3>
                </div>
                <p className="text-[10px] text-stone-gray mt-4">Out of ₹{grossTotalInvoiced.toLocaleString('en-IN')} gross invoiced</p>
              </div>

              <div className="bg-[#0f141c] border border-gold/10 p-6 rounded shadow-xl flex flex-col justify-between">
                <div>
                  <Clock className="w-5 h-5 text-gold mb-3" />
                  <p className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Pending collections (Cash on arrival)</p>
                  <h3 className="text-3xl font-serif font-bold text-amber-400 mt-1">₹{pendingCollections.toLocaleString('en-IN')}</h3>
                </div>
                <p className="text-[10px] text-stone-gray mt-4">Due during reception check-ins</p>
              </div>

              <div className="bg-[#0f141c] border border-gold/10 p-6 rounded shadow-xl flex flex-col justify-between">
                <div>
                  <FileText className="w-5 h-5 text-gold mb-3" />
                  <p className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Wedding Banquet Leads</p>
                  <h3 className="text-3xl font-serif font-bold text-ivory mt-1">{enquiries.length}</h3>
                </div>
                <p className="text-[10px] text-gold mt-4">Unattended New Leads: {enquiries.filter(e => e.status === 'New').length}</p>
              </div>
            </div>

            {/* Sub-block showing system status info */}
            <div className="bg-slate-gray/10 border border-gold/10 p-6 rounded text-left space-y-3 font-sans">
              <h3 className="text-sm font-bold text-gold uppercase tracking-[1px]">Property Security & Admin Guidelines</h3>
              <ul className="text-xs text-stone-gray space-y-2.5 leading-relaxed list-disc list-inside">
                <li>Desk staff must check physical photo ID documents (Aadhaar or Passport) to match guest details during check-ins.</li>
                <li>Verify couples booking eligibility criteria per standard unmarried couples restriction rule.</li>
                <li>Review the daily inventory ledger before manually creating spot walk-in bookings to prevent overbooking rooms.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Bookings CRM Ledger */}
        {activeTab === 'bookings' && (
          <div className="bg-[#0f141c] border border-gold/15 p-6 rounded shadow-2xl text-left space-y-6 animate-fade-in">
            <h3 className="text-lg font-serif font-bold text-gold uppercase tracking-[1px] border-b border-gold/15 pb-3">
              Room Reservation Ledger CRM
            </h3>

            {bookings.length === 0 ? (
              <p className="text-xs text-stone-gray py-6 text-center">No bookings registered in the database ledger.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-sans text-stone-gray border-t border-gold/10">
                  <thead>
                    <tr className="border-b border-gold/15 text-gold font-bold uppercase tracking-[0.5px]">
                      <th className="py-3 text-left">Reference & Booker</th>
                      <th className="py-3 text-left">Stay period</th>
                      <th className="py-3 text-left">Allotted Accommodations</th>
                      <th className="py-3 text-right">stay Invoice</th>
                      <th className="py-3 text-center">Booking Status</th>
                      <th className="py-3 text-center">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-b border-gold/10 hover:bg-slate-gray/10 transition-colors">
                        <td className="py-4 font-medium text-ivory">
                          <strong className="text-gold text-sm block">{b.bookingRef}</strong>
                          <span className="block mt-0.5">{b.guestName}</span>
                          <span className="text-[10px] text-stone-gray block">{b.phone} | {b.email}</span>
                          {b.specialRequests && <span className="block text-[10px] text-amber-300 italic mt-1">Req: "{b.specialRequests}"</span>}
                        </td>
                        <td className="py-4">
                          <span className="font-semibold text-ivory">{b.checkIn} to {b.checkOut}</span>
                        </td>
                        <td className="py-4">
                          <span className="block font-bold text-ivory">{getRoomName(b.roomTypeId)}</span>
                          <span className="block text-[10px] text-stone-gray">{b.numRooms} Room(s) • {b.numGuests} Guests</span>
                        </td>
                        <td className="py-4 text-right">
                          <strong className="text-ivory block">₹{b.totalAmount.toLocaleString('en-IN')}</strong>
                          <span className="text-[10px] text-emerald-400 block">Paid: ₹{b.amountPaid.toLocaleString('en-IN')}</span>
                        </td>
                        <td className="py-4 text-center">
                          {/* Selector for status */}
                          <select
                            value={b.bookingStatus}
                            onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                            className="bg-midnight border border-gold/15 text-ivory text-[11px] p-1.5 rounded focus:outline-none"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="checked-in">Checked-In</option>
                            <option value="completed">Completed</option>
                            <option value="no-show">No-Show</option>
                          </select>
                        </td>
                        <td className="py-4 text-center">
                          <select
                            value={b.paymentStatus}
                            onChange={(e) => updatePaymentStatus(b.id, e.target.value as any)}
                            className="bg-midnight border border-gold/15 text-ivory text-[11px] p-1.5 rounded focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="refunded">Refunded</option>
                            <option value="failed">Failed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Aroma Banquet Leads */}
        {activeTab === 'banquet' && (
          <div className="bg-[#0f141c] border border-gold/15 p-6 rounded shadow-2xl text-left space-y-6 animate-fade-in">
            <h3 className="text-lg font-serif font-bold text-gold uppercase tracking-[1px] border-b border-gold/15 pb-3">
              Banquet Leads CRM Sheet
            </h3>

            {enquiries.length === 0 ? (
              <p className="text-xs text-stone-gray py-6 text-center">No wedding or conference inquiries submitted.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-sans text-stone-gray border-t border-gold/10">
                  <thead>
                    <tr className="border-b border-gold/15 text-gold font-bold uppercase tracking-[0.5px] py-3">
                      <th className="py-3 text-left">Event & Lead Name</th>
                      <th className="py-3 text-left">Target Date</th>
                      <th className="py-3 text-left">Guests Expected</th>
                      <th className="py-3 text-left">Message details</th>
                      <th className="py-3 text-center">Lead Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((e) => (
                      <tr key={e.id} className="border-b border-gold/10 hover:bg-slate-gray/10 transition-colors">
                        <td className="py-4 font-medium text-ivory">
                          <strong className="text-ivory text-sm block">{e.eventType}</strong>
                          <span className="block mt-0.5">{e.name}</span>
                          <span className="text-[10px] text-stone-gray block">{e.phone} | {e.email}</span>
                        </td>
                        <td className="py-4">
                          <strong className="text-gold">{e.eventDate}</strong>
                        </td>
                        <td className="py-4">
                          <span className="font-bold text-ivory">{e.guestCount} Guests</span>
                        </td>
                        <td className="py-4">
                          <p className="text-[11px] text-stone-gray max-w-sm line-clamp-2 italic">"{e.message}"</p>
                        </td>
                        <td className="py-4 text-center">
                          <select
                            value={e.status}
                            onChange={(ev) => updateEnquiryStatus(e.id, ev.target.value as any)}
                            className="bg-midnight border border-gold/15 text-ivory text-[11px] p-1.5 rounded focus:outline-none"
                          >
                            <option value="New">New Lead</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Lost">Lost</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Room Rate Manager */}
        {activeTab === 'pricing' && (
          <div className="bg-[#0f141c] border border-gold/15 p-6 rounded shadow-2xl text-left space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-gold/15 pb-3">
              <h3 className="text-lg font-serif font-bold text-gold uppercase tracking-[1px]">
                Dynamic Base Room Rate Manager
              </h3>
              {!isSuperAdmin && (
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-[1px]">
                  * Front desk managers have view-only price validation access.
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ROOM_TYPES.map((room) => {
                const currentPrice = roomPrices[room.id] || room.basePrice;
                const isEditing = editingRoomId === room.id;

                return (
                  <div
                    key={room.id}
                    className="bg-midnight border border-gold/10 p-6 rounded flex items-center justify-between hover:border-gold/30 transition-all"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-ivory uppercase tracking-[0.5px]">{room.name}</h4>
                      <p className="text-[11px] text-stone-gray mt-1">Bed Type: {room.bedType} • Size: {room.sizeSqFt} sq ft</p>
                      
                      <div className="mt-4 flex items-center space-x-2">
                        <span className="text-stone-gray text-[10px] uppercase">Base Rate per night:</span>
                        {isEditing ? (
                          <input
                            type="number"
                            value={overridePrice}
                            onChange={(e) => setOverridePrice(Number(e.target.value))}
                            className="bg-slate-gray/30 border border-gold/40 text-gold text-xs font-bold p-1 w-24 rounded focus:outline-none"
                          />
                        ) : (
                          <strong className="text-gold text-lg font-serif">₹{currentPrice.toLocaleString('en-IN')}</strong>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 pl-4">
                      {isEditing ? (
                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => handlePriceSave(room.id)}
                            className="bg-emerald-600 text-white text-[10px] font-sans font-bold uppercase tracking-[1px] px-3 py-1.5 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingRoomId(null)}
                            className="bg-midnight border border-gold/25 text-stone-gray text-[10px] font-sans px-3 py-1.5 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          disabled={!isSuperAdmin}
                          onClick={() => handleStartPriceEdit(room.id, currentPrice)}
                          className={`text-[11px] font-bold font-sans uppercase tracking-[0.5px] px-4 py-2 border rounded-sm transition-all ${
                            isSuperAdmin
                              ? 'border-gold text-gold hover:bg-gold hover:text-midnight cursor-pointer'
                              : 'border-gold/10 text-stone-gray opacity-40 cursor-not-allowed'
                          }`}
                        >
                          Modify Rate
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
