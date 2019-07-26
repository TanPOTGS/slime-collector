const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true});

const db = mongoose.connection;

db.once('connected', () => {
  console.log(`You're also connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});