import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../assets/auth/AuthContext";
import resortImg from "../../assets/images/resort.jfif";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation logic
  const errors = useMemo(() => ({
    email: touched.email && !emailRegex.test(form.email) ? "Invalid email format" : "",
    password: touched.password && form.password.length < 6 ? "Password must be 6+ characters" : ""
  }), [form, touched]);

  const isFormInvalid = !emailRegex.test(form.email) || form.password.length < 6;

  const submit = (e) => {
    e.preventDefault();
    if (isFormInvalid) return;

    // Use the login function from AuthContext
    const user = login(form.email, form.password);
    
    if (!user) {
      alert("Invalid email or password");
      return;
    }

    // Role-based navigation
    switch (user.role) {
      case "admin": nav("/admin"); break;
      case "reception": nav("/reception"); break;
      case "manager": nav("/manager"); break;
      default: nav("/customer");
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* LEFT IMAGE */}
        <div className="w-full md:w-[50%] relative hidden md:block">
          <img src={resortImg} alt="Resort" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-10 left-10">
            <p className="text-white text-lg md:text-3xl">Welcome To</p>
            <h1 className="text-white text-3xl md:text-5xl font-bold animate-pulse">
              THE HAPPY HOTEL
            </h1>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-[50%] flex items-center p-8 md:p-16">
          <div className="w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Login</h2>
            <form onSubmit={submit} className="space-y-5">
              
              {/* Email Input */}
              <div className="w-full">
                <input
                  type="email"
                  value={form.email}
                  placeholder="Email"
                  className={`w-full p-4 border rounded-xl ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onBlur={() => setTouched({ ...touched, email: true })}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div className="w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  placeholder="Password (min 6 chars)"
                  className={`w-full p-4 border rounded-xl pr-16 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onBlur={() => setTouched({ ...touched, password: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-500 font-medium text-sm hover:text-gray-800"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isFormInvalid}
                className={`w-full p-4 rounded-xl text-white transition-colors ${
                  isFormInvalid 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-[#D4B06A] hover:bg-[#b8985a]"
                }`}
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