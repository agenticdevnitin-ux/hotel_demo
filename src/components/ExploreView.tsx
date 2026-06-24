import React from 'react';
import { NEARBY_ATTRACTIONS } from '../data';
import { MapPin, Navigation, Map } from 'lucide-react';
import { Lens } from './Lens';
import { ScrollReveal } from './ScrollReveal';

export const ExploreView: React.FC = () => {
  return (
    <div className="w-full bg-midnight min-h-screen pt-28 pb-16 px-6 lg:px-12 font-sans text-white">
      <div className="max-w-[1600px] w-full mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="text-xs font-sans font-bold tracking-[3px] text-gold uppercase">CURATED REGIONAL TRAVELS</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-ivory">Explore Azamgarh</h1>
          <p className="text-sm text-stone-gray leading-relaxed">
            Ideally situated inside Teachers Colony, Rahul Nagar, Hotel Grand SR serves as your gateway to the historical structures, colleges, and scenic wetlands of Azamgarh.
          </p>
        </div>

        {/* Tourist Grid Map attractions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 overflow-hidden">
          <ScrollReveal direction="left" duration={0.8} className="relative h-[450px] rounded-lg overflow-hidden border border-gold/15 shadow-xl bg-midnight">
            {/* Curated tourist landmark image wrapped with Lens */}
            <Lens zoomFactor={2.0} lensSize={160}>
              <img
                src="https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=1200&q=80"
                alt="Regional Indian Wetlands Landscape"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </Lens>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f14]/90 via-transparent to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-6 left-6 max-w-md bg-midnight/95 border border-gold/20 p-4 rounded-sm pointer-events-none z-20">
              <span className="text-gold text-[10px] uppercase font-bold tracking-[1.5px]">CHANDO TAL REGIONAL WETLAND</span>
              <p className="text-xs text-stone-gray leading-relaxed mt-1">
                A serene natural lake located 12 kilometers from the hotel. Hosts rich migrations of exotic Siberian bird species during the cooler seasons.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" duration={0.8} className="space-y-6 text-left">
            <span className="text-xs text-gold uppercase font-bold tracking-[2px]">TRANSIT GUIDELINES & CONNECTIVITY</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-ivory">Seamless Regional Transit</h2>
            <p className="text-xs text-stone-gray leading-relaxed">
              Azamgarh is linked smoothly via highways and railways to prominent junctions like Varanasi, Gorakhpur, and Lucknow. Our 24-hour reception desk coordinates taxi bookings, pick-and-drop shuttles, and tour guides.
            </p>

            <div className="space-y-4 pt-4 border-t border-gold/10">
              <div className="flex items-start space-x-3 text-xs">
                <Navigation className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-ivory">Azamgarh Railway Station (4.9 km)</h4>
                  <p className="text-[11px] text-stone-gray mt-0.5">Frequent trains to major hubs. Average taxi transit is around 12 minutes.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <Navigation className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-ivory">Varanasi Lal Bahadur Shastri Airport (95 km)</h4>
                  <p className="text-[11px] text-stone-gray mt-0.5">The closest active domestic/international flight connection. Taxi transit takes around 2 hours.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Tourist Attractions Dossier List from data.ts */}
        <div className="border-t border-gold/10 pt-16">
          <div className="flex items-center space-x-2 mb-10">
            <Map className="w-5 h-5 text-gold" />
            <h2 className="text-xl md:text-2xl font-serif font-bold text-gold uppercase tracking-[1px]">Prominent Landmarks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
            {NEARBY_ATTRACTIONS.map((attr, i) => (
              <ScrollReveal
                direction="up"
                delay={i * 0.1}
                key={i}
                className="bg-[#0f141c] border border-gold/5 p-6 rounded hover:border-gold/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="text-base font-serif font-bold text-ivory">{attr.name}</h3>
                    <span className="bg-gold/10 border border-gold/30 text-gold text-[10px] font-sans font-bold uppercase tracking-[1px] px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                      {attr.distance} Away
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-gray uppercase font-bold tracking-[1px] block mb-3 font-sans">
                    {attr.type}
                  </span>
                  <p className="text-xs text-stone-gray leading-relaxed font-sans">{attr.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-gold/10 flex items-center space-x-1.5 text-[11px] text-gold font-bold uppercase tracking-[0.5px]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Rahul Nagar Transit Accessible</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
