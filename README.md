# 🧾 Billing Management System

A **Billing Management System** built with **Next.js** for the frontend and **Node.js** for the backend. This system supports creating, reading, updating, and deleting (CRUD) operations for invoices and clients. It also provides a comprehensive dashboard with real-time insights, advanced filtering, and CSV export functionality.

## 📌 Features

✅ CRUD operations for invoices and clients  
✅ Interactive dashboard with real-time data  
✅ Report generation with advanced filters  
✅ Export reports to CSV format  
✅ Modular monorepo structure  
✅ Efficient and scalable architecture

---

## 🗂️ Project Structure

```
monorepo/
├── apps/
│    ├── client/         → Frontend (Next.js)
│    └── server/         → Backend (Node.js)
└── packages/
     ├── utils/          → Shared utilities (e.g., CSV export)
     ├── types/          → Shared TypeScript types
     └── config/         → Shared environment config
```

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### 🛠️ Setup

1. **Clone the repository**
```bash
git clone https://github.com/Abbas19402/Billing_Management_System.git
cd Billing_Management_System
```

2. **Install dependencies**
```bash
npm install
```

### ▶️ Running the Applications

#### Start the **Backend** (Node.js)
```bash
cd apps/server
npm run start
```
> Runs on `http://localhost:5000`

#### Start the **Frontend** (Next.js)
```bash
cd apps/client
npm run dev
```
> Runs on `http://localhost:3000`

---

## 📦 Available Scripts

At the root of the monorepo, you can run the following commands:

```bash
# Install dependencies
npm install

# Start both client and server concurrently
npm run dev

# Build all applications
npm run build

# Run tests
npm test
```

---

## 📊 Dashboard Overview

The dashboard provides real-time insights and includes:

- Total revenue and pending invoices
- Active clients and their billing status
- Filtered report generation (date range, client-specific)
- CSV export for data analysis

---

## 📌 Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📧 Contact

For questions or support, reach out via:

- **Email:** abbasali.dalal07@gmail.com
- **GitHub Issues:** [Open an issue](https://github.com/Abbas19402/Billing_Management_System/issues)

Happy coding! 💻

