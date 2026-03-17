const { Client } = require('pg')
const { v4: uuidv4 } = require('uuid')

async function main() {
  // 直接値を指定して接続を確立
  const connectionString = "postgresql://postgres.axeylwvkhwbyprwtifxi:yDh!*89M%23w%3FXv%23%24@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"
  const client = new Client({ connectionString })
  
  try {
    await client.connect()
    console.log('--- Direct SQL: Fixing Missing Tags ---')
    
    // タグが紐付いていないペットを取得
    const res = await client.query(`
      SELECT p.id, p.name 
      FROM "Pet" p 
      LEFT JOIN "Tag" t ON p.id = t.pet_id 
      WHERE t.id IS NULL;
    `)
    
    console.log(`Found ${res.rows.length} pets without tags.`)
    
    for (const pet of res.rows) {
      const tagId = 'tag_' + Date.now() + Math.random().toString(36).substring(7)
      const tagHash = uuidv4()
      console.log(`Creating tag for ${pet.name} (ID: ${pet.id}) -> Hash: ${tagHash}`)
      
      await client.query(`
        INSERT INTO "Tag" (id, pet_id, tag_hash, "updatedAt") 
        VALUES ($1, $2, $3, NOW());
      `, [tagId, pet.id, tagHash])
    }
    
    console.log('SQL Execution Complete.')
  } catch (err) {
    console.error('SQL Error:', err)
  } finally {
    await client.end()
  }
}

main()
