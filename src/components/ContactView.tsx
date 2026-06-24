import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Room Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-midnight min-h-screen pt-28 pb-16 px-6 lg:px-12 font-sans text-white">
      <div className="max-w-[1600px] w-full mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="text-xs font-sans font-bold tracking-[3px] text-gold uppercase">WE'RE AT YOUR SERVICE</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-ivory">Contact Reservations</h1>
          <p className="text-sm text-stone-gray leading-relaxed">
            Reach out to our reservations office for room bookings, banquet hall packages, catering requests, or directions to the property.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start overflow-hidden">
          {/* Left Column: Direct info cards */}
          <ScrollReveal direction="left" duration={0.8} className="lg:col-span-5 space-y-6 text-left">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-gold uppercase tracking-[1px] mb-6">Contact Directory</h2>

            {/* Address */}
            <div className="bg-[#0f141c] border border-gold/10 p-6 rounded flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-sans font-bold text-ivory uppercase tracking-[0.5px]">Property Address</h4>
                <p className="text-xs text-stone-gray leading-relaxed mt-1.5 font-medium">
                  Hotel Grand SR, Rahul Nagar, Marhaya, Teacher's Colony, Azamgarh, Uttar Pradesh – 276001, India
                </p>
              </div>
            </div>

            {/* Reservations Telephone */}
            <div className="bg-[#0f141c] border border-gold/10 p-6 rounded flex items-start space-x-4">
              <Phone className="w-6 h-6 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-sans font-bold text-ivory uppercase tracking-[0.5px]">Reservation Hotlines</h4>
                <p className="text-xs text-stone-gray leading-relaxed mt-1.5 font-medium">
                  Primary Mobile: <strong className="text-gold">+91 99900 00000</strong> <br />
                  Front Desk Deskphone: <strong>+91 99900 00001</strong>
                </p>
              </div>
            </div>

            {/* Electronic Mail */}
            <div className="bg-[#0f141c] border border-gold/10 p-6 rounded flex items-start space-x-4">
              <Mail className="w-6 h-6 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-sans font-bold text-ivory uppercase tracking-[0.5px]">Electronic Mail Address</h4>
                <p className="text-xs text-stone-gray leading-relaxed mt-1.5 font-medium">
                  Reservations Inbox: <a href="mailto:reservations@hotelgrandsr.com" className="text-gold hover:underline">reservations@hotelgrandsr.com</a> <br />
                  Support Desk: <a href="mailto:info@hotelgrandsr.com" className="text-stone-gray hover:underline">info@hotelgrandsr.com</a>
                </p>
              </div>
            </div>

            {/* Operational timings */}
            <div className="bg-slate-gray/10 p-5 rounded border border-gold/5 text-xs text-stone-gray flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gold shrink-0" />
              <span>Reception desk is staffed 24 hours a day, 365 days a year for seamless check-ins.</span>
            </div>
          </ScrollReveal>

          {/* Right Column: Enquiry feedback form */}
          <ScrollReveal direction="right" duration={0.8} className="lg:col-span-7 h-full">
            <div className="bg-slate-gray/20 border border-gold/15 p-8 rounded-md shadow-2xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div className="flex flex-col text-left mb-2">
                    <span className="text-[9px] text-gold font-bold tracking-[1.5px] uppercase">ONLINE CORRESPONDENCE</span>
                    <h3 className="text-lg font-serif font-bold text-ivory mt-0.5">Direct Message Form</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Savita Sharma"
                        className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold placeholder-stone-gray/40"
                      />
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., savita@sharma.com"
                        className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold placeholder-stone-gray/40"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Subject Matter</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded focus:outline-none focus:border-gold"
                    >
                      <option value="Room Inquiry">Room Reservations & Group bookings</option>
                      <option value="Banquet Pricing">Banquet Hall Events & Catering</option>
                      <option value="Feedback / Review">Guest Feedback & Complaints</option>
                      <option value="Other">Other Business Matters</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-stone-gray uppercase tracking-[0.5px]">Inquiry Details</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your requirements in detail..."
                      className="bg-midnight border border-gold/15 text-ivory text-xs p-3 rounded h-32 focus:outline-none focus:border-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-hover text-midnight text-xs font-bold py-3.5 tracking-[1px] uppercase rounded-sm cursor-pointer shadow-md shadow-gold/25"
                  >
                    DISPATCH CORRESPONDENCE
                  </button>
                </form>
            ) : (
              <div className="text-center py-10 space-y-4 font-sans">
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded flex items-center space-x-2 justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-[0.5px]">Correspondence Dispatched!</span>
                </div>
                <h4 className="text-lg font-serif font-bold text-ivory">Message Sent Safely</h4>
                <p className="text-xs text-stone-gray leading-relaxed">
                  Hi <strong className="text-ivory">{name}</strong>, thank you for writing regarding <strong className="text-gold">{subject}</strong>. <br />
                  A hospitality copy has been dispatched to reservations@hotelgrandsr.com. Our front office manager will reach out to you directly within 6-8 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-gold underline hover:text-gold-hover cursor-pointer"
                >
                  Submit Another Message
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
