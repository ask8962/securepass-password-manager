# SecurePass — Project Overview

## Project Title
**SecurePass — A Secure Password Manager with Two-Factor Authentication (2FA)**

## Group
G195 — B.Tech CSE Final Year Project, GLA University, Mathura

## Problem Statement
Users commonly reuse weak passwords across multiple accounts, creating significant security vulnerabilities. Existing password managers are often proprietary, expensive, or opaque about their security implementations. SecurePass aims to provide a transparent, educationally documented password manager that demonstrates modern security practices.

## Proposed Solution
A web-based password manager featuring:
1. **Client-side encryption** — Passwords are encrypted in the browser before being stored. The server never sees plaintext credentials.
2. **Two-factor authentication (TOTP)** — An additional verification layer using time-based one-time passwords.
3. **Secure password generation** — Cryptographically random password generation using the Web Crypto API.
4. **Cloud synchronization** — Encrypted data synced across devices via Firebase Firestore.
5. **Master passphrase architecture** — A single strong passphrase unlocks the entire vault locally.

## Technology Stack

### Frontend
- **Next.js 16** — React framework with App Router for server and client components.
- **TypeScript** — Type-safe development with compile-time error checking.
- **Tailwind CSS 4** — Utility-first CSS framework for responsive design.

### Backend (Planned)
- **Firebase Authentication** — User signup, login, and session management.
- **Firebase Firestore** — Cloud database for encrypted credential storage.
- **Python FastAPI** — Optional REST API backend as proposed in the approved synopsis.

### Security
- **Web Crypto API** — `crypto.getRandomValues` for secure random number generation.
- **AES-256-GCM** (Planned) — Industry-standard encryption for stored credentials.
- **PBKDF2 / Argon2** (Planned) — Key derivation from master passphrase.
- **TOTP (RFC 6238)** (Planned) — Time-based one-time password for 2FA.

## Architecture Overview

```
┌──────────────────────────────────────────────┐
│                 Browser (Client)              │
│                                               │
│  ┌─────────┐  ┌──────────┐  ┌─────────────┐  │
│  │ Next.js │  │ Crypto   │  │  TOTP        │  │
│  │ UI      │──│ Module   │  │  Verifier    │  │
│  │         │  │ (AES-256)│  │  (RFC 6238)  │  │
│  └────┬────┘  └────┬─────┘  └──────┬──────┘  │
│       │            │               │          │
│       └────────────┴───────────────┘          │
│                     │                         │
└─────────────────────┼─────────────────────────┘
                      │ Encrypted data only
                      ▼
        ┌─────────────────────────┐
        │      Firebase Cloud      │
        │                          │
        │  ┌────────┐ ┌─────────┐  │
        │  │  Auth   │ │Firestore│  │
        │  │         │ │(Encrypted│  │
        │  │         │ │ Blobs)  │  │
        │  └────────┘ └─────────┘  │
        └─────────────────────────┘
```

**Key principle:** The server stores only encrypted blobs. Decryption happens exclusively on the client. This is a zero-knowledge architecture — even if the database is compromised, stored credentials remain encrypted.

## Development Phases

### Phase 1 (Weeks 1–2): Foundation
- Project setup and UI scaffolding.
- Authentication interface and Firebase integration.
- Password generator.

### Phase 2 (Weeks 3–4): Core Security
- Client-side encryption implementation.
- Encrypted credential CRUD operations.
- Master passphrase setup.

### Phase 3 (Weeks 5–6): 2FA
- TOTP enrollment and verification.
- Session management and auto-lock.

### Phase 4 (Weeks 7–8+): Hardening
- Recovery mechanisms.
- Security auditing tools.
- Testing, deployment, and documentation.

## Known Limitations (Current)
1. Firebase Authentication is not yet connected — UI validates but does not authenticate.
2. No credential storage or encryption is implemented — vault is a placeholder.
3. TOTP 2FA is planned but not started.
4. The FastAPI backend is part of the approved synopsis but architecture decisions are pending team and supervisor approval.

## References
- OWASP Password Storage Cheat Sheet
- RFC 6238 — TOTP: Time-Based One-Time Password Algorithm
- Web Crypto API — MDN Documentation
- Firebase Documentation
- Next.js Documentation
