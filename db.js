import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// These will be replaced with actual values during deployment
const supabaseUrl = process.env.SUPABASE_URL || 'https://example.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'your-service-key';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Define database schema
const createTables = async () => {
  try {
    // Articles table
    const { error: articlesError } = await supabase
      .from('articles')
      .select('id')
      .limit(1)
      .catch(() => ({ error: { message: 'Table does not exist' } }));

    if (articlesError) {
      console.log('Creating articles table...');
      await supabase.rpc('create_articles_table');
    }

    // Reactions table
    const { error: reactionsError } = await supabase
      .from('reactions')
      .select('id')
      .limit(1)
      .catch(() => ({ error: { message: 'Table does not exist' } }));

    if (reactionsError) {
      console.log('Creating reactions table...');
      await supabase.rpc('create_reactions_table');
    }

    // Moderation logs table
    const { error: moderationLogsError } = await supabase
      .from('moderation_logs')
      .select('id')
      .limit(1)
      .catch(() => ({ error: { message: 'Table does not exist' } }));

    if (moderationLogsError) {
      console.log('Creating moderation_logs table...');
      await supabase.rpc('create_moderation_logs_table');
    }

    // Evidence files table
    const { error: evidenceFilesError } = await supabase
      .from('evidence_files')
      .select('id')
      .limit(1)
      .catch(() => ({ error: { message: 'Table does not exist' } }));

    if (evidenceFilesError) {
      console.log('Creating evidence_files table...');
      await supabase.rpc('create_evidence_files_table');
    }

    console.log('Database schema setup complete');
  } catch (error) {
    console.error('Error setting up database schema:', error);
  }
};

// SQL functions to create tables
const createArticlesTableSQL = `
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_name TEXT NOT NULL,
  source_icon TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  original_link TEXT NOT NULL,
  original_content TEXT,
  hash TEXT NOT NULL,
  is_quarantined BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_articles_created_at ON articles(created_at);
CREATE INDEX idx_articles_hash ON articles(hash);
`;

const createReactionsTableSQL = `
CREATE TABLE reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(article_id, reaction_type)
);

CREATE INDEX idx_reactions_article_id ON reactions(article_id);
`;

const createModerationLogsTableSQL = `
CREATE TABLE moderation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_hash TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_moderation_logs_created_at ON moderation_logs(created_at);
`;

const createEvidenceFilesTableSQL = `
CREATE TABLE evidence_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_evidence_files_created_at ON evidence_files(created_at);
`;

// Create stored procedures for table creation
const setupStoredProcedures = async () => {
  try {
    await supabase.rpc('create_articles_table', {}, { head: true }).catch(() => {
      return supabase.sql`
        CREATE OR REPLACE FUNCTION create_articles_table()
        RETURNS VOID AS $$
        BEGIN
          ${createArticlesTableSQL}
        END;
        $$ LANGUAGE plpgsql;
      `;
    });

    await supabase.rpc('create_reactions_table', {}, { head: true }).catch(() => {
      return supabase.sql`
        CREATE OR REPLACE FUNCTION create_reactions_table()
        RETURNS VOID AS $$
        BEGIN
          ${createReactionsTableSQL}
        END;
        $$ LANGUAGE plpgsql;
      `;
    });

    await supabase.rpc('create_moderation_logs_table', {}, { head: true }).catch(() => {
      return supabase.sql`
        CREATE OR REPLACE FUNCTION create_moderation_logs_table()
        RETURNS VOID AS $$
        BEGIN
          ${createModerationLogsTableSQL}
        END;
        $$ LANGUAGE plpgsql;
      `;
    });

    await supabase.rpc('create_evidence_files_table', {}, { head: true }).catch(() => {
      return supabase.sql`
        CREATE OR REPLACE FUNCTION create_evidence_files_table()
        RETURNS VOID AS $$
        BEGIN
          ${createEvidenceFilesTableSQL}
        END;
        $$ LANGUAGE plpgsql;
      `;
    });

    console.log('Stored procedures created successfully');
  } catch (error) {
    console.error('Error creating stored procedures:', error);
  }
};

// Initialize database
const initDatabase = async () => {
  await setupStoredProcedures();
  await createTables();
};

// Helper function to generate SHA-256 hash
const generateHash = (text) => {
  return crypto.createHash('sha256').update(text).digest('hex');
};

export { supabase, initDatabase, generateHash };
