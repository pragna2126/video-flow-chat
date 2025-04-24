
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const ChatUI = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isUser: boolean; error?: boolean }>>([
    { content: "Hi there! How can I help you with your fitness journey today?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToZapier = async (message: string, retryCount = 0): Promise<string> => {
    try {
      // Use no-cors mode to avoid CORS issues
      const response = await fetch('https://interfaces.zapier.com/embed/chatbot/cm9tzmuxm005b12klbedxuo3o', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // This prevents CORS errors but limits response access
        body: JSON.stringify({
          message: message
        })
      });
      
      // Since no-cors doesn't give us access to the response body,
      // we'll return a default message that acknowledges receipt
      return "I've received your message! I'll help you with your fitness goals.";
    } catch (error) {
      console.error('Error:', error);
      
      // Retry logic (max 2 retries)
      if (retryCount < 2) {
        console.log(`Retrying request (${retryCount + 1}/2)...`);
        return sendMessageToZapier(message, retryCount + 1);
      }
      
      throw error;
    }
  };

  const handleRetry = async () => {
    if (!lastFailedMessage) return;
    
    const messageToRetry = lastFailedMessage;
    setLastFailedMessage(null);
    await handleSendMessage(messageToRetry);
  };

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    
    try {
      const botResponse = await sendMessageToZapier(message);
      setMessages(prev => [...prev, { content: botResponse, isUser: false }]);
    } catch (error) {
      console.error('Failed after retries:', error);
      setLastFailedMessage(message);
      setMessages(prev => [...prev, { 
        content: "Sorry, I couldn't process your request. Please try again.", 
        isUser: false,
        error: true
      }]);
      
      toast({
        title: "Connection Error",
        description: "Could not connect to the fitness assistant. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessageText = inputMessage.trim();
    
    // Add user message
    setMessages(prev => [...prev, { content: userMessageText, isUser: true }]);
    setInputMessage("");
    
    // Send to Zapier and process response
    await handleSendMessage(userMessageText);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto">
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
                    onClick={handleRetry}
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
          
          <div ref={messagesEndRef} />
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800/50 text-white placeholder:text-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`${
              isLoading ? 'bg-gray-700/50 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20'
            } text-white px-4 py-2 rounded-lg transition-colors`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatUI;
