const { sequelize, connectDB } = require('../config/db');
const { User } = require('../models');

async function main() {
  await connectDB();
  await sequelize.sync({ alter: true });
  console.log('✅ PostgreSQL Schema synchronized with mobileNumber column.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Error syncing db:', err);
  process.exit(1);
});
