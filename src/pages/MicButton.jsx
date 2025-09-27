// MicButton.jsx
import React from "react";
import { Mic } from "lucide-react"; // lucide-react icons (npm i lucide-react)

const MicButton = () => {
  const handleMicClick = () => {
    console.log("Mic button clicked!");
    // yaha tum speech recognition / audio recording logic add kar sakte ho
  };

  return (
    <button
      onClick={handleMicClick}
      className="fixed bottom-6 right-6 p-4 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition"
    >
      <Mic size={24} />
    </button>
  );
};

export default MicButton;
