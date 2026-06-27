import React, { useState, useMemo } from "react";
import { bookings as initialBookings } from "../../data/bookings";
import EditBookingModal from "../../components/EditBookingModal";
import PaymentModal from "../../components/PaymentModal";

export default function BookingDashboard() {
  const [data, setData] = useState(initialBookings);
  const [editingBooking, setEditingBooking] = useState(null);
  const [paymentBooking, setPaymentBooking] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [refundChecked, setRefundChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [payment, setPayment] = useState("All");
  const [membership, setMembership] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Sorting Handler
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  // Cancellation Handler
  const handleConfirmCancellation = () => {
    setData(prev => prev.map(b => b.id === cancelTarget.id ? { 
        ...b, 
        status: "Cancelled", 
        payment: cancelTarget.payment === "Paid" ? (refundChecked ? "Refunded" : "Paid") : "Unpaid" 
    } : b));
    setCancelTarget(null);
    setRefundChecked(false);
  };

  const filtered = useMemo(() => {
    return data.filter(b => 
      (b.name.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase())) &&
      (status === "All" || b.status === status) &&
      (payment === "All" || b.payment === payment) &&
      (membership === "All" || b.membership === membership)
    );
  }, [data, search, status, payment, membership]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filtered];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filtered, sortConfig]);

  const SortableHeader = ({ label, sortKey }) => (
    <th className="p-4 cursor-pointer hover:bg-blue-300 transition-colors" onClick={() => handleSort(sortKey)}>
      <div className="flex items-center justify-between gap-1">
        {label} <span className="text-[10px] opacity-70">↑↓</span>
      </div>
    </th>
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Booking Dashboard</h1>
      
      {/* Filter UI */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-3 mb-6">
        <input placeholder="Search" className="border rounded p-2 flex-1" onChange={(e) => setSearch(e.target.value)} />
        <select onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded"><option>All</option><option>Pending</option><option>Approved</option><option>Cancelled</option></select>
        <select onChange={(e) => setPayment(e.target.value)} className="border p-2 rounded"><option>All</option><option>Paid</option><option>Unpaid</option></select>
        <select onChange={(e) => setMembership(e.target.value)} className="border p-2 rounded"><option>All</option><option>Standard</option><option>Silver</option><option>Gold</option><option>Platinum</option></select>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-200 text-left">
              <SortableHeader label="Guest" sortKey="name" />
              <SortableHeader label="Booking ID" sortKey="id" />
              <SortableHeader label="Room" sortKey="roomNumber" />
              <SortableHeader label="Duration" sortKey="duration" />
              <SortableHeader label="Check-In" sortKey="checkIn" />
              <SortableHeader label="Status" sortKey="status" />
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map(b => (
              <tr key={b.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{b.name}</td>
                <td className="p-4"><b>{b.id}</b><div className="text-xs text-gray-500">{b.membership}</div></td>
                <td className="p-4">{b.roomNumber}<br/><span className="text-gray-500 text-xs">{b.roomType}</span></td>
                <td className="p-4">{b.duration}</td>
                <td className="p-4">{b.checkIn ? new Date(b.checkIn).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : "N/A"}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded text-xs ${b.status === "Approved" ? "bg-green-100 text-green-700" : b.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{b.status}</span></td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => setEditingBooking(b)} className="px-3 py-1 rounded bg-blue-100 text-sm">Edit</button>
                  {b.payment !== "Paid" && <button onClick={() => setPaymentBooking(b)} className="px-3 py-1 rounded bg-green-600 text-white text-sm">Pay</button>}
                  {b.status !== "Cancelled" && <button onClick={() => setCancelTarget(b)} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Cancel</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cancellation Confirmation Modal */}
      {cancelTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
            {cancelTarget.payment === "Paid" ? (
              <div className="space-y-3 mb-4">
                <p>Paid: ₹{cancelTarget.amountPaid}</p>
                <p className="text-red-600">Charge (10%): -₹{cancelTarget.amountPaid * 0.1}</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" onChange={(e) => setRefundChecked(e.target.checked)} />
                  <span>Refund total: <strong>₹{cancelTarget.amountPaid * 0.9}</strong></span>
                </label>
              </div>
            ) : <p className="mb-4">Confirm cancellation for this unpaid booking?</p>}
            <div className="flex gap-2">
              <button onClick={() => setCancelTarget(null)} className="flex-1 py-2 border rounded">No</button>
              <button onClick={handleConfirmCancellation} className="flex-1 py-2 bg-red-600 text-white rounded">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {editingBooking && <EditBookingModal booking={editingBooking} onSave={(updated) => { setData(prev => prev.map(b => b.id === updated.id ? updated : b)); setEditingBooking(null); }} onClose={() => setEditingBooking(null)} />}
      {paymentBooking && <PaymentModal booking={paymentBooking} onSuccess={(updated) => setData(prev => prev.map(b => b.id === updated.id ? { ...updated, payment: "Paid" } : b))} onClose={() => setPaymentBooking(null)} />}
    </div>
  );
}