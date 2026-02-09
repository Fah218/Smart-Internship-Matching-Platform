import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  Building,
  Star,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Loader,
  Code,
  Target,
  Globe
} from "lucide-react";

const StudentMatches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(null); // Track which job is being applied to

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
      navigate("/login");
      return;
    }

    // Fetch matches and applications in parallel
    Promise.all([
      fetch(`/api/students/${studentId}/matches`).then(res => {
        if (!res.ok) throw new Error("Failed to fetch matches");
        return res.json();
      }),
      fetch(`/api/applications/student/${studentId}`).then(res => res.json())
    ])
      .then(([matchesData, appsData]) => {
        if (Array.isArray(matchesData)) {
          setMatches(matchesData);
        } else {
          console.error("Invalid matches data:", matchesData);
          setMatches([]);
        }

        if (Array.isArray(appsData)) {
          setApplications(appsData);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMatches([]); // Ensure matches is array on error
        setLoading(false);
      });
  }, [navigate]);

  const handleApply = async (jobId) => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) return;

    setApplying(jobId);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, jobId })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Application failed");
      }

      const newApp = await res.json();
      setApplications([...applications, newApp]);
      alert("Application submitted successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setApplying(null);
    }
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return { text: "Excellent Match", color: "bg-green-100 text-green-700 border-green-200" };
    if (score >= 60) return { text: "Good Match", color: "bg-blue-100 text-blue-700 border-blue-200" };
    if (score >= 40) return { text: "Fair Match", color: "bg-yellow-100 text-yellow-700 border-yellow-200" };
    return { text: "Low Match", color: "bg-gray-100 text-gray-700 border-gray-200" };
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-gray-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <Loader className="animate-spin h-10 w-10 text-primary-600 mx-auto mb-4" />
          <p className="text-gray-500">Finding your best matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recommended Internships
          </h1>
          <p className="text-gray-600">
            AI-curated opportunities based on your skills and preferences
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg border border-primary-100">
          <Star size={18} className="fill-current" />
          <span className="font-medium">{matches.length} Matches Found</span>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-4 bg-gray-50 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Briefcase size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Matches Yet</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We couldn't find internships matching your profile perfectly. Try updating your skills or domain preference.
          </p>
          <button
            onClick={() => navigate("/student/dashboard")}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
          >
            Update Profile
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {matches.map((match) => {
            if (!match.breakdown) return null;
            const badge = getScoreBadge(match.totalScore);

            // Check application status
            // Note: backend uses ObjectId, frontend uses string. Comparison needs care.
            const existingApp = applications.find(
              app => (app.job._id || app.job) === match.jobId
            );
            const isApplied = !!existingApp;

            return (
              <div
                key={match.jobId}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left: Job Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <Building className="text-gray-500" size={24} />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {match.title}
                          </h2>
                          <p className="text-gray-600 font-medium">{match.company}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.color} lg:hidden`}>
                        {badge.text}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{match.location || "Location N/A"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase size={16} className="text-gray-400" />
                        <span>{match.domain || "General"}</span>
                      </div>
                      {match.isRemote && (
                        <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-0.5 rounded">
                          <Globe size={14} />
                          <span className="text-xs font-medium">Remote</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleApply(match.jobId)}
                      disabled={isApplied || applying === match.jobId}
                      className={`hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-lg transition-colors font-medium text-sm ${isApplied
                          ? "bg-green-100 text-green-700 cursor-default"
                          : "bg-gray-900 text-white hover:bg-gray-800"
                        } ${applying === match.jobId ? "opacity-70 cursor-wait" : ""}`}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle size={16} /> Applied
                        </>
                      ) : applying === match.jobId ? (
                        "Applying..."
                      ) : (
                        <>Apply Now <ArrowRight size={16} /></>
                      )}
                    </button>
                  </div>

                  {/* Right: Match Stats */}
                  {/* (Existing stats code omitted for brevity as it is unchanged mostly) -> Wait, I need to include it because I am replacing the block. */}
                  {/* I will use the rest of the existing code structure. But I am replacing from 'const [matches...' (line 20) to 'Apply Now' button (line 235). */}
                  {/* The Right Column needs to be included or connected? */}
                  {/* The replacement chunk covers up to the Apply button in Left Column. */}
                  {/* I also need to update the Apply button in Right Column (mobile). */}

                  {/* Wait, the existing code has TWO Apply buttons (Desktop and Mobile). */}
                  {/* My ReplacementContent MUST include the rest of the component or I need to use replace_file_content carefully. */}
                  {/* Since I changed state init and useEffect, I should replace from line 20 down to the end of the map loop or handle multiple chunks. */}
                  {/* The file is large. I should use 'multi_replace_file_content' if I can, or replace the whole component body? */}
                  {/* Or replace the logic part first, then the buttons. */}
                  {/* But applications state is needed in render. */}

                  {/* I will replace lines 20-43 (logic) AND lines 151-156 (Desktop Button) AND lines 230-235 (Mobile Button). */}
                  {/* This requires 'multi_replace_file_content'. */}

                  {/* Wait, I can't easily reference lines by number if I change earlier lines. */}
                  {/* I will replace the LOGIC block first. */}
                  {/* Then I will replace the map loop content. */}

                  {/* But I need `applications` state available in the map loop. */}
                  {/* So I must replace the `StudentMatches` function body essentially. */}

                  {/* Let's try replacing the LOGIC part (lines 20-56) first. */}
                  {/* Then the `matches.map` return block. */}

                  {/* Actually, I will replace the whole component body if possible, or large chunks. */}

                  <div className="lg:w-80 flex flex-col justify-center bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-600">Match Compatibility</span>
                      <span className={`hidden lg:inline-block px-2 py-0.5 rounded text-xs font-semibold border ${badge.color}`}>
                        {badge.text}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle
                            className="text-gray-200"
                            strokeWidth="5"
                            stroke="currentColor"
                            fill="transparent"
                            r="28"
                            cx="32"
                            cy="32"
                          />
                          <circle
                            className={getScoreColor(match.totalScore)}
                            strokeWidth="5"
                            strokeDasharray={2 * Math.PI * 28}
                            strokeDashoffset={2 * Math.PI * 28 * (1 - match.totalScore / 100)}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="28"
                            cx="32"
                            cy="32"
                          />
                        </svg>
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gray-900">
                          {match.totalScore}%
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 leading-snug">
                        Based on your skills,<br />location & domain.
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <Code size={12} /> Skills
                        </span>
                        <span className="font-semibold text-gray-900">+{match.breakdown.skillMatch}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-purple-500 h-1.5 rounded-full"
                          style={{ width: `${(match.breakdown.skillMatch / 40) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center text-xs pt-1">
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <Target size={12} /> Domain
                        </span>
                        <span className="font-semibold text-gray-900">+{match.breakdown.domain}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${(match.breakdown.domain / 20) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleApply(match.jobId)}
                      disabled={isApplied || applying === match.jobId}
                      className={`mt-5 w-full lg:hidden flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium text-sm ${isApplied
                          ? "bg-green-100 text-green-700 cursor-default"
                          : "bg-gray-900 text-white hover:bg-gray-800"
                        } ${applying === match.jobId ? "opacity-70 cursor-wait" : ""}`}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle size={16} /> Applied
                        </>
                      ) : applying === match.jobId ? (
                        "Applying..."
                      ) : (
                        <>Apply Now <ArrowRight size={16} /></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentMatches;
