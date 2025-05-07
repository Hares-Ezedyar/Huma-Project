# HumaPress - Discord-style News Aggregator

A Discord-style news aggregator for Afghanistan content in Farsi with moderation features and translation capabilities.

## Features

- **Discord-like UI** with dark theme
  - `#breaking-news`: Auto-updating article feed
  - `#moderation-log`: Displays SHA-256 hashes of blocked Taliban-related articles
  - `#quarantine`: Articles with low sentiment scores
  - 👍/👎 reactions per article (stored in Supabase)

- **Moderation Pipeline**
  - Regex Blocklist: [طالبان, امارت اسلامی, داعش, کابُل تحت کنترل]
  - spaCy Sentiment Check: Flag articles with `polarity < 0.2`

- **Translation**
  - MarianMT (Helsinki-NLP/opus-mt-en-fa) for offline Farsi translation
  - Google Translate API fallback

- **File Upload**
  - Evidence upload functionality for crimes against humanity

## Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: Supabase
- **Hosting**: Vercel (frontend) + Supabase (backend)
- **Real-time Updates**: WebSockets via Socket.IO

## Project Structure

```
humapress/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── layouts/    # Page layouts
│   │   ├── hooks/      # Custom React hooks
│   │   ├── utils/      # Utility functions
│   │   └── styles/     # CSS styles
│   └── public/         # Static assets
├── backend/            # Node.js backend application
│   ├── src/
│   │   ├── db.js       # Database configuration
│   │   ├── rss.js      # RSS feed fetcher
│   │   ├── moderation.js # Content moderation
│   │   ├── sentiment.js # Sentiment analysis
│   │   ├── translation.js # Translation service
│   │   └── pipeline.js # Data processing pipeline
│   └── index.js        # Main server file
└── docs/               # Documentation
    └── figma/          # UI design files
```

## Setup Instructions

### Prerequisites

- Node.js 16+
- npm or yarn
- Supabase account
- Vercel account

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/humapress.git
   cd humapress
   ```

2. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```
   cd ../backend
   npm install
   ```

4. Set up environment variables:
   - Create `.env` file in the frontend directory
   - Create `.env` file in the backend directory

5. Start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

6. Start the backend server:
   ```
   cd backend
   npm start
   ```

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure build settings:
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm install`

### Backend (Supabase)

1. Create a new project in Supabase
2. Set up database tables using the SQL scripts provided
3. Configure environment variables in Vercel for the frontend

## License

MIT
