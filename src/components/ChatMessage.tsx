
import { motion } from "framer-motion";
import React from "react";

export interface ChatMessageProps {
  content: string | React.ReactNode;
  isUser: boolean;
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, isUser, timestamp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`relative max-w-[80%] px-6 py-3 rounded-2xl 
          ${isUser 
            ? 'bg-gray-800/80 backdrop-blur-md rounded-tr-none' 
            : 'bg-gray-700/80 backdrop-blur-md rounded-tl-none'
          }
          shadow-lg text-gray-100`}
      >
        <div className="relative z-10">{content}</div>
        {timestamp && (
          <div className="text-xs text-gray-400 text-right mt-1">{timestamp}</div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
