import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Mail, Lock, User, MapPin, Briefcase } from 'lucide-react';

const StudentRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        education: '',
        city: '',
        skills: '',
        interests: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering student:', formData);
        // TODO: Connect to backend
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                            <div className="relative">
                                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="University / Major"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        placeholder="New York"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Field</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <select
                                        name="interests"
                                        value={formData.interests}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                                    >
                                        <option value="">Select Field</option>
                                        <option value="tech">Technology</option>
                                        <option value="business">Business</option>
                                        <option value="design">Design</option>
                                        <option value="engineering">Engineering</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                            <textarea
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all h-24 resize-none"
                                placeholder="React, Node.js, Python, Data Analysis..."
                            />
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
