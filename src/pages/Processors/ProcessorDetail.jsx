import { Box, Typography } from '@mui/material';

export default function ProcessorDetail() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Processor Details
      </Typography>
      <Typography variant="body1" color="text.secondary">
        View detailed configuration and metrics for this processor
      </Typography>
    </Box>
  );
}
