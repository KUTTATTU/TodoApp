const express = require('express');

//package that can be used to handle JSON requests
const bodyParser = require('body-parser');

// initialising express
const app = express();
const port = 8090;
require('dotenv').config();
const todoroute = require('./route/todo.route'); // Imports routes
var mongoose = require('mongoose');
let db_url = process.env.DB_URL;
mongoose.connect(db_url);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/todos', todoroute);
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});