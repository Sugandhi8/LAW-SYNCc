const { Sequelize } = require('sequelize');
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = parseInt(process.env.DB_PORT, 10) || 5432;
const dbName = process.env.DB_NAME || 'legal_dictionary';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'srcw@123';
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

// Determine if SSL is required (for hosted/cloud databases like Supabase, Neon, Render, Railway, AWS RDS)
const isRemoteHost = dbHost !== '127.0.0.1' && dbHost !== 'localhost';
const useSSL = process.env.DB_SSL === 'true' || (Boolean(databaseUrl) && !databaseUrl.includes('localhost') && !databaseUrl.includes('127.0.0.1')) || isRemoteHost;

const dialectOptions = useSSL
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  : {};

// Ensure database exists in local PostgreSQL development
const ensureDatabaseExists = async () => {
  // On remote/cloud databases or when DATABASE_URL is set, database is pre-created by provider
  if (databaseUrl || isRemoteHost) {
    return;
  }

  const client = new Client({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: 'postgres' // Connect to default postgres DB first for local check
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
    // If permission issue or DB already exists, log non-fatal warning and continue
    console.warn(`Local database check notice: ${err.message}`);
  } finally {
    try {
      await client.end();
    } catch (_) {}
  }
};

// Initialize Sequelize Instance
let sequelize;

if (databaseUrl) {
  sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    dialectOptions,
    logging: process.env.NODE_ENV === 'development' && process.env.DB_LOGGING === 'true' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    dialectOptions,
    logging: process.env.NODE_ENV === 'development' && process.env.DB_LOGGING === 'true' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}

// Database connection & table synchronization
const connectDB = async () => {
  try {
    await ensureDatabaseExists();
    await sequelize.authenticate();
    const activeDb = databaseUrl ? 'Hosted PostgreSQL' : dbName;
    console.log(`✅ PostgreSQL Connected successfully to database '${activeDb}'.`);

    // Sync all defined models to PostgreSQL schema
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized with PostgreSQL schema.');
  } catch (error) {
    console.error(`❌ PostgreSQL Connection Error: ${error.message}`);
    console.error('Please verify DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD or DATABASE_URL in .env');
  }
};

module.exports = {
  sequelize,
  connectDB
};
