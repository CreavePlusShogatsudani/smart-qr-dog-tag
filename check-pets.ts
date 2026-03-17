import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const pets = await prisma.pet.findMany({
    include: {
      owner: true,
      tags: true
    }
  })
  console.log(JSON.stringify(pets, null, 2))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
