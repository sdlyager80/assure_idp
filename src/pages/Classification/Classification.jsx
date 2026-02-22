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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add,
  Delete,
  Save,
  PlayArrow,
  CloudUpload,
  CheckCircle,
  Settings,
} from '@mui/icons-material';

export default function Classification() {
  const [processorName, setProcessorName] = useState('');
  const [modelType, setModelType] = useState('supervised');
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Death Certificate', keywords: ['death', 'certificate', 'decedent'], confidence: 0.95 },
    { id: 2, name: 'ACORD Form', keywords: ['acord', 'form', 'insurance'], confidence: 0.92 },
    { id: 3, name: 'Policy Document', keywords: ['policy', 'contract', 'coverage'], confidence: 0.89 },
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [autoRoute, setAutoRoute] = useState(true);
  const [enableOCR, setEnableOCR] = useState(true);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        {
          id: Date.now(),
          name: newCategory,
          keywords: [],
          confidence: 0,
        },
      ]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleSave = () => {
    console.log('Saving classification configuration:', {
      processorName,
      modelType,
      confidenceThreshold,
      categories,
      autoRoute,
      enableOCR,
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Document Classification
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure Amazon Textract for intelligent document classification
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PlayArrow />}
            onClick={() => console.log('Test classification')}
          >
            Test
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
                Processor Configuration
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Processor Name"
                    value={processorName}
                    onChange={(e) => setProcessorName(e.target.value)}
                    placeholder="e.g., Death Certificate Classifier"
                    helperText="A unique name for this classification processor"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Classification Model</InputLabel>
                    <Select
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      label="Classification Model"
                    >
                      <MenuItem value="supervised">Supervised Learning</MenuItem>
                      <MenuItem value="unsupervised">Unsupervised Clustering</MenuItem>
                      <MenuItem value="rule-based">Rule-Based</MenuItem>
                      <MenuItem value="hybrid">Hybrid Model</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Confidence Threshold (%)"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(e.target.value)}
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    helperText="Minimum confidence for classification"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={enableOCR}
                        onChange={(e) => setEnableOCR(e.target.checked)}
                      />
                    }
                    label="Enable OCR Preprocessing"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                    Extract text using Textract OCR before classification
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={autoRoute}
                        onChange={(e) => setAutoRoute(e.target.checked)}
                      />
                    }
                    label="Auto-route to ServiceNow"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                    Automatically route classified documents to ServiceNow tables
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Document Categories
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Define the document types this processor can identify
              </Typography>
              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Enter category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                />
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddCategory}
                  sx={{ minWidth: 120 }}
                >
                  Add
                </Button>
              </Box>

              <List>
                {categories.map((category) => (
                  <ListItem
                    key={category.id}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary={category.name}
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          {category.keywords.map((keyword, idx) => (
                            <Chip
                              key={idx}
                              label={keyword}
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          ))}
                          {category.confidence > 0 && (
                            <Chip
                              label={`${(category.confidence * 100).toFixed(0)}% confidence`}
                              size="small"
                              color="success"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Textract Integration
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Chip
                  icon={<CheckCircle />}
                  label="Connected"
                  color="success"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  AWS Region: us-east-1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  API Version: 2018-06-27
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Settings />}
                sx={{ mt: 2 }}
              >
                Configure Connection
              </Button>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                ServiceNow Routing
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="body2" gutterBottom>
                Target Table:
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="x_dxcis_claims_docs"
                sx={{ mb: 2 }}
              />

              <Typography variant="body2" gutterBottom>
                Classification Field:
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="document_type"
                sx={{ mb: 2 }}
              />

              <Alert severity="info" sx={{ mt: 2 }}>
                Documents will be attached and categorized automatically
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Training Data
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Upload sample documents to improve classification accuracy
              </Typography>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<CloudUpload />}
                sx={{ mt: 2 }}
              >
                Upload Training Set
              </Button>

              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Current Training Set:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  324 documents
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
