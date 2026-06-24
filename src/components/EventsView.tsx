import React, { useState, useEffect, useRef } from 'react';
import { useBooking } from '../context/BookingContext';
import { Calendar, Users, FileText, CheckCircle2, ShieldCheck, Mail, Phone } from 'lucide-react';
import { Lens } from './Lens';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';
import gsap from 'gsap';

export const EventsView: React.FC = () => {
  const { addEnquiry } = useBooking();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Wedding Celebration');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState(150);
  const [message, setMessage] = useState('');
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
    addEnquiry({
      name,
      email,
      phone,
      eventType,
      eventDate,
      guestCount,
      message
    });
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-midnight min-h-screen pt-28 pb-16 px-6 lg:px-12 font-sans">
      <div className="max-w-[1600px] w-full mx-auto">
        
        {/* Header Title */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3 opacity-0">
          <span className="text-xs font-sans font-bold tracking-[3px] text-gold uppercase">MAGNIFICENT CELEBRATIONS</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-ivory">Aroma Banquet Hall</h1>
          <p className="text-sm text-stone-gray leading-relaxed">
            The largest air-conditioned wedding and corporate event venue in Azamgarh town. From majestic multi-day weddings to strategic boardroom conferences.
          </p>
        </div>

        {/* 50/50 Layout Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 overflow-hidden">
          <ScrollReveal direction="left" duration={0.8} className="space-y-6 text-left">
            <span className="text-xs text-gold uppercase font-bold tracking-[2px]">AROMA HALL SPECIFICATIONS</span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-ivory">Host Your Guests in Style</h2>
            <p className="text-xs text-stone-gray leading-relaxed">
              Equipped with a grand soundstage, high-definition projectors, professional acoustic setups, and customizable layout arrangements. Savor exquisite custom gourmet catering prepared directly by our Aroma Cafe master chefs.
            </p>

            <ul className="space-y-3.5 text-xs text-stone-gray font-sans">
              <li className="flex items-center space-x-3">
                <span className="bg-gold/10 text-gold p-1 rounded-full border border-gold/20">✓</span>
                <span><strong>Massive Capacity:</strong> Fits up to 300+ guests in standard theater arrangements.</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-gold/10 text-gold p-1 rounded-full border border-gold/20">✓</span>
                <span><strong>Custom Gourmet Catering:</strong> Authentic vegetarian and multi-cuisine luxury options.</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-gold/10 text-gold p-1 rounded-full border border-gold/20">✓</span>
                <span><strong>Professional Planners:</strong> On-site design coordinators to organize themes and lights.</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-gold/10 text-gold p-1 rounded-full border border-gold/20">✓</span>
                <span><strong>Continuous Power backup:</strong> Uninterrupted air-conditioned cooling comfort.</span>
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal direction="right" duration={0.8} className="h-full">
            <div className="relative h-[450px] rounded-lg overflow-hidden border border-gold/15 shadow-xl bg-midnight">
              <Lens zoomFactor={1.8} lensSize={150}>
                <img
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury Banquet Seating Arrangement"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </Lens>
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent pointer-events-none z-10" />
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-gold/10 pt-16 overflow-hidden">
          {/* Left Side: Layout templates showcase */}
          <ScrollReveal direction="left" duration={0.8} className="lg:col-span-6 space-y-8 text-left">
            <h3 className="text-xl font-serif font-bold text-gold uppercase tracking-[1px]">Event Configurations</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Imperial Weddings & Receptions', desc: 'Elegant round-table settings, luxury lighting, massive soundstages, and delicious gourmet buffet spreads for 300+ loved ones.' },
                { name: 'Corporate Conventions & Meets', desc: 'Theater style layout configurations, projectors, and catered high-tea breaks for business seminars.' },
                { name: 'Pre-wedding Engagement & Rings', desc: 'Cozy, intimate floral-themed parlor arrangements for close family and friends.' }
              ].map((cfg, i) => (
                <div key={i} className="bg-[#0f141c] border border-gold/5 p-6 rounded-sm">
                  <h4 className="text-sm font-sans font-bold text-ivory uppercase tracking-[0.5px]">{cfg.name}</h4>
                  <p className="text-xs text-stone-gray mt-2 leading-relaxed">{cfg.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Side: Proposal Request Form */}
          <ScrollReveal direction="right" duration={0.8} className="lg:col-span-6 h-fit">
            <div className="bg-slate-gray/20 border border-gold/15 p-8 rounded-md shadow-2xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-gold font-bold tracking-[1.5px] uppercase">EVENT ENQUIRY PORTAL</span>
                    <h3 className="text-lg font-serif font-bold text-ivory mt-0.5">Request Event Proposal</h3>
                    <p className="text-xs text-stone-gray mt-1 leading-relaxed">
                      Submit your details and event preferences below. Our catering coordinators will connect within 12 hours with customized price quotations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Sunil Mishra"
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
                        placeholder="e.g., +91 99111 22233"
                        className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold placeholder-stone-gray/40"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., sunil@mishra.com"
                      className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold placeholder-stone-gray/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Event Type</label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold"
                      >
                        <option value="Wedding Celebration">Wedding Celebration</option>
                        <option value="Ring Ceremony">Ring Ceremony</option>
                        <option value="Corporate Conference">Corporate Conference</option>
                        <option value="Social Gathering">Social Gathering</option>
                      </select>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Target Date</label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Expected Guests</label>
                      <input
                        type="number"
                        required
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Specific Details</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please details your specific banquet queries, such as choice of food catering, stage decoration, AV setups, room packages, etc."
                      className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded h-20 focus:outline-none focus:border-gold"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0px 0px 20px rgba(212,175,55,0.45)" }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-hover text-midnight text-xs font-bold py-3.5 tracking-[1px] uppercase rounded-sm cursor-pointer"
                  >
                    SUBMIT LEAD ENQUIRY
                  </motion.button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4 font-sans">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded flex items-center space-x-2 justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-[0.5px]">Enquiry Lodged!</span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-ivory">Event Enquiry Submitted Successfully</h4>
                  <p className="text-xs text-stone-gray leading-relaxed">
                    Hi <strong className="text-ivory">{name}</strong>, your request for <strong className="text-gold">{eventType}</strong> on <strong className="text-ivory">{eventDate}</strong> has been saved directly to our Banquet Ledger. <br />
                    Our coordinator will reach out at <strong className="text-gold">{phone}</strong> within 12 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-gold underline hover:text-gold-hover cursor-pointer"
                  >
                    Submit Another Enquiry
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
