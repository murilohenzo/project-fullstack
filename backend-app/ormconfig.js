module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "test",
  entities: ["./src/modules/**/infra/orm/entities/*{.ts,.js}"],
  migrations: ["./src/shared/infra/orm/migrations/*{.ts,.js}"],
  cli: {
    migrationsDir: "./src/shared/infra/orm/migrations/",
  },
  synchronize: true,
};
