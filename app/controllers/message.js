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
const {
  showChannel,
} = require('../models/channel');

exports.index = async (req, res) => {
  const messages = await listAllMessages();

  return res.status(200).json(messages);
};

exports.create = async (req, res) => {
  const { body } = req; // on destructure req pour récuperer le body

  try {
    const user = await showUser(req.user.id);
    const channel = await showChannel(body.channel_id);
    const message = await createNewMessage(body, user, channel);
    // Code 201 pour une création : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
    return res.status(201).json(message);
  } catch (e) {
    return res.status(400).json({
      error: 400,
      message: "Require valid 'content', 'channel_id', 'user_id'",
      dbError: e.message,
    });
  }
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
