# Security Architecture & Compliance

## 1. Authentication & Authorization

### JSON Web Tokens (JWT)
- **Access Token:** Short-lived (15 minutes), signed with RS256 algorithm
- **Refresh Token:** Long-lived (7 days), stored in HTTP-only cookie
- **Implementation:**
```typescript
// Token generation and verification
import jwt from 'jsonwebtoken';

const accessToken = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '15m', algorithm: 'RS256' }
);

Role-Based Access Control (RBAC)

Three-tier permission system:

    Customers: Can create/view their own requests

    Operators: Can view/accept assigned jobs, update locations

    Administrators: Full system access, user management

2. Data Protection & Encryption
At Rest (PostgreSQL)

    Full Disk Encryption: Via Supabase (AES-256)

    Column-level Encryption: For PII using pgcrypto

    Database Field Encryption:

sql

-- Example of encrypted phone number storage
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (phone_number) 
VALUES (pgp_sym_encrypt('+441234567890', 'encryption_key'));

In Transit (TLS/SSL)

    All Connections: Enforced TLS 1.3

    Certificate Management: Automated via Let's Encrypt

    HSTS Headers: Strict-Transport-Security: max-age=31536000

3. Payment Security (Stripe Integration)
PCI DSS Compliance

    No Card Data Storage: Payment details never touch our servers

    Stripe Elements: PCI-compliant iframe for card input

    3D Secure 2.0: Mandatory for UK/European customers

Implementation
typescript

// Frontend payment processing
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);

const { error, paymentIntent } = await stripe.confirmCardPayment(
  clientSecret,
  { payment_method: { card: elements.getElement(CardNumberElement) } }
);

4. API Security
Rate Limiting

    Global Limit: 100 requests/minute per IP

    Authentication Endpoints: 5 attempts/minute

    Implementation: Using express-rate-limit middleware

Input Validation & Sanitization
typescript

// Using Zod for schema validation
import { z } from 'zod';

const ServiceRequestSchema = z.object({
  vehicleType: z.enum(['car', 'van', 'ev', 'motorcycle']),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  issueDescription: z.string().min(10).max(500)
});

5. Infrastructure Security
Supabase Security Features

    Row Level Security (RLS): Granular database access control

    Network Restrictions: IP allowlisting for database access

    Audit Logging: All database operations logged

Environment Security

    Secrets Management: Environment variables for all credentials

    .gitignore: Ensuring no secrets in version control

    Regular Rotation: API keys rotated quarterly

6. GDPR & UK Data Protection Compliance
Data Processing Principles

    Lawful Basis: Contractual necessity for service delivery

    Data Minimization: Only collect essential information

    Retention Policy: User data deleted after 7 years of inactivity

User Rights Implementation

    Right to Access: User data export functionality

    Right to Erasure: Complete account deletion pipeline

    Data Processing Agreement: Signed with all sub-processors

7. Monitoring & Incident Response
Security Monitoring

    Intrusion Detection: Log analysis for suspicious patterns

    Failed Login Alerts: Immediate notification for brute force attempts

    Payment Fraud Detection: Integration with Stripe Radar

Incident Response Plan

    Identification: Automated alerting system

    Containment: Immediate API key rotation, IP blocking

    Eradication: Root cause analysis and patch deployment

    Recovery: Service restoration with enhanced monitoring

    Lessons Learned: Documentation and process improvement

8. Security Testing
Regular Assessments

    Static Analysis: SonarQube integration in CI/CD pipeline

    Dependency Scanning: Weekly npm audit checks

    Penetration Testing: Quarterly third-party assessments
