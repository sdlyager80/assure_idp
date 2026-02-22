import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Add,
  Delete,
  Save,
  PlayArrow,
  ExpandMore,
  CheckCircle,
  CloudUpload,
} from '@mui/icons-material';

export default function Extraction() {
  const [processorName, setProcessorName] = useState('');
  const [documentType, setDocumentType] = useState('acord');
  const [extractionMethod, setExtractionMethod] = useState('form');
  const [enableValidation, setEnableValidation] = useState(true);
  const [fields, setFields] = useState([
    { id: 1, name: 'policy_number', label: 'Policy Number', type: 'text', required: true, validation: 'regex', pattern: '^[A-Z]{2}-\\d{6}$' },
    { id: 2, name: 'insured_name', label: 'Insured Name', type: 'text', required: true, validation: 'none' },
    { id: 3, name: 'date_of_death', label: 'Date of Death', type: 'date', required: true, validation: 'date' },
    { id: 4, name: 'benefit_amount', label: 'Benefit Amount', type: 'currency', required: true, validation: 'numeric' },
  ]);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldLabel, setNewFieldLabel] = useState('');

  const handleAddField = () => {
    if (newFieldName && newFieldLabel) {
      setFields([
        ...fields,
        {
          id: Date.now(),
          name: newFieldName,
          label: newFieldLabel,
          type: 'text',
          required: false,
          validation: 'none',
        },
      ]);
      setNewFieldName('');
      setNewFieldLabel('');
    }
  };

  const handleDeleteField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleSave = () => {
    console.log('Saving extraction configuration:', {
      processorName,
      documentType,
      extractionMethod,
      enableValidation,
      fields,
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Data Extraction
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure Textract for structured data extraction from documents
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PlayArrow />}
            onClick={() => console.log('Test extraction')}
          >
            Test Extraction
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
          >
            Save Configuration
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Extractor Configuration
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Processor Name"
                    value={processorName}
                    onChange={(e) => setProcessorName(e.target.value)}
                    placeholder="e.g., ACORD Form Data Extractor"
                    helperText="A unique name for this extraction processor"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Document Type</InputLabel>
                    <Select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      label="Document Type"
                    >
                      <MenuItem value="acord">ACORD Forms</MenuItem>
                      <MenuItem value="death_cert">Death Certificate</MenuItem>
                      <MenuItem value="policy">Policy Document</MenuItem>
                      <MenuItem value="medical">Medical Records</MenuItem>
                      <MenuItem value="financial">Financial Statements</MenuItem>
                      <MenuItem value="custom">Custom Form</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Extraction Method</InputLabel>
                    <Select
                      value={extractionMethod}
                      onChange={(e) => setExtractionMethod(e.target.value)}
                      label="Extraction Method"
                    >
                      <MenuItem value="form">Form Data (AnalyzeDocument)</MenuItem>
                      <MenuItem value="table">Table Extraction</MenuItem>
                      <MenuItem value="key-value">Key-Value Pairs</MenuItem>
                      <MenuItem value="queries">Queries API</MenuItem>
                      <MenuItem value="layout">Layout Analysis</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={enableValidation}
                        onChange={(e) => setEnableValidation(e.target.checked)}
                      />
                    }
                    label="Enable Data Validation"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                    Validate extracted data against defined patterns and rules
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Extraction Fields
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Define the fields to extract from documents
              </Typography>
              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                  label="Field Name"
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  placeholder="e.g., policy_number"
                  size="small"
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Display Label"
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  placeholder="e.g., Policy Number"
                  size="small"
                  sx={{ flex: 1 }}
                />
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddField}
                  sx={{ minWidth: 120 }}
                >
                  Add Field
                </Button>
              </Box>

              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Field Name</TableCell>
                      <TableCell>Label</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Required</TableCell>
                      <TableCell>Validation</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fields.map((field) => (
                      <TableRow key={field.id}>
                        <TableCell>
                          <code>{field.name}</code>
                        </TableCell>
                        <TableCell>{field.label}</TableCell>
                        <TableCell>
                          <Chip label={field.type} size="small" />
                        </TableCell>
                        <TableCell>
                          {field.required ? (
                            <Chip label="Required" size="small" color="error" />
                          ) : (
                            <Chip label="Optional" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip label={field.validation} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteField(field.id)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Post-Processing Rules
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Data Normalization</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Normalize dates to ISO 8601 format"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Remove special characters from numeric fields"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Convert text to uppercase"
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Data Enrichment</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Lookup policy details from ServiceNow"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Validate SSN against LexisNexis"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Geocode addresses"
                  />
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Textract Configuration
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  API Features Enabled:
                </Typography>
                <Chip label="Forms" size="small" color="primary" sx={{ m: 0.5 }} />
                <Chip label="Tables" size="small" color="primary" sx={{ m: 0.5 }} />
                <Chip label="Queries" size="small" color="primary" sx={{ m: 0.5 }} />
              </Box>

              <Alert severity="info" sx={{ mt: 2 }}>
                Using Textract AnalyzeDocument API for form extraction
              </Alert>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                ServiceNow Integration
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="body2" gutterBottom>
                Target Table:
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="x_dxcis_claims_fnol"
                sx={{ mb: 2 }}
              />

              <Typography variant="body2" gutterBottom>
                Mapping Mode:
              </Typography>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <Select defaultValue="auto">
                  <MenuItem value="auto">Auto-map Fields</MenuItem>
                  <MenuItem value="manual">Manual Mapping</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Create record on extraction"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Accuracy Metrics
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Overall Accuracy</Typography>
                  <Typography variant="body2" fontWeight="bold">96%</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Documents Processed</Typography>
                  <Typography variant="body2" fontWeight="bold">1,823</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Avg. Confidence</Typography>
                  <Typography variant="body2" fontWeight="bold">94%</Typography>
                </Box>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<CloudUpload />}
                sx={{ mt: 2 }}
              >
                Upload Test Documents
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
