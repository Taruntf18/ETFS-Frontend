import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './change_password.module.css';
import { useUser } from '../UserContext/UserContext';
import axios from 'axios';
import { baseUrl } from '../../environments/environment';
import { useNavigate } from 'react-router';

const ChangePassword = () => {

    const navigate = useNavigate();
    const { user } = useUser();
    const { updateUser } = useUser();
    console.log(user);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePasswordPost = async () => {
        try {
            const response = await axios.post(`${baseUrl}resetPassword`, {
                "empNo": user.userId,
                "password": confirmPassword,
                "isFirstLogin": "N"
            });
            // SetfilesData(response.data);
            console.log(response.data)
            updateUser({
                "userId": "",
                "userName": "",
                "userRoles": "",
                "userDivision": "",
                "userSection": "",
                "userDesignation": "",
                "isLoggedIn": false,
                "hod": null,
            });
            localStorage.clear();
            navigate("/");
        } catch (error) {
            console.error("Axios Error:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword === confirmPassword) {
            handlePasswordPost();
            alert('Password changed successfully!');
            // Handle password change logic here
        } else {
            alert('Passwords do not match!');
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.role_container}>
                <h2 className={styles.h2}>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_container}>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            className={styles.input}
                            required
                        />
                        <button
                            type="button"
                            className={styles.eye_button}
                            onClick={toggleNewPasswordVisibility}
                        >
                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <div className={styles.input_container}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                            className={styles.input}
                            required
                        />
                        <button
                            type="button"
                            className={styles.eye_button}
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <button type="submit" className={styles.continue_button}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
