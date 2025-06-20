import React from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

interface Contact {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
}

interface Message {
  id: number;
  text: string;
  sent: boolean;
  time: string;
}

interface ChatAreaProps {
  selectedChat: Contact | null;
  messages: Message[];
  message: string;
  showSidebar: boolean;
  onBackToSidebar: () => void;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedChat,
  messages,
  message,
  showSidebar,
  onBackToSidebar,
  onMessageChange,
  onSendMessage,
}) => {
  return (
    <div
      className={`${
        !showSidebar ? "flex" : "hidden"
      } md:flex flex-col flex-1 bg-white`}
    >
      {selectedChat ? (
        <>
          <ChatHeader
            selectedChat={selectedChat}
            onBackClick={onBackToSidebar}
          />

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>

          <MessageInput
            message={message}
            onMessageChange={onMessageChange}
            onSendMessage={onSendMessage}
          />
        </>
      ) : (
        /* Welcome Screen */
        <div className="hidden md:flex flex-col items-center justify-center h-full bg-gray-50">
          <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-4xl mb-6">
            💬
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Conversations
          </h2>
          <p className="text-gray-600 text-center max-w-md">
            Select a conversation from the sidebar to start chatting with your
            friends and colleagues.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
