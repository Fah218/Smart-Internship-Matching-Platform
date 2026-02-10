import React, { useState } from "react";
import { getApiUrl } from '../../config/api';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Briefcase,
  MapPin,
  Globe,
  Code,
  Layout,
  CheckCircle2,
  Plus,
  Loader,
  Search,
  User
} from "lucide-react";

// register chart components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    skills: "",
    location: "",
    domain: "",
    isRemote: false
  });

  const [matchedStudents, setMatchedStudents] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get company data from localStorage
    const userData = localStorage.getItem("user");
    let companyName = "Demo Company";
    let companyEmail = "";

    if (userData) {
      const user = JSON.parse(userData);
      companyName = user.companyName || "Demo Company";
      companyEmail = user.email || "";
    }

    const payload = {
      title: formData.title,
      company: companyName, // For backward compatibility
      companyName: companyName,
      companyEmail: companyEmail,
      skillsRequired: formData.skills
        .split(",")
        .map(skill => skill.trim())
        .filter(Boolean),
      location: formData.location,
      isRemote: formData.isRemote,
      domain: formData.domain
    };

    try {
      const res = await fetch(getApiUrl("/api/jobs"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create job");
      }

      const job = await res.json();
      alert("Job posted successfully!");

      // fetch matched students
      fetchMatchedStudents(job._id);

      // reset form (optional)
      setFormData({
        title: "",
        skills: "",
        location: "",
        domain: "",
        isRemote: false
      });

    } catch (err) {
      alert(err.message);
    }
  };

  const fetchMatchedStudents = async (jobId) => {
    setLoadingMatches(true);

    try {
      const res = await fetch(getApiUrl(`/api/jobs/${jobId}/matches`));
      const data = await res.json();
      setMatchedStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMatches(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Post New Internship
            </h1>
            <p className="text-primary-100 mt-1">Create a new opportunity to find the perfect talent</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="title"
                    value={formData.title}
                    placeholder="e.g. Junior React Developer"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Code className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="skills"
                    value={formData.skills}
                    placeholder="e.g. React, Node.js, MongoDB (comma separated)"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    onChange={handleChange}
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Separate multiple skills with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="location"
                    value={formData.location}
                    placeholder="e.g. New York, NY"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Layout className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="domain"
                    value={formData.domain}
                    placeholder="e.g. Web Development"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  name="isRemote"
                  checked={formData.isRemote}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                <div className="ml-3 flex items-center text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                  <Globe className="w-4 h-4 mr-2" />
                  Remote Position
                </div>
              </label>
            </div>

            <div className="pt-4">
              <button
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Post Job & Find Matches
              </button>
            </div>
          </form>
        </div>

        {/* LOADING STATE */}
        {loadingMatches && (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-md">
            <Loader className="w-10 h-10 text-primary-500 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Finding the perfect candidates for you...</p>
          </div>
        )}

        {/* MATCHED STUDENTS */}
        {matchedStudents.length > 0 && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Search className="w-6 h-6 text-primary-600" />
                Matched Candidates
                <span className="ml-2 bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">
                  {matchedStudents.length} matches
                </span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {matchedStudents.map(student => {
                if (!student.breakdown) return null;

                const chartData = {
                  labels: [
                    "Skills",
                    "Location",
                    "Domain",
                    "Bonus"
                  ],
                  datasets: [
                    {
                      label: "Match Score",
                      data: [
                        student.breakdown.skillMatch,
                        student.breakdown.location,
                        student.breakdown.domain,
                        student.breakdown.firstTime
                      ],
                      backgroundColor: [
                        "#7c3aed", // primary-600
                        "#22c55e", // green-500
                        "#3b82f6", // blue-500
                        "#f59e0b"  // amber-500
                      ],
                      borderRadius: 4,
                      barThickness: 20
                    }
                  ]
                };

                const chartOptions = {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return `${context.parsed.y} pts`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 60,
                      grid: {
                        display: true,
                        drawBorder: false,
                      },
                      ticks: {
                        font: { size: 10 }
                      }
                    },
                    x: {
                      grid: { display: false },
                      ticks: {
                        font: { size: 10 }
                      }
                    }
                  }
                };

                return (
                  <div
                    key={student.studentId}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary-50 p-2 rounded-full">
                            <User className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                              {student.name}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {student.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-2xl font-bold text-primary-600">
                            {student.totalScore}%
                          </div>
                          <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                            Match Score
                          </div>
                        </div>
                      </div>

                      <div className="h-40 w-full mt-2">
                        <Bar
                          data={chartData}
                          options={chartOptions}
                        />
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                          ID: {student.studentId.substring(0, 8)}...
                        </div>
                        <button className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline">
                          View Full Profile
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateJob;
