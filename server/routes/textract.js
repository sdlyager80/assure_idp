const express = require('express');
const multer = require('multer');
const {
  TextractClient,
  DetectDocumentTextCommand,
  AnalyzeDocumentCommand,
} = require('@aws-sdk/client-textract');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

function getClient() {
  return new TextractClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
}

// GET /api/textract/health - test AWS connection
router.get('/health', async (req, res) => {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    return res.status(400).json({ connected: false, error: 'AWS credentials not configured in .env' });
  }
  try {
    // Minimal call to verify credentials work
    const client = getClient();
    // DetectDocumentText with a 1x1 white PNG to test auth without processing a real doc
    const testPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    await client.send(new DetectDocumentTextCommand({ Document: { Bytes: testPng } }));
    res.json({ connected: true, region: process.env.AWS_REGION || 'us-east-1' });
  } catch (err) {
    // InvalidParameterException means creds work but the tiny PNG isn't a valid doc - that's fine
    if (err.name === 'InvalidParameterException' || err.name === 'UnsupportedDocumentException') {
      res.json({ connected: true, region: process.env.AWS_REGION || 'us-east-1' });
    } else {
      res.status(401).json({ connected: false, error: err.message });
    }
  }
});

// POST /api/textract/detect-text - raw OCR
router.post('/detect-text', upload.single('document'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No document uploaded' });
  try {
    const client = getClient();
    const command = new DetectDocumentTextCommand({
      Document: { Bytes: req.file.buffer },
    });
    const response = await client.send(command);
    const lines = response.Blocks
      .filter(b => b.BlockType === 'LINE')
      .map(b => ({ text: b.Text, confidence: b.Confidence, geometry: b.Geometry }));
    res.json({
      type: 'detect-text',
      pageCount: response.DocumentMetadata?.Pages || 1,
      lines,
      rawBlocks: response.Blocks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/textract/analyze - forms, tables, queries
router.post('/analyze', upload.single('document'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No document uploaded' });

  const featureTypes = req.body.featureTypes
    ? JSON.parse(req.body.featureTypes)
    : ['FORMS', 'TABLES'];

  try {
    const client = getClient();
    const command = new AnalyzeDocumentCommand({
      Document: { Bytes: req.file.buffer },
      FeatureTypes: featureTypes,
    });
    const response = await client.send(command);

    const result = {
      type: 'analyze',
      pageCount: response.DocumentMetadata?.Pages || 1,
      featureTypes,
      keyValuePairs: [],
      tables: [],
      lines: [],
      rawBlocks: response.Blocks,
    };

    // Extract lines
    result.lines = response.Blocks
      .filter(b => b.BlockType === 'LINE')
      .map(b => ({ text: b.Text, confidence: b.Confidence }));

    // Build block map for relationships
    const blockMap = {};
    response.Blocks.forEach(b => { blockMap[b.Id] = b; });

    // Extract key-value pairs (FORMS)
    if (featureTypes.includes('FORMS')) {
      const keyBlocks = response.Blocks.filter(
        b => b.BlockType === 'KEY_VALUE_SET' && b.EntityTypes?.includes('KEY')
      );
      keyBlocks.forEach(keyBlock => {
        const key = getTextFromBlock(keyBlock, blockMap);
        const valueBlock = keyBlock.Relationships?.find(r => r.Type === 'VALUE')
          ?.Ids?.map(id => blockMap[id])?.[0];
        const value = valueBlock ? getTextFromBlock(valueBlock, blockMap) : '';
        if (key) result.keyValuePairs.push({ key, value, confidence: keyBlock.Confidence });
      });
    }

    // Extract tables
    if (featureTypes.includes('TABLES')) {
      const tableBlocks = response.Blocks.filter(b => b.BlockType === 'TABLE');
      tableBlocks.forEach(tableBlock => {
        const cells = [];
        tableBlock.Relationships?.forEach(rel => {
          if (rel.Type === 'CHILD') {
            rel.Ids.forEach(id => {
              const cell = blockMap[id];
              if (cell?.BlockType === 'CELL') {
                cells.push({
                  rowIndex: cell.RowIndex,
                  columnIndex: cell.ColumnIndex,
                  rowSpan: cell.RowSpan,
                  columnSpan: cell.ColumnSpan,
                  text: getTextFromBlock(cell, blockMap),
                  confidence: cell.Confidence,
                });
              }
            });
          }
        });
        result.tables.push({ cells });
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function getTextFromBlock(block, blockMap) {
  if (!block.Relationships) return '';
  const words = [];
  block.Relationships.forEach(rel => {
    if (rel.Type === 'CHILD') {
      rel.Ids.forEach(id => {
        const child = blockMap[id];
        if (child?.BlockType === 'WORD') words.push(child.Text);
        if (child?.BlockType === 'SELECTION_ELEMENT') {
          words.push(child.SelectionStatus === 'SELECTED' ? '[X]' : '[ ]');
        }
      });
    }
  });
  return words.join(' ');
}

module.exports = router;
