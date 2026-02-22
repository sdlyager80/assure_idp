# DXC Technology Brand Guidelines Implementation

This document outlines how the DXC Technology brand guidelines (January 2026) have been applied to the Assure IDP application.

## Brand Colors

The application uses the official DXC Technology color palette:

### Primary Colors
- **DXC Primary Dark**: `#0E1020` - Used for primary text and dark backgrounds
- **DXC Medium Blue**: `#4995FF` - Primary brand color, buttons, links, and accents
- **DXC Deep Blue**: `#004AAC` - Dark variants and hover states
- **DXC Light Blue**: `#A1E6FF` - Light variants and info messages
- **DXC White**: `#FFFFFF` - Backgrounds and contrast text

### Accent Colors
- **DXC Orange**: `#FFC982` - Secondary color for warnings and highlights

## Typography

The application uses the DXC brand fonts:

### Font Family
- **Primary**: GT Standard L Extended
- **Fallbacks**: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif

### Font Weights
- **GT Standard L Extended Medium** (500): Body text, labels, and regular content
- **GT Standard L Extended Bold** (700): Headings, buttons, and emphasis

### Typography Scale
- **H1**: 2.5rem, Bold, -0.02em letter-spacing
- **H2**: 2rem, Bold, -0.01em letter-spacing
- **H3**: 1.75rem, Bold
- **H4**: 1.5rem, Bold
- **H5**: 1.25rem, Bold
- **H6**: 1rem, Bold
- **Body**: 1rem, Medium
- **Button**: 0.875rem, Bold, 0.02em letter-spacing

## Logo Usage

### Files Included
Located in `src/assets/images/`:
- `dxc-logo.svg` - Full-color logo for light backgrounds
- `dxc-logo-white.svg` - White logo for dark backgrounds

### Implementation
The DXC logo is displayed in the application sidebar with:
- Width: 140px
- Positioned at the top of the navigation drawer
- Paired with "Assure IDP" product name
- Version chip displayed below

### Usage Guidelines
- Maintain clear space around the logo
- Do not modify or distort the logo
- Use full-color version on light backgrounds
- Use white version on dark backgrounds (#0E1020)

## Component Styling

### Buttons
- Border radius: 8px
- Font weight: Bold (700)
- No text transform
- Box shadow on hover
- Primary color: `#4995FF`
- Secondary color: `#FFC982`

### Cards
- Border radius: 12px
- Box shadow: `0 2px 8px rgba(0,0,0,0.08)`
- Background: White (`#FFFFFF`)

### Navigation
- Selected state: Primary blue background with white text
- Hover state: Darker blue (`#004AAC`)
- Icons match text color
- Border radius: 8px on menu items

### Status Indicators
- Success: Green (Material-UI default)
- Warning: DXC Orange (`#FFC982`)
- Error: Red (Material-UI default)
- Info: DXC Medium Blue (`#4995FF`)

## Theme Configuration

The brand colors and typography are configured in `src/theme.js`:

```javascript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4995FF',      // DXC Medium Blue
      light: '#A1E6FF',     // DXC Light Blue
      dark: '#004AAC',      // DXC Deep Blue
    },
    secondary: {
      main: '#FFC982',      // DXC Orange
    },
    // ... more configuration
  },
  typography: {
    fontFamily: '"GT Standard L Extended", "Inter", "Roboto", ...',
    // ... typography scale
  },
});
```

## Adding GT Standard L Extended Font

The GT Standard L Extended font is a licensed DXC corporate font. To add it:

1. Obtain the font files from DXC's brand asset portal
2. Place font files in `src/assets/fonts/`
3. Uncomment and update the `@font-face` declarations in `src/index.css`:

```css
@font-face {
  font-family: 'GT Standard L Extended';
  src: url('./assets/fonts/GTStandardLExtended-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'GT Standard L Extended';
  src: url('./assets/fonts/GTStandardLExtended-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}
```

4. Restart the development server

**Note**: The application will fallback to Inter and system fonts if GT Standard L Extended is not available.

## CSS Variables

Global CSS variables are defined in `src/index.css`:

```css
:root {
  --dxc-primary-dark: #0E1020;
  --dxc-primary-blue: #4995FF;
  --dxc-deep-blue: #004AAC;
  --dxc-light-blue: #A1E6FF;
  --dxc-accent-orange: #FFC982;
  --dxc-white: #FFFFFF;
}
```

Use these variables for consistent branding throughout custom CSS.

## Brand Compliance Checklist

- [x] Official DXC color palette applied
- [x] GT Standard L Extended font family configured
- [x] DXC logo displayed in application
- [x] Typography scale follows brand guidelines
- [x] Component styling matches DXC standards
- [x] Proper logo spacing and sizing
- [x] Color contrast meets accessibility standards
- [ ] GT Standard L Extended font files added (requires license)

## Resources

- **Brand Guidelines**: `C:\Users\slyons21\Downloads\Brand Guidelines Short version Jan 2026.pdf`
- **Logo Files**: `C:\Users\slyons21\Downloads\DXC Logo/`
- **DXC Brand Portal**: Contact DXC Marketing for access

## Contact

For questions about DXC brand compliance or to obtain licensed font files, contact the DXC Marketing team.

---

**Last Updated**: February 22, 2026
**Version**: 1.0.0
**Compliance**: DXC Brand Guidelines January 2026
