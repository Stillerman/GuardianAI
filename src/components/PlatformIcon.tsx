import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Image from 'next/image';

type Platform = 'Instagram' | 'WhatsApp' | 'Twitter' | 'Facebook' | 'TikTok' | 
                'YouTube' | 'Discord' | 'Snapchat' | 'Reddit' | 'Twitch' | 
                'imessage' | string;

const platformIcons: Record<Platform, string> = {
  'Instagram': '/icons/instagram.svg',
  'WhatsApp': '/icons/whatsapp.svg',
  'Twitter': '/icons/twitter.svg',
  'Facebook': '/icons/facebook.svg',
  'TikTok': '/icons/tiktok.svg',
  'YouTube': '/icons/youtube.svg',
  'Discord': '/icons/discord.svg',
  'Snapchat': '/icons/snapchat.svg',
  'Reddit': '/icons/reddit.svg',
  'Twitch': '/icons/twitch.svg',
  'imessage': '/icons/imessage.svg'
};

export function PlatformIcon({ platform }: { platform: string }) {
  const iconPath = platformIcons[platform];

  if (!iconPath) {
    return <AlertTriangle className="h-6 w-6 text-gray-500" />;
  }

  return (
    <Image
      src={iconPath}
      alt={platform}
      width={24}
      height={24}
      className="w-6 h-6"
    />
  );
}