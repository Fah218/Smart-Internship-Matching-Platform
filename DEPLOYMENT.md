# 🚀 Deployment Guide - SkillBridge AI

This guide will walk you through deploying both the frontend and backend of SkillBridge AI.

## 📦 Deployment Architecture

- **Frontend**: Vercel (React/Vite app)
- **Backend**: Render or Railway (Node.js/Express API)
- **Database**: MongoDB Atlas (Cloud database)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (Free M0 tier)

### 1.2 Configure Database Access
1. In Atlas Dashboard → **Database Access**
2. Click **Add New Database User**
   - Username: `skillbridge_admin`
   - Password: Generate a secure password (save it!)
   - User Privileges: `Atlas admin`

### 1.3 Configure Network Access
1. In Atlas Dashboard → **Network Access**
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

### 1.4 Get Connection String
1. In Atlas Dashboard → **Database** → Click **Connect**
2. Choose **Connect your application**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://skillbridge_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name at the end: `...mongodb.net/skillbridge_db?retryWrites=true&w=majority`

**Save this connection string - you'll need it for backend deployment!**

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [Render](https://render.com/)
2. Sign up with your GitHub account

### 2.2 Create New Web Service
1. Click **New +** → **Web Service**
2. Connect your GitHub repository: `Smart-Internship-Matching-Platform`
3. Configure the service:
   - **Name**: `skillbridge-api`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 2.3 Add Environment Variables
In the **Environment** section, add:

| Key | Value |
|-----|-------|
| `PORT` | `5001` |
| `MONGO_URI` | Your MongoDB Atlas connection string from Step 1.4 |
| `NODE_ENV` | `production` |

### 2.4 Deploy
1. Click **Create Web Service**
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll get a URL like: `https://skillbridge-api.onrender.com`

**Save this backend URL - you'll need it for frontend deployment!**

### 2.5 Test Backend
Visit: `https://skillbridge-api.onrender.com/`
You should see: "Smart Internship Matching Backend is running 🚀"

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Update Frontend API Configuration
Before deploying, we need to update the frontend to use the production backend URL.

**Option A: Using Environment Variables (Recommended)**

1. The frontend will use environment variables for the API URL
2. We'll set this in Vercel dashboard

**Option B: Update vite.config.js**

If you want to hardcode it, update `frontend/vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://skillbridge-api.onrender.com', // Your Render URL
        changeOrigin: true
      },
      '/uploads': {
        target: 'https://skillbridge-api.onrender.com',
        changeOrigin: true
      }
    }
  }
})
```

### 3.2 Create Vercel Account
1. Go to [Vercel](https://vercel.com/)
2. Sign in with GitHub (you're already logged in at https://vercel.com/fah218s-projects)

### 3.3 Import Project
1. Click **Add New** → **Project**
2. Import your GitHub repository: `Smart-Internship-Matching-Platform`
3. Configure project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.4 Add Environment Variables
In **Environment Variables** section, add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://skillbridge-api.onrender.com` |

### 3.5 Deploy
1. Click **Deploy**
2. Wait for deployment (2-3 minutes)
3. You'll get a URL like: `https://skillbridge-ai.vercel.app`

---

## ✅ Step 4: Verify Deployment

### 4.1 Test Backend
```bash
curl https://skillbridge-api.onrender.com/api/jobs
```

### 4.2 Test Frontend
1. Visit your Vercel URL: `https://skillbridge-ai.vercel.app`
2. Try to register a student account
3. Complete profile and test matching
4. Try company registration and job posting

---

## 🔄 Step 5: Enable Continuous Deployment

Both Vercel and Render are now connected to your GitHub repository. Any push to the `main` branch will automatically trigger a new deployment!

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel and Render will auto-deploy! 🚀
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: "Application failed to respond"
- **Solution**: Check Render logs, ensure MongoDB connection string is correct

**Problem**: CORS errors
- **Solution**: Verify CORS is enabled in `backend/src/app.js`

### Frontend Issues

**Problem**: API calls failing
- **Solution**: Check that `VITE_API_URL` environment variable is set correctly in Vercel

**Problem**: 404 on page refresh
- **Solution**: Ensure `_redirects` file exists in `frontend/public/`

---

## 📊 Monitoring

### Render Dashboard
- View logs: `https://dashboard.render.com/`
- Monitor uptime and performance

### Vercel Dashboard
- View deployments: `https://vercel.com/fah218s-projects`
- Check build logs and analytics

---

## 💰 Cost Breakdown

| Service | Free Tier | Limits |
|---------|-----------|--------|
| MongoDB Atlas | ✅ Yes | 512 MB storage |
| Render | ✅ Yes | 750 hours/month, sleeps after 15 min inactivity |
| Vercel | ✅ Yes | 100 GB bandwidth/month |

**Total Monthly Cost: $0** 🎉

---

## 🚀 Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user configured
- [ ] Network access allowed
- [ ] Backend deployed to Render
- [ ] Environment variables set on Render
- [ ] Backend URL tested
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set on Vercel
- [ ] Frontend URL tested
- [ ] End-to-end testing completed
- [ ] Custom domain configured (optional)

---

## 🎯 Next Steps

1. **Custom Domain**: Add your own domain in Vercel settings
2. **Analytics**: Enable Vercel Analytics for insights
3. **Monitoring**: Set up error tracking (Sentry)
4. **Backups**: Configure MongoDB Atlas backups

---

**Deployment Complete! Your SkillBridge AI platform is now live! 🎉**
