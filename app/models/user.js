const bcrypt = require('bcrypt');
const saltRounds = 10;

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
      value = JSON.parse(value);
      users.push(value);
    })
    .on('error', (err) => {
      reject(err);
    })
    .on('end', () => {
      resolve(users);
    });
});

const createNewUser = (body) => {
  if (!body.name) {
    throw {
      propertyPath: 'name',
      message: 'Username invalide',
    };
  }
  if (!body.password) {
    throw {
      propertyPath: 'password',
      message: 'Mot de passe invalide',
    };
  }
  if (!body.gravatarId) {
    throw {
      propertyPath: 'gravatarId',
      message: 'ID gravatar invalide',
    };
  }
  if (!body.email || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(body.email)) {
    throw {
      propertyPath: 'email',
      message: 'Email invalide',
    };
  }

  const user = {
    id: uuid(),
    gravatarId: body.gravatarId,
    name: body.name,
    email: body.email,
    password: '',
    darkTheme: false,
  };

  return new Promise(((resolve, reject) => {

    bcrypt.hash(body.password, saltRounds, function(err, hash) {
      user.password = hash
      db.put(`users:${user.id}`, JSON.stringify(user), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
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
  if (body.darkTheme != undefined) {
    body.darkTheme = true;
  } else { body.darkTheme = false; }
  showUser(userId).then((user) => {
    const newUser = {
      ...user,
      ...{
        name: (body.name ? body.name : user.name),
        email: (body.email ? body.email : user.email),
        gravatarId: (body.gravatarId ? body.gravatarId : user.gravatarId),
        password: (body.password ? body.password : user.password),
        darkTheme: body.darkTheme,
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
