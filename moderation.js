// Regex patterns for content moderation
const regexBlocklist = [
  'طالبان',
  'امارت اسلامی',
  'داعش',
  'کابُل تحت کنترل'
];

// Compile regex patterns
const blocklistRegex = new RegExp(regexBlocklist.join('|'), 'i');

// Check if content contains blocked terms
const containsBlockedTerms = (text) => {
  return blocklistRegex.test(text);
};

// Check if content should be quarantined based on sentiment
const shouldQuarantine = (sentiment) => {
  return sentiment < 0.2;
};

// Process article through moderation pipeline
const moderateArticle = async (article, sentiment = 0.5) => {
  const result = {
    isBlocked: false,
    isQuarantined: false,
    reason: null
  };

  // Check title and content against regex blocklist
  if (containsBlockedTerms(article.title) || containsBlockedTerms(article.content)) {
    result.isBlocked = true;
    
    // Find which term triggered the block
    for (const term of regexBlocklist) {
      const regex = new RegExp(term, 'i');
      if (regex.test(article.title) || regex.test(article.content)) {
        result.reason = `Matched regex pattern [${term}]`;
        break;
      }
    }
    
    // Log moderation action
    await logModeration(article.hash, result.reason);
  }
  
  // Check sentiment for quarantine
  if (!result.isBlocked && shouldQuarantine(sentiment)) {
    result.isQuarantined = true;
    result.reason = `Low sentiment score: ${sentiment}`;
  }
  
  return result;
};

// Log moderation action to database
const logModeration = async (articleHash, reason) => {
  try {
    const { error } = await supabase
      .from('moderation_logs')
      .insert([{
        article_hash: articleHash,
        reason: reason
      }]);
    
    if (error) {
      console.error('Error logging moderation action:', error);
    }
  } catch (error) {
    console.error('Error in logModeration:', error);
  }
};

export { moderateArticle, containsBlockedTerms, shouldQuarantine, regexBlocklist };
