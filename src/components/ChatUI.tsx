
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import ChatMessage from "./ChatMessage";

const ChatUI = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 p-4"
      >
        <div className="space-y-4">
          <iframe 
            ref={iframeRef}
            src="https://interfaces.zapier.com/embed/chatbot/cm9tzmuxm005b12klbedxuo3o"
            allow="clipboard-write"
            className="w-full min-h-[600px] bg-transparent"
            style={{
              border: 'none',
              background: 'transparent'
            }}
          />
          <div ref={messagesEndRef} />
        </div>
      </motion.div>
    </div>
  );
};

export default ChatUI;
