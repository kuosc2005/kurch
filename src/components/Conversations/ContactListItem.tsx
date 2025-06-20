import React from "react";

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

interface ContactListItemProps {
  contact: Contact;
  isSelected: boolean;
  onClick: (contact: Contact) => void;
}

const ContactListItem: React.FC<ContactListItemProps> = ({
  contact,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(contact)}
      className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? "bg-primary/10 border-r-2 border-primary" : ""
      }`}
    >
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-xl">
          {contact.avatar}
        </div>
        {contact.online && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 truncate">
            {contact.name}
            {contact.isGroup && (
              <span className="ml-1 text-xs text-gray-500">Group</span>
            )}
          </h3>
          <span className="text-xs text-gray-500">{contact.time}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-600 truncate">
            {contact.lastMessage}
          </p>
          {contact.unread > 0 && (
            <span className="bg-primary text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
              {contact.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactListItem;
