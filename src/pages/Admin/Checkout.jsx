import React, { useState, useMemo } from 'react';
import { bookings } from '../../data/bookings';

const Checkout = () => {
  const [data, setData] = useState(bookings);
  const [damageCost, setDamageCost] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [successModal, setSuccessModal] = useState({ show: false, message: "" });

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCheckIn, setFilterCheckIn] = useState("");
  const [filterCheckOut, setFilterCheckOut] = useState("");
  const [filterRoomType, setFilterRoomType] = useState("");
  const [filterRoomNumber, setFilterRoomNumber] = useState("");

  // Helper for dynamic unique dropdown options
  const getUniqueOptions = (key) => [...new Set(data.map(b => b[key]).filter(Boolean))];

  const handleConfirmCheckout = () => {
    const cost = parseFloat(damageCost) || 0;
    const finalRefund = selectedBooking.amountPaid - cost;
    
    setData(data.map(b => b.id === selectedBooking.id ? { ...b, status: 'Checked Out' } : b));
    setSuccessModal({ show: true, message: `Successfully checked out ${selectedBooking.name}. Refund processed: $${finalRefund}` });
    setSelectedBooking(null);
    setDamageCost(0);
  };

  const filteredData = useMemo(() => {
  return data.filter(b => {
    // 1. Search Term Filter
    const matchesSearch = 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.id.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Date/Room Filters (If filter state is empty, they pass automatically)
    const matchesCheckIn = filterCheckIn === "" || b.checkIn === filterCheckIn;
    const matchesCheckOut = filterCheckOut === "" || b.checkOut === filterCheckOut;
    const matchesRoomType = filterRoomType === "" || b.roomType === filterRoomType;
    const matchesRoomNumber = filterRoomNumber === "" || b.roomNumber === filterRoomNumber;

    return matchesSearch && matchesCheckIn && matchesCheckOut && matchesRoomType && matchesRoomNumber;
  });
}, [data, searchTerm, filterCheckIn, filterCheckOut, filterRoomType, filterRoomNumber]);

  const activeGuests = filteredData.filter(b => b.status === 'Approved');
  const checkedOutGuests = filteredData.filter(b => b.status === 'Checked Out');

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Checkout Management</h1>

      {/* Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8 bg-white p-4 rounded shadow-sm border">
        <input 
            placeholder="Search Name/ID..." 
            className="p-2 border rounded" 
            onChange={(e) => setSearchTerm(e.target.value)} 
        />
        
        {/* Calendar Filter for Check-in */}
        <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1">Check-in Date</label>
            <input 
            type="date" 
            className="p-2 border rounded" 
            onChange={(e) => setFilterCheckIn(e.target.value)} 
            />
        </div>

        {/* Calendar Filter for Check-out */}
        <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1">Check-out Date</label>
            <input 
            type="date" 
            className="p-2 border rounded" 
            onChange={(e) => setFilterCheckOut(e.target.value)} 
            />
        </div>

        <select className="p-2 border rounded mt-auto" onChange={(e) => setFilterRoomType(e.target.value)}>
            <option value="">Room Type</option>
            {getUniqueOptions('roomType').map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select className="p-2 border rounded mt-auto" onChange={(e) => setFilterRoomNumber(e.target.value)}>
            <option value="">Room Number</option>
            {getUniqueOptions('roomNumber').sort().map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        </div>

      {/* Active Guests Table */}
      <h2 className="text-xl font-bold mb-4">Active Guests</h2>
      <table className="w-full bg-white shadow-sm border rounded mb-12">
        <thead className="bg-gray-100">
          <tr>{['ID', 'Name', 'Check-in', 'Room Type', 'Room No', 'Mode', 'Action'].map(h => <th key={h} className="p-3 text-left">{h}</th>)}</tr>
        </thead>
        <tbody>
          {activeGuests.map(b => (
            <tr key={b.id} className="border-t">
              <td className="p-3">{b.id}</td>
              <td className="p-3">{b.name}</td>
              <td className="p-3">{b.checkIn}</td>
              <td className="p-3">{b.roomType}</td>
              <td className="p-3">{b.roomNumber}</td>
              <td className="p-3">{b.bookingMode}</td>
              <td className="p-3"><button onClick={() => setSelectedBooking(b)} className="bg-red-600 text-white px-4 py-1 rounded">Check Out</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Checked Out Guests Table */}
      <h2 className="text-xl font-bold mb-4 text-gray-500">Checked Out Guests</h2>
      <table className="w-full bg-white shadow-sm border rounded">
        <thead className="bg-gray-100 text-gray-500">
          <tr>{['ID', 'Name', 'Check-in', 'Room Type', 'Room No', 'Mode', 'Status'].map(h => <th key={h} className="p-3 text-left">{h}</th>)}</tr>
        </thead>
        <tbody>
          {checkedOutGuests.map(b => (
            <tr key={b.id} className="border-t text-gray-400">
              <td className="p-3">{b.id}</td>
              <td className="p-3">{b.name}</td>
              <td className="p-3">{b.checkIn}</td>
              <td className="p-3">{b.roomType}</td>
              <td className="p-3">{b.roomNumber}</td>
              <td className="p-3">{b.bookingMode}</td>
              <td className="p-3 italic">Checked Out</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Deposit Return Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Deposit Return</h2>
            <div className="space-y-2 text-sm mb-4">
              <p><strong>Name:</strong> {selectedBooking.name}</p>
              <p><strong>Room:</strong> {selectedBooking.roomNumber}</p>
              <p><strong>Membership:</strong> {selectedBooking.membership}</p>
              <p><strong>Payment Mode:</strong> {selectedBooking.paymentAccount}</p>
              <p><strong>Amount Paid:</strong> ${selectedBooking.amountPaid}</p>
              <hr />
              <label className="block font-bold">Ask for Damages ($):</label>
              <input type="number" className="w-full border p-2 rounded" onChange={(e) => setDamageCost(e.target.value)} />
              <p className="font-bold text-lg mt-2 text-red-600">Total Refund: ${selectedBooking.amountPaid - (damageCost || 0)}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSelectedBooking(null)} className="flex-1 p-2 border rounded">Cancel</button>
              <button onClick={handleConfirmCheckout} className="flex-1 p-2 bg-green-600 text-white rounded">Confirm & Checkout</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
                <h3 className="font-bold text-lg text-green-600">Success!</h3>
                <p>{successModal.message}</p>
                <button onClick={() => setSuccessModal({ show: false })} className="mt-4 bg-gray-800 text-white px-6 py-2 rounded">Close</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;