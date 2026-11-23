# Weekly Team Tasks — Week 1

## Sabke Liye Common Steps

1. GitHub pe collaborator access lo (Anukalp se).
2. Repository clone karo (guide dekho: `github-beginners-guide.md`).
3. `npm install` karo.
4. `npm run dev` se project run karo.
5. Browser mein [http://localhost:3000](http://localhost:3000) check karo.
6. Apna assigned task complete karo.
7. Apni branch pe commit karo.
8. Pull request banao.

---

## Nishant Singh — Landing Page

### Tumhara Task
Landing page ka content aur UI review karo. Test karo ki responsive hai ya nahi.

### Files
- `src/app/page.tsx` — Main landing page
- `src/components/Header.tsx` — Navigation bar
- `src/components/Footer.tsx` — Footer section
- `src/components/FeatureCard.tsx` — Feature cards

### Kya Karna Hai
1. Project run karo (`npm run dev`).
2. http://localhost:3000 kholo.
3. Check karo:
   - Header mein sab links kaam kar rahe hain?
   - Feature cards sahi dikh rahe hain?
   - Mobile pe resize karo — responsive hai?
   - Footer mein correct information hai?
4. Agar koi text improve karna hai, ya spacing/color fix karna hai — karo.
5. Apni branch pe commit karo.

### Branch
```bash
git checkout -b feature/landing-page
```

### Test Kaise Karo
- Chrome mein F12 dabao → mobile view toggle karo.
- Sab links pe click karo.
- Different screen sizes pe check karo.

### AI Prompt (Cursor/Antigravity mein paste karo)
```
I am Nishant, working on the SecurePass landing page.
Please review src/app/page.tsx and the components in src/components/ (Header.tsx, Footer.tsx, FeatureCard.tsx).
Check for:
1. Responsive design issues on mobile, tablet, and desktop.
2. Any accessibility improvements needed.
3. Broken links or navigation issues.
4. Text or content that could be improved.
Suggest specific fixes. Do not modify login, register, dashboard, or generator pages.
```

### Supervisor Ko Kya Batana Hai
"Maine landing page ka UI review kiya, responsive design test kiya, aur content improvements kiye."

---

## Dileep Bhardwaj — Authentication Forms

### Tumhara Task
Login aur registration forms review karo. Validation test karo. Firebase configuration document banao.

### Files
- `src/app/login/page.tsx` — Login page
- `src/app/register/page.tsx` — Registration page

### Kya Karna Hai
1. Project run karo (`npm run dev`).
2. http://localhost:3000/login aur /register kholo.
3. Test karo:
   - Empty form submit karo — error messages aate hain?
   - Galat email dalo — validation kaam karta hai?
   - Short password dalo — error aata hai?
   - Registration mein passwords match nahi karo — error?
   - Show/hide password button kaam karta hai?
4. Submit button pe warning dikhta hai ki Firebase not connected.
5. Ek document banao `docs/firebase-setup-notes.md` explaining:
   - Firebase Console kaise kholen
   - Naya project kaise banayein
   - Authentication enable kaise karein
   - API keys kahan milte hain

### Branch
```bash
git checkout -b feature/firebase-auth
```

### AI Prompt (Cursor/Antigravity mein paste karo)
```
I am Dileep, working on SecurePass authentication forms.
Please review src/app/login/page.tsx and src/app/register/page.tsx.
Test all form validations:
1. Empty fields should show errors.
2. Invalid email format should show an error.
3. Password less than 8 chars should fail.
4. Mismatched passwords in register should fail.
5. Show/hide password toggle should work.
Also create a document docs/firebase-setup-notes.md that explains how to set up Firebase Authentication for a Next.js project. Keep it simple.
Do not modify landing page, dashboard, or generator files.
```

### Supervisor Ko Kya Batana Hai
"Maine login aur registration forms ki validation testing ki aur Firebase setup documentation banaya."

---

## Ayushmaan Gupta — Password Generator

### Tumhara Task
Password generator test karo. Edge cases check karo. Improvements suggest karo.

### Files
- `src/app/generator/page.tsx` — Password generator page

### Kya Karna Hai
1. Project run karo (`npm run dev`).
2. http://localhost:3000/generator kholo.
3. Test karo:
   - Different lengths pe generate karo (4, 16, 50, 128).
   - Sab options on/off toggle karo.
   - Sab options off karo — error aana chahiye.
   - Copy button kaam karta hai?
   - Strength meter sahi show ho raha hai?
   - Multiple baar generate karo — har baar different password aata hai?
4. Edge cases:
   - Length = 4 with all 4 types — kya har type ka at least ek character aata hai?
   - Length = 128 — kaam karta hai bina crash hue?
   - Sirf "Special Characters" on rakhke generate karo.
5. Improvements suggest karo ya implement karo.

### Branch
```bash
git checkout -b feature/password-generator
```

### AI Prompt (Cursor/Antigravity mein paste karo)
```
I am Ayushmaan, working on the SecurePass password generator.
Please review src/app/generator/page.tsx and:
1. Test edge cases: minimum length (4), maximum length (128), single character type selected.
2. Verify that crypto.getRandomValues is used correctly.
3. Check that at least one character from each selected type is included.
4. Test the strength meter accuracy.
5. Suggest or implement improvements:
   - Maybe a "password history" in session (not stored permanently).
   - Exclude ambiguous characters option (0, O, l, 1, I).
   - Better UX for the strength meter.
Do not modify landing page, login, register, or dashboard files.
```

### Supervisor Ko Kya Batana Hai
"Maine password generator ki functionality test ki, edge cases check kiye, aur security implementation verify kiya ki crypto.getRandomValues correctly use ho raha hai."

---

## Utpal Kumar — Testing & Documentation

### Tumhara Task
Poora application manually test karo. README review karo. Mentor report complete karo.

### Files
- `README.md` — Project readme
- `docs/` — Sab documentation files
- `docs/weekly-reports/week-01.md` — Weekly report (review and finalize)

### Kya Karna Hai
1. Project run karo (`npm run dev`).
2. Har page kholo aur test karo:
   - http://localhost:3000 — Landing page
   - http://localhost:3000/login — Login
   - http://localhost:3000/register — Register
   - http://localhost:3000/dashboard — Dashboard
   - http://localhost:3000/generator — Generator
3. Manual testing checklist banao `docs/testing-checklist-week01.md`:
   - Har page load hota hai ya nahi
   - Forms ki validation kaam karti hai
   - Navigation sahi hai
   - Responsive design kaam karta hai
   - Koi error ya bug milta hai toh note karo
4. README.md review karo — koi typo ya missing info fix karo.
5. `docs/weekly-reports/week-01.md` review karo aur finalize karo.
6. Screenshots lo har page ke (mentor ko dikhane ke liye).

### Branch
```bash
git checkout -b docs/testing-and-reports
```

### AI Prompt (Cursor/Antigravity mein paste karo)
```
I am Utpal, responsible for testing and documentation in SecurePass.
Please help me:
1. Create a manual testing checklist at docs/testing-checklist-week01.md covering all pages:
   - Landing page, login, register, dashboard, generator.
   - For each page: does it load, navigation works, forms validate, responsive design.
2. Review README.md for typos, missing information, or improvements.
3. Review docs/weekly-reports/week-01.md and suggest any missing items.
4. List the exact steps to take screenshots of each page for the mentor report.
Do not modify any source code files (src/ folder).
```

### Supervisor Ko Kya Batana Hai
"Maine poore application ka manual testing kiya, testing checklist banaya, README review kiya, aur weekly mentor report prepare kiya."
