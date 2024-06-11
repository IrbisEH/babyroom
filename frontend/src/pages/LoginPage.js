import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = ({ Session }) => {

    const navigate = useNavigate();

    useEffect(() => {
        Session.CheckToken()
            .then(response => {
                if(response)
                {
                    console.log(Session.username);
                    navigate("/admin");
                }
            });
    });

    return (
        <>
            <LoginForm Session={Session} />
        </>
    );
}

export default LoginPage;