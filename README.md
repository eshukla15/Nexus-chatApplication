# 💬 Nexus - Real-time Chat Application

A full-stack chat application built using the MERN stack. Nexus allows users to create accounts, send real-time messages, update profiles, and experience a sleek, responsive UI.

---

🔗 **Live Demo**: [Click here to try it](https://nexus-oj5w.onrender.com/)

## Features

- 🔐 User authentication (JWT + bcrypt)
- 💬 Real-time messaging with Socket.io
- 👤 Profile image upload via Cloudinary
- ✅ Online/offline user status
- 🌙 Multiple themes
- 📁 Separate frontend and backend folders
- 📦 Environment variables and secure config setup
- 📱 Responsive design

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Zustand (or Redux if used)

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Socket.io
- Cloudinary (for image uploads)
- dotenv

---

## 🖼️ Project Structure

Nexus-chatApplication/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   └── .env
├── .gitignore
├── README.md
└── package.json



⚙️ Installation
```bash
git clone https://github.com/yourusername/nexus-chat-app.git
cd nexus-chat-app
npm install
npm run dev
