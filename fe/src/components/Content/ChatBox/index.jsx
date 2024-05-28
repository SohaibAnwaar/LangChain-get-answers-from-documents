import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuiv4 } from "uuid";
import PropTypes from "prop-types";

const ChatBox = ({ messages, setMessages, onReplyClick }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user's message
    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);

    // Clear input field
    setInput("");

    try {
      // Set loading to true
      setLoading(true);

      // Send the message to the API and get the response
      const response = await axios.post(
        "http://localhost:8000/api/chatbot/query/",
        {
          query: input,
        }
      );
      const reply = response.data;

      // Add the API's response to the chat
      const replyMessage = {
        id: uuiv4(),
        text: reply.response,
        sender: "api",
        ...response?.data,
      };
      setMessages((prevMessages) => [...prevMessages, replyMessage]);
    } catch (error) {
      console.error("Error sending message to API:", error);
    } finally {
      // Set loading to false
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="container">
      <div className="h-96 overflow-y-scroll p-4 border rounded-lg bg-base-100 shadow-lg">
        {messages.map((msg) => (
          <React.Fragment key={uuiv4()}>
            {msg.sender === "api" ? (
              <button
                className="chat chat-end w-full"
                onClick={() => onReplyClick(msg)}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Shell Bot" src="/shell.svg" />
                  </div>
                </div>
                <div className="chat-bubble text-black bg-cyan-500">
                  {msg.text}
                </div>
              </button>
            ) : (
              <div className="chat chat-start">
                <div className="chat-bubble">{msg.text}</div>
              </div>
            )}
          </React.Fragment>
        ))}

        {loading && (
          <div className="flex justify-end">
            <span className="loading loading-infinity loading-md text-error"></span>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          className="input input-bordered flex-grow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          onKeyDown={handleKeyPress}
        />
        <button
          className="btn btn-primary ml-2 bg-cyan-500 text-black border-none"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

ChatBox.propTypes = {
  onReplyClick: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  setMessages: PropTypes.func.isRequired,
};

export default ChatBox;
