import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try
        {
            const response = await axios.post("http://192.168.1.72:5000/api/login", {
                username,
                password
            });

            localStorage.setItem("token", response.data.access_token);

            navigate("/admin");
        }
        catch (error)
        {
            console.error('Login failed', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
    );
}

export default LoginForm;