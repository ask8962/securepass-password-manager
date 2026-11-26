# SecurePass — 25% Major Project Presentation Progress

**Project:** SecurePass – A Secure Password Manager with Two-Factor Authentication (2FA)  
**Institution:** GLA University, Mathura  
**Course:** B.Tech Computer Science & Engineering (Final Year)  
**Project Group:** G195  
**Target Milestone Presentation:** December 5, 2026 (20–25% Implementation Review)  
**Repository:** [https://github.com/ask8962/securepass-password-manager](https://github.com/ask8962/securepass-password-manager)  

---

## 1. Executive Summary

This document provides a factual assessment of the 20–25% milestone prototype developed for the initial major project review. The prototype demonstrates the core architectural foundations of SecurePass: **user identity management**, **cryptographic random password generation**, and **zero-knowledge client-side encryption**.

All features in this prototype run locally, utilize standard browser security standards (Web Crypto API), and adhere to academic requirements set forth in the approved project synopsis.

---

## 2. Team Member Contributions

| Member Name | Role & Responsibility | Prototype Contribution |
| :--- | :--- | :--- |
| **Anukalp Gupta** | Project Integration & Architecture | Next.js 16 app setup, AuthContext/Firebase & Web Crypto integration, Git PR merges |
| **Nishant Singh** | Frontend & UI Review | UI/responsiveness review and landing page `'Available'` status badge fix (PR #2) |
| **Dileep Bhardwaj** | Authentication & Firebase | Auth validation review, Firebase flows, and live authentication testing |
| **Ayushmaan Gupta** | Cryptography & Password Generator | Ambiguous-character exclusion toggle and generator test documentation (PR #3) |
| **Utpal Kumar** | Testing & Documentation | Manual verification testing, documentation review, and local encryption demo |

---

## 3. Implemented Features (Completed 20–25% Scope)

### 3.1. Firebase Authentication
- **Registration (`/register`):** Functional user sign-up using Firebase Email & Password authentication, saving Full Name via `updateProfile()`, with consistent validation and error messages (`src/lib/authValidation.ts`).
- **Login (`/login`):** Secure login interface validating against Firebase Auth (`>= 6` characters minimum so existing valid Firebase accounts are never rejected).
- **Session Persistence:** Persistent user sessions managed via Firebase Auth SDK (`onAuthStateChanged`). Refreshing the browser preserves active authentication state.
- **Route Protection:** Protected client-side route guards on `/dashboard`. Unauthenticated visitors are automatically redirected to `/login`.
- **User Dashboard & Logout:** Displays active authenticated user's profile name/email and allows one-click sign-out.
- **Graceful Offline/Config Fallback:** If Firebase credentials are not yet configured in `.env.local`, friendly configuration notices appear without crashing the application.

### 3.2. Cryptographically Secure Password Generator (`/generator`)
- **CSPRNG Implementation:** Uses standard `window.crypto.getRandomValues()` instead of pseudo-random `Math.random()`, initialized dynamically on the client (`next/dynamic` with `ssr: false`) with zero hardcoded initial passwords and zero hydration errors.
- **Configurable Length:** Supports variable password lengths from 4 to 128 characters (default: 16).
- **Character Class Selection & Ambiguous Filtering:** Independent toggles for Uppercase (`A-Z`), Lowercase (`a-z`), Numbers (`0-9`), Special Symbols (`!@#$%^&*()_+-=[]{}|;:,.<>?`), and an **Exclude ambiguous characters (`0, O, 1, l, I`)** option.
- **Interactive Controls:** One-click regeneration, one-click clipboard copy with visual feedback, and a 7-rule strength meter (`Weak`, `Fair`, `Good`, `Strong`).

### 3.3. Client-Side Web Crypto Encryption Demo (`/dashboard`)
- **Zero-Knowledge Architecture:** Cryptographic operations execute completely within the client browser using the W3C Web Crypto API (`window.crypto.subtle`).
- **Key Derivation (PBKDF2):** Derives a 256-bit AES key from a user-supplied Master Passphrase using PBKDF2 with SHA-256, 100,000 iterations, and a cryptographically random 128-bit salt.
- **Authenticated Encryption (AES-256-GCM):** Encrypts plaintext passwords using 256-bit AES in Galois/Counter Mode (GCM) with a unique 96-bit initialization vector (IV).
- **Integrity & Authentication:** GCM automatically generates and validates a 128-bit authentication tag. Tampering or entering the incorrect passphrase immediately triggers an authentication tag mismatch error, preventing corrupted decryptions.
- **In-Memory Demonstration:** Operates purely in component state without saving unencrypted data to disk, local storage, or external networks.

### 3.4. User Interface & Design Standards
- **Clean Minimal Design:** Neutral palette (`#FAFAFA` background, `#FFFFFF` cards, `#E5E7EB` borders, `#2563EB` blue accents) inspired by modern cybersecurity utilities.
- **Consistent Iconography:** Integrated with Lucide React icons.
- **Zero Hallucinated Metrics:** Removed all AI-generated placeholder statistics, marketing buzzwords, or fake vault counters.

---

## 4. Pending Features (Roadmap for Weeks 2–8 / 50%–100% Scope)

The following components are intentionally planned for subsequent milestones in accordance with the weekly academic delivery schedule:

```
[Phase 1: 25% (Done)]   ──> [Phase 2: 50%]           ──> [Phase 3: 75%]          ──> [Phase 4: 100%]
• Firebase Auth             • Firestore Vault Storage    • Python FastAPI Sync       • Security Audit
• CSPRNG Generator          • Encrypted CRUD operations  • Master Password Recovery  • Final Report
• Local Web Crypto Demo     • TOTP 2FA (Authenticator)   • Password Health Audit     • Final Viva Prep
```

1. **Persistent Encrypted Vault Storage (Milestone 2 - 50%):**
   - Cloud Firestore integration to store encrypted ciphertext, salt, and IV records linked to authenticated user accounts.
   - Client-side master key caching (session-based) to unlock vault items seamlessly.
2. **Two-Factor Authentication / TOTP (Milestone 2 - 50%):**
   - Time-based One-Time Password (TOTP) algorithm (RFC 6238) for two-factor verification using Google Authenticator or Microsoft Authenticator.
3. **Python FastAPI Backend (Milestone 3 - 75%):**
   - Auxiliary microservice for specialized security validations, breach database lookups (HaveIBeenPwned API hashing), and audit logging as proposed in the synopsis.
4. **Vault Health & Security Analysis (Milestone 3 - 75%):**
   - Local vault auditing to flag re-used, weak, or compromised passwords.
5. **Secure Vault Export/Import & Emergency Access (Milestone 4 - 100%):**
   - Encrypted JSON export/import format for user data ownership.
   - Comprehensive system testing, unit tests, and final dissertation report.

---

## 5. Supervisor Verification Checklist

| Verification Item | Status | Verification Method |
| :--- | :--- | :--- |
| Project compiles without warnings/errors | **PASSED** | `npx tsc --noEmit && npm run lint && npm run build` |
| Local development server runs cleanly | **PASSED** | `npm run dev` at `http://localhost:3000` |
| User can sign up with email and password | **VERIFIED** | Registration form creates user in Firebase Auth |
| User session persists on page refresh | **VERIFIED** | Handled by Firebase Auth SDK state observer |
| Protected routes reject unauthenticated users | **VERIFIED** | Redirects from `/dashboard` to `/login` |
| Passwords generated using cryptographic randomness | **VERIFIED** | Verified `window.crypto.getRandomValues()` usage |
| Encryption uses AES-256-GCM with PBKDF2 | **VERIFIED** | Verified Web Crypto API parameter configuration |
| Decryption fails gracefully on wrong passphrase | **VERIFIED** | GCM authentication tag verification triggers failure alert |
