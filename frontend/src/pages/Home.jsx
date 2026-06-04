import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
function Home() {

    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    // 🔥 LOAD MESSAGES WHEN USER CHANGES
    useEffect(() => {

        if (!selectedUser) return;

        const fetchMessages = async () => {
            try {
                console.log("Loading chat...");

                const res = await fetch(
                    `http://localhost:5000/api/messages/chat/${user.id}/${selectedUser.id}`
                );

                const data = await res.json();

                console.log("MESSAGES:", data);

                setMessages(data);

            } catch (err) {
                console.log("Message load error:", err);
            }
        };

        fetchMessages();

    }, [selectedUser]);

    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* SIDEBAR */}
            <Sidebar
                currentUserId={user.id}
                setSelectedUser={setSelectedUser}
            />

            {/* CHAT AREA */}
            <div style={{ flex: 1, padding: "20px" }}>

                {selectedUser ? (
                    <>
                        <h3>Chat with {selectedUser.username}</h3>

                        <div style={{ marginTop: "20px" }}>
                            {messages.length === 0 ? (
                                <p>No messages yet</p>
                            ) : (
                                messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        style={{
                                            padding: "8px",
                                            margin: "5px",
                                            background: msg.sender_id === user.id ? "#d1f7c4" : "#f1f1f1",
                                            alignSelf: msg.sender_id === user.id ? "flex-end" : "flex-start",
                                            maxWidth: "60%",
                                            borderRadius: "8px"
                                        }}
                                    >
                                        {msg.message}
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                ) : (
                    <h3>Select a user to start chat 💬</h3>
                )}

            </div>

        </div>
    );
}

export default Home;