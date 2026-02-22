import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Classification from './pages/Classification/Classification';
import Extraction from './pages/Extraction/Extraction';
import Summarization from './pages/Summarization/Summarization';
import Integration from './pages/Integration/Integration';
import ProcessorList from './pages/Processors/ProcessorList';
import ProcessorDetail from './pages/Processors/ProcessorDetail';
import Testing from './pages/Testing/Testing';
import Analytics from './pages/Analytics/Analytics';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/classification" element={<Classification />} />
          <Route path="/extraction" element={<Extraction />} />
          <Route path="/summarization" element={<Summarization />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/processors" element={<ProcessorList />} />
          <Route path="/processors/:id" element={<ProcessorDetail />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </Box>
  );
}

export default App;
