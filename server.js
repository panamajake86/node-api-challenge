const express = require('express');
const helmet = require('helmet');
const projectsRouter = require('./routes/projectsRouter');
const actionsRouter = require('./routes/actionsRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`Jake's API Sprint Challenge!`);
});

module.exports = server;