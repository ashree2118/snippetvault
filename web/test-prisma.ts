import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  console.log('✅ Prisma connected');
  await prisma.$disconnect();
}

main();