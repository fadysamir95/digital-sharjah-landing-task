# Digital Sharjah Department Website – Landing Page

This project is a modern, accessible, and responsive landing page developed for the **Digital Sharjah Department**. It showcases services, initiatives, and important resources for users, supporting both **LTR and RTL** languages with seamless localization.

## 🔧 Project Overview

This Angular-based landing page is built with a strong focus on:
- **Accessibility** (including screen reader support, contrast toggles, and font size adjustments)
- **Responsiveness** across various devices and screen sizes
- **Right-to-Left (RTL)** layout support for Arabic localization
- **Modular and maintainable architecture** using standalone components and BEM methodology

Data is fetched dynamically using **JSON Server**, simulating backend APIs for development purposes.

---

## 🚀 Features

- ✅ Responsive layout for mobile, tablet, and desktop
- 🌐 RTL support for Arabic
- ♿ Accessibility features: font resizing, high-contrast mode, screen reader-friendly markup
- 💅 Built with **Sass** for powerful, structured styling
- 📁 **BEM** methodology for clean and scalable CSS
- 🔁 Dynamic content fetching using **JSON Server**

---

## 📦 Prerequisites

Make sure you have the following installed:

- **Node.js**: `v18.x.x`  
- **npm**: `v9.x.x`  
- **Angular CLI**: `v19.x.x`  
You can check your installed versions using:

```bash
node -v
npm -v
ng version

## 🚀 Setup and Run

This guide will help you get the project running locally using Angular and JSON Server.

Install project dependencies
**npm install**

Start the Angular development server
**ng serve**
Angular app will be available at:
👉 http://localhost:4200

Start the JSON Server
**npx json-server --watch db.json --port 3000**
JSON Server will be available at:
👉 http://localhost:3000
Keep this server running while the Angular app is running to ensure proper data fetching.