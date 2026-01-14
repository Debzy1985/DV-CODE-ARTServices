# ART Services - API Endpoints Specification

## Base URL
`https://api.artservices.co.uk/v1` (Production)
`https://api.staging.artservices.co.uk/v1` (Staging)

## Authentication
All endpoints (except auth) require a JWT token in the header:
`Authorization: Bearer <your_jwt_token>`

## Core Endpoints

###  Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | Authenticate user/operator |
| `POST` | `/auth/register` | Register new customer |
| `POST` | `/auth/register/operator` | Register new operator |
| `POST` | `/auth/refresh` | Refresh access token |

###  Service Requests (Core Workflow)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/requests` | Create a new breakdown request |
| `GET` | `/requests/{id}` | Get details of a specific request |
| `GET` | `/requests/user/current` | Get current user's active requests |
| `PUT` | `/requests/{id}/status` | Update request status (e.g., `en_route`) |
| `POST` | `/requests/{id}/location` | Update live GPS coordinates |

###  Operator Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/operators/available` | List available operators near location |
| `POST` | `/operators/{id}/availability` | Update operator availability status |
| `GET` | `/operators/{id}/jobs` | Get operator's job history |

###  Payments (Stripe Integration)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/payments/intent` | Create a Stripe PaymentIntent |
| `POST` | `/payments/confirm/{intentId}` | Confirm a completed payment |

## Real-time WebSocket Events
**Connection Endpoint:** `wss://ws.artservices.co.uk`

**Key Events:**
- `request:created` → Sent to available operators in the area
- `request:assigned` → Sent to customer with operator details
- `location:updated` → Live GPS updates between customer and operator
- `eta:updated` → Updated Estimated Time of Arrival

**Example Client-Side Connection:**
```javascript
const socket = io('wss://ws.artservices.co.uk', {
  auth: { token: userToken },
  query: { userType: 'customer' }
});
