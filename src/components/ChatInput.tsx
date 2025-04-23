
import { useState } from "react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="py-4 px-2"
    >
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md 
                    border border-white/20 text-white placeholder-white/50
                    focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={disabled || !message.trim()}
          className="ml-2 px-4 py-2 rounded-full bg-indigo-500/80 text-white 
                  backdrop-blur-md hover:bg-indigo-600/80 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ChatInput;
