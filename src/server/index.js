const express = require('express');
const os = require('os');

const server = express();

server.use(express.static('dist'));
server.get('/api/users', (req, res) =>
    res.send({ username: os.userInfo().username })
);
server.listen(8080, () => console.log("Listening on port 8080!"));
