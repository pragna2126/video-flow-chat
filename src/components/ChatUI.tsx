
import { useRef, useEffect } from "react";
import { useChatMessages } from "@/hooks/useChatMessages";
import { ChatMessageList } from "./chat/ChatMessageList";
import { ChatInput } from "./chat/ChatInput";

const ChatUI = () => {
  const { 
    messages, 
    isLoading, 
    lastFailedMessage, 
    sendMessage, 
    retryMessage, 
    addMessage 
  } = useChatMessages();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    // Add user message immediately
    addMessage({ content: messageText, isUser: true });
    
    // Send to API and handle response
    await sendMessage(messageText);
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      retryMessage(lastFailedMessage);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto">
      <ChatMessageList
        messages={messages}
        isLoading={isLoading}
        lastFailedMessage={lastFailedMessage}
        onRetry={handleRetry}
      />
      <div ref={messagesEndRef} />
      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatUI;
