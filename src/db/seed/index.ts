import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { advocates } from "../schema";
import { advocateData } from "./advocates";

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Please configure your environment.");
    process.exit(1);
  }

  console.log("Seeding database...");
  
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  
  try {
    const records = await db.insert(advocates).values(advocateData).returning();
    console.log(`Successfully seeded ${records.length} advocates`);
    await queryClient.end();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    await queryClient.end();
    process.exit(1);
  }
}

seed();