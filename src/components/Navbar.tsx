import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Settings, UserCheck, Calendar } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { currentAdmin, logoutAdmin } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'rooms', label: 'ROOMS' },
    { id: 'amenities', label: 'AMENITIES' },
    { id: 'dining', label: 'DINING' },
    { id: 'events', label: 'EVENTS' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'explore', label: 'EXPLORE' },
    { id: 'contact', label: 'CONTACT' },
    { id: 'my-bookings', label: 'MY STAY' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        id="app-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 h-[90px] flex items-center px-6 lg:px-12 ${
          isScrolled || currentView !== 'home'
            ? 'bg-midnight/90 backdrop-blur-md border-b border-gold/10 shadow-lg shadow-midnight/20'
            : 'bg-gradient-to-b from-midnight/80 to-transparent'
        }`}
      >
        <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between">
          {/* Logo Brand with Crown Crest */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center space-x-3 group text-left cursor-pointer"
          >
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                {/* Visual Golden Crest Crown */}
                <svg
                  className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" fill="currentColor" fillOpacity="0.1" />
                  <path d="M3 20h18" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-serif tracking-[4px] text-gold/80 font-semibold">HOTEL</span>
              </div>
              <span className="text-xl lg:text-2xl font-serif font-bold text-ivory tracking-[1.5px] leading-none">
                GRAND SR
              </span>
              <span className="text-[9px] font-sans text-stone-gray tracking-[3px] uppercase leading-none mt-1">
                Azamgarh, Uttar Pradesh
              </span>
            </div>
          </button>

          {/* Center Navigation Menu (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-xs font-sans font-semibold tracking-[1.5px] transition-all duration-300 relative py-2 cursor-pointer ${
                  currentView === link.id
                    ? 'text-gold font-bold'
                    : 'text-ivory/80 hover:text-gold'
                }`}
              >
                {link.label}
                {currentView === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-gold animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Admin status indicator if logged in */}
            {currentAdmin ? (
              <button
                onClick={() => handleLinkClick('admin')}
                className="flex items-center space-x-2 bg-gold/10 border border-gold/30 px-3 py-1.5 rounded-full text-[11px] text-gold font-sans hover:bg-gold/20 transition-all cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => handleLinkClick('admin')}
                className="text-ivory/40 hover:text-gold transition-colors p-1"
                title="Staff Login"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => handleLinkClick('rooms')}
              className="bg-gold hover:bg-gold-hover text-midnight text-xs font-semibold px-5 py-2.5 rounded-sm tracking-[1px] transition-all duration-300 hover:shadow-[0_0_15px_rgba(200,169,107,0.3)] cursor-pointer"
            >
              BOOK STAY
            </button>

            {/* Premium Call Button */}
            <a
              href="tel:+919990000000"
              className="flex items-center space-x-2 border border-gold/30 hover:border-gold px-4 py-2.5 rounded-sm text-xs font-sans text-gold font-semibold transition-all duration-300 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 animate-pulse" />
              <span>+91 99900 00000</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center space-x-3">
            {currentAdmin && (
              <button
                onClick={() => handleLinkClick('admin')}
                className="p-2 bg-gold/10 text-gold rounded-full border border-gold/20"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-ivory p-2 focus:outline-none cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-midnight bg-opacity-95 backdrop-blur-lg flex flex-col pt-32 px-8 space-y-6 lg:hidden">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-lg font-serif tracking-[2px] text-left py-2 border-b border-ivory/5 cursor-pointer ${
                currentView === link.id ? 'text-gold font-bold' : 'text-ivory/80'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-6 flex flex-col space-y-4">
            <button
              onClick={() => handleLinkClick('rooms')}
              className="w-full bg-gold hover:bg-gold-hover text-midnight text-center py-3 font-semibold tracking-[1.5px] rounded-sm cursor-pointer"
            >
              BOOK YOUR STAY
            </button>
            <a
              href="tel:+919990000000"
              className="w-full border border-gold text-gold text-center py-3 font-semibold tracking-[1px] rounded-sm flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>+91 99900 00000</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
