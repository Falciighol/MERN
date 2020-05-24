const express = require('express');
var session = require("express-session");
var cookieParser = require('cookie-parser');
require('dotenv/config');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');

var app = express();

// MIddlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(session({
		store,
		secret: "istrategies",
		resave: false,
		saveUninitialized: true,
		cookie: {
			path: '/',
			 domain: '.' + process.env.app_domain,
			 httpOnly: true,
			 secure: process.env.protocol === 'https',
			 maxAge: (60 * 60 * 1000) // 60 mins
		 }
	})
);*/

const isDevMode = process.env.NODE_ENV === 'development';

// 1st change.
if (!isDevMode) {
  app.set('trust proxy', 1);
}

app.use(session({
  secret: "istrategies",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: false,
    httpOnly: true,
    // 2nd change.
    secure: !isDevMode,
  }
}));

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
const login = require('./routes/login');

// ROUTES
app.use('/dashboard', dashboard);
app.use('/', login);

var server = app.listen(4000, () => {
	console.log("Running on port 4000");
});