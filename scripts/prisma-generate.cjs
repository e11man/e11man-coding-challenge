const { execSync } = require("node:child_process");

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    "postgresql://placeholder:placeholder@localhost:5432/placeholder?schema=public";
  console.warn(
    "DATABASE_URL is not set. Using a placeholder connection string for Prisma generate."
  );
}

execSync("npx prisma generate", { stdio: "inherit" });

