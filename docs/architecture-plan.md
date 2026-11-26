# SecurePass — Architecture Plan

## Overview

SecurePass follows a client-heavy architecture where security-critical operations (encryption, decryption, key derivation) happen exclusively in the browser. The server (Firebase) stores only encrypted data and handles authentication.

## System Components

### 1. Frontend (Next.js App Router)

```
src/
├── app/                         # Route-based pages (light theme)
│   ├── layout.tsx               # Root layout wrapping AuthProvider
│   ├── page.tsx                 # Minimal landing page
│   ├── login/page.tsx           # Firebase Email/Password login
│   ├── register/page.tsx        # Firebase registration + updateProfile()
│   ├── dashboard/page.tsx       # Protected dashboard + AES-256-GCM local demo
│   └── generator/
│       ├── page.tsx             # Client-only dynamic wrapper (ssr: false)
│       └── PasswordGeneratorClient.tsx # CSPRNG generator + excludeAmbiguous
├── components/
│   ├── Header.tsx               # Navigation header
│   └── Footer.tsx               # Page footer
├── context/
│   └── AuthContext.tsx          # onAuthStateChanged session + logout + refreshUser
└── lib/
    ├── firebase.ts              # Singleton Firebase App & Auth init
    ├── authValidation.ts        # Shared login/register validation & error messages
    ├── crypto.ts                # Web Crypto PBKDF2 + AES-256-GCM demo module
    └── totp.ts                  # TOTP verification (Planned - Phase 3)
```

### 2. Firebase Services

| Service | Purpose | Status |
|---------|---------|--------|
| Authentication | Email/password signup (`updateProfile`), login, session persistence | ✅ Implemented |
| Firestore | Store encrypted credential blobs | ⬜ Planned |
| Security Rules | Restrict data access per user | ⬜ Planned |

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

## Current Implementation (25–30% Prototype)

| Component | Status | Notes |
|-----------|--------|-------|
| Landing page | ✅ Done | Minimal light-theme design |
| Login form | ✅ Done | Connected to Firebase Auth + shared validation (`>= 6` chars) |
| Registration form | ✅ Done | Connected to Firebase Auth + `updateProfile()` saving Full Name |
| Dashboard & Demo | ✅ Done | Client-side route guard + AES-256-GCM / PBKDF2 in-memory demo |
| Password generator | ✅ Done | Client-initialized `crypto.getRandomValues`, `excludeAmbiguous`, 7-rule meter |
| Firestore | ⬜ Planned | Persistent encrypted credential storage |
| TOTP module | ⬜ Planned | RFC 6238 two-factor verification |
| FastAPI backend | ⬜ Planned | Proposed auxiliary API in synopsis |
