import React from 'react';

export default function RoomCard({ room, onBookClick }) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md bg-white border border-neutral-100">
      {/* Image Wrap */}
      <div className="overflow-hidden h-72">
        <img 
          src={room.img} 
          alt={room.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-white flex justify-between items-end">
        <div>
          <h3 className="text-lg font-serif tracking-wide font-medium">{room.title}</h3>
          <p className="text-amber-400 font-semibold mt-1">
            {room.price} <span className="text-xs text-neutral-300 font-normal">/ Night</span>
          </p>
        </div>
        <button 
          onClick={() => onBookClick(room)}
          className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold px-4 py-2 rounded text-xs uppercase tracking-wider transition-colors shadow-md"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
