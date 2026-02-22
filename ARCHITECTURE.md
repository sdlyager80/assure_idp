# Assure IDP - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend (Assure IDP)              │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │Classification│  │  Extraction  │  │Summarization │      │
│  │  Configure   │  │  Configure   │  │  Configure   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Integration  │  │   Testing    │  │  Analytics   │      │
│  │   Settings   │  │  Interface   │  │  Dashboard   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ REST API / SDK
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Integration Layer                           │
│                                                               │
│  ┌──────────────────┐              ┌──────────────────┐    │
│  │  Amazon Textract │              │   ServiceNow     │    │
│  │                  │              │                  │    │
│  │  • OCR           │              │  • Tables        │    │
│  │  • Forms         │              │  • Attachments   │    │
│  │  • Tables        │              │  • Work Notes    │    │
│  │  • Queries       │              │  • REST API      │    │
│  └──────────────────┘              └──────────────────┘    │
│                                                               │
│  ┌──────────────────┐              ┌──────────────────┐    │
│  │   Amazon S3      │              │  Claude AI       │    │
│  │                  │              │                  │    │
│  │  • Document      │              │  • Summarization │    │
│  │    Storage       │              │  • Entity Extract│    │
│  └──────────────────┘              └──────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Layer

```
src/
├── main.jsx                    # App entry point
├── App.jsx                     # Root component, routing
├── theme.js                    # MUI theme configuration
│
├── components/
│   └── Layout/
│       └── Layout.jsx          # App shell with navigation
│
└── pages/
    ├── Dashboard/              # Overview & metrics
    ├── Classification/         # Document classifier config
    ├── Extraction/            # Data extraction config
    ├── Summarization/         # Summary generation config
    ├── Integration/           # External service setup
    ├── Processors/            # Processor management
    ├── Testing/               # Test interface
    └── Analytics/             # Performance analytics
```

## Data Flow

### Document Classification Flow

```
User Upload
    │
    ▼
Frontend (React)
    │
    ▼
Configuration
    │
    ├─→ Document Category Rules
    ├─→ Confidence Threshold
    └─→ OCR Settings
    │
    ▼
Amazon Textract
    │
    ├─→ DetectDocumentText (OCR)
    └─→ Custom Classification Logic
    │
    ▼
Classification Result
    │
    ▼
ServiceNow
    │
    └─→ Update document_type field
```

### Data Extraction Flow

```
Document Input
    │
    ▼
Frontend Configuration
    │
    ├─→ Field Definitions
    ├─→ Validation Rules
    └─→ Extraction Method
    │
    ▼
Amazon Textract
    │
    ├─→ AnalyzeDocument (Forms)
    ├─→ Table Detection
    └─→ Key-Value Pairs
    │
    ▼
Post-Processing
    │
    ├─→ Data Validation
    ├─→ Normalization
    └─→ Enrichment
    │
    ▼
ServiceNow
    │
    └─→ Create/Update Records
```

### Summarization Flow

```
Document Text
    │
    ▼
Amazon Textract
    │
    └─→ Extract Full Text (OCR)
    │
    ▼
Frontend Configuration
    │
    ├─→ Summary Method
    ├─→ Max Length
    └─→ Focus Area
    │
    ▼
Claude AI
    │
    ├─→ Generate Summary
    ├─→ Extract Keywords
    └─→ Identify Entities
    │
    ▼
Formatting
    │
    └─→ Output Format (Text/Markdown/HTML/JSON)
    │
    ▼
ServiceNow
    │
    └─→ Append to work_notes
```

## Technology Stack

### Frontend
- **React 18.3.1** - UI framework
- **Material-UI 5.15** - Component library
- **React Router 6** - Client-side routing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client

### AWS Services
- **Amazon Textract** - Document analysis
- **Amazon S3** - Document storage
- **Amazon Comprehend** - NER (optional)
- **IAM** - Authentication & permissions

### ServiceNow
- **REST API** - Data integration
- **Table API** - CRUD operations
- **Attachment API** - Document management
- **OAuth 2.0** - Authentication

### AI Services
- **Claude (Anthropic)** - Text summarization
- **Amazon Bedrock** - AI model hosting (optional)

## Security Architecture

### Authentication Flow

```
User Login
    │
    ▼
Frontend Auth
    │
    ├─→ ServiceNow OAuth
    │       │
    │       ├─→ Client ID/Secret
    │       └─→ Access Token
    │
    └─→ AWS IAM
            │
            ├─→ Access Key/Secret
            └─→ Temporary Credentials
```

### Data Security

- **Encryption in Transit**: HTTPS/TLS 1.2+
- **Encryption at Rest**: S3 server-side encryption
- **Authentication**: OAuth 2.0, AWS IAM
- **Authorization**: ServiceNow roles, AWS policies
- **Data Privacy**: No PII stored in frontend
- **Audit Logging**: All API calls logged

## Scalability

### Horizontal Scaling
- Frontend: CDN distribution (CloudFront, Vercel)
- API: Serverless functions (Lambda)
- Storage: S3 auto-scaling

### Performance Optimization
- **Lazy Loading**: Route-based code splitting
- **Caching**: Browser cache, API response cache
- **Async Processing**: Large documents via async Textract API
- **Batch Processing**: Multiple documents in parallel

## Integration Points

### Amazon Textract APIs

```javascript
// Synchronous (< 5MB)
textract.analyzeDocument({
  Document: { Bytes: documentBuffer },
  FeatureTypes: ['FORMS', 'TABLES', 'QUERIES']
});

// Asynchronous (> 5MB)
textract.startDocumentAnalysis({
  DocumentLocation: {
    S3Object: { Bucket, Name }
  },
  FeatureTypes: ['FORMS', 'TABLES']
});
```

### ServiceNow REST API

```javascript
// Create record
POST /api/now/table/{table_name}
{
  "document_type": "Death Certificate",
  "extracted_data": {...},
  "ai_summary": "..."
}

// Attach document
POST /api/now/attachment/file
Content-Type: multipart/form-data
table_name: x_dxcis_claims_docs
table_sys_id: {record_id}
```

## Deployment Architecture

### Development
```
Local Machine
    │
    ├─→ Vite Dev Server (localhost:3000)
    ├─→ Hot Module Replacement
    └─→ Mock API responses
```

### Production
```
CloudFront (CDN)
    │
    ▼
S3 Static Hosting
    │
    ├─→ React Build (dist/)
    ├─→ Gzip Compression
    └─→ Cache Headers
    │
    ▼
API Gateway
    │
    └─→ Lambda Functions
```

## Monitoring & Observability

### Metrics
- Document processing time
- API response times
- Classification accuracy
- Extraction success rate
- Error rates

### Logging
- Frontend: Console errors
- Backend: CloudWatch Logs
- ServiceNow: System logs
- Textract: API usage logs

## Future Enhancements

### Planned Features
1. **Batch Processing** - Multiple documents at once
2. **Workflow Automation** - Trigger-based processing
3. **Custom Templates** - Reusable configurations
4. **Advanced Analytics** - ML-powered insights
5. **Mobile App** - React Native version
6. **Real-time Updates** - WebSocket notifications

### Technical Improvements
1. GraphQL API
2. State management (Redux/Zustand)
3. Progressive Web App (PWA)
4. Offline capability
5. Multi-tenancy support
6. Advanced caching strategies

---

**For detailed API documentation, see** [API.md](./API.md)
**For deployment guides, see** [DEPLOYMENT.md](./DEPLOYMENT.md)
