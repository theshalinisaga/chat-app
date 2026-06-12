import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        console.log("LOGIN CLICKED 🚀");
        console.log("EMAIL:", email);
        console.log("PASSWORD:", password);

        try {

           const res = await axios.post(
    "https://chat-appbackend-u7x3.onrender.com/api/auth/login",
    {
        email,
        password
    }
);

            console.log("LOGIN RESPONSE:", res.data);

           localStorage.setItem(
    "token",
    res.data.token
);

localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
);

            alert("Login Success 🚀");

            // go to home page
            navigate("/home");

        } catch (error) {

            console.log(
                "LOGIN ERROR:",
                error.response?.data || error.message
            );

            alert("Login Failed ❌");
        }
    };

   return (

    <div className="login-container">

        <form
            className="login-form"
            onSubmit={handleLogin}
        >

            <h1 className="login-title">

                Welcome Back 👋

            </h1>


            <p className="login-subtitle">

                Login to continue chatting

            </p>


            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />


            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />


            <button type="submit">

                Login

            </button>
            <p>
    Don't have an account?
    <span
        onClick={() => navigate("/register")}
        style={{
            color: "blue",
            cursor: "pointer"
        }}
    >
        Register
    </span>
</p>

        </form>

    </div>
);
}

export default Login;