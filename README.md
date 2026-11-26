# SecurePass — Secure Password Manager with 2FA

<div align="center">

🔐 **SecurePass**

A web-based password manager prototype with Two-Factor Authentication (2FA) architecture.

**B.Tech CSE Final Year Project · Group G195 · GLA University, Mathura**

</div>

---

## About

SecurePass is a final-year B.Tech Computer Science academic project designed to demonstrate strong random password generation, managed authentication, client-side Web Crypto encryption, and planned Time-Based One-Time Password (TOTP) two-factor authentication.

### Team Members

| # | Name | Role |
|---|------|------|
| 1 | Anukalp Gupta | Project integration, architecture, repository management |
| 2 | Nishant Singh | Frontend UI review and components |
| 3 | Dileep Bhardwaj | Authentication flows and Firebase testing |
| 4 | Ayushmaan Gupta | Password generator enhancements and testing |
| 5 | Utpal Kumar | Testing, documentation review, and encryption demonstration |

## Tech Stack (Actual `package.json`)

| Layer | Technology | Status |
|-------|-----------|--------|
| Frontend | Next.js `16.4.6` (App Router), React `19.3.0`, TypeScript `^5` | Implemented |
| Styling & Icons | Tailwind CSS `4.3.3` (light minimal theme), Lucide React `^1.78.0` | Implemented |
| Authentication | Firebase Client SDK `^13.4.0` (Email/Password + `updateProfile`) | Implemented |
| Encryption Demo | Browser Web Crypto API (`PBKDF2-SHA-256` + `AES-256-GCM` in RAM) | Implemented (In-Memory) |
| Database | Cloud Firestore (Encrypted Vault CRUD) | Planned |
| Multi-Factor Auth | TOTP (RFC 6238) | Planned |
| Backend API | Python FastAPI (proposed in approved synopsis) | Planned |

## Current Status — 25–30% Presentation Prototype

✅ Minimal light-themed responsive UI (`#fafafa` background) across 5 routes (`/`, `/login`, `/register`, `/dashboard`, `/generator`)  
✅ Functional Firebase Email/Password authentication (`/register`, `/login`, session persistence via `onAuthStateChanged`, logout)  
✅ Registration saves `displayName` to Firebase Auth via `updateProfile()` and displays it on the dashboard  
✅ Client-side `/dashboard` route protection redirecting unauthenticated users to `/login`  
✅ Consistent login (`>= 6` chars, preserving existing Firebase accounts) and registration (`>= 8` chars) validation via `src/lib/authValidation.ts`  
✅ Cryptographically secure Password Generator using `window.crypto.getRandomValues()` initialized on the client without hydration mismatch, including length `4–128`, ambiguous character exclusion (`0, O, 1, l, I`), 7-rule strength meter, and clipboard copy  
✅ Interactive Local Encryption Demonstration on `/dashboard` using Web Crypto API (`PBKDF2-SHA-256` 100,000 iterations + `AES-256-GCM` with 128-bit salt, 96-bit IV, and authentication tag rejection)

⚠️ **Planned / Not Yet Implemented:**
- Cloud Firestore encrypted vault storage & multi-entry CRUD (local encryption demo currently runs strictly in browser React state RAM).
- Real TOTP Two-Factor Authentication (marked `"Coming Soon"` on the UI).
- Python FastAPI auxiliary backend.
- Automated unit/E2E test runner (verification currently uses `npx tsc --noEmit`, `npm run lint`, `npm run build`, and manual testing).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (included with Node.js)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/ask8962/securepass-password-manager.git
cd securepass-password-manager

# Install dependencies
npm install

# Copy environment template and fill in your Firebase Web SDK keys
cp .env.example .env.local

# Start the development server (must use localhost for Web Crypto API)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. See [docs/firebase-setup-notes.md](docs/firebase-setup-notes.md) for Firebase project setup instructions.

### Available Commands

| Command | Description |
|---------|------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (`next build --webpack`) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |
| `npx tsc --noEmit` | Run TypeScript type check |

## Project Structure

```
securepass/
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # Root layout wrapping children in AuthProvider
│   │   ├── page.tsx                     # Minimal landing page
│   │   ├── globals.css                  # Light theme variables & accessibility focus rules
│   │   ├── login/
│   │   │   └── page.tsx                 # Firebase Email/Password login page
│   │   ├── register/
│   │   │   └── page.tsx                 # Firebase registration + updateProfile(displayName)
│   │   ├── dashboard/
│   │   │   └── page.tsx                 # Protected dashboard + AES-256-GCM local demo
│   │   └── generator/
│   │       ├── page.tsx                 # Client-only dynamic shell (ssr: false)
│   │       └── PasswordGeneratorClient.tsx  # CSPRNG password generator
│   ├── components/
│   │   ├── Header.tsx                   # Landing page navigation header
│   │   └── Footer.tsx                   # Page footer
│   ├── context/
│   │   └── AuthContext.tsx              # Auth state listener, logout, and refreshUser
│   └── lib/
│       ├── firebase.ts                  # Singleton Firebase App & Auth initialization
│       ├── authValidation.ts            # Shared login/register validation & error messages
│       └── crypto.ts                    # Web Crypto PBKDF2 + AES-256-GCM helpers
├── docs/                                # Documentation, presentation prep & test notes
├── public/                              # Static SVG assets
├── .env.example                         # Environment template
├── package.json
└── tsconfig.json
```

## Development Roadmap

| Phase / Week | Milestone | Status |
|--------------|-----------|--------|
| **Phase 1 (Weeks 1–2 / Current)** | UI foundation, Firebase Email/Password Auth, CSPRNG Generator, Local AES-256-GCM Demo | ✅ Completed |
| **Phase 2 (Weeks 3–4)** | Firestore encrypted vault CRUD, persistent master key workflow | ⬜ Planned |
| **Phase 3 (Weeks 5–6)** | TOTP Two-Factor Authentication enrollment & verification, auto-lock | ⬜ Planned |
| **Phase 4 (Weeks 7–8+)** | Recovery keys, breach/strength audit, FastAPI decision, automated tests | ⬜ Planned |

## Contributing

All team members follow the branch & Pull Request workflow documented in [docs/team-onboarding/contribution-workflow.md](docs/team-onboarding/contribution-workflow.md). Never commit `.env.local` or secrets.

---

<div align="center">

**SecurePass** · Group G195 · GLA University, Mathura

</div>
