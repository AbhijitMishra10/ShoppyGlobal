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

## 🚀 Features

- 🏠 **Home Page** with searchable product list  
- 📦 **Product Detail Page** using dynamic routes (`/product/:id`)  
- 🛒 **Shopping Cart** with quantity update and removal  
- ✅ **Checkout Page** to review and place orders  
- ⚙️ **Redux Toolkit** for centralized state handling  
- 🧭 **Client-side Routing** with React Router  
- 🌐 **Real Data** from [DummyJSON API](https://dummyjson.com/)  
- 💡 **Responsive and Clean UI**  

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


---

## 🛠️ Installation & Usage

```bash
# Clone this repository
git clone https://github.com/AbhijitMishra10/ShoppyGlobal.git

cd ShoppyGlobal

# Install dependencies
npm install

# Start the development server
npm run dev
