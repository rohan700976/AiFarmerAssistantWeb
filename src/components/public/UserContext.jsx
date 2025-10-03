// src/context/UserContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser({
            name: res.data.name || "User",
            email: res.data.email || "",
          });
        } catch (err) {
          console.error("Error fetching profile:", err);
          if (err.response?.status === 401) {
            localStorage.removeItem("token");
          }
        }
      };
      fetchProfile();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
