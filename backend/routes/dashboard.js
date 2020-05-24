const express = require('express');
const router = express.Router();

// Get back all the persons
router.get('/', async (req, res) => {
    var message = 'OK', 
        error = false,
        sql = "SELECT * FROM `persona`";
    await db.query(sql, function (err, result) {
        if (err) {
            message = err;
            error = true;
        }
        else if (result.length <= 0)
            message = "Persons not found!";
        res.json({
            data: result || [],
            error: error,
            message: message
        });
    });
});

// Submits a person
router.post('/', (req, res) => {
    //console.log(req.body);
    /*const person = new Champ({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category
    });
    person.save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json({ message: err });
    })*/
});

// Specific person
router.get('/:id', async (req, res) => {
    var message = 'OK';
    var error = false;
    var id = req.params.id;
    var sql = `SELECT * FROM persona WHERE idPersona = ${id}`;
    await db.query(sql, function (err, result) {
        if (err) {
            message = err;
            error = true;
        }
        else if (result.length <= 0)
            message = `Person with id ${id} not found`;
        res.json({
            data: result || [],
            error: error,
            message: message
        });
    });
});

// Delete person
router.delete('/:id', async (req, res) => {
   var message = 'OK';
   var error = false;
   var id = req.params.id;
   var sql = `DELETE FROM persona WHERE idPersona = ${id}`;
   await db.query(sql, function (err, result) {
       if (err) {
           message = err;
           error = true;
       }
       else if (result.length <= 0)
           message = `Person with id ${id} not found`;
       res.json({
           data: result || [],
           error: error,
           message: message
       });
   });
});

// Update person
router.patch('/:id', async (req, res) => {
    /*try {
        var updatedChamp = await Champ.updateOne(
            { _id: req.params.champId },
            { 
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    category: req.body.category
                }
            }
        );
        res.json(updatedChamp);
    } catch (err) {
        res.json({ message: err });
    }*/
});

module.exports = router;