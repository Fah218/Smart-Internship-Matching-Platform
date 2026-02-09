import React, { useState, useEffect } from "react";
import { getApiUrl } from '../../config/api';
import { useNavigate } from "react-router-dom";
import { getApiUrl } from '../../config/api';
import {
import { getApiUrl } from '../../config/api';
  User,
  MapPin,
  Briefcase,
  Code,
  Save,
  Search,
  TrendingUp,
  Award,
  Loader,
  Github,
  FileText,
  Upload,
  Lock
} from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ matches: 0 });

  const [formData, setFormData] = useState({
    skills: "",
    preferredLocation: "",
    domain: "",
    bio: "",
    githubLink: ""
  });

  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    fetchStudentData();
  }, [navigate]);

  const fetchStudentData = async () => {
    try {
      const studentId = localStorage.getItem("studentId");
      if (!studentId) {
        navigate("/login");
        return;
      }

      // Fetch student details
      const res = await fetch(getApiUrl(`/api/students/${studentId}`));
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();

      setStudent(data);
      setFormData({
        skills: data.skills ? data.skills.join(", ") : "",
        preferredLocation: data.preferredLocation || "",
        domain: data.domain || "",
        bio: data.bio || "",
        githubLink: data.githubLink || ""
      });

      // Fetch match stats
      const matchesRes = await fetch(getApiUrl(`/api/students/${studentId}/matches`));
      if (matchesRes.ok) {
        const matchesData = await matchesRes.json();
        setStats({ matches: matchesData.length });
      }

    } catch (err) {
      console.error(err);
      if (err.message === "Failed to fetch profile") {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const studentId = localStorage.getItem("studentId");

    const data = new FormData();
    data.append("skills", formData.skills); // Send as comma-separated string
    data.append("preferredLocation", formData.preferredLocation);
    data.append("domain", formData.domain);
    data.append("bio", formData.bio);
    data.append("githubLink", formData.githubLink);
    data.append("isFirstTimeApplicant", "true");

    if (resumeFile) {
      data.append("resume", resumeFile);
    }

    try {
      const res = await fetch(`/api/students/${studentId}`, {
        method: "PUT",
        // No Content-Type header for FormData, browser sets it with boundary
        body: data
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedStudent = await res.json();
      setStudent(updatedStudent);
      alert("Profile updated successfully!");
      setResumeFile(null); // Clear selected file after upload

      // Refresh matches after profile update
      const matchesRes = await fetch(getApiUrl(`/api/students/${studentId}/matches`));
      if (matchesRes.ok) {
        const matchesData = await matchesRes.json();
        setStats({ matches: matchesData.length });
      }

    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const isProfileComplete = () => {
    return student && student.skills?.length > 0 && student.preferredLocation && student.domain;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <Loader className="animate-spin h-10 w-10 text-primary-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary-100 rounded-full text-primary-600">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {student?.name}!
            </h1>
            <p className="text-gray-600">{student?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (isProfileComplete()) {
                navigate("/student/matches");
              } else {
                alert("Please complete your profile to enable internship matching.");
              }
            }}
            disabled={!isProfileComplete()}
            className={`flex items-center px-6 py-2.5 rounded-xl transition-all shadow-lg ${isProfileComplete()
              ? "bg-secondary-600 text-white hover:bg-secondary-700 shadow-secondary-500/30"
              : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
          >
            <Search size={18} className="mr-2" />
            Find Internships
            {!isProfileComplete() && <Lock size={14} className="ml-2" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Actions */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="glass-panel p-6 bg-gradient-to-br from-white to-primary-50/50 relative overflow-hidden">
            {!isProfileComplete() && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                <div className="bg-white/90 px-4 py-2 rounded-full shadow-sm border border-gray-100 flex items-center text-gray-500 text-sm font-medium">
                  <Lock size={14} className="mr-2" />
                  Complete profile to unlock
                </div>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <TrendingUp size={20} className="mr-2 text-primary-600" />
              Your Activity
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm opacity-100">
                <p className="text-sm text-gray-500 mb-1">Matches Found</p>
                <p className="text-2xl font-bold text-gray-900">{isProfileComplete() ? stats.matches : "-"}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Applications</p>
                <p className="text-2xl font-bold text-gray-900">{isProfileComplete() ? "0" : "-"}</p>
              </div>
            </div>
          </div>

          {/* Profile Status */}
          <div className={`glass-panel p-6 ${isProfileComplete() ? 'border-green-200 bg-green-50/30' : 'border-yellow-200 bg-yellow-50/30'}`}>
            <div className="flex items-start gap-3">
              <Award className={`mt-1 ${isProfileComplete() ? 'text-green-600' : 'text-yellow-600'}`} size={24} />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {isProfileComplete() ? "Profile Completed" : "Complete Your Profile"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {isProfileComplete()
                    ? "Great job! You're all set to be matched with top companies."
                    : "Add your skills, location, and domain to get the best internship matches."}
                </p>
              </div>
            </div>
          </div>

          {/* Links Section Preview */}
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Links</h3>
            <div className="space-y-3">
              {student?.githubLink ? (
                <a href={student.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-primary-600 transition-colors bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <Github size={20} className="mr-3" />
                  <span className="truncate">{student.githubLink}</span>
                </a>
              ) : (
                <div className="text-gray-400 text-sm italic">No GitHub link added</div>
              )}

              {student?.resume ? (
                <a href={`/${student.resume}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-primary-600 transition-colors bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <FileText size={20} className="mr-3" />
                  <span>View Uploaded Resume</span>
                </a>
              ) : (
                <div className="text-gray-400 text-sm italic">No resume uploaded</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Profile Form */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-500">
                Visible to Recruiters
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Domain
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Development, Data Science, Marketing"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills & Technologies
                </label>
                <div className="relative">
                  <Code className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    rows="3"
                    placeholder="e.g. React, Python, Figma, SQL (comma separated)"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Separate each skill with a comma</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    placeholder="e.g. Remote, New York, San Francisco"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* GitHub Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Profile
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      name="githubLink"
                      value={formData.githubLink}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resume / CV
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="w-full flex items-center justify-center px-4 py-2.5 border border-dashed border-gray-300 rounded-lg text-gray-600 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      {resumeFile ? (
                        <span className="truncate max-w-[150px]">{resumeFile.name}</span>
                      ) : (
                        <><Upload size={18} className="mr-2" /> Upload Resume</>
                      )}
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">PDF or Docx (Max 5MB)</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`flex items-center px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30 ${saving ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {saving ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
