import React from 'react';
import ChannelItem from '../components/ChannelItem';

interface ChannelListProps {
  activeChannel: string;
  onChannelChange: (channel: string) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({ 
  activeChannel, 
  onChannelChange 
}) => {
  const channels = [
    { id: 'breaking-news', name: 'breaking-news', type: 'text' as const },
    { id: 'moderation-log', name: 'moderation-log', type: 'text' as const },
    { id: 'quarantine', name: 'quarantine', type: 'text' as const },
    { id: 'evidence-upload', name: 'evidence-upload', type: 'upload' as const },
  ];

  return (
    <div className="w-60 bg-discord-secondary h-full flex flex-col">
      <div className="px-4 py-3 text-xs font-bold text-discord-muted uppercase">
        Channels
      </div>
      <div className="flex-1 overflow-y-auto">
        {channels.slice(0, 3).map(channel => (
          <ChannelItem
            key={channel.id}
            name={channel.name}
            type={channel.type}
            isActive={activeChannel === channel.id}
            onClick={() => onChannelChange(channel.id)}
          />
        ))}
        
        <div className="px-4 py-3 text-xs font-bold text-discord-muted uppercase mt-4">
          Upload
        </div>
        
        {channels.slice(3).map(channel => (
          <ChannelItem
            key={channel.id}
            name={channel.name}
            type={channel.type}
            isActive={activeChannel === channel.id}
            onClick={() => onChannelChange(channel.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChannelList;
