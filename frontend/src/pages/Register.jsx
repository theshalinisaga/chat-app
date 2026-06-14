import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
               "https://chat-appbackend-u7x3.onrender.com/api/auth/register",
                {
                    username,
                    email,
                    password
                }
            );

            alert(res.data.message);

            navigate("/");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Register Failed ❌"
            );
        }
    };

    return (

        <div className="register-container">

            <form
                className="register-form"
                onSubmit={handleRegister}
            >

                <h1>Create Account 🚀</h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button type="submit">
                    Register
                </button>
                console.log("REGISTER CLICKED 🚀");
console.log(username);
console.log(email);
console.log(password);

            </form>

        </div>
    );
}

export default Register;