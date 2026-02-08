import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const StudentMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
      alert("Student not found. Please register again.");
      return;
    }

    fetch(`http://localhost:5000/api/students/${studentId}/matches`)
      .then(res => res.json())
      .then(data => {
        setMatches(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading matches...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">
        Recommended Internships
      </h1>

      {matches.length === 0 ? (
        <p>No matches found yet.</p>
      ) : (
        <div className="space-y-6">
          {matches.map(match => {
            // Safety check
            if (!match.breakdown) return null;

            const chartData = {
              labels: [
                "Skill Match",
                "Location",
                "Domain",
                "First-time Bonus"
              ],
              datasets: [
                {
                  label: "Score Contribution",
                  data: [
                    match.breakdown.skillMatch,
                    match.breakdown.location,
                    match.breakdown.domain,
                    match.breakdown.firstTime
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
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) =>
                      `${ctx.raw} points`
                  }
                }
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
                key={match.jobId}
                className="border rounded-lg p-5 shadow-sm bg-white"
              >
                <h2 className="text-lg font-semibold">
                  {match.title}
                </h2>

                <p className="text-gray-600">
                  {match.company}
                </p>

                <p className="mt-2 font-bold text-purple-700">
                  Match Score: {match.totalScore}%
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
      )}
    </div>
  );
};

export default StudentMatches;
