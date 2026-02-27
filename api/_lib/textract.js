const {
  TextractClient,
  DetectDocumentTextCommand,
  AnalyzeDocumentCommand,
} = require('@aws-sdk/client-textract');

function getClient() {
  return new TextractClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
}

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

async function runDetectText(base64) {
  const client = getClient();
  const response = await client.send(new DetectDocumentTextCommand({
    Document: { Bytes: Buffer.from(base64, 'base64') },
  }));
  return {
    type: 'detect-text',
    pageCount: response.DocumentMetadata?.Pages || 1,
    lines: response.Blocks
      .filter(b => b.BlockType === 'LINE')
      .map(b => ({ text: b.Text, confidence: b.Confidence })),
  };
}

async function runAnalyze(base64, featureTypes = ['FORMS', 'TABLES']) {
  const client = getClient();
  const response = await client.send(new AnalyzeDocumentCommand({
    Document: { Bytes: Buffer.from(base64, 'base64') },
    FeatureTypes: featureTypes,
  }));

  const blockMap = {};
  response.Blocks.forEach(b => { blockMap[b.Id] = b; });

  const result = {
    type: 'analyze',
    pageCount: response.DocumentMetadata?.Pages || 1,
    featureTypes,
    keyValuePairs: [],
    tables: [],
    lines: response.Blocks
      .filter(b => b.BlockType === 'LINE')
      .map(b => ({ text: b.Text, confidence: b.Confidence })),
  };

  if (featureTypes.includes('FORMS')) {
    response.Blocks
      .filter(b => b.BlockType === 'KEY_VALUE_SET' && b.EntityTypes?.includes('KEY'))
      .forEach(keyBlock => {
        const key = getTextFromBlock(keyBlock, blockMap);
        const valueBlock = keyBlock.Relationships?.find(r => r.Type === 'VALUE')
          ?.Ids?.map(id => blockMap[id])?.[0];
        const value = valueBlock ? getTextFromBlock(valueBlock, blockMap) : '';
        if (key) result.keyValuePairs.push({ key, value, confidence: keyBlock.Confidence });
      });
  }

  if (featureTypes.includes('TABLES')) {
    response.Blocks
      .filter(b => b.BlockType === 'TABLE')
      .forEach(tableBlock => {
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

  return result;
}

async function testConnection() {
  const client = getClient();
  const testPng = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );
  try {
    await client.send(new DetectDocumentTextCommand({ Document: { Bytes: testPng } }));
  } catch (err) {
    // InvalidParameterException / UnsupportedDocumentException = creds are valid
    if (err.name !== 'InvalidParameterException' && err.name !== 'UnsupportedDocumentException') {
      throw err;
    }
  }
}

module.exports = { runDetectText, runAnalyze, testConnection };
