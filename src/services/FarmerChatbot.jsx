import React, { useRef, useState, useEffect } from "react";
import { Mic, Send, Volume2 } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function FarmerChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const getTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Typing animation for bot message
  const typeMessage = (fullText, callback) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        callback(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20); // typing speed (ms per char)
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {
      text: input,
      sender: "user",
      time: getTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/ai/chat`, {
        prompt: input,
      });

      const botText = response.data.response || "⚠️ No response";
      const botMsg = {
        text: "", // start empty for typing
        sender: "bot",
        time: getTime(),
      };
      setMessages((prev) => [...prev, botMsg]);

      // Typing animation
      typeMessage(botText, (current) => {
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 1 ? { ...msg, text: current } : msg
          )
        );
      });
    } catch (error) {
      const errorMsg = {
        text: "⚠️ Failed to get response",
        sender: "bot",
        time: getTime(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleMic = async () => {
  if (recording) {
    // agar already record ho raha hai to stop karo
    mediaRecorderRef.current.stop();
    setRecording(false);
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("file", audioBlob, "speech.wav");

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_URL}/nlp/speech-to-text`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const recognizedText = res.data.text;
        if (recognizedText) {
          // 🎤 Mic se aaya text auto-send
          setInput(recognizedText);
          setTimeout(() => handleSend(), 500); // thoda delay ke baad auto send
        }
      } catch (err) {
        console.error("Speech-to-text error", err);
      }
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  } catch (error) {
    console.error("Mic access denied", error);
    alert("🎙️ Please allow microphone access.");
  }
};

  // -----------------------
  // Text-to-Speech (Speaker)
  // -----------------------
  const handleSpeak = async (text) => {
    try {
      console.log("hellp");
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/nlp/text-to-speech`,
        new URLSearchParams({ text }),
        { responseType: "blob" }
      );
      const audioUrl = URL.createObjectURL(res.data);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("TTS error", error);
    }
  };

  // const handleMic = () => {
  //   alert("🎙️ Mic button clicked (connect speech-to-text here)");
  // };

  return (
    <div className="flex flex-col h-[600px] w-[1000px] mx-auto bg-white border shadow-lg rounded-xl overflow-hidden mt-20 mb-5">
      {/* Chat Header */}
      <div className="bg-green-600 text-white text-lg font-semibold p-3">
        AI Farmer Chatbot
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm">
            Start chatting with AI Farmer 🌱
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div className="flex items-end space-x-2 max-w-xs">
              {msg.sender === "bot" && (
                <span className="text-xs text-gray-400">{msg.time}</span>
              )}
              <div
                className={`px-4 py-2 rounded-2xl whitespace-pre-wrap break-words ${msg.sender === "user"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800"
                  }`}
              >
                {msg.sender === "bot" ? (
                  <div className="relative">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                    <button
                      onClick={() => handleSpeak(msg.text)}
                      className="absolute top-1 right-1 text-gray-600 hover:text-green-600"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>

                ) : (
                  msg.text
                )}
              </div>
              {msg.sender === "user" && (
                <span className="text-xs text-gray-400">{msg.time}</span>
              )}
            </div>
          </div>
        ))}

        {/* Loader */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl animate-pulse">
              Typing...
            </div>
          </div>
        )}
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
        <button
          onClick={handleSend}
          className="ml-2 p-2 rounded-full bg-green-600 text-white hover:bg-green-700"
        >
          <Send size={18} />
        </button>
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
