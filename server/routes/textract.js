const express = require('express');
const { runDetectText, runAnalyze, testConnection } = require('../../api/_lib/textract');

const router = express.Router();

router.get('/health', async (req, res) => {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    return res.status(400).json({ connected: false, error: 'AWS credentials not configured in .env' });
  }
  try {
    await testConnection();
    res.json({ connected: true, region: process.env.AWS_REGION || 'us-east-1' });
  } catch (err) {
    res.status(401).json({ connected: false, error: err.message });
  }
});

router.post('/detect-text', async (req, res) => {
  const { document } = req.body || {};
  if (!document) return res.status(400).json({ error: 'No document provided' });
  try {
    res.json(await runDetectText(document));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/analyze', async (req, res) => {
  const { document, featureTypes } = req.body || {};
  if (!document) return res.status(400).json({ error: 'No document provided' });
  try {
    res.json(await runAnalyze(document, featureTypes || ['FORMS', 'TABLES']));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
