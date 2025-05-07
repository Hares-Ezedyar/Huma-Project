import { spacy } from 'spacy-js';

// Initialize spaCy model
let nlp;

const initSpacy = async () => {
  try {
    // Load the English model for sentiment analysis
    nlp = await spacy.load('en_core_web_sm');
    console.log('spaCy model loaded successfully');
    return true;
  } catch (error) {
    console.error('Error loading spaCy model:', error);
    return false;
  }
};

// Analyze sentiment of text
const analyzeSentiment = async (text) => {
  if (!nlp) {
    await initSpacy();
  }
  
  try {
    // Process the text with spaCy
    const doc = await nlp(text);
    
    // Calculate sentiment score
    // This is a simplified approach - in a real implementation,
    // we would use a more sophisticated sentiment analysis
    let positiveWords = 0;
    let negativeWords = 0;
    let totalWords = 0;
    
    for (const token of doc.tokens) {
      if (token.is_alpha && !token.is_stop) {
        totalWords++;
        
        // Simple word-based sentiment analysis
        // In a real implementation, we would use a proper sentiment lexicon
        if (['good', 'great', 'excellent', 'positive', 'happy', 'peace'].includes(token.text.toLowerCase())) {
          positiveWords++;
        } else if (['bad', 'terrible', 'negative', 'sad', 'war', 'conflict', 'attack'].includes(token.text.toLowerCase())) {
          negativeWords++;
        }
      }
    }
    
    // Calculate polarity score (0 to 1)
    const polarity = totalWords > 0 ? (positiveWords / totalWords) : 0.5;
    
    return {
      polarity,
      positiveWords,
      negativeWords,
      totalWords
    };
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    // Return a neutral sentiment if analysis fails
    return {
      polarity: 0.5,
      positiveWords: 0,
      negativeWords: 0,
      totalWords: 0
    };
  }
};

// Fallback sentiment analysis when spaCy is not available
const fallbackSentimentAnalysis = (text) => {
  // Very simple word-based sentiment analysis
  const positiveWords = ['good', 'great', 'excellent', 'positive', 'happy', 'peace'];
  const negativeWords = ['bad', 'terrible', 'negative', 'sad', 'war', 'conflict', 'attack'];
  
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  for (const word of words) {
    if (positiveWords.includes(word)) {
      positiveCount++;
    } else if (negativeWords.includes(word)) {
      negativeCount++;
    }
  }
  
  const totalWords = words.length;
  const polarity = totalWords > 0 ? (positiveCount / totalWords) : 0.5;
  
  return {
    polarity,
    positiveWords: positiveCount,
    negativeWords: negativeCount,
    totalWords
  };
};

export { initSpacy, analyzeSentiment, fallbackSentimentAnalysis };
