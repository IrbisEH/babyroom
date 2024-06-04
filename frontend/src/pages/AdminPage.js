import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const jwt = localStorage.getItem("token");

        if(jwt)
        {
            const headers = {
            'Authorization': `Bearer ${jwt}`
        };

            axios.get("http://192.168.1.72:5000/api/check_jwt", { headers })
                .then(response => {
                    setIsAuthenticated(true);
                })
                .catch(error => {
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
            {isAuthenticated ? (<h1>Admin Page</h1>) : null}
        </>
    );
}

export default AdminPage;