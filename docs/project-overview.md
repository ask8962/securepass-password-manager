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
- **Next.js `16.4.6`** — React framework with App Router (`src/app/`).
- **React `19.3.0` & TypeScript `^5`** — Component UI with strict compile-time type checking.
- **Tailwind CSS `4.3.3`** — Utility-first CSS framework for minimal light-mode responsive design.

### Authentication & Client Crypto (Implemented in Prototype)
- **Firebase Authentication (`firebase ^13.4.0`)** — Email/Password signup (`updateProfile` saving `displayName`), login, logout, and persistent sessions.
- **Web Crypto API (`window.crypto`)** — `crypto.getRandomValues` for password generation plus in-memory `PBKDF2-SHA-256` and `AES-256-GCM` encryption demonstration.

### Future / Planned Modules
- **Firebase Firestore** (Planned) — Cloud database for persistent encrypted credential storage.
- **TOTP (RFC 6238)** (Planned) — Time-based one-time password for 2FA.
- **Python FastAPI** (Planned) — Auxiliary REST API backend as proposed in the approved synopsis.

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

## Known Limitations (Current 25–30% Prototype)
1. **No Firestore Vault Persistence Yet:** Encrypted credentials in the `/dashboard` demonstration stay in browser memory (`React useState`) only and clear on reload.
2. **No TOTP 2FA Yet:** Marked `"Coming Soon"` on the UI; planned for Phase 3.
3. **FastAPI Backend Pending:** Proposed in the approved synopsis, not yet implemented.
4. **No Automated Test Runner Yet:** Verification uses `npx tsc --noEmit`, `npm run lint`, `npm run build`, and manual testing.

## References
- OWASP Password Storage Cheat Sheet
- RFC 6238 — TOTP: Time-Based One-Time Password Algorithm
- Web Crypto API — MDN Documentation
- Firebase Documentation
- Next.js Documentation
