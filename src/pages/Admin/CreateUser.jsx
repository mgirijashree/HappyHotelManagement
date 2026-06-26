import React from 'react';

const CreateUser = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6">Create User</h2>
      <div className="grid grid-cols-2 gap-6">
        <InputField label="First Name" />
        <InputField label="Last Name" />
        <InputField label="User Name" />
        <InputField label="Email" />
        <InputField label="Password" type="password" />
        <InputField label="Repeat Pwd" type="password" />
        <InputField label="Phone #" />
        <InputField label="Date Of Birth" type="date" />
      </div>
      
      <div className="mt-8 flex justify-end gap-4">
        <button className="bg-gray-500 text-white px-6 py-2 rounded">Cancel</button>
        <button className="bg-red-600 text-white px-6 py-2 rounded">Create User</button>
      </div>
    </div>
  );
};

const InputField = ({ label, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}:</label>
    <input type={type} className="w-full border p-2 rounded" />
  </div>
);

export default CreateUser;