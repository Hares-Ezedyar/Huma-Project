import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initPipeline, processBatch } from './src/pipeline.js';
import { supabase } from './src/db.js';

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// API routes
app.get('/api/articles', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*, reactions(*)')
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

app.get('/api/articles/breaking', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*, reactions(*)')
      .eq('is_quarantined', false)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching breaking news:', error);
    res.status(500).json({ error: 'Failed to fetch breaking news' });
  }
});

app.get('/api/articles/quarantine', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*, reactions(*)')
      .eq('is_quarantined', true)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching quarantined articles:', error);
    res.status(500).json({ error: 'Failed to fetch quarantined articles' });
  }
});

app.get('/api/moderation-logs', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('moderation_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching moderation logs:', error);
    res.status(500).json({ error: 'Failed to fetch moderation logs' });
  }
});

app.post('/api/reactions', async (req, res) => {
  try {
    const { article_id, reaction_type } = req.body;
    
    if (!article_id || !reaction_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Update reaction count
    const { data, error } = await supabase.rpc('increment_reaction', {
      p_article_id: article_id,
      p_reaction_type: reaction_type
    });
    
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error updating reaction:', error);
    res.status(500).json({ error: 'Failed to update reaction' });
  }
});

app.post('/api/upload-evidence', async (req, res) => {
  try {
    const { file_data, description } = req.body;
    
    if (!file_data) {
      return res.status(400).json({ error: 'Missing file data' });
    }
    
    // In a real implementation, we would handle file upload to Supabase storage
    // For now, we'll just log the request
    console.log('Evidence upload request received:', { description });
    
    res.json({ success: true, message: 'File upload request received' });
  } catch (error) {
    console.error('Error uploading evidence:', error);
    res.status(500).json({ error: 'Failed to upload evidence' });
  }
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Set up real-time updates from Supabase
  const articlesSubscription = supabase
    .channel('articles-channel')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'articles' }, (payload) => {
      socket.emit('new-article', payload.new);
    })
    .subscribe();
  
  const moderationSubscription = supabase
    .channel('moderation-channel')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'moderation_logs' }, (payload) => {
      socket.emit('new-moderation-log', payload.new);
    })
    .subscribe();
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    supabase.removeChannel(articlesSubscription);
    supabase.removeChannel(moderationSubscription);
  });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Initialize the pipeline
  initPipeline().catch(error => {
    console.error('Error initializing pipeline:', error);
  });
});

// Export for testing
export { app, server };
