# 🚀 Quick Deployment Steps

## ⚡ Fast Track Deployment (15 minutes)

### 1️⃣ MongoDB Atlas (5 min)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up → Create Free Cluster
3. Database Access → Add User (save password!)
4. Network Access → Allow 0.0.0.0/0
5. Connect → Get connection string
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/skillbridge_db
   ```

### 2️⃣ Deploy Backend to Render (5 min)
1. Go to https://render.com → Sign in with GitHub
2. New → Web Service
3. Select repo: `Smart-Internship-Matching-Platform`
4. Settings:
   - Name: `skillbridge-api`
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
5. Environment Variables:
   - `PORT` = `5001`
   - `MONGO_URI` = (your MongoDB connection string)
   - `NODE_ENV` = `production`
6. Create → Wait for deploy
7. Copy URL: `https://skillbridge-api.onrender.com`

### 3️⃣ Deploy Frontend to Vercel (5 min)
1. Go to https://vercel.com/fah218s-projects
2. Add New → Project
3. Import: `Smart-Internship-Matching-Platform`
4. Settings:
   - Framework: `Vite`
   - Root Directory: `frontend`
   - Build: `npm run build`
   - Output: `dist`
5. Environment Variables:
   - `VITE_API_URL` = `https://skillbridge-api.onrender.com`
6. Deploy → Done! 🎉

### ✅ Test Your Deployment
1. Visit your Vercel URL
2. Register a student account
3. Complete profile
4. Test job matching

---

## 🔗 Important URLs

**Your Vercel Dashboard**: https://vercel.com/fah218s-projects
**Render Dashboard**: https://dashboard.render.com
**MongoDB Atlas**: https://cloud.mongodb.com

---

## 🆘 Need Help?

Check the full guide: `DEPLOYMENT.md`

Common issues:
- **Backend not responding**: Check Render logs for MongoDB connection errors
- **Frontend API errors**: Verify `VITE_API_URL` is set correctly in Vercel
- **CORS errors**: Ensure backend CORS is configured for your Vercel domain
