"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../config/database");
const user_model_1 = require("../models/user.model");
const job_model_1 = require("../models/job.model");
const auth_1 = require("../config/auth");
dotenv_1.default.config();
async function seed() {
    console.log('🌱 Starting database seeding...\n');
    // Initialize database
    await (0, database_1.initDatabase)();
    try {
        // 1. Create HR User
        console.log('Creating HR user...');
        const hrPassword = await bcrypt_1.default.hash('12345678', auth_1.authConfig.bcryptRounds);
        // Check if HR user already exists
        const existingHR = await user_model_1.UserModel.findByEmail('hr@jobboard.com');
        let hrUser;
        if (existingHR) {
            console.log('HR user already exists, skipping...');
            hrUser = existingHR;
        }
        else {
            hrUser = await user_model_1.UserModel.create('hr@jobboard.com', hrPassword, 'HR Manager', 'hr');
            console.log('✅ HR user created');
            console.log('   Email: hr@jobboard.com');
            console.log('   Password: 12345678\n');
        }
        // 2. Create Test Applicant User
        console.log('Creating test applicant user...');
        const applicantPassword = await bcrypt_1.default.hash('password123', auth_1.authConfig.bcryptRounds);
        const existingApplicant = await user_model_1.UserModel.findByEmail('john.doe@example.com');
        if (existingApplicant) {
            console.log('Test applicant already exists, skipping...');
        }
        else {
            await user_model_1.UserModel.create('john.doe@example.com', applicantPassword, 'John Doe', 'applicant');
            console.log('✅ Test applicant created');
            console.log('   Email: john.doe@example.com');
            console.log('   Password: password123\n');
        }
        // 3. Create Sample Jobs
        console.log('Creating sample jobs...');
        const job1 = await job_model_1.JobModel.create('Senior Frontend Developer', 'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building beautiful, responsive web applications using modern JavaScript frameworks.', 'Requirements:\n- 5+ years of experience with React.js\n- Strong knowledge of TypeScript\n- Experience with state management (Redux, Zustand)\n- Familiarity with RESTful APIs\n- Good understanding of responsive design\n- Bachelor\'s degree in Computer Science or equivalent', 'San Francisco, CA (Remote)', '$120,000 - $160,000', hrUser.id);
        console.log(`✅ Created job: ${job1.title} (ID: ${job1.id})`);
        const job2 = await job_model_1.JobModel.create('Full Stack Node.js Developer', 'Join our backend team to build scalable APIs and microservices. You will work on high-traffic applications serving millions of users.', 'Requirements:\n- 3+ years of experience with Node.js and Express\n- Strong knowledge of TypeScript\n- Experience with PostgreSQL or MongoDB\n- Understanding of REST API design\n- Experience with Docker and Kubernetes is a plus\n- Bachelor\'s degree in Computer Science or related field', 'New York, NY (Hybrid)', '$100,000 - $140,000', hrUser.id);
        console.log(`✅ Created job: ${job2.title} (ID: ${job2.id})`);
        const job3 = await job_model_1.JobModel.create('DevOps Engineer', 'We are seeking a DevOps Engineer to help us maintain and scale our infrastructure. You will work with modern cloud technologies and CI/CD pipelines.', 'Requirements:\n- 4+ years of DevOps experience\n- Strong knowledge of AWS or Azure\n- Experience with Kubernetes and Docker\n- Proficiency in scripting (Python, Bash)\n- Experience with CI/CD tools (Jenkins, GitLab CI)\n- Understanding of infrastructure as code (Terraform)\n- Bachelor\'s degree in Computer Science or equivalent', 'Austin, TX (On-site)', '$110,000 - $150,000', hrUser.id);
        console.log(`✅ Created job: ${job3.title} (ID: ${job3.id})`);
        console.log('\n🎉 Database seeding completed successfully!');
        console.log('\n📋 Summary:');
        console.log('   - 1 HR user');
        console.log('   - 1 test applicant');
        console.log('   - 3 sample jobs');
        console.log('\n💡 You can now start the server with: npm run dev');
    }
    catch (error) {
        console.error('❌ Error during seeding:', error);
        process.exit(1);
    }
}
seed();
//# sourceMappingURL=seed.js.map