const { v4: uuid } = require('uuid');
const db = require('../../db_config');

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

const createNewMessage = (body) => {
  if (!body.content) {
    return null; // ne pas oublier les blindages !
  }

  // on créé un objet message
  const message = {
    id: uuid(),
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

/*
const updateMessage = async (messageId, body) => {

};

const deleteMessage = async (messageId) => {

};
*/
module.exports = {
  listAllMessages,
  createNewMessage,
  showMessage,
  // updateMessage,
  // deleteMessage,
};