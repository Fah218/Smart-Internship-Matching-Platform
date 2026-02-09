import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Building2, GraduationCap, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { getApiUrl } from '../../config/api';

const Login = () => {
    const [activeTab, setActiveTab] = useState('student'); // 'student' or 'company'
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = activeTab === 'student'
                ? '/api/auth/login/student'
                : '/api/auth/login/company';

            const response = await fetch(getApiUrl(endpoint), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Send both email and password
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Save user data to localStorage
            localStorage.setItem('user', JSON.stringify(data.user));

            if (activeTab === 'student') {
                localStorage.setItem('studentId', data.user.id);
            }

            // Redirect based on role
            if (activeTab === 'student') {
                navigate('/student/dashboard');
            } else {
                navigate('/company/dashboard');
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex bg-gray-50/50">
            {/* Left Side - Branding & Visuals */}
            <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden transition-colors duration-500 ease-in-out
                ${activeTab === 'student' ? 'bg-primary-900' : 'bg-slate-900'}
            `}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                {/* Abstract Shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 w-full h-full flex flex-col justify-center px-16 text-white">
                    <div className="mb-8">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20 backdrop-blur-sm
                            ${activeTab === 'student' ? 'text-primary-200' : 'text-secondary-200'}
                        `}>
                            {activeTab === 'student' ? 'For Candidates' : 'For Employers'}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        {activeTab === 'student'
                            ? "Unlock Your Dream Career Path"
                            : "Connect with Top Tier Talent"}
                    </h2>

                    <p className="text-lg text-gray-300 mb-10 max-w-md leading-relaxed">
                        {activeTab === 'student'
                            ? "Join thousands of students finding internships that perfectly match their skills and aspirations."
                            : "Streamline your recruitment process with our AI-powered matching engine designed for modern companies."}
                    </p>

                    <div className="space-y-4">
                        {[
                            activeTab === 'student' ? 'AI-Powered Job Matching' : 'Smart Candidate Analysis',
                            activeTab === 'student' ? 'Real-time Application Tracking' : 'Automated Resume Screening',
                            activeTab === 'student' ? 'Skill-based Recommendations' : 'Quality Hires, Faster'
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                                <div className={`p-1 rounded-full ${activeTab === 'student' ? 'bg-primary-500/20 text-primary-300' : 'bg-secondary-500/20 text-secondary-300'}`}>
                                    <CheckCircle2 size={16} />
                                </div>
                                <span className="text-gray-200 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
                <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please sign in to access your account
                        </p>
                    </div>

                    {/* Role Toggles */}
                    <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100/80 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setActiveTab('student')}
                            className={`flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300
                                ${activeTab === 'student'
                                    ? 'bg-white text-primary-700 shadow-sm ring-1 ring-gray-200'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}
                            `}
                        >
                            <GraduationCap size={18} />
                            <span>Student</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('company')}
                            className={`flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300
                                ${activeTab === 'company'
                                    ? 'bg-white text-secondary-700 shadow-sm ring-1 ring-gray-200'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}
                            `}
                        >
                            <Building2 size={18} />
                            <span>Company</span>
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-shake">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">Login failed</h3>
                                    <div className="text-sm text-red-700 mt-1">{error}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50/30 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all sm:text-sm"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    {/* <a href="#" className="text-xs font-medium text-primary-600 hover:text-primary-500">
                                        Forgot password?
                                    </a> */}
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50/30 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all sm:text-sm"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2
                                    ${activeTab === 'student'
                                        ? 'bg-primary-600 hover:bg-primary-700 hover:shadow-primary-500/30 focus:ring-primary-500'
                                        : 'bg-secondary-600 hover:bg-secondary-700 hover:shadow-secondary-500/30 focus:ring-secondary-500'}
                                    ${loading ? 'opacity-70 cursor-wait' : ''}
                                `}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        Sign In <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">New around here?</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                to="/register"
                                className={`font-bold hover:underline transition-colors
                                    ${activeTab === 'student' ? 'text-primary-600 hover:text-primary-700' : 'text-secondary-600 hover:text-secondary-700'}
                                `}
                            >
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
