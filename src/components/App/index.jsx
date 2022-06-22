import { useEffect } from "react";
import { useDataContext } from "../../contexts/dataContext";
import VideoFrame from "../VideoFrame";
import "./styles.css";

function App() {
  const { data, setData } = useDataContext();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.channel != "") data.lives.push(data.channel.toLowerCase());
    setData((prevData) => {
      localStorage.setItem("lives", data.lives.toString());
      return { ...prevData, channel: "" };
    });
  };

  useEffect(() => {
    if (
      localStorage.getItem("lives") == null ||
      localStorage.getItem("lives") == ""
    )
      return;
    const lives = localStorage.getItem("lives").split(",");
    setData({ lives, channel: "" });
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1 className="logo">
          Multi<span style={{ color: "#a970ff" }}>Twitch</span>
        </h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="channel"
            name="channel"
            value={data.channel}
            onChange={handleChange}
            autoComplete="off"
          />
          <button className="btn">Add Live</button>
        </form>
      </div>
      {data.lives.length != 0 ? (
        <div className="lives">
          {data.lives.map((live, index) => (
            <VideoFrame
              src={`https://player.twitch.tv/?channel=${live}&parent=localhost&muted=true`}
              id={index}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="no-live">
          <h1>
            Add some live by writing the name of the creator and clicking on the
            "Add Live" button
          </h1>
        </div>
      )}
    </div>
  );
}

export default App;
