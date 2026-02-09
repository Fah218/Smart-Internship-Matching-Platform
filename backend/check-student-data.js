import mongoose from "mongoose";
import dotenv from "dotenv";
import Student from "./src/models/Student.js";

dotenv.config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        const students = await Student.find({});
        console.log(`Found ${students.length} students`);

        students.forEach(s => {
            console.log(`Student: ${s.name} (${s.email})`);
            console.log(` - Resume: ${s.resume ? "YES: " + s.resume : "NO"}`);
            console.log(` - GitHub: ${s.githubLink ? "YES: " + s.githubLink : "NO"}`);
            console.log(` - Skills: ${s.skills}`);
        });

        const Job = (await import("./src/models/Job.js")).default;
        const jobs = await Job.find({});
        console.log(`\nFound ${jobs.length} jobs`);
        jobs.forEach(j => {
            console.log(`Job: ${j.title} (${j.company}) ID: ${j._id}`);
            console.log(` - Skills Required: ${j.skillsRequired}`);
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkData();
