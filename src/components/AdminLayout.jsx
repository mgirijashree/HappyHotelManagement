import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import BookingModal from './BookingModal'; 

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const navigate = useNavigate();

  // --- Theme Logic ---
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      <div className={`fixed lg:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar 
          onClose={() => setSidebarOpen(false)} 
          onOpenBooking={() => setBookingOpen(true)}
          toggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
      </div>
      
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm transition-colors duration-300">
          <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}