const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express();

require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'paulicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/players', require('./routes/api/players'));

//This is a "catch all" route. No matter the GET request,
//index.html will be served. Once served, react will use 
//client-side routing for any request.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Hey! Your Express app is running on port ${port}!`);
});