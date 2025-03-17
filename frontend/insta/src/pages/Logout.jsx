import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(() => {
        localStorage.removeItem('token');
        navigate('/');
    })

    return (
        <div>
            <h1>Logout</h1>
        </div>
    )
}

export default Logout;