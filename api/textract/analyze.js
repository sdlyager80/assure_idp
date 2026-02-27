const { runAnalyze } = require('../_lib/textract');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { document, featureTypes } = req.body || {};
  if (!document) return res.status(400).json({ error: 'No document provided' });

  try {
    res.json(await runAnalyze(document, featureTypes || ['FORMS', 'TABLES']));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
