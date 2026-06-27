import React, { useState } from "react";
import { X } from "lucide-react";
import { rooms } from "../data/rooms";

const BookingModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    extraBed: false
  });
  const [selectedRooms, setSelectedRooms] = useState({});
  const [availableRooms, setAvailableRooms] = useState([]);
  const [errors, setErrors] = useState({});

  const [guestDetails, setGuestDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    docType: "",
    docNumber: "",
    nationality: ""
  });


  const validateForm = () => {
    let newErrors = {};

    if (guestDetails.firstName.length < 3) newErrors.firstName = "First name must be at least 3 characters.";
    if (guestDetails.lastName.length < 3) newErrors.lastName = "Last name must be at least 3 characters.";
    if (!/^\d{10}$/.test(guestDetails.phone)) newErrors.phone = "Phone number must be exactly 10 digits.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestDetails.email)) newErrors.email = "Please enter a valid email address.";
    if (!guestDetails.docType) newErrors.docType = "Please select a document type.";
    if (guestDetails.docNumber.trim() === "") newErrors.docNumber = "Document number is required.";
    if (guestDetails.nationality.trim() === "") newErrors.nationality = "Nationality is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const [paymentMethod, setPaymentMethod] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookings, setBookings] = useState([]); // Store history  


  const now = new Date();
  const today = new Date(now.getTime() - (now.getTimezoneOffset() * 60000))
    .toISOString()
    .split('T')[0];

  const handleSearch = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    // 1. Validation
    if (!formData.checkIn || formData.checkIn < today) newErrors.checkIn = "Invalid check-in date";
    if (!formData.checkOut || formData.checkOut <= formData.checkIn) newErrors.checkOut = "Check-out must be after check-in";
    if (!formData.adults || formData.adults < 1) newErrors.adults = "At least 1 adult required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 2. Logic: Only declare these once!
    const totalGuests = (parseInt(formData.adults) || 0) + (parseInt(formData.children) || 0);

    const filtered = rooms.filter(r => {
      const capacity = formData.extraBed ? r.maxOccupancy + 1 : r.maxOccupancy;
      return r.status === "Available" && capacity >= totalGuests;
    });

    // 3. Update State
    setAvailableRooms(filtered);
    setErrors({}); // Clear errors
    setStep(2);    // Advance to Step 2
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X /></button>

        <h2 className="text-xl font-bold mb-6">
          {step === 1 ? "Search Rooms" : step === 2 ? "Select Rooms" : "Confirm Booking"}
        </h2>

        {/* Step 1: Search */}
        {step === 1 && (
          <div className="space-y-4">
            {/* Checkin */}
            <div>
              <label className="block text-sm font-medium mb-1">Check-in Date</label>
              <input
                type="date"
                min={today}
                className={`w-full p-2 border rounded ${errors.checkIn ? 'border-red-500' : 'border-gray-300'}`}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    checkIn: e.target.value,
                    checkOut: "" // <--- ADD THIS: Resets checkout when checkin changes
                  });
                  // Clear errors when the user changes the date
                  if (errors.checkIn || errors.checkOut) {
                    setErrors({ ...errors, checkIn: null, checkOut: null });
                  }
                }}
              />
              {errors.checkIn && <p className="text-red-500 text-xs">{errors.checkIn}</p>}
            </div>

            {/* Checkout */}
            <div>
              <label className="block text-sm font-medium mb-1">Check-out Date</label>
              <input
                type="date"
                // This min value ensures the user cannot pick a date before check-in
                min={formData.checkIn || today}
                // This value prop is CRITICAL: it allows React to clear the field when state changes
                value={formData.checkOut}
                className={`w-full p-2 border rounded ${errors.checkOut ? 'border-red-500' : 'border-gray-300'}`}
                onChange={(e) => {
                  setFormData({ ...formData, checkOut: e.target.value });
                  // Clear error immediately when user starts fixing it
                  if (errors.checkOut) setErrors({ ...errors, checkOut: null });
                }}
              />
              {errors.checkOut && (
                <p className="text-red-500 text-xs mt-1 animate-pulse">
                  {errors.checkOut}
                </p>
              )}
            </div>


            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                <input
                  type="number"
                  min="1" // Prevents zero or negative numbers
                  placeholder="1"
                  className={`w-full p-2 border rounded ${errors.adults ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) || 0 })}
                />
                {errors.adults && <p className="text-red-500 text-[10px] mt-1">{errors.adults}</p>}
              </div>




              <div className="w-1/2">
                <label className="block text-sm font-medium">Children</label>
                <input type="number" min="0" className="w-full p-2 border rounded" onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) || 0 })} />
              </div>
            </div>


            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" onChange={(e) => setFormData({ ...formData, extraBed: e.target.checked })} /> Include Extra Bed
            </label>
            <button onClick={handleSearch} className="w-full bg-red-600 text-white py-3 rounded font-bold">Find Available Rooms</button>
          </div>
        )}

        {/* Step 2: Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Available Rooms</h3>

            {/* Error Message Display */}
            {errors.selection && (
              <p className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded border border-red-200">
                {errors.selection}
              </p>
            )}

            <div className="max-h-[300px] overflow-y-auto space-y-3">
              {availableRooms.map((room) => {
                const qty = selectedRooms[room.id] || 0;
                return (
                  <div key={room.id} className="p-4 border rounded-lg flex justify-between items-center bg-white shadow-sm">
                    <div>
                      <p className="font-bold text-gray-800">{room.name}</p>
                      <p className="text-sm text-gray-600">Price: ${room.price} / night</p>
                    </div>

                    {/* Custom + and - Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedRooms({ ...selectedRooms, [room.id]: Math.max(0, qty - 1) })}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                      >-</button>

                      <span className="w-8 text-center font-medium">{qty}</span>

                      <button
                        onClick={() => setSelectedRooms({ ...selectedRooms, [room.id]: qty + 1 })}
                        className="w-8 h-8 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center font-bold"
                      >+</button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={() => setStep(1)} className="w-1/3 py-2 border rounded font-semibold">Back</button>
              <button
                onClick={() => {
                  const total = Object.values(selectedRooms).reduce((s, q) => s + q, 0);
                  if (total > 0) {
                    setStep(3);
                  } else {
                    setErrors({ selection: "Please select at least one room to proceed." });
                  }
                }}
                className="w-2/3 bg-red-600 text-white py-2 rounded font-semibold"
              >
                Proceed to Confirmation
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Guest Details */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Guest Information</h3>

            {/* Helper function defined inside or outside component */}
            {(() => {
              const validate = (name, value) => {
                let error = "";
                if (name === "firstName" && value.length < 3) error = "Min 3 letters required";
                if (name === "lastName" && value.length < 3) error = "Min 3 letters required";
                if (name === "phone" && !/^\d{10}$/.test(value)) error = "Must be 10 digits";
                if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
                if (name === "docType" && value === "") error = "Select a document type";
                if (name === "docNumber" && value.trim() === "") error = "Required";
                if (name === "nationality" && value.trim() === "") error = "Required";

                setErrors(prev => ({ ...prev, [name]: error }));
              };

              const handleGuestChange = (field, value) => {
                setGuestDetails(prev => ({ ...prev, [field]: value }));
                validate(field, value);
              };

              return (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <input
                        placeholder="First Name"
                        className={`p-2 border rounded ${errors.firstName ? 'border-red-500' : ''}`}
                        value={guestDetails.firstName}
                        onChange={(e) => handleGuestChange("firstName", e.target.value)}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div className="flex flex-col">
                      <input
                        placeholder="Last Name"
                        className={`p-2 border rounded ${errors.lastName ? 'border-red-500' : ''}`}
                        value={guestDetails.lastName}
                        onChange={(e) => handleGuestChange("lastName", e.target.value)}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <input
                      placeholder="Phone Number (10 digits)"
                      className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
                      value={guestDetails.phone}
                      onChange={(e) => handleGuestChange("phone", e.target.value)}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="flex flex-col">
                    <input
                      placeholder="Email ID"
                      className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                      value={guestDetails.email}
                      onChange={(e) => handleGuestChange("email", e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <select
                        className={`p-2 border rounded ${errors.docType ? 'border-red-500' : ''}`}
                        value={guestDetails.docType}
                        onChange={(e) => handleGuestChange("docType", e.target.value)}
                      >
                        <option value="">Doc Type</option>
                        <option value="Passport">Passport</option>
                        <option value="National ID">National ID</option>
                      </select>
                      {errors.docType && <p className="text-red-500 text-xs mt-1">{errors.docType}</p>}
                    </div>
                    <div className="flex flex-col">
                      <input
                        placeholder="Doc Number"
                        className={`p-2 border rounded ${errors.docNumber ? 'border-red-500' : ''}`}
                        value={guestDetails.docNumber}
                        onChange={(e) => handleGuestChange("docNumber", e.target.value)}
                      />
                      {errors.docNumber && <p className="text-red-500 text-xs mt-1">{errors.docNumber}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <input
                      placeholder="Nationality"
                      className={`w-full p-2 border rounded ${errors.nationality ? 'border-red-500' : ''}`}
                      value={guestDetails.nationality}
                      onChange={(e) => handleGuestChange("nationality", e.target.value)}
                    />
                    {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
                  </div>
                </>
              );
            })()}

            <div className="flex gap-2 pt-2">
              <button onClick={() => setStep(2)} className="w-1/2 py-2 border rounded">Back</button>

              <button
                onClick={() => {
                  const hasErrors = Object.values(errors).some(e => e !== "" && e !== null);
                  const isEmpty = Object.values(guestDetails).some(v => v === "");

                  if (!hasErrors && !isEmpty) {
                    setStep(4); // Only move to Step 4, do NOT call onClose()
                  } else {
                    alert("Please fix the errors before proceeding.");
                  }
                }}
                className="w-1/2 bg-green-600 text-white py-2 rounded font-bold"
              >
                Proceed to Pay
              </button>

            </div>
          </div>
        )}



        {/* Step 4: Payment */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Payment Details</h3>

            {/* Price Summary */}
          
              <div className="bg-gray-50 p-4 rounded-lg border space-y-2">
                <h4 className="font-bold">Price Summary</h4>
                
                {/* Room Costs */}
                {Object.entries(selectedRooms).map(([id, qty]) => {
                  if (qty === 0) return null;
                  const room = rooms.find((r) => r.id === parseInt(id));
                  return (
                    <div key={id} className="flex justify-between text-sm">
                      <span>{room.name} x {qty}</span>
                      <span>${room.price * qty}</span>
                    </div>
                  );
                })}

                {/* Extra Bed Fee */}
                {formData.extraBed && (
                  <div className="flex justify-between text-sm">
                    <span>Extra Bed</span>
                    <span>$600</span>
                  </div>
                )}

                {/* Subtotal & GST Calculation */}
                {(() => {
                  const roomTotal = Object.entries(selectedRooms).reduce((acc, [id, qty]) => {
                    const room = rooms.find((r) => r.id === parseInt(id));
                    return acc + (room ? room.price * qty : 0);
                  }, 0);
                  
                  const extraBedFee = formData.extraBed ? 600 : 0;
                  const subtotal = roomTotal + extraBedFee;
                  const gst = subtotal * 0.18; // Assuming 18% GST
                  const grandTotal = subtotal + gst;

                  return (
                    <>
                      <div className="flex justify-between text-sm border-t pt-2">
                        <span>GST (18%)</span>
                        <span>${gst.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Grand Total</span>
                        <span>${grandTotal.toFixed(2)}</span>
                      </div>
                    </>
                  );
                })()}
</div>

            {/* Payment Selection */}
            <div>
              <label className="block text-sm font-medium mb-1">Select Payment Method</label>
              <select
                className="w-full p-2 border rounded"
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setErrors({}); // Reset errors on method switch
                }}
              >
                <option value="">-- Select Method --</option>
                <option value="Credit Card">Credit Card</option>
                <option value="UPI">UPI</option>
              </select>
            </div>

            {/* Credit Card Fields */}
            {paymentMethod === "Credit Card" && (
              <div className="space-y-3">
                <input
                  placeholder="Card Number (16 digits)"
                  maxLength={16}
                  className={`w-full p-2 border rounded ${errors.cardNo ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setGuestDetails({ ...guestDetails, cardNo: val });
                    setErrors((prev) => ({ ...prev, cardNo: val.length < 16 ? "Must be 16 digits" : "" }));
                  }}
                />
                {errors.cardNo && <p className="text-red-500 text-xs">{errors.cardNo}</p>}

                <div className="grid grid-cols-2 gap-4">
                  {/* Expiry Date */}
                  <div className="flex flex-col">
                    <input
                      type="month"
                      className={`p-2 border rounded ${errors.expiry ? "border-red-500" : "border-gray-300"}`}
                      onChange={(e) => {
                        const val = e.target.value; // Format: YYYY-MM
                        const [year, month] = val.split("-");
                        const expiryDate = new Date(year, month - 1); // JS months are 0-indexed
                        const today = new Date();
                        today.setDate(1); // Compare against the current month

                        setGuestDetails({ ...guestDetails, expiry: val });

                        let error = "";
                        if (val && expiryDate < today) {
                          error = "Date cannot be in the past";
                        }
                        setErrors((prev) => ({ ...prev, expiry: error }));
                      }}
                    />
                    {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                  </div>

                  {/* CVV */}
                  <div className="flex flex-col">
                    <input
                      placeholder="CVV"
                      maxLength={4}
                      className={`p-2 border rounded ${errors.cvv ? "border-red-500" : "border-gray-300"}`}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, ""); // Only numbers
                        setGuestDetails({ ...guestDetails, cvv: val });

                        const error = val.length < 3 ? "Min 3 digits" : "";
                        setErrors((prev) => ({ ...prev, cvv: error }));
                      }}
                    />
                    {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* UPI Fields */}
            {paymentMethod === "UPI" && (
              <div>
                <input
                  placeholder="Enter UPI ID (e.g., name@upi)"
                  className={`w-full p-2 border rounded ${errors.upi ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    const val = e.target.value;
                    setGuestDetails({ ...guestDetails, upiId: val });
                    setErrors((prev) => ({ ...prev, upi: !val.includes("@") ? "Invalid UPI ID" : "" }));
                  }}
                />
                {errors.upi && <p className="text-red-500 text-xs">{errors.upi}</p>}
              </div>
            )}

            <button
              onClick={() => {
                // 1. Perform final validation check for all active fields
                const isCardValid = paymentMethod === "Credit Card" &&
                  guestDetails.cardNo?.length === 16 &&
                  guestDetails.cvv?.length >= 3 &&
                  !errors.expiry &&
                  !errors.cvv;

                const isUpiValid = paymentMethod === "UPI" &&
                  guestDetails.upiId?.includes("@");

                // 2. Transition to Success
                if (paymentMethod === "Credit Card" && isCardValid) {
                  setBookings([...bookings, { ...guestDetails, paymentMethod }]);
                  setStep(5); // Move to Success screen
                } else if (paymentMethod === "UPI" && isUpiValid) {
                  setBookings([...bookings, { ...guestDetails, paymentMethod }]);
                  setStep(5); // Move to Success screen
                } else {
                  alert("Please ensure all payment details are valid.");
                }
              }}
              className="w-full bg-green-600 text-white py-3 rounded font-bold"
            >
              Confirm Booking
            </button>


          </div>
        )}

        {/* Step 5: Success Message */}
        {step === 5 && (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h2>
            <p className="text-gray-600 mt-2 mb-6">
              Thank you for your reservation. A confirmation email has been sent to your address.
            </p>
            <button
              onClick={() => {
                // Here you can handle your history view or simply close
                onClose();
              }}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-black transition"
            >
              Close & View History
            </button>
          </div>
        )}


      </div>
    </div>
  );
};

export default BookingModal;