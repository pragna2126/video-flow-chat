
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
      className="py-4 px-4"
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          placeholder="Ask anything..."
          className="flex-1 px-4 py-3 rounded-full bg-gray-800/80 backdrop-blur-md 
                    border border-gray-700/50 text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={disabled || !message.trim()}
          className="px-6 py-3 rounded-full bg-gray-800/80 text-white 
                    backdrop-blur-md hover:bg-gray-700/80 transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed
                    border border-gray-700/50"
        >
          Send
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ChatInput;
