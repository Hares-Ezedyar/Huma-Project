import React from 'react';

interface ArticleCardProps {
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
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  source,
  timestamp,
  title,
  content,
  reactions,
  originalLink,
  isQuarantined = false
}) => {
  return (
    <div className="mb-6 p-3 rounded bg-discord-secondary hover:bg-discord-secondary/80 transition-colors duration-200">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-discord-accent mr-2 flex items-center justify-center text-white font-bold">
          {source.icon}
        </div>
        <div className="flex-1">
          <div className="font-bold text-white">{source.name}</div>
          <div className="text-xs text-discord-muted">{timestamp}</div>
        </div>
        {isQuarantined && (
          <div className="inline-block px-1.5 py-0.5 bg-discord-warning text-white rounded text-xs">
            Quarantined
          </div>
        )}
      </div>
      <div className="font-bold mb-2 text-base">{title}</div>
      <div className="mb-3 leading-relaxed">{content}</div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-2">
          <button className="px-2 py-1 rounded bg-discord-primary hover:bg-discord-primary/80 flex items-center gap-1">
            👍 {reactions.likes}
          </button>
          <button className="px-2 py-1 rounded bg-discord-primary hover:bg-discord-primary/80 flex items-center gap-1">
            👎 {reactions.dislikes}
          </button>
        </div>
        <a 
          href={originalLink} 
          className="text-discord-link hover:underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          مشاهده مقاله اصلی
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
