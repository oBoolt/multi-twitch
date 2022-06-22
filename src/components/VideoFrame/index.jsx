import React from "react";
import { useDataContext } from "../../contexts/dataContext";
import "./styles.css";

const VideoFrame = ({ src, id }) => {
  const { data, setData } = useDataContext();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(id);
    let lives = data.lives;
    lives.splice(id, 1);
    setData((prevData) => {
      return {
        ...prevData,
        lives,
      };
    });

    if (
      localStorage.getItem("lives") == null ||
      localStorage.getItem("lives") == ""
    )
      return;
    const lsLives = localStorage.getItem("lives").split(",");
    lsLives.splice(id, 1);
    localStorage.setItem("lives", lsLives.toString());
  };

  return (
    <div className="video-frame">
      <span className="x" onClick={handleClick}></span>
      <iframe
        src={src}
        frameBorder="0"
        allowFullScreen={true}
        height="100%"
        width="100%"
      ></iframe>
    </div>
  );
};

export default VideoFrame;
