import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, Users, ArrowRight, ShieldCheck, Award, Utensils, Clock, Sparkles, Building, Star, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { ROOM_TYPES, SEEDED_REVIEWS } from '../data';
import { Lens } from './Lens';
import { ScrollReveal } from './ScrollReveal';
import gsap from 'gsap';
import { motion } from 'motion/react';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onSelectRoom: (roomId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectRoom }) => {
  const { searchParams, setSearchParams, checkAvailability, getAvailableCount } = useBooking();

  // local search state synced initially with context
  const [checkIn, setCheckIn] = useState(searchParams.checkIn);
  const [checkOut, setCheckOut] = useState(searchParams.checkOut);
  const [guests, setGuests] = useState(searchParams.guests);
  const [roomsCount, setRoomsCount] = useState(searchParams.roomsCount);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // GSAP Animation Refs
  const heroEyebrowRef = useRef<HTMLParagraphElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroHighlightsRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Elegant entrance using GSAP timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(heroEyebrowRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
      tl.fromTo(heroTextRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' },
        '-=0.4'
      );
      tl.fromTo(heroSubRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
      tl.fromTo(heroHighlightsRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
    });

    return () => ctx.revert();
  }, []);

  // Quick availability check banner action
  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ checkIn, checkOut, guests, roomsCount });
    onNavigate('rooms');
    // Scroll to results
    setTimeout(() => {
      const el = document.getElementById('rooms-root');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleQuickBook = (roomId: string) => {
    onSelectRoom(roomId);
  };

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % SEEDED_REVIEWS.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + SEEDED_REVIEWS.length) % SEEDED_REVIEWS.length);
  };

  return (
    <div className="w-full flex flex-col">
      {/* SECTION_01: Hero Banner */}
      <section id="hero-section" className="relative h-[95vh] lg:h-screen flex items-center justify-start text-left bg-midnight overflow-hidden">
        {/* Background Image with Dark Golden Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85"
            alt="Hotel Grand SR Luxury Facade"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-65 scale-105"
          />
          {/* Multi-layered premium overlay matching Taj / Marriott vibe */}
          <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/70 to-transparent z-1" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-[#0B0F14]/40 z-1" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 lg:px-12 pt-16 flex flex-col justify-center h-full">
          <div className="max-w-3xl">
            {/* Elegant luxury eyebrow */}
            <p ref={heroEyebrowRef} className="text-gold tracking-[4px] text-xs lg:text-sm font-sans font-bold uppercase mb-4 opacity-0">
              THE LANDMARK HOTEL OF AZAMGARH
            </p>

            {/* Massive Editorial Display scale Heading */}
            <h1 ref={heroTextRef} className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-ivory tracking-[1px] leading-[1.05] mb-6 opacity-0">
              HOTEL <br />
              <span className="text-gold">GRAND SR</span>
            </h1>

            {/* Cinematic Subheading */}
            <p ref={heroSubRef} className="text-lg lg:text-xl font-serif text-ivory/90 tracking-[1.5px] mb-8 font-light max-w-xl opacity-0">
              Premium Stays. Perfectly Yours. Experience modern Indian hospitality blended with heritage luxury.
            </p>

            {/* Highlights bullet row */}
            <div ref={heroHighlightsRef} className="flex flex-wrap items-center gap-6 text-xs lg:text-sm text-ivory/80 font-sans tracking-[1px] font-medium mb-10 border-l border-gold/40 pl-6 opacity-0">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gold" />
                <span>42 Premium Rooms</span>
              </div>
              <span className="text-gold/40">•</span>
              <div className="flex items-center space-x-2">
                <Utensils className="w-4 h-4 text-gold" />
                <span>Fine Multi-Cuisine Dining</span>
              </div>
              <span className="text-gold/40">•</span>
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gold" />
                <span>Grand Banquet & Events Hall</span>
              </div>
            </div>

            {/* Primary CTA */}
            <motion.button
              ref={heroCtaRef as any}
              whileHover={{ scale: 1.04, boxShadow: "0px 0px 25px rgba(212,175,55,0.6)" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate('rooms')}
              className="group bg-gold hover:bg-gold-hover text-midnight text-xs lg:text-sm font-bold tracking-[2px] uppercase px-8 py-4 flex items-center space-x-3 transition-all duration-300 cursor-pointer"
            >
              <span>BOOK YOUR STAY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>

        {/* SECTION_02: Floating Booking Engine */}
        <div className="absolute bottom-0 left-0 w-full z-20 pb-6 px-6 hidden md:block">
          <div className="max-w-[1400px] mx-auto bg-midnight/80 backdrop-blur-md border border-gold/25 rounded-xl p-5 shadow-2xl shadow-midnight/80">
            <form onSubmit={handleCheckAvailability} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              {/* Check In Field */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] text-gold tracking-[1.5px] uppercase font-bold flex items-center space-x-1">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>Check-In</span>
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="bg-slate-gray/40 border border-gold/15 text-ivory text-xs px-3 py-3 rounded-md focus:border-gold focus:outline-none w-full"
                  required
                />
              </div>

              {/* Check Out Field */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] text-gold tracking-[1.5px] uppercase font-bold flex items-center space-x-1">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>Check-Out</span>
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  className="bg-slate-gray/40 border border-gold/15 text-ivory text-xs px-3 py-3 rounded-md focus:border-gold focus:outline-none w-full"
                  required
                />
              </div>

              {/* Guests Count */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] text-gold tracking-[1.5px] uppercase font-bold flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>Guests & Rooms</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="bg-slate-gray/40 border border-gold/15 text-ivory text-xs p-3 rounded-md focus:border-gold focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num} className="bg-midnight text-ivory">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="bg-slate-gray/40 border border-gold/15 text-ivory text-xs p-3 rounded-md focus:border-gold focus:outline-none"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num} className="bg-midnight text-ivory">
                        {num} {num === 1 ? 'Room' : 'Rooms'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Check Button */}
              <div className="pt-5">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(212,175,55,0.45)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-hover text-midnight text-xs font-bold tracking-[1.5px] py-4 rounded-md uppercase cursor-pointer"
                >
                  CHECK AVAILABILITY
                </motion.button>
              </div>
            </form>

            {/* Guarantee subtext */}
            <div className="flex items-center justify-center space-x-4 mt-3 text-[10px] text-stone-gray font-sans tracking-[0.5px]">
              <span className="flex items-center space-x-1 text-gold">
                <Check className="w-3 h-3" />
                <span>Best Rate Guarantee</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-gold">
                <Check className="w-3 h-3" />
                <span>No Hidden Charges On Booking</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Booking Entry (Only visible on mobile) */}
      <section className="block md:hidden bg-slate-gray/30 p-6 border-b border-gold/10">
        <form onSubmit={handleCheckAvailability} className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col space-y-1">
              <span className="text-[9px] text-gold uppercase tracking-[1px] font-bold">Check-In</span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-midnight border border-gold/15 text-ivory text-xs p-2.5 rounded focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[9px] text-gold uppercase tracking-[1px] font-bold">Check-Out</span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-midnight border border-gold/15 text-ivory text-xs p-2.5 rounded focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col space-y-1">
              <span className="text-[9px] text-gold uppercase tracking-[1px] font-bold">Guests</span>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-midnight border border-gold/15 text-ivory text-xs p-2.5 rounded focus:outline-none"
              >
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guests</option>)}
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[9px] text-gold uppercase tracking-[1px] font-bold">Rooms</span>
              <select
                value={roomsCount}
                onChange={(e) => setRoomsCount(Number(e.target.value))}
                className="bg-midnight border border-gold/15 text-ivory text-xs p-2.5 rounded focus:outline-none"
              >
                {[1,2,3].map(n => <option key={n} value={n}>{n} Rooms</option>)}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold-hover text-midnight text-xs font-bold py-3.5 tracking-[1px] uppercase rounded"
          >
            CHECK AVAILABILITY
          </button>
        </form>
      </section>

      {/* SECTION_03: Trust Metrics Cards (Ivory background) */}
      <section className="bg-ivory text-midnight py-12 px-6 lg:px-12 z-10 border-b border-gold/15">
        <div className="max-w-[1600px] w-full mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {/* Card 1: Rating */}
          <ScrollReveal direction="up" delay={0.0} duration={0.6}>
            <div className="flex flex-col items-center p-4 border-r border-gold/15 last:border-0 md:border-r h-full">
              <Star className="w-6 h-6 text-gold fill-gold mb-2" />
              <span className="text-2xl font-serif font-bold text-midnight leading-none">4.5 / 5</span>
              <span className="text-[10px] text-gold font-bold uppercase tracking-[1px] mt-1.5">Guest Rated</span>
              <span className="text-[11px] text-stone-gray font-medium mt-0.5">300+ Verified Reviews</span>
            </div>
          </ScrollReveal>

          {/* Card 2: Rooms */}
          <ScrollReveal direction="up" delay={0.1} duration={0.6}>
            <div className="flex flex-col items-center p-4 border-r border-gold/15 last:border-0 md:border-r h-full">
              <Building className="w-6 h-6 text-gold mb-2" />
              <span className="text-2xl font-serif font-bold text-midnight leading-none">42 Rooms</span>
              <span className="text-[10px] text-gold font-bold uppercase tracking-[1px] mt-1.5">Premium Rooms</span>
              <span className="text-[11px] text-stone-gray font-medium mt-0.5">Modern Hotel Comfort</span>
            </div>
          </ScrollReveal>

          {/* Card 3: Dining */}
          <ScrollReveal direction="up" delay={0.2} duration={0.6}>
            <div className="flex flex-col items-center p-4 border-r border-gold/15 last:border-0 md:border-r h-full">
              <Utensils className="w-6 h-6 text-gold mb-2" />
              <span className="text-2xl font-serif font-bold text-midnight leading-none">Aroma Cafe</span>
              <span className="text-[10px] text-gold font-bold uppercase tracking-[1px] mt-1.5">Multi-Cuisine</span>
              <span className="text-[11px] text-stone-gray font-medium mt-0.5">Casual & Fine Dining</span>
            </div>
          </ScrollReveal>

          {/* Card 4: Hospitality */}
          <ScrollReveal direction="up" delay={0.3} duration={0.6}>
            <div className="flex flex-col items-center p-4 border-r border-gold/15 last:border-0 md:border-r h-full">
              <Clock className="w-6 h-6 text-gold mb-2" />
              <span className="text-2xl font-serif font-bold text-midnight leading-none">24 × 7</span>
              <span className="text-[10px] text-gold font-bold uppercase tracking-[1px] mt-1.5">Hospitality</span>
              <span className="text-[11px] text-stone-gray font-medium mt-0.5">Front Desk & Room Service</span>
            </div>
          </ScrollReveal>

          {/* Card 5: Banquet */}
          <ScrollReveal direction="up" delay={0.4} duration={0.6} className="col-span-2 md:col-span-1">
            <div className="flex flex-col items-center p-4 last:border-0 h-full">
              <Award className="w-6 h-6 text-gold mb-2" />
              <span className="text-2xl font-serif font-bold text-midnight leading-none">Aroma Hall</span>
              <span className="text-[10px] text-gold font-bold uppercase tracking-[1px] mt-1.5">Banquet & Events</span>
              <span className="text-[11px] text-stone-gray font-medium mt-0.5">Weddings & Conferences</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION_04: Why Choose Us (Dark Background) */}
      <section className="bg-midnight py-20 px-6 lg:px-12 border-b border-gold/10 overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Editorial Content wrapped with ScrollReveal */}
          <ScrollReveal direction="left" duration={0.8} className="flex flex-col space-y-6">
            <span className="text-xs font-sans font-bold tracking-[3px] text-gold uppercase">WHY CHOOSE GRAND SR</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-ivory leading-tight">
              Stay Where Azamgarh <br />
              Comes Together
            </h2>
            <p className="text-sm text-stone-gray leading-relaxed">
              As the largest and most premium hotel property in Azamgarh town, Hotel Grand SR serves as a landmark destination. Whether you are traveling for crucial business meetings, visiting family at the State University, or celebrating life's most precious occasions, our highly trained hospitality team ensures your comfort exceeds all expectations.
            </p>

            {/* List of features with beautiful checks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {[
                { title: 'Prime Central Location', desc: 'Rahul Nagar, easy transit.' },
                { title: 'Highly Cooperative Staff', desc: ' Attentive front-desk team.' },
                { title: 'Modern Clean Amenities', desc: 'High-speed Wi-Fi & workspace.' },
                { title: 'Outstanding Fine Dining', desc: 'Signature Biryani & rich buffet.' },
                { title: 'Hygienic & Safe Stays', desc: 'Strict couples/family validation.' },
                { title: 'Grand Celebrations spaces', desc: 'Banquet space for 300+ guests.' }
              ].map((f, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="p-1 rounded-full bg-gold/10 text-gold mt-0.5 border border-gold/20 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-sans font-bold text-ivory uppercase tracking-[0.5px]">{f.title}</h4>
                    <p className="text-[11px] text-stone-gray mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: "#C8A96B", color: "#080B0F" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigate('contact')}
                className="group border border-gold text-gold text-xs font-bold tracking-[1.5px] px-6 py-3.5 flex items-center space-x-2 cursor-pointer transition-all duration-300"
              >
                <span>EXPLORE DIRECTIONS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </motion.button>
            </div>
          </ScrollReveal>

          {/* Right Column: Massive Luxury Interior Lobby Image wrapped with ScrollReveal and Lens */}
          <ScrollReveal direction="right" duration={0.8}>
            <div className="relative h-[450px] md:h-[550px] rounded-lg overflow-hidden border border-gold/15 shadow-2xl bg-midnight">
              <Lens zoomFactor={2.0} lensSize={160}>
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
                  alt="Hotel Grand SR Grand Lobby Reflection"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </Lens>
              {/* Visual shine / luxury soft amber glow - placing it absolutely on top of the Lens container, pointer-events-none */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-6 left-6 bg-midnight/90 backdrop-blur-md border border-gold/30 p-4 rounded-sm pointer-events-none z-20">
                <p className="text-gold text-[10px] uppercase font-bold tracking-[1.5px]">RECEPTION LOUNGE</p>
                <h4 className="text-serif text-sm font-semibold text-ivory">Welcome to Warm Indian Hospitality</h4>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION_05: Rooms Showcase (Ivory Background) */}
      <section className="bg-ivory text-midnight py-20 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto">
          {/* Header block with elegant slide arrows */}
          <ScrollReveal direction="up" duration={0.8}>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
              <div className="flex flex-col space-y-2">
                <span className="text-xs font-sans font-bold tracking-[2px] text-gold uppercase">ROOMS & SUITES</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-midnight">Designed For Your Comfort</h2>
              </div>
              <button
                onClick={() => onNavigate('rooms')}
                className="mt-4 md:mt-0 text-xs font-sans font-bold text-gold hover:text-gold-hover tracking-[1.5px] uppercase border-b border-gold/40 hover:border-gold transition-all cursor-pointer"
              >
                VIEW ALL ROOMS & RATES
              </button>
            </div>
          </ScrollReveal>

          {/* Horizontal Rooms Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROOM_TYPES.map((room, i) => {
              const countLeft = getAvailableCount(room.id, checkIn, checkOut);
              const hasAvail = countLeft > 0;
              return (
                <ScrollReveal key={room.id} direction="up" delay={i * 0.1} duration={0.7} className="h-full">
                  <div
                    className="bg-white rounded-md overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col h-full group"
                  >
                    {/* Image banner with high performance Lens on hover */}
                    <div className="relative h-56 overflow-hidden bg-midnight">
                      <Lens zoomFactor={1.8} lensSize={130}>
                        <img
                          src={room.images[0]}
                          alt={room.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </Lens>
                      <div className="absolute top-4 left-4 bg-midnight text-gold text-[10px] font-bold tracking-[1px] uppercase px-2.5 py-1.5 rounded-sm z-10 pointer-events-none">
                        {room.sizeSqFt} sq ft
                      </div>
                      {!hasAvail ? (
                        <div className="absolute inset-0 bg-red-950/70 backdrop-blur-xs flex items-center justify-center z-10 pointer-events-none">
                          <span className="text-white text-xs tracking-[1px] font-bold uppercase border border-white/30 px-3 py-1.5">
                            FULLY BOOKED
                          </span>
                        </div>
                      ) : countLeft <= 3 ? (
                        <div className="absolute top-4 right-4 bg-red-600 text-white text-[9px] font-bold tracking-[0.5px] uppercase px-2.5 py-1 z-10 pointer-events-none">
                          Only {countLeft} Left!
                        </div>
                      ) : null}
                    </div>

                    {/* Body Content */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-serif font-bold text-midnight mb-2">{room.name}</h3>
                        <p className="text-xs text-stone-gray line-clamp-2 leading-relaxed mb-4">
                          {room.description}
                        </p>

                        {/* Bullet Specs */}
                        <ul className="text-[11px] text-stone-gray space-y-1 mb-6 border-t border-gold/10 pt-4 font-sans">
                          <li className="flex justify-between">
                            <span className="font-semibold text-midnight">Bed Config:</span>
                            <span>{room.bedType}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="font-semibold text-midnight">Max Guests:</span>
                            <span>{room.maxOccupancy} Adults</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border-t border-gold/10 pt-4 flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-stone-gray uppercase tracking-[0.5px]">From</span>
                          <span className="text-lg font-serif font-bold text-midnight">
                            ₹{room.basePrice.toLocaleString('en-IN')}
                            <span className="text-xs font-sans text-stone-gray font-normal"> / night</span>
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(212,175,55,0.45)" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickBook(room.id)}
                          className="bg-gold hover:bg-gold-hover text-midnight text-[11px] font-bold tracking-[1px] px-3.5 py-2.5 uppercase cursor-pointer"
                        >
                          VIEW DETAILS
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION_06: Amenities Strip */}
      <section className="bg-[#080B0F] text-ivory border-y border-gold/15 py-8 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 flex flex-col items-center">
          <span className="text-[10px] text-gold tracking-[3px] uppercase font-bold mb-6">PREMIUM AMENITIES INCLUDED</span>
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
            {[
              { label: 'Free Hi-Speed Wi-Fi', icon: '📶' },
              { label: 'Aroma Fine Dining', icon: '🍽️' },
              { label: 'Aroma Banquet Hall', icon: '🏛️' },
              { label: '24/7 Room Service', icon: '🔔' },
              { label: 'Express Elevator', icon: '🛗' },
              { label: 'Daily Housekeeping', icon: '🧹' },
              { label: 'Free Buffet Breakfast', icon: '☕' },
              { label: 'Business Boardroom', icon: '💼' }
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.05} duration={0.5}>
                <div
                  className="flex flex-col items-center justify-center p-3 rounded-md bg-slate-gray/10 hover:bg-gold/10 border border-gold/5 hover:border-gold/20 transition-all duration-300 group cursor-pointer h-full"
                >
                  <span className="text-2xl mb-1.5 group-hover:scale-125 transition-transform">{item.icon}</span>
                  <span className="text-[10px] text-ivory group-hover:text-gold font-sans font-semibold tracking-[0.5px] uppercase">
                    {item.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION_07: Fine Dining Experience */}
      <section className="bg-midnight py-20 px-6 lg:px-12 border-b border-gold/10 overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo banner wrapped in Lens and ScrollReveal */}
          <ScrollReveal direction="left" duration={0.8} className="lg:col-span-7 h-full">
            <div className="relative h-[450px] lg:h-[550px] rounded-lg overflow-hidden border border-gold/15 bg-midnight">
              <Lens zoomFactor={2.0} lensSize={180}>
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                  alt="Aroma Cafe Luxury Dining Interiors"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </Lens>
              <div className="absolute inset-0 bg-gradient-to-r from-midnight/80 to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-6 left-6 bg-gold/10 backdrop-blur-md border border-gold/30 p-4 rounded pointer-events-none z-20">
                <span className="text-gold text-[10px] uppercase font-bold tracking-[1.5px]">Aroma Cafe</span>
                <p className="text-serif text-sm font-semibold text-ivory">Multicuisine Culinary Luxury</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Copy columns wrapped in ScrollReveal */}
          <ScrollReveal direction="right" duration={0.8} className="lg:col-span-5 flex flex-col space-y-6">
            <span className="text-xs font-sans font-bold tracking-[3px] text-gold uppercase">FINE DINING EXPERIENCE</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-ivory leading-tight">
              Savor Exceptional <br />
              Cuisine at Aroma Cafe
            </h2>
            <p className="text-sm text-stone-gray leading-relaxed">
              Step into Aroma Cafe, Azamgarh's premier multi-cuisine culinary retreat. Indulge in a meticulously curated menu featuring rich North Indian specialties, traditional Mughlai culinary art, and continental/Italian recipes. Cooked to absolute perfection by our executive chefs under clinical hygienic standards.
            </p>

            {/* Specialties and timings */}
            <div className="border-t border-b border-gold/15 py-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gold uppercase tracking-[1px]">Cuisines:</span>
                <span className="text-stone-gray">North Indian, Mughlai, Chinese, Italian, Shakes</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gold uppercase tracking-[1px]">Lunch Hours:</span>
                <span className="text-stone-gray">12:30 PM – 4:30 PM</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gold uppercase tracking-[1px]">Dinner Hours:</span>
                <span className="text-stone-gray">07:00 PM – 10:30 PM</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gold uppercase tracking-[1px]">Average Cost:</span>
                <span className="text-stone-gray">~₹350 – ₹400 per person</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0px 0px 20px rgba(212,175,55,0.5)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigate('dining')}
                className="bg-gold hover:bg-gold-hover text-midnight text-xs font-bold tracking-[1.5px] uppercase px-6 py-3.5 rounded-sm cursor-pointer"
              >
                RESERVE A TABLE
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: "#C8A96B", color: "#080B0F" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigate('dining')}
                className="border border-gold text-gold text-xs font-bold tracking-[1.5px] uppercase px-6 py-3.5 rounded-sm transition-all duration-300 cursor-pointer"
              >
                EXPLORE MENU PDF
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION_08: Weddings & Events Banner */}
      <section className="relative h-[480px] flex items-center justify-center text-center bg-midnight overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
            alt="Aroma Banquet Hall Wedding Event Setup"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-midnight/80" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 flex flex-col items-center">
          <ScrollReveal direction="up" duration={0.8} className="flex flex-col items-center">
            <span className="text-xs font-sans font-bold tracking-[3px] text-gold uppercase mb-4">MOMENTS OF CELEBRATION</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-ivory mb-6 leading-tight">
              Celebrate Your Biggest Moments <br />
              at Aroma Hall
            </h2>
            <p className="text-sm text-stone-gray leading-relaxed max-w-2xl mb-8">
              From majestic grand weddings and pre-wedding ring ceremonies to critical corporate conferences and academic conventions, our air-conditioned Aroma Hall accommodates 300+ guests with custom catering, audio-visual technology, and luxury hospitality coordination.
            </p>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0px 0px 25px rgba(212,175,55,0.6)" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate('events')}
              className="bg-gold hover:bg-gold-hover text-midnight text-xs font-bold tracking-[2px] uppercase px-8 py-4 flex items-center space-x-3 cursor-pointer"
            >
              <span>REQUEST EVENTS PROPOSAL</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION_09: Testimonials */}
      <section className="bg-[#080B0F] py-20 px-6 lg:px-12 border-b border-gold/15 overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center">
          <ScrollReveal direction="up" duration={0.8}>
            <span className="text-xs font-sans font-bold tracking-[3px] text-gold uppercase mb-4 block">GUEST TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-ivory mb-12">What Our Guests Say</h2>
          </ScrollReveal>

          {/* Carousel Review Card wrapped in ScrollReveal */}
          <ScrollReveal direction="up" delay={0.1} duration={0.8}>
            <div className="relative bg-slate-gray/20 border border-gold/15 p-8 md:p-12 rounded-lg max-w-3xl mx-auto min-h-[220px] flex flex-col justify-center">
              {/* Elegant Quotation Mark */}
              <span className="absolute top-4 left-6 text-6xl font-serif text-gold/10 leading-none select-none">“</span>

              <div className="text-gold flex justify-center mb-4">
                {[...Array(SEEDED_REVIEWS[activeReviewIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-sm md:text-base font-serif italic text-ivory/90 leading-relaxed mb-6">
                "{SEEDED_REVIEWS[activeReviewIndex].comment}"
              </p>

              <div className="flex flex-col items-center">
                <span className="text-xs font-sans font-bold text-gold uppercase tracking-[1px]">
                  {SEEDED_REVIEWS[activeReviewIndex].guestName}
                </span>
                <span className="text-[10px] text-stone-gray mt-0.5">
                  {SEEDED_REVIEWS[activeReviewIndex].source}
                </span>
              </div>

              {/* Navigation buttons inside card boundary */}
              <div className="flex justify-center space-x-4 mt-8 border-t border-gold/10 pt-4">
                <button
                  onClick={prevReview}
                  className="p-1.5 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-midnight transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextReview}
                  className="p-1.5 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-midnight transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION_10: Explore Azamgarh & Attractions */}
      <section className="bg-ivory text-midnight py-20 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Directions & List wrapped in ScrollReveal */}
          <ScrollReveal direction="left" duration={0.8} className="flex flex-col space-y-6">
            <span className="text-xs font-sans font-bold tracking-[2px] text-gold uppercase">EXPLORE LOCAL ATTRACTIONS</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-midnight leading-tight">
              Located Centrally in Rahul Nagar
            </h2>
            <p className="text-sm text-stone-gray leading-relaxed">
              Hotel Grand SR sits ideally in the Teachers Colony, Rahul Nagar area of Azamgarh. Providing direct transit options to the railway station, central bazaars, and prominent academic state campuses.
            </p>

            <div className="border-t border-gold/20 pt-6">
              <h4 className="text-xs font-sans font-bold tracking-[1px] text-gold uppercase mb-3">DISTANCE KEY POINTS</h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="font-semibold text-midnight">Azamgarh Railway Station</span>
                  <span className="text-stone-gray">~4.9 km (12 mins transit)</span>
                </li>
                <li className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="font-semibold text-midnight">Aadya Library & Teachers Colony</span>
                  <span className="text-stone-gray">~1.2 km (3 mins walk)</span>
                </li>
                <li className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="font-semibold text-midnight">Shibli National College</span>
                  <span className="text-stone-gray">~2.5 km (6 mins transit)</span>
                </li>
                <li className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="font-semibold text-midnight">Chando Tal Lake</span>
                  <span className="text-stone-gray">~12.0 km (25 mins transit)</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Map mockup wrapped in ScrollReveal */}
          <ScrollReveal direction="right" duration={0.8} className="h-full">
            <div className="relative h-[450px] rounded-lg overflow-hidden border border-gold/20 shadow-xl bg-white flex flex-col justify-between">
              {/* Static high quality map mockup using image and markers */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                  alt="Azamgarh Map Backdrop"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-40 grayscale"
                />
                {/* Overlay styling for map look */}
                <div className="absolute inset-0 bg-[#E3EBF5]/45" />

                {/* Glowing Landmark Pins */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  {/* Active Hotel Pin */}
                  <span className="absolute -top-12 bg-midnight text-gold text-[9px] font-bold tracking-[1px] px-2.5 py-1.5 rounded border border-gold shadow-lg whitespace-nowrap">
                    HOTEL GRAND SR
                  </span>
                  <span className="w-4 h-4 bg-gold rounded-full border-2 border-white animate-ping" />
                  <span className="w-4 h-4 bg-gold rounded-full border-2 border-white -mt-4 shadow-lg" />
                </div>

                {/* Station Pin */}
                <div className="absolute top-1/3 left-1/4 flex flex-col items-center">
                  <span className="text-[9px] font-bold bg-white text-midnight px-1.5 py-1 border border-stone-gray rounded shadow-sm whitespace-nowrap">
                    Railway Station (4.9km)
                  </span>
                  <span className="w-2.5 h-2.5 bg-stone-gray rounded-full border border-white" />
                </div>

                {/* Shibli College Pin */}
                <div className="absolute bottom-1/4 right-1/3 flex flex-col items-center">
                  <span className="text-[9px] font-bold bg-white text-midnight px-1.5 py-1 border border-stone-gray rounded shadow-sm whitespace-nowrap">
                    Shibli College (2.5km)
                  </span>
                  <span className="w-2.5 h-2.5 bg-stone-gray rounded-full border border-white" />
                </div>
              </div>

              {/* Map footer directions card */}
              <div className="relative z-10 m-4 bg-midnight/95 text-ivory border border-gold/30 p-4 rounded-sm mt-auto max-w-sm shadow-xl">
                <p className="text-[9px] text-gold uppercase tracking-[1.5px] font-bold">ADDRESS INFRASTRUCTURE</p>
                <h4 className="text-xs font-semibold font-serif mt-1">Rahul Nagar, Marhaya, Azamgarh 276001</h4>
                <p className="text-[11px] text-stone-gray leading-relaxed mt-2">
                  Drop pins safely in Rahul Nagar/Civil Lines. Unmarried couples are advised of our house rule validation during booking checks.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
