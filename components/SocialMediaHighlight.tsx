import React, { useState, useEffect } from 'react';
import { Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

interface SocialMediaHighlightProps {
  instagramFollowers: number;
  youtubeSubscribers: number;
}

const SocialMediaHighlight: React.FC<SocialMediaHighlightProps> = ({ instagramFollowers, youtubeSubscribers }) => {
  const [animatedInstagram, setAnimatedInstagram] = useState(0);
  const [animatedYoutube, setAnimatedYoutube] = useState(0);

  useEffect(() => {
    const duration = 2000; // Animation duration in milliseconds
    const frames = 60; // Number of frames for the animation
    const instagramIncrement = instagramFollowers / frames;
    const youtubeIncrement = youtubeSubscribers / frames;

    let frame = 0;
    const timer = setInterval(() => {
      setAnimatedInstagram(Math.min(Math.round(instagramIncrement * frame), instagramFollowers));
      setAnimatedYoutube(Math.min(Math.round(youtubeIncrement * frame), youtubeSubscribers));
      frame++;
      if (frame === frames) clearInterval(timer);
    }, duration / frames);

    return () => clearInterval(timer);
  }, [instagramFollowers, youtubeSubscribers]);

  return (
    <div className="flex justify-center items-center space-x-8 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <Link href="https://www.instagram.com/fizzielts_" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center space-y-2">
        <Instagram className="w-12 h-12 text-white animate-pulse" />
        <span className="text-2xl font-bold text-white">{animatedInstagram.toLocaleString()}</span>
        <span className="text-sm text-white opacity-75">Instagram Followers</span>
      </Link>
      <div className="w-px h-20 bg-white opacity-50" />
      <Link href="https://www.youtube.com/channel/UC00TKKcxBkzCqksskJ9J_Iw" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center space-y-2">
        <Youtube className="w-12 h-12 text-white animate-pulse" />
        <span className="text-2xl font-bold text-white">{animatedYoutube.toLocaleString()}</span>
        <span className="text-sm text-white opacity-75">YouTube Subscribers</span>
      </Link>
    </div>
  );
};

export default SocialMediaHighlight;