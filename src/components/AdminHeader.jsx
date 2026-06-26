
import React from "react";
import {
  Search,
  Mail,
  Bell,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "../assets/auth/AuthContext";

const AdminHeader = () => {
  const { currentUser } = useAuth();

  return (
    <div className="h-full px-8 flex items-center justify-between bg-white">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          placeholder="Search..."
          className="
            pl-10
            pr-4
            py-2
            border
            rounded-lg
          "
        />

      </div>

      <div className="flex items-center gap-5">

        <Mail />

        <Bell />

        <div className="flex items-center gap-2">

          <div>
            <p className="font-semibold">
              {currentUser?.name}
            </p>

            <p className="text-sm text-gray-500">
              {currentUser?.role}
            </p>
          </div>

          <ChevronDown />

        </div>

      </div>

    </div>
  );
};

export default AdminHeader;

