import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const LogOut = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
    }

    useEffect(() => {
        const jwt = localStorage.getItem("token");

        if(jwt)
        {
            const headers = {
            'Authorization': `Bearer ${jwt}`
        };

            axios.get("http://192.168.1.72:5000/api/check_jwt", { headers })
                .then(response => {
                    console.log(response)
                    setIsAuthenticated(true);
                })
                .catch(error => {
                    console.log(error)
                    localStorage.removeItem("token");
                    navigate("/login");
                });
        }
        else
        {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <>
            <header className="admin_page_header">
                <h1>Admin Page</h1>
                <button className="admin_page_log_button" onClick={LogOut}>Выход</button>
            </header>
        </>
    );
}

export default AdminPage;