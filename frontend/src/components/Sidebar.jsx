import React, { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/sidebar.css";
const Sidebar = ({ currentUserId, setSelectedUser }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
    
        const fetchUsers = async () => {
            try {
                const res = await API.get("https://chat-appbackend-u7x3.onrender.com/api/users/all-users");

                console.log("ALL USERS:", res.data);

                const filtered = res.data.filter(
                    (user) => user.id !== currentUserId
                );

                setUsers(filtered);

            } catch (err) {
                console.log("Sidebar Error:", err);
            }
        };

        fetchUsers();

    }, [currentUserId]);

    return (
        <div className="sidebar">

            <div className="sidebar-header">
                💬 Chats
            </div>

            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                users.map((user) => (
                    <div
                        key={user.id}
                        className="user-card"
                        onClick={() => setSelectedUser(user)}
                    >
                        <h4>{user.username}</h4>
                        <p>{user.email}</p>
                    </div>
                ))
            )}

        </div>
        
    );
};

export default Sidebar;