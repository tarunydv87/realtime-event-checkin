// src/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "testuser@example.com",
    },
  });

  console.log("✅ User created:", user.id);
  await prisma.$disconnect();
})();
