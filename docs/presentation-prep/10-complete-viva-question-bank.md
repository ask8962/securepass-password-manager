# 10 — Complete Viva Question Bank (80 Questions & Honest Answers)

**Coverage:** 9 Categories · 80 Questions · Short English Viva Answers + Simple Hinglish Explanations  
**Audit Rule:** Har answer actual codebase (`7ef9eeb` on `main`) aur honest AI-assisted workflow par based hai.

---

## Category 1: General Project Questions (Q1–Q10)

**Q1. Why did you choose this project (SecurePass)?**
- **English:** Most users reuse weak passwords across multiple accounts. We wanted to build an academic cybersecurity project that practically demonstrates authentication, strong random password generation, and client-side encryption rather than just simple CRUD forms.
- **Hinglish:** Log weak aur same passwords har jagah lagate hain. Hum ek real security problem solve karne wala academic project banana chahte the jisme real cryptography aur auth seekh sakein.

**Q2. What does SecurePass aim to solve?**
- **English:** It solves weak password habits, credential reuse, and server-side exposure risks by generating CSPRNG passwords and encrypting secrets inside the browser before future cloud storage.
- **Hinglish:** Yeh weak passwords, ek password har jagah use karne ki aadat, aur server par plaintext password save hone ka khatra solve karta hai.

**Q3. How is SecurePass different from Bitwarden or 1Password?**
- **English:** Bitwarden and 1Password are full-scale commercial products with browser extensions, multi-device sync, audits, and enterprise teams. SecurePass is an educational B.Tech final-year prototype demonstrating the core concepts transparently in a clean, minimal codebase.
- **Hinglish:** Bitwarden aur 1Password crore-dollar ke production software hain. SecurePass ek college level academic prototype hai jo unhi ke basic principles (Web Crypto, CSPRNG, Auth) ko simple code mein dikhata aur samjhata hai.

**Q4. Why did you name the project SecurePass?**
- **English:** The name directly reflects our goal: securing passwords using cryptographic randomness, encryption, and planned two-factor authentication.
- **Hinglish:** Naam seedha project ka kaam batata hai — "Secure" + "Passwords".

**Q5. How much of the project is completed right now?**
- **English:** Approximately 25 to 30 percent, matching our Phase 1 presentation milestone: responsive UI routes, Firebase Authentication, CSPRNG Password Generator, and a local in-memory AES-256-GCM encryption demo.
- **Hinglish:** Lagbhag 25–30% kaam poora hai — UI pages, Firebase login/register, password generator, aur RAM-based encryption demo ready hain.

**Q6. What is the difference between a prototype and a complete product?**
- **English:** Our prototype validates core mechanisms (login, generator, encryption demo) locally in memory, whereas a complete product adds persistent encrypted database storage, 2FA, recovery workflows, automated testing, and hardened deployment.
- **Hinglish:** Prototype bas proof-of-concept aur core working model hai; complete product mein database persistence, 2FA, recovery, aur full testing hoti hai.

**Q7. Who is the target user of SecurePass?**
- **English:** Everyday students and web users who need a clean, simple tool to generate strong passwords and manage accounts securely.
- **Hinglish:** Normal students aur everyday internet users jinhe simple interface mein strong passwords chahiye.

**Q8. Does your synopsis mention Python FastAPI? Where is it?**
- **English:** Yes, our synopsis proposed Python FastAPI as an auxiliary backend for validations or breach checks. It has not been implemented yet and remains a planned future architecture item pending further progress.
- **Hinglish:** Haan, synopsis mein FastAPI proposed hai, par abhi 25% stage par koi Python server nahi bana hai — aage ke phases mein add ya finalize hoga.

**Q9. What is Zero-Knowledge architecture?**
- **English:** It means the server or database provider stores only encrypted data and never receives the user's master passphrase or plaintext passwords, so only the user can decrypt their vault.
- **Hinglish:** Server ko aapke asli passwords aur master passphrase ke baare mein kuch pata nahi hota; saara unlock sirf aapke browser mein hota hai.

**Q10. What did each team member contribute?**
- **English:** Anukalp handled Next.js architecture, GitHub integration, and core prototype integration; Nishant contributed UI review and PR #2; Ayushmaan added ambiguous-character exclusion and test docs in PR #3; Dileep covers Firebase Auth flows/testing; Utpal covers testing, documentation, and demonstrating local encryption.
- **Hinglish:** Anukalp ne core integration kiya; Nishant ne PR #2 aur Ayushmaan ne PR #3 GitHub par merge karwaya hai; Dileep auth testing/flow aur Utpal overall QA/encryption demo sambhal rahe hain (git commits Anukalp, Nishant aur Ayushmaan ke verified hain).

---

## Category 2: Frontend & Next.js Questions (Q11–Q19)

**Q11. Why Next.js instead of plain React (Create React App / Vite) or HTML?**
- **English:** Next.js provides file-based routing via the `src/app/` directory, TypeScript integration, fast optimized builds, and clean separation between static and client components out of the box.
- **Hinglish:** Next.js mein folders banate hi URL routes (`/login`, `/dashboard`) apne aap ban jaate hain aur React + TypeScript cleanly build hote hain.

**Q12. What is the App Router in Next.js 16?**
- **English:** Every folder inside `src/app/` containing a `page.tsx` file automatically becomes a web route, such as `src/app/generator/page.tsx` mapping to `/generator`.
- **Hinglish:** `src/app/` ke andar jis naam ka folder aur `page.tsx` rakho, wohi URL route ban jaata hai.

**Q13. Why do some files start with `"use client"` while `src/app/page.tsx` does not?**
- **English:** Components using browser-only features like `useState`, `useEffect`, or `window.crypto` must mark `"use client"`. Static pages like `HomePage` run as Server Components by default for performance.
- **Hinglish:** Jahan click events, `useState`, ya browser API chalti hai wahan `"use client"` likhna padta hai; static landing page bina uske fast render hota hai.

**Q14. Why Tailwind CSS instead of regular CSS files or Bootstrap?**
- **English:** Tailwind utility classes allow fast, consistent styling directly in JSX with small production CSS sizes and built-in responsive breakpoints like `sm:` and `md:`.
- **Hinglish:** Tailwind mein alag CSS files likhne ke bajaye seedha HTML/JSX mein short classes lagakar jaldi aur clean mobile-friendly design ban jaata hai.

**Q15. How is the dark/light theme implemented in SecurePass?**
- **English:** Right now SecurePass uses a clean light neutral theme (`#fafafa` background, `#ffffff` cards, `#2563eb` accent) defined using CSS custom properties in `src/app/globals.css`. Dark mode toggle is not active on this minimal UI.
- **Hinglish:** Abhi app clean light theme (`#fafafa`) par set hai `globals.css` ke through; dark theme purane iteration se hata kar simple light look rakha gaya hai.

**Q16. How did you make the Dashboard and Header responsive for mobile?**
- **English:** On mobile screens, `Header.tsx` hides desktop links (`hidden md:flex`) and opens a hamburger menu toggle; `dashboard/page.tsx` hides the sidebar (`-translate-x-full md:translate-x-0`) and slides it out with a backdrop when tapped.
- **Hinglish:** Mobile par top links aur sidebar chhup jaate hain aur menu button dabane par slide/open hote hain.

**Q17. What are `FeatureCard.tsx` and `VaultPreview.tsx` inside `src/components/`?**
- **English:** They are unused files left over from an earlier UI redesign commit before we simplified the landing page (`657dc8e`); the current landing page renders feature cards directly.
- **Hinglish:** Yeh purane design phase ke leftover components hain jo abhi live landing page mein use nahi ho rahe.

**Q18. Why does `RootLayout` wrap children in `<AuthProvider>`?**
- **English:** Wrapping the root layout in `AuthProvider` lets every page (`/login`, `/register`, `/dashboard`) access the current authenticated user state without re-checking Firebase separately on every component.
- **Hinglish:** Root par `<AuthProvider>` lagane se poori app ke har page ko ek hi jagah se user login status mil jaata hai.

**Q19. What icon library is used and why?**
- **English:** We use `lucide-react` (`^1.78.0`) for crisp SVG icons like `ShieldCheck`, `Lock`, `KeyRound`, and `Eye`, keeping the UI clean without emoji clutter.
- **Hinglish:** Clean professional icons ke liye `lucide-react` use hua hai instead of emojis.

---

## Category 3: Authentication & Firebase Questions (Q20–Q29)

**Q20. Why Firebase Authentication instead of a custom SQL login system?**
- **English:** Firebase handles password salting, hashing, secure session tokens, and abuse protection automatically, letting our team avoid custom authentication vulnerabilities in an early prototype.
- **Hinglish:** Khud ke SQL table mein password hashing aur session tokens banana risky hota hai; Firebase managed aur tested security deta hai.

**Q21. Can Firebase administrators read the passwords inside the encryption demo?**
- **English:** No. Firebase only receives the account login email and password during signup/signin. The local encryption demo runs strictly inside browser memory and never sends either the demo plaintext password or the master passphrase to Firebase.
- **Hinglish:** Nahi. Firebase ke paas sirf account login details jaati hain; encryption demo ki master passphrase aur sample password browser memory ke bahar jaate hi nahi.

**Q22. What happens when a user registers on `/register`?**
- **English:** The form validates non-empty Full name, email format, 8+ character password, and matching confirmation password using `authValidation.ts`. It calls Firebase `createUserWithEmailAndPassword()`, saves `displayName` via `updateProfile()`, refreshes auth context, and redirects to `/dashboard`.
- **Hinglish:** Pehle form validation check hota hai, phir Firebase Auth mein account create hota hai, `updateProfile()` naam save karta hai, aur user dashboard par redirect hota hai.

**Q23. Where is the user's "Full name" saved after registration?**
- **English:** `register/page.tsx` saves it directly into the Firebase user's profile (`displayName`) using `updateProfile(userCredential.user, { displayName: name.trim() })` inside dedicated error handling, and displays it on `/dashboard`.
- **Hinglish:** Registration ke baad `updateProfile()` naam ko Firebase user profile ke `displayName` mein save karta hai aur Dashboard par dikhata hai.

**Q24. How does session persistence work when you refresh `/dashboard`?**
- **English:** Firebase Auth stores the active session token in browser storage, and `AuthContext` subscribes to `onAuthStateChanged(auth, ...)` so refreshing restores the `user` object automatically.
- **Hinglish:** Refresh karne par Firebase SDK local browser storage se token padh kar `onAuthStateChanged` ke through user login state wapas laata hai.

**Q25. How do you protect `/dashboard` from unauthorized users?**
- **English:** Inside `dashboard/page.tsx`, a `useEffect` hook checks if `loading` is finished, Firebase is configured, and `user` is `null`; if so, it immediately runs `router.replace("/login")`.
- **Hinglish:** Dashboard page load hone par check karta hai ki user logged in hai ya nahi — agar nahi, toh `router.replace("/login")` se bahar bhej deta hai.

**Q26. Is route protection server-side or client-side?**
- **English:** Currently it is client-side only via `useEffect`. Because no private database records exist on the dashboard yet, no server secrets are exposed. Server middleware/token verification is for later phases.
- **Hinglish:** Abhi sirf client-side par hai (`useEffect` redirect); server middleware abhi nahi laga hai kyunki server par koi saved vault data nahi hai.

**Q27. What happens if `.env.local` is missing?**
- **English:** `isFirebaseConfigured()` checks if required env keys exist; if missing, Firebase does not initialize, preventing crashes, and the UI shows a helpful configuration warning instead.
- **Hinglish:** App crash nahi hoti — `isFirebaseConfigured()` false dekar user ko ek amber notice dikhata hai ki `.env.local` set karein.

**Q28. Are `NEXT_PUBLIC_FIREBASE_*` API keys in `.env.local` secret passwords?**
- **English:** No, Firebase Web SDK config keys are public client identifiers (not Admin SDK private keys). Still, we keep `.env.local` out of Git so each developer can use their own environment cleanly.
- **Hinglish:** Nahi, yeh client identifiers hote hain (Admin private keys nahi), fir bhi cleanliness ke liye `.env.local` GitHub par upload nahi karte.

**Q29. What does `getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)` do?**
- **English:** It ensures Firebase initializes only once across Next.js hot reloads, preventing the "Firebase App already exists" crash.
- **Hinglish:** Yeh check karta hai ki Firebase app pehle se chalu toh nahi hai — taaki duplicate initialization error na aaye.

---

## Category 4: Password Generator Questions (Q30–Q38)

**Q30. Why did you use `crypto.getRandomValues()` instead of `Math.random()`?**
- **English:** `Math.random()` is a non-cryptographic pseudo-random number generator whose outputs can be predicted; `crypto.getRandomValues()` accesses OS hardware entropy (CSPRNG) for unpredictable passwords.
- **Hinglish:** `Math.random()` formula-based aur predictable hota hai; `crypto.getRandomValues()` OS hardware randomness deta hai jo secure hai.

**Q31. What length range does the generator support?**
- **English:** From 4 characters up to 128 characters, defaulting to 16.
- **Hinglish:** Minimum 4 se maximum 128 characters tak, default 16.

**Q32. How do you guarantee at least one character from every selected type?**
- **English:** After filling the password randomly from the combined pool, a second pass in `generatePassword()` picks one random character from each selected set and inserts it into unique random positions tracked by a `Set`.
- **Hinglish:** Pehle poora password random banta hai, phir har ticked checkbox category ka ek-ek letter alag-alag random positions par overwrite kiya jaata hai.

**Q33. Does the generator calculate true bit entropy like $L \times \log_2(N)$?**
- **English:** Honestly no — checking our actual `getStrength()` function, it computes a heuristic score from 0 to 7 based on length thresholds (10, 14, 18) and character-class presence to display Weak, Fair, Good, or Strong.
- **Hinglish:** Nahi, actual code mein log formula nahi hai — `getStrength()` 7 simple rules (length aur character types) check karke Weak/Fair/Good/Strong dikhata hai.

**Q34. What happens if all four checkboxes are unchecked?**
- **English:** `pool.length === 0` is caught cleanly, clearing the password output and showing `"Please select at least one character type."`
- **Hinglish:** Crash hone ke bajaye error message aa jaata hai ki kam se kam ek character type select karo.

**Q35. What happens on initial page load of `/generator`?**
- **English:** `generator/page.tsx` renders `PasswordGeneratorClient` via `next/dynamic(..., { ssr: false })`. On browser initialization, React calls `createCryptographicPassword()` using `window.crypto.getRandomValues()` inside `useState`, generating a fresh password immediately with zero hydration mismatches.
- **Hinglish:** Browser par page khulte hi `PasswordGeneratorClient` (`ssr: false`) client side par `crypto.getRandomValues()` se turant ek fresh random password bana deta hai, bina SSR hydration error ke.

**Q36. Why use `Uint32Array` instead of `Uint8Array` in the generator?**
- **English:** `Uint32Array` holds unsigned 32-bit integers up to ~4.29 billion, giving a huge random range when taking modulo (`% pool.length`) and minimizing modulo bias.
- **Hinglish:** 32-bit integer bahut bada number hota hai, jisse `% pool.length` karte waqt bias lagbhag zero rehta hai.

**Q37. How does the Copy button work?**
- **English:** `copyToClipboard()` uses the browser `navigator.clipboard.writeText(password)` inside a `try/catch` block and sets `copied` to `true` for 2 seconds via `setTimeout`.
- **Hinglish:** Browser ka Clipboard API text copy karta hai aur 2 second ke liye `"Copied"` feedback dikhata hai.

**Q38. Are generated passwords stored or logged anywhere?**
- **English:** No, they remain only in browser React state until overwritten or the tab is closed.
- **Hinglish:** Nahi, kahin save ya log nahi hote — sirf screen par temporarily dikhte hain.

---

## Category 5: Cryptography Questions (Q39–Q50)

**Q39. What does AES stand for?**
- **English:** Advanced Encryption Standard — a globally trusted symmetric block cipher using a 256-bit key in our implementation.
- **Hinglish:** Advanced Encryption Standard — ek symmetric algorithm jisme lock aur unlock karne ke liye same derived 256-bit key use hoti hai.

**Q40. What is the difference between hashing and encryption?**
- **English:** Hashing (like SHA-256) is **one-way**—you cannot reverse a hash back into the original text. Encryption (like AES-256-GCM) is **two-way**—with the correct key, ciphertext decrypts back to the exact original password.
- **Hinglish:** Hashing one-way hota hai (wapas original password nahi nikal sakta). Encryption two-way hota hai (sahi key se wapas asli password mil jaata hai).

**Q41. Why not just hash stored passwords in a password manager?**
- **English:** Because a password manager must give your saved Gmail or college password back to you when you need to log in! That requires reversible encryption, unlike login authentication verification which uses hashing.
- **Hinglish:** Kyunki aapko apna saved Gmail password wapas dekhna aur copy karna hota hai! Agar hash kar diya toh wapas kabhi nahi milega.

**Q42. What does GCM in AES-256-GCM mean and why use it?**
- **English:** GCM stands for Galois/Counter Mode. It provides Authenticated Encryption (AEAD), meaning it ensures both **confidentiality** (hiding data) and **integrity/authenticity** (detecting tampering or wrong keys via an authentication tag).
- **Hinglish:** GCM data chhupane ke saath-saath ek security seal (auth tag) lagata hai — agar key galat ho ya data chheda jaaye toh turant pakad leta hai.

**Q43. What is PBKDF2 and why 100,000 iterations?**
- **English:** Password-Based Key Derivation Function 2 stretches a human-entered master passphrase into a 256-bit cryptographic key using HMAC-SHA-256 repeated 100,000 times, slowing down GPU brute-force guessing attacks.
- **Hinglish:** Human passphrase ko strong 256-bit key banane ke liye 1 lakh baar SHA-256 hash chalaya jaata hai taaki hacker ka computer try karte waqt slow pad jaaye.

**Q44. What is a salt?**
- **English:** A random 128-bit (16-byte) value mixed with the master passphrase during key derivation so identical passphrases generate completely different keys, defeating precomputed rainbow tables.
- **Hinglish:** Key banate waqt passphrase mein milaya jaane wala 16-byte random number taaki precomputed attacks fail ho jaayein.

**Q45. Why is an IV (Initialization Vector) necessary?**
- **English:** A unique 96-bit (12-byte) random IV per encryption ensures that encrypting the exact same password twice yields completely different ciphertext. In AES-GCM, reusing an IV with the same key breaks security.
- **Hinglish:** Ek hi password ko 2 baar encrypt karne par bhi alag ciphertext aaye, isliye har baar naya 12-byte IV banta hai. AES-GCM mein IV repeat karna strictly mana hai.

**Q46. What happens when a wrong master passphrase is entered during decryption?**
- **English:** PBKDF2 derives the wrong 256-bit key, so AES-GCM's 128-bit authentication tag check fails. Web Crypto throws an `OperationError`, which we catch to display `"Authentication Tag Rejected"`.
- **Hinglish:** Galat key banne se authentication tag match nahi hota, Web Crypto error deta hai, aur screen par `"Authentication Tag Rejected"` dikhta hai — koi galat/kachra password bahar nahi aata.

**Q47. Why does our code set `extractable` to `false` in `deriveKeyFromPassphrase()`?**
- **English:** Passing `false` tells the browser Web Crypto engine that JavaScript code cannot export raw key bytes out of the `CryptoKey` object, reducing accidental key exposure.
- **Hinglish:** `false` ka matlab browser key ke raw bytes ko JavaScript mein export nahi hone dega — security badhti hai.

**Q48. Where are the encrypted passwords stored right now?**
- **English:** Strictly in temporary browser React memory (`useState` inside `dashboard/page.tsx`). Refreshing the page clears the ciphertext completely because Firestore persistence is planned for Phase 2.
- **Hinglish:** Abhi sirf browser ke temporary RAM (`useState`) mein rehte hain; page reload karte hi hat jaate hain.

**Q49. Does AES-256-GCM need to be stored alongside Salt and IV?**
- **English:** Yes! Salt and IV are not secret—without saving the original Salt and IV alongside the ciphertext, even the legitimate user couldn't re-derive the same key or decrypt the record later.
- **Hinglish:** Haan! Salt aur IV secret nahi hote, unhe ciphertext ke saath store karna zaroori hai tabhi aap baad mein decrypt kar paaoge.

**Q50. Why does Web Crypto API require `localhost` or `HTTPS`?**
- **English:** Browsers restrict `window.crypto.subtle` to Secure Contexts (`https://` or `http://localhost`) so unencrypted network attackers cannot inject scripts into cryptographic operations.
- **Hinglish:** Security ke liye browser `crypto.subtle` ko sirf `https` ya `localhost` par chalne deta hai.

---

## Category 6: GitHub Collaboration Questions (Q51–Q58)

**Q51. What is the difference between Git and GitHub?**
- **English:** Git is the local version control tool running on our computer (`git commit`, `git log`), while GitHub is the cloud hosting platform where our team shares branches and Pull Requests.
- **Hinglish:** Git laptop par local history tracker hai; GitHub online platform hai jahan sab team members code share aur merge karte hain.

**Q52. Why do you use feature branches instead of pushing directly to `main`?**
- **English:** Working on branches like `feature/presentation-prototype` or `feature/nishant-landing-review` keeps `main` stable and allows review via Pull Requests before merging.
- **Hinglish:** Taaki kisi ka adhooora ya broken code seedha `main` ko kharab na kare — pehle branch par test karke PR se merge karte hain.

**Q53. Which pull requests from teammates were merged into `main`?**
- **English:** Pull Request #2 (`39542be`) from Nishant Singh (`16e14ab`, landing page `'Available'` badge) and Pull Request #3 (`7ef9eeb`) from Ayushmaan Gupta (`c03aaf6` ambiguous character exclusion + `f8c363e` generator test doc).
- **Hinglish:** Nishant Singh ki PR #2 (`16e14ab`) aur Ayushmaan Gupta ki PR #3 (`c03aaf6`, `f8c363e`) dono `main` mein merged hain.

**Q54. Why do Dileep and Utpal not have Git commits yet in `git log`?**
- **English:** Honestly, several teammates are beginners learning Git/GitHub, so Anukalp integrated the core codebase while Nishant and Ayushmaan have completed their PRs (#2 and #3). Dileep and Utpal are doing their testing/documentation PRs before full Phase 2 coding.
- **Hinglish:** Beginners hone ki wajah se Anukalp ne main integration kiya; Nishant aur Ayushmaan apne PR kar chuke hain, aur Dileep/Utpal apna verification/docs PR complete kar rahe hain.

**Q55. How do you ensure `.env.local` is never pushed to GitHub?**
- **English:** `.gitignore` lists `.env.local`, and before merging or pushing we run `git status` and `git check-ignore .env.local` to verify no secrets are tracked.
- **Hinglish:** `.gitignore` file `.env.local` ko block rakhti hai, aur hum `git status` se verify karte hain.

**Q56. What happens if two teammates edit the same file on different branches?**
- **English:** Git raises a merge conflict when merging into `main`, asking the developer/integrator to manually choose which changes to keep before committing.
- **Hinglish:** Merge conflict aata hai — fir dono code dekh kar sahi line select karke resolve karna padta hai.

**Q57. Why did `39542be` and `feature/presentation-prototype` merge cleanly without conflicts?**
- **English:** Nishant's PR modified `src/app/page.tsx`, while `feature/presentation-prototype` modified Firebase auth, crypto, dashboard, and docs without touching `page.tsx`.
- **Hinglish:** Dono branches ne alag-alag files change ki thin, isliye zero conflict merge hua.

**Q58. What is a semantic commit message (like `feat:`, `fix:`, `docs:`)?**
- **English:** Conventional prefixes make Git history easy to scan: `feat:` for new features, `fix:` for bug fixes, `style:` for UI tweaks, and `docs:` for documentation.
- **Hinglish:** Commit message padhte hi samajh aa jaata hai ki naya feature (`feat:`), bug fix (`fix:`), ya docs (`docs:`) change hua hai.

---

## Category 7: Testing Questions (Q59–Q65)

**Q59. What automated checks do you run on this project?**
- **English:** We run three commands in `package.json`/CLI: `npx tsc --noEmit` (TypeScript type check), `npm run lint` (ESLint rules), and `npm run build` (`next build --webpack`). All three pass with zero errors on `main`.
- **Hinglish:** Hum 3 checks chalate hain: TypeScript check, ESLint check, aur Next.js production build — teeno `0 errors` se pass hain.

**Q60. Do you have unit tests (Jest / Vitest / Playwright) written right now?**
- **English:** Honestly, no. Automated unit or end-to-end test scripts are not installed in `package.json` yet; we rely on TypeScript/ESLint/build checks plus structured manual browser testing.
- **Hinglish:** Nahi, Jest ya Playwright tests abhi nahi likhe hain; abhi static compiler/linter checks aur manual browser tests hi kiye hain.

**Q61. Which module did you personally test?**
- **English:** *(Tailor to yourself!)*  
  - Nishant: Landing page responsiveness & ESLint.  
  - Dileep: Login/Register validation, signup/signin, reload persistence, route guard.  
  - Ayushmaan: Generator lengths (4, 16, 128), checkbox edge cases, copy button.  
  - Utpal: AES-GCM encryption, correct passphrase decryption, wrong passphrase failure, whole flow.
- **Hinglish:** Har member apne assigned module ka manual test case bataayega (upar diye list ke hisaab se).

**Q62. How did you verify wrong-passphrase protection?**
- **English:** We encrypted a sample password with `MasterDemoKey2026!`, then tested decryption using `WrongKey` and confirmed the app catches Web Crypto's `OperationError` and renders `"Authentication Tag Rejected"`.
- **Hinglish:** Encryption ke baad galat passphrase daal kar Decrypt click kiya aur check kiya ki red error aaye aur password na khule.

**Q63. How did you verify Firebase Auth errors?**
- **English:** We manually tested empty submissions, short passwords (`< 8` on register, `< 6` on login), duplicate account creation (`auth/email-already-in-use`), and invalid login credentials.
- **Hinglish:** Empty form, chhota password, same email se dobara register, aur galat login password daal kar error messages check kiye.

**Q64. Why did `npm run build` on Windows use `--webpack`?**
- **English:** Next.js 16's default Turbopack build encountered a CSS loader subprocess exit error on Windows (`@tailwindcss/turbopack`), so configuring `next build --webpack` produces clean, reproducible builds.
- **Hinglish:** Windows par Turbopack mein CSS build issue aa raha tha, isliye `package.json` mein `--webpack` set kiya jo smoothly build karta hai.

**Q65. What happens if `eslint` reports an unused variable or React hook warning?**
- **English:** `npm run lint` blocks clean verification until fixed; for instance, we initialized `AuthContext` state lazily instead of calling `setState` synchronously inside `useEffect` to obey React 19 lint rules.
- **Hinglish:** React 19 lint rules strict hain — agar error aaye toh code clean karna padta hai, tabhi build pass maana jaata hai.

---

## Category 8: Project Limitations & Future Scope (Q66–Q73)

**Q66. Is this application production-ready right now?**
- **English:** No Sir/Ma'am. It is a 25–30% academic prototype. It lacks persistent database storage, 2FA, password recovery, automated test suites, and production server security rules.
- **Hinglish:** Bilkul nahi — yeh 25–30% college prototype hai. Production mein jaane se pehle Firestore, 2FA, recovery, aur security tests lagane honge.

**Q67. Is TOTP Two-Factor Authentication (2FA) implemented?**
- **English:** Not yet. Although 2FA is in our project title and synopsis, in this Phase 1 prototype the landing page clearly marks it `'Coming Soon'`, and it is scheduled for Phase 2/3.
- **Hinglish:** Abhi nahi bana hai. Title mein hai kyunki final project mein hoga, abhi prototype par `'Coming Soon'` likha hai.

**Q68. What happens if the user refreshes `/dashboard` after encrypting a password?**
- **English:** The encrypted record disappears because it lives only in React `useState` RAM for the live demonstration; saving ciphertext to Firestore is planned for Phase 2.
- **Hinglish:** Refresh karne par encrypted card hat jaata hai kyunki woh RAM mein tha, database mein abhi save nahi hota.

**Q69. What happens if a user forgets their Master Passphrase in a real zero-knowledge system?**
- **English:** Without recovery keys, forgotten master passphrases mean stored vault data cannot be decrypted—because the server never knows the passphrase. Adding offline recovery codes is part of our Phase 4 roadmap.
- **Hinglish:** Zero-knowledge mein agar Master Passphrase bhool gaye toh server bhi madad nahi kar sakta — iske liye future mein Recovery Key feature banana hoga.

**Q70. What limitation exists in the Registration form right now?**
- **English:** The form validates `"Full name"`, and `login/page.tsx` allows 6 chars while `register/page.tsx` requires 8 chars, and `Full name` is not saved to Firebase user profile yet.
- **Hinglish:** Registration par Name sirf validate hota hai par Firebase mein save nahi hota (sirf email-password save hota hai).

**Q71. Is client-side route protection enough against a clever attacker?**
- **English:** In a real vault with stored cloud data, client-side routing must be backed by Firebase Security Rules (`request.auth.uid == userId`) and server checks so nobody can query someone else's encrypted blobs via API.
- **Hinglish:** Nahi, jab hum Firestore mein data save karenge toh Firebase Security Rules lagani padengi taaki koi API se bhi kisi aur ka data na padh sake.

**Q72. What are the limitations of Web Crypto PBKDF2 in the browser?**
- **English:** Modern OWASP guidelines prefer memory-hard KDFs like Argon2id (or 600,000 PBKDF2 iterations) against ASIC/GPU cracking, whereas Web Crypto natively offers PBKDF2 (set at 100,000 for demo responsiveness).
- **Hinglish:** Browser ka native Web Crypto sirf PBKDF2 deta hai (Argon2 native nahi hai), aur demo speed ke liye 1,00,000 rounds rakhe gaye hain.

**Q73. What will you implement next (Week 2 / 50% Milestone)?**
- **English:** Next we will connect Cloud Firestore with user-scoped security rules to save encrypted vault items permanently, add full CRUD (create, edit, delete), and begin TOTP 2FA enrollment with QR codes.
- **Hinglish:** Agle step mein Firestore database jod kar encrypted passwords permanently save karenge, edit/delete layenge, aur TOTP 2FA shuru karenge.

---

## Category 9: AI-Assisted Development Questions (Q74–Q80)

**Q74. Did AI generate your code?**
- **English:** Yes Sir/Ma'am. Being beginner developers, we used Cursor and Google Antigravity AI as an assistant to generate scaffolding, Tailwind layouts, TypeScript types, and Web Crypto boilerplate, while we directed requirements, reviewed outputs, and ran manual and build verification.
- **Hinglish:** Haan Sir, hum beginners hain isliye coding aur UI formatting mein Cursor/Antigravity AI ki help li, lekin architecture humne guide ki, output check kiya, aur browser/build tests khud verify kiye.

**Q75. If AI wrote much of the code, what did the students actually do?**
- **English:** We defined the project problem, broke work into weekly milestones, configured the Firebase project (`pass-c6c3a`), connected environment secrets safely, fixed UI badge mismatches (Nishant's PR #2), debugged Windows build issues, verified edge cases in browser, and studied every function so we understand how our app works.
- **Hinglish:** Humne decide kiya kya banana hai, Firebase console setup kiya, `.env.local` joda, bugs/UI issues pakde (jaise Nishant ki PR), build errors fix kiye, test kiya, aur poora code samjha.

**Q76. How did you verify AI-generated code wasn't wrong or fake?**
- **English:** We caught discrepancies ourselves—for example, earlier AI summaries claimed our password generator calculated Shannon entropy formulas, whereas inspecting `src/app/generator/page.tsx` proved `getStrength()` actually uses 7 simple conditions. We also ran `tsc`, `eslint`, `next build`, and real browser tests with Firebase.
- **Hinglish:** Humne khud code check karke galtiyan pakdin—jaise AI docs mein entropy formula likha tha par asli code mein simple 7-point check tha! Iske alawa `tsc`, `lint`, `build`, aur browser mein live login/encrypt test kiya.

**Q77. What mistake could happen if someone blindly trusts AI-generated cryptography code?**
- **English:** AI might accidentally use insecure `Math.random()`, hardcode static IVs/salts, use weak ECB/CBC encryption, or store keys in `localStorage`. Knowing the basics let us verify `crypto.getRandomValues()`, 12-byte random IVs, and `AES-GCM` in `src/lib/crypto.ts`.
- **Hinglish:** AI kabhi kabhi `Math.random()` ya static IV laga sakta hai; basics padhne se humne check kiya ki `crypto.getRandomValues()` aur `AES-GCM` sahi use hue hain.

**Q78. Why are TypeScript and ESLint helpful when working with AI-generated code?**
- **English:** They act as automated guardrails—catching type errors (`BufferSource` mismatches in `crypto.ts`), unused imports, and React 19 anti-patterns before the app ships.
- **Hinglish:** TypeScript aur ESLint AI ke likhe code ki galti (unused code, galat types) turant pakad lete hain.

**Q79. Why do you have documentation explicitly stating honest limitations?**
- **English:** Academic integrity matters: presenting a 25% verified prototype honestly shows real engineering understanding rather than overpromising features that aren't coded yet.
- **Hinglish:** Imandari se 25% working prototype dikhana best hai, bina unbuilt features ka jhootha daawa kiye.

**Q80. Can you explain one file in this codebase completely without AI right now?**
- **English:** *(Pick your easiest file!)*  
  - Dileep: *"Yes Sir, `src/lib/firebase.ts` is 37 lines—it checks `isFirebaseConfigured()`, initializes a single Firebase app via `getApps()`, and exports `auth`."*  
  - Utpal: *"Yes Sir, `src/lib/crypto.ts` defines `CRYPTO_CONFIG` and exports `deriveKeyFromPassphrase`, `encryptPassword`, and `decryptPassword` using `window.crypto.subtle`."*  
  - Nishant: *"Yes Sir, `src/components/Header.tsx` uses one boolean `mobileMenuOpen` state to render mobile/desktop links."*  
  - Ayushmaan: *"Yes Sir, `src/app/generator/page.tsx` combines `CHAR_SETS`, runs `crypto.getRandomValues`, and scores strength in `getStrength()`."*  
  - Anukalp: *"Yes Sir, `src/app/layout.tsx` and `AuthContext.tsx` connect Firebase auth globally to all five pages."*
- **Hinglish:** Sabko apni ek chhoti file (`firebase.ts` ya `Header.tsx` ya `crypto.ts` ya `generator/page.tsx`) bilkul pakki yaad kar leni hai!
