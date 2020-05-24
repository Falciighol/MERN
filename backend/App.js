const express = require('express');
require('dotenv/config');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');

var app = express();

// MIddlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const dashboard = require('./routes/dashboard');
const login = require('./routes/login')

// ROUTES
app.use('/champs', dashboard);
app.use('/', login);

// Connect to DB
global.con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

con.query("SELECT * FROM persona", function (err, result, fields) {
	if (err) throw err;
	console.log(result);
});

var server = app.listen(4000, () => {
	console.log("Running on port 4000");
});