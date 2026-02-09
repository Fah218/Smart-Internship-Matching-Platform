// Calculate skill match percentage (0–1)
export const calculateSkillMatch = (studentSkills, jobSkills) => {
  if (!studentSkills.length || !jobSkills.length) return 0;

  const studentSet = new Set(
    studentSkills.map(skill => skill.toLowerCase())
  );

  let matchCount = 0;

  jobSkills.forEach(skill => {
    if (studentSet.has(skill.toLowerCase())) {
      matchCount++;
    }
  });

  return matchCount / jobSkills.length;
};

// Location score (0–20)
export const calculateLocationScore = (
  studentLocation,
  jobLocation,
  isRemote
) => {
  if (isRemote) return 15;

  if (
    studentLocation.toLowerCase() === jobLocation.toLowerCase()
  ) {
    return 20;
  }

  return 0;
};

// Domain score (0 or 10)
export const calculateDomainScore = (
  studentDomain,
  jobDomain
) => {
  if (
    studentDomain.toLowerCase() === jobDomain.toLowerCase()
  ) {
    return 10;
  }

  return 0;
};

// First-time applicant bonus (0 or 5)
export const calculateFirstTimeBonus = (isFirstTimeApplicant) => {
  return isFirstTimeApplicant ? 5 : 0;
};

// Resume Score (0 or 20)
export const calculateResumeScore = (resumePath) => {
  return resumePath && resumePath.length > 0 ? 20 : 0;
};

// GitHub Score (0 or 20)
export const calculateGithubScore = (githubLink) => {
  return githubLink && githubLink.length > 0 ? 20 : 0;
};
