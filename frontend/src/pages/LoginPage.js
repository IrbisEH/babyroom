import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = ({ apiManager, isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn)
            navigate("/admin");
    })

    return (
        <>
            {!isLoggedIn && (<LoginForm apiManager={apiManager} setIsLoggedIn={setIsLoggedIn} />)}
        </>
    );
}

export default LoginPage;