import React from 'react';

const StatCard = ({ title, value, change, color }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border dark:border-gray-800">
    <h3 className="text-gray-500 dark:text-gray-400 text-sm">{title}</h3>
    <p className="text-2xl font-bold dark:text-white mt-1">{value}</p>
    <span className={`text-xs ${change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
  </div>
);

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="New Booking" value="1,879" change="+7.5%" />
      <StatCard title="Available Rooms" value="55" change="-5.7%" />
      <StatCard title="Revenue" value="$2,287" change="+5.3%" />
      <StatCard title="Checkout" value="567" change="-2.4%" />
    </div>
  );
}