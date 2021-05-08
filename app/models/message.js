const { v4: uuid } = require('uuid');
const db = require('../config/db_config');

const listAllMessages = async () => new Promise((resolve, reject) => {
  const messages = [];

  const options = {
    gt: 'messages:',
    lte: `messages${String.fromCharCode(':'.charCodeAt(0) + 1)}`,
  };

  // https://github.com/Level/level#createReadStream
  db.createReadStream(options)
    .on('data', ({ value }) => {
      messages.push(JSON.parse(value));
    })
    .on('error', (err) => {
      reject(err);
    })
    .on('end', () => {
      resolve(messages);
    });
});

const createNewMessage = (body, user, channel) => {
  if (!body.content || !user || !channel) {
    return null;
  }

  // on créé un objet message
  const message = {
    id: uuid(),
    user_id: user.id,
    channel_id: channel.id,
    content: body.content,
    created_at: Date.now(),
  };

  return new Promise(((resolve, reject) => {
    // https://github.com/Level/level#put
    // on insère en base de données
    db.put(`messages:${message.id}`, JSON.stringify(message), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(message);
      }
    });
  }));
};

/** on a un code asynchrone, on va donc utiliser les promesses pour nous simplifier la vie...
* https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise
* https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses
*/
const showMessage = (messageId) => new Promise(((resolve, reject) => {
  db.get(`messages:${messageId}`, (err, value) => {
    if (err) {
      reject(err);
    } else {
      resolve(JSON.parse(value));
    }
  });
}));

const updateMessage = (messageId, body) => new Promise(((resolve, reject) => {
  showMessage(messageId).then((message) => {
    const newMessage = {
      ...message,
      ...{
        content: (body.content ? body.content : message.content),
      },
    };
    db.put(`messages:${messageId}`, JSON.stringify(newMessage), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(newMessage);
      }
    });
  }).catch(() => {
    reject(new Error('message not found'));
  });
}));

const deleteMessage = async (messageId) => {
  try {
    await showMessage(messageId);
  } catch (err) {
    throw new Error('message not found');
  }
  db.del(`messages:${messageId}`, (err) => {
    if (err) {
      throw new Error('message delete error');
    }
  });
};

const showUserMessages = async (userId) => {
  const allMessage = await listAllMessages();
  return allMessage.filter((m) => m.user_id === userId);
};

const showChannelMessages = async (channelId) => {
  const allMessage = await listAllMessages();
  return allMessage.filter((m) => m.channel_id === channelId).sort(function(a,b){
    return a.created_at - b.created_at;
});
};

module.exports = {
  listAllMessages,
  createNewMessage,
  showMessage,
  updateMessage,
  deleteMessage,
  showUserMessages,
  showChannelMessages,
};
