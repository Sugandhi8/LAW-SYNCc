const { Sequelize } = require('sequelize');
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = process.env.DB_PORT || 5432;
const dbName = process.env.DB_NAME || 'legal_dictionary';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'srcw@123';

// Ensure database exists in PostgreSQL
const ensureDatabaseExists = async () => {
  const client = new Client({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: 'postgres' // Connect to default postgres DB first
  });

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (res.rowCount === 0) {
      console.log(`Database '${dbName}' not found. Creating database...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ PostgreSQL database '${dbName}' created successfully.`);
    }
  } catch (err) {
    // If permission or already exists, log and proceed
    console.warn(`Database check notice: ${err.message}`);
  } finally {
    await client.end();
  }
};

// Initialize Sequelize Instance
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? false : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Database connection & table synchronization
const connectDB = async () => {
  try {
    await ensureDatabaseExists();
    await sequelize.authenticate();
    console.log(`✅ PostgreSQL Connected successfully to database '${dbName}'.`);

    // Sync all defined models to PostgreSQL schema
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized with PostgreSQL schema.');
  } catch (error) {
    console.error(`❌ PostgreSQL Connection Error: ${error.message}`);
  }
};

module.exports = {
  sequelize,
  connectDB
};
