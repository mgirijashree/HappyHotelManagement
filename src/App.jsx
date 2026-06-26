import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./assets/auth/AuthContext";

import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./assets/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>

          {/* OPEN APP */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* ADMIN */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["admin"]}
              />
            }
          >
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />
          </Route>

          {/* FALLBACK */}
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;