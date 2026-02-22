# Assure IDP - Quick Start Guide

Get up and running with Assure IDP in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git
- Code editor (VS Code recommended)

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd assure_idp

# Install dependencies
npm install
```

## Step 2: Start Development Server

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

## Step 3: Explore the Application

### Navigation

The sidebar provides access to all major features:

1. **Dashboard** - Overview of all processors
2. **Classification** - Configure document classifiers
3. **Extraction** - Set up data extraction
4. **Summarization** - Configure AI summaries
5. **Integration** - Connect Textract & ServiceNow

### Quick Tour

#### 1. Dashboard
- View active processor count
- See recent processors
- Quick access to configuration pages

#### 2. Classification Page
- Create a new processor
- Define document categories
- Configure Textract OCR
- Set confidence thresholds

#### 3. Extraction Page
- Add extraction fields
- Configure validation rules
- Map to ServiceNow fields
- Test extraction

#### 4. Summarization Page
- Choose summary method
- Set maximum length
- Enable entity extraction
- Configure output format

#### 5. Integration Page
- Enter AWS credentials
- Configure ServiceNow connection
- Test connections
- Set up table mappings

## Step 4: Create Your First Processor

### Example: Death Certificate Classifier

1. Navigate to **Classification** page
2. Enter processor name: "Death Certificate Classifier"
3. Select model: "Supervised Learning"
4. Set confidence: 85%
5. Add category: "Death Certificate"
6. Enable OCR preprocessing
7. Click **Save Configuration**

### Example: ACORD Form Extractor

1. Navigate to **Extraction** page
2. Enter processor name: "ACORD Form Data Extractor"
3. Select document type: "ACORD Forms"
4. Select method: "Form Data (AnalyzeDocument)"
5. Add fields:
   - policy_number (text, required)
   - insured_name (text, required)
   - benefit_amount (currency, required)
6. Enable validation
7. Click **Save Configuration**

### Example: Claims Summarizer

1. Navigate to **Summarization** page
2. Enter processor name: "Claims Document Summarizer"
3. Select method: "Abstractive (AI-Generated)"
4. Set max length: 500 characters
5. Enable keyword extraction
6. Enable entity recognition
7. Click **Save Configuration**

## Step 5: Configure Integrations

### Amazon Textract

1. Go to **Integration** > **Amazon Textract** tab
2. Enter AWS Region: `us-east-1`
3. Enter AWS Access Key ID
4. Enter AWS Secret Access Key
5. Click **Test Connection**
6. Click **Save Configuration**

### ServiceNow

1. Go to **Integration** > **ServiceNow** tab
2. Enter instance: `dev12345.service-now.com`
3. Choose authentication method:
   - **Basic**: Enter username and password
   - **OAuth**: Enter client ID and secret
4. Click **Test Connection**
5. Configure table mappings
6. Click **Save Configuration**

## Common Tasks

### Test a Processor

1. Go to the configuration page (Classification, Extraction, or Summarization)
2. Click **Test** button in top right
3. Upload a sample document
4. View results

### View Processor Metrics

1. Go to **Dashboard**
2. Click on any processor card
3. View accuracy, documents processed, and other metrics

### Update Configuration

1. Navigate to the processor's configuration page
2. Make your changes
3. Click **Save Configuration**

## Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save configuration
- `Ctrl/Cmd + T` - Test processor
- `Ctrl/Cmd + /` - Search

## Tips & Best Practices

### Classification
- Start with 3-5 document categories
- Use supervised learning for known document types
- Set confidence threshold based on accuracy needs
- Include training data for better results

### Extraction
- Define all required fields first
- Use validation patterns for structured data
- Test with multiple document variations
- Enable normalization for consistency

### Summarization
- Choose extractive for factual summaries
- Use abstractive for natural language
- Set appropriate max length (300-500 chars)
- Enable entities for structured information

### Integration
- Use OAuth 2.0 for ServiceNow (more secure)
- Test connections before saving
- Configure proper IAM permissions for Textract
- Use S3 for large document processing

## Troubleshooting

### Application won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Connection issues
- Verify credentials are correct
- Check network/firewall settings
- Ensure IAM permissions are proper
- Test connection from Integration page

### Build errors
```bash
# Clear cache and rebuild
npm run build
```

## Next Steps

1. **Explore Advanced Features**
   - Batch processing
   - Custom templates
   - Analytics dashboard

2. **Configure Workflows**
   - Set up auto-routing
   - Define processing pipelines
   - Configure notifications

3. **Monitor Performance**
   - View analytics
   - Track accuracy metrics
   - Review processed documents

## Resources

- [Full Documentation](./README.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [API Reference](./API.md)
- GitHub Issues for support

## Need Help?

- Check the README for detailed information
- Review example configurations
- Contact the development team
- Create an issue on GitHub

---

**Happy Processing!** 🚀
