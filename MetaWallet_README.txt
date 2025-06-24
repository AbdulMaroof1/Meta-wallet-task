# Meta Wallet Meeting Manager

This is a full-stack web application where users can connect their MetaMask wallet, log in securely, and manage meetings (Create, Read, Update, Delete).

## Features

- 🔐 MetaMask Wallet Connection
- 🧾 JWT-Based Authentication
- 📅 Meeting Management (CRUD)
- 🧭 Protected Routes (PrivateRoute)
- 🎨 Styled with React-Bootstrap

---

## 🛠 How to Run the Project

### 1. Clone the Repository
```
git clone https://github.com/AbdulMaroof1/Meta-wallet-task.git
cd meta-wallet-meeting-manager
```

### 2. Setup Server
```
cd server
npm install
cp .env.example .env  # and fill in your variables
npm run dev
```

### 3. Setup Client
```
cd client
npm install
npm run dev
```

### 4. Access Application
```
Open browser at http://localhost:5173/
```

---

## 📁 Folder Structure

```
client/      --> React frontend with wallet integration
server/      --> Node.js backend API
.env         --> Environment variables (not committed)
```

## ✅ Requirements

- Node.js v18+
- MetaMask Extension in your browser

## 🔐 Auth Flow

1. User connects MetaMask wallet and signs a message.
2. Redirected to login page (email + password + wallet signature).
3. JWT token is issued and stored in localStorage.

---


Email : abdulmaroofyousfani5@gmail.com

## License
MIT