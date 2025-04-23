
import { motion } from "framer-motion";

export interface ChatMessageProps {
  content: string;
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
        className={`relative max-w-[80%] px-4 py-2 rounded-2xl 
          ${isUser 
            ? 'rounded-tr-none bg-indigo-500/40 backdrop-blur-md' 
            : 'rounded-tl-none bg-gray-400/40 backdrop-blur-md'
          }
          shadow-xl text-white`}
      >
        <div className="relative z-10">{content}</div>
        {timestamp && (
          <div className="text-xs opacity-70 text-right mt-1">{timestamp}</div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
