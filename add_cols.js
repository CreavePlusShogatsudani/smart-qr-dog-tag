const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    console.log('Connecting...');
    await prisma.$executeRawUnsafe('ALTER TABLE "MedicalRecord" ADD COLUMN IF NOT EXISTS vet_clinic_address TEXT;');
    console.log('Added vet_clinic_address');
    await prisma.$executeRawUnsafe('ALTER TABLE "Pet" ADD COLUMN IF NOT EXISTS gender TEXT;');
    console.log('Added gender');
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

run();
