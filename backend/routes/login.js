const express = require('express');
var session = require("express-session");
const router = express.Router();

// Validate if user is logged in
router.get('/validation', (req, res) => {
    if (req.session.loggedin) {
        res.json({loggedIn: true, username: req.session.username});
    } else {
        req.session.loggedin = false;
        req.session.save();
        res.json({loggedIn: false});
    }
});

// Find user
router.post('/login', async (req, res) => {
    var message = 'OK';
    var error = false;
    var data = req.body;
    var username = null;
    var sql = `SELECT * FROM user WHERE username = '${data.username}' AND password = ${data.password};`;
    await db.query(sql, function (err, result) {
        if (err) {
            message = err;
            error = true;
        }
        else if (result.length <= 0) {
            message = `El usuario y la contraseña no coinciden!`;
            /*req.session.loggedin = false;
            req.session.save()*/
        }
        else if (result.length > 0) {
            /*req.session.loggedin = true;
            req.session.username = data.username;
            req.session.save()*/
            username = result[0].username;
        }
        res.json({
            username: username,
            error: error,
            message: message
        });
    });
});

// Logout user
router.get('/logout', async (req, res) => {
    /*req.session.loggedin = false;
    req.session.username = '';*/
    res.json({
        loggedOut: true
    });
});

module.exports = router;