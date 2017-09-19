// some dependencies
var express = require('express');
var path = require('path');
var parser = require('body-parser');
var users = require('./routes/users');
var issues = require('./routes/issues');
var cors = require('cors');
var configs = require('./configs/db')

// disable logging in production.
if (process.env.production || configs.noLogging) {
    console.log = function() {};
}

// connect to the database.
const mongoose = require('mongoose');
const config = require('./configs/db');
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('\nConnected to database' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('\nError connecting to database' + err);
});

// setup main app
var app = express();

// we'll use CORS.
app.use(cors());

// set view engine
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// set static path and parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.json());

// some routes. only need users and issues for now.
app.use('/users', users);
app.use('/issues', issues);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
  });

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// start server, either on the host port or our debug port.
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});