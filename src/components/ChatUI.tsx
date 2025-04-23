
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";

const ChatUI = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isUser: boolean }>>([
    { content: "Hi there! How can I help you with your fitness journey today?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { content: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    try {
      // Send message to Zapier chatbot webhook
      const response = await fetch('https://interfaces.zapier.com/embed/chatbot/cm9tzmuxm005b12klbedxuo3o', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Add bot response
        setMessages(prev => [...prev, { content: data.message || "I received your message!", isUser: false }]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    }
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
          />
          <button
            type="submit"
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatUI;
