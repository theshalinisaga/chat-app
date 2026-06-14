import React, { useState } from "react";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

function Home() {

    const [selectedUser, setSelectedUser] = useState(null);

   const user = JSON.parse(
 localStorage.getItem("user")
 || "{}"
);
if (!user.id) {
   return <h2>User Not Found</h2>;
}

    return (

        <div
            style={{
                display: "flex",
                height: "100vh",
                background: "#f5f7fb"
            }}
        >

            {/* ================= SIDEBAR ================= */}

            <Sidebar
                currentUserId={user.id}
                setSelectedUser={setSelectedUser}
            />

            {/* ================= CHAT AREA ================= */}

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                {

                    selectedUser ? (

                        <ChatWindow

                            senderId={user.id}

                            receiverId={selectedUser.id}

                            selectedUser={selectedUser}

                        />

                    ) : (

                        <div
                            style={{
                                flex: 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "22px",
                                fontWeight: "500",
                                color: "#666"
                            }}
                        >

                            Select a user to start chatting 💬

                        </div>

                    )
                }

            </div>

        </div>
    );
}

export default Home;