const express = require('express');
const router = express.Router();

// Get back all the champs
router.get('/', async (req, res) => {
    try {
        // var champs = await Champ.find();
        res.json({username: 'test', password: 'test'})
    } catch (err) {
        res.json({ message: err });
    }
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
router.get('/:personId', async (req, res) => {
    /*try {
        var person = await Champ.findById(req.params.champId);
        res.json(person);
    } catch (err) {
        res.json({ message: err });
    }*/
});

// Delete person
router.delete('/:personId', async (req, res) => {
   /*try {
        var removedChamp = await Champ.remove({ _id: req.params.champId });
        res.json(removedChamp);
    } catch (err) {
        res.json({ message: err });
    }*/
});

// Update person
router.patch('/:champId', async (req, res) => {
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