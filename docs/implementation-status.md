# SecurePass — Technical Implementation Status

**Project:** SecurePass – Password Manager with Two-Factor Authentication  
**Group:** G195 | GLA University, Mathura  
**Milestone:** 25% Major Project Review (December 5, 2026)  
**Document Purpose:** Detailed technical reference of implemented subsystems, cryptographic primitives, and architecture.

---

## 1. System Architecture Overview

SecurePass follows a **Zero-Knowledge Client-Side Encryption** architecture. The core security principle is that the server (or backend host) must never have access to master passphrases or unencrypted credentials.

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT BROWSER                                    |
|                                                                                   |
|   +-----------------------+     +--------------------+     +------------------+   |
|   |   Master Passphrase   |     | Plaintext Password |     | CSPRNG Generator |   |
|   +-----------+-----------+     +---------+----------+     +--------+---------+   |
|               |                           |                         |             |
|               v                           |           crypto.getRandomValues()    |
|   +-----------------------+               |                         |             |
|   |  PBKDF2 Key Derivation|               |                         v             |
|   |  - SHA-256            |               |               Generated Password      |
|   |  - 100,000 Iterations |               |                                       |
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
|                        { Salt, IV, Ciphertext, AuthTag }                          |
|                               (Base64 Encoded)                                    |
+-------------------------------------------+---------------------------------------+
                                            |
                                            v (Future Milestone)
                              +--------------------------+
                              |   Cloud Firestore / DB   |
                              |  (Only Sees Ciphertext!) |
                              +--------------------------+
```

---

## 2. Implemented Subsystems

### 2.1. Firebase Authentication Engine
- **Module Path:** `src/lib/firebase.ts`, `src/context/AuthContext.tsx`
- **Authentication Method:** Firebase Authentication v12 (Email and Password provider).
- **Session Management:** Client-side state managed via `onAuthStateChanged` listener. User tokens and session status are automatically handled by the Firebase Client SDK with local storage persistence.
- **Route Guarding:** Implemented on `/dashboard` with client-side redirection (`useRouter().push('/login')`).
- **Configuration Resilience:** If environment variables in `.env.local` are omitted, the application does not crash. `isFirebaseConfigured()` flags missing credentials and displays a descriptive notice to the user, allowing safe testing without breaking builds.
- **Security Features:**
  - Password minimum length enforcement (minimum 6 characters as required by Firebase).
  - Sanitization of user input.
  - Granular error mapping: `auth/email-already-in-use`, `auth/wrong-password`, `auth/user-not-found`, `auth/invalid-credential`.

### 2.2. Cryptographically Secure Password Generator
- **Module Path:** `src/app/generator/page.tsx`
- **Randomness Source:** `window.crypto.getRandomValues()` (W3C Web Cryptography API standard).
- **Comparison with Insecure Methods:**
  - Standard `Math.random()` uses pseudo-random number generators (PRNG) that are deterministic and predictable, making them insecure for secret generation.
  - `crypto.getRandomValues()` uses cryptographically secure pseudo-random number generators (CSPRNG) seeded by the operating system's entropy pool (e.g., `/dev/urandom` or Windows CryptGenRandom).
- **Configurable Parameters:**
  - Length: 4 to 128 characters (user slider).
  - Character Sets:
    - Uppercase: `ABCDEFGHIJKLMNOPQRSTUVWXYZ` (26 chars)
    - Lowercase: `abcdefghijklmnopqrstuvwxyz` (26 chars)
    - Numbers: `0123456789` (10 chars)
    - Symbols: `!@#$%^&*()_+-=[]{}|;:,.<>?` (26 chars)
- **Entropy Calculation:**
  Calculated using the Shannon entropy formula:
  $$E = L \times \log_2(N)$$
  Where $L$ is password length and $N$ is pool size (sum of selected character classes, up to 88). A 16-character password with all 4 classes achieves $\approx 103.3$ bits of entropy, which is resilient against modern offline brute-force attacks.

### 2.3. Zero-Knowledge Web Crypto Encryption Engine
- **Module Path:** `src/lib/crypto.ts`, `src/app/dashboard/page.tsx`
- **Core Standard:** Native Web Crypto API (`window.crypto.subtle`). Zero external third-party cryptographic dependencies are used, eliminating supply-chain vulnerabilities.

#### A. Key Derivation Function (PBKDF2)
- **Algorithm:** PBKDF2 (Password-Based Key Derivation Function 2) defined in RFC 2898.
- **Underlying Hash:** HMAC-SHA-256.
- **Iteration Count:** 100,000 iterations (OWASP recommendation). This introduces computational work that significantly slows down GPU-accelerated dictionary attacks.
- **Salt:** 128-bit (16 bytes) generated per-encryption using `crypto.getRandomValues()`. Prevents pre-computed Rainbow Table attacks.

#### B. Authenticated Encryption (AES-256-GCM)
- **Cipher:** AES (Advanced Encryption Standard) with a 256-bit symmetric key.
- **Block Mode:** Galois/Counter Mode (GCM).
- **Initialization Vector (IV):** 96-bit (12 bytes) randomly generated per encryption run.
- **Integrity Tag:** 128-bit authentication tag appended automatically to the ciphertext by AES-GCM.
- **Decryption Verification:** If any single bit of ciphertext, IV, or salt is tampered with, or if the user enters the wrong master passphrase, the authentication tag validation fails and Web Crypto rejects the operation, throwing an `OperationError`. Plaintext is never emitted on corrupted input.

#### C. Memory Safety
- In this 25% milestone prototype, encryption and decryption are executed strictly in ephemeral browser component memory. Plaintext passwords are not cached in `localStorage`, `sessionStorage`, or cookies.

---

## 3. Technology Stack & Verification Matrix

| Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | 16.4.6 | React server and client architecture |
| **Library** | React | 19.2.4 | UI component rendering |
| **Language** | TypeScript | 5.9.3 | Static typing & type safety |
| **Styling** | Tailwind CSS | 4.2.1 | Utility-first CSS framework |
| **Icons** | Lucide React | 1.16.0 | Consistent interface icons |
| **Auth Provider** | Firebase JavaScript SDK | 12.9.0 | Client-side user authentication |
| **Cryptography** | Web Crypto API | Native W3C | In-browser CSPRNG, PBKDF2, AES-GCM |

---

## 4. Build & Static Analysis Verification

The codebase has been verified with production build tooling:
1. **TypeScript Typecheck:** `npx tsc --noEmit` — **0 errors**
2. **ESLint Verification:** `npm run lint` — **0 warnings / 0 errors**
3. **Production Compilation:** `npm run build` — **8/8 static pages successfully compiled**
