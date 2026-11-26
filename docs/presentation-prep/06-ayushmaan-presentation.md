# 06 — Individual Presentation Script: Ayushmaan Gupta

**Role:** Password Generator Module (Ambiguous Character Exclusion, Testing & Security Verification)  
**Group:** G195 · B.Tech CSE Final Year · GLA University, Mathura  
**Target Speaking Time:** 50–65 seconds  

---

## A. Natural English Speech (45–75 Seconds)

> "Good morning Sir and Ma'am. I am Ayushmaan Gupta from Group G195, and I worked on enhancing and testing the Password Generator module of SecurePass.
>
> Most people create predictable passwords like names or birthdates. Our `/generator` page builds strong random passwords right inside the browser. Users can choose a length between 4 and 128 characters, toggle uppercase letters, lowercase letters, numbers, and symbols, and also turn on an 'Exclude ambiguous characters' option that I added on my feature branch (`feature/ayushmaan-generator`) to avoid visually confusing characters like `0`, `O`, `1`, `l`, and `I`.
>
> For security, the generator avoids JavaScript's predictable `Math.random()` and uses `crypto.getRandomValues()` inside `generatePassword()`, guaranteeing at least one character from each checked category. Along with a rule-based strength indicator and a Copy button, I verified length bounds (4 to 128), empty-pool validation errors, and ambiguous exclusion, documented the results in `docs/password-generator-tests.md`, and merged the work via Pull Request #3. Next, Utpal will cover testing, documentation, and local encryption."

---

## B. Speech Explained Sentence by Sentence (Simple Hinglish)

1. **"Good morning Sir and Ma'am. I am Ayushmaan Gupta..."**  
   $\rightarrow$ Introduction aur aapka Password Generator module.
2. **"Most people create predictable passwords..."**  
   $\rightarrow$ Problem: log guessable passwords banate hain.
3. **"Our `/generator` page builds strong random passwords right inside the browser..."**  
   $\rightarrow$ Features: 4 se 128 length slider, 4 checkboxes (A-Z, a-z, 0-9, Symbols), aur aapka naya **`Exclude ambiguous characters`** toggle jo `0, O, 1, l, I` ko filter karta hai.
4. **"For security, the generator avoids JavaScript's predictable `Math.random()`..."**  
   $\rightarrow$ Main security concept: `Math.random()` predictable hota hai, isliye **`crypto.getRandomValues()`** use kiya gaya hai.
5. **"Along with a rule-based strength indicator and a Copy button, I verified length bounds..."**  
   $\rightarrow$ Aapka verified PR #3 kaam: test cases `docs/password-generator-tests.md` mein record kiye aur PR #3 (`7ef9eeb`) merge karwaya.

---

## C. What Screen or Code File to Display While Speaking

- **Live Browser:** **`http://localhost:3000/generator`** (Slider move karna, checkboxes toggle karna, `Generate New Password` click karna, `Copy` dabana).
- **VS Code:** `src/app/generator/page.tsx` lines 33–125 (`generatePassword` aur `getStrength`).

---

## D. Actual Functions / Components You Should Explain

1. **`CHAR_SETS` & `AMBIGUOUS_CHARS_REGEX` (`src/app/generator/page.tsx` lines 13–20):** 4 fixed strings: `uppercase` (26), `lowercase` (26), `numbers` (10), `special` (26), aur regex `/[0O1lI]/g` ambiguous letters hatane ke liye.
2. **`generatePassword()` (lines 36–105):**
   - `filterAmbiguous()` agar `excludeAmbiguous` on ho toh `0, O, 1, l, I` hata deta hai.
   - Selected sets ko ek `pool` string mein jodta hai.
   - Check karta hai `pool.length === 0` ya `length < 4 || length > 128`.
   - `new Uint32Array(length)` banakar `crypto.getRandomValues(array)` call karta hai.
   - Phir second loop `usedPositions` Set se sure karta hai ki har ticked active set ka kam se kam 1 character include ho.
3. **`getStrength()` (lines 109–125):** 7 conditions check karta hai (`>=10`, `>=14`, `>=18`, A-Z, a-z, 0-9, symbol) aur `Weak`, `Fair`, `Good`, ya `Strong` return karta hai.
4. **`copyToClipboard()` (lines 94–103):** `navigator.clipboard.writeText(password)` call karke 2 second ke liye button text `"Copied"` dikhata hai (`setTimeout(..., 2000)`).

---

## E. Five Simple Technical Concepts You Must Know

1. **`crypto.getRandomValues()` (CSPRNG):** OS/hardware entropy se true unpredictable random integers generate karna.
2. **`Uint32Array`:** 32-bit positive whole numbers ki array jo Web Crypto ke liye buffer ka kaam karti hai.
3. **Guaranteed Set Inclusion:** Sirf random pick karne par kabhi-kabhi chhote password mein koi category miss ho sakti hai — isliye code alag se har selected category ka 1 character place karta hai.
4. **Edge-Case Validation:** Agar saare 4 checkboxes untick kar dein toh crash hone ke bajaye `"Please select at least one character type."` error dikhta hai.
5. **Clipboard API (`navigator.clipboard`):** Browser ka built-in permission-safe tarika text copy karne ka (try-catch error handling ke saath).

---

## F. Ten Likely Examiner Questions & Short Accurate Answers

1. **Q: Why can't you just use `Math.random()` in JavaScript?**  
   **A:** `Math.random()` uses a non-cryptographic pseudo-random generator; its outputs can be predicted if the internal state is analyzed, whereas `crypto.getRandomValues()` uses OS cryptographic entropy.
2. **Q: What is the minimum and maximum password length allowed?**  
   **A:** Minimum 4 characters and maximum 128 characters (`min={4} max={128}`), with default length 16.
3. **Q: What happens if a user unchecks all four character options and clicks Generate?**  
   **A:** `pool.length === 0` triggers an error check, clears the password display, and shows `"Please select at least one character type."`
4. **Q: Suppose I select length 4 and keep all 4 checkboxes checked. Can any character type be missing?**  
   **A:** No, lines 63–88 ensure at least one character from each of the 4 selected sets is placed at unique random positions using `usedPositions`.
5. **Q: Does your generator calculate Shannon entropy in bits?**  
   **A:** No Sir, right now `getStrength()` uses a 7-point heuristic based on length thresholds (`10, 14, 18`) and character types (uppercase, lowercase, digits, symbols) to show Weak, Fair, Good, or Strong.
6. **Q: Does the generator save generated passwords anywhere?**  
   **A:** No, the generated password only exists in React `password` state in browser memory unless the user copies it.
7. **Q: What is `copyToClipboard()` doing if clipboard access fails?**  
   **A:** It wraps `navigator.clipboard.writeText` in `try/catch` and sets the error `"Unable to copy to clipboard."`
8. **Q: What happens when `/generator` first loads in the browser?**  
   **A:** `src/app/generator/page.tsx` dynamically loads `PasswordGeneratorClient.tsx` with `{ ssr: false }`. On client initialization, `useState` immediately calls `createCryptographicPassword()` using `window.crypto.getRandomValues()`, so a fresh random password appears without any hydration mismatch.
9. **Q: How does `useCallback` help `generatePassword`?**  
   **A:** It memoizes the click handler so it regenerates passwords cleanly whenever `length` or `options` changes.
10. **Q: Can an unauthenticated user open `/generator`?**  
    **A:** Yes, `/generator` is accessible publicly from the landing page without login, and also linked from inside `/dashboard`.

---

## G. Five Difficult Follow-Up Questions

1. **Q: Look at `createCryptographicPassword` (`pool[array[i] % pool.length]`). Isn't modulo (`%`) theoretically biased when $2^{32}$ is not divisible by `pool.length`?**  
   **A:** Technically yes, there is tiny modulo bias (~$2.0 \times 10^{-8}$ for an 88-char pool), which is negligible for a prototype; in hardened code, rejection sampling fixes even that tiny bias.
2. **Q: Why did you split `PasswordGeneratorClient.tsx` using `next/dynamic` with `ssr: false` instead of running `crypto.getRandomValues()` inside SSR or `useEffect`?**  
   **A:** Running randomness during Next.js SSR produces different text on server vs client (hydration error), while calling `setState` directly inside `useEffect` triggers React 19's `set-state-in-effect` rule. Using `ssr: false` runs `useState(() => createCryptographicPassword(...))` cleanly on client initialization.
3. **Q: Why reuse `createCryptographicPassword()` for both initial state and button click?**  
   **A:** Keeping one shared pure generator function prevents duplicated logic between initial mount and user-triggered regeneration.
4. **Q: Notice lines 76–80 pick `pos` and increment `(pos + 1) % length` if taken. Does linear probing bias positions?**  
   **A:** Slightly when collisions occur on very short passwords like length 4; shuffling the required characters (Fisher-Yates) would make placement completely uniform.
5. **Q: Does clicking a checkbox immediately generate a new password?**  
   **A:** No, toggling checkboxes updates `options` state, and the password updates when the user clicks `"Generate New Password"`.

---

## H. Common Mistakes to Avoid

- **Do NOT** claim your test doc (`docs/password-generator-tests.md`) comes from a Jest/Vitest automated test file inside the repo (no test runner script exists in `package.json`), and note that line 139 in that doc says "Dark Mode" by mistake even though `globals.css` uses the minimal light theme.
- **Do NOT** claim `/generator` uses `E = L * log2(N)` Shannon entropy math — the actual code (`getStrength()`) checks 7 boolean conditions!
- **Do NOT** claim passwords automatically save into the vault when generated.

---

## I. Honest Explanation of Ayushmaan's Verified Contributions

- **Verified Git Evidence:** **2 commits authored by Ayushmaan Gupta** on `feature/ayushmaan-generator`, merged into `main` via **Pull Request #3 (`7ef9eeb`)**:
  1. `c03aaf6`: `feat: add ambiguous characters exclusion to password generator` (`src/app/generator/page.tsx`, adding `AMBIGUOUS_CHARS_REGEX`, `excludeAmbiguous` filtering on both `pool` and `required`, and the UI checkbox).
  2. `f8c363e`: `test: record comprehensive test results for password generator module` (`docs/password-generator-tests.md`, +151 lines).
- **How to answer honestly:** *"Anukalp integrated the base generator UI, and then I branched `feature/ayushmaan-generator`, added the `excludeAmbiguous` filter using AI assistance, verified boundary/edge cases in the app, documented results in `docs/password-generator-tests.md`, and submitted Pull Request #3."*

---

## J. What to Say If a Feature Is Partially Implemented

- *"The CSPRNG password generator, ambiguous character exclusion, and client-initialized cryptographic startup are fully working. Future enhancements include temporary session history or excluding custom characters."*
