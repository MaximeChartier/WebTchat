const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/**
 * Permet de lire du json. Ne pas oublier d'avoir le header Content-Type
 * avec comme valeur application/json
 *
*/
// https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Type

// Routes
app.get('/', (req, res) => {
  res.send([
    "<h1>E'Chat</h1>",
  ].join(''));
});

const routerApiV1 = express.Router();

const channelRoutes = require('./app/routes/channel');
const usersRoutes = require('./app/routes/user');
const messagesRoutes = require('./app/routes/message');
const loginRouter = require('./app/routes/login');

routerApiV1.use('/channels', channelRoutes);
routerApiV1.use('/users', usersRoutes);
routerApiV1.use('/messages', messagesRoutes);
routerApiV1.use('/', loginRouter);

// Router api
app.use('/api/v1', routerApiV1);

// Gestion des 404
app.get('*', (req, res) => res.status(404).json({ message: 'Page not found' }));

module.exports = app;
