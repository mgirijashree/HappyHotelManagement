import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { bookings } from "../../data/bookings";
import { chartData } from "../../data/chartData";
import { dashboardStats } from "../../data/dashboardStats";

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Check-In" value={dashboardStats.checkIn.count} trend={dashboardStats.checkIn.trend} />
        <StatCard title="Check-Out" value={dashboardStats.checkOut.count} trend={dashboardStats.checkOut.trend} />
        <StatCard title="Total Revenue" value={`Rs.${dashboardStats.revenue.count}`} trend={dashboardStats.revenue.trend} />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-sm border mb-8 h-64 overflow-hidden">
        <h2 className="text-lg font-semibold px-6 pt-6 mb-4">Total Revenue</h2>
        <div className="w-full h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} padding={{ left: 20, right: 20 }} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-sm border-b">
              <th className="pb-4">Booking</th>
              <th className="pb-4">Guest</th>
              <th className="pb-4">Room</th>
              <th className="pb-4">Check In</th>
              <th className="pb-4">Check Out</th>
              <th className="pb-4">Duration</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {bookings.slice(0, 5).map((b) => (
              <tr key={b.id} className="text-sm">
                <td className="py-4">
                  <div className="font-bold">{b.id}</div>
                  <div className="text-xs text-gray-500">{b.membership}</div>
                </td>
                <td className="py-4">{b.name}</td>
                <td className="py-4">
                  <div className="font-medium">{b.roomNumber}</div>
                  <div className="text-xs text-gray-500">{b.roomType}</div>
                </td>
                <td className="py-4">
                  {b.checkIn ? new Date(b.checkIn).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : "N/A"}
                </td>
                <td className="py-4">
                  {b.checkOut ? new Date(b.checkOut).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : "N/A"}
                </td>
                <td className="py-4">{b.duration}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium 
                    ${b.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                      b.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'}`}>
                    {b.status}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium 
                    ${b.payment === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {b.payment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border">
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-3xl font-bold mt-2">{value}</h3>
    <p className="text-green-500 text-xs mt-1 font-medium">{trend}</p>
  </div>
);

export default AdminDashboard;