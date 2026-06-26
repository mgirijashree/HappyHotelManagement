import React, { useState } from "react";
import {
  Cloud,
  MapPin,
  Phone,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menus = [
    "HOME",
    "ABOUT",
    "ROOM",
    "RESTAURANT",
    "RESERVATION",
    "PAGE",
    "GALLERY",
    "BLOG",
    "CONTACT",
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-50">

      {/* Top Bar */}

      <div className="bg-black/40 text-white">

        <div className="max-w-7xl mx-auto">

          <div className="flex justify-between items-center px-6 h-12">

            <div className="hidden lg:flex gap-8 text-sm">

              <div className="flex items-center gap-2">
                <Cloud size={16} />
                <span>18 °C</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>225 Beach Street, Goa</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91-9876543210</span>
              </div>

            </div>

            <div className="flex gap-6 text-sm">

              <button>LOGIN</button>

              <button>REGISTER</button>

              <button>USD ▾</button>

              <button>ENG ▾</button>

            </div>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <div className="bg-white">

        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between">

            {/* Logo */}

            <div className="px-10 py-5">

              <h1 className="leading-none">

                <span className="block text-5xl text-[#C9A063]">
                  ❀
                </span>

                <span className="text-[#C9A063] font-serif text-4xl">
                  THE
                </span>

                <span className="block text-[#C9A063] text-5xl font-serif">
                  LOTUS
                </span>

                <span className="text-[#C9A063] text-xs tracking-[6px]">
                  HOTEL
                </span>

              </h1>

            </div>

            {/* Desktop */}

            <nav className="hidden lg:flex">

              {menus.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`
                  px-9
                  h-[94px]
                  flex
                  items-center
                  gap-1
                  text-sm
                  font-semibold
                  transition
                  ${
                    index === 0
                      ? "bg-[#D4B06A] text-white"
                      : "hover:bg-[#D4B06A] hover:text-white"
                  }
                  `}
                >
                  {item}

                  {index < 8 && (
                    <ChevronDown size={14} />
                  )}

                </a>
              ))}

            </nav>

            {/* Mobile */}

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden px-6"
            >
              {open ? (
                <X size={32} />
              ) : (
                <Menu size={32} />
              )}
            </button>

          </div>

        </div>

      </div>

      {/* Mobile Menu */}

      {open && (

        <div className="lg:hidden bg-white">

          {menus.map((item) => (

            <a
              key={item}
              href="#"
              className="
              block
              px-8
              py-4
              border-b
              hover:bg-amber-100
              "
            >
              {item}
            </a>

          ))}

        </div>

      )}

    </header>
  );
}