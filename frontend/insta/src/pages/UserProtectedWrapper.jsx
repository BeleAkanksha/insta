import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const UserProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = React.useState({});
    
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        if(response.status === 200) {
            setUser(response.data);
            setIsLoading(false);
        }
    }).catch(err => {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/');
    });

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    // if (!token) {
    //     return null;
    // }

    return (
        <>
            {children}
        </>
    );
}

export default UserProtectedWrapper;