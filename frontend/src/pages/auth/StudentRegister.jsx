import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.fullName,
            email: formData.email
        };

        try {
            const response = await fetch("/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Registration failed");
            }

            const student = await response.json();

            // Save student id for later use
            localStorage.setItem("studentId", student._id);

            // Show success message
            alert(`Account created successfully! Please login to continue.`);

            // Redirect to login page
            navigate("/login");

        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <div className="min-h-[calc(100vh-64px)] py-12 px-4 flex justify-center items-center">
            <div className="max-w-md w-full">
                <div className="mb-8">
                    <Link to="/register" className="text-gray-500 hover:text-gray-900 flex items-center mb-4 transition-colors">
                        <ArrowLeft size={18} className="mr-2" />
                        Back to Role Selection
                    </Link>
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                            <GraduationCap size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
                    </div>
                    <p className="text-gray-600">Create your account to start matching.</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary-600 text-white py-2.5 rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg shadow-primary-500/30"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600 text-sm">
                    Already have an account? <Link to="/login" className="text-primary-600 font-medium hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default StudentRegister;
