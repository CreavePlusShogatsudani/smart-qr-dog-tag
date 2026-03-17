const { Client } = require('pg')

async function main() {
  const connectionString = "postgresql://postgres.axeylwvkhwbyprwtifxi:yDh!*89M%23w%3FXv%23%24@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"
  const client = new Client({ connectionString })
  
  try {
    await client.connect()
    console.log('--- Pet & Tag Relationship ---')
    const res = await client.query(`
      SELECT p.id as pet_id, p.name as pet_name, t.tag_hash 
      FROM "Pet" p 
      LEFT JOIN "Tag" t ON p.id = t.pet_id;
    `)
    console.table(res.rows)
  } catch (err) {
    console.error(err)
  } finally {
    await client.end()
  }
}

main()
