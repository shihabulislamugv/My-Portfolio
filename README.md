# Modern UX/UI Portfolio & Case Studies

A high-performance, award-winning portfolio and CMS built with Next.js 16, Tailwind CSS 4, Framer Motion, and Prisma (SQLite).

---

## 🚀 How to Run on Another Computer

### 1. Prerequisites
- **Node.js** (version 18 or higher recommended). Download from [https://nodejs.org](https://nodejs.org).

---

### 2. Quick Start Steps

1. **Extract the ZIP file** to any folder on your computer.
2. **Open your terminal / command prompt** inside the extracted folder (`ux-portfolio`).
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Generate Prisma client** (if needed):
   ```bash
   npx prisma generate
   ```
5. **Start the local development server**:
   ```bash
   npm run dev
   ```
6. **Open your browser** and visit:
   - **Website:** `http://localhost:3000`
   - **Admin Dashboard:** `http://localhost:3000/admin`

---

## 🔐 Admin Dashboard Login

- **URL:** `http://localhost:3000/login`
- **Email:** `admin@example.com`
- **Password:** `admin123`

---

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion (Parallax, Infinite Marquee, Spring Physics)
- **Database & ORM:** SQLite via Prisma ORM
- **Auth:** NextAuth.js
- **Icons:** Lucide React
