import React, { useState } from "react";
import { LayoutDashboard, CalendarDays, History, LogOut, User, BedDouble, Settings } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onClose, onOpenBooking, toggleTheme, onLogout }) => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative w-64 h-full bg-white border-r flex flex-col dark:bg-gray-900 dark:border-gray-800 transition-colors duration-300">
      <div className="p-5 bg-red-600 text-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><User size={20} /></div>
        <div><p className="font-bold">Admin Name</p><p className="text-xs opacity-80">Hotel Manager</p></div>
      </div>
      
      <nav className="flex-1 py-4 dark:text-gray-300">
        {[
          { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
          { label: "Book Room", action: onOpenBooking, icon: CalendarDays },
          { label: "Booking Dashboard", path: "/admin/booking-dashboard", icon: History },
          { label: "Rooms", path: "/admin/rooms", icon: BedDouble },
          { label: "Checkout Guests", path: "/admin/checkout", icon: LogOut },
        ].map((item, i) => (
          <div key={i} onClick={() => { item.path ? navigate(item.path) : item.action(); onClose(); }} className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-2">
            <item.icon size={18}/> {item.label}
          </div>
        ))}
      </nav>

      <div className="border-t py-4 dark:border-gray-800">
        <div onClick={() => setShowSettings(!showSettings)} className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Settings size={18}/> Settings
        </div>

        {showSettings && (
          <div className="absolute bottom-20 left-2 right-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border dark:border-gray-700 z-50">
            <h3 className="font-bold mb-3 text-sm dark:text-white">Theme Settings</h3>
            <button onClick={toggleTheme} className="w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-sm dark:text-white transition-colors">
              Toggle Light/Dark Mode
            </button>
            <button onClick={() => setShowSettings(false)} className="w-full mt-2 text-red-500 text-xs font-semibold">Close</button>
          </div>
        )}

        <div onClick={onLogout} className="px-5 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer flex items-center gap-2 text-red-600">
          <LogOut size={18}/> Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;