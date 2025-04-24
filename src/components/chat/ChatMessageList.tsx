
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ChatMessage from "../ChatMessage";
import type { ChatMessage as ChatMessageType } from "@/hooks/useChatMessages";

interface ChatMessageListProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  lastFailedMessage: string | null;
  onRetry: () => void;
}

export const ChatMessageList = ({ 
  messages, 
  isLoading, 
  lastFailedMessage, 
  onRetry 
}: ChatMessageListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 p-4"
    >
      <div className="space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            content={message.content}
            isUser={message.isUser}
          />
        ))}
        
        {lastFailedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <Alert variant="destructive" className="bg-gray-800/80 backdrop-blur-sm border-red-500/50">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription className="mt-2">
                Failed to get a response from the fitness assistant.
                <button 
                  onClick={onRetry}
                  className="ml-2 bg-red-500/30 hover:bg-red-500/50 px-3 py-1 rounded-md text-sm text-white transition-colors"
                >
                  Retry
                </button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        
        {isLoading && (
          <ChatMessage
            content={
              <div className="flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            }
            isUser={false}
          />
        )}
      </div>
    </motion.div>
  );
};
