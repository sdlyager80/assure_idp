const { testConnection } = require('../_lib/textract');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    return res.status(400).json({ connected: false, error: 'AWS credentials not configured' });
  }

  try {
    await testConnection();
    res.json({ connected: true, region: process.env.AWS_REGION || 'us-east-1' });
  } catch (err) {
    res.status(401).json({ connected: false, error: err.message });
  }
};
