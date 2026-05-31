import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Home = () => {

    const [selectedUser, setSelectedUser] =
        useState(null);

    const user =
        JSON.parse(localStorage.getItem("user"));

    return (

        <div>

            <Navbar />

            <div
                style={{

                    display: "flex",

                    height: "90vh"
                }}
            >

                <Sidebar
                    currentUserId={user.id}
                    setSelectedUser={setSelectedUser}
                />

                {
                    selectedUser ? (

                        <ChatWindow
                            senderId={user.id}
                            receiverId={selectedUser.id}
                            selectedUser={selectedUser}
                        />

                    ) : (

                        <div style={{

                            width: "70%",

                            display: "flex",

                            justifyContent: "center",

                            alignItems: "center",

                            fontSize: "22px",

                            color: "gray"
                        }}>

                            Select User To Chat 💬

                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default Home;