# SecurePass — Viva & Project Evaluation Q&A Guide

**Project:** SecurePass – A Secure Password Manager with Two-Factor Authentication  
**Group:** G195 | GLA University, Mathura  
**Milestone:** 25% Major Project Evaluation  
**Audience:** B.Tech CSE Final Year Students & Examiners  

This guide contains the most critical viva questions examiners ask during major project reviews, along with professional English answers and simple Hinglish explanations to help every team member explain with confidence.

---

## SECTION 1: AUTHENTICATION & SESSION MANAGEMENT (5 Questions)

### Q1. Why did you choose Firebase Authentication instead of storing plain passwords in your own custom database?
- **English Answer:**  
  *"We chose Firebase Authentication because it adheres to industry security standards out-of-the-box. Managing authentication credentials manually in a custom database introduces significant security risks like insecure password hashing, SQL/NoSQL injection, and credential stuffing. Firebase handles secure credential storage, salting, brute-force throttling, and token management automatically, allowing us to focus on client-side zero-knowledge encryption."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *Agar hum khud apna table banate aur usme password store karte, toh hume manually bcrypt hashing, salt, session tokens aur brute-force attack prevention likhna padta. Ek choti si galti se database hack ho sakta tha. Firebase Google ka fully managed, secure system hai jo email-password ko securely verify karta hai bina security risks ke.*
- **Key Keywords:** `Managed Auth`, `Credential Protection`, `Brute-force Throttling`, `Security Best Practices`.

---

### Q2. How does session persistence work in your application?
- **English Answer:**  
  *"Session persistence is managed through the Firebase JavaScript SDK using the `onAuthStateChanged` observer. When a user logs in, Firebase stores a signed token securely in the browser's local storage. On every page reload or route transition, the observer checks token validity and hydrates our React `AuthContext`, preserving the active session without requiring re-login."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *Jab user login karta hai, Firebase browser me ek encrypted token save karta hai. Jab bhi user page refresh (F5) karta hai, hamara `AuthContext` Firebase se poochta hai ki kya yeh user already logged-in hai? Agar token valid hai, user login hi rehta hai aur dashboard khula rehta hai.*
- **Key Keywords:** `onAuthStateChanged`, `AuthContext`, `Token Persistence`, `State Hydration`.

---

### Q3. How do you protect private routes like the Dashboard from unauthorized users?
- **English Answer:**  
  *"We implement route guarding in the client-side Next.js App Router using React hooks in our `AuthContext`. On the `/dashboard` page, an effect monitors the `user` and `loading` states. If `loading` completes and no authenticated `user` object exists, the application immediately redirects the visitor to `/login` using Next.js `useRouter`."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *Dashboard page par hum check karte hain ki `user` logged in hai ya nahi. Agar koi direct URL bar me `localhost:3000/dashboard` type karega bina login kiye, toh code turant usse redirect karke `/login` par bhej dega.*
- **Key Keywords:** `Route Guard`, `Client-Side Redirection`, `Protected Route`, `Access Control`.

---

### Q4. What happens if a user enters an existing email during registration?
- **English Answer:**  
  *"Firebase Authentication rejects the request with the error code `auth/email-already-in-use`. Our application catches this exception and presents a clear, user-friendly error message on the registration UI, preventing duplicate accounts while preserving user privacy."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *Firebase direct error throw karta hai `auth/email-already-in-use`. Hamara code us error ko catch karta hai aur screen par clean message dikhata hai ki 'An account with this email already exists'.*
- **Key Keywords:** `Error Handling`, `Granular Error Codes`, `Validation`.

---

### Q5. What is the difference between Firebase Authentication and the Zero-Knowledge Vault in your project?
- **English Answer:**  
  *"Firebase Authentication is strictly used for **User Identity Verification** (knowing WHO the user is). However, Firebase never knows the user's **Master Passphrase** or plaintext vault passwords. Vault encryption is executed entirely on the client side using the Web Crypto API. Thus, even if Firebase servers were compromised, an attacker would have zero access to the user's decrypted passwords."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *Firebase sirf identity card check karta hai ki user kon hai (Email & Login Password). Lekin vault ke andar jo passwords hain, unka master passphrase Firebase ke paas kabhi nahi jaata. Vault ka encryption browser me hi hota hai. Isko bolte hain Zero-Knowledge architecture.*
- **Key Keywords:** `Zero-Knowledge`, `Separation of Concerns`, `Identity vs Data Confidentiality`.

---

## SECTION 2: PASSWORD GENERATOR & RANDOMNESS (5 Questions)

### Q6. Why can't we use JavaScript's standard `Math.random()` for password generation?
- **English Answer:**  
  *"`Math.random()` is a Pseudo-Random Number Generator (PRNG) typically implemented using algorithms like xorshift128+. It is deterministic and designed for performance or simulations, not cryptography. Given a small sequence of previous outputs, an attacker can determine the internal seed state and predict all past and future generated passwords. Therefore, it is strictly forbidden for security-sensitive applications."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *`Math.random()` pseudo-random hota hai — matlab woh mathematics ke formula se banta hai. Agar kisi hacker ko kuch sample numbers mil jaayein, toh woh aage ke saare numbers mathematically predict kar sakta hai. Isliye cryptographic security me `Math.random()` use karna dangerous hai.*
- **Key Keywords:** `PRNG`, `Deterministic State`, `Predictability`, `Seed Reconstruction`.

---

### Q7. What randomness source does SecurePass use, and why is it secure?
- **English Answer:**  
  *"SecurePass uses the W3C standard `window.crypto.getRandomValues()`. This is a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) directly interfaced with the underlying operating system's hardware entropy pool (such as `/dev/urandom` on Unix or Windows CryptGenRandom/CNG). It produces cryptographically strong, non-deterministic random bytes that cannot be predicted."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *Hum browser ka native `window.crypto.getRandomValues()` use karte hain. Yeh operating system ke hardware entropy (mouse movements, CPU timing, hardware noise) se random numbers banata hai, jisse koi bhi algorithm ya computer predict nahi kar sakta.*
- **Key Keywords:** `CSPRNG`, `Web Crypto API`, `Hardware Entropy`, `Non-deterministic`.

---

### Q8. How do you evaluate the strength of a generated password?
- **English Answer:**  
  *"In our generator (`getStrength` inside `PasswordGeneratorClient.tsx`), password strength is evaluated using a 7-rule scoring system checking length thresholds (`>= 10`, `>= 14`, `>= 18` characters) and character-class diversity (uppercase, lowercase, numbers, symbols). Depending on the score (0–7), it displays `Weak`, `Fair`, `Good`, or `Strong`."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *Strength meter 7 simple conditions check karta hai: length 10/14/18 se zyada hai ya nahi, aur uppercase, lowercase, digit, symbol shamil hain ya nahi. Us score ke base par Weak, Fair, Good, ya Strong bar dikhta hai.*
- **Key Keywords:** `Rule-Based Scoring`, `Character Variety`, `Password Length`.

---

### Q9. How do you ensure the generator selects characters uniformly without bias?
- **English Answer:**  
  *"We generate 32-bit unsigned random integers (`Uint32Array`) using `window.crypto.getRandomValues()` and map them onto our active character pool (`pool[array[i] % pool.length]`). Because `Uint32Array` values span 0 to $2^{32}-1$ while the pool has at most 88 characters, modulo bias is negligible (~$0.000002\%$). We also insert at least one character from each enabled set at unique random positions."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *Hum `Uint32Array` se bade 32-bit random numbers nikaal kar active character sets mein map karte hain aur ensure karte hain ki har selected set ka kam se kam 1 letter zaroor aaye.*
- **Key Keywords:** `Uint32Array`, `CSPRNG`, `Guaranteed Class Inclusion`.

---

### Q10. What customization features are available in the SecurePass generator?
- **English Answer:**  
  *"Users can adjust password lengths from 4 to 128 characters, independently toggle Uppercase, Lowercase, Numbers, and Special Symbols, and toggle `Exclude ambiguous characters` to omit `0, O, 1, l, I`. It also includes a strength meter and one-click clipboard copy."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *User slider se 4 se 128 characters select kar sakta hai, 4 character checkboxes on/off kar sakta hai, aur ambiguous letters (`0, O, 1, l, I`) bhi hata sakta hai. Copy button clipboard mein copy karke `Copied` feedback deta hai.*
- **Key Keywords:** `Configurable Length`, `Ambiguous Character Exclusion`, `Clipboard API`.

---

## SECTION 3: CLIENT-SIDE CRYPTOGRAPHY & WEB CRYPTO (5 Questions)

### Q11. What algorithm is used to derive the encryption key from the user's Master Passphrase?
- **English Answer:**  
  *"We use **PBKDF2** (Password-Based Key Derivation Function 2) with **HMAC-SHA-256** and **100,000 iterations**, adhering to OWASP guidelines. We pass a cryptographically random **128-bit (16-byte) salt** generated via `crypto.getRandomValues()`. This slow key derivation function prevents offline dictionary attacks and makes brute-force attacks on GPUs computationally prohibitive."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *Hum **PBKDF2-SHA-256** use karte hain **100,000 rounds** ke saath. Jab user apna Master Passphrase daalta hai, PBKDF2 usse 100,000 baar hash karke 256-bit encryption key banata hai. Saath me 128-bit random salt lagata hai taaki Rainbow Table attack fail ho jaaye.*
- **Key Keywords:** `PBKDF2`, `100,000 Iterations`, `128-bit Salt`, `GPU Brute-force Mitigation`.

---

### Q12. Why did you choose AES-256 in GCM mode rather than CBC or ECB mode?
- **English Answer:**  
  *"We chose **AES-256-GCM** (Galois/Counter Mode) because it is an **Authenticated Encryption with Associated Data (AEAD)** cipher. Unlike older modes like CBC or ECB:
  1. ECB leaks plaintext patterns because identical blocks yield identical ciphertexts.
  2. CBC is vulnerable to padding oracle attacks and provides confidentiality only, requiring a separate HMAC for integrity.
  3. GCM provides both **confidentiality** AND **data authenticity/integrity** simultaneously using a built-in 128-bit authentication tag."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *ECB aur CBC purane modes hain jo vulnerable hain. Humne **AES-256-GCM** isliye chuna kyunki GCM **Authenticated Encryption** deta hai. Yeh data ko encrypt karne ke saath-saath ek 128-bit ka security tag (auth tag) banata hai jo check karta hai ki data tamper toh nahi hua.*
- **Key Keywords:** `AEAD`, `AES-256-GCM`, `Integrity`, `Authentication Tag`, `Padding Oracle Prevention`.

---

### Q13. What is an IV (Initialization Vector) and why must it be random and unique for every encryption?
- **English Answer:**  
  *"In AES-GCM, the IV is a 96-bit (12-byte) nonce. It ensures that encrypting the same plaintext twice with the same key produces completely different, indistinguishable ciphertexts. Reusing an IV with the same key in GCM destroys both confidentiality and integrity by allowing attackers to recover the authentication hash key. Therefore, we generate a fresh, random 96-bit IV via `crypto.getRandomValues()` for every single encryption operation."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *IV ka matlab Initialization Vector hota hai (96 bits). Agar aap ek hi password ko do baar encrypt karoge, toh IV alag hone ki wajah se dono baar ciphertext bilkul alag aayega. GCM me IV repeat karna strict mana hai, isliye hum har encryption me fresh random IV generate karte hain.*
- **Key Keywords:** `Initialization Vector (IV)`, `96-bit Nonce`, `Ciphertext Uniqueness`, `Two-Time Pad Prevention`.

---

### Q14. What happens if someone tries to decrypt with the wrong Master Passphrase or tampers with the ciphertext?
- **English Answer:**  
  *"In AES-GCM, decryption automatically verifies the 128-bit authentication tag before releasing any plaintext. If the wrong passphrase is provided, an incorrect key is derived, causing the calculated authentication tag to mismatch the stored tag. The Web Crypto API immediately aborts and throws an `OperationError`. No partial or garbled plaintext is ever exposed."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *Agar koi galat Master Passphrase daalega ya ciphertext ke kisi ek single bit ko bhi change karega, toh AES-GCM ka authentication tag mismatch ho jayega. Web Crypto API turant error fek degi aur koi bhi decrypted password screen par show nahi hoga.*
- **Key Keywords:** `Authentication Tag Validation`, `Tamper Detection`, `OperationError`, `Fail-Safe Decryption`.

---

### Q15. Where are the plaintext passwords and keys stored in this prototype?
- **English Answer:**  
  *"In this 20–25% milestone prototype, plaintext passwords and derived keys exist **strictly in ephemeral browser memory** during the active component lifecycle. They are never written to `localStorage`, `sessionStorage`, cookies, or remote servers. When the page is refreshed or navigated away, sensitive memory is automatically garbage collected."*
- **Concept Samajhne Ke Liye (Hinglish):**  
  *Is 25% prototype me passwords sirf browser ke temporary RAM memory me rehte hain. Hum unhe disk par ya localStorage me save nahi karte. Jaise hi user page band ya refresh karta hai, data memory se gayab ho jaata hai. Aage chalkar Milestone 2 me hum sirf encrypted ciphertext ko database me store karenge.*
- **Key Keywords:** `Ephemeral Memory`, `Zero Persistence of Plaintext`, `Garbage Collection`, `No Storage Leakage`.
