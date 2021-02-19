const { v4: uuid } = require('uuid');
const db = require('../../db_config');

const listAllChannels = async () => new Promise((resolve, reject) => {
  const channels = [];

  const options = {
    gt: 'channels:',
    lte: `channels${String.fromCharCode(':'.charCodeAt(0) + 1)}`,
  };

  // https://github.com/Level/level#createReadStream
  db.createReadStream(options)
    .on('data', ({ value }) => {
      channels.push(JSON.parse(value));
    })
    .on('error', (err) => {
      reject(err);
    })
    .on('end', () => {
      resolve(channels);
    });
});

const createNewChannel = (body) => {
  if (!body.name) {
    return null; // ne pas oublier les blindages !
  }

  // on créé un objet channel
  const channel = {
    id: uuid(),
    name: body.name,
  };

  return new Promise(((resolve, reject) => {
    // https://github.com/Level/level#put
    // on insère en base de données
    db.put(`channels:${channel.id}`, JSON.stringify(channel), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(channel);
      }
    });
  }));
};

const showChannel = (channelId) => new Promise(((resolve, reject) => {
  db.get(`channels:${channelId}`, (err, value) => {
    if (err) {
      reject(err);
    } else {
      resolve(JSON.parse(value));
    }
  });
}));
/*
const updateChannel = async (channelId, body) => {

};

const deleteChannel = async (channelId) => {

}; */

module.exports = {
  listAllChannels,
  createNewChannel,
  showChannel,
  // updateChannel,
  // deleteChannel,
};
