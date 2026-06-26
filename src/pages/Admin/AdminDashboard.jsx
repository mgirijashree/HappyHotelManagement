
import React, { useState } from "react";
import { bookings } from "../../data/bookings";

import AdminHeader from "../../components/AdminHeader";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter((b) =>
    b.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">

     

      {/* CONTENT */}
      <main className="flex-1 flex flex-col">

        

        {/* BODY */}
        <section className="flex-1 overflow-auto p-8 bg-gray-100">

          <h1 className="text-3xl font-bold mb-6">
            Dashboard
          </h1>

          {/* SEARCH */}

          <div className="mb-6">

            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="
                w-80
                bg-white
                border
                rounded-lg
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          {/* TABLE */}

          <div className="bg-white rounded-xl shadow p-6">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b text-gray-500">

                    <th className="text-left py-4">
                      Name
                    </th>

                    <th>Mobile</th>

                    <th>Email</th>

                    <th>Arrive</th>

                    <th>Status</th>

                    <th>Payment</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredBookings.map(
                    (b) => (
                      <tr
                        key={b.id}
                        className="
                          border-b
                          hover:bg-gray-50
                        "
                      >

                        <td className="py-5">
                          {b.name}
                        </td>

                        <td>
                          {b.mobile}
                        </td>

                        <td>
                          {b.email}
                        </td>

                        <td>
                          {b.arrive}
                        </td>

                        <td>

                          <span
                            className={`
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-medium
                              ${getStatusStyle(
                                b.status
                              )}
                            `}
                          >
                            {b.status}
                          </span>

                        </td>

                        <td
                          className={
                            b.payment ===
                            "Paid"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {b.payment}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default AdminDashboard;

