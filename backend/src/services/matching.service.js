import Student from "../models/Student.js";
import Job from "../models/Job.js";

import {
  calculateSkillMatch,
  calculateLocationScore,
  calculateDomainScore,
  calculateFirstTimeBonus,
  calculateResumeScore,
  calculateGithubScore
} from "./scoring.service.js";

/**
 * Match a single student with all available jobs
 */
export const matchStudentWithJobs = async (studentId) => {
  const student = await Student.findById(studentId);
  if (!student) {
    throw new Error("Student not found");
  }

  const jobs = await Job.find();

  const matches = jobs.map(job => {
    // 1. Skill Match (max 35)
    const skillMatchScore =
      calculateSkillMatch(student.skills, job.skillsRequired) * 35;

    // 2. Location (max 15)
    // Adjust max from 20 to 15 in service call logic if needed, or normalize
    // Current helper returns strict 20 or 15. Let's keep it simple: max 20 from helper -> max 15 here?
    // Helper returns absolute points. I should update helper or scale here.
    // Helper: 20 (exact), 15 (remote).
    // Let's scale: (score / 20) * 15
    const rawLocationScore = calculateLocationScore(
      student.preferredLocation,
      job.location,
      job.isRemote
    );
    const locationScore = (rawLocationScore / 20) * 15;

    // 3. Domain (max 10) - Helper returns 10. OK.
    const domainScore = calculateDomainScore(
      student.domain,
      job.domain
    );

    // 4. First Time Bonus (max 5) - Helper returns 5. OK.
    const firstTimeBonus =
      calculateFirstTimeBonus(student.isFirstTimeApplicant);

    // 5. Resume Analysis (max 20)
    const resumeScore = calculateResumeScore(student.resume);

    // 6. GitHub Score (max 15) - Helper returns 20. Scale to 15.
    const rawGithubScore = calculateGithubScore(student.githubLink);
    const githubScore = (rawGithubScore / 20) * 15;

    const totalScore =
      skillMatchScore +
      locationScore +
      domainScore +
      firstTimeBonus +
      resumeScore +
      githubScore;

    return {
      jobId: job._id,
      title: job.title,
      company: job.company,
      location: job.location,
      domain: job.domain,
      isRemote: job.isRemote,
      totalScore: Math.round(totalScore),
      breakdown: {
        skillMatch: Math.round(skillMatchScore),
        location: Math.round(locationScore),
        domain: domainScore,
        firstTime: firstTimeBonus,
        resumeAnalysis: resumeScore,
        github: Math.round(githubScore)
      }
    };
  });

  // Sort by score (descending)
  matches.sort((a, b) => b.totalScore - a.totalScore);

  return matches;
};

/**
 * Match a job with all students
 */
export const matchJobWithStudents = async (jobId) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error("Job not found");
  }

  const students = await Student.find();

  const matches = students.map(student => {
    // 1. Skill Match (max 35)
    const skillMatchScore =
      calculateSkillMatch(student.skills, job.skillsRequired) * 35;

    // 2. Location (max 15)
    const rawLocationScore = calculateLocationScore(
      student.preferredLocation,
      job.location,
      job.isRemote
    );
    const locationScore = (rawLocationScore / 20) * 15;

    // 3. Domain (max 10)
    const domainScore = calculateDomainScore(
      student.domain,
      job.domain
    );

    // 4. First Time Bonus (max 5)
    const firstTimeBonus =
      calculateFirstTimeBonus(student.isFirstTimeApplicant);

    // 5. Resume Analysis (max 20)
    const resumeScore = calculateResumeScore(student.resume);

    // 6. GitHub Score (max 15)
    const rawGithubScore = calculateGithubScore(student.githubLink);
    const githubScore = (rawGithubScore / 20) * 15;

    const totalScore =
      skillMatchScore +
      locationScore +
      domainScore +
      firstTimeBonus +
      resumeScore +
      githubScore;

    return {
      studentId: student._id,
      name: student.name,
      email: student.email,
      skills: student.skills,
      location: student.preferredLocation,
      resume: student.resume,
      githubLink: student.githubLink,
      totalScore: Math.round(totalScore),
      breakdown: {
        skillMatch: Math.round(skillMatchScore),
        location: Math.round(locationScore),
        domain: domainScore,
        firstTime: firstTimeBonus,
        resumeAnalysis: resumeScore,
        github: Math.round(githubScore)
      }
    };
  });

  matches.sort((a, b) => b.totalScore - a.totalScore);

  return matches;
};
