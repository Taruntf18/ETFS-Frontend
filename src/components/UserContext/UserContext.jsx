import { createContext, useState, useContext } from "react";

// Create the User Context
const UserContext = createContext(null);

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: "",
    userName: "",
    userRoles: "",
    userDivision:"",
    userSection:"",
    isLoggedIn:false,
  });

  const[currentUserRole, setCurrentUserRole]=useState("");

  // Function to update the user state
  const updateUser = (newUserData) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserData }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser,  currentUserRole, setCurrentUserRole}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
