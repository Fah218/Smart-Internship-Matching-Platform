import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Building2, ArrowRight, Sparkles } from 'lucide-react';

const RoleSelection = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-200/30 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-4xl w-full">
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 shadow-sm">
                        <Sparkles className="w-4 h-4 text-secondary-500" />
                        <span className="text-sm font-medium text-gray-600">Start your journey today</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        How do you want to join?
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose your role to get access to our AI-powered matching platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Student Card */}
                    <Link to="/register/student" className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative h-full bg-white border border-gray-100 p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 text-primary-600 group-hover:scale-110 transition-transform duration-300">
                                    <GraduationCap size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">I am a Student</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Create your profile, list your skills, and let our AI match you with the perfect internship opportunities.
                                </p>
                                <ul className="space-y-3 mb-8 text-sm text-gray-500">
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>Smart skill analysis</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>Personalized matches</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>Fair opportunity visibility</li>
                                </ul>
                            </div>
                            <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform">
                                Create Student Profile <ArrowRight className="ml-2 w-5 h-5" />
                            </div>
                        </div>
                    </Link>

                    {/* Company Card */}
                    <Link to="/register/company" className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative h-full bg-white border border-gray-100 p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="w-16 h-16 bg-secondary-50 rounded-2xl flex items-center justify-center mb-6 text-secondary-600 group-hover:scale-110 transition-transform duration-300">
                                    <Building2 size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">I am Hiring</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Post internships and get a ranked list of the best candidates instantly using our matching engine.
                                </p>
                                <ul className="space-y-3 mb-8 text-sm text-gray-500">
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-2"></span>Detailed candidate ranking</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-2"></span>Automated skill verification</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-2"></span>Streamlined simplified process</li>
                                </ul>
                            </div>
                            <div className="flex items-center text-secondary-600 font-semibold group-hover:translate-x-2 transition-transform">
                                Create Company Profile <ArrowRight className="ml-2 w-5 h-5" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
