import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
      const res = await fetch("/api/jobs", {
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
      const res = await fetch(`/api/jobs/${jobId}/matches`);
      const data = await res.json();
      setMatchedStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMatches(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Post Internship</h1>

      {/* JOB FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          name="title"
          value={formData.title}
          placeholder="Job Title"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="skills"
          value={formData.skills}
          placeholder="Skills (comma separated)"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="location"
          value={formData.location}
          placeholder="Location"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="domain"
          value={formData.domain}
          placeholder="Domain (IT, Design, etc.)"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isRemote"
            checked={formData.isRemote}
            onChange={handleChange}
          />
          Remote
        </label>

        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Create Job
        </button>
      </form>

      {/* MATCHED STUDENTS */}
      {loadingMatches && (
        <p className="text-gray-600">Loading matched students...</p>
      )}

      {matchedStudents.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Matched Candidates
          </h2>

          <div className="space-y-6">
            {matchedStudents.map(student => {
              if (!student.breakdown) return null;

              const chartData = {
                labels: [
                  "Skill Match",
                  "Location",
                  "Domain",
                  "First-time Bonus"
                ],
                datasets: [
                  {
                    data: [
                      student.breakdown.skillMatch,
                      student.breakdown.location,
                      student.breakdown.domain,
                      student.breakdown.firstTime
                    ],
                    backgroundColor: [
                      "#7c3aed",
                      "#22c55e",
                      "#3b82f6",
                      "#f59e0b"
                    ],
                    borderRadius: 6
                  }
                ]
              };

              const chartOptions = {
                responsive: true,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 60
                  }
                }
              };

              return (
                <div
                  key={student.studentId}
                  className="border rounded-lg p-5 shadow-sm bg-white"
                >
                  <h3 className="text-lg font-semibold">
                    {student.name}
                  </h3>
                  <p className="text-gray-600">
                    {student.email}
                  </p>

                  <p className="mt-2 font-bold text-purple-700">
                    Match Score: {student.totalScore}%
                  </p>

                  <div className="mt-4">
                    <Bar
                      data={chartData}
                      options={chartOptions}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateJob;
