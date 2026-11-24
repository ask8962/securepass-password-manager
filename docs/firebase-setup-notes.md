# SecurePass — Firebase Setup Guide (Beginner Friendly)

**Project:** SecurePass – Password Manager with Two-Factor Authentication  
**Group:** G195 | GLA University, Mathura  

This guide walks you through setting up a free Google Firebase project and obtaining the required environment variables for SecurePass in less than 5 minutes.

---

## Step 1: Create a Free Firebase Project

1. Open your browser and navigate to the Firebase Console:  
   👉 [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Sign in with your Google account.
3. Click on **"Add project"** (or **"Create a project"**).
4. Enter your project name (e.g. `securepass-g195`).
5. (Optional) Disable Google Analytics for this project (not required for local academic testing) and click **"Create project"**.
6. Wait a few seconds for project provisioning, then click **"Continue"**.

---

## Step 2: Enable Email/Password Authentication

1. In the left sidebar of your Firebase Console, click on **Build** -> **Authentication**.
2. Click **"Get started"**.
3. Under the **"Sign-in method"** tab, select **"Email/Password"**.
4. Toggle the **"Email/Password"** switch to **Enabled**. (Leave "Email link (passwordless sign-in)" disabled).
5. Click **"Save"**.

---

## Step 3: Register a Web Application & Get Keys

1. In the left sidebar, click the **Project settings** gear icon (⚙️) next to "Project Overview".
2. Scroll down to the **"Your apps"** section and click the **Web icon** (`</>`).
3. Enter an App nickname (e.g. `SecurePass Web`).
4. (Leave "Firebase Hosting" unchecked) and click **"Register app"**.
5. Firebase will display your `firebaseConfig` object:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "securepass-g195.firebaseapp.com",
     projectId: "securepass-g195",
     storageBucket: "securepass-g195.firebasestorage.app",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef123456"
   };
   ```

---

## Step 4: Add Keys to `.env.local` in SecurePass

1. In your project root folder (`c:\Users\ganuk\Desktop\securepass`), create a file named `.env.local` (or copy `.env.example`).
2. Map your Firebase config values to the Next.js environment variable names:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=securepass-g195.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=securepass-g195
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=securepass-g195.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
```

3. Save `.env.local`.
4. **IMPORTANT:** Never commit `.env.local` to Git. (It is already included in `.gitignore`).

---

## Step 5: Start or Restart Development Server

In PowerShell / Terminal:
```powershell
npm run dev
```
Open `http://localhost:3000` in your browser.

- You can now register new users at `http://localhost:3000/register`.
- You can view registered users anytime in your Firebase Console under **Authentication -> Users**.

---

## Safe Fallback Feature

If `.env.local` is missing or keys are not yet configured:
- SecurePass **will not crash**.
- The Login and Register pages display an informative notification box explaining that Firebase credentials are not yet configured.
- The **Local Encryption Demonstration** (`/dashboard`) and **Password Generator** (`/generator`) remain 100% operational because they run natively inside the browser using the Web Crypto API without needing any external server.
