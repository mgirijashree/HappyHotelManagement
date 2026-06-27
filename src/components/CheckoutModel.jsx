import React, { useState } from 'react';

const CheckoutModal = ({ booking, onConfirm, onClose }) => {
  const [damageCost, setDamageCost] = useState(0);

  const handleProcess = () => {
    const cost = parseFloat(damageCost) || 0;
    const refund = booking.amountPaid - cost;
    onConfirm(booking.id, cost, refund > 0 ? refund : 0);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Checkout: {booking.name}</h2>
        <p className="text-sm mb-2">Amount Paid: ${booking.amountPaid}</p>
        
        <label className="block text-sm font-medium mb-1">Damage Costs</label>
        <input 
          type="number" 
          className="w-full p-2 border rounded mb-4" 
          value={damageCost}
          onChange={(e) => setDamageCost(e.target.value)}
        />

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 p-2 border rounded">Cancel</button>
          <button onClick={handleProcess} className="flex-1 p-2 bg-red-600 text-white rounded">Confirm Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;