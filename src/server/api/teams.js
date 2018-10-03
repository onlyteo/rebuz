// Modules
const os = require('os');
const express = require('express');
const repository = require('../db/teams')
// Variables
const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send();
    }

    const entity = repository.get(id);
    if (entity) {
        res.send(entity);
    } else {
        res.status(204).send();
    }
})

module.exports = router;
