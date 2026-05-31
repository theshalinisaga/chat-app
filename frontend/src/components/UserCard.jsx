import React from "react";

import { useNavigate } from "react-router-dom";

import "../styles/sidebar.css";

function UserCard({ user }) {

    const navigate = useNavigate();

    const openChat = () => {

        navigate(

            "/chat",

            {
                state: {
                    user
                }
            }
        );
    };

    return (

        <div className="user-card">

            <div className="user-left">

                <div className="avatar">

                    {
                        user.username
                        ? user.username[0].toUpperCase()
                        : "U"
                    }

                </div>

                <div>

                    <h3>
                        {user.username}
                    </h3>

                    <p>
                        {user.email}
                    </p>

                </div>

            </div>

            <button onClick={openChat}>
                Chat
            </button>

        </div>
    );
}

export default UserCard;