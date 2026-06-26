import {
useState
} from "react"

import {
useNavigate
} from "react-router-dom"

import {
useAuth
} from "../../assets/auth/AuthContext"

export default function Register(){

const{
register
}=useAuth()

const nav=
useNavigate()

const[
form,
setForm
]=useState({

name:"",
email:"",
password:""

})

const submit=(e)=>{

e.preventDefault()

register(form)

alert(
"Customer Registered"
)

nav("/")

}

return(

<form
onSubmit={submit}
className="
max-w-md
mx-auto
p-8
"
>

<h2
className="
text-3xl
mb-5
"
>

Customer Registration

</h2>

<input
placeholder="Name"
className="
border
w-full
p-3
mb-3
"
onChange={
e=>

setForm({

...form,

name:
e.target.value

})

}
/>

<input
placeholder="Email"
className="
border
w-full
p-3
mb-3
"
onChange={
e=>

setForm({

...form,

email:
e.target.value

})

}
/>

<input
type="password"
placeholder="Password"
className="
border
w-full
p-3
"
onChange={
e=>

setForm({

...form,

password:
e.target.value

})

}
/>

<button
className="
w-full
bg-black
text-white
p-3
mt-5
"
>

REGISTER

</button>

</form>

)

}