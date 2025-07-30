import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// 简单测试路由
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/write', (req, res) => {
  console.log('Write API called:', req.body);
  res.json({ 
    content: 'This is a test response',
    creditsUsed: 1,
    remainingCredits: 999
  });
});

app.listen(PORT, () => {
  console.log(`🔧 Debug server running at http://localhost:${PORT}`);
  console.log('Routes:');
  console.log(`- GET  http://localhost:${PORT}/api/test`);
  console.log(`- GET  http://localhost:${PORT}/api/health`);
  console.log(`- POST http://localhost:${PORT}/api/write`);
});