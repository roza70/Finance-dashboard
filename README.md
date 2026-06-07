# 💰 BudgetIQ — Finance Dashboard

> A modern, full-stack personal finance management platform built with Next.js 14, featuring real-time transaction tracking, interactive charts, and intelligent financial insights.

🌐 **Live Demo:** [finance-dashboard-gamma-dun.vercel.app](https://finance-dashboard-gamma-dun.vercel.app)

---

## 📸 Screenshots

> _(Add your screenshots here after taking them)_

| Dashboard                               | Transactions                                  |
| --------------------------------------- | --------------------------------------------- |
| ![Dashboard](screenshots/dashboard.png) | ![Transactions](screenshots/transactions.png) |

| Accounts                              | Categories                                |
| ------------------------------------- | ----------------------------------------- |
| ![Accounts](screenshots/accounts.png) | ![Categories](screenshots/categories.png) |

---

## ✨ Features

- 🔐 **Authentication** — Secure sign-in/sign-up with Clerk
- 📊 **Interactive Dashboard** — Real-time financial overview with cards and charts
- 💸 **Transaction Management** — Full CRUD operations for transactions
- 📁 **CSV Import** — Bulk import transactions from bank statements
- 🏦 **Account Management** — Multiple bank accounts support
- 🏷️ **Categories** — Organize transactions with custom categories
- 📈 **Charts** — Area, Bar, and Line charts for transaction history
- 🥧 **Pie Charts** — Category spending breakdown (Pie, Radar, Radial)
- 🔍 **Filters** — Filter by date range and account
- 📱 **Responsive** — Mobile-first design
- 🌙 **Dark Theme** — Beautiful dark navy UI

---

## 🛠️ Tech Stack

### Frontend

| Technology      | Purpose                 |
| --------------- | ----------------------- |
| Next.js 16      | React Framework         |
| TypeScript      | Type Safety             |
| Tailwind CSS v4 | Styling                 |
| shadcn/ui       | UI Components           |
| Recharts        | Charts & Graphs         |
| React Query     | Data Fetching & Caching |
| Zustand         | State Management        |
| React Hook Form | Form Handling           |
| Zod             | Validation              |

### Backend

| Technology      | Purpose                      |
| --------------- | ---------------------------- |
| Hono.js         | API Framework (Edge Runtime) |
| Drizzle ORM     | Database ORM                 |
| Neon PostgreSQL | Serverless Database          |
| Clerk           | Authentication               |

### Deployment

| Technology | Purpose              |
| ---------- | -------------------- |
| Vercel     | Hosting & Deployment |
| Neon       | Database Hosting     |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database (Neon recommended)
- Clerk account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/finance-dashboard.git
cd finance-dashboard
```

2. **Install dependencies**

```bash
bun install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Add your credentials to `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
DATABASE_URL=your_neon_database_url
```

4. **Push database schema**

```bash
bunx drizzle-kit push
```

5. **Run the development server**

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
finance-dashboard/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Dashboard pages
│   └── api/             # API routes (Hono.js)
├── components/          # Reusable UI components
├── db/                  # Database schema & config
├── features/            # Feature-based modules
│   ├── accounts/
│   ├── categories/
│   ├── transactions/
│   └── summary/
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── providers/           # React context providers
```

---

## 🗄️ Database Schema

```
accounts      — User bank accounts
categories    — Transaction categories
transactions  — Financial transactions
```

---

## 🔑 Key Features Explained

### 📊 Dashboard Overview

Real-time financial summary with:

- Remaining balance, income, and expense cards
- Percentage change from previous period
- Interactive transaction history chart
- Category spending breakdown

### 💸 Transaction Management

- Create, read, update, delete transactions
- Bulk delete with confirmation dialog
- CSV import from bank statements
- Filter by date range and account

### 📈 Chart Variants

- **Area Chart** — Smooth visualization of income vs expenses
- **Bar Chart** — Side-by-side comparison
- **Line Chart** — Trend analysis
- **Pie Chart** — Category distribution
- **Radar Chart** — Multi-dimensional view
- **Radial Chart** — Circular progress view

---

## 👨‍💻 Author

**Tahsin**

- GitHub: [@roza70](https://github.com/roza70)
- Project: [BudgetIQ Finance Dashboard](https://finance-dashboard-gamma-dun.vercel.app)

---

## 🙏 Acknowledgments

- Tutorial by [Antonio Erdeljac](https://www.codewithantonio.com)
- UI Components by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide React](https://lucide.dev)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <p>Built with ❤️ by Tahsin</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
