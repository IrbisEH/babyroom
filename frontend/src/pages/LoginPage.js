import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = ({ Session, isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn)
            navigate("/admin");
    })

    return (
        <>
            {!isLoggedIn && (<LoginForm Session={Session} setIsLoggedIn={setIsLoggedIn} />)}
        </>
    );
}

export default LoginPage;