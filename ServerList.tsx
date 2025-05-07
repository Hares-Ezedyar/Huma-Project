import React from 'react';
import ServerIcon from '../components/ServerIcon';

interface ServerListProps {
  activeServer: string;
  onServerChange: (server: string) => void;
}

const ServerList: React.FC<ServerListProps> = ({ 
  activeServer, 
  onServerChange 
}) => {
  const servers = [
    { id: 'humapress', name: 'HumaPress', shortName: 'HP' },
    { id: 'server-a', name: 'Server A', shortName: 'A' },
    { id: 'server-b', name: 'Server B', shortName: 'B' },
    { id: 'server-c', name: 'Server C', shortName: 'C' },
  ];

  return (
    <div className="w-18 bg-discord-tertiary h-full py-3 flex flex-col items-center gap-2 overflow-y-auto">
      {servers.map(server => (
        <ServerIcon
          key={server.id}
          name={server.shortName}
          isActive={activeServer === server.id}
          onClick={() => onServerChange(server.id)}
        />
      ))}
    </div>
  );
};

export default ServerList;
