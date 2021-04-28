const SECRET = 'mykey';
const jwt = require('jsonwebtoken');
const {
  listAllUsers,
} = require('../models/user');

exports.login = async (req, res) => {
  // Pas d'information à traiter
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Error. Please enter the correct username and password' });
  }
  // Checking
  const users = await listAllUsers();

  let user;
  users.forEach((u) => {
    if (u.email === req.body.email && u.password === req.body.password) {
      user = u;
    }
  });

  // Pas bon
  if (!user) {
    return res.status(400).json({ message: 'Error. Wrong email or password' });
  }

  const token = jwt.sign({
    id: user.id,
    username: user.username,
  }, SECRET, { expiresIn: '3 hours' });

  return res.json({ access_token: token });
};
