import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './src/models/Student.js';

dotenv.config();

const checkDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        const students = await Student.find().sort({ createdAt: -1 });

        console.log(`📊 Total Students: ${students.length}\n`);

        if (students.length > 0) {
            console.log('📝 Recent Students:');
            console.log('='.repeat(80));

            students.forEach((student, index) => {
                console.log(`\n${index + 1}. ${student.name}`);
                console.log(`   Email: ${student.email}`);
                console.log(`   Skills: ${student.skills.length > 0 ? student.skills.join(', ') : 'Not set'}`);
                console.log(`   Location: ${student.preferredLocation || 'Not set'}`);
                console.log(`   Domain: ${student.domain || 'Not set'}`);
                console.log(`   Created: ${student.createdAt.toLocaleString()}`);
                console.log(`   ID: ${student._id}`);
            });
        } else {
            console.log('No students found in database.');
        }

        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

checkDatabase();
