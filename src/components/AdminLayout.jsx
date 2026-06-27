
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import BookingModal from './BookingModal'; // Import the modal

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false); // State for the modal

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar: Pass the trigger function */}
      <div className={`fixed lg:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar 
          onClose={() => setSidebarOpen(false)} 
          onOpenBooking={() => setBookingOpen(true)} // Prop to open modal
        />
      </div>
      
      {/* Global Modal - Mounted here so it overlays everything */}
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-16 bg-white border-b shadow-sm">
          <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}