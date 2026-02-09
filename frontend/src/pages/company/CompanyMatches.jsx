import React, { useEffect, useState } from "react";
import { getApiUrl } from '../../config/api';
import { useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  MapPin,
  Star,
  TrendingUp,
  Award,
  Mail,
  Code,
  Target,
  ChevronDown,
  ChevronUp,
  Github,
  FileText
} from "lucide-react";

const CompanyMatches = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedJob, setExpandedJob] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCompanyJobs();
  }, []);
  const fetchCompanyJobs = async () => {
    try {
      // Get company data from localStorage
      const userData = localStorage.getItem("user");
      if (!userData) {
        navigate("/login");
        return;
      }
      const user = JSON.parse(userData);
      const companyEmail = user.email;
      const companyName = user.companyName;
      // Fetch all jobs first, then filter on frontend
      // This handles both old jobs (with only company field) and new jobs (with companyEmail)
      const response = await fetch(getApiUrl(`/api/jobs`));
      const allJobs = await response.json();
      // Filter jobs by company email or company name
      const companyJobs = allJobs.filter(
        job => job.companyEmail === companyEmail ||
          job.company === companyName ||
          job.companyName === companyName
      );
      // Fetch matches for each job
      const jobsWithMatches = await Promise.all(
        companyJobs.map(async (job) => {
          try {
            const matchResponse = await fetch(getApiUrl(`/api/jobs/${job._id}/matches`));
            const matches = await matchResponse.json();
            return { ...job, matches };
          } catch (err) {
            return { ...job, matches: [] };
          }
        })
      setJobs(jobsWithMatches);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };
  const toggleJobExpansion = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-blue-600 bg-blue-50";
    if (score >= 40) return "text-yellow-600 bg-yellow-50";
    return "text-gray-600 bg-gray-50";
  const getScoreBadge = (score) => {
    if (score >= 80) return { text: "Excellent Match", color: "bg-green-500" };
    if (score >= 60) return { text: "Good Match", color: "bg-blue-500" };
    if (score >= 40) return { text: "Fair Match", color: "bg-yellow-500" };
    return { text: "Low Match", color: "bg-gray-500" };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading matches...</p>
        </div>
      </div>
    );
  }
  if (jobs.length === 0) {
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="text-center py-16">
          <div className="p-4 bg-secondary-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Briefcase size={40} className="text-secondary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Jobs Posted Yet</h2>
          <p className="text-gray-600 mb-6">
            Post your first job to start finding talented candidates!
          </p>
          <button
            onClick={() => navigate("/company/create-job")}
            className="bg-secondary-600 text-white px-6 py-3 rounded-lg hover:bg-secondary-700 transition-colors font-medium"
          >
            Post a Job
          </button>
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Matches</h1>
        <p className="text-gray-600">
          AI-powered matching for your job postings
        </p>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Total Jobs</h3>
            <Briefcase className="text-secondary-600" size={20} />
          <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
            <h3 className="text-gray-600 text-sm font-medium">Total Matches</h3>
            <Users className="text-secondary-600" size={20} />
          <p className="text-3xl font-bold text-gray-900">
            {jobs.reduce((sum, job) => sum + (job.matches?.length || 0), 0)}
            <h3 className="text-gray-600 text-sm font-medium">Avg. Match Score</h3>
            <TrendingUp className="text-secondary-600" size={20} />
            {jobs.length > 0
              ? Math.round(
                jobs.reduce((sum, job) => {
                  const avgScore = job.matches?.length
                    ? job.matches.reduce((s, m) => s + m.totalScore, 0) / job.matches.length
                    : 0;
                  return sum + avgScore;
                }, 0) / jobs.length
              )
              : 0}
            %
      {/* Jobs List */}
      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job._id} className="glass-panel overflow-hidden">
            {/* Job Header */}
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleJobExpansion(job._id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                    <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                      {job.matches?.length || 0} matches
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                      {job.isRemote && (
                        <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                          Remote
                        </span>
                      )}
                    </div>
                      <Target size={16} />
                      <span>{job.domain}</span>
                  <div className="flex flex-wrap gap-2">
                    {job.skillsRequired?.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
                <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  {expandedJob === job._id ? (
                    <ChevronUp size={20} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            {/* Matched Candidates */}
            {expandedJob === job._id && (
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                {job.matches?.length === 0 ? (
                  <div className="text-center py-8">
                    <Users size={48} className="text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No candidates matched yet</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Check back later as students complete their profiles
                    </p>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Matched Candidates ({job.matches.length})
                    </h3>
                    {job.matches
                      .sort((a, b) => b.totalScore - a.totalScore)
                      .map((match, idx) => {
                        const badge = getScoreBadge(match.totalScore);
                        return (
                          <div
                            key={match.studentId || idx}
                            className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="text-lg font-semibold text-gray-900">
                                    {match.name}
                                  </h4>
                                  <span className={`px-2 py-1 ${badge.color} text-white rounded text-xs font-medium`}>
                                    {badge.text}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600 text-sm">
                                  <Mail size={14} />
                                  <span>{match.email}</span>
                              </div>
                              <div className={`text-right px-4 py-2 rounded-lg ${getScoreColor(match.totalScore)}`}>
                                <div className="text-2xl font-bold">{match.totalScore}%</div>
                                <div className="text-xs">Match Score</div>
                            </div>
                            {/* Score Breakdown */}
                            {match.breakdown && (
                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <h5 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                                  Match Breakdown
                                </h5>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                  <div className="flex items-center space-x-2">
                                    <div className="p-2 bg-purple-50 rounded text-purple-600">
                                      <Code size={16} />
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500">Skills</p>
                                      <p className="font-bold text-gray-900">{match.breakdown.skillMatch}/35</p>
                                  </div>
                                    <div className="p-2 bg-green-50 rounded text-green-600">
                                      <MapPin size={16} />
                                      <p className="text-xs text-gray-500">
                                        Location
                                        {/* If location > 0, show matched location? No space. */}
                                      </p>
                                      <p className="font-bold text-gray-900">{match.breakdown.location}/15</p>
                                    <div className="p-2 bg-blue-50 rounded text-blue-600">
                                      <Target size={16} />
                                      <p className="text-xs text-gray-500">Domain</p>
                                      <p className="font-bold text-gray-900">{match.breakdown.domain}/10</p>
                                    <div className="p-2 bg-yellow-50 rounded text-yellow-600">
                                      <Award size={16} />
                                      <p className="text-xs text-gray-500">First-Time</p>
                                      <p className="font-bold text-gray-900">{match.breakdown.firstTime}/5</p>
                                    <div className="p-2 bg-gray-50 rounded text-gray-700">
                                      <Github size={16} />
                                      <p className="text-xs text-gray-500">GitHub</p>
                                      <p className="font-bold text-gray-900">{match.breakdown.github}/15</p>
                                    <div className="p-2 bg-red-50 rounded text-red-600">
                                      <FileText size={16} />
                                      <p className="text-xs text-gray-500">Resume Analysis</p>
                                      <p className="font-bold text-gray-900">{match.breakdown.resumeAnalysis}/20</p>
                                {/* Action Buttons */}
                                <div className="flex gap-3 mt-4">
                                  {match.githubLink ? (
                                    <a
                                      href={match.githubLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                      <Github size={14} className="mr-2" />
                                      View GitHub
                                    </a>
                                  ) : (
                                    <span className="flex-1 flex items-center justify-center px-3 py-2 border border-dashed border-gray-200 rounded-lg text-sm text-gray-400 bg-gray-50 cursor-not-allowed">
                                      No GitHub
                                    </span>
                                  )}
                                  {match.resume ? (
                                      href={`/${match.resume}`}
                                      className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors shadow-sm"
                                      <FileText size={14} className="mr-2" />
                                      View Resume
                                      No Resume
                                  <button
                                    onClick={() => alert(`Mail sent successfully to ${match.name}!`)}
                                    className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors shadow-sm"
                                  >
                                    <Mail size={14} className="mr-2" />
                                    Contact
                                  </button>
                                <p className="text-xs text-center text-gray-400 mt-3 italic">
                                  * Links and scores update automatically when the candidate updates their profile.
                                </p>
                            )}
                          </div>
                        );
                      })}
                )}
            )}
        ))}
    </div>
  );
};
export default CompanyMatches;
