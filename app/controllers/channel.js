const { showUser } = require('../models/user');
const {
  listAllChannels,
  createNewChannel,
  showChannel,
  updateChannel,
  deleteChannel,
} = require('../models/channel');

const {
  showChannelMessages,
} = require('../models/message');

exports.index = async (req, res) => {
  const channels = await listAllChannels();
  return res.status(200).json(channels.filter((c) => c.members.map((m) => m.id).indexOf(req.user.id) > -1));
};

exports.create = async (req, res) => {
  const { body } = req; // on destructure req pour récuperer le body

  const channel = await createNewChannel(body, req.user);

  if (!channel) {
    return res.status(400).json({
      name: 'Name is required.',
    });
  }

  return res.status(201).json(channel); // Code 201 pour une création : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
};

exports.show = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await showChannel(channelId);
    if (channel.members.map((m) => m.id).indexOf(req.user.id) > -1) {
      return res.status(200).json(channel);
    }
    return res.status(404).json();
  } catch (err) {
    return res.status(404).json({
      error: 404,
      message: 'Channel not found',
      dbError: err.message,
    });
  }
};

exports.showMessages = async (req, res) => {
  const { channelId } = req.params;
  try {
    const channel = await showChannel(channelId);
    if (channel.members.indexOf(req.user.id) === -1) {
      throw '';
    }
    const messages = await showChannelMessages(channel.id);
    const hidratedMessages = [];
    await Promise.all(messages.map(async (m) => {
      const user = await showUser(m.user_id);
      m.username = user.name;
      m.gravatarId = user.gravatarId;
      hidratedMessages.push(m);
    }));
    return res.status(200).json(hidratedMessages);
  } catch (err) {
    return res.status(404).json({
      error: 404,
      message: 'Channel not found',
      dbError: err.message,
    });
  }
};

exports.update = async (req, res) => {
  const { channelId } = req.params;
  const { body } = req;
  try {
    return res.status(200).json(await updateChannel(channelId, body));
  } catch (err) {
    return res.status(404).json({
      error: 404,
      message: 'Channel not found',
      dbError: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { channelId } = req.params;
  try {
    return res.status(204).json(await deleteChannel(channelId));
  } catch (err) {
    return res.status(404).json({
      error: 404,
      message: 'Channel not found',
      dbError: err.message,
    });
  }
};
