const express = require('express');
const router = express.Router();

// Find
router.get('/', async (req, res) => {
    var message = 'OK', 
        error = false,
        sql = "SELECT * FROM persona";
    await db.query(sql, function (err, result) {
        if (err) {
            message = err;
            error = true;
        }
        else if (result.length <= 0)
            message = "No se encontraron registros!";
        res.json({
            data: result || [],
            error: error,
            message: message
        });
    });
});

// Find One
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
            message = `El registro con ID ${id} no existe`;
        res.json({
            data: result || [],
            error: error,
            message: message
        });
    });
});

// Add
router.post('/', async (req, res) => {
    var message = 'OK';
    var error = false;
    var data = req.body;
    console.log(data);
    var sql = `INSERT INTO persona VALUES (NULL, '${data.pNombre}', '${data.sNombre}', '${data.pApellido}', '${data.sApellido}', '${data.fechaNac}', ${data.sexo}, '${data.info}')`;
    await db.query(sql, function (err, result) {
        if (err) {
            message = err;
            error = true;
        }
        else if (result.affectedRows === 0)
            message = `No se pudo agregar el registro.`;
        res.json({
            data: result || [],
            error: error,
            message: message
        });
    });
});

// Update person
router.patch('/:id', async (req, res) => {
    var message = 'OK';
    var error = false;
    var id = req.params.id;
    var data = req.body;
    console.log(data);
    var sql = `UPDATE persona SET primerNombre = '${data.pNombre}', 
        segundoNombre = '${data.sNombre}', 
        primerApellido = '${data.pApellido}', 
        segundoApellido = '${data.sApellido}', 
        fechaNacimmiento = '${data.fechaNac}', 
        sexo = ${data.sexo}, 
        informacionAdicional = '${data.info}' 
        WHERE persona.idPersona = ${id}`;
    await db.query(sql, function (err, result) {
        if (err) {
            message = err;
            error = true;
        }
        else if (result.affectedRows === 0)
            message = `El registro con ID ${id} no existe`;
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
        else if (result.affectedRows === 0)
            message = `El registro con ID ${id} no existe`;
        res.json({
            data: result || [],
            error: error,
            message: message
        });
    });
});

module.exports = router;