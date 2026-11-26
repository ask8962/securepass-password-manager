# 12 — Team Contribution Audit (100% Honest & Verified Against Git)

> **Important Note:** Examiner ke saamne kabhi jhooth mat bolna. Agar GitHub history mein kisi ka commit nahi hai aur aap daawa kar dein ki "maine 10 commits kiye", toh examiner 5 second mein `git log` khol kar pakad lega. Yeh file **sachai** dikhati hai aur Dec 5 se pehle har member ke liye ek **real, small, honest GitHub contribution** suggest karti hai!

---

## Verified Repository State
- **Checked Branch:** `main` at commit `7ef9eeb`
- **Repository:** `https://github.com/ask8962/securepass-password-manager`
- **Total Verified Commits on `main`:** 21 commits (Nov 23 – Nov 26, 2026)

---

## Individual Member Audit

### 1. Anukalp Gupta (Project Integrator & Architect)
- **Verified Git Commits:** 16+ authored commits + 3 merges across:
  - Initial Next.js setup (`4743f1c`), project foundation (`70a742b`)
  - Week 1 routes (`c952a1d`, `4f7c8b6`, `0ae2077`, `717577d`)
  - UI polish & minimal redesign (`0334a3b`–`284e2f9`)
  - Firebase Authentication integration (`32d6755`)
  - Web Crypto AES-256-GCM + PBKDF2 local encryption demo (`0b15ac2`)
  - Documentation & guides (`882e40a`, `47c5f7d`, `3bc769b`)
  - Merged Nishant's PR #2 (`39542be`), prototype branch (`ad4260b`), and Ayushmaan's PR #3 (`7ef9eeb`).
- **AI Transparency:** Used Cursor / Google Antigravity AI to accelerate code generation; manually guided architecture, fixed TypeScript/React 19/Windows build errors, configured `.env.local` securely, ran `tsc`/`lint`/`build` checks, and tested end-to-end.
- **Modules Confidently Demonstrable:** Architecture, Git workflow, layout/AuthContext integration, build pipeline, and full system backup.
- **Unverified / Missing:** Unit test suite does not exist yet; older `README.md` / `week-01.md` docs still reflect Week 1 state.

---

### 2. Nishant Singh (Frontend & UI Review)
- **Verified Git Commits:** **1 verified commit (`16e14ab`)** on `feature/nishant-landing-review`, merged via **Pull Request #2 (`39542be`)**.
- **Verified Files Changed:** `src/app/page.tsx` (+3 lines — added `'Available'` status badge to Password Generator card #3 to match the `'Coming Soon'` badges on Cards 1 & 2).
- **Verified Testing/Review Note:** Commit message records landing page UI review, mobile/tablet/desktop responsiveness check, and `npx eslint src/` passing (0 errors).
- **Unverified / Not Done by Nishant:** Did not author `Header.tsx`, `Footer.tsx`, `FeatureCard.tsx`, `VaultPreview.tsx`, or auth pages (Anukalp integrated those).
- **Confidently Demonstrable:** Landing page (`/`), Header responsive drawer, Tailwind CSS light-mode layout, and explaining PR #2.
- **Optional Small Pre-Dec 5 Task:** Clean/document unused leftover components (`FeatureCard.tsx`, `VaultPreview.tsx`) or verify `globals.css` accessibility focus rings in a tiny doc note.

---

### 3. Dileep Bhardwaj (Authentication & Firebase)
- **Verified Git Commits:** **0 commits / 0 PRs** in `git log`.
- **Verified Files Changed:** None committed under Dileep's Git identity.
- **Important Truth:** `src/lib/firebase.ts`, `src/context/AuthContext.tsx`, `login/page.tsx`, `register/page.tsx`, and `docs/firebase-setup-notes.md` were committed by Anukalp (`32d6755`, `3bc769b`).
- **Confidently Demonstrable:** Auth UI validation, signup, login, session persistence on refresh, dashboard route guard, logout, and explaining `firebase.ts` + `AuthContext.tsx` concepts.
- **Missing Evidence:** Personal GitHub commit/PR proof and recorded authentication test logs.
- **Suggested Legitimate Pre-Dec 5 Task (Do This Yourself!):**  
  Create a branch `docs/dileep-auth-testing`, manually test all 6 Firebase auth scenarios in browser (`register`, `duplicate email`, `login`, `wrong password`, `F5 persistence`, `logout + guard`), write your genuine observations in `docs/auth-test-report.md`, and submit a Pull Request (PR #4) from **your own GitHub account**!

---

### 4. Ayushmaan Gupta (Password Generator)
- **Verified Git Commits:** **2 verified commits (`c03aaf6`, `f8c363e`)** on `feature/ayushmaan-generator`, merged into `main` via **Pull Request #3 (`7ef9eeb`)**.
- **Verified Files Changed:**
  - `src/app/generator/page.tsx` (+48/-8 lines) — added `AMBIGUOUS_CHARS_REGEX = /[0O1lI]/g`, `excludeAmbiguous` option filtering both `pool` and `required` arrays, and the UI toggle checkbox.
  - `docs/password-generator-tests.md` (+151 lines) — recorded boundary, character set, ambiguous exclusion, and uniqueness test cases.
- **Accuracy Caveat to Keep in Mind:** No executable unit test script was committed (tests in `docs/password-generator-tests.md` are documented test logs, not Jest/Vitest files), and line 139 of that doc says `"Dark Mode UI Consistency"` even though the current app uses a light minimal theme. State this honestly if asked!
- **Confidently Demonstrable:** `/generator` page live operation, `excludeAmbiguous` toggle, `generatePassword()`, `crypto.getRandomValues()`, `getStrength()`, `copyToClipboard()`, and `docs/password-generator-tests.md`.
- **Optional Small Pre-Dec 5 Task:** Fix `"Dark Mode"` wording in `docs/password-generator-tests.md` or manually re-verify `/generator` after Anukalp removes the hardcoded initial password.

---

### 5. Utpal Kumar (Testing, Documentation & Local Encryption Demo)
- **Verified Git Commits:** **0 commits / 0 PRs** in `git log`.
- **Verified Files Changed:** None committed under Utpal's Git identity.
- **Important Truth:** Utpal did NOT author `src/lib/crypto.ts` or `docs/presentation-progress.md` / `viva-questions.md` — those were committed by Anukalp (`0b15ac2`, `3bc769b`). Also automated unit tests do not exist yet.
- **Confidently Demonstrable:** Testing workflow (`tsc`, `lint`, `build`, manual test matrix), Dashboard local AES-256-GCM + PBKDF2 demo (encrypt, right passphrase decrypt, wrong passphrase tag rejection), and explaining `src/lib/crypto.ts` basics.
- **Missing Evidence:** Personal GitHub commit/PR proof, completed Week 1 manual testing report (`docs/weekly-reports/week-01.md` still has unchecked checkboxes!), and updated `README.md`.
- **Suggested Legitimate Pre-Dec 5 Task (Do This Yourself!):**  
  Create a branch `docs/utpal-qa-and-readme-sync`, personally verify every route in the running app, update the outdated Week 1 notices in `README.md` (or add a clean `docs/manual-test-report.md` summarizing actual browser test cases & verified screenshots), and open a Pull Request using **your own GitHub account**!

---

## Summary Table for Quick Reference

| Member | Verified Commits in `git log` | Verified PR | Suggested Honest Role Description in Viva |
| :--- | :--- | :--- | :--- |
| **Anukalp** | 16+ commits | Merges #2, #3, `ad4260b` | Lead Integrator, Architecture, Firebase/Crypto integration, GitHub repo management |
| **Nishant** | 1 commit (`16e14ab`) | PR #2 (`39542be`) | Frontend UI review, responsiveness verification, Password Generator `'Available'` badge fix |
| **Dileep** | 0 *(do small PR before Dec 5!)* | Pending | Auth flow & Firebase testing, validation review, live auth demonstration |
| **Ayushmaan** | 2 commits (`c03aaf6`, `f8c363e`) | PR #3 (`7ef9eeb`) | Ambiguous character exclusion feature, generator edge-case testing & test documentation |
| **Utpal** | 0 *(do small PR before Dec 5!)* | Pending | End-to-end manual testing, documentation review, live AES-256-GCM encryption demonstration |
