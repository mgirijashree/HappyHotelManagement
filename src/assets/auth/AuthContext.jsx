import { createContext, useContext, useState } from "react";
import { users } from "../../data/users"; // Adjust this path to where your users.js is located

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Look for a user that matches both email and password
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return foundUser; // Return the user object so Login.jsx can see the role
    }
    
    return null; // This causes the "Invalid login" alert in your Login.jsx
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);