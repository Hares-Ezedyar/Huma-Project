import Parser from 'rss-parser';
import fetch from 'node-fetch';
import { supabase, generateHash } from './db.js';

// Initialize RSS parser
const parser = new Parser();

// List of RSS feeds to fetch
const rssSources = [
  { 
    url: 'https://www.bbc.com/persian/afghanistan/rss.xml', 
    name: 'BBC Persian',
    icon: 'BBC'
  },
  { 
    url: 'https://www.dw.com/fa-af/afghanistan/rss', 
    name: 'Deutsche Welle',
    icon: 'DW'
  },
  { 
    url: 'https://www.voanews.com/api/zmgqoe_em-i', 
    name: 'VOA Dari',
    icon: 'VOA'
  },
  { 
    url: 'https://www.rferl.org/api/zrqiteuuipt', 
    name: 'Radio Free Europe/Radio Liberty',
    icon: 'RFE'
  },
  { 
    url: 'https://www.aljazeera.com/xml/rss/all.xml', 
    name: 'Al Jazeera',
    icon: 'AJ'
  },
  // Additional sources would be added here
];

// Fetch articles from RSS feeds
const fetchRssFeeds = async () => {
  console.log('Fetching RSS feeds...');
  
  const articles = [];
  
  for (const source of rssSources) {
    try {
      console.log(`Fetching from ${source.name}...`);
      const feed = await parser.parseURL(source.url);
      
      for (const item of feed.items) {
        const article = {
          source_name: source.name,
          source_icon: source.icon,
          title: item.title || 'No Title',
          content: item.contentSnippet || item.content || 'No Content',
          original_link: item.link || '',
          original_content: item.content || '',
          created_at: item.pubDate ? new Date(item.pubDate) : new Date(),
        };
        
        // Generate hash for the article
        article.hash = generateHash(article.title + article.content);
        
        articles.push(article);
      }
      
      console.log(`Fetched ${feed.items.length} articles from ${source.name}`);
    } catch (error) {
      console.error(`Error fetching from ${source.name}:`, error);
    }
  }
  
  return articles;
};

// Save articles to database
const saveArticles = async (articles) => {
  console.log(`Saving ${articles.length} articles to database...`);
  
  for (const article of articles) {
    try {
      // Check if article already exists
      const { data: existingArticle } = await supabase
        .from('articles')
        .select('id')
        .eq('hash', article.hash)
        .single();
      
      if (!existingArticle) {
        // Insert new article
        const { error } = await supabase
          .from('articles')
          .insert([article]);
        
        if (error) {
          console.error('Error saving article:', error);
        } else {
          // Initialize reaction counts
          await supabase
            .from('reactions')
            .insert([
              { article_id: article.id, reaction_type: 'like', count: 0 },
              { article_id: article.id, reaction_type: 'dislike', count: 0 }
            ]);
        }
      }
    } catch (error) {
      console.error('Error processing article:', error);
    }
  }
  
  console.log('Articles saved successfully');
};

// Main function to fetch and process RSS feeds
const processRssFeeds = async () => {
  const articles = await fetchRssFeeds();
  await saveArticles(articles);
  return articles;
};

export { processRssFeeds, fetchRssFeeds, saveArticles };
