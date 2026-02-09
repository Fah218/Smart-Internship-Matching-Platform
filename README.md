# 🚀 Smart Internship Matching Platform

An AI-powered platform that connects students with their perfect internship opportunities using intelligent matching algorithms. Built with React, Node.js, Express, and MongoDB.

![Platform Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### For Students
- 🎯 **AI-Powered Matching**: Get matched with internships based on skills, location, and domain preferences
- 📄 **Resume Upload**: Upload your resume for enhanced matching
- 🔗 **GitHub Integration**: Link your GitHub profile to showcase your projects
- 📊 **Match Score Breakdown**: See detailed scoring for each opportunity
- ✅ **One-Click Applications**: Apply to internships instantly
- 📈 **Application Tracking**: Monitor your application status in real-time

### For Companies
- 🔍 **Smart Candidate Discovery**: Find candidates that match your requirements
- 📋 **Easy Job Posting**: Create job listings with detailed requirements
- 🎨 **Candidate Scoring**: View AI-generated match scores for each candidate
- 📧 **Direct Contact**: Reach out to candidates directly
- 📊 **Dashboard Analytics**: Track your job postings and applications

### Technical Highlights
- ⚡ **Real-time Updates**: Instant notifications and status updates
- 🔐 **Secure Authentication**: Role-based access control for students and companies
- 🎨 **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Responsive**: Works seamlessly on all devices
- 🚀 **Fast Performance**: Optimized for speed and efficiency

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File upload handling

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Fah218/Smart-Internship-Matching-Platform.git
cd Smart-Internship-Matching-Platform
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file from sample
cp .env.sample .env

# Update .env with your MongoDB URI if needed
# Default: mongodb://127.0.0.1:27017/smart_matching
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

## 🎯 Usage

### For Students
1. **Register**: Create an account as a student
2. **Complete Profile**: Add skills, location, domain, resume, and GitHub link
3. **Find Matches**: Navigate to "Find Internships" to see AI-matched opportunities
4. **Apply**: Click "Apply Now" on jobs that interest you
5. **Track**: Monitor your applications from the dashboard

### For Companies
1. **Register**: Create a company account
2. **Post Jobs**: Add internship listings with requirements
3. **View Matches**: See students matched to your job postings
4. **Contact Candidates**: Reach out to top matches directly
5. **Manage**: Track applications and update job status

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/smart_matching
```

### Proxy Configuration
The frontend is configured to proxy API requests to the backend. Check `frontend/vite.config.js`:
```javascript
proxy: {
  '/api': 'http://localhost:5001',
  '/uploads': 'http://localhost:5001'
}
```

## 📊 Matching Algorithm

The platform uses a sophisticated scoring system:

| Criteria | Weight | Description |
|----------|--------|-------------|
| Skills Match | 35% | Overlap between student skills and job requirements |
| Resume | 20% | Presence of uploaded resume |
| GitHub Profile | 15% | Active GitHub profile linked |
| Location | 15% | Geographic preference match |
| Domain | 10% | Field of study/work alignment |
| First-Time Bonus | 5% | Priority for first-time applicants |

**Total Score: 100 points**

## 🗂️ Project Structure

```
Smart-Internship-Matching-Platform/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Database schemas
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── middleware/       # Custom middleware
│   │   ├── app.js           # Express app setup
│   │   └── server.js        # Server entry point
│   ├── uploads/             # User uploaded files
│   ├── .env.sample          # Environment template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/
│   └── package.json
│
└── README.md
```

## 🚀 Deployment

### Backend Deployment (Railway/Render)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Configure redirects for SPA routing

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Fahad Furquan**
- GitHub: [@Fah218](https://github.com/Fah218)
- Repository: [Smart-Internship-Matching-Platform](https://github.com/Fah218/Smart-Internship-Matching-Platform)

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for better internship matching
- Designed to help students and companies connect efficiently

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Made with ❤️ by Fahad Furquan**
