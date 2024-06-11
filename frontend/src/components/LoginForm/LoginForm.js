import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ Session }) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        Session.Login(username, password)
            .then((response) => {
                if(response)
                {
                    navigate("/admin")
                }
            });
    }

    return (
        <div className="login_form_wrapper">
            <form className="login_form" onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" autoComplete="current-username" value={username} onChange={e => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;