# 05 — Individual Presentation Script: Dileep Bhardwaj

**Role:** Authentication and Firebase Integration (Review, Testing & Concepts)  
**Group:** G195 · B.Tech CSE Final Year · GLA University, Mathura  
**Target Speaking Time:** 50–65 seconds  

---

## A. Natural English Speech (45–75 Seconds)

> "Good morning Sir and Ma'am. I am Dileep Bhardwaj from Group G195, responsible for the Firebase Authentication module and testing its flows.
>
> Instead of storing login passwords in a custom database where hashing mistakes can occur, SecurePass uses Google Firebase Authentication for user identity management. Our Firebase project `pass-c6c3a` is configured via environment variables in `.env.local`, which stays excluded from Git.
>
> In `src/lib/firebase.ts`, Firebase initializes safely as a single instance without duplicate apps. Through `AuthContext.tsx`, we listen to `onAuthStateChanged`, which keeps the user logged in even after a page refresh.
>
> On the UI side, `/register` creates accounts with `createUserWithEmailAndPassword`, `/login` signs in with `signInWithEmailAndPassword`, and both display clear messages for errors like wrong credentials or an existing email. In `/dashboard`, a client-side check redirects unauthenticated users back to `/login`, and the logout button ends the session. Next, Ayushmaan will present the password generator."

---

## B. Speech Explained Sentence by Sentence (Simple Hinglish)

1. **"Good morning Sir and Ma'am. I am Dileep Bhardwaj..."**  
   $\rightarrow$ Apna intro aur Authentication module ki zimmedari batayi.
2. **"Instead of storing login passwords in a custom database..."**  
   $\rightarrow$ Reason: khud ke DB mein login password hash karne mein security risk hota hai, isliye Firebase Auth use kiya.
3. **"Our Firebase project `pass-c6c3a` is configured via `.env.local`..."**  
   $\rightarrow$ Configuration: keys `.env.local` mein hain jo `.gitignore` ki wajah se GitHub par leak nahi hotin.
4. **"In `src/lib/firebase.ts`, Firebase initializes safely as a single instance..."**  
   $\rightarrow$ Code explanation: `getApps().length > 0` check karta hai ki app sirf ek baar start ho.
5. **"Through `AuthContext.tsx`, we listen to `onAuthStateChanged`..."**  
   $\rightarrow$ Session persistence: page refresh karne par bhi user login bana rehta hai.
6. **"On the UI side, `/register` creates accounts... `/login` signs in..."**  
   $\rightarrow$ Forms aur error messages explain kiye, plus dashboard protection aur logout bataya.

---

## C. What Screen or Code File to Display While Speaking

- **Live Browser:** `/register`, `/login`, aur `/dashboard` (refresh `F5` karke dikhana).
- **VS Code:** `src/lib/firebase.ts` aur `src/context/AuthContext.tsx` (sirf ~37 aur ~62 lines ki chhoti files hain — samjhana bahut aasan hai!).

---

## D. Actual Functions / Components You Should Explain

1. **`isFirebaseConfigured()` (`src/lib/firebase.ts`):** Check karta hai ki 4 main env keys (`API_KEY`, `AUTH_DOMAIN`, `PROJECT_ID`, `APP_ID`) present hain ya nahi. Na hone par app crash nahi hoti, warning dikhati hai.
2. **`AuthProvider` (`src/context/AuthContext.tsx`):** `onAuthStateChanged(auth, ...)` se current user aur `loading` track karta hai, aur `logout()` function deta hai jo `signOut(auth)` call karta hai.
3. **`handleSubmit` in `login/page.tsx`:** Format validate karke `signInWithEmailAndPassword()` call karta hai aur `auth/invalid-credential` jaise error codes ko readable message mein badalta hai.
4. **`handleSubmit` in `register/page.tsx`:** Name, Email, Password (`>= 8`), Confirm Password validate karke `createUserWithEmailAndPassword()` call karta hai.

---

## E. Five Simple Technical Concepts You Must Know

1. **Managed Authentication:** Firebase user passwords aur salted hashes khud apne secure servers par rakhta hai.
2. **Environment Variables (`.env.local`):** Keys ko source code ke andar hardcode karne ke bajaye alag local config file mein rakhna.
3. **`onAuthStateChanged`:** Ek observer/listener jo browser khulne ya refresh hone par Firebase token check karke user state set karta hai.
4. **Route Protection:** Dashboard ke `useEffect` mein `!loading && isConfigured && !user` dekh kar `router.replace("/login")` karna.
5. **Authentication vs Encryption Passphrase:** Login password Firebase verify karta hai (account identity); Master Passphrase sirf browser mein demo encrypt karne ke liye hai.

---

## F. Ten Likely Examiner Questions & Short Accurate Answers

1. **Q: Why use Firebase Authentication instead of MySQL/PostgreSQL login tables?**  
   **A:** Firebase securely handles password hashing, token refresh, and brute-force protection out of the box, letting our prototype focus on client-side security.
2. **Q: What happens if `.env.local` is missing on a teammate's laptop?**  
   **A:** `isFirebaseConfigured()` returns `false`, so the app doesn't crash; instead it shows an amber notice pointing to `docs/firebase-setup-notes.md`.
3. **Q: How does session persistence survive a browser refresh?**  
   **A:** Firebase Auth stores session tokens in browser storage (`IndexedDB`/local storage by default), and `AuthContext` reads the active session via `onAuthStateChanged`.
4. **Q: What happens to the "Full name" entered on the `/register` page?**  
   **A:** Currently our form validates that `name` is not empty, and `createUserWithEmailAndPassword` registers the email and password. Saving the display name via `updateProfile()` is not implemented yet.
5. **Q: What minimum password length do your forms check?**  
   **A:** Registration validates at least **8 characters**, while the login form checks at least **6 characters** (matching Firebase's default minimum).
6. **Q: How does the app handle a duplicate email during signup?**  
   **A:** Firebase throws `auth/email-already-in-use`, which `register/page.tsx` catches and turns into `"This email is already registered. Please sign in instead."`
7. **Q: Why does `src/lib/firebase.ts` check `getApps().length > 0`?**  
   **A:** During Next.js hot reloads or re-renders, calling `initializeApp()` twice throws an error. Checking `getApps().length` ensures a single app instance.
8. **Q: Why do you check `typeof window !== "undefined"` in `firebase.ts`?**  
   **A:** Next.js builds run in Node.js where `window` doesn't exist; checking `typeof window` ensures Firebase client initialization only happens in the browser.
9. **Q: What happens when a user clicks "Logout" or "Sign out" on the dashboard?**  
   **A:** `handleLogout()` calls `logout()` (`fbSignOut(auth)`), clears user state, and pushes the router to `/login`.
10. **Q: Can Firebase read the passwords encrypted inside the dashboard demo?**  
    **A:** No, Firebase only handles login identity; the encryption demo happens purely in browser memory using Web Crypto API and isn't even sent to Firebase.

---

## G. Five Difficult Follow-Up Questions

1. **Q: Notice `login/page.tsx` requires `password.length >= 6`, while `register/page.tsx` requires `>= 8`. Why the mismatch?**  
   **A:** During signup we enforce a stricter 8-character policy, whereas on login we allow 6 characters so any existing Firebase-created user (Firebase allows min 6) can still log in cleanly.
2. **Q: Is dashboard route protection enforced on the server (Next.js Middleware) or only on the client?**  
   **A:** Only on the client side via `useEffect` in `dashboard/page.tsx`. Since no sensitive server data is rendered by the dashboard in this prototype, it blocks casual access safely, though server token verification or Firestore rules are needed in production.
3. **Q: Are Firebase API keys inside `.env.local` safe even though they use `NEXT_PUBLIC_`?**  
   **A:** Yes — Firebase Web API keys are public client configuration identifiers (not admin private keys), meant to run in browsers. Actual security comes from Firebase Auth rules and never adding Admin SDK private keys here.
4. **Q: Is Email Verification or Password Reset ("Forgot Password") working?**  
   **A:** Not yet — right now only email/password signup, login, session persistence, and logout are implemented. Password reset is a planned improvement.
5. **Q: What if two teammates register accounts — can one see the other's dashboard demo?**  
   **A:** Each user only sees their own email (`user.email`), and the encryption demo lives strictly in their own browser's temporary RAM.

---

## H. Common Mistakes to Avoid

- Do **NOT** claim you added Firebase commits personally on GitHub if checked — in `git log`, Anukalp pushed the integration commit (`32d6755`); be honest that Anukalp integrated the Firebase code while you tested/learned the auth flows and validation.
- Do **NOT** say "Full name is saved in Firestore" — it is NOT saved anywhere right now!
- Do **NOT** confuse Firebase Login Password with Encryption Master Passphrase.

---

## I. Honest Explanation of Dileep's Verified Contributions

- **Current Git Status Audit:** `git log` shows **0 commits authored by Dileep Bhardwaj**. Commit `32d6755` (`feat: integrate Firebase email authentication`) and `docs/firebase-setup-notes.md` (`3bc769b`) were committed by Anukalp.
- **How to answer honestly:** *"Anukalp integrated the Firebase SDK code with AI assistance and pushed it to `main`. My role is handling the authentication module flow — testing validation errors, signup, login, session persistence, route protection, and demonstrating this module to you today."*
- *(Before Dec 5, submit a real PR documenting your manual Firebase auth test results — see `12-team-contribution-audit.md`!)*

---

## J. What to Say If a Feature Is Partially Implemented

- *"Basic Firebase Email/Password authentication and session persistence are fully working, while email verification, password reset, saving user profile names, and TOTP 2FA are pending for Phase 2."*
