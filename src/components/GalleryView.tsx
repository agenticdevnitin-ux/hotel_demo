import React, { useState, useEffect, useRef } from 'react';
import { Lens } from './Lens';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';
import gsap from 'gsap';

export const GalleryView: React.FC = () => {
  const [filter, setFilter] = useState('all');

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

  const galleryItems = [
    {
      id: 1,
      category: 'rooms',
      title: 'Deluxe Room Sanctum',
      img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      category: 'rooms',
      title: 'Suite Private Living Parlor',
      img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      category: 'dining',
      title: 'Aroma Cafe Seating Cozy Corner',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      category: 'dining',
      title: 'Chef Specialty Mughlai Platter',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      category: 'banquet',
      title: 'Aroma Banquet Hall Stage Lights',
      img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      category: 'banquet',
      title: 'Grand Hotel Reception Lobby Glow',
      img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);

  return (
    <div className="w-full bg-midnight min-h-screen pt-28 pb-16 px-6 lg:px-12 font-sans text-white">
      <div className="max-w-[1600px] w-full mx-auto">
        
        {/* Header Title */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3 opacity-0">
          <span className="text-xs font-sans font-bold tracking-[3px] text-gold uppercase">CINEMATIC RETREATS</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-ivory">Hotel Gallery</h1>
          <p className="text-sm text-stone-gray leading-relaxed">
            Take a visual tour through our premium guestrooms, multi-cuisine spaces at Aroma Cafe, and elegant decorations inside Aroma Banquet Hall.
          </p>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'all', label: 'ALL VISUALS' },
            { id: 'rooms', label: 'ROOMS & SUITES' },
            { id: 'dining', label: 'AROMA CAFE DINING' },
            { id: 'banquet', label: 'BANQUETS & LOBBY' }
          ].map((tab) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`text-xs font-sans font-bold tracking-[1.5px] uppercase px-5 py-2.5 rounded border transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-gold border-gold text-midnight shadow-md shadow-gold/25'
                  : 'bg-slate-gray/10 border-gold/15 text-ivory hover:border-gold'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden">
          {filteredItems.map((item, index) => (
            <ScrollReveal
              direction="up"
              delay={index * 0.08}
              key={item.id}
              className="bg-[#0f141c] border border-gold/5 hover:border-gold/20 rounded overflow-hidden group shadow-xl transition-all duration-350 hover:-translate-y-1"
            >
              <div className="h-64 overflow-hidden relative bg-midnight">
                <Lens zoomFactor={2.0} lensSize={150}>
                  <img
                    src={item.img}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </Lens>
                <div className="absolute inset-0 bg-midnight/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                  <span className="border border-white/40 px-4 py-2 text-white font-sans font-semibold tracking-[1px] text-xs uppercase bg-midnight/80">
                    HOVER TO ZOOM
                  </span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between border-t border-gold/10">
                <span className="text-xs font-serif font-bold text-ivory">{item.title}</span>
                <span className="text-[10px] text-gold uppercase tracking-[1px] font-bold font-sans">
                  {item.category}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
};
