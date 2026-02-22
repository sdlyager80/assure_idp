import { Box, Typography } from '@mui/material';

export default function ProcessorList() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Processor List
      </Typography>
      <Typography variant="body1" color="text.secondary">
        View and manage all configured IDP processors
      </Typography>
    </Box>
  );
}
