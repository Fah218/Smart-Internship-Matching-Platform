import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Mail, Lock, User, MapPin, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const CompanyRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        password: '',
        industry: '',
        location: '',
        website: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            companyName: formData.companyName,
            email: formData.email,
            password: formData.password, // Include password in payload
            industry: formData.industry,
            location: formData.location,
            website: formData.website,
            description: formData.description
        };

        try {
            const response = await fetch("/api/companies", {
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

            const company = await response.json();

            // Save company data temporarily
            localStorage.setItem("companyId", company._id);
            localStorage.setItem("companyName", company.companyName);

            // Show success message
            alert(`Company account created successfully! Please login to continue.`);

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
                        <div className="p-2 bg-secondary-100 rounded-lg text-secondary-600">
                            <Building2 size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
                    </div>
                    <p className="text-gray-600">Create a company account to post internships.</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Acme Inc."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="hr@example.com"
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
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                                <input
                                    type="text"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Tech"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Remote / City"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Website (Optional)</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="https://company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all h-24 resize-none"
                                placeholder="Tell us about your company..."
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-secondary-600 text-white py-2.5 rounded-lg hover:bg-secondary-700 transition-colors font-medium shadow-lg shadow-secondary-500/30"
                    >
                        Create Company Account
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600 text-sm">
                    Already have an account? <Link to="/login" className="text-secondary-600 font-medium hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default CompanyRegister;
