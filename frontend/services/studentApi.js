export const createStudent = async (studentData) => {
  const response = await fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(studentData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create student");
  }

  return response.json();
};
