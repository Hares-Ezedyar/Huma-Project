import React from 'react';
import ArticleCard from '../components/ArticleCard';
import FileUpload from '../components/FileUpload';

interface ChannelContentProps {
  channelId: string;
  articles?: Array<{
    id: string;
    source: {
      name: string;
      icon: string;
    };
    timestamp: string;
    title: string;
    content: string;
    reactions: {
      likes: number;
      dislikes: number;
    };
    originalLink: string;
    isQuarantined?: boolean;
  }>;
  moderationLogs?: Array<{
    id: string;
    timestamp: string;
    hash: string;
    reason: string;
  }>;
}

const ChannelContent: React.FC<ChannelContentProps> = ({
  channelId,
  articles = [],
  moderationLogs = []
}) => {
  const handleFileSelect = (files: FileList) => {
    console.log('Files selected:', files);
    // Here we would handle file upload to Supabase
  };

  return (
    <div className="flex-1 bg-discord-primary flex flex-col">
      <div className="h-12 border-b border-discord-tertiary px-4 flex items-center font-bold">
        # {channelId}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {channelId === 'breaking-news' && articles.filter(a => !a.isQuarantined).map(article => (
          <ArticleCard
            key={article.id}
            source={article.source}
            timestamp={article.timestamp}
            title={article.title}
            content={article.content}
            reactions={article.reactions}
            originalLink={article.originalLink}
          />
        ))}

        {channelId === 'quarantine' && articles.filter(a => a.isQuarantined).map(article => (
          <ArticleCard
            key={article.id}
            source={article.source}
            timestamp={article.timestamp}
            title={article.title}
            content={article.content}
            reactions={article.reactions}
            originalLink={article.originalLink}
            isQuarantined={true}
          />
        ))}

        {channelId === 'moderation-log' && moderationLogs.map(log => (
          <div key={log.id} className="mb-2 p-3 bg-discord-secondary rounded">
            <div className="text-xs text-discord-muted mb-1">{log.timestamp}</div>
            <div className="font-mono text-sm break-all">SHA-256: {log.hash}</div>
            <div className="mt-1 text-sm">Reason: {log.reason}</div>
          </div>
        ))}

        {channelId === 'evidence-upload' && (
          <div>
            <div className="mb-4">
              برای آپلود مدارک و شواهد جرایم علیه بشریت، از فرم زیر استفاده کنید.
            </div>
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelContent;
