# 14 — Presentation Day Checklist (December 5, 2026)

**Goal:** Presentation room mein kisi technical ya paperwork problem ki wajah se panic na ho. Ek raat pehle aur subah yeh checklist check karein!

---

## A. Hardware & Software Readiness (Ek Raat Pehle Check Karein)

- [ ] **Laptop fully charged (100%) + Charger + Extension/Adapter** bag mein rakha hai.
- [ ] **Internet Backup:** Kam se kam 2 phones mein active mobile data + Hotspot password ready hai (Firebase Auth login/register ke liye internet chahiye!).
- [ ] **Node.js Dependencies Installed:** `node_modules/` folder present hai, `npm run dev` bina errors ke start ho raha hai.
- [ ] **`.env.local` Verified:** Project root mein `.env.local` present hai (`pass-c6c3a` Firebase config), taaki login/register warning na aaye.
- [ ] **Secure Context URL Check:** Browser mein **`http://localhost:3000`** open hai (`192.168...` IP par `crypto.subtle` block ho jaata hai, hamesha `localhost` use karein!).
- [ ] **Production Build Verified:** `npx tsc --noEmit`, `npm run lint`, aur `npm run build` latest `main` par pass hain.
- [ ] **Clean Test Account Ready:** Ek verified synthetic demo account (jaise `demo.login@g195test.com` / `DemoPass@2026`) pehle se tested hai, plus ek unused email register demo ke liye ready hai.
- [ ] **Secrets Protected:** `.env.local` editor tab mein closed rakhein aur Firebase Console private keys projector par mat kholein.

---

## B. Backup Materials (Agar Live Demo Atke Toh)

- [ ] **Screenshots Captured & Saved in a Folder:**
  1. Landing Page (`/` — Desktop & Mobile view)
  2. Registration Page (`/register` — validation errors + valid signup)
  3. Login Page (`/login` — invalid password error)
  4. Protected Dashboard (`/dashboard` — showing logged-in user email)
  5. Password Generator (`/generator` — generated password + Copied state)
  6. Local Encryption Output (PBKDF2 Salt, IV, Ciphertext+Tag)
  7. Decryption Success (`Auth Tag Verified`) & Failure (`Authentication Tag Rejected`)
  8. Terminal screenshot showing `npm run build` / `lint` passing
- [ ] **PPT Backup:** PowerPoint slides laptop par + USB pen drive mein + WhatsApp/Google Drive par saved hain (PDF copy bhi rakh lein taaki fonts na bigdein).
- [ ] **GitHub Repository Open Tab:** `https://github.com/ask8962/securepass-password-manager` browser tab mein ready rakhein taaki PR #2 aur `main` commits dikha sakein.

---

## C. Academic Documents & University Requirements (Department Coordinator Se Verify Karein)

*(Note: AI ne koi fake university form nahi banaya hai — neeche diye items GLA University department format ke mutabik apni supervisor/coordinator checklist se verify kar lein!)*

- [ ] **Signed Project Approval Form** (Supervisor & Coordinator signatures check karein).
- [ ] **Signed Project Synopsis** (Approved synopsis print copy — Python FastAPI mention explain karne ke liye ready).
- [ ] **Spiral-Bound Progress / Project Report** (College guidelines ke hisaab se required copies aur supervisor sign).
- [ ] **Required Presentation Schedule, Room & Shift** (Group G195 ka exact time slot aur panel number confirm karein).

---

## D. Team & Presentation Readiness

- [ ] **All 5 Individual Speeches Prepared:** Anukalp, Nishant, Dileep, Ayushmaan, Utpal sabne apna 45–75 sec speech kam se kam 5 baar bol kar practice kiya hai (`03`–`07`).
- [ ] **Group Flow & Handoffs Practiced:** `08-complete-group-speech.md` ke transitions practice kiye hain.
- [ ] **5-Minute Live Demo Rehearsed:** `09-live-demonstration.md` timer lagakar 2 baar run kiya hai (~5 mins).
- [ ] **Honest Contribution Answers Aligned:** Sab members ko pata hai `git log` mein kya hai aur Dec 5 se pehle apni genuine PR complete kar li hai (`12-team-contribution-audit.md`).
- [ ] **Top Viva Topics Revised:**
  - *Prototype vs Production*
  - *Firebase Auth Password vs Master Encryption Passphrase*
  - *`crypto.getRandomValues()` vs `Math.random()`*
  - *PBKDF2 (100k rounds, 128-bit salt) & AES-256-GCM (96-bit IV, 128-bit auth tag)*
  - *What is NOT implemented yet (TOTP 2FA, Firestore DB save, FastAPI)*

---

## E. Presentation Morning Quick Command Sequence

```powershell
# 1. Open folder
cd C:\Users\ganuk\Desktop\securepass

# 2. Check clean branch
git status

# 3. Start local server
npm run dev

# 4. Open Chrome -> http://localhost:3000
```
**Deep breath. Speak slowly. Be honest. Good luck, Team G195!**
