import React, {
    useEffect,
    useState,
    useRef,
    useCallback
} from "react";

import API from "../api/api";
import socket from "../sockets/socket";
import "../styles/chatwindow.css";

const ChatWindow = ({
    senderId,
    receiverId,
    selectedUser
}) => {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const messagesEndRef = useRef(null);

    // ================= FETCH MESSAGES =================

    const fetchMessages = useCallback(async () => {

        if (!senderId || !receiverId) return;

        try {

           const res = await API.get(
    `/messages/chat/${senderId}/${receiverId}`
);

            setMessages(
                Array.isArray(res.data)
                    ? res.data
                    : []
            );

        } catch (err) {

            console.log(
                "FETCH ERROR:",
                err.response?.data || err.message
            );

            setMessages([]);
        }

    }, [senderId, receiverId]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    // ================= SOCKET =================

    useEffect(() => {

        if (!senderId) return;

        socket.emit(
            "join_room",
            senderId
        );

        const receiveHandler = (data) => {

            setMessages(prev => [
                ...prev,
                data
            ]);
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

    }, [senderId]);

    // ================= AUTO SCROLL =================

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    // ================= SEND MESSAGE =================

    const sendMessage = async () => {

        if (!message.trim()) return;

        const msgData = {
            sender_id: senderId,
            receiver_id: receiverId,
            message: message.trim()
        };

        try {

            console.log(
                "SENDING:",
                msgData
            );

            await API.post(
                "/messages/send",
                msgData
            );

            socket.emit(
                "send_message",
                msgData
            );

            setMessages(prev => [
                ...prev,
                msgData
            ]);

            setMessage("");

        } catch (err) {

            console.log(
                "SEND ERROR:",
                err.response?.data || err.message
            );
        }
    };

    return (

        <div className="chat-window">

            {/* HEADER */}

            <div className="chat-header">

                <h3>
                    {selectedUser?.username}
                </h3>

            </div>

            {/* BODY */}

            <div className="chat-body">

                {messages.length === 0 ? (

                    <p className="empty-chat">
                        No messages yet 💬
                    </p>

                ) : (

                    messages.map((msg, index) => (

                        <div
                            key={index}
                            className={
                                msg.sender_id === senderId
                                    ? "message-row own"
                                    : "message-row"
                            }
                        >

                            <div
                                className={
                                    msg.sender_id === senderId
                                        ? "message own-msg"
                                        : "message"
                                }
                            >
                                {msg.message}
                            </div>

                        </div>
                    ))
                )}

                <div ref={messagesEndRef}></div>

            </div>

            {/* FOOTER */}

            <div className="chat-footer">

                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                />

                <button
                    onClick={sendMessage}
                >
                    Send
                </button>

            </div>

        </div>
    );
};

export default ChatWindow;