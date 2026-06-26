import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import AdminHeader from './AdminHeader'; 

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6">
          <Outlet /> {/* This is where CreateUser, Dashboard, etc. will render */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;