import React from "react";
import { LayoutDashboard, CalendarDays, History, X, LogOut } from "lucide-react"; // 1. Added LogOut icon
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onClose, onOpenBooking }) => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-full bg-white border-r flex flex-col">
      <div className="p-5 bg-red-600 text-white font-bold flex justify-between items-center">
        <span>The Happy Hotel</span>
        <button className="lg:hidden" onClick={onClose}><X size={20}/></button>
      </div>
      
      <nav className="flex-1 py-4">
        <div 
          onClick={() => { navigate("/admin"); onClose(); }} 
          className="px-5 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
        >
          <LayoutDashboard size={18}/> Dashboard
        </div>
        
        <div 
          onClick={() => { onOpenBooking(); onClose(); }} 
          className="px-5 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
        >
          <CalendarDays size={18}/> Book Room
        </div>

        <div 
          onClick={() => { navigate("/admin/booking-dashboard"); onClose(); }} 
          className="px-5 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
        >
          <History size={18}/> Booking Dashboard
        </div>

        {/* 2. Added Checkout Navigation Item */}
        <div 
          onClick={() => {
            navigate("/admin/checkout"); // Ensure this matches your route path
            onClose();
          }} 
          className="px-5 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-red-600 font-medium"
        >
          <LogOut size={18}/> Checkout
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;