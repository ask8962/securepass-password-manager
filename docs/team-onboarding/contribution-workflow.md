# Contribution Workflow — SecurePass Team

## Overview

Yeh document batata hai ki team mein kaise kaam karna hai — kaise branch banani hai, kaise commit karna hai, aur kaise pull request banana hai.

## Workflow Diagram

```
main (stable code)
  │
  ├── feature/landing-page       ← Nishant
  ├── feature/firebase-auth       ← Dileep
  ├── feature/password-generator  ← Ayushmaan
  ├── docs/testing-and-reports    ← Utpal
  │
  └── Anukalp reviews → merges → main
```

## Step-by-Step Workflow

### 1. Apni Branch Pe Jao

GitHub Desktop:
- Current Branch → apni branch select karo.

Terminal:
```bash
git checkout feature/tumhari-branch
```

### 2. Latest Code Pull Karo

Pehle hamesha latest code lo:
```bash
git pull origin main
```

### 3. Assigned Files Pe Kaam Karo

**Important:** Sirf apne assigned files edit karo.

| Member | Files |
|--------|-------|
| Nishant | `src/app/page.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/FeatureCard.tsx` |
| Dileep | `src/app/login/page.tsx`, `src/app/register/page.tsx` |
| Ayushmaan | `src/app/generator/page.tsx` |
| Utpal | `README.md`, `docs/` folder |

### 4. Test Karo

```bash
# Project run karo
npm run dev

# Browser mein check karo
# http://localhost:3000 — Landing page
# http://localhost:3000/login — Login page
# http://localhost:3000/register — Registration page
# http://localhost:3000/dashboard — Dashboard
# http://localhost:3000/generator — Password Generator
```

Lint check:
```bash
npm run lint
```

### 5. Commit Karo

```bash
git add .
git commit -m "feat: description of your change"
```

**Commit message format:**
- `feat: ...` — naya feature
- `fix: ...` — bug fix
- `docs: ...` — documentation change
- `style: ...` — formatting/styling change
- `test: ...` — testing related

### 6. Push Karo

```bash
git push origin feature/tumhari-branch
```

### 7. Pull Request (PR) Banao

1. GitHub pe jao: https://github.com/ask8962/securepass-password-manager
2. "Compare & pull request" pe click karo.
3. Description mein likho:
   - Kya change kiya
   - Kaise test kiya
   - Koi known issues
4. "Create pull request" pe click karo.

### 8. Review Wait Karo

- Anukalp PR review karega.
- Agar changes chahiye toh comment karega — fix karo aur push karo.
- Approve hone pe merge ho jayega.

## ⚠️ Rules

1. **Main branch pe directly push nahi karna** — sirf PR se merge hoga.
2. **Dusre ke files change mat karo** — apne assigned files tak raho.
3. **Fake commits mat banao** — genuine kaam karo.
4. **`.env` files push mat karo** — secrets leak ho sakte hain.
5. **Apna code samjho** — supervisor puchh sakta hai.
6. **AI se help le sakte ho** — lekin output samjhna zaroori hai.

## Conflict Hone Pe

Agar `git pull` ya `git merge` pe conflict aaye:

1. **Khud solve mat karo** agar samajh nahi aa raha.
2. Anukalp ko message karo — woh help karega.
3. Yah fir meeting mein saath mein resolve karo.

## Weekly Schedule (Suggested)

| Day | Kaam |
|-----|------|
| Mon–Wed | Assigned task pe kaam karo |
| Thu | Test karo, bugs fix karo |
| Fri | PR banao, review ke liye bhejo |
| Sat | Mentor demo prepare karo |
| Sun | Next week ka task dekho |

Yeh sirf guideline hai — actual schedule team meeting mein decide hoga.
