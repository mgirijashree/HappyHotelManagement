
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../assets/auth/AuthContext";

import resortImg from "../../assets/images/resort.jfif";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();

    const user = login(
      form.email,
      form.password
    );

    if (!user) {
      alert("Invalid login");
      return;
    }

    switch (user.role) {
      case "admin":
        nav("/admin");
        break;

      case "reception":
        nav("/reception");
        break;

      case "manager":
        nav("/manager");
        break;

      default:
        nav("/customer");
    }
  };

       
    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

        {/* Login Modal */}
        <div
        className="
            w-[1100px]
            h-[600px]
            bg-white
            rounded-3xl
            shadow-2xl
            overflow-hidden
            flex
        "
        >

        {/* LEFT IMAGE */}

        <div className="w-[50%] h-full relative">

            <img
            src={resortImg}
            alt="Resort"
            className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute bottom-10 left-10">

            <p className="text-white text-3xl">
                Welcome To
            </p>

            <h1 className="text-white text-5xl font-bold animate-pulse">
                THE HAPPY HOTEL
            </h1>

            
            </div>

        </div>

        {/* RIGHT FORM */}

        <div className="w-[50%] h-full flex items-center">

            <div className="w-full px-16">

            <h2 className="text-4xl font-bold mb-10">
                Login
            </h2>

            <form
                onSubmit={submit}
                className="space-y-5"
            >

                <input
                type="email"
                required
                value={form.email}
                placeholder="Email"
                className="w-full p-4 border rounded-xl"
                onChange={(e)=>
                    setForm({
                    ...form,
                    email:e.target.value
                    })
                }
                />

                <input
                type="password"
                required
                value={form.password}
                placeholder="Password"
                className="w-full p-4 border rounded-xl"
                onChange={(e)=>
                    setForm({
                    ...form,
                    password:e.target.value
                    })
                }
                />

                <button
                type="submit"
                className="
                    w-full
                    bg-[#D4B06A]
                    text-white
                    p-4
                    rounded-xl
                "
                >
                LOGIN
                </button>

            </form>

            </div>

        </div>

        </div>

    </div>
    );
    



}

