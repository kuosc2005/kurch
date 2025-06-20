import React from "react";

interface Message {
  id: number;
  text: string;
  sent: boolean;
  time: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.sent ? "justify-end" : "justify-start"
      }`}
    >
      <div className="max-w-xs lg:max-w-md">
        <div
          className={`px-4 py-2 rounded-2xl ${
            message.sent
              ? "bg-primary text-white rounded-br-md"
              : "bg-white text-gray-800 rounded-bl-md shadow-sm"
          }`}
        >
          <p className="text-sm">{message.text}</p>
        </div>
        <p
          className={`text-xs text-gray-500 mt-1 ${
            message.sent ? "text-right" : "text-left"
          }`}
        >
          {message.time}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
