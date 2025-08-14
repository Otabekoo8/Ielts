# IELTS Mock Test Platform

Mini platforma IELTS testlarini mashq qilish uchun. Student testlarni ishlashi, admin savollarni boshqarishi mumkin.

## Texnologiyalar
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Routing:** React Router
- **Interaktivlik:** Timer, progress bar, javoblarni ko‘rsatish

## Loyihaning tuzilishi
frontend/ # React ilova
backend/ # Node.js + Express API


## Xususiyatlar
- **Student:** Testni boshlash, javoblarni tanlash, natijani ko‘rish
- **Admin:** Savol qo‘shish, tahrirlash, o‘chirish, barcha savollarni ko‘rish
- **API:** GET, POST, PUT, DELETE savollar uchun

## Ishga tushirish
### Backend
```bash
cd backend
npm install
npm run dev
Frontend

cd frontend
npm install
npm run dev
API URL frontendda api.js faylida sozlanadi:
js
const BASE_URL = "https://ielts-mock-backend-b2je.onrender.com/api";
