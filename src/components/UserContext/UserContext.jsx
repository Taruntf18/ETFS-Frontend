import { createContext, useState, useContext, useEffect } from "react";

// Create the User Context
const UserContext = createContext(null);

// Create a provider component
export const UserProvider = ({ children }) => {
  // Load user state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser): {
        userId: "",
        userName: "",
        userRoles: "",
        userDivision: "",
        userSection: "",
        userDesignation:"",
        isLoggedIn: false,
      };
  });

  const [currentUserRole, setCurrentUserRole] = useState(() => {
    return localStorage.getItem("currentUserRole") || "";
  });

  const [division, setDivision] = useState(() => {
    return JSON.parse(localStorage.getItem("division")) || "";
  });

  const [currentUserdivision, setcurrentUserdivision] = useState(() => {
    return localStorage.getItem("currentUserdivision") || "";
  });

  // Function to update the user state
  const updateUser = (newUserData) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...newUserData };
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Save to localStorage
      return updatedUser;
    });
  };

  useEffect(() => {
    localStorage.setItem("currentUserRole", currentUserRole);
  }, [currentUserRole]);

  useEffect(() => {
    localStorage.setItem("currentUserdivision", currentUserdivision);
  }, [currentUserdivision]);

  useEffect(() => {
    localStorage.setItem("division", JSON.stringify(division));
  }, [division]);

  return (
    <UserContext.Provider value={{ user, updateUser, currentUserRole, setCurrentUserRole, division, setDivision, currentUserdivision,setcurrentUserdivision  }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};