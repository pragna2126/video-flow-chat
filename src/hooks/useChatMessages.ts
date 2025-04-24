
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export type ChatMessage = {
  content: string | React.ReactNode;
  isUser: boolean;
  error?: boolean;
};

export const useChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { content: "Hi there! How can I help you with your fitness journey today?", isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const sendMessageToZapier = async (message: string, retryCount = 0): Promise<string> => {
    try {
      const response = await fetch('https://interfaces.zapier.com/embed/chatbot/cm9tzmuxm005b12klbedxuo3o', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message
        })
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      try {
        const data = await response.json();
        return data.response || "I've processed your request, but I'm not sure how to respond to that.";
      } catch (e) {
        console.warn("Could not parse JSON from response:", e);
        const textResponse = await response.text();
        return textResponse || "I received your message but couldn't generate a proper response.";
      }
    } catch (error) {
      console.error('Error:', error);
      
      if (retryCount < 2) {
        console.log(`Retrying request (${retryCount + 1}/2)...`);
        return sendMessageToZapier(message, retryCount + 1);
      }
      
      throw error;
    }
  };

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    
    try {
      const botResponse = await sendMessageToZapier(message);
      setMessages(prev => [...prev, { content: botResponse, isUser: false }]);
    } catch (error) {
      console.error('Failed after retries:', error);
      
      try {
        console.log("Attempting fallback approach with no-cors mode...");
        const response = await fetch('https://interfaces.zapier.com/embed/chatbot/cm9tzmuxm005b12klbedxuo3o', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify({
            message: message
          })
        });
        
        setMessages(prev => [...prev, { 
          content: "I've received your message! I'll try to help with your fitness goals, but I'm having trouble with my connection.", 
          isUser: false 
        }]);
        
        toast({
          title: "Limited Connection",
          description: "Running in limited mode due to connection restrictions. Responses may be generic.",
          variant: "default",
        });
      } catch (fallbackError) {
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
      }
    } finally {
      setIsLoading(false);
    }
  };

  const retryMessage = async (messageToRetry: string) => {
    setLastFailedMessage(null);
    await handleSendMessage(messageToRetry);
  };

  return {
    messages,
    isLoading,
    lastFailedMessage,
    sendMessage: handleSendMessage,
    retryMessage,
    addMessage: (message: ChatMessage) => setMessages(prev => [...prev, message])
  };
};
