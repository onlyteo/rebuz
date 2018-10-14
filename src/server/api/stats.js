// Modules
const os = require('os');
const express = require('express');
const service = require('../services/stats')
// Variables
const router = express.Router();

router.get('/', (req, res) => {
    const { event, team } = req.query;
    if (!event && !team) {
        res.status(400).send();
    }

    service.find(event, team, (err, stats) => {
        if (err) {
            res.status(500).send();
        } else {
            res.send(stats);
        }
    });
});

router.post('/', (req, res) => {
    const { body } = req;
    if (!body || !body.event || !body.team || !body.question) {
        res.status(400).send();
    }

    service.save(body, (err, modified) => {
        if (err) {
            res.status(500).send();
        } else if (modified == 0) {
            res.status(204).send();
        } else {
            res.status(201).send();
        }
    });
})

router.delete('/', (req, res) => {
    const { event, team } = req.query;
    if (!event && !team) {
        res.status(400).send();
    }

    service.delete(event, team, (err) => {
        if (err) {
            res.status(500).send();
        } else {
            res.status(200).send();
        }
    });
})

module.exports = router;
