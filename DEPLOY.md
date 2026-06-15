# CoreVault - Deployment Guide

## Architecture
- **Frontend**: Vercel (React/Vite)
- **Backend**: Render (Node.js/Express)
- **Database**: MongoDB Atlas

---

## Backend (Render)

### Environment Variables to set on Render:
```
MONGO_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/ecommarce
JWT_SECRET=your-strong-random-secret
ADMIN_EMAIL=khanshovo67@gmail.com
ADMIN_PASSWORD=12369874
EMAIL_USER=khanshovo67@gmail.com
EMAIL_PASS=qcvclumbyxeojjog
FRONTEND_URL=https://your-app.vercel.app
STORE_ID=your_sslcommerz_store_id
STORE_PASSWORD=your_sslcommerz_store_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Render Settings:
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

---

## Frontend (Vercel)

### Environment Variables to set on Vercel:
```
VITE_API_URL=https://your-render-backend.onrender.com
```

### Vercel Settings:
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite

The `vercel.json` inside `client/` handles SPA routing automatically.

---

## Admin Access
- URL: `https://your-app.vercel.app/admin/login`
- Email: `khanshovo67@gmail.com`
- Password: `12369874`

## User Flow
1. Register → instant account created → toast "Registration complete!" → redirected to login
2. Login → if admin email → goes to `/admin/dashboard` → if user → goes to `/`
