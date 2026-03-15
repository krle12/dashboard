import { Client } from "pg";
import fs from "fs";
import path from "path";
import "dotenv/config";

async function runMigrations() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("Error: DATABASE_URL is missing in .env file.");
    process.exit(1);
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("Connected to database, checking migrations...");

    await client.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const migrationsDir = path.join(process.cwd(), "src", "migrations");
    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    const { rows } = await client.query("SELECT name FROM _migrations");
    const executedMigrations = new Set(rows.map((row) => row.name));

    let appliedCount = 0;
    for (const file of files) {
      if (!executedMigrations.has(file)) {
        console.log(`Executing: ${file}`);
        const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");

        await client.query("BEGIN");
        try {
          await client.query(sql);
          await client.query("INSERT INTO _migrations (name) VALUES ($1)", [
            file,
          ]);
          await client.query("COMMIT");
          console.log(`Successfully applied: ${file}`);
          appliedCount++;
        } catch (error) {
          await client.query("ROLLBACK");
          console.error(`Error in migration ${file}:`, error);
          throw error;
        }
      }
    }

    if (appliedCount === 0) {
      console.log("All migrations are already up to date.");
    } else {
      console.log(`Successfully executed new migrations: ${appliedCount}`);
    }
  } catch (error) {
    console.error("Critical error in migration process:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
