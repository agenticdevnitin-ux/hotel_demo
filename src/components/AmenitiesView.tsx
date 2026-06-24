import React from 'react';
import { CATEGORIZED_AMENITIES } from '../data';
import { ShieldCheck, Wifi, Award, Building, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const AmenitiesView: React.FC = () => {
  return (
    <div className="w-full bg-midnight min-h-screen pt-28 pb-16 px-6 lg:px-12 font-sans">
      <div className="max-w-[1600px] w-full mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="text-xs font-sans font-bold tracking-[3px] text-gold uppercase">UNCOMPROMISING LUXURY</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-ivory">Amenities & Comforts</h1>
          <p className="text-sm text-stone-gray leading-relaxed">
            From clinical eco-housekeeping practices to property-wide high-speed booster Wi-Fi networks, we offer an array of services crafted to exceed international hospitality standards.
          </p>
        </div>

        {/* Feature Grid Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 overflow-hidden">
          <ScrollReveal direction="up" delay={0.1} className="bg-slate-gray/10 border border-gold/15 p-8 rounded-md text-left flex flex-col space-y-4">
            <div className="bg-gold/10 text-gold border border-gold/20 p-3 rounded-md w-fit">
              <Wifi className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-ivory">Enterprise High-Speed Wi-Fi</h3>
            <p className="text-xs text-stone-gray leading-relaxed">
              Equipped with multiple redundant fiber backbones and boosters property-wide. Stream business presentations or buffer high-definition webinars from any corner of the hotel.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} className="bg-slate-gray/10 border border-gold/15 p-8 rounded-md text-left flex flex-col space-y-4">
            <div className="bg-gold/10 text-gold border border-gold/20 p-3 rounded-md w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-ivory">24-Hour Clinical Protection</h3>
            <p className="text-xs text-stone-gray leading-relaxed">
              Safe lodging protocols. Clean linens sterilized daily at our off-site modern laundry unit. Rooms are vacuumed and purified with non-toxic sanitizing sprays pre-arrival.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3} className="bg-slate-gray/10 border border-gold/15 p-8 rounded-md text-left flex flex-col space-y-4">
            <div className="bg-gold/10 text-gold border border-gold/20 p-3 rounded-md w-fit">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-ivory">Uninterrupted Power Backup</h3>
            <p className="text-xs text-stone-gray leading-relaxed">
              Fitted with soundproof high-capacity backup generators. Enjoy continuous central air conditioning, elevator operations, and electrical sockets during municipal power cuts.
            </p>
          </ScrollReveal>
        </div>

        {/* Categorized list from data.ts */}
        <div className="space-y-16 overflow-hidden">
          {CATEGORIZED_AMENITIES.map((cat, idx) => (
            <ScrollReveal direction="up" key={idx} className="border-t border-gold/10 pt-10">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-gold uppercase tracking-[1px] mb-8">
                {cat.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item, i) => (
                  <ScrollReveal
                    direction="up"
                    delay={i * 0.05}
                    key={i}
                    className="bg-[#0f141c] border border-gold/5 hover:border-gold/20 p-6 rounded-sm transition-all duration-300"
                  >
                    <h3 className="text-sm font-sans font-bold text-ivory uppercase tracking-[0.5px]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-gray mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
};
