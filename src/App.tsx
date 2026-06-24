import React, { useState } from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { RoomsView } from './components/RoomsView';
import { RoomDetailModal } from './components/RoomDetailModal';
import { BookingFlow } from './components/BookingFlow';
import { AmenitiesView } from './components/AmenitiesView';
import { DiningView } from './components/DiningView';
import { EventsView } from './components/EventsView';
import { GalleryView } from './components/GalleryView';
import { ExploreView } from './components/ExploreView';
import { ContactView } from './components/ContactView';
import { PoliciesView } from './components/PoliciesView';
import { MyBookingsView } from './components/MyBookingsView';
import { AdminDashboard } from './components/AdminDashboard';

function AppContent() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const { setActiveBooking } = useBooking();

  // Navigation controller
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Triggers booking flow for room with chosen rate plan
  const handleStartBooking = (roomId: string, ratePlanId: string) => {
    setActiveBooking({
      roomTypeId: roomId,
      ratePlanId: ratePlanId,
      numRooms: 1
    });
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open room detail modal
  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const handleBookingSuccess = (bookingRef: string) => {
    console.log(`Booking confirmed under: ${bookingRef}`);
  };

  return (
    <div className="min-h-screen bg-[#080B0F] text-ivory flex flex-col justify-between selection:bg-gold/30 selection:text-white">
      {/* Central Header Navbar */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main View Router render block */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <HomeView onNavigate={handleNavigate} onSelectRoom={handleSelectRoom} />
        )}
        {currentView === 'rooms' && (
          <RoomsView onSelectRoom={handleSelectRoom} onStartBooking={handleStartBooking} />
        )}
        {currentView === 'amenities' && <AmenitiesView />}
        {currentView === 'dining' && <DiningView />}
        {currentView === 'events' && <EventsView />}
        {currentView === 'gallery' && <GalleryView />}
        {currentView === 'explore' && <ExploreView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'policies' && <PoliciesView />}
        {currentView === 'my-bookings' && <MyBookingsView />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'checkout' && (
          <BookingFlow onSuccess={handleBookingSuccess} onNavigate={handleNavigate} />
        )}
      </main>

      {/* Persistent global footer with notice warnings */}
      <Footer onNavigate={handleNavigate} />

      {/* Shared Room Detail Dialog Lightbox */}
      {selectedRoomId && (
        <RoomDetailModal
          roomId={selectedRoomId}
          onClose={() => setSelectedRoomId(null)}
          onStartBooking={handleStartBooking}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
