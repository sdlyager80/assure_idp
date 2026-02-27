require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const textractRoutes = require('./routes/textract');

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '10mb' }));

app.use('/api/textract', textractRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Assure IDP server running on http://localhost:${PORT}`);
  console.log(`AWS Region: ${process.env.AWS_REGION || 'us-east-1'}`);
});
