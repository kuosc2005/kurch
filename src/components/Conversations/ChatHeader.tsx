import React from "react";
import { Phone, Video, Info, ArrowLeft } from "lucide-react";

interface Contact {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
}

interface ChatHeaderProps {
  selectedChat: Contact;
  onBackClick: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedChat,
  onBackClick,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        <button
          onClick={onBackClick}
          className="md:hidden mr-3 p-1 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-lg mr-3">
          {selectedChat.avatar}
        </div>
        <div>
          <h2 className="font-semibold text-gray-800">{selectedChat.name}</h2>
          <p className="text-sm text-gray-500">
            {selectedChat.online ? "Active now" : "Last seen 2h ago"}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Phone className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Video className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Info className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
