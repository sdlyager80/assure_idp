import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Category,
  FindInPage,
  Summarize,
  TrendingUp,
  CheckCircle,
  Error,
  Settings,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon, color, subtitle, action }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h3" component="div" fontWeight="bold">
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: `${color}.100`,
            color: `${color}.main`,
          }}
        >
          {icon}
        </Box>
      </Box>
      {action && (
        <Button size="small" sx={{ mt: 1 }}>
          {action}
        </Button>
      )}
    </CardContent>
  </Card>
);

const ProcessorCard = ({ name, type, status, accuracy, documentsProcessed, onClick }) => (
  <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={onClick}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {type}
          </Typography>
        </Box>
        <Chip
          label={status}
          size="small"
          color={status === 'Active' ? 'success' : 'default'}
          icon={status === 'Active' ? <CheckCircle /> : <Error />}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Accuracy
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {accuracy}%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={accuracy} />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {documentsProcessed.toLocaleString()} documents processed
      </Typography>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const navigate = useNavigate();

  const processors = [
    {
      name: 'Death Certificate Classifier',
      type: 'Classification',
      status: 'Active',
      accuracy: 94,
      documentsProcessed: 2451,
    },
    {
      name: 'ACORD Form Extractor',
      type: 'Extraction',
      status: 'Active',
      accuracy: 96,
      documentsProcessed: 1823,
    },
    {
      name: 'Claims Summary Generator',
      type: 'Summarization',
      status: 'Active',
      accuracy: 91,
      documentsProcessed: 1205,
    },
    {
      name: 'Policy Document Classifier',
      type: 'Classification',
      status: 'Training',
      accuracy: 87,
      documentsProcessed: 892,
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor and manage your intelligent document processing pipelines
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Processors"
            value="12"
            subtitle="+3 this month"
            icon={<TrendingUp sx={{ fontSize: 32 }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Classification"
            value="5"
            subtitle="Document classifiers"
            icon={<Category sx={{ fontSize: 32 }} />}
            color="info"
            action="Configure"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Extraction"
            value="4"
            subtitle="Data extractors"
            icon={<FindInPage sx={{ fontSize: 32 }} />}
            color="success"
            action="Configure"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Summarization"
            value="3"
            subtitle="Summary generators"
            icon={<Summarize sx={{ fontSize: 32 }} />}
            color="warning"
            action="Configure"
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold">
          Recent Processors
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Settings />}
          onClick={() => navigate('/processors')}
        >
          View All
        </Button>
      </Box>

      <Grid container spacing={3}>
        {processors.map((processor, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ProcessorCard
              {...processor}
              onClick={() => navigate(`/processors/${index + 1}`)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Quick Actions
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Category />}
                  onClick={() => navigate('/classification')}
                >
                  Configure Classification
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FindInPage />}
                  onClick={() => navigate('/extraction')}
                >
                  Configure Extraction
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Summarize />}
                  onClick={() => navigate('/summarization')}
                >
                  Configure Summarization
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
