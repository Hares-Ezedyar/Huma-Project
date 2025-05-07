import React from 'react';

interface ChannelItemProps {
  name: string;
  type: 'text' | 'upload';
  isActive?: boolean;
  onClick?: () => void;
}

const ChannelItem: React.FC<ChannelItemProps> = ({ 
  name, 
  type, 
  isActive = false, 
  onClick 
}) => {
  return (
    <div 
      className={`px-2 py-1.5 mx-2 rounded flex items-center cursor-pointer hover:bg-discord-secondary/50 ${
        isActive ? 'bg-discord-secondary/80 text-white' : 'text-discord-muted'
      }`}
      onClick={onClick}
    >
      <span className="mr-1.5">
        {type === 'text' ? '#' : '📤'}
      </span>
      {name}
    </div>
  );
};

export default ChannelItem;
