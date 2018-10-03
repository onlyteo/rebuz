// Modules
const os = require('os');
const express = require('express');
const repository = require('../db/stats')
// Variables
const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send();
    }

    const entity = repository.find(id);
    if (entity) {
        res.send(entity);
    } else {
        res.status(204).send();
    }
});

router.post('/', (req, res) => {
    repository.save(req.body, (err) => {
        if (err) {
            res.status(400).send();
        } else {
            res.status(201).send();
        }
    });
})

module.exports = router;
