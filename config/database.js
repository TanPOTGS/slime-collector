const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('connected', () => {
  console.log(`Hey! You're connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});