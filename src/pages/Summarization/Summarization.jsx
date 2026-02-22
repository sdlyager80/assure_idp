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
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  Slider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Save,
  PlayArrow,
  CheckCircle,
  ArticleOutlined,
  DataObject,
  Code,
} from '@mui/icons-material';

export default function Summarization() {
  const [processorName, setProcessorName] = useState('');
  const [summaryType, setSummaryType] = useState('extractive');
  const [maxLength, setMaxLength] = useState(500);
  const [summaryFocus, setSummaryFocus] = useState('general');
  const [includeKeywords, setIncludeKeywords] = useState(true);
  const [includeEntities, setIncludeEntities] = useState(true);
  const [outputFormat, setOutputFormat] = useState('text');

  const handleSave = () => {
    console.log('Saving summarization configuration:', {
      processorName,
      summaryType,
      maxLength,
      summaryFocus,
      includeKeywords,
      includeEntities,
      outputFormat,
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Document Summarization
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure AI-powered document summarization with Textract and Claude
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PlayArrow />}
            onClick={() => console.log('Test summarization')}
          >
            Test Summary
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
                Summarizer Configuration
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Processor Name"
                    value={processorName}
                    onChange={(e) => setProcessorName(e.target.value)}
                    placeholder="e.g., Claims Document Summarizer"
                    helperText="A unique name for this summarization processor"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Summarization Method</InputLabel>
                    <Select
                      value={summaryType}
                      onChange={(e) => setSummaryType(e.target.value)}
                      label="Summarization Method"
                    >
                      <MenuItem value="extractive">Extractive (Key Sentences)</MenuItem>
                      <MenuItem value="abstractive">Abstractive (AI-Generated)</MenuItem>
                      <MenuItem value="hybrid">Hybrid (Both Methods)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Summary Focus</InputLabel>
                    <Select
                      value={summaryFocus}
                      onChange={(e) => setSummaryFocus(e.target.value)}
                      label="Summary Focus"
                    >
                      <MenuItem value="general">General Summary</MenuItem>
                      <MenuItem value="claims">Claims-Specific</MenuItem>
                      <MenuItem value="medical">Medical Information</MenuItem>
                      <MenuItem value="financial">Financial Details</MenuItem>
                      <MenuItem value="legal">Legal Terms</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Maximum Summary Length: {maxLength} characters
                  </Typography>
                  <Slider
                    value={maxLength}
                    onChange={(e, value) => setMaxLength(value)}
                    min={100}
                    max={2000}
                    step={50}
                    marks={[
                      { value: 100, label: '100' },
                      { value: 500, label: '500' },
                      { value: 1000, label: '1000' },
                      { value: 2000, label: '2000' },
                    ]}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Longer summaries provide more detail but may lose focus
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={includeKeywords}
                        onChange={(e) => setIncludeKeywords(e.target.checked)}
                      />
                    }
                    label="Extract Keywords"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                    Identify and highlight key terms from the document
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={includeEntities}
                        onChange={(e) => setIncludeEntities(e.target.checked)}
                      />
                    }
                    label="Extract Named Entities"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                    Identify people, places, organizations, dates, and amounts
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Output Configuration
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Output Format</InputLabel>
                    <Select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      label="Output Format"
                    >
                      <MenuItem value="text">Plain Text</MenuItem>
                      <MenuItem value="markdown">Markdown</MenuItem>
                      <MenuItem value="html">HTML</MenuItem>
                      <MenuItem value="json">JSON (Structured)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Alert severity="info">
                    Summaries will be stored in ServiceNow work notes field with rich formatting
                  </Alert>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Example Summary Output
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  bgcolor: 'grey.50',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'inherit' }}>
                  Document Summary
                </Typography>

                <Typography paragraph sx={{ fontFamily: 'inherit' }}>
                  This death certificate documents the passing of John Robert Smith on March 15,
                  2024, at Springfield Memorial Hospital. The manner of death was natural, with
                  cardiac arrest listed as the immediate cause. The decedent was 67 years old at
                  the time of death.
                </Typography>

                <Typography variant="subtitle2" gutterBottom sx={{ fontFamily: 'inherit', mt: 2 }}>
                  Key Entities:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip label="John Robert Smith (Person)" size="small" />
                  <Chip label="March 15, 2024 (Date)" size="small" />
                  <Chip label="Springfield Memorial Hospital (Organization)" size="small" />
                </Box>

                <Typography variant="subtitle2" gutterBottom sx={{ fontFamily: 'inherit' }}>
                  Keywords:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip label="death certificate" size="small" variant="outlined" />
                  <Chip label="natural" size="small" variant="outlined" />
                  <Chip label="cardiac arrest" size="small" variant="outlined" />
                </Box>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                AI Model Configuration
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Textract OCR"
                    secondary="Document text extraction"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Claude Sonnet 4"
                    secondary="Summary generation"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Entity Recognition"
                    secondary="NER with Amazon Comprehend"
                  />
                </ListItem>
              </List>

              <Alert severity="success" sx={{ mt: 2 }}>
                All AI services are configured and ready
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
                Target Field:
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="work_notes"
                sx={{ mb: 2 }}
              />

              <Typography variant="body2" gutterBottom>
                Summary Prefix:
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="[AI Summary]"
                sx={{ mb: 2 }}
              />

              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Auto-append to work notes"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Summary Templates
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Use predefined templates for consistent output:
              </Typography>

              <List dense>
                <ListItem button>
                  <ListItemIcon>
                    <ArticleOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Claims Summary" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <DataObject />
                  </ListItemIcon>
                  <ListItemText primary="Medical Record Summary" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <Code />
                  </ListItemIcon>
                  <ListItemText primary="Custom Template" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
