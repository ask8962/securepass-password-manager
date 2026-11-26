# 01 — SecurePass: Complete Project Understanding (Verified Audit)

> **Language:** Simple Hinglish (padhne aur concept pakadne ke liye)  
> **Verified On:** Local `main` branch (`7ef9eeb`), actual source code in `src/`, `package.json`, `.env.local`, aur `git log`.

---

## 1. SecurePass Kya Hai?

**SecurePass** ek web-based password manager prototype hai jo hamari team (**Group G195**, B.Tech CSE Final Year, GLA University, Mathura) bana rahi hai.

Iska simple matlab yeh hai: aaj-kal logon ke paas Gmail, Instagram, banking, college portal jaise 20–50 accounts hote hain. Log aasan ya ek hi password har jagah rakh dete hain, jo hack hona bahut easy hota hai. SecurePass ka aim hai ek aisa system banana jahan user:
1. Strong aur random passwords bana sake,
2. Apna account login karke secure dashboard open kar sake, aur
3. Passwords ko **browser ke andar hi encrypt** (taala lagana) kar sake taaki server ya database ko kabhi bhi asli password na dikhe.

---

## 2. Yeh Kaunsi Problem Solve Karta Hai?

1. **Weak & Reused Passwords:** Log `123456` ya apna naam/dob har website par rakhte hain. Ek site leak hui toh sab accounts gaye.
2. **Server Trust Problem:** Agar aap kisi normal website ke database mein apna password plain text mein ya server-side key se save karte ho, toh company ka admin ya database hacker sab padh sakta hai.
3. **Lack of Transparency:** Paid password managers closed-source hote hain; hamara academic project open aur step-by-step documented hai taaki modern browser cryptography seekhi aur dikhayi ja sake.

---

## 3. Proposed Final Version (100% Project — Jo Synopsis Aur Roadmap Mein Likha Hai)

*Note: Workspace mein original synopsis PDF/DOCX file maujood nahi hai, lekin `docs/project-overview.md` aur `docs/architecture-plan.md` ke mutabik hamare final 100% system mein yeh hona chahiye:*

1. **User Accounts (Firebase Auth):** User sign up / login kar sake.
2. **Full Encrypted Vault (Cloud Firestore CRUD):** User apne websites (Gmail, Amazon, etc.) ke usernames/passwords browser mein encrypt karke **Firestore database** mein save, edit, aur delete kar sake.
3. **Two-Factor Authentication (TOTP - RFC 6238):** Login ya vault unlock karne par Google Authenticator / Microsoft Authenticator jaisa 6-digit code maangna.
4. **Python FastAPI Backend (Proposed in Synopsis):** Rate limiting, password breach checking, ya admin/API validation ke liye auxiliary backend (pending supervisor & team decision).
5. **Vault Health Audit & Recovery:** Weak/reused passwords detect karna aur emergency recovery keys banana.

---

## 4. Aaj Asli Code Mein KYA-KYA Implemented Hai? (25–30% Prototype Truth)

Humne source code (`src/` folder) aur `package.json` check kiya. Aaj ke din **sirf yeh 4 cheezein actually coded aur working hain**:

### A. Clean Minimal Frontend UI (5 Routes)
- **Landing Page (`/`)**: Hero section (`Your passwords. One secure place.`), 3 feature cards (Vault = *Coming Soon*, 2FA = *Coming Soon*, Password Generator = *Available*), About section, Header & Footer (`src/app/page.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`).
- **Light Theme:** Clean `#fafafa` background, `#ffffff` cards, `#2563eb` blue buttons (`src/app/globals.css`).

### B. Real Firebase Email/Password Authentication
- **Register Page (`/register`):** Name, Email, Password (`>= 8` chars), Confirm Password form validation + Firebase `createUserWithEmailAndPassword()` call (`src/app/register/page.tsx`).
- **Login Page (`/login`):** Email & Password (`>= 6` chars) validation + Firebase `signInWithEmailAndPassword()` + readable error messages (`src/app/login/page.tsx`).
- **Session Persistence:** `AuthContext.tsx` Firebase ke `onAuthStateChanged` se browser refresh karne par bhi user ko logged-in rakhta hai.
- **Route Protection:** Agar user logged-in nahi hai (aur Firebase configured hai), toh `/dashboard` kholne par client-side `useEffect` usko `/login` par redirect karta hai.
- **Dashboard Header & Logout:** Dashboard par `user.email` dikhta hai aur `Logout` / `Sign out` button Firebase `signOut()` call karke `/login` par bhejta hai.
- **Firebase Config:** `.env.local` file project `pass-c6c3a` ke Web SDK config ke saath configured hai (aur Git mein ignored hai).

### C. Working CSPRNG Password Generator (`/generator`)
- `src/app/generator/page.tsx` mein length slider (`4` se `128`), 4 character checkboxes (Uppercase, Lowercase, Numbers, Symbols), aur **"Exclude ambiguous characters (`0, O, 1, l, I`)"** checkbox (PR #3, Ayushmaan Gupta) hai.
- JavaScript ke insecure `Math.random()` ki jagah browser ka cryptographic **`crypto.getRandomValues()`** use karta hai.
- Guarantee karta hai ki har selected checkbox type ka kam se kam 1 character zaroor aaye.
- Ek **7-point rule-based strength meter** (`Weak`, `Fair`, `Good`, `Strong`) aur **Copy** button (`navigator.clipboard.writeText`) kaam karta hai.

### D. Local Client-Side Encryption Demo (`/dashboard` + `src/lib/crypto.ts`)
- Dashboard par **"Local Encryption Demonstration"** card hai jo browser ke built-in **Web Crypto API (`window.crypto.subtle`)** se chalta hai:
  - Sample Website, Sample Username, Sample Password, aur Demo Master Passphrase input leta hai.
  - **PBKDF2 (SHA-256, 100,000 iterations, 128-bit random salt)** se passphrase ko 256-bit AES key mein convert karta hai.
  - **AES-256-GCM (96-bit random IV)** se sirf **Sample Password** ko encrypt karta hai aur Base64 mein Salt, IV, aur Ciphertext+AuthTag dikhata hai.
  - **Decrypt Test:** Sahi passphrase daalne par password wapas milta hai (`Auth Tag Verified`); galat passphrase daalne par error aata hai (`Authentication Tag Rejected`).

---

## 5. Aaj KYA Incomplete / Not Implemented Hai? (Examiner Ke Saamne Sach Bolna Hai!)

Koi bhi member yeh **galti se bhi mat bolna** ki neeche di gayi cheezein ban gayi hain:

| Feature | Asli Sachai (Implemented or Not?) |
|---|---|
| **Real TOTP / 2FA (Authenticator App / OTP)** | ❌ **NOT implemented.** Landing page card par "Coming Soon" likha hai. Koi TOTP code nahi hai. |
| **Database / Cloud Vault Save (Firestore)** | ❌ **NOT implemented.** `package.json` mein Firestore use hi nahi hua. Encrypted password sirf browser ki temporary RAM (`React useState`) mein rehta hai — page refresh karte hi gayab ho jaata hai! |
| **Vault CRUD (Add/Edit/Delete multiple entries)** | ❌ **NOT implemented.** Dashboard mein sirf ek single local encryption demo form hai; saved passwords ki list nahi hai. |
| **Python FastAPI Backend** | ❌ **NOT implemented.** Synopsis mein proposed hai, par code mein koi Python/FastAPI folder ya API calls nahi hain. |
| **Encrypting Website/Username in Demo** | ⚠️ **Partial.** Demo form mein Website aur Username boxes hain, par `encryptPassword()` sirf Password string encrypt karta hai. |
| **Saving "Full Name" on Register** | ⚠️ **Partial.** Register form Name validate karta hai, par Firebase ko sirf `email` aur `password` bhejta hai (`updateProfile` call nahi hota). |
| **Password Generator Initial State & Entropy** | ⚠️ **Small detail.** Page khulte hi pehla password `"k8#P9!vX$2mQ~L7r"` hardcoded hai (jabtak "Generate New Password" na dabayein). Strength meter 7-point heuristic hai, pure Shannon entropy math formula nahi. |
| **Automated Unit/E2E Test Suite** | ❌ **NOT implemented.** Koi Jest, Vitest, ya Playwright tests nahi hain. Sirf `tsc --noEmit`, `npm run lint`, `npm run build`, aur manual testing hui hai. |
| **Outdated Older Docs** | ⚠️ `README.md`, `project-overview.md`, `architecture-plan.md`, aur `week-01.md` abhi bhi Week 1 purane status ("Firebase not connected", "dark theme") likhe hue hain — jabki code usse aage badh chuka hai! |

---

## 6. Kaunsi Technology Use Ho Rahi Hai Aur Kyun? (Actual `package.json` Versions)

| Layer | Technology (Exact Version) | Simple Hinglish Reason (Kyun Use Ki?) |
|---|---|---|
| **Framework** | **Next.js `16.4.6`** (App Router) | React pages aur routing (`/`, `/login`, `/dashboard`, `/generator`) aasani se manage karne ke liye. |
| **UI Library** | **React `19.3.0`** | Reusable components aur interactive UI state (jaise password slider, error boxes) banane ke liye. |
| **Language** | **TypeScript `^5`** | Coding ke waqt type-errors (jaise string ki jagah number bhejna) pehle hi pakadne ke liye. |
| **Styling** | **Tailwind CSS `4.3.3`** | Clean light-mode design aur mobile-responsive layout jaldi aur neatly banane ke liye. |
| **Icons** | **Lucide React `^1.78.0`** | Lock, Shield, Eye, Copy jaise clean icons ke liye. |
| **Authentication** | **Firebase Client SDK `^13.4.0`** | Email/password signup, login, aur secure session handling bina apna insecure auth server likhe. |
| **Cryptography** | **Web Crypto API** (Browser Native) | Kisi third-party crypto library par bharosa kiye bina seedha browser ke native engine se AES-256-GCM aur PBKDF2 chalane ke liye. |

---

## 7. Application Kaise Kaam Karta Hai (Homepage se Logout Tak Flow)

1. **User `http://localhost:3000` (`/`) kholta hai:** Landing page (`HomePage`) dikhta hai.
2. **"Try Password Generator" par click karta hai (`/generator`):** Slider aur checkboxes set karke `"Generate New Password"` dabata hai $\rightarrow$ `crypto.getRandomValues()` naya strong password banata hai $\rightarrow$ `"Copy"` se clipboard mein jaata hai.
3. **"Get Started" (`/register`) ya "Sign In" (`/login`) par jaata hai:**
   - Register par Name, Email, Password, Confirm Password fill karta hai $\rightarrow$ `createUserWithEmailAndPassword()` Firebase par account banata hai $\rightarrow$ `/dashboard` open hota hai.
   - Login par Email, Password dalta hai $\rightarrow$ `signInWithEmailAndPassword()` verify karta hai $\rightarrow$ `/dashboard` open hota hai.
4. **Route Guard Check:** Agar koi bina login kiye URL mein `/dashboard` type kare, toh `AuthContext` dekhta hai `user === null` aur `useEffect` turant `/login` par bhej deta hai.
5. **Session Persistence:** Dashboard par page `F5` (refresh) karne par Firebase SDK browser storage se token padh kar `onAuthStateChanged` fire karta hai — user login rehta hai.
6. **Encryption Demo (`/dashboard`):** User sample password + master passphrase daal kar **"Encrypt with AES-256-GCM"** dabata hai $\rightarrow$ browser Salt, IV, aur Ciphertext banata hai $\rightarrow$ **"Decrypt"** mein sahi passphrase se wapas plaintext aata hai aur galat passphrase par **"Authentication Tag Rejected"** error dikhta hai.
7. **Logout:** **"Sign out"** ya **"Logout"** dabane par `logout()` Firebase ka `signOut()` call karta hai aur user `/login` par wapas chala jaata hai.

---

## 8. GitHub Collaboration Kaise Organized Hai?

- **Repository:** `https://github.com/ask8962/securepass-password-manager`
- **Workflow (`docs/team-onboarding/contribution-workflow.md`):** Planned workflow ke mutabik `main` branch stable rehti hai aur har member apni `feature/...` branch se Pull Request (PR) banakar merge karwata hai.
- **Asli Sachai (Git History Check):** Ab tak Anukalp Gupta ne core integration aur docs commits push kiye hain (with AI assistance), Nishant Singh ki **PR #2 (`16e14ab`)** aur Ayushmaan Gupta ki **PR #3 (`c03aaf6`, `f8c363e`)** `main` par merged hain. Dileep aur Utpal ke commits abhi GitHub history mein record nahi hue hain (poora audit file `12-team-contribution-audit.md` mein hai).
- **Security:** `.env.local` file `.gitignore` mein hai, isliye Firebase API keys GitHub par push nahi hotin.
