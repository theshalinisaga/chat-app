import React from "react";

import { useNavigate }
from "react-router-dom";

import "../styles/navbar.css";


const Navbar = () => {

    const navigate =
        useNavigate();


    // ================= LOGOUT =================
    const handleLogout = () => {

        console.log(
            "LOGOUT CLICKED 🚀"
        );

        // REMOVE TOKEN
        localStorage.removeItem(
            "token"
        );

        // REMOVE USER
        localStorage.removeItem(
            "user"
        );

        alert(
            "Logout Success 🚀"
        );

        // REDIRECT LOGIN PAGE
        navigate("/");
    };


    return (

        <div className="navbar">

            {/* LOGO */}
            <h2 className="navbar-title">

                Chat App 🚀

            </h2>


            {/* LOGOUT BUTTON */}
            <button

                onClick={
                    handleLogout
                }

                className="logout-btn"
            >

                Logout

            </button>

        </div>
    );
};

export default Navbar;