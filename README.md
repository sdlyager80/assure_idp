# Assure IDP - Intelligent Document Processing Platform

A modern, enterprise-grade React application for configuring and managing intelligent document processing workflows with Amazon Textract and ServiceNow integration. **Powered by DXC Technology.**

![Assure IDP](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![Material-UI](https://img.shields.io/badge/MUI-5.15-007fff)
![DXC](https://img.shields.io/badge/DXC-Technology-4995FF)

## Overview

Assure IDP is a comprehensive configuration platform for intelligent document processing in insurance and financial services. It provides a modern UI/UX for setting up document classification, data extraction, and summarization workflows powered by Amazon Textract and AI.

## Features

### 🎯 Document Classification
- Configure ML-based document classifiers
- Define custom document categories
- Rule-based and supervised learning models
- Auto-routing to ServiceNow tables
- Training data management

### 📊 Data Extraction
- Form data extraction with Textract
- Table and key-value pair detection
- Custom field definitions
- Data validation rules
- Post-processing and normalization
- ServiceNow field mapping

### 📝 Document Summarization
- AI-powered document summarization
- Extractive and abstractive methods
- Named entity recognition
- Keyword extraction
- Multiple output formats
- Integration with Claude AI

### 🔌 Integrations
- Amazon Textract configuration
- ServiceNow connection management
- OAuth 2.0 authentication
- S3 bucket integration
- Table and field mappings

### 📈 Analytics & Testing
- Processor performance metrics
- Accuracy tracking
- Document testing interface
- Real-time monitoring

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **UI Library**: Material-UI (MUI) 5.15
- **Routing**: React Router DOM 6.x
- **Build Tool**: Vite
- **State Management**: React Hooks
- **Notifications**: Notistack
- **Charts**: Recharts
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- AWS Account with Textract access
- ServiceNow instance (development or production)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assure_idp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (optional)

   Create a `.env` file in the root directory:
   ```env
   VITE_AWS_REGION=us-east-1
   VITE_SNOW_INSTANCE=dev12345.service-now.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Application Structure

```
assure_idp/
├── src/
│   ├── components/
│   │   └── Layout/
│   │       └── Layout.jsx           # Main application layout with sidebar
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx        # Overview dashboard
│   │   ├── Classification/
│   │   │   └── Classification.jsx   # Document classification config
│   │   ├── Extraction/
│   │   │   └── Extraction.jsx       # Data extraction config
│   │   ├── Summarization/
│   │   │   └── Summarization.jsx    # Summarization config
│   │   ├── Integration/
│   │   │   └── Integration.jsx      # Textract & ServiceNow setup
│   │   ├── Processors/              # Processor management
│   │   ├── Testing/                 # Testing interface
│   │   └── Analytics/               # Analytics dashboard
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # Application entry point
│   ├── theme.js                     # MUI theme configuration
│   └── index.css                    # Global styles
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── vite.config.js                   # Vite configuration
└── README.md                        # This file
```

## Key Features by Page

### Dashboard
- Active processor count
- Quick statistics
- Recent processor list
- Quick action buttons
- Performance metrics

### Classification Configuration
- Processor name and model type
- Confidence threshold settings
- Document category management
- OCR preprocessing toggle
- Auto-routing configuration
- Textract integration status
- Training data upload

### Extraction Configuration
- Extraction method selection
- Custom field definitions
- Field validation rules
- Data normalization options
- Table and form extraction
- ServiceNow field mapping
- Post-processing rules

### Summarization Configuration
- Summary method (extractive/abstractive)
- Maximum length slider
- Focus area selection
- Keyword extraction
- Entity recognition
- Output format options
- AI model configuration

### Integration Settings
- AWS Textract credentials
- ServiceNow connection (Basic/OAuth)
- S3 bucket configuration
- Table mappings
- Connection testing
- Advanced settings

## ServiceNow Integration

### Required Tables

The application expects these ServiceNow tables:
- `x_dxcis_claims_fnol` - Claims FNOL records
- `x_dxcis_claims_docs` - Document attachments
- Document type classification field
- Work notes field for summaries

### Required Roles

ServiceNow users need these roles:
- `x_dxcis_claims.user` - Basic access
- `x_dxcis_claims.admin` - Configuration access
- `attachment.user` - Document upload

### OAuth Setup

1. Create an OAuth application endpoint in ServiceNow
2. Configure redirect URI
3. Copy Client ID and Client Secret
4. Enter credentials in Integration Settings

## Amazon Textract Integration

### Required IAM Permissions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "textract:DetectDocumentText",
        "textract:AnalyzeDocument",
        "textract:StartDocumentAnalysis",
        "textract:GetDocumentAnalysis"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::assure-idp-documents/*"
    }
  ]
}
```

### Supported Document Types

- Death Certificates
- ACORD Forms
- Policy Documents
- Medical Records
- Financial Statements
- Custom Forms

## Development

### Code Style

- Use functional components with hooks
- Follow Material-UI best practices
- Keep components focused and reusable
- Use proper prop-types validation

### Adding New Features

1. Create component in appropriate directory
2. Add route in `App.jsx`
3. Add navigation item in `Layout.jsx`
4. Update README documentation

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### AWS Amplify

1. Connect your Git repository
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Deploy

### Docker

```bash
docker build -t assure-idp .
docker run -p 3000:3000 assure-idp
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_AWS_REGION` | AWS region for Textract | us-east-1 |
| `VITE_SNOW_INSTANCE` | ServiceNow instance URL | - |
| `VITE_API_BASE_URL` | Backend API base URL | - |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Documentation

Additional documentation is available:

- **[DXC Brand Guidelines Implementation](./DXC_BRANDING.md)** - DXC Technology brand colors, fonts, and logo usage
- **[Project Summary](./PROJECT_SUMMARY.md)** - Complete feature overview and technical details
- **[Architecture Guide](./ARCHITECTURE.md)** - System architecture and design decisions
- **[Quick Start Guide](./QUICKSTART.md)** - Get up and running quickly

### Branding

This application follows the **DXC Technology Brand Guidelines (January 2026)**:
- Official DXC color palette (`#4995FF`, `#004AAC`, `#FFC982`, etc.)
- GT Standard L Extended typography
- DXC logo and brand assets
- See [DXC_BRANDING.md](./DXC_BRANDING.md) for complete details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

Proprietary - DXC Technology

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Refer to the documentation

## Roadmap

### Version 1.1 (Q2 2024)
- [ ] Batch document processing
- [ ] Advanced analytics dashboard
- [ ] Custom template builder
- [ ] Multi-language support

### Version 1.2 (Q3 2024)
- [ ] Real-time collaboration
- [ ] Workflow automation
- [ ] API documentation
- [ ] Mobile responsive enhancements

## Acknowledgments

- Built with React and Material-UI
- Powered by Amazon Textract
- Integrated with ServiceNow
- AI summarization by Claude

---

**Version**: 1.0.0
**Last Updated**: February 2024
**Maintainer**: DXC Smart Apps Team
