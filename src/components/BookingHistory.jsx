import React from 'react';

const BookingHistory = ({ bookingData, membership }) => {
  // Eligibility logic for perks
  const isEligibleForPickup = ["Gold", "Platinum"].includes(membership);

  return (
    <div className="max-w-md p-6 bg-blue-50/50 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Booking History</h2>
        <span className="text-gray-400">...</span>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500">Booking ID:</p>
        <p className="text-2xl font-bold tracking-tight">{bookingData.bookingId}</p>
        <p className="text-sm text-gray-400">{bookingData.timestamp}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded-lg border">
          <p className="text-xs text-gray-400">Room Type</p>
          <p className="font-semibold">{bookingData.roomType}</p>
        </div>
        <div className="bg-white p-3 rounded-lg border">
          <p className="text-xs text-gray-400">Room Number</p>
          <p className="font-semibold">{bookingData.roomNumber}</p>
        </div>
        <div className="bg-white p-3 rounded-lg border">
          <p className="text-xs text-gray-400">Check In</p>
          <p className="font-semibold">{bookingData.checkIn}</p>
        </div>
        <div className="bg-white p-3 rounded-lg border">
          <p className="text-xs text-gray-400">Check Out</p>
          <p className="font-semibold">{bookingData.checkOut}</p>
        </div>
        <div className="bg-white p-3 rounded-lg border col-span-2">
          <p className="text-xs text-gray-400">Guests</p>
          <p className="font-semibold">{bookingData.guestCount} Guests</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-1">Notes</p>
        <p className="text-sm text-gray-700 bg-white p-3 rounded border">
          {bookingData.notes || "No special requests."}
        </p>
      </div>

      {/* Perk Section */}
      {isEligibleForPickup && (
        <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-lg text-sm flex items-center font-medium">
          <span className="mr-2">✈️</span> Airport Pickup Available
        </div>
      )}
    </div>
  );
};

export default BookingHistory;