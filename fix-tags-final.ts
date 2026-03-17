import { prisma } from './src/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

async function main() {
  try {
    console.log('--- Fixing Missing Tags using Project Prisma Instance ---');
    
    // タグが紐付いていないペットを取得
    const petsWithoutTags = await prisma.pet.findMany({
      where: {
        tags: {
          none: {}
        }
      }
    });
    
    console.log(`Found ${petsWithoutTags.length} pets without tags.`);
    
    for (const pet of petsWithoutTags) {
      const newHash = uuidv4();
      console.log(`Creating tag for pet: ${pet.name} (ID: ${pet.id}) with hash: ${newHash}`);
      
      await prisma.tag.create({
        data: {
          pet_id: pet.id,
          tag_hash: newHash
        }
      });
    }
    
    console.log('Update Complete.');
  } catch (err) {
    console.error('Error during update:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
