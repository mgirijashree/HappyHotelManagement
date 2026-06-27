import React, {
useState,
useEffect,
useMemo
} from "react";

import {
rooms
} from "../data/rooms";

export default function EditBookingModal({
booking,
onSave,
onClose
}) {

const [errors,setErrors]=useState({});
const [success,setSuccess]=useState("");

const calculateNights=(checkIn,checkOut)=>{

if(!checkIn || !checkOut)
return "";

const start=
new Date(checkIn);

const end=
new Date(checkOut);

const diff=
Math.ceil(
(end-start)/
(1000*60*60*24)
);

return diff>0
? `${diff} night${diff>1?"s":""}`
: "";

};

const [form,setForm]=useState({});

useEffect(()=>{

setForm({

...booking,

phone:
booking.phone || "",

occupants:
booking.occupants || 2,

checkIn:
booking.checkIn || "",

checkOut:
booking.checkOut || "",

duration:
booking.duration || "",

paymentMethod:"",

upiId:"",
cardNumber:"",
cardHolder:"",
expiry:"",
cvv:"",

docType:"",
docNumber:"",

refundAccount:
booking.paymentAccount || ""

});

},[booking]);

useEffect(()=>{

if(
form.checkIn &&
form.checkOut
){

setForm(prev=>({

...prev,

duration:
calculateNights(
prev.checkIn,
prev.checkOut
)

}));

}

},[
form.checkIn,
form.checkOut
]);

const update=(key,val)=>{

setForm(prev=>({

...prev,

[key]:val

}));

};

const availableRooms=
useMemo(

()=>

rooms.filter(

r=>

r.status==="Available"

&&

r.maxOccupancy>=
form.occupants

),

[form.occupants]

);

const oldRoom=
rooms.find(
r=>
r.name===
booking.roomType
);

const selectedRoom=
rooms.find(
r=>
r.name===
form.roomType
);

const oldPrice=
oldRoom?.price || 0;

const newPrice=
selectedRoom?.price || oldPrice;

const validate=()=>{

let e={};

if(
!/^[6-9]\d{9}$/
.test(
form.phone
)
){

e.phone=
"Enter valid mobile";

}

if(
form.name
!==

booking.name
){

if(
!form.docType
){

e.docType=
"Document required";

}

if(
!form.docNumber
){

e.docNumber=
"Document number required";

}

}

if(
form.checkOut
<=
form.checkIn
){

e.date=
"Checkout must be after Checkin";

}

if(
newPrice>
oldPrice
){

if(
!form.paymentMethod
){

e.paymentMethod=
"Select payment";

}

if(
form.paymentMethod==="UPI"
){

if(

!/^[a-zA-Z0-9._-]+@[a-zA-Z]+$/

.test(
form.upiId
)

){

e.upiId=
"Invalid UPI";

}

}

if(
form.paymentMethod==="Card"
){

if(
!/^\d{16}$/
.test(
form.cardNumber
)
){

e.card=
"Card must contain 16 digits";

}

if(
!form.cardHolder
){

e.cardHolder=
"Enter holder name";

}

if(
!/^\d{2}\/\d{2}$/
.test(
form.expiry
)
){

e.expiry=
"MM/YY";

}

if(
!/^\d{3}$/
.test(
form.cvv
)
){

e.cvv=
"CVV must contain 3 digits";

}

}

}

setErrors(e);

return (
Object.keys(e)
.length===0
);

};

const save=()=>{

if(
!validate()
)
return;

onSave(form);

setSuccess(
"Booking updated successfully"
);

setTimeout(
onClose,
1500
);

};

return(

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white rounded-xl p-8 w-[950px] max-h-[90vh] overflow-auto">

<h2 className="text-3xl font-bold mb-6">
Edit Booking
</h2>

<div className="grid grid-cols-2 gap-4">

<input
value={form.id||""}
readOnly
className="border p-3 rounded bg-gray-100"
/>

<input
value={form.membership||""}
readOnly
className="border p-3 rounded bg-gray-100"
/>

<input
value={form.name||""}
onChange={(e)=>
update(
"name",
e.target.value
)}
className="border p-3 rounded"
/>

<input
value={form.phone||""}
onChange={(e)=>
update(
"phone",
e.target.value
)}
className="border p-3 rounded"
/>

<input
type="date"
value={form.checkIn||""}
onChange={(e)=>
update(
"checkIn",
e.target.value
)}
className="border p-3 rounded"
/>

<input
type="date"
value={form.checkOut||""}
onChange={(e)=>
update(
"checkOut",
e.target.value
)}
className="border p-3 rounded"
/>

<input
value={form.duration||""}
readOnly
className="border p-3 rounded bg-gray-100"
/>

<input
type="number"
value={form.occupants}
onChange={(e)=>
update(
"occupants",
Number(
e.target.value
)
)}
className="border p-3 rounded"
/>

<select
value={
form.roomType
}
className="border p-3 rounded"

onChange={(e)=>{

const room=
rooms.find(
r=>
r.name===
e.target.value
);

setForm({

...form,

roomType:
room.name,

roomNumber:
`Room ${room.id}`

});

}}

>

{
availableRooms.map(
r=>

<option
key={r.id}
value={r.name}
>

{r.name}
—
₹{r.price}

</option>

)
}

</select>

<input
value={form.roomNumber||""}
readOnly
className="border p-3 rounded bg-gray-100"
/>

</div>

{errors.date&&(
<p className="text-red-600 mt-2">
{errors.date}
</p>
)}

<div className="mt-6 flex justify-end gap-3">

<button
onClick={onClose}
className="px-6 py-2 border rounded"
>

Cancel

</button>

<button
onClick={save}
className="bg-blue-600 text-white px-6 py-2 rounded"
>

Update

</button>

</div>

{success&&(

<div className="mt-4 bg-green-100 text-green-700 p-3 rounded">

{success}

</div>

)}

</div>

</div>

);

}