import React from "react";

import "../styles/message.css";

function MessageBubble({ text, own }) {

    return (

        <div className={own ? "my-message" : "other-message"}>

            {text}

        </div>
    );
}

export default MessageBubble;