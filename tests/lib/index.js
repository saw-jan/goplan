const { MongoClient } = require('mongodb')
const mongoUrl = 'mongodb://127.0.0.1:27017/goplan'
const DB_NAME = 'goplan'
const dbOptions = { useUnifiedTopology: true }

const client = new MongoClient(mongoUrl, dbOptions)

function cleanUpDB() {
  client.connect(function (err, client) {
    if (err) throw err

    const db = client.db(DB_NAME)

    // drop users collection
    db.collection('users').drop(function (e, res) {
      if (res) console.log('Users collection cleared')
    })

    // drop events collection
    db.collection('events').drop(function (e, res) {
      if (res) console.log('Events collection cleared')
    })

    client.close()
  })
}

module.exports = { cleanUpDB }
