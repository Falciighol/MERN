const express = require('express');
const router = express.Router();

// Get back all the champs
router.get('/', (req, res) => {
    res.render('index', { title: 'Home', message: 'Hello there!'});
});

module.exports = router;