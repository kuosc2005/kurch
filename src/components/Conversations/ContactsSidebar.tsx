import React from "react";
import { Search } from "lucide-react";
import ContactListItem from "./ContactListItem";

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  online: boolean;
  unread: number;
  isGroup?: boolean;
}

interface ContactsSidebarProps {
  contacts: Contact[];
  selectedChat: Contact | null;
  showSidebar: boolean;
  onChatSelect: (contact: Contact) => void;
}

const ContactsSidebar: React.FC<ContactsSidebarProps> = ({
  contacts,
  selectedChat,
  showSidebar,
  onChatSelect,
}) => {
  return (
    <div
      className={`${
        showSidebar ? "flex" : "hidden"
      } md:flex flex-col w-full md:w-80 bg-white border-r border-gray-200`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800 mb-3">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            isSelected={selectedChat?.id === contact.id}
            onClick={onChatSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactsSidebar;
