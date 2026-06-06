import React from "react";

import "../styles/message.css";

function MessageBubble({ text, own }) {

    return (
    
        <div className="chat-messages">

    {messages.map((msg) => (

        <MessageBubble
            key={msg.id}
            text={msg.message}
            own={msg.sender_id === currentUser.id}
        />

    ))}

</div>
       
    );
}

export default MessageBubble;