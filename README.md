# 💰 BudgetIQ — Finance Dashboard

> A modern, full-stack personal finance management platform built with Next.js 14, featuring real-time transaction tracking, interactive charts, and intelligent financial insights.

🌐 **Live Demo:** [finance-dashboard-gamma-dun.vercel.app](https://finance-dashboard-gamma-dun.vercel.app)

---

## 📸 Screenshots
C:\projects\finance-dashboard\Screenshots\Accounts.png

C:\projects\finance-dashboard\Screenshots\Dashboard.png


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

**Tahsin Roza**

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
