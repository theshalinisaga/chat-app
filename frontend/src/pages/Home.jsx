import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Home() {

    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    // 🔥 LOAD MESSAGES WHEN USER CHANGES
    useEffect(() => {
        if (!selectedUser) return;

        fetch(`http://localhost:5000/api/messages/chat/${user.id}/${selectedUser.id}`)
            .then(res => res.json())
            .then(data => setMessages(data));

    }, [selectedUser]);

    return (
        <div style={{ display: "flex" }}>

            {/* SIDEBAR */}
            <Sidebar
                currentUserId={user.id}
                setSelectedUser={setSelectedUser}
            />

            {/* CHAT BOX */}
            <div>
                {selectedUser ? (
                    <>
                        <h3>Chat with {selectedUser.username}</h3>

                        {messages.map(msg => (
                            <div key={msg.id}>
                                {msg.message}
                            </div>
                        ))}
                    </>
                ) : (
                    <h3>Select a user</h3>
                )}
            </div>

        </div>
    );
}

export default Home;