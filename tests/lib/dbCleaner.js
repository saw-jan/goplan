const { MongoClient } = require('mongodb')
const mongoUrl = 'mongodb://127.0.0.1:27017/goplan'
const DB_NAME = 'goplan'
const dbOptions = { useUnifiedTopology: true }

const client = new MongoClient(mongoUrl, dbOptions)

function cleanUpDB() {
  console.log('Mongodb clean up...')
  client.connect(async function (err, client) {
    if (err) throw err

    const db = client.db(DB_NAME)

    // drop users collection
    await db.collection('users').drop(function (e, res) {
      if (res) console.log('Cleaner: Users collection cleared')
    })

    // drop events collection
    await db.collection('events').drop(function (e, res) {
      if (res) console.log('Cleaner: Events collection cleared')
      client.close()
    })
  })
}

module.exports = { cleanUpDB }
