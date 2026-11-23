# SecurePass — Architecture Plan

## Overview

SecurePass follows a client-heavy architecture where security-critical operations (encryption, decryption, key derivation) happen exclusively in the browser. The server (Firebase) stores only encrypted data and handles authentication.

## System Components

### 1. Frontend (Next.js App Router)

```
src/
├── app/                    # Route-based pages
│   ├── layout.tsx          # Root layout (dark theme)
│   ├── page.tsx            # Landing / marketing page
│   ├── login/page.tsx      # Authentication — login
│   ├── register/page.tsx   # Authentication — registration
│   ├── dashboard/page.tsx  # Vault interface
│   └── generator/page.tsx  # Password generator tool
├── components/             # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── FeatureCard.tsx
└── lib/                    # Utility modules (planned)
    ├── firebase.ts         # Firebase configuration (Week 2)
    ├── crypto.ts           # Encryption/decryption (Week 3)
    └── totp.ts             # TOTP generation/verification (Week 5)
```

### 2. Firebase Services (Weeks 2+)

| Service | Purpose | Status |
|---------|---------|--------|
| Authentication | Email/password signup and login | Week 2 |
| Firestore | Store encrypted credential blobs | Week 2 |
| Security Rules | Restrict data access per user | Week 2 |

### 3. Python FastAPI Backend (Planned)

As proposed in the approved project synopsis, a FastAPI backend may handle:
- Server-side validation
- Rate limiting
- Password breach checking via APIs
- Admin functionality

**Decision pending:** The team and supervisor will decide whether to proceed with FastAPI or keep the architecture fully serverless with Firebase.

## Encryption Architecture (Week 3+)

### Key Derivation
```
Master Passphrase → PBKDF2 (or Argon2) → Encryption Key (AES-256)
```

### Credential Encryption
```
Credential (plaintext) → AES-256-GCM Encrypt → Encrypted Blob → Firestore
```

### Credential Decryption
```
Firestore → Encrypted Blob → AES-256-GCM Decrypt (client-side) → Credential
```

**Zero-knowledge:** Firebase never receives the master passphrase or derived key.

## Authentication Flow (Week 2+)

```
1. User registers with email + password via Firebase Auth
2. Firebase returns auth token
3. User sets master passphrase (separate from account password)
4. Master passphrase derives encryption key locally
5. Key encrypts/decrypts vault data
```

## 2FA Flow (Week 5+)

```
1. User enables TOTP in settings
2. App generates TOTP secret and displays QR code
3. User scans with authenticator app (Google Authenticator, etc.)
4. On login, user enters 6-digit TOTP code
5. App verifies TOTP before granting vault access
```

## Security Principles

1. **Client-side encryption** — All encryption/decryption in the browser.
2. **No plaintext storage** — Server only stores encrypted blobs.
3. **Secure randomness** — `crypto.getRandomValues` for all random generation.
4. **Input validation** — Client and server-side validation for all inputs.
5. **HTTPS only** — All communications over TLS (enforced by Firebase hosting).
6. **Minimal dependencies** — Avoid unnecessary third-party packages for security-critical code.

## Current Implementation (Week 1)

| Component | Status | Notes |
|-----------|--------|-------|
| Landing page | ✅ Done | Responsive dark-mode design |
| Login form | ✅ Done | Validation only, Firebase not connected |
| Registration form | ✅ Done | Validation only, Firebase not connected |
| Dashboard | ✅ Done | Placeholder vault, navigation |
| Password generator | ✅ Done | Crypto.getRandomValues, strength meter |
| Firebase Auth | ⬜ Week 2 | Requires Firebase project setup |
| Firestore | ⬜ Week 2 | Database design pending |
| Encryption module | ⬜ Week 3 | AES-256-GCM implementation |
| TOTP module | ⬜ Week 5 | RFC 6238 implementation |
