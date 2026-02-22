import { createTheme } from '@mui/material/styles';

// DXC Brand Colors (2026 Guidelines)
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4995FF',      // DXC Medium Blue
      light: '#A1E6FF',     // DXC Light Blue
      dark: '#004AAC',      // DXC Deep Blue
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFC982',      // DXC Orange/Peach
      light: '#FFE0B8',
      dark: '#E5A860',
      contrastText: '#0E1020',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    warning: {
      main: '#FFC982',      // DXC Orange
      light: '#FFE0B8',
      dark: '#E5A860',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    info: {
      main: '#4995FF',      // DXC Medium Blue
      light: '#A1E6FF',     // DXC Light Blue
      dark: '#004AAC',
    },
    background: {
      default: '#f5f5f5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0E1020',   // DXC Dark Blue/Black
      secondary: '#5A5A5A',
    },
  },
  typography: {
    fontFamily: '"GT Standard L Extended", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,        // GT Standard L Extended Bold
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,        // GT Standard L Extended Bold
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,        // GT Standard L Extended Bold
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,        // GT Standard L Extended Bold
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 700,        // GT Standard L Extended Bold
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,        // GT Standard L Extended Bold
      lineHeight: 1.5,
    },
    body1: {
      fontWeight: 500,        // GT Standard L Extended Medium
    },
    body2: {
      fontWeight: 500,        // GT Standard L Extended Medium
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,        // GT Standard L Extended Bold
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

export default theme;
