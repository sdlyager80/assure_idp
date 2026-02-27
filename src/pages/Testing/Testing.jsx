import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Alert,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Stack,
} from '@mui/material';
import {
  CloudUpload,
  PlayArrow,
  ExpandMore,
  TextFields,
  TableChart,
  Assignment,
  CheckCircle,
  Error as ErrorIcon,
  InsertDriveFile,
  Close,
} from '@mui/icons-material';
import { analyzeDocument, detectText } from '../../services/textractService';

const FEATURE_OPTIONS = [
  { value: 'FORMS', label: 'Forms (Key-Value)', icon: <Assignment fontSize="small" /> },
  { value: 'TABLES', label: 'Tables', icon: <TableChart fontSize="small" /> },
  { value: 'TEXT_ONLY', label: 'Text Only', icon: <TextFields fontSize="small" /> },
];

const ACCEPTED_TYPES = { 'image/jpeg': [], 'image/png': [], 'application/pdf': [] };

export default function Testing() {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState(['FORMS', 'TABLES']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((accepted) => {
    if (accepted.length > 0) {
      setFile(accepted[0]);
      setResult(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  const handleModeChange = (_, newMode) => {
    if (newMode.length > 0) setMode(newMode);
  };

  const handleRun = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      let data;
      if (mode.includes('TEXT_ONLY') && mode.length === 1) {
        data = await detectText(file);
      } else {
        const features = mode.filter(m => m !== 'TEXT_ONLY');
        data = await analyzeDocument(file, features.length ? features : ['FORMS', 'TABLES']);
      }
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatConfidence = (v) => v != null ? `${Math.round(v)}%` : '—';

  const renderTable = (table, idx) => {
    if (!table.cells?.length) return null;
    const maxRow = Math.max(...table.cells.map(c => c.rowIndex));
    const maxCol = Math.max(...table.cells.map(c => c.columnIndex));
    const grid = Array.from({ length: maxRow }, (_, r) =>
      Array.from({ length: maxCol }, (_, c) =>
        table.cells.find(cell => cell.rowIndex === r + 1 && cell.columnIndex === c + 1)
      )
    );
    return (
      <Box key={idx} sx={{ mb: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Table {idx + 1}
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 400 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {grid[0]?.map((cell, ci) => (
                  <TableCell key={ci} sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>
                    {cell?.text || ''}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {grid.slice(1).map((row, ri) => (
                <TableRow key={ri} hover>
                  {row.map((cell, ci) => (
                    <TableCell key={ci}>{cell?.text || ''}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Testing & Validation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload a document and run it through Amazon Textract to validate extraction
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left panel - upload + controls */}
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            {/* Drop zone */}
            <Card>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Document
                </Typography>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: '2px dashed',
                    borderColor: isDragActive ? 'primary.main' : 'grey.300',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: isDragActive ? 'primary.50' : 'grey.50',
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' },
                  }}
                >
                  <input {...getInputProps()} />
                  <CloudUpload sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {isDragActive ? 'Drop it here' : 'Drag & drop or click to upload'}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    PDF, PNG, JPG — max 5MB
                  </Typography>
                </Box>

                {file && (
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <InsertDriveFile color="primary" fontSize="small" />
                    <Typography variant="body2" sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {file.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {(file.size / 1024).toFixed(0)} KB
                    </Typography>
                    <Close
                      fontSize="small"
                      sx={{ cursor: 'pointer', color: 'text.secondary' }}
                      onClick={() => { setFile(null); setResult(null); setError(null); }}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Feature selection */}
            <Card>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Analysis Mode
                </Typography>
                <ToggleButtonGroup
                  value={mode}
                  onChange={handleModeChange}
                  orientation="vertical"
                  fullWidth
                  size="small"
                >
                  {FEATURE_OPTIONS.map(opt => (
                    <ToggleButton
                      key={opt.value}
                      value={opt.value}
                      sx={{ justifyContent: 'flex-start', gap: 1 }}
                    >
                      {opt.icon}
                      {opt.label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </CardContent>
            </Card>

            {/* Run button */}
            <Button
              variant="contained"
              size="large"
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <PlayArrow />}
              onClick={handleRun}
              disabled={!file || loading}
              fullWidth
            >
              {loading ? 'Analyzing…' : 'Run Textract'}
            </Button>
          </Stack>
        </Grid>

        {/* Right panel - results */}
        <Grid item xs={12} md={8}>
          {!result && !error && !loading && (
            <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
              <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                <PlayArrow sx={{ fontSize: 64, opacity: 0.2, mb: 1 }} />
                <Typography variant="body1">Upload a document and click Run Textract</Typography>
              </Box>
            </Card>
          )}

          {loading && (
            <Card sx={{ p: 4 }}>
              <Typography variant="body1" gutterBottom>Sending to Amazon Textract…</Typography>
              <LinearProgress />
            </Card>
          )}

          {error && (
            <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Textract Error</Typography>
              {error}
            </Alert>
          )}

          {result && (
            <Stack spacing={2}>
              {/* Summary bar */}
              <Card>
                <CardContent sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Chip icon={<CheckCircle />} label="Success" color="success" size="small" />
                  <Chip label={`${result.lines?.length || 0} lines`} size="small" variant="outlined" />
                  {result.keyValuePairs?.length > 0 && (
                    <Chip label={`${result.keyValuePairs.length} key-value pairs`} size="small" variant="outlined" color="primary" />
                  )}
                  {result.tables?.length > 0 && (
                    <Chip label={`${result.tables.length} table${result.tables.length > 1 ? 's' : ''}`} size="small" variant="outlined" color="secondary" />
                  )}
                  <Chip label={`${result.pageCount} page${result.pageCount > 1 ? 's' : ''}`} size="small" variant="outlined" />
                </CardContent>
              </Card>

              {/* Key-Value Pairs */}
              {result.keyValuePairs?.length > 0 && (
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Assignment fontSize="small" color="primary" />
                      <Typography fontWeight="bold">Key-Value Pairs ({result.keyValuePairs.length})</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Key</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Value</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="right">Confidence</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {result.keyValuePairs.map((kv, i) => (
                            <TableRow key={i} hover>
                              <TableCell sx={{ fontWeight: 500 }}>{kv.key}</TableCell>
                              <TableCell>{kv.value || <em style={{ color: '#9e9e9e' }}>empty</em>}</TableCell>
                              <TableCell align="right">
                                <Chip
                                  label={formatConfidence(kv.confidence)}
                                  size="small"
                                  color={kv.confidence >= 90 ? 'success' : kv.confidence >= 70 ? 'warning' : 'error'}
                                  variant="outlined"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              )}

              {/* Tables */}
              {result.tables?.length > 0 && (
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TableChart fontSize="small" color="secondary" />
                      <Typography fontWeight="bold">Tables ({result.tables.length})</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {result.tables.map((table, i) => renderTable(table, i))}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* Extracted Text */}
              {result.lines?.length > 0 && (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TextFields fontSize="small" />
                      <Typography fontWeight="bold">Extracted Text ({result.lines.length} lines)</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper variant="outlined" sx={{ p: 2, maxHeight: 400, overflow: 'auto', bgcolor: 'grey.50' }}>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                        {result.lines.map(l => l.text).join('\n')}
                      </Typography>
                    </Paper>
                  </AccordionDetails>
                </Accordion>
              )}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
