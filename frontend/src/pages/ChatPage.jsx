import React from "react";

import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

import ChatWindow from "../components/ChatWindow";

function ChatPage() {

    const location = useLocation();

    const selectedUser =
    location.state?.user;

    return (

        <div>

            <Navbar />

            <div style={{ display: "flex" }}>

                <Sidebar />

                <ChatWindow
                    selectedUser={selectedUser}
                />

            </div>

        </div>
    );
}

export default ChatPage;