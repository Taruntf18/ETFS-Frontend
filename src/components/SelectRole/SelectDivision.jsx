import React, { useState } from "react";
import styles from "./SelectRole.module.css";
import { useUser } from "../UserContext/UserContext";
import { useNavigate } from "react-router";

export default function SelectRole() {
  const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const { division } = useUser();
    const { setDivision } = useUser();
    const { user } = useUser();
    const { updateUser } = useUser();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

 const handleContinue = () => {
        setDivision(["1"]);
        updateUser({
            "userId": user.userId,
            "userName": user.userName,
            "userRoles": user.userRoles,
            "userDivision": role,
            "userSection": user.userSection,
            "isLoggedIn": true,
        });
        navigate('/mainsection');
    }

  return (
    <div className={styles.body}>
      <div className={styles.role_container}>
        <h2 className={styles.h2}>Select Your Division</h2>
        {division
          .toString()
          .split(",")
          .map((item, index) => (
            <button
              key={index}
              onClick={() => handleRoleSelect(item)}
              className={`${styles.role_button} ${
                role === item ? styles.selected : ""
              }`}
            >
              {item}
            </button>
          ))}
        <button
          onClick={handleContinue}
          className={styles.continue_button}
          disabled={!role}
        >
          Continue
        </button>
      </div>
    </div>
  );
}