import React from 'react';

interface ServerIconProps {
  name: string;
  isActive?: boolean;
  onClick?: () => void;
}

const ServerIcon: React.FC<ServerIconProps> = ({ 
  name, 
  isActive = false, 
  onClick 
}) => {
  return (
    <div 
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold cursor-pointer transition-all duration-200 hover:rounded-2xl hover:bg-discord-accent ${
        isActive ? 'rounded-2xl bg-discord-accent' : 'bg-discord-primary'
      }`}
      onClick={onClick}
    >
      {name.substring(0, 2)}
    </div>
  );
};

export default ServerIcon;
