import React from "react";

import "./styles.css";

const LiveChat = ({ src }) => {
  return (
    <div className="chat">
      <iframe
        id="chat_embed"
        src={src}
        height="100%"
        width="100%"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default LiveChat;
