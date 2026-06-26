import React from 'react';

export default function BookingModal({ isOpen, onClose, selectedRoom }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${selectedRoom?.title || 'Selected Room'}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />

      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-neutral-900 text-white p-5 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-serif">Reserve Accommodation</h3>
            <p className="text-xs text-amber-400 font-medium">{selectedRoom ? selectedRoom.title : "Select Room Package"}</p>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">Check In</label>
              <input required type="date" className="w-full border border-neutral-300 rounded p-2 text-sm focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">Check Out</label>
              <input required type="date" className="w-full border border-neutral-300 rounded p-2 text-sm focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">Adults</label>
              <select className="w-full border border-neutral-300 rounded p-2 text-sm bg-white focus:outline-none focus:border-amber-500">
                <option>1</option><option>2</option><option>3</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">Kids</label>
              <select className="w-full border border-neutral-300 rounded p-2 text-sm bg-white focus:outline-none focus:border-amber-500">
                <option>0</option><option>1</option><option>2</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">Full Name</label>
            <input required type="text" placeholder="John Doe" className="w-full border border-neutral-300 rounded p-2 text-sm focus:outline-none focus:border-amber-500" />
          </div>

          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold py-3 rounded text-sm uppercase tracking-wider transition-colors mt-2">
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
}
