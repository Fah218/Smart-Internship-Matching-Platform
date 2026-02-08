import React, { useEffect, useState } from "react";

const CompanyMatches = () => {
  const [students, setStudents] = useState([]);
  const jobId = localStorage.getItem("lastJobId");

  useEffect(() => {
    if (!jobId) {
      alert("No job selected.");
      return;
    }

    fetch(`http://localhost:5000/api/jobs/${jobId}/matches`)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
  }, [jobId]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">
        Matched Candidates
      </h1>

      {students.length === 0 ? (
        <p>No candidates matched yet.</p>
      ) : (
        <div className="space-y-4">
          {students.map(student => (
            <div
              key={student.studentId}
              className="border rounded-lg p-4"
            >
              <h2 className="text-lg font-semibold">
                {student.name}
              </h2>
              <p className="text-gray-600">{student.email}</p>
              <p className="mt-2 font-medium">
                Match Score: {student.totalScore}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyMatches;
