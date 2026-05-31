import React,
{
    useEffect,
    useState,
    useRef,
    useCallback
}
from "react";

import API from "../api/api";

import "../styles/chatwindow.css";

import socket from "../sockets/socket";


const ChatWindow = ({
    senderId,
    receiverId,
    selectedUser
}) => {

    // ================= STATES =================

    const [messages, setMessages] =
        useState([]);

    const [message, setMessage] =
        useState("");

    const messagesEndRef =
        useRef(null);



    // ================= FETCH MESSAGES =================

    const fetchMessages =
        useCallback(async () => {

            try {

                if (
                    !senderId ||
                    !receiverId
                ) return;


                console.log(
                    "FETCHING MESSAGES 🚀"
                );


                const res =
                    await API.get(
                        "/messages/get",
                        {
                            params: {

                                sender_id:
                                    senderId,

                                receiver_id:
                                    receiverId
                            }
                        }
                    );


                console.log(
                    "MESSAGES:",
                    res.data
                );


                setMessages(
                    res.data
                );

            } catch (error) {

                console.log(
                    "FETCH ERROR:",
                    error.response?.data
                    || error.message
                );
            }

        }, [
            senderId,
            receiverId
        ]);



    // ================= LOAD MESSAGES =================

    useEffect(() => {

        fetchMessages();

    }, [fetchMessages]);



    // ================= SOCKET ROOM =================

    useEffect(() => {

        if (!senderId) return;


        socket.emit(
            "join_room",
            senderId
        );


        console.log(
            "ROOM JOINED:",
            senderId
        );

    }, [senderId]);



    // ================= RECEIVE REALTIME =================

    useEffect(() => {

        const receiveHandler =
            (data) => {

                console.log(
                    "REALTIME:",
                    data
                );

                setMessages(
                    (prev) => [
                        ...prev,
                        data
                    ]
                );
            };


        socket.on(
            "receive_message",
            receiveHandler
        );


        return () => {

            socket.off(
                "receive_message",
                receiveHandler
            );
        };

    }, []);



    // ================= AUTO SCROLL =================

    useEffect(() => {

        messagesEndRef.current
            ?.scrollIntoView({

                behavior: "smooth"
            });

    }, [messages]);



    // ================= SEND MESSAGE =================

    const sendMessage =
        async () => {

            try {

                if (
                    message.trim() === ""
                ) return;


                const msgData = {

                    sender_id:
                        senderId,

                    receiver_id:
                        receiverId,

                    message
                };


                console.log(
                    "SENDING:",
                    msgData
                );


                // ================= SAVE TO DB =================

                const res =
                    await API.post(
                        "/messages/send",
                        msgData
                    );


                console.log(
                    "SAVED:",
                    res.data
                );


                // ================= SOCKET EMIT =================

                socket.emit(
                    "send_message",
                    msgData
                );


                // ================= UI UPDATE =================

                setMessages(
                    (prev) => [
                        ...prev,
                        msgData
                    ]
                );


                // ================= CLEAR INPUT =================

                setMessage("");

            } catch (error) {

                console.log(
                    "SEND ERROR:",
                    error.response?.data
                    || error.message
                );
            }
        };



    return (

        <div className="chat-window">

            {/* ================= HEADER ================= */}

            <div className="chat-header">

                <div>

                    <h3>

                        {
                            selectedUser
                                ?.username
                        }

                    </h3>

                    <small>

                        Online

                    </small>

                </div>

            </div>



            {/* ================= CHAT BODY ================= */}

            <div className="chat-body">

                {
                    messages.map(
                        (msg, index) => (

                            <div

                                key={index}

                                className={

                                    msg.sender_id
                                        === senderId

                                        ? "message-row own"

                                        : "message-row"
                                }
                            >

                                <div

                                    className={

                                        msg.sender_id
                                            === senderId

                                            ? "message own-msg"

                                            : "message"
                                    }
                                >

                                    {
                                        msg.message
                                    }

                                </div>

                            </div>
                        ))
                }


                {/* ================= AUTO SCROLL ================= */}

                <div
                    ref={messagesEndRef}
                />

            </div>



            {/* ================= FOOTER ================= */}

            <div className="chat-footer">

                <input

                    type="text"

                    placeholder=
                    "Type a message..."

                    value={message}

                    onChange={(e) =>
                        setMessage(
                            e.target.value
                        )
                    }

                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter"
                        ) {

                            sendMessage();
                        }
                    }}
                />


                <button
                    onClick={
                        sendMessage
                    }
                >

                    Send

                </button>

            </div>

        </div>
    );
};

export default ChatWindow;