const { v4: uuid } = require('uuid');
const db = require('../config/db_config');

const listAllUsers = async () => new Promise((resolve, reject) => {
  const users = [];

  const options = {
    gt: 'users:',
    lte: `users${String.fromCharCode(':'.charCodeAt(0) + 1)}`,
  };

  // https://github.com/Level/level#createReadStream
  db.createReadStream(options)
    .on('data', ({ value }) => {
      users.push(JSON.parse(value));
    })
    .on('error', (err) => {
      reject(err);
    })
    .on('end', () => {
      resolve(users);
    });
});

const createNewUser = (body) => {
  if (!body.name || !body.email || !body.password) {
    return null;
  }
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(body.email)) {
    return null;
  }

  const user = {
    id: uuid(),
    name: body.name,
    email: body.email,
    password: body.password,
  };

  return new Promise(((resolve, reject) => {
    // https://github.com/Level/level#put
    // on insère en base de données
    db.put(`users:${user.id}`, JSON.stringify(user), (err) => {
      if (err) {
        reject(err);
      } else {
        /**
         * On a "jsonifié" notre channel lorsque on l'a créé ligne 24.
         * Il faut faire l'opération inverse
         */
        resolve(user);
      }
    });
  }));
};

/**
 * on a un code asynchrone, on va donc utiliser les promesses pour nous simplifier la vie...
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses
 */

const showUser = (userId) => new Promise(((resolve, reject) => {
  db.get(`users:${userId}`, (err, value) => {
    if (err) {
      reject(err);
    } else {
      /**
       * On a "jsonifié" notre channel lorsque on l'a créé ligne 24.
       * Il faut faire l'opération inverse
       */
      resolve(JSON.parse(value));
    }
  });
}));

const updateUser = (userId, body) => new Promise(((resolve, reject) => {
  showUser(userId).then((user) => {
    const newUser = {
      ...user,
      ...{
        name: (body.name ? body.name : user.name),
        email: (body.email ? body.email : user.email),
        password: (body.password ? body.password : user.password),
      },
    };
    db.put(`users:${userId}`, JSON.stringify(newUser), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(newUser);
      }
    });
  }).catch(() => {
    reject(new Error('user not found'));
  });
}
));

const deleteUser = async (userId) => {
  try {
    await showUser(userId);
  } catch (err) {
    throw new Error('user not found');
  }
  db.del(`users:${userId}`, (err) => {
    if (err) {
      throw new Error('user delete error');
    }
  });
};

module.exports = {
  listAllUsers,
  createNewUser,
  showUser,
  updateUser,
  deleteUser,
};
