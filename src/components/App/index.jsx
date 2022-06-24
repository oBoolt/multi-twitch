import { useEffect } from "react";
import { useDataContext } from "../../contexts/dataContext";
import VideoFrame from "../VideoFrame";
import LiveChat from "../LiveChat";
import ChatButton from "../ChatButton";
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

   const handleClearAll = (e) => {
      setData((prevData) => {
         localStorage.removeItem("lives");
         return {
            ...prevData,
            channelChat: "",
            lives: [],
         };
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setData((prevData) => ({ ...prevData, errorMessage: "" }));
      if (data.channel == "")
         return setData((prevData) => ({
            ...prevData,
            errorMessage: "The field cannot be empty",
         }));
      if (data.lives.some((live) => live === data.channel))
         return setData((prevData) => ({
            ...prevData,
            channel: "",
            errorMessage: "Channel already in the list",
         }));
      data.lives.push(data.channel.toLowerCase());
      setData((prevData) => {
         localStorage.setItem("lives", data.lives.toString());
         return { ...prevData, channelChat: data.lives.at(-1), channel: "" };
      });
   };

   useEffect(() => {
      if (
         localStorage.getItem("lives") == null ||
         localStorage.getItem("lives") == ""
      )
         return;
      const lives = localStorage.getItem("lives").split(",");
      setData((prevData) => ({ ...prevData, lives, channelChat: lives[0] }));
   }, []);

   return (
      <div className="App">
         <main
            style={
               data.lives.length != 0
                  ? { paddingRight: "20%" }
                  : { paddingRight: "0" }
            }
         >
            <div className="header">
               <h1 className="logo">
                  Multi<span style={{ color: "#a970ff" }}>Twitch</span>
               </h1>
               {data.errorMessage != "" && (
                  <span className="error">{data.errorMessage}</span>
               )}
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
               <button className="clear" onClick={handleClearAll}>
                  Clear
               </button>
            </div>
            {data.lives.length != 0 ? (
               <>
                  <div className="lives">
                     {data.lives.map((live, index) => (
                        <VideoFrame
                           src={`https://player.twitch.tv/?channel=${live}&parent=localhost&muted=true`}
                           id={index}
                           key={index}
                        />
                     ))}
                  </div>
               </>
            ) : (
               <div className="no-live">
                  <h1>
                     Add a livestream by writing the name of the creator and
                     clicking on the "Add Live" button
                  </h1>
               </div>
            )}
         </main>
         {data.channelChat != "" && (
            <div className="chats">
               <div className="buttons">
                  {data.lives.map((live, index) => (
                     <ChatButton live={live} index={index} key={index} />
                  ))}
               </div>
               <LiveChat
                  src={`https://www.twitch.tv/embed/${data.channelChat}/chat?parent=localhost`}
               />
            </div>
         )}
      </div>
   );
}

export default App;
