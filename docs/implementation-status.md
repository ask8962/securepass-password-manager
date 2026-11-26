# SecurePass — Technical Implementation Status

**Project:** SecurePass – Password Manager with Two-Factor Authentication  
**Group:** G195 | GLA University, Mathura  
**Milestone:** 25–30% Major Project Review (December 5, 2026)  
**Document Purpose:** Factual technical reference of implemented subsystems matching the actual repository code.

---

## 1. System Architecture Overview

SecurePass demonstrates a **Zero-Knowledge Client-Side Encryption** model. Cryptographic operations run inside the browser using the W3C Web Crypto API (`window.crypto`), while Firebase Authentication manages user login identity.

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT BROWSER                                    |
|                                                                                   |
|   +-----------------------+     +--------------------+     +------------------+   |
|   |   Master Passphrase   |     | Plaintext Password |     | CSPRNG Generator |   |
|   +-----------+-----------+     +---------+----------+     +--------+---------+   |
|               |                           |                         |             |
|               v                           |       window.crypto.getRandomValues() |
|   +-----------------------+               |                         |             |
|   |  PBKDF2 Key Derivation|               |                         v             |
|   |  - SHA-256            |               |               Generated Password      |
|   |  - 100,000 Iterations |               |           (4-128 chars, excl. [0O1lI])|
|   |  - 128-bit Salt       |               |                                       |
|   +-----------+-----------+               |                                       |
|               |                           |                                       |
|               v (256-bit AES Key)         |                                       |
|   +---------------------------------------v-----------------------------------+   |
|   |                     AES-256-GCM Authenticated Encryption                  |   |
|   |                     - 96-bit Random IV                                    |   |
|   |                     - 128-bit Authentication Tag                          |   |
|   +---------------------------------------+-----------------------------------+   |
|                                           |                                       |
|                                           v                                       |
|                        { Salt, IV, Ciphertext+AuthTag }                           |
|                         (Base64 in React Memory RAM)                              |
+-------------------------------------------+---------------------------------------+
                                            |
                                            v (Planned Phase 2 Milestone)
                              +--------------------------+
                              |   Cloud Firestore / DB   |
                              |  (Not Implemented Yet)   |
                              +--------------------------+
```

---

## 2. Implemented Subsystems

### 2.1. Firebase Authentication Engine
- **Module Paths:** `src/lib/firebase.ts`, `src/lib/authValidation.ts`, `src/context/AuthContext.tsx`, `src/app/login/page.tsx`, `src/app/register/page.tsx`
- **SDK & Method:** Official Firebase Client SDK (`firebase ^13.4.0`), Email & Password provider (`createUserWithEmailAndPassword`, `updateProfile`, `signInWithEmailAndPassword`, `signOut`). Analytics is omitted.
- **Singleton Safety:** Checks `typeof window !== "undefined"` and `getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)` so Firebase initializes only once.
- **Profile Display Name (`updateProfile`):** During registration (`src/app/register/page.tsx`), the validated Full Name is saved to the Firebase user's `displayName` via `updateProfile()` inside dedicated error handling, followed by `refreshUser()` in `AuthContext` so the dashboard displays it immediately.
- **Session Management:** `AuthContext` subscribes to `onAuthStateChanged`, preserving signed-in state across browser refreshes.
- **Route Guarding:** `src/app/dashboard/page.tsx` checks `!loading && isConfigured && !user` inside `useEffect` and calls `router.replace("/login")` for unauthenticated visitors.
- **Validation Consistency (`src/lib/authValidation.ts`):**
  - Shared email validator (`Email address is required.` / `Please enter a valid email address.`), matching Firebase error mapping (`auth/invalid-email`).
  - Registration enforces minimum 8 characters (`MIN_REGISTER_PASSWORD_LENGTH = 8`) while Login uses Firebase's 6-character minimum (`MIN_LOGIN_PASSWORD_LENGTH = 6`) so valid existing 6–7 character Firebase accounts are never incorrectly rejected.
  - Shared Firebase error mapping handles `auth/invalid-credential`, `auth/user-not-found`, `auth/wrong-password`, `auth/email-already-in-use`, `auth/weak-password`, `auth/user-disabled`, `auth/too-many-requests`, and `auth/network-request-failed`.
- **Configuration Fallback:** When `.env.local` is absent, `isFirebaseConfigured()` returns `false` and the UI displays an informative setup notice without crashing.

### 2.2. Cryptographically Secure Password Generator
- **Module Paths:** `src/app/generator/page.tsx`, `src/app/generator/PasswordGeneratorClient.tsx`
- **Hydration-Safe Client Initialization:** `page.tsx` loads `PasswordGeneratorClient` using `next/dynamic(..., { ssr: false })`. On browser initialization, `useState` calls `createCryptographicPassword()` immediately with `window.crypto.getRandomValues()`—producing a fresh cryptographic password on load without static placeholders or SSR hydration mismatches.
- **Randomness Source:** `window.crypto.getRandomValues(new Uint32Array(length))` (W3C Web Crypto CSPRNG).
- **Configurable Parameters:**
  - Length slider: `4` to `128` characters (default: `16`).
  - Character classes: Uppercase (`A-Z`), Lowercase (`a-z`), Numbers (`0-9`), Special Symbols (`!@#$%^&*()_+-=[]{}|;:,.<>?`).
  - **Exclude Ambiguous Characters:** Optional toggle (`excludeAmbiguous`) added via PR #3 (`c03aaf6`) filtering `/[0O1lI]/g` from both the character pool and required sets.
  - **Guaranteed Class Inclusion:** Ensures at least one character from each active selected set appears at distinct random positions.
- **Strength Indicator (`getStrength`):** Evaluates password strength using a 7-rule heuristic score (length `>= 10`, `>= 14`, `>= 18`, uppercase, lowercase, numeric digit, and non-alphanumeric symbol) mapped to `Weak`, `Fair`, `Good`, and `Strong`. *(Note: This uses rule-based scoring rather than logarithmic Shannon entropy calculation.)*

### 2.3. Local Web Crypto Encryption Demonstration
- **Module Paths:** `src/lib/crypto.ts`, `src/app/dashboard/page.tsx`
- **Core Standard:** Browser native `window.crypto.subtle` (requires `https://` or `http://localhost` Secure Context).
- **PBKDF2 Key Derivation:** `PBKDF2` with `SHA-256`, `100,000` iterations (`CRYPTO_CONFIG.PBKDF2_ITERATIONS`), and a random 128-bit (`16`-byte) salt per encryption, yielding a non-extractable (`false`) 256-bit `AES-GCM` `CryptoKey`.
- **Authenticated Encryption (AES-256-GCM):** Encrypts the sample password plaintext using a fresh 96-bit (`12`-byte) random IV. Web Crypto automatically appends the 128-bit authentication tag to the ciphertext output.
- **Decryption & Integrity Check:** `decryptPassword()` re-derives the key from the entered passphrase and stored salt, then calls `subtle.decrypt()`. Any wrong passphrase or ciphertext tampering fails authentication tag verification (`OperationError`) and surfaces `"Authentication Tag Rejected"`.
- **Ephemeral Scope:** Encrypted payloads exist only in React component state (`useState`) in RAM for demonstration; Website and Username inputs provide UI context only, and nothing is saved to Firestore or `localStorage`.

---

## 3. Technology Stack Matrix (Verified from `package.json`)

| Component | Package / Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.4.6` | Routing and optimized Webpack production build |
| **UI Library** | React / React DOM | `19.3.0` | Component rendering and client state |
| **Language** | TypeScript | `^5` | Strict type checking (`noEmit`) |
| **Styling** | Tailwind CSS | `4.3.3` | Utility-first light minimal theme |
| **Icons** | Lucide React | `^1.78.0` | Interface iconography |
| **Auth SDK** | `firebase` (Auth client) | `^13.4.0` | Email/Password auth and profile updates |
| **Cryptography** | Browser Web Crypto API | Native W3C | CSPRNG, PBKDF2-SHA-256, AES-256-GCM |

---

## 4. Verification Status

Verification runs via CLI checks (`npx tsc --noEmit`, `npm run lint`, `npm run build` with `next build --webpack`) plus manual browser verification. No automated unit/E2E test runner (Jest/Vitest/Playwright) is configured yet in `package.json`.
