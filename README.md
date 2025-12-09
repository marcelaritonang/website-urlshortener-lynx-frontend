# Shorteny - URL Shortener

Modern and minimalist URL shortener built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- 🔗 Shorten long URLs instantly
- 📱 QR Code generation for each link
- 📊 Click tracking and analytics
- 👤 User authentication & dashboard
- 🎨 Beautiful, minimalist UI design
- ⚡ Real-time updates
- 🔐 Secure password reset via email

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Backend:** Go (Gin Framework)
- **Database:** PostgreSQL

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running on `http://localhost:8080`

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd website-urlshortener-lynx-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

4. Run development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```markdown
app
├── api
│ ├── auth
│ │ ├── [...nextauth]
│ │ └── route.ts
│ ├── links
│ │ └── route.ts
│ └── users
│ └── route.ts
├── components
│ ├── Auth
│ │ ├── LoginForm.tsx
│ │ └── RegisterForm.tsx
│ ├── Dashboard
│ │ ├── Dashboard.tsx
│ │ └── LinkTable.tsx
│ ├── Layout
│ │ └── Navbar.tsx
│ ├── Link
│ │ ├── LinkCard.tsx
│ │ └── QRCode.tsx
│ └── ui
│ ├── Button.tsx
│ ├── Input.tsx
│ └── Modal.tsx
├── hooks
│ ├── useAuth.ts
│ ├── useLinks.ts
│ └── useUser.ts
├── lib
│ ├── db.ts
│ └── prisma.ts
├── middleware
│ └── auth.ts
├── pages
│ ├── api
│ │ ├── auth
│ │ │ ├── [...nextauth].ts
│ │ │ └── route.ts
│ │ ├── links
│ │ │ └── route.ts
│ │ └── users
│ │ └── route.ts
│ ├── \_app.tsx
│ ├── \_document.tsx
│ ├── index.tsx
│ ├── login.tsx
│ ├── register.tsx
│ └── dashboard.tsx
├── public
│ ├── favicon.ico
│ ├── logo.png
│ └── qr-placeholder.png
├── styles
│ ├── globals.css
│ └── tailwind.css
├── tailwind.config.js
├── tsconfig.json
└── vercel.json
```

## 📚 API Reference

- **Authentication:**

  - `POST /api/auth/register`: Register a new user
  - `POST /api/auth/login`: Log in an existing user
  - `GET /api/auth/me`: Get current user session
  - `POST /api/auth/logout`: Log out the current user

- **Links:**

  - `POST /api/links`: Create a new shortened link
  - `GET /api/links`: Get all links for the authenticated user
  - `GET /api/links/:id`: Get a specific link by ID
  - `DELETE /api/links/:id`: Delete a link by ID

- **Users:**
  - `GET /api/users`: Get all users (admin only)
  - `GET /api/users/:id`: Get a specific user by ID (admin only)
  - `PUT /api/users/:id`: Update a user's information (admin only)
  - `DELETE /api/users/:id`: Delete a user by ID (admin only)

## 📧 Contact

For feedback or issues, please contact [support@shorteny.com](mailto:support@shorteny.com).
