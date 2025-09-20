import React, { useState } from "react";
import { Mic, Send } from "lucide-react";

export default function FarmerChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const getTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = {
      text: input,
      sender: "user",
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate chatbot reply after 500ms
    setTimeout(() => {
      const botMsg = {
        text: `🤖 ${input}`, // chatbot echoes back the same message
        sender: "bot",
        time: getTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleMic = () => {
    alert("🎙️ Mic button clicked (connect speech-to-text here)");
  };

  return (
    <div className="flex flex-col h-[600px] w-[600px]  mx-auto bg-white border shadow-lg rounded-xl overflow-hidden mt-6 mb-5">
      {/* Chat Header */}
      <div className="bg-green-600 text-white text-lg font-semibold p-3">
        AI Farmer Chatbot
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm">Start chatting with AI Farmer 🌱</p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Timestamp (left side of bubble) */}
            <div className="flex items-end space-x-2 max-w-xs">
              {msg.sender === "bot" && (
                <span className="text-xs text-gray-400">{msg.time}</span>
              )}
              <div
                className={`px-4 py-2 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <span className="text-xs text-gray-400">{msg.time}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center border-t p-2 relative">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        {/* Send Button */}
        <button
          onClick={handleSend}
          className="ml-2 p-2 rounded-full bg-green-600 text-white hover:bg-green-700"
        >
          <Send size={18} />
        </button>

        {/* Mic Button */}
        <button
          onClick={handleMic}
          className="ml-2 p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          <Mic size={20} />
        </button>
      </div>
    </div>
  );
}
