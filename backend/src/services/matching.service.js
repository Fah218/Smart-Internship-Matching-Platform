import Student from "../models/Student.js";
import Job from "../models/Job.js";

import {
  calculateSkillMatch,
  calculateLocationScore,
  calculateDomainScore,
  calculateFirstTimeBonus
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
    const skillMatchScore =
      calculateSkillMatch(student.skills, job.skillsRequired) * 60;

    const locationScore = calculateLocationScore(
      student.preferredLocation,
      job.location,
      job.isRemote
    );

    const domainScore = calculateDomainScore(
      student.domain,
      job.domain
    );

    const firstTimeBonus =
      calculateFirstTimeBonus(student.isFirstTimeApplicant);

    const totalScore =
      skillMatchScore +
      locationScore +
      domainScore +
      firstTimeBonus;

    return {
      jobId: job._id,
      title: job.title,
      company: job.company,
      totalScore: Math.round(totalScore),
      breakdown: {
        skillMatch: Math.round(skillMatchScore),
        location: locationScore,
        domain: domainScore,
        firstTime: firstTimeBonus
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
    const skillMatchScore =
      calculateSkillMatch(student.skills, job.skillsRequired) * 60;

    const locationScore = calculateLocationScore(
      student.preferredLocation,
      job.location,
      job.isRemote
    );

    const domainScore = calculateDomainScore(
      student.domain,
      job.domain
    );

    const firstTimeBonus =
      calculateFirstTimeBonus(student.isFirstTimeApplicant);

    const totalScore =
      skillMatchScore +
      locationScore +
      domainScore +
      firstTimeBonus;

    return {
      studentId: student._id,
      name: student.name,
      email: student.email,
      totalScore: Math.round(totalScore),
      breakdown: {
        skillMatch: Math.round(skillMatchScore),
        location: locationScore,
        domain: domainScore,
        firstTime: firstTimeBonus
      }
    };
  });

  matches.sort((a, b) => b.totalScore - a.totalScore);

  return matches;
};
