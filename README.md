# SecurePass — Secure Password Manager with 2FA

<div align="center">

🔐 **SecurePass**

A secure password manager with Two-Factor Authentication (2FA).

**B.Tech CSE Final Year Project · Group G195 · GLA University, Mathura**

</div>

---

## About

SecurePass is a modern, web-based password manager built as a final-year B.Tech Computer Science project. It demonstrates secure credential storage, client-side encryption, and TOTP-based two-factor authentication.

### Team Members

| # | Name | Role |
|---|------|------|
| 1 | Anukalp Gupta | Project integration, architecture, repository management |
| 2 | Nishant Singh | Frontend and UI components |
| 3 | Dileep Bhardwaj | Authentication and Firebase integration |
| 4 | Ayushmaan Gupta | Password generator and security features |
| 5 | Utpal Kumar | Testing, documentation, and project demonstration |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Authentication | Firebase Authentication (planned) |
| Database | Firebase Firestore (planned) |
| Backend API | Python FastAPI (planned, as per approved synopsis) |
| Encryption | Web Crypto API (client-side) |

## Current Status — Week 1

✅ Project initialized with Next.js App Router + TypeScript + Tailwind CSS
✅ Landing page with responsive design and dark mode
✅ Login and registration forms with client-side validation
✅ Initial dashboard with vault placeholder and navigation
✅ Working password generator with `crypto.getRandomValues`
✅ Documentation and project structure

⚠️ Firebase Authentication is **not connected** — forms validate but do not authenticate.
⚠️ Encrypted vault and TOTP 2FA are **planned for future weeks**.

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

# Copy environment template
cp .env.example .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Commands

| Command | Description |
|---------|------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

## Project Structure

```
securepass/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   ├── globals.css         # Global styles & theme
│   │   ├── login/
│   │   │   └── page.tsx        # Login form
│   │   ├── register/
│   │   │   └── page.tsx        # Registration form
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Vault dashboard
│   │   └── generator/
│   │       └── page.tsx        # Password generator
│   └── components/
│       ├── Header.tsx          # Navigation header
│       ├── Footer.tsx          # Page footer
│       └── FeatureCard.tsx     # Feature display card
├── docs/                       # Project documentation
├── public/                     # Static assets
├── .env.example                # Environment template
├── package.json
└── tsconfig.json
```

## Development Roadmap

| Week | Milestone |
|------|-----------|
| **1** ✅ | Project foundation, landing page, auth UI, dashboard, password generator |
| 2 | Firebase authentication, Firestore setup, database design |
| 3 | Client-side encryption, master passphrase, encryption tests |
| 4 | Encrypted credential CRUD, vault unlock |
| 5 | TOTP MFA architecture, enrollment |
| 6 | MFA verification, session management, auto-lock |
| 7 | Recovery keys, password-strength analysis |
| 8+ | Integration, hardening, testing, deployment |

## Contributing

This is an academic project. All five team members contribute through:

1. Working on assigned feature branches.
2. Creating pull requests for review.
3. Following the contribution workflow in `docs/team-onboarding/`.

See [docs/team-onboarding/contribution-workflow.md](docs/team-onboarding/contribution-workflow.md) for details.

## License

This project is developed for academic purposes at GLA University, Mathura.

---

<div align="center">

**SecurePass** · Group G195 · GLA University, Mathura

</div>
