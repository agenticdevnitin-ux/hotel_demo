import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, EventEnquiry, Review, RoomType, InventoryRecord } from '../types';
import { ROOM_TYPES, SEEDED_REVIEWS } from '../data';

// Allocation of our 42 total guestrooms across categories:
export const ROOM_ALLOTMENTS: Record<string, number> = {
  deluxe: 15,
  premium: 15,
  executive: 8,
  suite: 4,
};

interface BookingContextType {
  bookings: Booking[];
  enquiries: EventEnquiry[];
  reviews: Review[];
  searchParams: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomsCount: number;
  };
  activeBooking: Partial<Booking> | null;
  currentAdmin: { email: string; role: 'super_admin' | 'staff' } | null;
  inventory: Record<string, Record<string, number>>; // roomTypeId -> dateString -> bookedCount
  roomPrices: Record<string, number>; // roomTypeId -> price per night
  
  setSearchParams: (params: { checkIn: string; checkOut: string; guests: number; roomsCount: number }) => void;
  setActiveBooking: (booking: Partial<Booking> | null) => void;
  checkAvailability: (roomTypeId: string, checkIn: string, checkOut: string, roomsNeeded: number) => boolean;
  getAvailableCount: (roomTypeId: string, checkIn: string, checkOut: string) => number;
  createBooking: (booking: Omit<Booking, 'id' | 'bookingRef' | 'createdAt'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  addEnquiry: (enquiry: Omit<EventEnquiry, 'id' | 'createdAt' | 'status'>) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'approved'>) => void;
  
  // Admin Operations
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  updateBookingStatus: (id: string, status: Booking['bookingStatus']) => void;
  updatePaymentStatus: (id: string, status: Booking['paymentStatus']) => void;
  updateEnquiryStatus: (id: string, status: EventEnquiry['status']) => void;
  updateRoomPrice: (roomTypeId: string, price: number) => void;
  blockInventory: (roomTypeId: string, date: string, countToBlock: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Helper to get array of dates between checkIn (inclusive) and checkOut (exclusive)
export const getDatesInRange = (startDateStr: string, endDateStr: string): string[] => {
  const dates: string[] = [];
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return [];
  
  const current = new Date(start);
  while (current < end) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initial Search parameters (defaulting to today and tomorrow)
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [searchParams, setSearchParamsState] = useState(() => {
    const saved = localStorage.getItem('gsr_search_params');
    return saved ? JSON.parse(saved) : {
      checkIn: formatDate(today),
      checkOut: formatDate(tomorrow),
      guests: 2,
      roomsCount: 1
    };
  });

  // 2. Bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('gsr_bookings');
    if (saved) return JSON.parse(saved);
    
    // Seed standard mock booking to make admin panel look full initially
    return [
      {
        id: 'b_1',
        bookingRef: 'GSR-2026-8841',
        guestName: 'Anil Kapoor',
        email: 'anil@kapoor.com',
        phone: '+91 98765 43210',
        idProofType: 'Aadhaar Card',
        checkIn: '2026-06-25',
        checkOut: '2026-06-28',
        roomTypeId: 'deluxe',
        ratePlanId: 'breakfast_flexible',
        numGuests: 2,
        numRooms: 1,
        totalAmount: 11250, // 3000 * 3 nights * 1.25 rate plan modifier
        amountPaid: 11250,
        paymentStatus: 'paid',
        bookingStatus: 'confirmed',
        specialRequests: 'Prefer high floor and morning paper',
        createdAt: '2026-06-20T14:30:00Z',
        paymentGateway: 'razorpay'
      },
      {
        id: 'b_2',
        bookingRef: 'GSR-2026-5524',
        guestName: 'Dr. Ramesh Kumar',
        email: 'ramesh.kumar@aiims.edu',
        phone: '+91 99112 23344',
        idProofType: 'Driving License',
        checkIn: '2026-06-28',
        checkOut: '2026-06-29',
        roomTypeId: 'suite',
        ratePlanId: 'room_only_non_refundable',
        numGuests: 3,
        numRooms: 1,
        totalAmount: 6000,
        amountPaid: 0,
        paymentStatus: 'pending',
        bookingStatus: 'confirmed',
        specialRequests: 'Late arrival around 10 PM',
        createdAt: '2026-06-23T09:15:00Z',
        paymentGateway: 'stripe'
      }
    ];
  });

  // 3. Banquet Enquiries
  const [enquiries, setEnquiries] = useState<EventEnquiry[]>(() => {
    const saved = localStorage.getItem('gsr_enquiries');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'e_1',
        name: 'Siddharth Malhotra',
        phone: '+91 98989 89898',
        email: 'sid@weddingplanner.in',
        eventType: 'Wedding Reception',
        eventDate: '2026-11-20',
        guestCount: 250,
        message: 'Looking for full package including catering at Aroma Hall for a premium reception.',
        status: 'New',
        createdAt: '2026-06-22T10:00:00Z'
      },
      {
        id: 'e_2',
        name: 'TCS Regional Office',
        phone: '+91 88776 65544',
        email: 'regional.hr@tcs.com',
        eventType: 'Corporate Conference',
        eventDate: '2026-07-15',
        guestCount: 50,
        message: 'Need standard board projector setting with buffet lunch at Aroma Cafe.',
        status: 'Contacted',
        createdAt: '2026-06-21T11:45:00Z'
      }
    ];
  });

  // 4. Guest Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('gsr_reviews');
    return saved ? JSON.parse(saved) : SEEDED_REVIEWS;
  });

  // 5. Room pricing overrides
  const [roomPrices, setRoomPrices] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('gsr_prices');
    if (saved) return JSON.parse(saved);
    const initialPrices: Record<string, number> = {};
    ROOM_TYPES.forEach(r => {
      initialPrices[r.id] = r.basePrice;
    });
    return initialPrices;
  });

  // 6. Room inventory tracker (booked count per day)
  const [inventory, setInventory] = useState<Record<string, Record<string, number>>>(() => {
    const saved = localStorage.getItem('gsr_inventory');
    if (saved) return JSON.parse(saved);
    
    // Build initial inventory from existing seed bookings
    const initialInv: Record<string, Record<string, number>> = {};
    ROOM_TYPES.forEach(r => {
      initialInv[r.id] = {};
    });
    
    // Seed initial bookings into inventory Ledger
    const seedBookings = [
      { checkIn: '2026-06-25', checkOut: '2026-06-28', roomTypeId: 'deluxe', numRooms: 1 },
      { checkIn: '2026-06-28', checkOut: '2026-06-29', roomTypeId: 'suite', numRooms: 1 }
    ];
    
    seedBookings.forEach(sb => {
      const dates = getDatesInRange(sb.checkIn, sb.checkOut);
      dates.forEach(d => {
        if (!initialInv[sb.roomTypeId]) initialInv[sb.roomTypeId] = {};
        initialInv[sb.roomTypeId][d] = (initialInv[sb.roomTypeId][d] || 0) + sb.numRooms;
      });
    });
    
    return initialInv;
  });

  // 7. Active Booking Temp Storage
  const [activeBooking, setActiveBooking] = useState<Partial<Booking> | null>(null);

  // 8. Admin authentication state
  const [currentAdmin, setCurrentAdmin] = useState<{ email: string; role: 'super_admin' | 'staff' } | null>(() => {
    const saved = localStorage.getItem('gsr_admin_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Save states to localstorage whenever they change
  useEffect(() => {
    localStorage.setItem('gsr_search_params', JSON.stringify(searchParams));
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem('gsr_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('gsr_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('gsr_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('gsr_prices', JSON.stringify(roomPrices));
  }, [roomPrices]);

  useEffect(() => {
    localStorage.setItem('gsr_inventory', JSON.stringify(inventory));
  }, [inventory]);

  // Public Actions
  const setSearchParams = (params: typeof searchParams) => {
    setSearchParamsState(params);
  };

  // Check if a specific room category has availability for dates
  const checkAvailability = (roomTypeId: string, checkIn: string, checkOut: string, roomsNeeded: number): boolean => {
    const dates = getDatesInRange(checkIn, checkOut);
    if (dates.length === 0) return false;
    
    const limit = ROOM_ALLOTMENTS[roomTypeId] || 0;
    
    // Check if any date in the range exceeds allotment
    for (const d of dates) {
      const bookedCount = (inventory[roomTypeId]?.[d] || 0);
      if (bookedCount + roomsNeeded > limit) {
        return false;
      }
    }
    return true;
  };

  // Get total remaining rooms available for selection
  const getAvailableCount = (roomTypeId: string, checkIn: string, checkOut: string): number => {
    const dates = getDatesInRange(checkIn, checkOut);
    if (dates.length === 0) return 0;
    
    const limit = ROOM_ALLOTMENTS[roomTypeId] || 0;
    let maxBooked = 0;
    
    dates.forEach(d => {
      const booked = (inventory[roomTypeId]?.[d] || 0);
      if (booked > maxBooked) {
        maxBooked = booked;
      }
    });
    
    return Math.max(0, limit - maxBooked);
  };

  // Create confirmed booking, updating inventory ledger
  const createBooking = (bookingData: Omit<Booking, 'id' | 'bookingRef' | 'createdAt'>): Booking => {
    const randomRefNum = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `GSR-2026-${randomRefNum}`;
    const id = `b_${Date.now()}`;
    const createdAt = new Date().toISOString();
    
    const newBooking: Booking = {
      ...bookingData,
      id,
      bookingRef,
      createdAt
    };
    
    // 1. Update Inventory Ledger
    const dates = getDatesInRange(bookingData.checkIn, bookingData.checkOut);
    const updatedInv = { ...inventory };
    
    if (!updatedInv[bookingData.roomTypeId]) {
      updatedInv[bookingData.roomTypeId] = {};
    }
    
    dates.forEach(d => {
      updatedInv[bookingData.roomTypeId][d] = (updatedInv[bookingData.roomTypeId][d] || 0) + bookingData.numRooms;
    });
    
    setInventory(updatedInv);
    
    // 2. Add Booking
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  // Cancel booking and release daily allotment
  const cancelBooking = (bookingId: string) => {
    const target = bookings.find(b => b.id === bookingId);
    if (!target) return;
    
    // 1. Release Inventory allotment (only if the booking was previously confirmed/active)
    if (target.bookingStatus === 'confirmed' || target.bookingStatus === 'checked-in') {
      const dates = getDatesInRange(target.checkIn, target.checkOut);
      const updatedInv = { ...inventory };
      
      dates.forEach(d => {
        if (updatedInv[target.roomTypeId]?.[d]) {
          updatedInv[target.roomTypeId][d] = Math.max(0, updatedInv[target.roomTypeId][d] - target.numRooms);
        }
      });
      setInventory(updatedInv);
    }
    
    // 2. Set Status
    setBookings(prev => prev.map(b => 
      b.id === bookingId 
        ? { ...b, bookingStatus: 'cancelled' as const, paymentStatus: b.paymentStatus === 'paid' ? 'refunded' as const : b.paymentStatus }
        : b
    ));
  };

  const addEnquiry = (enquiryData: Omit<EventEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: EventEnquiry = {
      ...enquiryData,
      id: `e_${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt' | 'approved'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev_${Date.now()}`,
      approved: true, // Auto-approve for beautiful prototype interactivity
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
  };

  // Admin Methods
  const loginAdmin = (email: string, pass: string): boolean => {
    // Check credentials (accepts admin@hotelgrandsr.com / admin123 or staff@hotelgrandsr.com / staff123)
    if (email === 'admin@hotelgrandsr.com' && pass === 'admin123') {
      const adminSession = { email, role: 'super_admin' as const };
      setCurrentAdmin(adminSession);
      localStorage.setItem('gsr_admin_session', JSON.stringify(adminSession));
      return true;
    } else if (email === 'staff@hotelgrandsr.com' && pass === 'staff123') {
      const adminSession = { email, role: 'staff' as const };
      setCurrentAdmin(adminSession);
      localStorage.setItem('gsr_admin_session', JSON.stringify(adminSession));
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setCurrentAdmin(null);
    localStorage.removeItem('gsr_admin_session');
  };

  const updateBookingStatus = (id: string, status: Booking['bookingStatus']) => {
    // If transitioning to cancelled from active, release inventory
    const b = bookings.find(x => x.id === id);
    if (b && status === 'cancelled' && (b.bookingStatus === 'confirmed' || b.bookingStatus === 'checked-in')) {
      const dates = getDatesInRange(b.checkIn, b.checkOut);
      const updatedInv = { ...inventory };
      dates.forEach(d => {
        if (updatedInv[b.roomTypeId]?.[d]) {
          updatedInv[b.roomTypeId][d] = Math.max(0, updatedInv[b.roomTypeId][d] - b.numRooms);
        }
      });
      setInventory(updatedInv);
    }
    
    // If restoring a cancelled booking, check availability first and reserve
    if (b && b.bookingStatus === 'cancelled' && (status === 'confirmed' || status === 'checked-in')) {
      const dates = getDatesInRange(b.checkIn, b.checkOut);
      const updatedInv = { ...inventory };
      dates.forEach(d => {
        updatedInv[b.roomTypeId][d] = (updatedInv[b.roomTypeId][d] || 0) + b.numRooms;
      });
      setInventory(updatedInv);
    }

    setBookings(prev => prev.map(item => 
      item.id === id ? { ...item, bookingStatus: status } : item
    ));
  };

  const updatePaymentStatus = (id: string, status: Booking['paymentStatus']) => {
    setBookings(prev => prev.map(item => 
      item.id === id ? { ...item, paymentStatus: status } : item
    ));
  };

  const updateEnquiryStatus = (id: string, status: EventEnquiry['status']) => {
    setEnquiries(prev => prev.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  const updateRoomPrice = (roomTypeId: string, price: number) => {
    setRoomPrices(prev => ({
      ...prev,
      [roomTypeId]: price
    }));
  };

  const blockInventory = (roomTypeId: string, date: string, countToBlock: number) => {
    setInventory(prev => {
      const updatedType = { ...prev[roomTypeId] };
      updatedType[date] = countToBlock;
      return {
        ...prev,
        [roomTypeId]: updatedType
      };
    });
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      enquiries,
      reviews,
      searchParams,
      activeBooking,
      currentAdmin,
      inventory,
      roomPrices,
      setSearchParams,
      setActiveBooking,
      checkAvailability,
      getAvailableCount,
      createBooking,
      cancelBooking,
      addEnquiry,
      addReview,
      loginAdmin,
      logoutAdmin,
      updateBookingStatus,
      updatePaymentStatus,
      updateEnquiryStatus,
      updateRoomPrice,
      blockInventory
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
