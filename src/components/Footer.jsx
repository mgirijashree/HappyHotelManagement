import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 pt-16 pb-6 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="text-white text-md font-serif tracking-widest uppercase mb-4">THE LOTUS</h3>
          <p className="text-xs leading-relaxed">Your ideal seaside sanctuary offering premier luxury lifestyle accommodations.</p>
        </div>
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Services</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-amber-400 transition-colors">Deluxe Rooms</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Spa & Relaxation</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Fine Dining Restaurant</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Contact Info</h4>
          <p className="text-xs leading-relaxed">123 Ocean Drive, Beachside City</p>
          <p className="text-xs mt-1">reservations@thelotushotel.com</p>
        </div>
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Newsletter</h4>
          <div className="flex mt-2 max-w-xs">
            <input type="email" placeholder="Your Email" className="bg-neutral-900 border border-neutral-800 rounded-l px-3 py-2 text-xs text-white focus:outline-none w-full" />
            <button className="bg-amber-500 text-neutral-950 px-4 rounded-r text-xs font-bold hover:bg-amber-400 transition-colors">GO</button>
          </div>
        </div>
      </div>
      <div className="text-center text-[10px] text-neutral-600 border-t border-neutral-900 pt-6">
        &copy; {new Date().getFullYear()} The Lotus Luxury Hotel. All rights reserved.
      </div>
    </footer>
  );
}
