# 09 — Step-by-Step Live Demonstration Guide (~5 Minutes)

**Total Time:** ~5 minutes  
**URL:** `http://localhost:3000` (Must use `localhost` so browser `window.crypto.subtle` Secure Context works!)  
**Safety Rule:** Never use your real Gmail/banking passwords or expose `.env.local` / Firebase Console admin keys on projector. Use only a controlled synthetic demo account!

> **CRITICAL DISTINCTION FOR DEMO:**  
> - **Firebase Login Password:** Account access ke liye (e.g., `DemoPass@2026`). Firebase verify karta hai.  
> - **Local Encryption Master Passphrase:** Sirf browser RAM mein AES-256-GCM demo encrypt/decrypt karne ke liye (e.g., `MasterDemoKey2026!`). Firebase ke paas kabhi nahi jaata!

---

## Pre-Demo Preparation (Before Entering Room)

1. Run `npm run dev` in `C:\Users\ganuk\Desktop\securepass` and confirm `Ready` on `http://localhost:3000`.
2. Ensure mobile hotspot / college Wi-Fi is connected (needed ONLY for Firebase Auth steps 4–6 & 14; Generator & Encryption work offline too!).
3. Test account pre-created & verified once before demo (e.g., `demo.login@g195test.com` / `DemoPass@2026`) — aur register demo ke liye ek fresh email suffix ready rakhein (e.g., `demo.live01@g195test.com`).
4. Ensure browser is logged **out** before Step 1 starts.

---

## 15-Step Live Demonstration

### Step 1: Launch the App Locally (0:00 – 0:20)
- **Operator:** Anukalp
- **Action:** Show terminal running `npm run dev` briefly, then switch to Chrome at `http://localhost:3000`.
- **Say:** *"The Next.js local server is running on localhost:3000. This is our home route."*
- **Expected Output:** Clean light-themed SecurePass landing page loads cleanly.
- **Potential Error:** Port 3000 busy (`EADDRINUSE`) or server stopped.
- **Recovery:** Already start server BEFORE calling examiners; if needed open next terminal and run `npx next dev -p 3001` or check existing terminal tab.

### Step 2: Explain the Landing Page (0:20 – 0:45)
- **Operator:** Nishant
- **Action:** Scroll slowly over Hero buttons (`Get Started`, `Try Password Generator`) and the three feature cards (`Secure Password Vault` = *Coming Soon*, `Two-Factor Authentication` = *Coming Soon*, `Password Generator` = *Available*). Click mobile menu once if using mobile preview, or keep desktop clean.
- **Say:** *"Here is our landing UI. Notice we explicitly label Secure Vault and 2FA as 'Coming Soon', while the Password Generator is 'Available'—a consistency badge added during UI review."*
- **Expected Output:** Clean 3-column card grid and About Section (Group G195, GLA University).
- **Potential Error:** Slow rendering or wrong zoom.
- **Recovery:** Keep Chrome zoom at `100%` or `110%` for projector visibility.

### Step 3: Open Registration (`/register`) (0:45 – 1:05)
- **Operator:** Dileep
- **Action:** Click **`Get Started`** button on `/` (takes you to `http://localhost:3000/register`).
- **Say:** *"Now we move to account registration powered by Firebase Authentication. First let's see client-side validation."*
- **Expected Output:** Registration form with `Full name`, `Email address`, `Password`, `Confirm password`.
- **Potential Error:** Yellow `.env.local` warning banner shows up.
- **Recovery:** Ensure `.env.local` exists in project root and server was restarted AFTER `.env.local` was saved.

### Step 4: Register a Test Account (1:05 – 1:35)
- **Operator:** Dileep
- **Action:**
  1. Click **`Create Account`** empty once to briefly flash red validation messages (`Name is required`, etc.).
  2. Type synthetic values:
     - Full name: `Demo Student`
     - Email: `demo.dec5@g195test.com` *(use a fresh number like `demo.dec5a@...` if already used)*
     - Password: `DemoPass@2026`
     - Confirm password: `DemoPass@2026`
  3. Click **`Create Account`**.
- **Say:** *"After client validation passes, Firebase creates the user identity via `createUserWithEmailAndPassword` and redirects us to the protected dashboard."*
- **Expected Output:** Redirects to `http://localhost:3000/dashboard`, showing `"Logged in as: demo.dec5@g195test.com"`.
- **Potential Error:** `auth/email-already-in-use` or `auth/network-request-failed`.
- **Recovery:** If email exists, immediately add `2` (`demo.dec52@g195test.com`) or click **`Sign in`** at the bottom and move straight to Step 5 login! If internet disconnects, turn on mobile hotspot.

### Step 5: Demonstrate Login Explicitly (1:35 – 2:00)
- **Operator:** Dileep
- **Action:** Click **`Logout`** at top right of `/dashboard` (redirects to `/login`). Enter the test email `demo.dec5@g195test.com` and Firebase password `DemoPass@2026`. Click **`Sign In`**. *(Optional: enter a wrong password first if time permits to show `"Invalid email or password"` error).*
- **Say:** *"Let's also verify standard login on `/login`. Signing in calls `signInWithEmailAndPassword` and brings us back to `/dashboard`."*
- **Expected Output:** Clean redirect back to `/dashboard` with active user email visible.
- **Potential Error:** Typo in password gives `"Invalid email or password. Please check your credentials."`
- **Recovery:** Click the Eye icon (`Show password`) to double-check typing and click **`Sign In`** again.

### Step 6: Demonstrate Session Persistence (2:00 – 2:15)
- **Operator:** Dileep
- **Action:** While on `/dashboard`, press **`F5`** (or click browser Reload button).
- **Say:** *"I am refreshing the page right now. Because Firebase stores session tokens locally and `AuthContext` listens to `onAuthStateChanged`, the user remains logged in."*
- **Expected Output:** Briefly shows `"Loading vault session..."` then stays on `/dashboard` logged in as the test email.
- **Potential Error:** Private/Incognito tab blocking IndexedDB storage.
- **Recovery:** Use a normal Chrome window (not Guest/restricted privacy mode blocking site data).

### Step 7: Show the Dashboard Structure (2:15 – 2:30)
- **Operator:** Dileep / Anukalp
- **Action:** Point to left sidebar (`My Vault`, `Password Generator`, `Security - Soon`, `Settings - Soon`, `Current Session` email) and top welcome card (`Web Crypto AES-256-GCM Ready`).
- **Say:** *"On the dashboard, planned modules like Security and Settings clearly show 'Soon', while our Generator and Local Encryption Demo are active."*
- **Expected Output:** Clean dashboard layout with zero fake saved entries.
- **Potential Error:** Sidebar collapsed on narrow projector window.
- **Recovery:** Click the hamburger icon or widen browser window (`>= 768px`).

### Step 8: Generate a Password (`/generator`) (2:30 – 3:00)
- **Operator:** Ayushmaan
- **Action:** Click **`Password Generator`** in the sidebar or top header (`http://localhost:3000/generator`). Drag the length slider from `16` to `20`, toggle **`Exclude ambiguous characters`**, and click **`Generate New Password`**.
- **Say:** *"Here is our Password Generator. Instead of predictable `Math.random()`, `generatePassword()` calls `crypto.getRandomValues()`, ensures each selected class appears, and filters out ambiguous characters (`0, O, 1, l, I`) when checked."*
- **Expected Output:** Fresh 20-character random password appears and strength bar turns green (`Strong`).
- **Potential Error:** Unchecking all checkboxes shows red error `"Please select at least one character type."` (Great if you want to show edge-case validation intentionally, then check boxes back on!).
- **Recovery:** Re-check at least Uppercase + Lowercase + Numbers and click **`Generate New Password`**.

### Step 9: Copy the Generated Password (3:00 – 3:15)
- **Operator:** Ayushmaan
- **Action:** Click the blue **`Copy`** button. Point out it changes to **`Copied`** with a checkmark. Then click the **`← Dashboard`** link at the top right.
- **Say:** *"The Copy button copies the password cleanly via `navigator.clipboard.writeText`. Let's use this generated password inside our encryption demo."*
- **Expected Output:** Button displays `"Copied"` for 2 seconds, then returns to `"Copy"`.
- **Potential Error:** Clipboard permission denied if not on `localhost`.
- **Recovery:** Highlight the password text (`select-all` class allows single click selection) and press `Ctrl+C`.

### Step 10: Demonstrate Client-Side Encryption Using Synthetic Data (3:15 – 3:40)
- **Operator:** Utpal
- **Action:** Back on `/dashboard` in the **"Local Encryption Demonstration"** card:
  - `Sample Service / Website`: Keep `google.com` or type `demo-portal.edu`
  - `Sample Username / Email`: Type `test.student@gla.ac.in`
  - `Sample Password to Encrypt`: Clear default and press `Ctrl+V` (to paste the generated password!) or type `DemoSecret#2026`, toggle eye icon briefly so examiner can see what plaintext is being encrypted!
  - `Demo Master Passphrase (Key)`: Keep `MasterDemoKey2026!` *(explain clearly: this is a SEPARATE encryption key, not the Firebase login password!)*.
  - Click **`Encrypt with AES-256-GCM`**.
- **Say:** *"Using synthetic data and a separate demo Master Passphrase, clicking Encrypt runs PBKDF2-SHA-256 for 100,000 iterations with a random 128-bit salt, followed by AES-256-GCM encryption inside browser memory."*
- **Expected Output:** Smooth card appears below with green heading `"Password Encrypted Successfully"` and timestamp.
- **Potential Error:** Running on non-localhost LAN IP (`192.168.x.x`) over plain HTTP (`window.crypto.subtle` is `undefined`).
- **Recovery:** Always verify address bar says `http://localhost:3000`.

### Step 11: Show Ciphertext, Salt, and IV (3:40 – 3:55)
- **Operator:** Utpal
- **Action:** Point cursor over the three Base64 boxes inside the result card:
  - `PBKDF2 Salt (128-bit)`
  - `AES-GCM Random IV / Nonce (96-bit)`
  - `AES-256-GCM Ciphertext + Tag`
- **Say:** *"Notice that the output shows a unique Base64 Salt, a 96-bit random IV, and the AES-256-GCM ciphertext with its attached 128-bit authentication tag. Nowhere is the plaintext password readable here."*
- **Expected Output:** Distinct Base64 strings displayed cleanly.
- **Potential Error:** None expected.
- **Recovery:** Click `"Encrypt with AES-256-GCM"` once more to prove even encrypting the exact same text generates a completely new Salt, IV, and Ciphertext!

### Step 12: Decrypt Using the Correct Demo Passphrase (3:55 – 4:15)
- **Operator:** Utpal
- **Action:** Under **"Test Decryption"**, type **`MasterDemoKey2026!`** into `Enter master passphrase to decrypt` (notice the field clears itself automatically when encrypting!). Click green **`Decrypt`** button.
- **Say:** *"When we enter the correct demo master passphrase, PBKDF2 re-derives the 256-bit key using the displayed salt, validates the GCM authentication tag, and recovers the exact original password."*
- **Expected Output:** Green box shows `Decryption Successful:` + exact original password + `Auth Tag Verified`.
- **Potential Error:** Case-sensitive typo in `MasterDemoKey2026!`.
- **Recovery:** Click the eye toggle next to the decrypt box to check spelling (`M` and `D` and `K` uppercase, `!` at end).

### Step 13: Show Failure With an Incorrect Passphrase (4:15 – 4:35)
- **Operator:** Utpal
- **Action:** Change the decrypt input to **`WrongPassphrase99`** and click **`Decrypt`**.
- **Say:** *"Now if an attacker guesses a wrong passphrase or tampers with data, the GCM authentication tag mismatches. Web Crypto immediately rejects decryption with zero partial plaintext leaked."*
- **Expected Output:** Green box disappears and red alert box shows: `Authentication Tag Rejected: Decryption failed: Incorrect master passphrase or corrupted ciphertext.`
- **Potential Error:** None expected.
- **Recovery:** If nothing changes, ensure you actually edited the decrypt input box before clicking Decrypt.

### Step 14: Log Out & Verify Route Guard (4:35 – 4:50)
- **Operator:** Dileep / Anukalp
- **Action:** Click **`Logout`** in the top header (or **`Sign out`** in the sidebar). Once on `/login`, type `http://localhost:3000/dashboard` in the browser address bar and press Enter.
- **Say:** *"Logging out clears the Firebase session. If someone tries to navigate directly to `/dashboard` now, our client-side route check immediately sends them back to `/login`."*
- **Expected Output:** Automatically lands back on `/login`.
- **Potential Error:** Brief flash of loading text before redirect.
- **Recovery:** That brief `"Loading vault session..."` flash is normal while `AuthContext` finishes checking auth state.

### Step 15: Explain Pending Features & Close (4:50 – 5:10)
- **Operator:** Anukalp
- **Action:** Switch back to final Summary Slide (Roadmap).
- **Say:** *"That concludes our live demo. Everything we showed—Firebase Auth, CSPRNG Password Generation, and local AES-256-GCM encryption—is running live. Next milestones will add Firestore encrypted vault storage, TOTP 2FA, and auxiliary backend validation. Thank you, we welcome your questions."*
- **Expected Output:** Confident finish right on ~5 minutes!

---

## Quick Backup Procedure If Wi-Fi Completely Fails During Presentation
- Open `/generator` and `/dashboard`: Wait — notice `/dashboard` redirects to `/login` ONLY if Firebase is configured AND offline/unauthenticated! If internet drops BEFORE login on `.env.local`:
  1. **Hotspot immediately:** Turn on your smartphone USB tethering or Wi-Fi hotspot (Anukalp/Dileep keep backup hotspot ready).
  2. **Show Screenshots & Code:** Open verified screenshots folder (`docs/` or Desktop) and VS Code files (`src/lib/crypto.ts`, `src/app/generator/page.tsx`) while hotspot connects.
