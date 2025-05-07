// Translation service using MarianMT and Google Translate fallback
import fetch from 'node-fetch';

// MarianMT model configuration
const MARIAN_MT_MODEL = 'Helsinki-NLP/opus-mt-en-fa';
const HUGGINGFACE_API = 'https://api-inference.huggingface.co/models/';

// Google Translate API configuration
const GOOGLE_TRANSLATE_API = 'https://translation.googleapis.com/language/translate/v2';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'your-google-api-key';

// Translate text using MarianMT
const translateWithMarianMT = async (text) => {
  try {
    const response = await fetch(`${HUGGINGFACE_API}${MARIAN_MT_MODEL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text,
        options: {
          wait_for_model: true
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`MarianMT API error: ${response.statusText}`);
    }

    const result = await response.json();
    return result[0].translation_text;
  } catch (error) {
    console.error('Error translating with MarianMT:', error);
    return null;
  }
};

// Translate text using Google Translate API (fallback)
const translateWithGoogleTranslate = async (text) => {
  try {
    const response = await fetch(`${GOOGLE_TRANSLATE_API}?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: 'fa',
        format: 'text'
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Translate API error: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error translating with Google Translate:', error);
    return null;
  }
};

// Main translation function with fallback
const translateText = async (text) => {
  console.log('Translating text...');
  
  // Try MarianMT first
  const marianResult = await translateWithMarianMT(text);
  
  if (marianResult) {
    console.log('Translation completed with MarianMT');
    return marianResult;
  }
  
  // Fallback to Google Translate
  console.log('MarianMT translation failed, falling back to Google Translate');
  const googleResult = await translateWithGoogleTranslate(text);
  
  if (googleResult) {
    console.log('Translation completed with Google Translate');
    return googleResult;
  }
  
  // If both fail, return original text
  console.error('All translation methods failed');
  return text;
};

export { translateText, translateWithMarianMT, translateWithGoogleTranslate };
