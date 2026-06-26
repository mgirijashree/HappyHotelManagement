
import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  MessageSquare,
  UserCircle,
  Settings,
  Key,
  Lock,
  Power,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const nav = useNavigate();

  const [open, setOpen] = useState({
    users: false,
    booking: false,
    profile: false,
  });

  const toggle = (key) => {
    setOpen({
      ...open,
      [key]: !open[key],
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    nav("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-white border-r flex flex-col">

      {/* HEADER */}

      <div className="p-5 bg-red-600 text-white flex items-center gap-3">
        <LayoutDashboard />
        <span className="font-bold">
          Dashboard
        </span>
      </div>

      {/* MENU */}

      <nav className="flex-1 py-3">

        {/* USERS */}

        <DropdownItem
          icon={<Users size={18} />}
          title="Users"
          open={open.users}
          onClick={() => toggle("users")}
        />

        {open.users && (
          <SubMenu>

            <SubItem
              text="Create User"
              onClick={() =>
                nav("/admin/users/create")
              }
            />

            <SubItem
              text="User List"
              onClick={() =>
                nav("/admin/users")
              }
            />

          </SubMenu>
        )}

        {/* BOOKINGS */}

        <DropdownItem
          icon={<CalendarDays size={18} />}
          title="Booking"
          open={open.booking}
          onClick={() =>
            toggle("booking")
          }
        />

        {open.booking && (
          <SubMenu>

            <SubItem
              text="All"
              onClick={() =>
                nav("/booking/all")
              }
            />

            <SubItem
              text="Pending"
              onClick={() =>
                nav("/booking/pending")
              }
            />

            <SubItem
              text="Approved"
              onClick={() =>
                nav("/booking/approved")
              }
            />

            <SubItem
              text="Cancelled"
              onClick={() =>
                nav("/booking/cancelled")
              }
            />

          </SubMenu>
        )}

        {/* REVIEWS */}

        <Item
          icon={<MessageSquare />}
          label="Reviews"
        />

        <Item
          icon={<MessageSquare />}
          label="Bookmarks"
        />

        <Item
          icon={<MessageSquare />}
          label="Messages"
        />

        {/* PROFILE */}

        <DropdownItem
          icon={<UserCircle />}
          title="Profile"
          open={open.profile}
          onClick={() =>
            toggle("profile")
          }
        />

        {open.profile && (
          <SubMenu>

            <SubItem
              text="View Profile"
              onClick={() =>
                nav("/profile")
              }
            />

            <SubItem
              text="Edit Profile"
              onClick={() =>
                nav("/profile/edit")
              }
            />

            <SubItem
              text="Change Password"
              onClick={() =>
                nav("/profile/password")
              }
            />

          </SubMenu>
        )}

      </nav>

      {/* FOOTER */}

      <div className="border-t p-4 flex justify-between">

        <Settings />

        <Key />

        <Lock />

        <Power
          className="cursor-pointer text-red-500"
          onClick={logout}
        />

      </div>

    </div>
  );
};

/* COMPONENTS */

const Item = ({
  icon,
  label,
}) => (
  <div className="px-5 py-3 flex gap-3 hover:bg-gray-100 cursor-pointer">
    {icon}
    {label}
  </div>
);

const DropdownItem = ({
  icon,
  title,
  open,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="
      px-5
      py-3
      flex
      justify-between
      cursor-pointer
      hover:bg-gray-100
    "
  >
    <div className="flex gap-3">
      {icon}
      {title}
    </div>

    {open ? (
      <ChevronDown size={16} />
    ) : (
      <ChevronRight size={16} />
    )}
  </div>
);

const SubMenu = ({
  children,
}) => (
  <div className="pl-14">
    {children}
  </div>
);

const SubItem = ({
  text,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="
      py-2
      text-sm
      cursor-pointer
      hover:text-red-600
    "
  >
    {text}
  </div>
);

export default Sidebar;

