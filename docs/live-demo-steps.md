# SecurePass — 5-Minute Live Demonstration Script

**Project:** SecurePass – A Secure Password Manager with Two-Factor Authentication  
**Group:** G195 | GLA University, Mathura  
**Audience:** Project Supervisor / Evaluation Committee  
**Total Duration:** Approximately 5 Minutes  
**Prerequisites:** 
- Terminal running: `npm run dev`
- Browser open at: `http://localhost:3000`

---

## Pre-Demo Checklist (30 Seconds Before Presentation)

1. Open terminal in project root: `cd C:\Users\ganuk\Desktop\securepass`
2. Ensure development server is active: `npm run dev`
3. Open Google Chrome or modern browser to `http://localhost:3000`
4. Have your `.env.local` configured with Firebase keys (or test with fallback notice if offline)
5. Clear browser zoom to 100% for optimal layout

---

## 15-Step Step-by-Step Live Demonstration Script

### Minute 0:00 – 1:00 : Introduction & Route Protection

#### Step 1: Open Landing Page (`/`)
- **Action:** Open `http://localhost:3000` in the browser.
- **What to say:** *"Good morning Sir/Ma'am. We are Group G195. Our major project is SecurePass — a secure password manager designed with Zero-Knowledge client-side encryption and modern authentication. Today, we are demonstrating our 20–25% milestone prototype covering user identity, cryptographically secure password generation, and local authenticated encryption."*

#### Step 2: Show Landing Page & Architecture Highlights
- **Action:** Scroll through the minimal landing page. Point to the three feature cards (`Secure Password Vault` and `Two-Factor Authentication` labeled `Coming Soon`, and `Password Generator` labeled `Available`).
- **What to say:** *"We designed a clean, light interface without clutter, clearly showing what is available today versus upcoming features."*

#### Step 3: Test Route Protection (Security Check)
- **Action:** In the browser address bar, manually type `http://localhost:3000/dashboard` and press Enter.
- **What to say:** *"First, let's verify route security. When an unauthenticated visitor tries to directly visit the `/dashboard` URL, the system detects no active session and immediately redirects to `/login`. Unauthenticated access is blocked."*

---

### Minute 1:00 – 2:15 : Registration & Session Management

#### Step 4: Navigate to Registration Page (`/register`)
- **Action:** Click "Create an account" link or navigate to `http://localhost:3000/register`.
- **What to say:** *"Now, we will demonstrate our Firebase Authentication integration."*

#### Step 5: Test Client-Side Form Validation
- **Action:** Leave fields empty or enter an invalid password (e.g. `123`) and click "Create account".
- **What to say:** *"The form enforces client-side validation for email formats and password length before contacting the authentication server."*

#### Step 6: Complete Valid User Registration
- **Action:** Enter Name, a test email (e.g., `demo.test01@example.com`), and a secure password (`DemoSecure@2026`). Click **`Create Account`**.
- **What to say:** *"When we submit valid credentials, Firebase Auth creates the account and `updateProfile()` saves the user's Full Name before redirecting to the protected dashboard."*

#### Step 7: Verify Session Persistence & User Context
- **Action:** Show the dashboard welcome card displaying the saved name/email and header displaying `"Logged in as: ..."`. Press `F5` / Refresh the browser.
- **What to say:** *"Notice that our dashboard displays the authenticated user's email. When I refresh the browser, the session is preserved through Firebase's `onAuthStateChanged` observer. The user is not logged out upon reload."*

---

### Minute 2:15 – 3:45 : Local Web Crypto Encryption & Zero-Knowledge Verification

#### Step 8: Introduce the Local Encryption Demonstration Card
- **Action:** Scroll to the "Local Encryption Demonstration" section on `/dashboard`.
- **What to say:** *"This is the core cryptographic module of our project. In standard cloud architectures, passwords might be sent to a server over HTTPS. In SecurePass, we use a Zero-Knowledge model where encryption happens directly inside the browser using the W3C Web Crypto API."*

#### Step 9: Enter Sample Credentials & Master Passphrase
- **Action:** 
  - Plaintext Password: Enter `MySecretCollegePassword#99`
  - Master Passphrase: Enter `MasterPassphrase123!`
- **What to say:** *"We input a sample password to protect, along with a user's Master Passphrase. The master passphrase is never stored anywhere."*

#### Step 10: Click "Encrypt with AES-256-GCM" & Inspect Cryptographic Artifacts
- **Action:** Click the **`Encrypt with AES-256-GCM`** button.
- **What to say:** *"When I click Encrypt, two standard cryptographic algorithms execute locally:*
  1. *First, PBKDF2 with SHA-256 and 100,000 iterations derives a 256-bit AES key from the master passphrase using a unique 128-bit random salt.*
  2. *Second, AES-256 in Galois/Counter Mode (GCM) encrypts the password with a 96-bit random initialization vector (IV).*
  *As you can see on the screen, we have generated the Base64 Salt, IV, and the encrypted Ciphertext with its 128-bit authentication tag."*

#### Step 11: Demonstrate Successful Decryption
- **Action:** In the Decryption section (`Test Decryption`), type the matching passphrase `MasterDemoKey2026!` into the box and click **`Decrypt`**.
- **What to say:** *"When we decrypt with the exact same master passphrase, the key is derived again, the AES-GCM authentication tag is validated, and the original plaintext is restored safely in memory (`Auth Tag Verified`)."*

#### Step 12: Demonstrate Integrity Protection & Wrong Passphrase Failure
- **Action:** Change the decryption passphrase to a wrong password (e.g., `WrongPassword!`) and click **`Decrypt`**.
- **What to say:** *"Now, watch what happens if an attacker enters the wrong passphrase or tampers with the ciphertext. The Web Crypto API automatically validates the GCM authentication tag. Because the tag does not match, decryption fails with an error and zero plaintext data is exposed. This proves data integrity and authenticity."*

---

### Minute 3:45 – 4:30 : Cryptographic Password Generator

#### Step 13: Navigate to Password Generator (`/generator`)
- **Action:** Click "Password Generator" in the navigation bar.
- **What to say:** *"Next, we demonstrate our built-in Password Generator."*

#### Step 14: Demonstrate CSPRNG Randomness & Customization Controls
- **Action:**
  - Adjust the length slider from 16 to 24 characters.
  - Toggle Symbols or **`Exclude ambiguous characters`**.
  - Click **`Generate New Password`**.
  - Click **`Copy`** (point out `"Copied"` feedback).
- **What to say:** *"Unlike basic generators that use JavaScript's `Math.random()`, which is predictable and insecure, SecurePass uses `window.crypto.getRandomValues()` directly upon client initialization and regeneration. Users can adjust lengths up to 128 characters, exclude ambiguous characters (`0, O, 1, l, I`), and view the 7-rule strength meter."*

---

### Minute 4:30 – 5:00 : Logout & Conclusion

#### Step 15: Logout & Wrap-Up
- **Action:** Navigate back to Dashboard or click "Sign out" from the navigation.
- **What to say:** *"Finally, we click 'Sign out'. The Firebase session is cleared, and the user is redirected back to the login screen. This completes our 20–25% milestone prototype.*
  *In our next phase (Week 2 onwards), we will implement encrypted vault persistence using Cloud Firestore and Two-Factor Authentication (TOTP). Thank you, Sir/Ma'am. We are ready for your questions."*

---

## Troubleshooting & Backup Plan During Demo

- **What if Firebase network is blocked on university Wi-Fi?**  
  The application detects missing or blocked network configuration and displays a non-blocking configuration banner. The local encryption demo (`/dashboard`) and the password generator (`/generator`) function 100% offline because they rely exclusively on the browser's native Web Crypto API.
- **What if the browser dev server was terminated?**  
  Run `npm run dev` in PowerShell and reload `http://localhost:3000`.
