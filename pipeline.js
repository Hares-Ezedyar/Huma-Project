import { processRssFeeds } from './rss.js';
import { moderateArticle } from './moderation.js';
import { analyzeSentiment, fallbackSentimentAnalysis } from './sentiment.js';
import { translateText } from './translation.js';
import { supabase, initDatabase } from './db.js';

// Process a batch of articles through the complete pipeline
const processBatch = async () => {
  console.log('Starting batch processing...');
  
  try {
    // 1. Fetch articles from RSS feeds
    const articles = await processRssFeeds();
    console.log(`Processing ${articles.length} articles`);
    
    // 2. Process each article
    for (const article of articles) {
      // 3. Analyze sentiment
      let sentimentResult;
      try {
        sentimentResult = await analyzeSentiment(article.content);
      } catch (error) {
        console.error('Error in sentiment analysis, using fallback:', error);
        sentimentResult = fallbackSentimentAnalysis(article.content);
      }
      
      // 4. Apply moderation rules
      const moderationResult = await moderateArticle(article, sentimentResult.polarity);
      
      // Skip blocked articles
      if (moderationResult.isBlocked) {
        console.log(`Article blocked: ${article.title}`);
        continue;
      }
      
      // 5. Translate content for non-blocked articles
      try {
        const translatedTitle = await translateText(article.title);
        const translatedContent = await translateText(article.content);
        
        // 6. Save to database
        const { data, error } = await supabase
          .from('articles')
          .insert([{
            source_name: article.source_name,
            source_icon: article.source_icon,
            title: translatedTitle,
            content: translatedContent,
            original_link: article.original_link,
            original_content: article.original_content,
            hash: article.hash,
            is_quarantined: moderationResult.isQuarantined
          }])
          .select();
        
        if (error) {
          console.error('Error saving article to database:', error);
        } else if (data && data[0]) {
          // Initialize reaction counts
          await supabase
            .from('reactions')
            .insert([
              { article_id: data[0].id, reaction_type: 'like', count: 0 },
              { article_id: data[0].id, reaction_type: 'dislike', count: 0 }
            ]);
          
          console.log(`Article processed and saved: ${translatedTitle}`);
        }
      } catch (error) {
        console.error('Error processing article:', error);
      }
    }
    
    console.log('Batch processing completed');
  } catch (error) {
    console.error('Error in batch processing:', error);
  }
};

// Initialize and run the pipeline
const initPipeline = async () => {
  // Initialize database
  await initDatabase();
  
  // Process first batch
  await processBatch();
  
  // Schedule regular batch processing (every 30 minutes)
  setInterval(processBatch, 30 * 60 * 1000);
  
  console.log('Pipeline initialized and running');
};

export { initPipeline, processBatch };
