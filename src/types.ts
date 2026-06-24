export interface RoomType {
  id: string;
  name: string;
  description: string;
  sizeSqFt: number;
  maxOccupancy: number;
  bedType: string;
  baseAmenities: string[];
  images: string[];
  basePrice: number;
}

export interface RatePlan {
  id: string;
  name: string;
  description: string;
  priceModifier: number; // e.g., multiplier (1.0 for Room Only, 1.25 for With Breakfast) or fixed price
  refundable: boolean;
  cancellationWindowHours: number;
}

export interface Booking {
  id: string;
  bookingRef: string;
  guestName: string;
  email: string;
  phone: string;
  idProofType: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  roomTypeId: string;
  ratePlanId: string;
  numGuests: number;
  numRooms: number;
  totalAmount: number;
  amountPaid: number;
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  bookingStatus: 'confirmed' | 'cancelled' | 'completed' | 'checked-in' | 'no-show';
  specialRequests: string;
  createdAt: string;
  paymentGateway: 'razorpay' | 'stripe' | 'counter';
}

export interface EventEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  message: string;
  status: 'New' | 'Contacted' | 'Confirmed' | 'Lost';
  createdAt: string;
}

export interface Review {
  id: string;
  guestName: string;
  rating: number;
  comment: string;
  roomTypeId?: string;
  source: string;
  approved: boolean;
  createdAt: string;
}

export interface InventoryRecord {
  roomTypeId: string;
  date: string; // YYYY-MM-DD
  totalRooms: number;
  bookedRooms: number;
}
