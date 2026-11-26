# 03 — Individual Presentation Script: Anukalp Gupta

**Role:** Project Integration, Architecture & Repository Management  
**Group:** G195 · B.Tech CSE Final Year · GLA University, Mathura  
**Target Speaking Time:** 60–75 seconds  

---

## A. Natural English Speech (45–75 Seconds)

> "Good morning Sir and Ma'am. I am Anukalp Gupta from Group G195, and I handle project integration, architecture, and GitHub management for SecurePass.
>
> People often reuse weak passwords across multiple accounts, which leads to account compromises if even one site is leaked. Our project, SecurePass, is a web-based password manager with Two-Factor Authentication designed around client-side encryption.
>
> For this 25 to 30 percent prototype, we used Next.js 16, React 19, TypeScript, Tailwind CSS, Firebase Authentication, and the browser's native Web Crypto API. Currently, we have integrated five routes: the landing page, login, registration, password generator, and a protected dashboard containing a working local AES-256-GCM encryption demo.
>
> As integrator, I initialized the Next.js project, connected the global authentication provider in `layout.tsx`, and managed GitHub branches and pull requests so our codebase stayed clean and buildable. Because we are honest about our scope, cloud vault storage in Firestore, TOTP 2FA, and the proposed FastAPI backend are currently pending for the next milestones. Next, Nishant will explain the frontend UI."

---

## B. Speech Explained Sentence by Sentence (Simple Hinglish)

1. **"Good morning Sir and Ma'am. I am Anukalp Gupta from Group G195..."**  
   $\rightarrow$ Simple introduction: apna naam, group number aur role bataya.
2. **"People often reuse weak passwords across multiple accounts..."**  
   $\rightarrow$ Problem statement: log ek hi weak password sab jagah use karte hain, jo risky hai.
3. **"Our project, SecurePass, is a web-based password manager..."**  
   $\rightarrow$ Solution overview: hum client-side encryption aur 2FA architecture wala password manager bana rahe hain.
4. **"For this 25 to 30 percent prototype, we used Next.js 16..."**  
   $\rightarrow$ Tech stack: jo exact tools `package.json` mein hain, bina kuch extra jode bataya.
5. **"Currently, we have integrated five routes..."**  
   $\rightarrow$ Implemented scope: landing, login, register, generator, dashboard (with local encryption demo).
6. **"As integrator, I initialized the Next.js project, connected the global authentication provider..."**  
   $\rightarrow$ Aapka asli role: repo setup, `AuthProvider` connection, branch aur PR merging.
7. **"Because we are honest about our scope, cloud vault storage in Firestore, TOTP 2FA..."**  
   $\rightarrow$ Limitations upfront: khud hi clear kar diya ki database save, 2FA, aur FastAPI abhi next milestone mein hain.

---

## C. What Screen or Code File to Display While Speaking

- **First 30 sec:** Slide 1 (Project Title & Architecture Diagram) ya GitHub Repository Page (`https://github.com/ask8962/securepass-password-manager`).
- **Next 30 sec:** VS Code / Antigravity mein folder tree dikhayein (`src/app/`, `package.json`, `src/app/layout.tsx`) aur `git log --oneline`.

---

## D. Actual Functions / Components You Should Explain

1. **`RootLayout` (`src/app/layout.tsx`):** Poori app ko `<AuthProvider>{props.children}</AuthProvider>` mein wrap karta hai taaki har page ko user login status mil sake.
2. **`.gitignore` + `.env.local` setup:** Batayein ki Firebase ke credentials `.env.local` mein rakhe hain jo Git ignored hai taaki GitHub par keys upload na hon.
3. **`package.json`:** Scripts (`dev`, `build`, `lint`) aur dependencies (`next`, `react`, `firebase`, `lucide-react`).

---

## E. Five Simple Technical Concepts You Must Know

1. **Client-Side Architecture:** Encryption user ke browser mein hota hai, server par nahi.
2. **App Router (Next.js):** `src/app/login/page.tsx` automatic `/login` URL ban jaata hai.
3. **Context Provider (`AuthProvider`):** Ek global container jo har page ko batata hai ki user logged in hai ya nahi.
4. **Prototype vs Production:** Prototype core working features prove karta hai; production mein DB persistence, 2FA, aur tests poora hote hain.
5. **Pull Request Merging:** Feature branches ko verify karke `main` mein milana (`39542be` Nishant ka PR #2, `7ef9eeb` Ayushmaan ka PR #3, aur `ad4260b` prototype merge).

---

## F. Ten Likely Examiner Questions & Short Accurate Answers

1. **Q: Why did you choose Next.js over plain HTML/CSS/JS?**  
   **A:** Next.js gives us structured routing (`src/app/`), TypeScript support, React component reuse, and clean production builds in one framework.
2. **Q: What about Python FastAPI mentioned in the synopsis?**  
   **A:** FastAPI is planned in our architecture (`docs/architecture-plan.md`) for future server-side validation, rate limiting, or breach checks; it is not built yet in this 25% phase.
3. **Q: How much percentage of the project is actually done?**  
   **A:** Around 25–30%: UI routes, Firebase Email/Password authentication, CSPRNG password generator, and local in-memory AES-256-GCM encryption demo.
4. **Q: Did you use AI tools to generate code?**  
   **A:** Yes Sir, we used Cursor / Antigravity AI to assist with boilerplate, UI layout, and TypeScript syntax, and we verified builds, lint checks, and browser testing ourselves.
5. **Q: Where are user passwords saved right now?**  
   **A:** Firebase Auth handles user account login credentials, while the encryption demo holds sample data temporarily in React memory (`useState`). Persistent vault storage in Firestore is planned next.
6. **Q: Why does `package.json` have `"build": "next build --webpack"`?**  
   **A:** On Windows, Next.js Turbopack had a build-time CSS loader process issue during our test, so using `--webpack` gives a reliable production build.
7. **Q: Why is `.env.local` not visible on your GitHub repository?**  
   **A:** Because `.gitignore` explicitly ignores `.env.local` so environment configuration is never exposed or mixed across teammates' setups.
8. **Q: What does `tsconfig.json` do?**  
   **A:** It configures TypeScript strict checks (`"strict": true`, `@/*` path aliases) so compiler errors are caught before runtime.
9. **Q: How do you check code quality before merging?**  
   **A:** We run `npx tsc --noEmit`, `npm run lint`, and `npm run build` along with manual browser checks.
10. **Q: What is `src/app/layout.tsx` doing?**  
    **A:** It defines the root HTML wrapper, page metadata, global CSS import, and wraps all pages in `AuthProvider`.

---

## G. Five Difficult Follow-Up Questions

1. **Q: If all cryptographic encryption happens on the client, why do you still plan to have a Python FastAPI backend?**  
   **A:** FastAPI won't touch plaintext passwords; it would handle auxiliary backend tasks like rate limiting, breach-API proxying (checking hashed prefixes), or audit logs if approved over a purely serverless Firestore setup.
2. **Q: Looking at `git log`, most commits are under your name. Why?**  
   **A:** Our teammates are beginners in Git/GitHub. As integrator, I set up onboarding guides and pushed core milestones, while Nishant contributed PR #2 (`16e14ab`) and Ayushmaan contributed PR #3 (`c03aaf6`, `f8c363e`). We are helping Dileep and Utpal get hands-on PR experience too.
3. **Q: Notice `README.md` still says "Firebase Authentication is not connected" while `.env.local` and login work. Why?**  
   **A:** That was written in Week 1 before `feature/presentation-prototype` connected Firebase Auth; updating `README.md` is a pending documentation cleanup item we will do honestly.
4. **Q: Why are `FeatureCard.tsx` and `VaultPreview.tsx` in `src/components/` if `page.tsx` doesn't use them?**  
   **A:** They remained from an earlier UI redesign iteration when we simplified the landing page from dark mode to a minimal light theme.
5. **Q: In `dashboard/page.tsx`, if someone turns off JavaScript or inspects before hydration, is route protection server-enforced?**  
   **A:** No Sir, right now route guarding runs client-side in `useEffect`. Since vault data isn't stored on a server yet, no sensitive data leaks, and server/middleware checks can be added later.

---

## H. Common Mistakes to Avoid

- Do **NOT** claim Firestore, TOTP, or FastAPI are already running.
- Do **NOT** say "we wrote zero AI code" — examiners immediately know AI helped; explain how you understood, tested, and integrated it instead.
- Do **NOT** quote Shannon entropy math for the generator (`getStrength()` uses 7 simple rules, not log math!).

---

## I. Honest Explanation of Anukalp's Verified Contributions

- **Verified Git Evidence:** Authored the repository foundation (`4743f1c`, `70a742b`), integrated all Week 1 routes (`c952a1d`–`717577d`), UI iterations (`0334a3b`–`284e2f9`), Firebase Auth integration (`32d6755`), Web Crypto local demo (`0b15ac2`), documentation (`882e40a`, `47c5f7d`, `3bc769b`), reviewed/merged Nishant's PR #2 (`39542be`), prototype merge (`ad4260b`), Ayushmaan's PR #3 (`7ef9eeb`), configured `.env.local` locally, and ran `tsc`/`lint`/`build` checks.
- **How to state it:** *"I used AI assistance as a learning and coding accelerator, then integrated all files, resolved TypeScript/Windows build issues, managed branches/PRs, and coordinated testing."*

---

## J. What to Say If a Feature Is Partially Implemented

- *"This is our 25–30% prototype milestone. Authentication and client-side AES-256-GCM encryption work locally, while persistent Firestore storage and TOTP 2FA are intentionally kept for Milestones 2 and 3 so we can build step by step."*
