import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

async function main() {
  if (!ADMIN_EMAIL) {
    console.log("❌ ADMIN_EMAIL is not set in .env");
    return;
  }

  const user = await db.user.findUnique({ where: { email: ADMIN_EMAIL } });

  if (!user) {
    console.log(` No user found with email: ${ADMIN_EMAIL}`);
    console.log("→ Sign in with that email first, then run pnpm seed again.");
    return;
  }

  await db.user.update({
    where: { email: ADMIN_EMAIL },
    data: { role: "ADMIN", onboarded: true },
  });

  console.log(`✅ Admin role set for: ${ADMIN_EMAIL}`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
