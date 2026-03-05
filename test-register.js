const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    const email = "test-db@example.com";
    const password = "password123";
    const name = "Test DB User";

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
        console.log("User exists:", exists.email);
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    console.log("Created user:", user.email);
  } catch (err) {
    console.error("DB Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
