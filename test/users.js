const request = require('supertest');
const app = require('../bin/server');
const db = require('../app/config/db_config');

describe('user api tests', () => {
  beforeEach(async () => {
    await db.clear(); // on va clean la base de données
  });

  it('list empty', async () => {
    // Return an empty user list by default
    await request(app)
      .get('/api/v1/users')
      .expect(200, []);
  });

  it('list one element', async () => {
    // Create a user
    const user = {
      id: '123',
      name: 'name',
      email: 'email',
      password: 'password',
    };
    await db.put(`users:${user.id}`, JSON.stringify(user));

    // Ensure we list the users correctly
    await request(app)
      .get('/api/v1/users')
      .expect(200, [user]);
  });

  it('create new user name not given', async () => {
    await request(app)
      .post('/api/v1/users')
      .expect(400);
  });

  it('create new user', async () => {
    const { body } = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'name',
        email: 'email@test.fr',
        password: 'password',
      }).expect(201);

    body.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/, // on utilise une regex pour dire que notre id correspond bien à un uui
      name: 'name',
      email: 'email@test.fr',
      password: 'password',
    });
  });

  it('show user', async () => {
    // Create a user
    const user = {
      id: '123',
      name: 'name',
      email: 'email',
      password: 'password',
    };
    await db.put(`users:${user.id}`, JSON.stringify(user));

    // Ensure we list the users correctly
    await request(app)
      .get('/api/v1/users/123')
      .expect(200, user);
  });
  it('show user with id who does not exist', async () => {
    // Ensure we list the users correctly
    await request(app)
      .get('/api/v1/users/fakeid')
      .expect(404);
  });

  it('update user ', async () => {
    const user = {
      id: '123',
      name: 'name',
      email: 'email',
      password: 'password',
    };
    await db.put(`users:${user.id}`, JSON.stringify(user));
    // Ensure we list the users correctly
    await request(app)
      .put('/api/v1/users/123').send({
        name: 'new_name',
        email: 'newemail@test.fr',
        password: 'new_password',
      })
      .expect(200, {
        id: user.id,
        name: 'new_name',
        email: 'newemail@test.fr',
        password: 'new_password',
      });
  });

  it('update not exist user', async () => {
    await request(app)
      .put('/api/v1/users/fakeid').send({
        name: 'new_name',
      })
      .expect(404);
  });

  it('delete user ', async () => {
    const user = {
      id: '123',
      name: 'name',
      email: 'email',
      password: 'password',
    };
    await db.put(`users:${user.id}`, JSON.stringify(user));
    // Ensure we list the users correctly
    await request(app)
      .delete('/api/v1/users/123')
      .expect(204);
  });
});
