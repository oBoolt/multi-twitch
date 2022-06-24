import React from "react";
import { useDataContext } from "../../contexts/dataContext";

import "./styles.css";

const ChatButton = ({ live, index }) => {
  const { data, setData } = useDataContext();
  const handleChangeChat = (e) => {
    setData((prevData) => ({ ...prevData, channelChat: data.lives[index] }));
  };

  console.log(data.lives[index], data.channelChat);

  return (
    <button
      onClick={handleChangeChat}
      className={data.lives[index] === data.channelChat ? "active" : ""}
    >
      {live}
    </button>
  );
};

export default ChatButton;
