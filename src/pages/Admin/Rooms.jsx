import React, { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { rooms as initialRooms } from "../../data/rooms";

const Rooms = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [showModal, setShowModal] = useState(false);

  const deleteRoom = (id) => setRooms(rooms.filter((r) => r.id !== id));

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Rooms Management</h1>
        <button 
          onClick={() => setShowModal(true)} 
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Add Room
        </button>
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
            {rooms.map((room) => (
              <tr key={room.id} className="dark:text-gray-300 text-sm">
                <td className="p-4 font-bold">{room.name}</td>
                <td className="p-4">{room.roomNumber || "N/A"}</td>
                <td className="p-4">{room.maxOccupancy}</td>
                <td className="p-4">${room.price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${room.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {room.status}
                  </span>
                </td>
                <td className="p-4 flex gap-3">
                  <button className="text-blue-500 hover:text-blue-700"><Edit size={16} /></button>
                  <button onClick={() => deleteRoom(room.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddRoomModal 
          onClose={() => setShowModal(false)} 
          onAdd={(newRooms) => { setRooms([...rooms, ...newRooms]); setShowModal(false); }} 
        />
      )}
    </div>
  );
};

const AddRoomModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({ 
    name: "", roomNumber: "", price: "", maxOccupancy: "", numRooms: 1 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to create multiple rooms if "number of rooms" > 1
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
        <input className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white" placeholder="Room Number (Prefix)" onChange={(e) => setFormData({...formData, roomNumber: e.target.value})} required />
        <input className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white" type="number" placeholder="Price" onChange={(e) => setFormData({...formData, price: e.target.value})} required />
        <input className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white" type="number" placeholder="Max Occupancy" onChange={(e) => setFormData({...formData, maxOccupancy: e.target.value})} required />
        <input className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white" type="number" placeholder="Number of Rooms to add" onChange={(e) => setFormData({...formData, numRooms: e.target.value})} required />
        
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className="w-full py-2 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Rooms;