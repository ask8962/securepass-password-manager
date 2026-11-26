# 07 — Individual Presentation Script: Utpal Kumar

**Role:** Testing, Documentation & Encryption Demonstration  
**Group:** G195 · B.Tech CSE Final Year · GLA University, Mathura  
**Target Speaking Time:** 55–70 seconds  

---

## A. Natural English Speech (45–75 Seconds)

> "Good morning Sir and Ma'am. I am Utpal Kumar from Group G195, and I handle testing, documentation review, and the local encryption demonstration for SecurePass.
>
> A password manager cannot rely on server trust alone. Even if the database is protected, passwords should be encrypted inside the user's browser before leaving the device. To demonstrate this concept in our 25–30% prototype, our dashboard includes an interactive Local Encryption Demonstration powered by the Web Crypto API in `src/lib/crypto.ts`.
>
> When we click 'Encrypt with AES-256-GCM', two steps execute locally in browser RAM. First, PBKDF2 with SHA-256 and 100,000 iterations derives a 256-bit key from a demo master passphrase and a random 128-bit salt. Second, AES-256-GCM encrypts the sample password using a 96-bit random IV and produces ciphertext with a 128-bit authentication tag.
>
> On the testing side, we verified TypeScript compilation, ESLint, production builds, and manual workflows—especially testing that the correct passphrase recovers the plaintext while an incorrect passphrase fails authentication-tag verification. At present, this operates in browser memory only and is not yet saved to Firestore."

---

## B. Speech Explained Sentence by Sentence (Simple Hinglish)

1. **"Good morning Sir and Ma'am. I am Utpal Kumar..."**  
   $\rightarrow$ Intro: Testing, documentation, aur encryption demo ki zimmedari.
2. **"A password manager cannot rely on server trust alone..."**  
   $\rightarrow$ Reason: Sirf server par bharosa karne ke bajaye browser mein hi encryption hona chahiye.
3. **"To demonstrate this concept... our dashboard includes an interactive Local Encryption Demonstration..."**  
   $\rightarrow$ Prototype scope: `src/lib/crypto.ts` Web Crypto API se dashboard par live demo chalta hai.
4. **"When we click 'Encrypt with AES-256-GCM', two steps execute locally..."**  
   $\rightarrow$ Step 1: PBKDF2 (1 lakh rounds, SHA-256, 128-bit salt) se key banti hai. Step 2: AES-256-GCM (96-bit IV) password lock karta hai.
5. **"On the testing side, we verified TypeScript compilation, ESLint..."**  
   $\rightarrow$ Automated checks (`tsc`, `lint`, `build`) + manual test (sahi passphrase = pass, galat passphrase = tag rejected).
6. **"At present, this operates in browser memory only..."**  
   $\rightarrow$ Honest limitation: data sirf React RAM mein rehta hai, Firestore mein abhi save nahi hota.

---

## C. What Screen or Code File to Display While Speaking

- **Live Browser:** **`http://localhost:3000/dashboard`** — Local Encryption Demonstration card (PBKDF2 Salt, Random IV, Ciphertext+Tag, aur Decrypt test).
- **VS Code:** `src/lib/crypto.ts` lines 10–17 (`CRYPTO_CONFIG`), 54–83 (`deriveKeyFromPassphrase`), aur 89–125 (`encryptPassword`).

---

## D. Actual Functions / Components You Should Explain

1. **`CRYPTO_CONFIG` (`src/lib/crypto.ts` lines 10–17):** Constants define karta hai — `AES-GCM`, `256` bit key, `12` byte (96-bit) IV, `16` byte (128-bit) salt, `100000` PBKDF2 iterations, `SHA-256`.
2. **`deriveKeyFromPassphrase(passphrase, salt)` (lines 54–83):** TextEncoder se passphrase ko bytes mein convert karke `importKey("raw", ...)` aur `deriveKey("PBKDF2", ...)` se non-extractable (`false`) 256-bit `CryptoKey` banata hai.
3. **`encryptPassword(plaintext, passphrase)` (lines 89–125):** `crypto.getRandomValues` se naya salt & IV banata hai, key derive karta hai, `subtle.encrypt()` chalata hai, aur Base64 payload return karta hai.
4. **`decryptPassword(payload, passphrase)` (lines 132–166):** Base64 decode karke usi salt se key re-derive karta hai, `subtle.decrypt()` run karta hai — galat key par Web Crypto error throw karta hai.
5. **`handleEncrypt` & `handleDecrypt` (`src/app/dashboard/page.tsx` lines 68–108):** React state update aur red/green alert boxes display karte hain.

---

## E. Five Simple Technical Concepts You Must Know

1. **AES-256-GCM:** Encrypted text + 128-bit integrity tag (tamper or wrong key check).
2. **PBKDF2 (100,000 iterations):** Passphrase ko slow hash loop se strong key banana taaki brute-force attack mushkil ho.
3. **Salt vs IV:** Salt PBKDF2 key derivation ke liye (16 bytes); IV AES-GCM cipher uniqueness ke liye (12 bytes).
4. **Authentication Tag Failure:** Galat passphrase daalne par random kachra text nahi aata — Web Crypto turant error deta hai (`OperationError`).
5. **In-Memory Prototype:** Ciphertext `useState` RAM mein rehta hai; refresh (`F5`) karte hi clear ho jaata hai.

---

## F. Ten Likely Examiner Questions & Short Accurate Answers

1. **Q: Did you install any external third-party npm library for encryption?**  
   **A:** No Sir, `src/lib/crypto.ts` uses the browser's built-in W3C Web Crypto API (`window.crypto.subtle`), zero extra encryption packages.
2. **Q: In the dashboard form, I see Website and Username inputs too. Does `encryptPassword()` encrypt them?**  
   **A:** Honest answer: In this prototype, Website and Username inputs provide context on screen, while `encryptPassword()` encrypts only the `samplePassword` field.
3. **Q: What happens when you enter a wrong master passphrase during decryption?**  
   **A:** AES-GCM verifies its 128-bit authentication tag before releasing plaintext. Since the derived key is wrong, tag verification fails and `decryptPassword` catches `OperationError`, displaying `"Authentication Tag Rejected"`.
4. **Q: Why use 100,000 iterations in PBKDF2 instead of 1?**  
   **A:** 100,000 iterations (OWASP baseline) forces an attacker's computer to spend much more time testing each guess during offline brute-force attacks.
5. **Q: What does `false` mean in `deriveKey(..., false, ["encrypt", "decrypt"])` on line 80 of `crypto.ts`?**  
   **A:** It sets `extractable = false`, meaning JavaScript code cannot export the raw key bytes out of the browser's secure CryptoKey handle.
6. **Q: Why do you convert binary `Uint8Array` buffers using `bufferToBase64`?**  
   **A:** Raw encrypted bytes contain non-printable characters; Base64 turns them into readable ASCII text so we can display Salt, IV, and Ciphertext on screen.
7. **Q: Why generate a fresh random IV on every encryption?**  
   **A:** Reusing an IV with the same key breaks AES-GCM security and would also make identical passwords produce identical ciphertext.
8. **Q: Do you have automated unit tests (Jest/Vitest) written in the project?**  
   **A:** No Sir, automated unit/E2E tests are not set up yet in `package.json`. Currently we ran TypeScript checks (`npx tsc --noEmit`), ESLint (`npm run lint`), production build (`npm run build`), and manual browser testing.
9. **Q: If I reload `/dashboard`, why does the ciphertext card disappear?**  
   **A:** Because `encryptedRecord` is stored only in React component memory (`useState`) for demonstration, not persisted in Firestore or localStorage yet.
10. **Q: Who actually wrote `src/lib/crypto.ts` vs who tests and demonstrates it?**  
    **A:** Anukalp integrated `src/lib/crypto.ts` using AI assistance on `feature/presentation-prototype`, and my role as tester/documenter is verifying the encryption/decryption test cases, documenting workflows, and demonstrating this module.

---

## G. Five Difficult Follow-Up Questions

1. **Q: Look at `CRYPTO_CONFIG` line 15 (`PBKDF2_ITERATIONS: 100000`). Current OWASP (2023+) recommends 600,000 iterations for PBKDF2-HMAC-SHA256 or Argon2id. Why 100,000?**  
   **A:** 100,000 was chosen as a responsive demonstration baseline so encryption finishes fast during live presentation on any laptop; increasing the constant or adopting Argon2id is easy in `CRYPTO_CONFIG`.
2. **Q: Does Web Crypto API work on `http://192.168.x.x` (non-localhost HTTP)?**  
   **A:** Good technical catch! `window.crypto.subtle` requires a Secure Context (`https://` or `http://localhost` / `127.0.0.1`). That is why we must demo on `http://localhost:3000` locally or over HTTPS.
3. **Q: Why does line 120 say "Ciphertext + Tag" in one string — where is the separate auth tag field?**  
   **A:** In the Web Crypto API specification for `AES-GCM`, `subtle.encrypt()` automatically appends the 16-byte (128-bit) authentication tag to the end of the ciphertext buffer rather than returning two separate buffers.
4. **Q: Notice in `README.md` and `docs/weekly-reports/week-01.md` it still says "Firebase not connected" and "manual testing pending". Why are docs out of sync?**  
   **A:** Those files were written in Week 1 before `feature/presentation-prototype` merged Firebase Auth and the encryption demo (`ad4260b`). Syncing those older docs is on our cleanup checklist.
5. **Q: In `dashboard/page.tsx` line 122, `handleCopyCipher` uses `navigator.clipboard.writeText` without `try/catch`, unlike `generator/page.tsx`. What happens if permission fails?**  
   **A:** It might cause an unhandled promise rejection in console if clipboard access is denied; wrapping it in `try/catch` like the generator is a clean bug fix we can make.

---

## H. Common Mistakes to Avoid

- Do **NOT** claim you wrote `src/lib/crypto.ts` yourself — state honestly that Anukalp integrated it with AI help and you are responsible for testing, documentation, and live demonstration.
- Do **NOT** say ciphertext is saved in Firebase Firestore or `localStorage` — it resets on page reload (`F5`).
- Do **NOT** confuse encryption (reversible with passphrase) with hashing (one-way).

---

## I. Honest Explanation of Utpal's Verified Contributions

- **Current Git Status Audit:** `git log` shows **0 commits authored by Utpal Kumar**. Commit `0b15ac2` (`crypto.ts`, `dashboard/page.tsx`) and `3bc769b` (`docs/presentation-progress.md`, `live-demo-steps.md`, `viva-questions.md`) were committed by Anukalp.
- **How to answer honestly:** *"Anukalp integrated the code and initial docs during rapid prototyping. My job is reviewing docs, checking test cases (encrypt, correct decrypt, wrong passphrase rejection, generator edge cases, auth validation), and presenting the testing and encryption demo to you."*
- *(Before Dec 5, submit a real PR with a filled manual test report `docs/manual-test-report.md` and fix outdated Week 1 notices in `README.md` — see `12-team-contribution-audit.md`!)*

---

## J. What to Say If a Feature Is Partially Implemented

- *"Our Local Encryption Demo proves client-side AES-256-GCM encryption, PBKDF2 key derivation, and tag rejection cleanly in memory. Saving encrypted vault records permanently to Firestore and adding CRUD operations (edit/delete entries) is our immediate Phase 2 task."*
