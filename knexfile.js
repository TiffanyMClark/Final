const path = require("path");

require("dotenv").config();

const { DATABASE_URL = "postgresql://postgres@localhost/postgres" } =
  process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "postgres",
    },

    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    ssl: {
      rejectUnauthorized: false, // This will allow connections without requiring SSL certificates to be valid.
    },
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    ssl: {
      rejectUnauthorized: false, // This will allow connections without requiring SSL certificates to be valid.
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
