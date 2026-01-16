# 📔 NotesApp Pro – Modern Rich-Text Note Management

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://notes-app-ten-dun-41.vercel.app)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)

**NotesApp Pro** is a sophisticated, full-stack note-taking application designed for productivity and elegance. It features a premium dark theme, rich text editing capabilities, and a lightning-fast responsive UI.

---

## ✨ Key Features

- **🚀 Pro Suite Editor**: Full-featured rich text editor (React Quill) supporting bold, italics, underline, colors, and bullet points.
- **🌑 Elegant Dark Theme**: A custom-designed "Slate & Indigo" aesthetic with heavy glassmorphism and premium typography.
- **🔍 Intelligent Search & Filtering**: Real-time search by title or content, combined with custom label-based filtering (e.g., Minato, Kushina).
- **✨ Fluid Animations**: Smooth, staggered entrance animations and micro-interactions powered by **Framer Motion**.
- **📋 Side-Pane Hover Preview**: Instantly view full note details and metadata by hovering over cards in the gallery view.
- **⏱️ Productivity Insights**: Automatic calculations for reading time and precise date tracking for every note.
- **💾 Full Cloud Sync**: Persistent storage using MongoDB for seamless multi-device access.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (Vite-powered)
- **Redux Toolkit**: Centralized state management for notes and API interactions.
- **Framer Motion**: For high-end declarative animations.
- **Lucide React**: For a consistent and professional icon system.
- **React Quill**: Professional-grade rich text editing.
- **Tailwind CSS & Vanilla CSS Modules**: For a pixel-perfect, responsive design system.

### Backend
- **Node.js & Express**: Robust API layer handling CRUD operations.
- **MongoDB & Mongoose**: Flexible document-based storage with schema validation.
- **RESTful API Architecture**: Standardized endpoints for cross-platform compatibility.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance

### 1. Clone the repository
```bash
git clone https://github.com/aniketray01/NotesApp.git
cd NotesApp/react-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
```
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ..
npm install
```
Create a `.env` file in the `react-app` directory:
```env
VITE_API_URL=http://localhost:5000
```
```bash
npm run dev
```

---

## 📸 Screen Previews

*(Place your professional screenshots here to wow recruiters!)*

> [!TIP]
> **Pro Tip:** Use the Hover Preview in the "All Notes" layout to quickly reference your longer notes without leaving the gallery.

---

## 🌐 Deployment

- **Frontend**: Hosted on [Vercel](https://notes-app-ten-dun-41.vercel.app)
- **Backend API**: Hosted on Render
- **Database**: MongoDB Atlas

---

## 📄 License
This project is licensed under the MIT License.

## 🤝 Contact
**Aniket Ray** - [GitHub](https://github.com/aniketray01) | [LinkedIn](https://www.linkedin.com/in/aniket-ray/)
