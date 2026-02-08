import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import RoleSelection from './pages/auth/RoleSelection';
import StudentRegister from './pages/auth/StudentRegister';
import CompanyRegister from './pages/auth/CompanyRegister';
import HowItWorks from './pages/home/HowItWorks';
import StudentMatches from "./pages/StudentMatches";
import CreateJob from "./pages/company/CreateJob";
import CompanyMatches from './pages/company/CompanyMatches';
import StudentDashboard from './pages/student/StudentDashboard';


// Placeholder components
const Login = () => <div className="p-10 text-center text-3xl">Login Page (Coming Soon)</div>;
const Dashboard = () => <div className="p-10 text-center text-3xl">Dashboard (Coming Soon)</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RoleSelection />} />
          <Route path="register/student" element={<StudentRegister />} />
          <Route path="register/company" element={<CompanyRegister />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/matches" element={<StudentMatches />} />
          <Route path="/company/create-job" element={<CreateJob />} />
          <Route path="/company/matches" element={<CompanyMatches />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
