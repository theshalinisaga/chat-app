import React,
{
    useEffect,
    useState,
    useCallback
}
from "react";

import API from "../api/api";

import "../styles/sidebar.css";


const Sidebar = ({
    currentUserId,
    setSelectedUser
}) => {

    const [users, setUsers] =
        useState([]);

console.log("API BASE URL:", API.defaults.baseURL);
console.log("FETCHING USERS...");
    // ================= FETCH USERS =================
    const fetchUsers =
        useCallback(async () => {

            try {

                const res =
                    await API.get(
                        "/users/all-users"
                    );

                console.log(
                    "ALL USERS:",
                    res.data
                );


                // REMOVE LOGGED USER
                const filteredUsers =
                    res.data.filter(

                        (user) =>

                            user.id !==
                            currentUserId
                    );


                setUsers(
                    filteredUsers
                );

            } catch (error) {

                console.log(
                    error.response?.data
                    || error.message
                );
            }

        }, [currentUserId]);


    // ================= LOAD USERS =================
    useEffect(() => {
    const fetchUsers = async () => {
        const res = await API.get("/users/all-users");
        const filtered = res.data.filter(u => u.id !== currentUserId);
        setUsers(filtered);
    };

    fetchUsers();
}, [currentUserId]);
    return (

        <div className="sidebar">

            <div className="sidebar-header">

                Chats 💬

            </div>


            {

                users.map((user) => (

                    <div

                        key={user.id}

                        className="user-card"

                        onClick={() => {

                            console.log(
                                "SELECTED USER:",
                                user
                            );

                            setSelectedUser(
                                user
                            );
                        }}
                    >

                        <h4>

                            {
                                user.username
                            }

                        </h4>

                        <p>

                            {
                                user.email
                            }

                        </p>

                    </div>
                ))
            }

        </div>
    );
};

export default Sidebar;