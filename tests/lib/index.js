const { MongoClient } = require('mongodb');
const mongoUrl = 'mongodb://127.0.0.1:27017/goplan';
const DB_NAME = 'goplan';
const dbOptions = { useUnifiedTopology: true };

function cleanUpDB() {
  const client = new MongoClient(mongoUrl, dbOptions);

  client.connect(function (err, client) {
    if (err) throw err;

    const db = client.db(DB_NAME);

    // drop users collection
    db.collection('users').drop(function (e, res) {
      if (e) throw err;
      if (res) console.log('Event collection cleared');
      db.close;
    });

    // drop events collection
    db.collection('events').drop(function (e, res) {
      if (e) throw err;
      if (res) console.log('Event collection cleared');
      db.close;
    });
  });
}

module.exports = { cleanUpDB };
