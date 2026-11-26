# 08 — Complete Group Presentation Script (5 Speaking Turns)

**Total Speaking Time:** ~6–7 minutes (excluding Live Demo & Q&A)  
**Order:** Anukalp $\rightarrow$ Nishant $\rightarrow$ Dileep $\rightarrow$ Ayushmaan $\rightarrow$ Utpal $\rightarrow$ Conclusion (Anukalp)  
**Golden Rule:** Har member 60 seconds se zyada mat kheenche. Clear, slow, confident English mein bolein!

---

## Exact Speaking Order & Slide/Screen Cues

| Turn | Speaker | Slide Displayed | Webpage / File Shown | Time |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Anukalp Gupta** | Slide 1–3: Title, Problem Statement, System Architecture | GitHub Repo / VS Code folder structure | ~1m 15s |
| **2** | **Nishant Singh** | Slide 4: Frontend UI & Responsive Design | `http://localhost:3000` (Landing + Mobile toggle) | ~1m 00s |
| **3** | **Dileep Bhardwaj** | Slide 5: Authentication & Session Flow | `/register`, `/login`, `AuthContext.tsx` | ~1m 00s |
| **4** | **Ayushmaan Gupta** | Slide 6: CSPRNG Password Generator | `http://localhost:3000/generator` | ~1m 00s |
| **5** | **Utpal Kumar** | Slide 7–8: Web Crypto AES-256-GCM & Testing | `http://localhost:3000/dashboard` + `crypto.ts` | ~1m 15s |
| **6** | **Anukalp Gupta** | Slide 9: Implemented vs Pending Roadmap | Summary Slide | ~0m 30s |

---

## Full Coordinated Script (With Smooth Transitions)

### Turn 1 — Anukalp Gupta (Intro, Problem, Architecture, Stack)
> "Good morning Sir and Ma'am. We are Group G195 from B.Tech CSE Final Year, and our project is **SecurePass — A Secure Password Manager with Two-Factor Authentication**.
>
> Today, most users reuse weak passwords across multiple accounts, so if one service is breached, all accounts become vulnerable. Our goal with SecurePass is to demonstrate a web-based password manager that focuses on strong random password generation and client-side encryption, where plaintext passwords never leave the user's device unencrypted.
>
> In this 25 to 30 percent prototype milestone, our frontend runs on Next.js 16, React 19, TypeScript, and Tailwind CSS, connected to Firebase Authentication for user identity and the browser's Web Crypto API for local AES-256-GCM encryption. I handled repository setup, architecture integration, and GitHub workflows.
>
> **Now I invite Nishant to explain our frontend user interface.**"

---

### Turn 2 — Nishant Singh (Landing Page, UI Structure, Responsive Design, PR #2)
> "Thank you, Anukalp. Good morning Sir and Ma'am, I am Nishant Singh, and I worked on the frontend UI review and layout.
>
> *(Screen: Open `http://localhost:3000`)*  
> As you can see on our landing page, we intentionally avoided cluttered dark templates and used a clean, light interface (`#FAFAFA`) inspired by real productivity apps so non-technical users can use it comfortably. The landing page is organized into five sections: a responsive Header with a mobile menu toggle in `Header.tsx`, Hero actions, three roadmap Feature Cards, an About section, and the Footer.
>
> During my UI review, I noticed that the first two feature cards displayed 'Coming Soon' badges while the Password Generator card had no badge. I fixed this inconsistency by adding the 'Available' status badge in `src/app/page.tsx`, tested mobile, tablet, and desktop responsiveness, checked ESLint, and merged it through Pull Request #2.
>
> **Next, Dileep will walk you through our authentication system.**"

---

### Turn 3 — Dileep Bhardwaj (Firebase Setup, Login, Register, Sessions, Route Guard)
> "Thank you, Nishant. Good morning Sir and Ma'am, I am Dileep Bhardwaj, presenting our Firebase Authentication flow.
>
> *(Screen: Switch to `/register` and `/login`)*  
> Rather than storing passwords in an unverified custom table, we integrated Google Firebase Authentication (Project ID `pass-c6c3a`) using environment variables in `.env.local`, which stays excluded from Git.
>
> In `src/lib/firebase.ts`, we initialize the Firebase app only once, and our `AuthContext.tsx` uses `onAuthStateChanged` so the user stays logged in even after refreshing the browser. On `/register`, the form validates name, email, password length, and password confirmation before creating an account. On `/login`, Firebase checks the credentials and shows readable messages for invalid logins. Finally, `/dashboard` includes a client-side check that redirects unauthenticated visitors back to `/login`.
>
> **Now, Ayushmaan will explain our Password Generator module.**"

---

### Turn 4 — Ayushmaan Gupta (Password Generator, CSPRNG, Copy, Edge Cases)
> "Thank you, Dileep. Good morning Sir and Ma'am, I am Ayushmaan Gupta, presenting the Password Generator module.
>
> *(Screen: Open `http://localhost:3000/generator`)*  
> Here on `/generator`, users can pick any length between 4 and 128 characters, toggle uppercase, lowercase, digits, and symbols, and also enable the ambiguous-character exclusion option (`0, O, 1, l, I`) that I added in Pull Request #3. For randomness, we avoid `Math.random()` and call `crypto.getRandomValues()` from the Web Crypto API, which pulls cryptographic randomness from the operating system.
>
> Our function guarantees at least one character from each active category, provides a rule-based strength indicator and a Copy button, and rejects invalid empty-option inputs cleanly. I also recorded test scenarios in `docs/password-generator-tests.md`.
>
> **Finally, Utpal will cover our local encryption demonstration, testing, and documentation.**"

---

### Turn 5 — Utpal Kumar (Local Encryption Demo, AES-GCM/PBKDF2, Testing & Docs)
> "Thank you, Ayushmaan. Good morning Sir and Ma'am, I am Utpal Kumar, covering our testing workflow, documentation, and local encryption demonstration.
>
> *(Screen: Switch to `http://localhost:3000/dashboard`)*  
> Inside our dashboard, we built an interactive Local Encryption Demonstration powered by the Web Crypto API in `src/lib/crypto.ts`. When encrypting a sample password, PBKDF2 with SHA-256 and 100,000 iterations derives a 256-bit key using a random 128-bit salt. Then AES-256-GCM encrypts the password with a random 96-bit IV, outputting Base64 ciphertext along with an automatic 128-bit authentication tag.
>
> During testing, we verified TypeScript (`tsc --noEmit`), ESLint, production builds, and manual test cases—confirming that the right passphrase recovers the original password while a wrong passphrase immediately triggers an authentication-tag error. At this stage, encryption runs in browser memory only and does not persist to a database yet.
>
> **Over to Anukalp for the conclusion.**"

---

### Turn 6 — Anukalp Gupta (Conclusion, Honest Scope & Handover to Live Demo)
> "Thank you, Utpal. To summarize honestly: in this 25 to 30 percent prototype, UI navigation, Firebase Authentication, the CSPRNG Password Generator, and our in-memory AES-256-GCM demo are working and verified. Persistent encrypted storage in Firestore, TOTP 2FA, and the proposed FastAPI backend are scheduled for our next milestones.
>
> We would now like to show you a quick 5-minute live demonstration of the running application. Thank you."

---

## Emergency Fallback Procedure (Agar Koi Member Bhool Jaaye Ya Absent Ho!)

1. **Member freezes mid-sentence:**  
   Side mein khada member (**Anukalp** ya next speaker) 3 second ruk kar politely bolega: *"Allow me to assist on that point..."* aur us point ke 2 lines cover karke aage badh jaayega. Koi panic ya awkward silence nahi hone deni hai.
2. **Ek member absent ho jaaye:**
   - Nishant absent $\rightarrow$ Anukalp covers Turn 2 briefly.
   - Dileep absent $\rightarrow$ Utpal covers Turn 3.
   - Ayushmaan absent $\rightarrow$ Nishant covers Turn 4.
   - Utpal absent $\rightarrow$ Anukalp covers Turn 5 + Conclusion.
3. **Projector / Screen sharing crash ho jaaye:**  
   Laptop seedha examiner ki desk par ghuma dein (`14-presentation-day-checklist.md` mein backup PPT & screenshots ready rakhein).
