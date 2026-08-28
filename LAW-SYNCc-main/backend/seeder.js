const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Load Models
const User = require('./models/User');
const Term = require('./models/Term');
const Bookmark = require('./models/Bookmark');
const History = require('./models/History');
const Quiz = require('./models/Quiz');

// Load Seed Data
const seedTerms = require('./data/seedTerms');
const seedQuizzes = require('./data/seedQuizzes');

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/legal_dictionary');
    console.log('MongoDB connected for seeding...');
  } catch (err) {
    console.error('Error connecting to database:', err.message);
    process.exit(1);
  }
};

// Import Data
const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      User.deleteMany(),
      Term.deleteMany(),
      Bookmark.deleteMany(),
      History.deleteMany(),
      Quiz.deleteMany()
    ]);

    console.log('Cleared existing collections.');

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
    const createdTerms = await Term.insertMany(seedTerms);
    console.log(`Successfully seeded ${createdTerms.length} legal terms.`);

    // Seed Quizzes
    const createdQuizzes = await Quiz.insertMany(seedQuizzes);
    console.log(`Successfully seeded ${createdQuizzes.length} quiz questions.`);

    // Seed sample bookmarks & history for demo user
    if (createdTerms.length >= 3) {
      await Bookmark.create([
        { user: demoUser._id, term: createdTerms[0]._id },
        { user: demoUser._id, term: createdTerms[1]._id }
      ]);

      await History.create([
        { user: demoUser._id, term: createdTerms[0]._id, searchedAt: new Date(Date.now() - 3600000) },
        { user: demoUser._id, term: createdTerms[2]._id, searchedAt: new Date() }
      ]);

      console.log('Seeded sample bookmarks and history for demo user.');
    }

    console.log('🎉 Data Imported Successfully!');
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

    await Promise.all([
      User.deleteMany(),
      Term.deleteMany(),
      Bookmark.deleteMany(),
      History.deleteMany(),
      Quiz.deleteMany()
    ]);

    console.log('💥 All Data Successfully Destroyed!');
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
