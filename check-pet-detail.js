const { Client } = require('pg')

async function main() {
  const connectionString = "postgresql://postgres.axeylwvkhwbyprwtifxi:yDh!*89M%23w%3FXv%23%24@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"
  const client = new Client({ connectionString })
  
  try {
    await client.connect()
    console.log('--- Pet Data Detail ---')
    const res = await client.query('SELECT name, image_url, breed, is_lost FROM "Pet" WHERE name = $1 LIMIT 1;', ['パー'])
    console.log(JSON.stringify(res.rows[0], null, 2))
  } catch (err) {
    console.error(err)
  } finally {
    await client.end()
  }
}

main()
