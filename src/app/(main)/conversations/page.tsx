"use client";
import React, { useState } from "react";
import ContactsSidebar from "@/components/Conversations/ContactsSidebar";
import ChatArea from "@/components/Conversations/ChatArea";

export default function MessengerChat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  // Mock data
  const contacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Hey! How are you doing?",
      time: "2m",
      avatar: "👩‍💼",
      online: true,
      unread: 2,
    },
    {
      id: 2,
      name: "Team Alpha",
      lastMessage: "Meeting at 3 PM tomorrow",
      time: "5m",
      avatar: "👥",
      online: false,
      unread: 0,
      isGroup: true,
    },
    {
      id: 3,
      name: "Mike Chen",
      lastMessage: "Thanks for the help!",
      time: "1h",
      avatar: "👨‍💻",
      online: true,
      unread: 0,
    },
    {
      id: 4,
      name: "Design Team",
      lastMessage: "New mockups are ready",
      time: "2h",
      avatar: "🎨",
      online: false,
      unread: 1,
      isGroup: true,
    },
    {
      id: 5,
      name: "Emma Wilson",
      lastMessage: "See you later!",
      time: "3h",
      avatar: "👩‍🎓",
      online: false,
      unread: 0,
    },
    {
      id: 6,
      name: "Development",
      lastMessage: "Code review completed",
      time: "4h",
      avatar: "💻",
      online: false,
      unread: 3,
      isGroup: true,
    },
    {
      id: 7,
      name: "Alex Rodriguez",
      lastMessage: "Perfect! Let me know",
      time: "1d",
      avatar: "👨‍🚀",
      online: true,
      unread: 0,
    },
    {
      id: 8,
      name: "Sarah Johnson",
      lastMessage: "Hey! How are you doing?",
      time: "2m",
      avatar: "👩‍💼",
      online: true,
      unread: 2,
    },
    {
      id: 9,
      name: "Sarah Johnson",
      lastMessage: "Hey! How are you doing?",
      time: "2m",
      avatar: "👩‍💼",
      online: true,
      unread: 2,
    },
    {
      id: 10,
      name: "Sarah Johnson",
      lastMessage: "Hey! How are you doing?",
      time: "2m",
      avatar: "👩‍💼",
      online: true,
      unread: 2,
    },
    {
      id: 11,
      name: "Sarah Johnson",
      lastMessage: "Hey! How are you doing?",
      time: "2m",
      avatar: "👩‍💼",
      online: true,
      unread: 2,
    },
  ];

  const messages = [
    { id: 1, text: "Hey! How are you doing?", sent: false, time: "10:30 AM" },
    {
      id: 2,
      text: "I'm doing great! Just finished the project we discussed",
      sent: true,
      time: "10:32 AM",
    },
    {
      id: 3,
      text: "That's awesome! I'd love to see it",
      sent: false,
      time: "10:33 AM",
    },
    {
      id: 7,
      text: "That's awesome! I'd love to see it",
      sent: false,
      time: "10:33 AM",
    },
    {
      id: 12,
      text: "That's awesome! I'd love to see it",
      sent: false,
      time: "10:33 AM",
    },
    {
      id: 18,
      text: "That's awesome! I'd love to see it",
      sent: false,
      time: "10:33 AM",
    },

    {
      id: 4,
      text: "I'll send you the link in a moment",
      sent: true,
      time: "10:35 AM",
    },
    { id: 5, text: "Looking forward to it! 🚀", sent: false, time: "10:36 AM" },
  ];

  const handleChatSelect = (contact) => {
    setSelectedChat(contact);
    // On mobile, hide sidebar when chat is selected
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const handleBackToSidebar = () => {
    setShowSidebar(true);
    setSelectedChat(null);
  };

  const sendMessage = () => {
    if (message.trim()) {
      // Add message logic here
      setMessage("");
    }
  };

  return (
    <div className="flex h-[calc(100vh-60px)] overflow-hidden">
      <ContactsSidebar
        contacts={contacts}
        selectedChat={selectedChat}
        showSidebar={showSidebar}
        onChatSelect={handleChatSelect}
      />

      <ChatArea
        selectedChat={selectedChat}
        messages={messages}
        message={message}
        showSidebar={showSidebar}
        onBackToSidebar={handleBackToSidebar}
        onMessageChange={setMessage}
        onSendMessage={sendMessage}
      />
    </div>
  );
}
