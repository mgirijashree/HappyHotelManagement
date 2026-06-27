import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentModal({
  booking,
  onSuccess,
  onClose,
}) {
  const nav = useNavigate();

  const roomPrices = {
    Standard: 150,
    Deluxe: 300,
    Suite: 600,
    Luxury: 900,
  };

  const amount =
    roomPrices[booking.roomType] || 250;

  const [method, setMethod] =
    useState("");

  const [form, setForm] =
    useState({
      upi: "",
      cardNumber: "",
      cardHolder: "",
      expiry: "",
      cvv: "",
    });

  const [errors, setErrors] =
    useState({});

  const [processing, setProcessing] =
    useState(false);

  const validate = () => {
    let e = {};

    if (!method) {
      e.method =
        "Select payment method";
    }

    if (method === "UPI") {
      if (!form.upi.trim()) {
        e.upi =
          "Enter UPI ID";
      } else if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z]+$/.test(
          form.upi
        )
      ) {
        e.upi =
          "Invalid UPI ID";
      }
    }

    if (
      method ===
      "Credit Card"
    ) {
      if (
        !/^\d{16}$/.test(
          form.cardNumber
        )
      ) {
        e.card =
          "Card must contain 16 digits";
      }

      if (
        !form.cardHolder.trim()
      ) {
        e.holder =
          "Enter card holder";
      }

      if (
        !/^\d{2}\/\d{2}$/.test(
          form.expiry
        )
      ) {
        e.expiry =
          "Use MM/YY";
      }

      if (
        !/^\d{3}$/.test(
          form.cvv
        )
      ) {
        e.cvv =
          "CVV must contain 3 digits";
      }
    }

    setErrors(e);

    return (
      Object.keys(e)
        .length === 0
    );
  };

  const submit = () => {
    if (!validate()) return;

    setProcessing(true);

    const updatedBooking = {
      ...booking,
      payment: "Paid",
      paymentMethod: method,
      amountPaid: amount,
      paymentDate:
        new Date().toLocaleDateString(),
    };

    onSuccess(updatedBooking);

    setTimeout(() => {
      onClose();

      nav(
        "/booking-confirmation",
        {
          replace: true,
          state: {
            booking:
              updatedBooking,
            amount,
            method,
          },
        }
      );
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">

      <div className="bg-white w-[650px] rounded-xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          Payment Details
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            value={booking.id}
            readOnly
            className="border p-3 rounded bg-gray-100"
          />

          <input
            value={booking.name}
            readOnly
            className="border p-3 rounded bg-gray-100"
          />

          <input
            value={booking.roomType}
            readOnly
            className="border p-3 rounded bg-gray-100"
          />

          <input
            value={`₹${amount}`}
            readOnly
            className="border p-3 rounded bg-green-50"
          />

        </div>

        <div className="mt-5">

          <select
            value={method}
            onChange={(e) =>
              setMethod(
                e.target.value
              )
            }
            className="border p-3 rounded w-full"
          >
            <option value="">
              Select Payment
            </option>

            <option>
              Credit Card
            </option>

            <option>
              UPI
            </option>

            <option>
              Cash
            </option>

          </select>

          <p className="text-red-500">
            {errors.method}
          </p>

        </div>

        {method === "UPI" && (

          <div className="mt-4">

            <input
              placeholder="example@upi"
              className="border p-3 rounded w-full"
              onChange={(e) =>
                setForm({
                  ...form,
                  upi:
                    e.target.value,
                })
              }
            />

            <p className="text-red-500">
              {errors.upi}
            </p>

          </div>

        )}

        {method ===
          "Credit Card" && (

          <div className="grid grid-cols-2 gap-4 mt-4">

            <input
              placeholder="Card Number"
              maxLength={16}
              className="border p-3 rounded"
              onChange={(e) =>
                setForm({
                  ...form,
                  cardNumber:
                    e.target.value,
                })
              }
            />

            <input
              placeholder="Card Holder"
              className="border p-3 rounded"
              onChange={(e) =>
                setForm({
                  ...form,
                  cardHolder:
                    e.target.value,
                })
              }
            />

            <input
              placeholder="MM/YY"
              className="border p-3 rounded"
              onChange={(e) =>
                setForm({
                  ...form,
                  expiry:
                    e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="CVV"
              maxLength={3}
              className="border p-3 rounded"
              onChange={(e) =>
                setForm({
                  ...form,
                  cvv:
                    e.target.value,
                })
              }
            />

            <p className="text-red-500">
              {errors.card}
            </p>

            <p className="text-red-500">
              {errors.holder}
            </p>

            <p className="text-red-500">
              {errors.expiry}
            </p>

            <p className="text-red-500">
              {errors.cvv}
            </p>

          </div>

        )}

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="border px-5 py-3 rounded"
          >
            Cancel
          </button>

          <button
            disabled={processing}
            onClick={submit}
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            {
              processing
                ? "Processing..."
                : "Confirm Payment"
            }
          </button>

        </div>

      </div>

    </div>
  );
}