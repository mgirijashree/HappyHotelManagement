import React from "react";
import {
  Search,
  Mail,
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";
import { useAuth } from "../assets/auth/AuthContext";

// Added toggleSidebar prop
const AdminHeader = ({ toggleSidebar }) => {
  const { currentUser } = useAuth();

  return (
    <div className="h-full px-4 lg:px-8 flex items-center justify-between bg-white">
      {/* Container for Hamburger and Search to keep them aligned */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Trigger */}
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={20} className="text-gray-600" />
        </button>

        <div className="relative hidden md:block">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Mail className="hidden sm:block cursor-pointer text-gray-600" />
        <Bell className="hidden sm:block cursor-pointer text-gray-600" />

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="text-right">
            <p className="font-semibold text-sm lg:text-base">
              {currentUser?.name}
            </p>
            <p className="text-xs text-gray-500">
              {currentUser?.role}
            </p>
          </div>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;