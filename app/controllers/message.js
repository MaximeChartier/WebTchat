const {
  listAllMessages,
  createNewMessage,
  showMessage,
  updateMessage,
  deleteMessage,
} = require('../models/message');
const {
  showUser,
} = require('../models/user');

exports.index = async (req, res) => {
  const messages = await listAllMessages();

  return res.status(200).json(messages);
};

exports.create = async (req, res) => {
  const { body } = req; // on destructure req pour récuperer le body

  showUser(body.user_id).then((user) => {
    createNewMessage(body, user).then((message) =>
      // Code 201 pour une création : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
      res.status(201).json(message)).catch(() => {
      res.status(400).json({
        error: 400,
        message: "Require valid field : 'content', 'user_id'",
      });
    });
  }).catch(() => {
    res.status(400).json({
      error: 400,
      message: 'User not found',
    });
  });
};

exports.show = async (req, res) => {
  const { messageId } = req.params;

  try {
    return res.status(200).json(await showMessage(messageId));
  } catch (err) {
    return res.status(404).json({
      error: 404,
      message: 'Message not found',
      dbError: err.message,
    });
  }
};
exports.update = async (req, res) => {
  const { messageId } = req.params;
  const { body } = req;
  try {
    return res.status(200).json(await updateMessage(messageId, body));
  } catch (err) {
    return res.status(404).json({
      error: 404,
      message: 'Message not found',
      dbError: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { messageId } = req.params;
  try {
    return res.status(204).json(await deleteMessage(messageId));
  } catch (err) {
    return res.status(404).json({
      error: 404,
      message: 'Message not found',
      dbError: err.message,
    });
  }
};
