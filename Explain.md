# Smart Internship Matching Platform - Project Documentation

## 1. Project Overview
**Smart Internship Matching Platform** is a full-stack web application designed to connect students with companies using a rule-based AI matching system. Unlike traditional job boards where candidates apply blindly, this platform strictly matches candidates based on weighted scores derived from their skills, location, and background.

### Core Philosophy
- **Precision:** Matches are based on data (Skills + Location), not just keywords.
- **Fairness:** The algorithm includes a specific "Fairness Bonus" to boost visibility for rural and disadvantaged students.
- **Efficiency:** Companies get a ranked list of candidates; Students get a dashboard of best-fit roles.

---

## 2. How It Works (User Flow)

The platform caters to two distinct user types with separate workflows:

### 🎓 For Students
1.  **Role Selection:** Choose "I am a Student" on the registration page.
2.  **Profile Creation:** Complete a detailed profile including:
    -   **Education:** University and Major.
    -   **Skills:** A comma-separated list of technical skills (e.g., React, Python).
    -   **Location:** Preferred city or remote work.
    -   **Background:** Option to self-identify for the fairness bonus.
3.  **Matching:** The dashboard displays internships sorted by a "Match %" score.

### 🏢 For Companies
1.  **Role Selection:** Choose "I am Hiring" on the registration page.
2.  **Company Profile:** Register the company with industry and location details.
3.  **Post Internships:** Create job listings with required skills and seat availability.
4.  **Recruitment:** View a leaderboard of students who match the criteria, ranked by score.

### 🧠 The AI Matching Logic (Secret Sauce)
The backend calculates a match score (0-100%) using a weighted algorithm:
-   **60% - Skill Match:** (Matched Skills / Required Skills) * 60
-   **20% - Location Match:** full points if City matches or Job is Remote.
-   **20% - Fairness Bonus:** Added if the student meets criteria (capped at 100%).

---

## 3. Technical Architecture

### Frontend (Current Status)
-   **Framework:** React (Vite) for fast performance.
-   **Styling:** Tailwind CSS v4 with a custom "Premium" theme using CSS variables.
-   **Icons:** Lucide React for consistent, modern vector icons.
-   **Routing:** React Router v6 used for seamless navigation between pages.
-   **Design System:** Glassmorphism (`.glass-panel`) and gradients (Sky Blue to Fuchsia) creates a modern, trustworthy aesthetic.

### Backend (Planned)
-   **Runtime:** Node.js + Express.
-   **Database:** MongoDB Atlas (NoSQL) for flexible schema storage.
-   **Auth:** JWT (JSON Web Tokens) for secure session management.

---

## 4. Development Journey (Step-by-Step)

Here is the chronological order of steps taken to build the project so far:

### Step 1: Project Initialization
-   Created the project structure with separate `frontend` and `backend` directories.
-   Initialized the frontend using `Vite` for a modern React environment.
-   Configured **Tailwind CSS v4**, setting up a specialized color palette (`primary` blue, `secondary` purple) in `src/index.css`.

### Step 2: Architecture & Routing
-   Established a scalable folder structure:
    -   `src/pages`: For main views (Home, Auth, Dashboard).
    -   `src/components`: For reusable UI parts (Layout, Navbar, Cards).
    -   `src/context`: For future state management.
-   Implemented `React Router` in `App.jsx` to handle navigation between Home, Login, and Registration.

### Step 3: Layout & Navigation
-   Built a responsive `Layout` component containing:
    -   A sticky **Navbar** with a glass effect.
    -   Conditional rendering for mobile vs desktop views.
    -   A consistent Footer.

### Step 4: The "Wow" Landing Page
-   Designed `Home.jsx` to be visually striking.
-   **Hero Section:** Added distinct typography and "Get Started" call-to-actions.
-   **Stats Section:** Created a sophisticated visual representation of the matching process using abstract shapes and data points.

### Step 5: Advanced Registration Flow
-   Moved away from a generic signup form.
-   Created a **Role Selection** page (`/register`) to split users into "Student" or "Company" paths early.
-   Built dedicated forms (`StudentRegister.jsx` & `CompanyRegister.jsx`) tailored to capture the specific data needed for the AI matching algorithm.

### Step 6: "How It Works" Visualization
-   Developed `HowItWorks.jsx` to transparently explain the platform logic.
-   Visualized the "Secret Sauce" algorithm using a code-block style explanation to build trust with technical users.
-   Connected this page to the main navigation for easy access.

---

## 5. Next Steps
1.  **Backend Setup:** Initialize the Express server.
2.  **Database Connection:** Connect to MongoDB Atlas.
3.  **API Development:** Create endpoints for User Auth and Internship Posting.
4.  **Matching Engine:** Implement the scoring logic in a Node.js utility function.
