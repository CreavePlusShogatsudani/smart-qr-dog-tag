const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      line_user_id: 'dummy_line_user_001',
    },
  });

  const dog1 = await prisma.dog.create({
    data: {
      owner_id: user.id,
      name: 'マックス',
      breed: 'ゴールデンレトリバー',
      is_lost: false,
    },
  });

  const dog2 = await prisma.dog.create({
    data: {
      owner_id: user.id,
      name: 'ベル',
      breed: '柴犬',
      is_lost: true,
    },
  });

  await prisma.medicalRecord.create({
    data: {
      dog_id: dog2.id,
      diseases: 'なし',
      medications: 'フィラリア予防薬',
      vet_clinic: 'ハッピーペット動物病院',
      vet_phone: '03-1234-5678',
      care_instructions: '雷の音を怖がります。',
    },
  });

  await prisma.tag.create({
    data: {
      dog_id: dog1.id,
      tag_hash: 'hash_max_001',
    },
  });

  await prisma.tag.create({
    data: {
      dog_id: dog2.id,
      tag_hash: 'hash_bell_002',
    },
  });

  console.log('Seed completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
