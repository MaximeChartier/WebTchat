const express = require('express');
const cors = require('cors');

const app = express();

const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use(express.static('dist'));

const routerApiV1 = express.Router();

const channelRoutes = require('../app/routes/channel');
const usersRoutes = require('../app/routes/user');
const messagesRoutes = require('../app/routes/message');
const loginRouter = require('../app/routes/login');

const { auth } = require('../app/middleware/auth');

routerApiV1.use('/', loginRouter);
routerApiV1.use('/users', usersRoutes);
routerApiV1.use('/channels', auth, channelRoutes);
routerApiV1.use('/messages', auth, messagesRoutes);

// Router api
app.use('/api/v1', routerApiV1);

// Gestion des 404
app.get('*', (req, res) => res.status(404).json({ message: 'Page not found' }));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Chat is waiting for you at http://localhost:${port}`);
});
