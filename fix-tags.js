const { Client } = require('pg')
const { v4: uuidv4 } = require('uuid')

async function main() {
  const connectionString = "postgresql://postgres.axeylwvkhwbyprwtifxi:yDh!*89M%23w%3FXv%23%24@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"
  const client = new Client({ connectionString })
  
  try {
    await client.connect()
    console.log('--- Fixing Missing Tags ---')
    
    // タグが紐付いていないペットを取得
    const res = await client.query(`
      SELECT p.id 
      FROM "Pet" p 
      LEFT JOIN "Tag" t ON p.id = t.pet_id 
      WHERE t.tag_hash IS NULL;
    `)
    
    for (const pet of res.rows) {
      const newHash = uuidv4()
      console.log(`Creating tag for pet: ${pet.id} with hash: ${newHash}`)
      
      // Tagテーブルに新規レコード作成（uuidを生成）
      await client.query(`
        INSERT INTO "Tag" (id, pet_id, tag_hash, "updatedAt") 
        VALUES ('tag_' + $1, $1, $2, NOW());
      `, [pet.id, newHash])
    }
    
    console.log('Done.')
  } catch (err) {
    console.error(err)
  } finally {
    await client.end()
  }
}

main()
