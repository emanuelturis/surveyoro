export = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: "5432",
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/migrations",
      tableName: "knex_migrations",
      extension: "ts",
    },
  },

  test: {
    client: "postgresql",
    connection: {
      host: "postgres",
      port: "5432",
      database: "surveyrus_test",
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/migrations",
      tableName: "knex_migrations",
      extension: "ts",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: "postgres",
      port: "5432",
      database: "surveyrus",
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/migrations",
      tableName: "knex_migrations",
      extension: "ts",
    },
  },
} as { [key: string]: object };
