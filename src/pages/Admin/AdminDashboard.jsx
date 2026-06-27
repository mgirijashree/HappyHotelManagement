import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { bookings } from "../../data/bookings";
import { chartData } from "../../data/chartData";
import { dashboardStats } from "../../data/dashboardStats";

// 1. Reusable Stat Card Component
const StatCard = ({ title, value, change }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border dark:border-gray-800 transition-colors">
    <h3 className="text-gray-500 dark:text-gray-400 text-sm">{title}</h3>
    <p className="text-2xl font-bold dark:text-white mt-1">{value}</p>
    <span className={`text-xs font-medium ${change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
      {change}
    </span>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Dashboard</h1>

      {/* KPI Section (Stats from screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="New Booking" value="1,879" change="+7.5%" />
        <StatCard title="Available Rooms" value="55" change="-5.7%" />
        <StatCard title="Revenue" value="$2,287" change="+5.3%" />
        <StatCard title="Checkout" value="567" change="-2.4%" />
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border dark:border-gray-800 mb-8 p-6 transition-colors">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Total Revenue Analysis</h2>
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} 
                cursor={{ fill: '#f3f4f6', opacity: 0.1 }} 
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border dark:border-gray-800 p-6 transition-colors">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-sm border-b dark:border-gray-700">
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
            <tbody className="divide-y dark:divide-gray-800">
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} className="text-sm dark:text-gray-300">
                  <td className="py-4 font-bold">{b.id}<div className="text-xs text-gray-500 font-normal">{b.membership}</div></td>
                  <td className="py-4">{b.name}</td>
                  <td className="py-4 font-medium">{b.roomNumber}<div className="text-xs text-gray-500 font-normal">{b.roomType}</div></td>
                  <td className="py-4">{new Date(b.checkIn).toLocaleDateString()}</td>
                  <td className="py-4">{new Date(b.checkOut).toLocaleDateString()}</td>
                  <td className="py-4">{b.duration}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium 
                      ${b.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                      b.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium 
                      ${b.payment === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {b.payment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;