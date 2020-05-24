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

// Connect to DB
const conn = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

conn.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

global.db = conn;

// Import routes
const dashboard = require('./routes/dashboard');
const login = require('./routes/login')

// ROUTES
app.use('/dashboard', dashboard);
app.use('/', login);

var server = app.listen(4000, () => {
	console.log("Running on port 4000");
});