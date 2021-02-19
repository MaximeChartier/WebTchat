const {
  listAllMessages,
  createNewMessage,
  showMessage,
  // updateChannel,
  // deleteChannel,
} = require('../models/message');

exports.index = async (req, res) => {
  const messages = await listAllMessages();

  return res.status(200).json(messages);
};

exports.create = async (req, res) => {
  const { body } = req; // on destructure req pour récuperer le body

  const message = await createNewMessage(body);

  if (!message) {
    return res.status(400).json({
      error: 400,
      message: "Require valid field : 'content'",
    });
  }

  return res.status(201).json(message); // Code 201 pour une création : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
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
/*
exports.update = async (req, res) => {
  // TODO update message
  // Poser l'algo par écrit avant (ACD)
};

exports.delete = async (req, res) => {
  // TODO delete message
};
*/
