import React from 'react';
import { ArrowRight, CheckCircle, Globe, Zap, User, Briefcase, FileCheck, Star, Users, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="space-y-24 pb-20">
            {/* Hero Section */}
            <section className="relative pt-20 pb-10 text-center px-4">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50 via-white to-white opacity-70"></div>

                <div className="space-y-6 max-w-5xl mx-auto">
                    <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm mb-4 animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-gray-600">AI-Powered Matching Live</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
                        Find Your Dream Internship <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                            With Perfect Precision
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Stop sorting through irrelevant listings. Our AI algorithm matches your unique skills and preferences with top companies looking for exactly what you offer.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
                        <Link to="/register" className="w-full sm:w-auto group bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center">
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 border border-gray-200 transition-all text-center">
                            How it works
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SkillBridge AI?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">We use advanced technology to simplify the recruitment process</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Zap,
                            color: "text-yellow-600 bg-yellow-50",
                            title: "Smart Matching",
                            desc: "Our rule-based AI analyzes 50+ data points to connect you with internships that actually fit your profile."
                        },
                        {
                            icon: Globe,
                            color: "text-blue-600 bg-blue-50",
                            title: "Fair Opportunity",
                            desc: "Special algorithms ensure rural and disadvantaged students get the visibility they deserve."
                        },
                        {
                            icon: CheckCircle,
                            color: "text-green-600 bg-green-50",
                            title: "Verified Companies",
                            desc: "We vet every company to ensure you get high-quality learning experiences and genuine mentorship."
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-300 border border-gray-100 shadow-sm hover:shadow-md">
                            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
                                <feature.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works - Steps */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-semibold tracking-wide uppercase text-sm">Simple Process</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">How It Works</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Get hired in 3 simple steps without the hassle</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>

                        {[
                            {
                                icon: User,
                                step: "1",
                                title: "Create Profile",
                                desc: "Sign up and build your profile with skills, bio, and resume."
                            },
                            {
                                icon: Briefcase,
                                step: "2",
                                title: "Get Matched",
                                desc: "Our AI instantly finds internships matching your criteria."
                            },
                            {
                                icon: FileCheck,
                                step: "3",
                                title: "Apply & Hire",
                                desc: "Apply with one click and track your application status."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-gray-50 mb-6 relative">
                                    <item.icon size={32} className="text-primary-600" />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                                        {item.step}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 max-w-xs">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 text-white overflow-hidden relative shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Built for Students, <br />Trusted by Companies</h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                Join thousands of students who have launched their careers through our platform.
                                We're changing how internships happen.
                            </p>
                            <div className="flex space-x-12">
                                <div>
                                    <div className="text-4xl font-bold text-primary-400 mb-1">500+</div>
                                    <div className="text-gray-400 font-medium">Companies</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-secondary-400 mb-1">10k+</div>
                                    <div className="text-gray-400 font-medium">Matches Made</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative hidden md:block">
                            {/* Floating Cards Graphic */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 transform rotate-3 hover:rotate-0 transition-transform duration-500 hover:scale-105 cursor-default">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white/20">JD</div>
                                    <div className="flex-1">
                                        <div className="h-2 w-24 bg-white/20 rounded mb-2"></div>
                                        <div className="h-2 w-16 bg-white/10 rounded"></div>
                                    </div>
                                    <div className="text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded">98% Match</div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white/20">TC</div>
                                    <div className="flex-1">
                                        <div className="h-2 w-28 bg-white/20 rounded mb-2"></div>
                                        <div className="h-2 w-20 bg-white/10 rounded"></div>
                                    </div>
                                    <div className="text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded">95% Match</div>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 transform -rotate-3 hover:rotate-0 transition-transform duration-500 w-48">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-500 rounded-full p-1"><CheckCircle size={14} /></div>
                                    <span className="font-medium text-sm">Resume Analyzed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {/* <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-1 mb-4 text-yellow-400">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-gray-600 mb-6 italic">"I created my profile and within 2 days I had 3 interview offers from companies that perfectly matched my skill set. Incredible platform!"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">AS</div>
                            <div>
                                <h4 className="font-bold text-gray-900">Alex Smith</h4>
                                <p className="text-xs text-gray-500">Computer Science Student</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-1 mb-4 text-yellow-400">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-gray-600 mb-6 italic">"As a recruiter, filtering resumes is a nightmare. This platform does the heavy lifting for us. We found our best intern here."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">TC</div>
                            <div>
                                <h4 className="font-bold text-gray-900">Sarah Jones</h4>
                                <p className="text-xs text-gray-500">HR Manager, TechCorp</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* CTA */}
            <section className="bg-primary-600 py-16 text-center text-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Career?</h2>
                    <p className="text-primary-100 mb-8 text-lg max-w-2xl mx-auto">
                        Don't let opportunities pass you by. Join SkillBridge AI today and find your perfect fit.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/register/student" className="bg-white text-primary-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
                            I'm a Student
                        </Link>
                        <Link to="/register/company" className="bg-primary-700 text-white border border-primary-500 px-8 py-3 rounded-xl font-bold hover:bg-primary-800 transition-colors">
                            I'm a Company
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
