import React, { useState, useEffect, useRef } from 'react';
import { Utensils, Clock, CheckCircle2, AlertTriangle, Coffee, Sparkles } from 'lucide-react';
import { Lens } from './Lens';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';
import gsap from 'gsap';

export const DiningView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const menuSections = [
    {
      title: 'North Indian Specialties',
      items: [
        { name: 'Shahi Paneer', price: 280, desc: 'Soft cottage cheese cubes cooked in a rich, sweet, and creamy tomato cashew gravy.' },
        { name: 'Kadhai Paneer', price: 290, desc: 'Fresh cottage cheese stir-fried with bell peppers, onions, and coarse hand-ground spices.' },
        { name: 'Dal Makhani', price: 220, desc: 'Whole black lentils slow-cooked overnight with cream, butter, and mild Indian spices.' },
        { name: 'Butter Chicken Masala', price: 380, desc: 'Tandoori grilled chicken shreds simmered in our signature velvet butter tomato paste.' }
      ]
    },
    {
      title: 'Mughlai & Clay Oven Tandoor',
      items: [
        { name: 'Hotel Grand SR Special Chicken Biryani', price: 350, desc: 'Fragrant premium Basmati rice layered with juicy spiced chicken, saffron, and fresh mint leaves.' },
        { name: 'Paneer Tikka Angara', price: 260, desc: 'Cottage cheese chunks marinated in smoky tandoori red masala, skewered with onions and roasted.' },
        { name: 'Butter Naan / Garlic Naan', price: 60, desc: 'Soft leavened clay-oven baked flatbread topped with rich butter or hand-minced garlic.' }
      ]
    },
    {
      title: 'Continental & Shakes',
      items: [
        { name: 'Penne Arrabiata Pasta', price: 240, desc: 'Penne tossed in spicy Italian pomodoro sauce, black olives, and fresh basil leaves.' },
        { name: 'Aroma Signature Cold Coffee', price: 120, desc: 'Blended espresso shots with vanilla bean ice cream and premium cocoa drizzle.' },
        { name: 'Oreo Fudge Brownie Shake', price: 145, desc: 'Creamy heavy-milk shake with blended brownie crumble and whipped cream toppers.' }
      ]
    }
  ];

  return (
    <div className="w-full bg-midnight min-h-screen pt-28 pb-16 px-6 lg:px-12 font-sans">
      <div className="max-w-[1600px] w-full mx-auto">
        
        {/* Header Section */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3 opacity-0">
          <span className="text-xs font-sans font-bold tracking-[3px] text-gold uppercase">THE CULINARY RETREAT</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-ivory">Aroma Cafe Dining</h1>
          <p className="text-sm text-stone-gray leading-relaxed">
            Azamgarh's signature destination for fine multi-cuisine dining. Savor gourmet North Indian heritage dishes, Mughlai tandoor clay masterpieces, and refreshing continental mocktails.
          </p>
        </div>

        {/* 50/50 banner details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 overflow-hidden">
          <ScrollReveal direction="left" duration={0.8} className="h-full">
            <div className="relative h-[400px] rounded-lg overflow-hidden border border-gold/15 shadow-xl bg-midnight">
              <Lens zoomFactor={2.0} lensSize={160}>
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                  alt="Gourmet Dining Platter"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </Lens>
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent pointer-events-none z-10" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" duration={0.8} className="space-y-6 text-left">
            <span className="text-xs text-gold uppercase font-bold tracking-[2px]">ELEGANT DINING INFRASTRUCTURE</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-ivory">A Sanctuary for Food Enthusiasts</h2>
            <p className="text-xs text-stone-gray leading-relaxed">
              Our executive culinary team strictly enforces absolute clinical hygiene standards (FSSAI registered). Every dish is crafted using hand-selected fresh ingredients and premium spices. Unwind in our air-conditioned dining lounge with friends, family, or business associates.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-gray/10 rounded border border-gold/10">
                <h4 className="font-bold text-gold uppercase">Breakfast Buffet</h4>
                <p className="text-[11px] text-stone-gray mt-1">07:30 AM – 10:30 AM</p>
              </div>
              <div className="p-4 bg-slate-gray/10 rounded border border-gold/10">
                <h4 className="font-bold text-gold uppercase">Lunch & Dinner</h4>
                <p className="text-[11px] text-stone-gray mt-1">12:30 PM – 10:30 PM</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-gold/10 pt-16 overflow-hidden">
          {/* Left Column: Menu Viewer */}
          <ScrollReveal direction="left" duration={0.8} className="lg:col-span-8 space-y-10">
            <div className="flex items-center space-x-2">
              <Utensils className="w-5 h-5 text-gold" />
              <h2 className="text-xl md:text-2xl font-serif font-bold text-ivory">Aroma Cafe Menu Highlights</h2>
            </div>

            {menuSections.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="text-xs font-sans font-bold tracking-[1.5px] text-gold uppercase border-b border-gold/10 pb-2">
                  {section.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#0f141c] border border-gold/5 p-5 rounded-sm hover:border-gold/15 transition-all"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-sans font-bold text-ivory">{item.name}</h4>
                        <span className="text-xs font-serif font-bold text-gold">₹{item.price}</span>
                      </div>
                      <p className="text-[11px] text-stone-gray leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ScrollReveal>

          {/* Right Column: Table Reservation Form */}
          <ScrollReveal direction="right" duration={0.8} className="lg:col-span-4 h-fit">
            <div className="bg-slate-gray/20 border border-gold/15 p-8 rounded-md shadow-2xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-gold font-bold tracking-[1.5px] uppercase">TABLE RESERVATIONS</span>
                    <h3 className="text-lg font-serif font-bold text-ivory mt-0.5">Secure Your Table</h3>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Rajesh Kumar"
                      className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold placeholder-stone-gray/40"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., +91 99000 00000"
                      className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold placeholder-stone-gray/40"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Date</label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Time</label>
                      <input
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Total Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n}>{n} Guests</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Special Notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g., Anniversary setting, high chair for baby, quiet table preference..."
                      className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded h-16 focus:outline-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0px 0px 20px rgba(212,175,55,0.45)" }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-hover text-midnight text-xs font-bold py-3.5 tracking-[1px] uppercase rounded-sm cursor-pointer"
                  >
                    RESERVE TABLE NOW
                  </motion.button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded flex items-center space-x-2 justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-[0.5px]">Table Reserved!</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-ivory">We Look Forward to Welcoming You</h4>
                  <p className="text-xs text-stone-gray leading-relaxed">
                    Hi <strong className="text-ivory">{name}</strong>, your table for <strong className="text-gold">{guests} guests</strong> on <strong className="text-ivory">{date} at {time}</strong> is secured at Aroma Cafe. <br />
                    A confirmation SMS has been dispatched.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-gold underline hover:text-gold-hover cursor-pointer"
                  >
                    Book Another Table
                  </button>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
};
