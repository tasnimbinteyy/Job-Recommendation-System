// src/lib/db.ts
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// এটি অত্যন্ত গুরুত্বপূর্ণ: 'db' কে ভেরিয়েবলে রেখে ডিফল্ট এক্সপোর্ট করা
const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export { db }; // Named export (যদি লাগে)
export default db; // Default export (এটি আপনার auth.ts এর জন্য দরকার)

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;