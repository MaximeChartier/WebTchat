const {
  listAllUsers,
  createNewUser,
  showUser,
  updateUser,
  deleteUser,
} = require('../models/user');

exports.index = async (req, res) => {
  const channels = await listAllUsers();

  return res.status(200).json(channels);
};

exports.create = async (req, res) => {
  const { body } = req; // on destructure req pour récuperer le body

  const user = await createNewUser(body);

  if (!user) {
    return res.status(400).json({
      error: 400,
      message: "Require valid fields : 'name', 'email', 'password'",
    });
  }

  return res.status(201).json(user); // Code 201 pour une création : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
};

exports.show = async (req, res) => {
  const { userId } = req.params;

  try {
    return res.status(200).json(await showUser(userId));
  } catch (err) {
    return res.status(404).json({
      error: 404,
      message: 'User not found',
      dbError: err.message,
    });
  }
};

exports.update = async (req, res) => {
  const { userId } = req.params;
  const { body } = req;
  try {
    return res.status(200).json(await updateUser(userId, body));
  } catch (err) {
    return res.status(404).json({
      error: 404,
      user: 'User not found',
      dbError: err.user,
    });
  }
};

exports.delete = async (req, res) => {
  const { userId } = req.params;
  try {
    return res.status(204).json(await deleteUser(userId));
  } catch (err) {
    return res.status(404).json({
      error: 404,
      message: 'User not found',
      dbError: err.user,
    });
  }
};
