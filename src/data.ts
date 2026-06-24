import { RoomType, RatePlan, Review } from './types';

export const ROOM_TYPES: RoomType[] = [
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    description: 'Our standard-setting sanctuary combining elegant design with practical comfort. Fully air-conditioned and fitted with premium linens, a functional workspace, and modern shower facilities.',
    sizeSqFt: 120,
    maxOccupancy: 2,
    bedType: '1 King Bed',
    baseAmenities: [
      'Air Conditioning',
      'Flat-screen Satellite TV',
      'High-speed Wi-Fi',
      'Complimentary Bottled Water',
      'Coffee & Tea Maker',
      'Toiletries & Dental Kit',
      'Work Desk & Chair',
      'Electronic Safe'
    ],
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'
    ],
    basePrice: 3000
  },
  {
    id: 'premium',
    name: 'Premium Room',
    description: 'Offering additional breathing room and sophisticated layout upgrades. Features a cozy lounge seating corner and a well-stocked mini-fridge, ideal for business professionals and small families.',
    sizeSqFt: 150,
    maxOccupancy: 3,
    bedType: '1 King Bed',
    baseAmenities: [
      'Air Conditioning',
      'Flat-screen Satellite TV',
      'High-speed Wi-Fi',
      'Complimentary Bottled Water',
      'Coffee & Tea Maker',
      'Toiletries & Dental Kit',
      'Work Desk & Chair',
      'Electronic Safe',
      'Mini Refrigerator',
      'Sofa Seating Area'
    ],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=600&q=80'
    ],
    basePrice: 3800
  },
  {
    id: 'executive',
    name: 'Executive Room',
    description: 'Crafted for the discerning corporate traveler. Incorporates high-speed premium Wi-Fi boosters, an ergonomic executive workstation, and an extensive selection of bath and wellness amenities.',
    sizeSqFt: 180,
    maxOccupancy: 4,
    bedType: '1 King Bed',
    baseAmenities: [
      'Air Conditioning',
      'Flat-screen Satellite TV',
      'High-speed Booster Wi-Fi',
      'Complimentary Bottled Water & Juice',
      'Premium Coffee & Tea Station',
      'Premium Toiletries & Hairdryer',
      'Ergonomic Workstation',
      'Electronic Safe',
      'Mini Refrigerator',
      'Sofa Seating Area',
      'Daily Newspaper Delivery'
    ],
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80'
    ],
    basePrice: 4500
  },
  {
    id: 'suite',
    name: 'Hotel Grand SR Suite',
    description: 'The pinnacle of luxury in Azamgarh. Features a fully separated private living parlor, a grand bedroom chamber, dining table, and premium master bathroom with luxurious toiletries and bubble bath.',
    sizeSqFt: 250,
    maxOccupancy: 4,
    bedType: '1 Super King Bed',
    baseAmenities: [
      'Air Conditioning',
      'Two 43" Flat-screen Satellite TVs',
      'High-speed Booster Wi-Fi',
      'Complimentary Premium Welcome Drink',
      'Premium Coffee & Tea Station',
      'Luxury Toiletries & Hairdryer',
      'Separated Living Room & Dining Area',
      'Mini Bar & Refrigerator',
      'Plush Bathrobes & Slippers',
      'Electronic Safe',
      'Daily Newspaper & Fruit Platter'
    ],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80'
    ],
    basePrice: 6000
  }
];

export const RATE_PLANS: RatePlan[] = [
  {
    id: 'room_only_non_refundable',
    name: 'Room Only - Non-Refundable',
    description: 'Save more with our advance purchase rate. Full pre-payment is required. Changes or cancellations are non-refundable.',
    priceModifier: 1.0,
    refundable: false,
    cancellationWindowHours: 0
  },
  {
    id: 'standard_flexible',
    name: 'Room Only - Free Cancellation',
    description: 'Enjoy flexibility. Pay nothing now or pay advance, and cancel free of charge up to 24 hours prior to check-in.',
    priceModifier: 1.10,
    refundable: true,
    cancellationWindowHours: 24
  },
  {
    id: 'breakfast_flexible',
    name: 'Complimentary Buffet Breakfast & Free Cancellation',
    description: 'The ultimate convenience. Includes our rich gourmet buffet breakfast at Aroma Cafe and free cancellation up to 24 hours before check-in.',
    priceModifier: 1.25,
    refundable: true,
    cancellationWindowHours: 24
  }
];

export const SEEDED_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    guestName: 'Vikas Mishra',
    rating: 5,
    comment: 'The largest and by far the most professional hotel in Azamgarh. Exceeds expectations for the city! The staff is outstanding—thanks to Shivam Singh at the front desk for seamless check-in.',
    source: 'MakeMyTrip verified',
    approved: true,
    createdAt: '2026-05-12'
  },
  {
    id: 'rev_2',
    guestName: 'Ananya Goel',
    rating: 4,
    comment: 'Had a wonderful 3-night business stay. Rooms are cozy, clean, and the Wi-Fi actually works perfectly property-wide. Aroma Cafe food is excellent, especially their signature Hyderabadi Biryani!',
    source: 'Goibibo reviewer',
    approved: true,
    createdAt: '2026-05-20'
  },
  {
    id: 'rev_3',
    guestName: 'Rajeev Sharma',
    rating: 5,
    comment: 'Highly cooperative team! Special appreciation for Suraj Singh and Savita from housekeeping, they were extremely attentive. Excellent event space at Aroma Hall for conferences.',
    source: 'Yatra reviewer',
    approved: true,
    createdAt: '2026-06-02'
  },
  {
    id: 'rev_4',
    guestName: 'Preeti Chandra',
    rating: 5,
    comment: 'Best location in Azamgarh. Secure parking, great lift access, and clean linen. Breakfast selection is decent. Will definitely recommend it for student family visits during university examinations!',
    source: 'Tripadvisor user',
    approved: true,
    createdAt: '2026-06-14'
  }
];

export const NEARBY_ATTRACTIONS = [
  {
    name: 'Chando Tal',
    type: 'Scenic Lake & Birdwatching',
    distance: '12 km',
    description: 'A beautiful natural lake hosting various migratory birds, perfect for morning walks and peaceful picnics.'
  },
  {
    name: 'Azamgarh Fort',
    type: 'Historical Monument',
    distance: '3.5 km',
    description: 'A historic fortress from the era of Azam Shah, representing the rich heritage and foundations of the town.'
  },
  {
    name: 'Aadya Library',
    type: 'Cultural Landmark',
    distance: '1.2 km',
    description: 'A prominent educational and literary landmark close to the hotel, holding rare regional texts.'
  },
  {
    name: 'Shibli National College',
    type: 'Academic Institution',
    distance: '2.5 km',
    description: 'One of the oldest and most historical academic institutions in the region, established in 1883.'
  },
  {
    name: 'Local Bazaars & Craft Hubs',
    type: 'Shopping & Textiles',
    distance: '1.5 km',
    description: 'Bustling markets famous for traditional Banarasi weaving, local pottery, and authentic Uttar Pradesh street food.'
  }
];

export const CATEGORIZED_AMENITIES = [
  {
    category: 'In-Room Luxury',
    items: [
      { name: 'Air Conditioning', desc: 'Individually controlled modern climate systems.' },
      { name: 'Smart Flat-Screen TV', desc: 'Satellite channels and digital connectivity.' },
      { name: 'Complimentary Wi-Fi', desc: 'Dedicated high-speed high-bandwidth access.' },
      { name: 'Executive Workspace', desc: 'Ergonomic work desk, chair, and power outlets.' },
      { name: 'Gourmet Tea & Coffee Maker', desc: 'Replenished daily with premium ingredients.' },
      { name: 'Modern Toiletries', desc: 'Signature dental kit, soaps, and dental utilities.' }
    ]
  },
  {
    category: 'Hotel Facilities',
    items: [
      { name: '24-Hour Active Reception', desc: 'Round-the-clock check-in and local travel assistance.' },
      { name: 'Premium Room Service', desc: '24/7 in-room dining bringing the Aroma Cafe to your bed.' },
      { name: 'High-speed Elevator', desc: 'Access to all floors with absolute safety.' },
      { name: 'On-site Secure Parking', desc: 'Dedicated parking areas for private guest cars.' },
      { name: 'Daily Eco-Housekeeping', desc: 'Daily room sterilization and linen rotation.' },
      { name: 'Luggage Storage Locker', desc: 'Safe storage for your luggage pre-check-in/post-check-out.' }
    ]
  },
  {
    category: 'Dining & Events',
    items: [
      { name: 'Aroma Cafe Fine Dining', desc: 'Our signature multi-cuisine fine dining restaurant.' },
      { name: 'Grand Aroma Banquet Hall', desc: 'Magnificent air-conditioned hall for weddings and corporate galas.' },
      { name: 'Complimentary Buffet Breakfast', desc: 'Spread of traditional Indian and continental breakfast choices.' },
      { name: 'Business Boardroom', desc: 'Fully equipped meeting space with projectors and conference capabilities.' }
    ]
  }
];
