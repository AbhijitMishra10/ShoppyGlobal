# 🛍️ ShoppyGlobe – E-commerce App

## 📖 Description

ShoppyGlobe is a beginner-friendly e-commerce web app built with modern frontend tools. It lets users browse products, view detailed information, add items to the cart, modify cart quantities, and place orders. The app dynamically updates item quantities and calculates the total value during checkout.

---

## ⚙️ Tech Stack

- **React** – Component-based UI
- **React Router** – Client-side routing
- **Redux Toolkit** – Global state management
- **JavaScript** – App logic
- **CSS** – Basic styling
- **Vite** – Fast bundler and dev server

---
## Backend

Node.js + Express – REST API

MongoDB + Mongoose – Database & ODM

JWT – Authentication


## 🚀 Features

- 🏠 **Home Page** with searchable product list  
- 📦 **Product Detail Page** using dynamic routes (`/product/:id`)  
- 🛒 **Shopping Cart** with quantity update and removal  
- ✅ **Checkout Page** to review and place orders  
- ⚙️ **Redux Toolkit** for centralized state handling  
- 🧭 **Client-side Routing** with React Router  
- 🌐 **Real Data** from [DummyJSON API](https://dummyjson.com/)  
- 💡 **Responsive and Clean UI**  

🔐 User Authentication with JWT

📦 MongoDB Models for users, products, and carts

📡 API Routes for auth, products, and cart management


---

## 📂 Folder Structure

src/
├── components/ # Reusable UI components
├── pages/ # Route-specific pages (Home, Product, Cart, etc.)
├── hooks/ # Custom React hooks
├── Utils/ # Redux store and slices
├── App.jsx # Root layout with <Outlet />
├── main.jsx # App entry with store & router setup
└── App.css # Styling

Backend/
│
├── src/
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Product.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── cart.js
│   │   └── products.js
│   │
│   ├── controllers/        
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   └── productController.js
│   │
│   ├── config/           
│   │   └── db.js
│   │
│   ├── utils/              
│   │   └── token.js
│   ├── seed.js
│   ├── app.js                 
│   └── server.js
├── .env
├── package.json
└── package-lock.json

---

## 🛠️ Installation & Usage

```bash
# Clone this repository
git clone https://github.com/AbhijitMishra10/ShoppyGlobal.git

 ShoppyGlobe

# Install dependencies
npm install

# Start the development server
npm run dev

## Backend Setup

cd Backend

# Install dependencies
npm install

# Create a .env file
PORT=5001
MONGO_URL=mongodb://localhost:27017/ShoppyGlobe
JWT_SECRET=<your_secret_key>

# Make sure MongoDB is running locally
# Example (Windows):
net start MongoDB

# Or run mongod manually:
"C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --dbpath "C:\data\db"

# Seed database (optional)
node seed.js
# Start backend server
npm start

Backend Will be running at
http://localhost:5001
