import React from "react";

import {
useLocation,
useNavigate
} from "react-router-dom";

export default function BookingConfirmation(){

const {
state
}=useLocation();

const nav=
useNavigate();

if(!state){

return(
<div className="p-10">
No booking found
</div>
);

}

return(

<div className="min-h-screen bg-gray-100 flex justify-center items-center">

<div className="bg-white p-10 rounded-xl shadow w-[700px]">

<h1 className="text-4xl text-green-600 mb-6">

Booking Confirmed

</h1>

<div className="space-y-4">

<p>
Booking:
<b>
{state.booking.id}
</b>
</p>

<p>
Guest:
<b>
{state.booking.name}
</b>
</p>

<p>
Room:
<b>
{state.booking.roomType}
</b>
</p>

<p>
Amount:
<b>

₹
{state.amount}

</b>
</p>

<p>
Method:
<b>
{state.method}
</b>
</p>

<p>
Status:
<span className="text-green-600">
Paid
</span>
</p>

</div>

<button

onClick={()=>

nav(
"/admin/booking-dashboard"
)

}

className="
mt-8
bg-blue-600
text-white
px-6
py-3
rounded
"

>

Back To Dashboard

</button>

</div>

</div>

);

}