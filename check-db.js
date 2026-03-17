const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

async function main() {
  const connectionString = process.env.DATABASE_URL
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  const pets = await prisma.pet.findMany({
    select: {
      name: true,
      breed: true,
      owner: {
        select: {
          email: true,
          name: true
        }
      }
    }
  })
  console.log('--- Current Pets in DB ---')
  console.log(JSON.stringify(pets, null, 2))
  
  await prisma.$disconnect()
  await pool.end()
}

main()
