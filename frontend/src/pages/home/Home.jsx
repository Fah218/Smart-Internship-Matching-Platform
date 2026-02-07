import React from 'react';
import { ArrowRight, CheckCircle, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 text-center">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100 via-white to-white opacity-70"></div>

                <div className="space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm mb-4">
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

                    <div className="flex justify-center items-center space-x-4 pt-8">
                        <Link to="/register" className="group bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 flex items-center">
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/how-it-works" className="px-8 py-4 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 border border-gray-200 transition-all">
                            How it works
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        icon: Zap,
                        title: "Smart Matching",
                        desc: "Our rule-based AI analyzes 50+ data points to connect you with internships that actually fit your profile."
                    },
                    {
                        icon: Globe,
                        title: "Fair Opportunity",
                        desc: "Special algorithms ensure rural and disadvantaged students get the visibility they deserve."
                    },
                    {
                        icon: CheckCircle,
                        title: "Verified Companies",
                        desc: "We vet every company to ensure you get high-quality learning experiences and genuine mentorship."
                    }
                ].map((feature, idx) => (
                    <div key={idx} className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-300">
                        <div className="h-12 w-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                            <feature.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </section>

            {/* Stats Section */}
            <section className="bg-surface rounded-3xl p-12 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-slate-900 -z-10"></div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for Students, <br />Trusted by Companies</h2>
                        <p className="text-gray-300 mb-8 text-lg">
                            Join thousands of students who have launched their careers through our platform.
                            We're changing how internships happen.
                        </p>
                        <div className="flex space-x-12">
                            <div>
                                <div className="text-4xl font-bold text-primary-400 mb-1">500+</div>
                                <div className="text-gray-400">Companies</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-secondary-400 mb-1">10k+</div>
                                <div className="text-gray-400">Matches Made</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        {/* Abstract visual representation of matching */}
                        <div className="aspect-square rounded-full bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 animate-pulse absolute inset-0 blur-3xl"></div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative z-10">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">JD</div>
                                <div className="flex-1">
                                    <div className="h-2 w-24 bg-white/20 rounded mb-2"></div>
                                    <div className="h-2 w-16 bg-white/10 rounded"></div>
                                </div>
                                <div className="text-green-400 font-bold">98% Match</div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">TC</div>
                                <div className="flex-1">
                                    <div className="h-2 w-28 bg-white/20 rounded mb-2"></div>
                                    <div className="h-2 w-20 bg-white/10 rounded"></div>
                                </div>
                                <div className="text-green-400 font-bold">95% Match</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
