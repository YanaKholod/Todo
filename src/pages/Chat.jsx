import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const newSocket = new WebSocket("wss://backtodo.onrender.com");
    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      const message = event.data;

      const reader = new FileReader();
      reader.onload = (e) => {
        const messageString = e.target.result;

        try {
          const parsedMessage = JSON.parse(messageString);
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.readAsText(message);
    };
    return () => {
      newSocket.close();
    };
  }, []);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = () => {
    if (newMessage) {
      const message = {
        text: newMessage,
        sender: user.fullName,
        role: user.role,
      };

      socket.send(JSON.stringify(message));
      addMessage(message);
      setNewMessage("");
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div>
        <input type="text" value={newMessage} onChange={handleInputChange} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
