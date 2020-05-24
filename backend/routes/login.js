const express = require('express');
const router = express.Router();

// Validate if user is logged in
router.get('/validation', (req, res) => {
    if (req.session.loggedin) {
        res.json({logedIn: true, username: req.session.username});
    } else {
        res.json({logedIn: false});
    }
    res.end();
});

// Find user
router.post('/login', async (req, res) => {
    var message = 'OK';
    var error = false;
    var data = req.body;
    var sql = `SELECT * FROM user WHERE username = '${data.username}' AND password = '${data.password}' LIMIT 1`;
    await db.query(sql, function (err, result) {
        if (err) {
            message = err;
            error = true;
        }
        else if (result.length <= 0)
            message = `El usuario y la contraseña no coinciden!`;
        else {
            req.session.loggedin = true;
            req.session.username = data.username;
        }
        res.json({
            username: result[0].username,
            error: error,
            message: message
        });
    });
});

// Logout user
router.get('/logout', async (req, res) => {
    req.session.loggedin = false;
    req.session.username = '';
    res.json({
        loggedOut: true
    });
});

module.exports = router;