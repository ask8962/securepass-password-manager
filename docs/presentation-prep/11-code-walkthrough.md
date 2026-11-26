# 11 — Technical Code Walkthrough for Beginners

**Goal:** Boilerplate CSS ya lambi HTML lines ko chhod kar, poore codebase ke **14 sabse important functions aur components** ko short real code snippets ke saath zero-tension samajhna!

---

## Architecture Map (Kaunsi File Kisse Judti Hai)

```
src/app/layout.tsx  (Root Wrapper -> wraps everything in AuthProvider)
   │
   ├── src/context/AuthContext.tsx  <──  src/lib/firebase.ts (.env.local)
   │        │
   │        ├── src/app/login/page.tsx      (signInWithEmailAndPassword)
   │        ├── src/app/register/page.tsx   (createUserWithEmailAndPassword)
   │        └── src/app/dashboard/page.tsx  (Route Guard + Logout + Demo)
   │                                              │
   │                                              ▼
   │                                     src/lib/crypto.ts (AES-256-GCM + PBKDF2)
   │
   ├── src/app/page.tsx  ──> Header.tsx, Footer.tsx (Landing UI)
   └── src/app/generator/page.tsx  (crypto.getRandomValues Password Generator)
```

---

## 1. `RootLayout` (`src/app/layout.tsx`)
- **Why it exists:** Next.js mein har page isi ke andar load hota hai. Ismein `<AuthProvider>` lagane se poori website par user ka login status share hota hai.
- **Actual Code Excerpt:**
```tsx
export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>{props.children}</AuthProvider>
      </body>
    </html>
  );
}
```
- **Input / Output:** `props.children` (koi bhi page jaise `/login` ya `/dashboard`) leta hai aur global theme + `AuthProvider` context ke saath render karta hai.

---

## 2. `isFirebaseConfigured()` & Singleton Init (`src/lib/firebase.ts`)
- **Why it exists:** `.env.local` se Firebase keys padh kar ek hi baar Firebase start karta hai. Keys missing hon toh crash hone se bachata hai.
- **Actual Code Excerpt:**
```ts
export function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  );
}

if (typeof window !== "undefined" && isFirebaseConfigured()) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) { ... }
}
```
- **Input / Output:** Environment variables padh kar `boolean` deta hai aur browser side par single `app` aur `auth` object export karta hai.

---

## 3. `AuthProvider` (`src/context/AuthContext.tsx`)
- **Why it exists:** Poori app ka login brain. Refresh karne par bhi Firebase se puchhta hai "kya user logged in hai?" aur `logout()` function deta hai.
- **Actual Code Excerpt:**
```tsx
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    if (auth) {
      await fbSignOut(auth);
      setUser(null);
    }
  };
```
- **Input / Output:** Firebase `auth` listener lagata hai; output mein `{ user, loading, isConfigured, logout }` har component (`useAuth()`) ko deta hai.

---

## 4. `Header` Mobile Toggle (`src/components/Header.tsx`)
- **Why it exists:** Landing page `/` ke top navbar aur mobile drawer menu ko handle karta hai.
- **Actual Code Excerpt:**
```tsx
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
```
- **Simple Explanation:** Desktop par links seedhe dikhte hain (`hidden md:flex`). Mobile par button dabane se `mobileMenuOpen` true hota hai aur links neeche open ho jaate hain.

---

## 5. `HomePage` Feature Card #3 (`src/app/page.tsx`)
- **Why it exists:** Main landing page par 3 core features dikhata hai. Nishant ka PR #2 badge change yahin par hai.
- **Actual Code Excerpt:**
```tsx
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted-light text-foreground">
                    <KeyRound className="h-5 w-5 text-accent" />
                  </div>
                  <span className="rounded-full bg-muted-light px-2.5 py-0.5 text-[11px] font-medium text-muted">
                    Available
                  </span>
                </div>
```
- **Connects To:** Card 1 & 2 `"Coming Soon"` dikhate hain (Vault, 2FA), aur Card 3 `<Link href="/generator">` par bhejta hai.

---

## 6. Login Submit Handler (`src/app/login/page.tsx`)
- **Why it exists:** Form validation check karke Firebase se real user login karwata hai aur user-friendly errors dikhata hai.
- **Actual Code Excerpt:**
```tsx
    if (!isFirebaseConfigured() || !auth) {
      setAuthError("Firebase is not configured yet...");
      return;
    }
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.push("/dashboard");
    } catch (err: unknown) {
      // auth/invalid-credential, auth/too-many-requests, etc.
```
- **Input / Output:** Email (`string`) + Password (`min >= 6`) $\rightarrow$ Firebase token & `/dashboard` redirect, ya readable error message.

---

## 7. Register Submit Handler (`src/app/register/page.tsx`)
- **Why it exists:** Naya user account banata hai.
- **Actual Code Excerpt:**
```tsx
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    ...
    await createUserWithEmailAndPassword(auth, email.trim(), password);
    router.push("/dashboard");
```
- **Honest Detail:** Form mein `name` aur `confirmPassword` validate hote hain, lekin Firebase ko sirf `email.trim()` aur `password` bheja jaata hai (profile name abhi save nahi hota).

---

## 8. `generatePassword()` (`src/app/generator/page.tsx`)
- **Why it exists:** Predictable `Math.random()` ke bina cryptographic random password banata hai.
- **Actual Code Excerpt:**
```tsx
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    let result = "";
    for (let i = 0; i < length; i++) {
      result += pool[array[i] % pool.length];
    }
```
- **Input / Output:** `length` (4–128) + `options` (upper/lower/numbers/special + `excludeAmbiguous` filtering `[0O1lI]`) $\rightarrow$ random string (aur doosre loop mein guarantee karta hai ki har active category ka kam se kam 1 letter zaroor ho).

---

## 9. `getStrength()` (`src/app/generator/page.tsx`)
- **Why it exists:** Generated password ko dekh kar progress bar aur label (`Weak`, `Fair`, `Good`, `Strong`) dikhata hai.
- **Actual Code Excerpt:**
```tsx
    let score = 0;
    if (password.length >= 10) score++;
    if (password.length >= 14) score++;
    if (password.length >= 18) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
```
- **Crucial Viva Note:** Yeh 7 simple rules check karta hai (max score 7) — Shannon entropy log math formula use **nahi** karta!

---

## 10. `CRYPTO_CONFIG` & `deriveKeyFromPassphrase()` (`src/lib/crypto.ts`)
- **Why it exists:** User ke text Master Passphrase ko 256-bit AES cryptographic key mein badalta hai.
- **Actual Code Excerpt:**
```ts
export const CRYPTO_CONFIG = {
  ALGORITHM: "AES-GCM",
  KEY_LENGTH: 256,
  IV_LENGTH_BYTES: 12,
  SALT_LENGTH_BYTES: 16,
  PBKDF2_ITERATIONS: 100000,
  HASH: "SHA-256",
};
```
- **Simple Explanation:** `importKey("raw", ...)` se passphrase load hota hai aur `deriveKey(...)` usse 1,00,000 baar SHA-256 salt ke saath ghumakar non-extractable (`false`) `CryptoKey` banata hai.

---

## 11. `encryptPassword()` (`src/lib/crypto.ts`)
- **Why it exists:** Plaintext password ko AES-256-GCM se encrypt karta hai.
- **Actual Code Excerpt:**
```ts
  const salt = new Uint8Array(CRYPTO_CONFIG.SALT_LENGTH_BYTES);
  const iv = new Uint8Array(CRYPTO_CONFIG.IV_LENGTH_BYTES);
  window.crypto.getRandomValues(salt);
  window.crypto.getRandomValues(iv);

  const cryptoKey = await deriveKeyFromPassphrase(passphrase, salt as unknown as BufferSource);
  const ciphertextBuffer = await window.crypto.subtle.encrypt(
    { name: CRYPTO_CONFIG.ALGORITHM, iv: iv as unknown as BufferSource },
    cryptoKey,
    plaintextBytes
  );
```
- **Input / Output:** `plaintext` + `passphrase` $\rightarrow$ `{ ciphertext, iv, salt, timestamp }` (teeno Base64 strings). Ciphertext ke end mein 128-bit Auth Tag automatically Web Crypto jod deta hai.

---

## 12. `decryptPassword()` (`src/lib/crypto.ts`)
- **Why it exists:** Ciphertext ko wapas plaintext mein badalta hai — aur galat key par error throw karta hai.
- **Actual Code Excerpt:**
```ts
    const cryptoKey = await deriveKeyFromPassphrase(passphrase, salt as unknown as BufferSource);
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: CRYPTO_CONFIG.ALGORITHM, iv: iv as unknown as BufferSource },
      cryptoKey,
      ciphertext as unknown as BufferSource
    );
    return decoder.decode(decryptedBuffer);
```
- **Simple Explanation:** Base64 ko wapas bytes bana kar key derive karta hai. Agar passphrase galat hai ya ciphertext badla gaya, toh Web Crypto `OperationError` fekta hai aur `catch` block readable error message deta hai.

---

## 13. Dashboard Route Guard & Logout (`src/app/dashboard/page.tsx`)
- **Why it exists:** Bina login kiye `/dashboard` open karne walon ko rokta hai aur user ko safely log out karta hai.
- **Actual Code Excerpt:**
```tsx
  useEffect(() => {
    if (!loading && isConfigured && !user) {
      router.replace("/login");
    }
  }, [user, loading, isConfigured, router]);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }
```
- **Connects To:** `useAuth()` hook from `AuthContext.tsx`.

---

## 14. Dashboard `handleEncrypt()` & `handleDecrypt()` (`src/app/dashboard/page.tsx`)
- **Why it exists:** Screen ke forms ko `src/lib/crypto.ts` ke functions se jodta hai aur React RAM mein result dikhata hai.
- **Actual Code Excerpt:**
```tsx
  async function handleEncrypt(e: React.FormEvent) {
    e.preventDefault();
    ...
    const payload = await encryptPassword(samplePassword, encryptPassphrase);
    setEncryptedRecord(payload);
    setDecryptPassphrase(""); // User ko decrypt pass khud type karna padega
  }
```
- **Honest Detail:** Notice `website` aur `username` fields UI par hain, par `encryptPassword()` ko sirf `samplePassword` aur `encryptPassphrase` bheja jaata hai.
