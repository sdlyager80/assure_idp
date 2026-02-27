const { runDetectText } = require('../_lib/textract');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { document } = req.body || {};
  if (!document) return res.status(400).json({ error: 'No document provided' });

  try {
    res.json(await runDetectText(document));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
