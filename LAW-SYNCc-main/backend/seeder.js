const dotenv = require('dotenv');
const { sequelize, connectDB } = require('./config/db');

// Load environment variables
dotenv.config();

// Load Models
const { User, Term, Bookmark, History, Quiz } = require('./models');

// Load Seed Data
const seedTerms = require('./data/seedTerms');
const seedQuizzes = require('./data/seedQuizzes');

// Import Data
const importData = async () => {
  try {
    await connectDB();

    // Reset database schema and tables
    await sequelize.sync({ force: true });
    console.log('Cleared existing PostgreSQL tables.');

    // Seed default admin and user
    const adminUser = await User.create({
      name: 'Legal Admin',
      email: 'admin@lawsync.com',
      password: 'adminpassword123',
      role: 'admin'
    });

    const demoUser = await User.create({
      name: 'Advocate John',
      email: 'demo@lawsync.com',
      password: 'demopassword123',
      role: 'user'
    });

    console.log(`Created admin account: ${adminUser.email} (password: adminpassword123)`);
    console.log(`Created demo user account: ${demoUser.email} (password: demopassword123)`);

    // Seed Legal Terms
    const createdTerms = await Term.bulkCreate(seedTerms);
    console.log(`Successfully seeded ${createdTerms.length} legal terms into PostgreSQL.`);

    // Seed Quizzes
    const createdQuizzes = await Quiz.bulkCreate(seedQuizzes);
    console.log(`Successfully seeded ${createdQuizzes.length} quiz questions into PostgreSQL.`);

    // Seed sample bookmarks & history for demo user
    if (createdTerms.length >= 3) {
      await Bookmark.bulkCreate([
        { userId: demoUser.id, termId: createdTerms[0].id },
        { userId: demoUser.id, termId: createdTerms[1].id }
      ]);

      await History.bulkCreate([
        { userId: demoUser.id, termId: createdTerms[0].id, searchedAt: new Date(Date.now() - 3600000) },
        { userId: demoUser.id, termId: createdTerms[2].id, searchedAt: new Date() }
      ]);

      console.log('Seeded sample bookmarks and history for demo user.');
    }

    console.log('🎉 PostgreSQL Data Imported Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Data Import Failed:', error);
    process.exit(1);
  }
};

// Destroy Data
const destroyData = async () => {
  try {
    await connectDB();

    await sequelize.sync({ force: true });
    console.log('💥 All PostgreSQL Tables and Data Successfully Destroyed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Data Destruction Failed:', error);
    process.exit(1);
  }
};

// Handle CLI execution flags
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
