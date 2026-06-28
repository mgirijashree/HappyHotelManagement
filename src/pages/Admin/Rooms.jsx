import React, { useState, useMemo, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { rooms as initialRooms } from "../../data/rooms";

const Rooms = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  
  // Filter States
  const [nameFilter, setNameFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const deleteRoom = (id) => setRooms(rooms.filter((r) => r.id !== id));

  const handleUpdate = (updatedRoom) => {
    setRooms(rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
    setEditingRoom(null);
  };

  // Stats calculation
  const stats = useMemo(() => ({
    total: rooms.length,
    available: rooms.filter(r => r.status === "Available").length,
    booked: rooms.filter(r => r.status === "Booked").length,
    
  }), [rooms]);

  // Combined Filtering Logic
  const filteredRooms = rooms.filter((r) => {
    const matchesName = nameFilter === "All" || r.name === nameFilter;
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    return matchesName && matchesStatus;
  });

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Rooms Management</h1>
        
        <div className="flex gap-3">
          <select className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white" onChange={(e) => setNameFilter(e.target.value)}>
            <option value="All">All Categories</option>
            {[...new Set(rooms.map(r => r.name))].map(name => <option key={name} value={name}>{name}</option>)}
          </select>

          <select className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white" onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Checked-In">Checked-In</option>
          </select>

          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <Plus size={18} /> Add Room
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Rooms", value: stats.total, color: "text-gray-600" },
          { label: "Available", value: stats.available, color: "text-green-600" },
          { label: "Booked", value: stats.booked, color: "text-red-600" },
          
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-900 p-4 rounded-xl border dark:border-gray-800 shadow-sm">
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border dark:border-gray-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-sm border-b dark:border-gray-800">
              <th className="p-4">Room Name</th>
              <th className="p-4">Room #</th>
              <th className="p-4">Max Occupancy</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-800">
            {filteredRooms.map((room) => (
              <tr key={room.id} className="dark:text-gray-300 text-sm">
                <td className="p-4 font-bold">{room.name}</td>
                <td className="p-4">{room.roomNumber}</td>
                <td className="p-4">{room.maxOccupancy}</td>
                <td className="p-4">Rs.{room.price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${room.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {room.status}
                  </span>
                </td>
                <td className="p-4 flex gap-3">
                  <button onClick={() => setEditingRoom(room)} className="text-blue-500 hover:text-blue-700"><Edit size={16} /></button>
                  <button onClick={() => deleteRoom(room.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingRoom && (
        <EditRoomModal room={editingRoom} allRooms={rooms} onClose={() => setEditingRoom(null)} onSave={handleUpdate} />
      )}

      {showModal && (
        <AddRoomModal onClose={() => setShowModal(false)} onAdd={(newRooms) => { setRooms([...rooms, ...newRooms]); setShowModal(false); }} />
      )}
    </div>
  );
};

const EditRoomModal = ({ room, allRooms, onClose, onSave }) => {
  const [formData, setFormData] = useState(room);
  useEffect(() => { setFormData(room); }, [room]);

  const uniqueNames = useMemo(() => [...new Set(allRooms.map(r => r.name))], [allRooms]);
  const filteredNumbers = useMemo(() => allRooms.filter(r => r.name === formData.name).map(r => r.roomNumber), [formData.name, allRooms]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <form className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Edit Room</h2>
        <label className="text-sm block mb-1 dark:text-gray-300">Room Name</label>
        <select className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}>
          {uniqueNames.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
        <label className="text-sm block mb-1 dark:text-gray-300">Room Number</label>
        <select className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white" value={formData.roomNumber} onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}>
          {filteredNumbers.map(num => <option key={num} value={num}>{num}</option>)}
        </select>
        <input className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} />
        <input className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white" type="number" value={formData.maxOccupancy} onChange={(e) => setFormData({...formData, maxOccupancy: Number(e.target.value)})} />
        <div className="flex gap-2 mt-4">
          <button type="button" onClick={onClose} className="w-full py-2 bg-gray-200 rounded">Cancel</button>
          <button type="button" onClick={() => onSave(formData)} className="w-full py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
};

const AddRoomModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({ name: "", roomNumber: "", price: "", maxOccupancy: "", numRooms: 1 });
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRooms = Array.from({ length: Number(formData.numRooms) }).map((_, index) => ({
      id: Date.now() + index,
      name: formData.name,
      roomNumber: `${formData.roomNumber}-${index + 1}`,
      price: Number(formData.price),
      maxOccupancy: Number(formData.maxOccupancy),
      status: "Available",
      bookedDates: []
    }));
    onAdd(newRooms);
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Add New Room</h2>
        <input className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white" placeholder="Room Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white" placeholder="Prefix (e.g., 101)" onChange={(e) => setFormData({...formData, roomNumber: e.target.value})} required />
        <input className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white" type="number" placeholder="Price" onChange={(e) => setFormData({...formData, price: e.target.value})} required />
        <input className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white" type="number" placeholder="Occupancy" onChange={(e) => setFormData({...formData, maxOccupancy: e.target.value})} required />
        <input className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white" type="number" placeholder="Quantity" onChange={(e) => setFormData({...formData, numRooms: e.target.value})} required />
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className="w-full py-2 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Rooms;