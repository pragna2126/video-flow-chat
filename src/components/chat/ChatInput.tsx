
import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const messageText = inputMessage.trim();
    setInputMessage("");
    onSendMessage(messageText);
  };

  return (
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
  );
};
