# GitHub Desktop Guide — SecurePass Team

## GitHub Desktop Kya Hai?

GitHub Desktop ek app hai jo Git ko easy banata hai. Terminal commands yaad nahi hain? No problem — sab kuch buttons se hoga.

## Step 1: Download aur Install

1. [desktop.github.com](https://desktop.github.com) pe jao.
2. Download karo aur install karo.
3. Open karo aur "Sign in to GitHub.com" pe click karo.
4. Browser mein login karo — app automatically connect ho jayega.

## Step 2: Repository Clone Karo

1. GitHub Desktop mein **File → Clone Repository** pe click karo.
2. **URL** tab pe click karo.
3. Yeh URL paste karo:
   ```
   https://github.com/ask8962/securepass-password-manager
   ```
4. Location choose karo (Desktop recommend hai).
5. **Clone** pe click karo.
6. Wait karo — project download ho jayega.

## Step 3: Branch Banao

1. Top mein "Current Branch" pe click karo.
2. **New Branch** pe click karo.
3. Branch ka naam dalo — tumhare task ke according:
   - Nishant: `feature/landing-page`
   - Dileep: `feature/firebase-auth`
   - Ayushmaan: `feature/password-generator`
   - Utpal: `docs/testing-and-reports`
4. **Create Branch** pe click karo.

## Step 4: Files Edit Karo

1. **"Open in Visual Studio Code"** ya koi bhi editor mein kholo.
   - GitHub Desktop mein: **Repository → Open in Visual Studio Code**
2. Apne assigned files mein changes karo.
3. Save karo (Ctrl + S).

## Step 5: Changes Commit Karo

1. GitHub Desktop mein wapas aao.
2. Left side mein changed files dikhenge (green = new, yellow = modified).
3. Neeche "Summary" mein commit message likho:
   - Example: `feat: updated landing page hero section`
4. **Commit to [branch-name]** pe click karo.

## Step 6: Push Karo

1. Top mein **Push origin** button dikhega.
2. Click karo — changes GitHub pe upload ho jayenge.

## Step 7: Pull Request Banao

1. GitHub Desktop mein **Branch → Create Pull Request** pe click karo.
2. Browser khulega GitHub pe.
3. Description mein likho ki tumne kya kiya.
4. **Create pull request** pe click karo.
5. Anukalp ko batao — woh review aur merge karega.

## Screenshots Kaise Lein

1. Project run karo: terminal mein `npm run dev`
2. Browser mein [http://localhost:3000](http://localhost:3000) kholo.
3. Jo page test karna hai woh kholo.
4. **Win + Shift + S** (Windows) se screenshot lo.
5. Screenshot save karo aur PR mein attach karo.

## Tips

- **Har din** ek baar **"Fetch origin"** pe click karo (top button) — latest changes aayenge.
- **Chhote commits karo** — ek saath bahut saare changes mat karo.
- **Commit message meaningful rakho** — `fix: button color changed` ✅, `update` ❌
- **Confused ho?** Anukalp se poochho ya docs padho.

## Common Buttons Explained

| Button | Kaam |
|--------|------|
| **Fetch origin** | GitHub se check karo ki koi naya change hai kya |
| **Pull origin** | Naye changes download karo |
| **Push origin** | Apne changes upload karo |
| **Current Branch** | Branch switch karo ya nayi banao |
| **Commit** | Changes save karo with message |
