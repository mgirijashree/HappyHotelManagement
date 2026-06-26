import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import RoomCard from '../components/RoomCard';
import BookingModal from '../components/BookingModal';
import Footer from '../components/Footer';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);

  // Mock array data mirroring image structure
  const roomData = [
    { id: 1, title: 'Luxury Room', price: '$520', img: 'https://unsplash.com' },
    { id: 2, title: 'Family Room', price: '$420', img: 'https://unsplash.com' },
    { id: 3, title: 'Couple Room', price: '$320', img: 'https://unsplash.com' },
    { id: 4, title: 'Standard Room', price: '$220', img: 'https://unsplash.com' },
    { id: 5, title: 'Premium Suite', price: '$620', img: 'https://unsplash.com' },
    { id: 6, title: 'Executive Room', price: '$720', img: 'https://unsplash.com' },
  ];

  // Callback function open logic
  const handleOpenBooking = (room) => {
    setActiveRoom(room);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between selection:bg-amber-400 selection:text-neutral-900">
      <div>
        <Navbar />

        {/* Hero Section Banner */}
        <header className="relative h-[65vh] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url('https://unsplash.com')` }}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative text-center px-4 max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-serif tracking-widest uppercase mb-4">Relaxation Awaits</h1>
            <p className="text-sm tracking-wide text-neutral-200 font-light max-w-md mx-auto">Discover unprecedented premium seaside tranquility combined with pristine resort hospitality.</p>
          </div>
        </header>

        {/* Main Grid View Container */}
        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif tracking-wide uppercase text-neutral-900">Rooms & Rates</h2>
            <div className="w-12 h-[3px] bg-amber-500 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Injecting data into individual card variants */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roomData.map((room) => (
              <RoomCard 
                key={room.id} 
                room={room} 
                onBookClick={handleOpenBooking} 
              />
            ))}
          </div>
        </main>
      </div>

      <Footer />

      {/* Booking State Modal overlay Injection portal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedRoom={activeRoom} 
      />
    </div>
  );
}
