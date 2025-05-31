"use client";

import { Eye, Share, Github, ExternalLink } from "lucide-react";

interface ActionButtonsProps {
  project: {
    likes: number;
    views: number;
  };
}

export function ActionButtons({ project }: ActionButtonsProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this project",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleGitHub = () => {
    // Open GitHub repository
    window.open("https://github.com", "_blank");
  };

  const handleLiveDemo = () => {
    // Open live demo
    window.open("https://demo.example.com", "_blank");
  };

  return (
    <div className="flex items-center gap-3">
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
        <Eye className="w-4 h-4" />
        {project.views}
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <Share className="w-4 h-4" />
        Share
      </button>

      <button
        onClick={handleGitHub}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <Github className="w-4 h-4" />
        GitHub
      </button>

      <button
        onClick={handleLiveDemo}
        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-lg transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
        Live Demo
      </button>
    </div>
  );
}
