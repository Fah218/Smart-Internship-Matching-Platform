import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    skills: "",
    preferredLocation: "",
    domain: ""
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
      alert("Student not found");
      return;
    }

    const payload = {
      skills: profile.skills
        .split(",")
        .map(s => s.trim())
        .filter(Boolean),
      preferredLocation: profile.preferredLocation,
      domain: profile.domain,
      isFirstTimeApplicant: true
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/students/${studentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) {
        throw new Error("Profile update failed");
      }

      navigate("/student/matches");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">
        Complete Your Profile
      </h1>

      <input
        name="skills"
        placeholder="Skills (comma separated)"
        className="w-full border p-2 rounded mb-4"
        onChange={handleChange}
      />

      <input
        name="preferredLocation"
        placeholder="Preferred Location"
        className="w-full border p-2 rounded mb-4"
        onChange={handleChange}
      />

      <input
        name="domain"
        placeholder="Domain (IT, Design, etc.)"
        className="w-full border p-2 rounded mb-6"
        onChange={handleChange}
      />

      <button
        onClick={handleSave}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Save & Find Matches
      </button>
    </div>
  );
};

export default StudentDashboard;
