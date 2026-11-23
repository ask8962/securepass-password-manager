# GitHub Beginners Guide — SecurePass Team

## Yeh Guide Kiske Liye Hai?

Yeh guide un team members ke liye hai jinhe Git aur GitHub ke baare mein zyada knowledge nahi hai. Simple Hinglish mein likha gaya hai taaki samajhna aasan ho.

## GitHub Kya Hai?

GitHub ek online platform hai jahaan hum apna code store karte hain. Isko samjho ek "Google Drive for Code" ki tarah — lekin ismein yeh extra features hain:

- **Version History:** Har change ka record rehta hai. Agar kuch galat ho jaye toh purana code wapas la sakte ho.
- **Collaboration:** Poori team ek saath kaam kar sakti hai bina ek dusre ka code overwrite kiye.
- **Branches:** Har member apne alag "copy" mein kaam karta hai, phir merge karta hai.

## Important Terms (Simple Language Mein)

| Term | Matlab |
|------|--------|
| **Repository (Repo)** | Poora project folder jo GitHub pe stored hai |
| **Clone** | GitHub se project apne computer pe copy karna |
| **Branch** | Project ki ek alag copy jahaan tum apna kaam karte ho |
| **Commit** | Apne changes ko save karna (with a message) |
| **Push** | Apne saved changes ko GitHub pe upload karna |
| **Pull** | GitHub se latest changes apne computer pe download karna |
| **Pull Request (PR)** | Apne changes ko main project mein merge karne ki request |
| **Merge** | Do branches ke code ko combine karna |
| **Main branch** | Project ka official stable code |

## Step-by-Step: Pehli Baar Setup

### Step 1: GitHub Account Banao
1. [github.com](https://github.com) pe jao.
2. "Sign up" pe click karo.
3. Apna email, password, aur username dalo.
4. Email verify karo.

### Step 2: Repository Access Lo
1. Anukalp ko apna GitHub username bhejo.
2. Woh tumhe repository mein collaborator add karega.
3. Tumhare email pe invitation aayega — accept karo.

### Step 3: Git Install Karo (Computer Pe)
1. [git-scm.com](https://git-scm.com) se download karo.
2. Install karo (sab default settings rakhna).
3. Terminal (Command Prompt) kholo aur type karo:
```bash
git config --global user.name "TUMHARA NAAM"
git config --global user.email "TUMHARA_EMAIL@gmail.com"
```
⚠️ **Apna asli naam aur email dalo** — yeh tumhare commits pe dikhega.

### Step 4: Project Clone Karo
```bash
cd Desktop
git clone https://github.com/ask8962/securepass-password-manager.git
cd securepass-password-manager
```
Ab project tumhare Desktop pe aa gaya.

### Step 5: Dependencies Install Karo
```bash
npm install
```

### Step 6: Project Run Karo
```bash
npm run dev
```
Browser mein [http://localhost:3000](http://localhost:3000) kholo — project dikh jayega!

## Branch Pe Kaam Kaise Karna Hai

### 1. Apni Branch Banao
```bash
git checkout -b feature/tumhara-task-name
```
Example: `git checkout -b feature/landing-page`

### 2. Changes Karo
Apne assigned files mein changes karo.

### 3. Changes Save (Commit) Karo
```bash
git add .
git status
git commit -m "feat: landing page content updated"
```

### 4. GitHub Pe Upload (Push) Karo
```bash
git push origin feature/tumhara-task-name
```

### 5. Pull Request Banao
1. GitHub pe repository kholo.
2. "Compare & pull request" button dikhega — click karo.
3. Description likhho ki kya change kiya.
4. "Create pull request" pe click karo.
5. Anukalp review karke merge karega.

## Common Problems

### "Permission denied" error
- Check karo ki tum collaborator add ho.
- GitHub pe login karo browser mein.

### "Merge conflict"
- Matlab do logon ne same file edit ki hai.
- Anukalp se help lo — woh resolve karega.

### "npm install" fail ho raha hai
- Node.js install hai? `node --version` check karo.
- Nahi hai toh [nodejs.org](https://nodejs.org) se install karo.

## ⚠️ Important Rules

1. **Main branch pe directly push mat karo.** Hamesha apni branch se PR banao.
2. **Dusre ke files mat change karo** bina poochhe.
3. **Apna kaam samjho** — supervisor ke saamne explain karna padega.
4. **Password ya secrets commit mat karo** — `.env` files kabhi push mat karo.
5. **Fake commits mat banao** — genuine kaam karo.
