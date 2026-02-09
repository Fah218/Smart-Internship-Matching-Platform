import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Briefcase, Users, TrendingUp } from "lucide-react";

const CompanyDashboard = () => {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [stats, setStats] = useState({
        activeJobs: 0,
        totalMatches: 0,
        avgMatchScore: 0,
        loading: true
    });

    useEffect(() => {
        // Get company data from localStorage
        const userData = localStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            setCompany(user);
            fetchCompanyStats(user);
        } else {
            // If no user data, redirect to login
            navigate("/login");
        }
    }, [navigate]);

    const fetchCompanyStats = async (user) => {
        try {
            const companyEmail = user.email;
            const companyName = user.companyName;

            // Fetch all jobs
            const response = await fetch(`/api/jobs`);
            const allJobs = await response.json();

            // Filter jobs by company
            const companyJobs = allJobs.filter(
                job => job.companyEmail === companyEmail ||
                    job.company === companyName ||
                    job.companyName === companyName
            );

            // Fetch matches for each job
            const jobsWithMatches = await Promise.all(
                companyJobs.map(async (job) => {
                    try {
                        const matchResponse = await fetch(`/api/jobs/${job._id}/matches`);
                        const matches = await matchResponse.json();
                        return { ...job, matches };
                    } catch (err) {
                        return { ...job, matches: [] };
                    }
                })
            );

            // Calculate stats
            const totalMatches = jobsWithMatches.reduce((sum, job) => sum + (job.matches?.length || 0), 0);

            const avgScore = jobsWithMatches.length > 0
                ? Math.round(
                    jobsWithMatches.reduce((sum, job) => {
                        const jobAvg = job.matches?.length
                            ? job.matches.reduce((s, m) => s + m.totalScore, 0) / job.matches.length
                            : 0;
                        return sum + jobAvg;
                    }, 0) / jobsWithMatches.length
                )
                : 0;

            setStats({
                activeJobs: companyJobs.length,
                totalMatches: totalMatches,
                avgMatchScore: avgScore,
                loading: false
            });
        } catch (err) {
            console.error("Error fetching stats:", err);
            setStats(prev => ({ ...prev, loading: false }));
        }
    };

    const handleCreateJob = () => {
        navigate("/company/create-job");
    };

    const handleViewMatches = () => {
        navigate("/company/matches");
    };

    if (!company) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-2">
                    <div className="p-3 bg-secondary-100 rounded-lg text-secondary-600">
                        <Building2 size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome, {company.companyName}!
                        </h1>
                        <p className="text-gray-600">{company.email}</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-panel p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-600 text-sm font-medium">Active Jobs</h3>
                        <Briefcase className="text-secondary-600" size={20} />
                    </div>
                    {stats.loading ? (
                        <div className="animate-pulse">
                            <div className="h-9 bg-gray-200 rounded w-16 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </div>
                    ) : (
                        <>
                            <p className="text-3xl font-bold text-gray-900">{stats.activeJobs}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {stats.activeJobs === 0 ? 'No jobs posted yet' :
                                    stats.activeJobs === 1 ? '1 job posting' :
                                        `${stats.activeJobs} job postings`}
                            </p>
                        </>
                    )}
                </div>

                <div className="glass-panel p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-600 text-sm font-medium">Total Matches</h3>
                        <Users className="text-secondary-600" size={20} />
                    </div>
                    {stats.loading ? (
                        <div className="animate-pulse">
                            <div className="h-9 bg-gray-200 rounded w-16 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </div>
                    ) : (
                        <>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalMatches}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {stats.totalMatches === 0 ? 'No matches yet' :
                                    stats.totalMatches === 1 ? '1 candidate matched' :
                                        `${stats.totalMatches} candidates matched`}
                            </p>
                        </>
                    )}
                </div>

                <div className="glass-panel p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-600 text-sm font-medium">Avg. Match Score</h3>
                        <TrendingUp className="text-secondary-600" size={20} />
                    </div>
                    {stats.loading ? (
                        <div className="animate-pulse">
                            <div className="h-9 bg-gray-200 rounded w-16 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </div>
                    ) : (
                        <>
                            <p className="text-3xl font-bold text-gray-900">{stats.avgMatchScore}%</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {stats.avgMatchScore === 0 ? 'No data yet' :
                                    stats.avgMatchScore >= 80 ? 'Excellent matches!' :
                                        stats.avgMatchScore >= 60 ? 'Good matches' :
                                            'Fair matches'}
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-panel p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={handleCreateJob}
                        className="p-6 border-2 border-secondary-200 rounded-xl hover:border-secondary-600 hover:bg-secondary-50 transition-all text-left group"
                    >
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="p-2 bg-secondary-100 rounded-lg text-secondary-600 group-hover:bg-secondary-600 group-hover:text-white transition-colors">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Post a Job</h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Create a new internship opportunity and find the perfect candidates
                        </p>
                    </button>

                    <button
                        onClick={handleViewMatches}
                        className="p-6 border-2 border-secondary-200 rounded-xl hover:border-secondary-600 hover:bg-secondary-50 transition-all text-left group"
                    >
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="p-2 bg-secondary-100 rounded-lg text-secondary-600 group-hover:bg-secondary-600 group-hover:text-white transition-colors">
                                <Users size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">View Matches</h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                            See AI-powered student matches for your job postings
                        </p>
                    </button>
                </div>
            </div>

            {/* Getting Started */}
            <div className="mt-8 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-xl p-6 border border-secondary-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    🚀 Getting Started
                </h3>
                <p className="text-gray-700 mb-4">
                    Start by posting your first internship opportunity. Our AI will automatically match you with the best candidates!
                </p>
                <button
                    onClick={handleCreateJob}
                    className="bg-secondary-600 text-white px-6 py-2 rounded-lg hover:bg-secondary-700 transition-colors font-medium"
                >
                    Post Your First Job
                </button>
            </div>
        </div>
    );
};

export default CompanyDashboard;
