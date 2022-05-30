import React, { useState } from "react";
import { io } from "socket.io-client";

const Socket = () => {
  const BASEURL = "http://localhost:5555";
  const socket = io(BASEURL);
  const [message, setMessage] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", currentMessage);
    setCurrentMessage("");
  };
  socket.on("new-message", (message2) => {
    setMessage([...message, message2]);
  });

  return (
    <>
      <ul id="messages">
        {message?.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          autoComplete="off"
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button>Send</button>
      </form>
    </>
  );
};

export default Socket;
