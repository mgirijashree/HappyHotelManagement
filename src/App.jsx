import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./assets/auth/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import Login from "./pages/Auth/Login";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import BookingDashboard from "./pages/Admin/BookingDashboard";
import BookingConfirmation from "./pages/Admin/BookingConfirmation";
import Checkout from "./pages/Admin/Checkout"; 
import Rooms from "./pages/Admin/Rooms";

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="booking-dashboard" element={<BookingDashboard />} />
              <Route path="checkout" element={<Checkout />} /> {/* 2. Add the route here */}
              <Route path="rooms" element={<Rooms />} />          
            </Route>

            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;