import React from 'react';
import { UserPlus, Building, Sparkles, Handshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            role: "Student",
            title: "Create Your Profile",
            description: "Sign up and tell us about yourself. Input your education, skills, preferred location, and career interests. Our smart forms make it easy.",
            icon: UserPlus,
            color: "primary"
        },
        {
            id: 2,
            role: "Company",
            title: "Post Opportunities",
            description: "Companies post internships with specific requirements. We collect details on skills needed, location, and role type to find the best fit.",
            icon: Building,
            color: "secondary"
        },
        {
            id: 3,
            role: "AI Engine",
            title: "Smart Matching Logic",
            description: "Our rule-based algorithm analyzes compatibility instantly. We calculate scores based on skill overlap, location preference, and inclusivity bonuses.",
            icon: Sparkles,
            color: "accent",
            special: true
        },
        {
            id: 4,
            role: "Everyone",
            title: "Perfect Connections",
            description: "Students get a dashboard of matched internships. Companies get a ranked list of top candidates. No more endless searching.",
            icon: Handshake,
            color: "green"
        }
    ];

    return (
        <div className="min-h-screen pb-20">
            {/* Header Section */}
            <section className="pt-16 pb-12 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    How <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">SkillBridge AI</span> Works
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    We've reimagined the internship search process. Instead of applying to black holes, let our technology find the perfect match for you.
                </p>
            </section>

            {/* Steps Visual Journey */}
            <section className="max-w-5xl mx-auto px-4">
                <div className="relative">
                    {/* Vertical connection line for desktop */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-200 via-secondary-200 to-green-200 rounded-full -z-10"></div>

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => (
                            <div key={step.id} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Content Card */}
                                <div className="flex-1 w-full">
                                    <div className={`p-8 rounded-2xl border bg-white shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group
                    ${step.special ? 'border-secondary-200 shadow-secondary-100/50' : 'border-gray-100'}
                  `}>
                                        {step.special && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 to-primary-50 opacity-50 -z-10"></div>
                                        )}

                                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4
                      ${step.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                                                step.color === 'secondary' ? 'bg-secondary-100 text-secondary-700' :
                                                    step.color === 'green' ? 'bg-green-100 text-green-700' :
                                                        'bg-amber-100 text-amber-700'}
                    `}>
                                            <span>Step {step.id}</span>
                                            <span>•</span>
                                            <span>{step.role}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Icon */}
                                <div className="relative z-10 flex-shrink-0">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg
                    ${step.color === 'primary' ? 'bg-primary-500 text-white' :
                                            step.color === 'secondary' ? 'bg-secondary-500 text-white' :
                                                step.color === 'green' ? 'bg-green-500 text-white' :
                                                    'bg-amber-500 text-white animate-pulse'}
                  `}>
                                        <step.icon size={28} />
                                    </div>
                                </div>

                                {/* Empty spacer for layout balance */}
                                <div className="flex-1 hidden md:block"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Logic Deep Dive Section */}
            <section className="mt-24 max-w-4xl mx-auto px-4">
                <div className="glass-panel p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-4 flex items-center">
                                <Sparkles className="mr-3 text-amber-400" />
                                The Matching "Secret Sauce"
                            </h2>
                            <p className="text-slate-300 mb-6 text-lg">
                                Unlike simple keyword searches, we use a weighted scoring algorithm to ensure quality and fairness:
                            </p>

                            <div className="space-y-4">
                                {[
                                    { label: "Skill Match (60%)", desc: "Checks overlap between student skills and job requirements." },
                                    { label: "Location Match (20%)", desc: "Prioritizes preferred cities or remote work." },
                                    { label: "Fairness Bonus (20%)", desc: "Boosts visibility for rural & disadvantaged candidates." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                                        <div>
                                            <span className="font-bold text-white block">{item.label}</span>
                                            <span className="text-slate-400 text-sm">{item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Representation of Algorithm */}
                        <div className="w-full md:w-1/3 bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                            <div className="space-y-3 font-mono text-sm max-w-full overflow-hidden">
                                <div className="flex justify-between text-green-400">
                                    <span>Score</span>
                                    <span>=</span>
                                </div>
                                <div className="pl-4 border-l-2 border-white/20 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">Skills</span>
                                        <span className="text-amber-400">× 0.6</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">Location</span>
                                        <span className="text-amber-400">× 0.2</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">Bonus</span>
                                        <span className="text-amber-400">× 0.2</span>
                                    </div>
                                </div>
                                <div className="h-px bg-white/20 my-2"></div>
                                <div className="text-center text-xs text-slate-500">
                                    Sorted Descending
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to find your match?</h2>
                <div className="flex justify-center gap-4">
                    <Link to="/register/student" className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25 flex items-center">
                        Join as Student <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                    <Link to="/register/company" className="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                        Hire Talent
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
