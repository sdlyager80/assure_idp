import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Divider,
  Alert,
  Chip,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import {
  Save,
  CheckCircle,
  Error,
  CloudQueue,
  Storage,
  Refresh,
} from '@mui/icons-material';
import { checkConnection } from '../../services/textractService';

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ pt: 3 }}>{children}</Box> : null;
}

export default function Integration() {
  const [activeTab, setActiveTab] = useState(0);
  const [textractConnected, setTextractConnected] = useState(null);
  const [textractTesting, setTextractTesting] = useState(false);
  const [textractError, setTextractError] = useState(null);
  const [snowConnected, setSnowConnected] = useState(true);

  // Textract settings
  const [awsRegion, setAwsRegion] = useState('us-east-1');
  const [awsAccessKey, setAwsAccessKey] = useState('');
  const [awsSecretKey, setAwsSecretKey] = useState('');

  // ServiceNow settings
  const [snowInstance, setSnowInstance] = useState('dev12345.service-now.com');
  const [snowUsername, setSnowUsername] = useState('');
  const [snowPassword, setSnowPassword] = useState('');
  const [snowClientId, setSnowClientId] = useState('');
  const [snowClientSecret, setSnowClientSecret] = useState('');

  const handleTestTextract = async () => {
    setTextractTesting(true);
    setTextractError(null);
    try {
      const result = await checkConnection();
      setTextractConnected(result.connected);
      if (!result.connected) setTextractError(result.error);
    } catch (err) {
      setTextractConnected(false);
      setTextractError(err.response?.data?.error || err.message);
    } finally {
      setTextractTesting(false);
    }
  };

  const handleTestServiceNow = () => {
    console.log('Testing ServiceNow connection...');
    setSnowConnected(true);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Integration Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure connections to Amazon Textract and ServiceNow
        </Typography>
      </Box>

      <Card>
        <Tabs
          value={activeTab}
          onChange={(e, value) => setActiveTab(value)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<CloudQueue />} label="Amazon Textract" iconPosition="start" />
          <Tab icon={<Storage />} label="ServiceNow" iconPosition="start" />
        </Tabs>

        {/* Amazon Textract Configuration */}
        <TabPanel value={activeTab} index={0}>
          <CardContent>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  AWS Textract Connection
                </Typography>
                {textractConnected === true && (
                  <Chip icon={<CheckCircle />} label="Connected" color="success" size="small" />
                )}
                {textractConnected === false && (
                  <Chip icon={<Error />} label="Disconnected" color="error" size="small" />
                )}
                {textractConnected === null && (
                  <Chip label="Not tested" size="small" variant="outlined" />
                )}
              </Box>
              <Divider />
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="AWS Region"
                  value={awsRegion}
                  onChange={(e) => setAwsRegion(e.target.value)}
                  helperText="e.g., us-east-1, us-west-2"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="AWS Access Key ID"
                  value={awsAccessKey}
                  onChange={(e) => setAwsAccessKey(e.target.value)}
                  type="password"
                  helperText="Your AWS IAM access key"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="AWS Secret Access Key"
                  value={awsSecretKey}
                  onChange={(e) => setAwsSecretKey(e.target.value)}
                  type="password"
                  helperText="Your AWS IAM secret key"
                />
              </Grid>

              <Grid item xs={12}>
                <Alert severity="info">
                  <Typography variant="body2" gutterBottom>
                    <strong>Required IAM Permissions:</strong>
                  </Typography>
                  <Typography variant="body2" component="div">
                    • textract:DetectDocumentText<br />
                    • textract:AnalyzeDocument<br />
                    • textract:StartDocumentAnalysis<br />
                    • textract:GetDocumentAnalysis<br />
                    • s3:GetObject (for document storage)
                  </Typography>
                </Alert>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={() => console.log('Saving Textract config')}
                  >
                    Save Configuration
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={textractTesting ? <CircularProgress size={16} /> : <Refresh />}
                    onClick={handleTestTextract}
                    disabled={textractTesting}
                  >
                    {textractTesting ? 'Testing…' : 'Test Connection'}
                  </Button>
                </Box>
              </Grid>

              {textractConnected === true && (
                <Grid item xs={12}>
                  <Alert severity="success">
                    Successfully connected to Amazon Textract in region {awsRegion}
                  </Alert>
                </Grid>
              )}
              {textractConnected === false && textractError && (
                <Grid item xs={12}>
                  <Alert severity="error">{textractError}</Alert>
                </Grid>
              )}
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Advanced Settings
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable automatic document upload to S3"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Documents will be uploaded to S3 before Textract processing
              </Typography>

              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Use asynchronous processing for large documents"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Documents over 5MB will use StartDocumentAnalysis API
              </Typography>

              <TextField
                label="S3 Bucket Name"
                defaultValue="assure-idp-documents"
                fullWidth
                sx={{ mt: 2 }}
                helperText="S3 bucket for document storage"
              />
            </Box>
          </CardContent>
        </TabPanel>

        {/* ServiceNow Configuration */}
        <TabPanel value={activeTab} index={1}>
          <CardContent>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  ServiceNow Connection
                </Typography>
                {snowConnected ? (
                  <Chip
                    icon={<CheckCircle />}
                    label="Connected"
                    color="success"
                    size="small"
                  />
                ) : (
                  <Chip
                    icon={<Error />}
                    label="Disconnected"
                    color="error"
                    size="small"
                  />
                )}
              </Box>
              <Divider />
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ServiceNow Instance"
                  value={snowInstance}
                  onChange={(e) => setSnowInstance(e.target.value)}
                  helperText="e.g., dev12345.service-now.com"
                />
              </Grid>

              <Grid item xs={12}>
                <Alert severity="info">
                  Choose authentication method: Basic Auth or OAuth 2.0
                </Alert>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Basic Authentication
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Username"
                  value={snowUsername}
                  onChange={(e) => setSnowUsername(e.target.value)}
                  helperText="ServiceNow user account"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Password"
                  value={snowPassword}
                  onChange={(e) => setSnowPassword(e.target.value)}
                  type="password"
                  helperText="ServiceNow password"
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  OAuth 2.0 (Recommended)
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Client ID"
                  value={snowClientId}
                  onChange={(e) => setSnowClientId(e.target.value)}
                  helperText="OAuth client ID"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Client Secret"
                  value={snowClientSecret}
                  onChange={(e) => setSnowClientSecret(e.target.value)}
                  type="password"
                  helperText="OAuth client secret"
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={() => console.log('Saving ServiceNow config')}
                  >
                    Save Configuration
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={handleTestServiceNow}
                  >
                    Test Connection
                  </Button>
                </Box>
              </Grid>

              {snowConnected && (
                <Grid item xs={12}>
                  <Alert severity="success">
                    Successfully connected to ServiceNow instance: {snowInstance}
                  </Alert>
                </Grid>
              )}
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Table Mappings
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Claims FNOL Table"
                    defaultValue="x_dxcis_claims_fnol"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Documents Table"
                    defaultValue="x_dxcis_claims_docs"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Classification Field"
                    defaultValue="document_type"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Summary Field"
                    defaultValue="work_notes"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </TabPanel>
      </Card>
    </Box>
  );
}
