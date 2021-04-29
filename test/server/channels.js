const request = require('supertest');
const app = require('../app');
const db = require('../db_config');

describe('channel api tests', () => {
  beforeEach(async () => {
    await db.clear(); // on va clean la base de données
  });

  it('list empty', async () => {
    // Return an empty channel list by default
    await request(app)
      .get('/api/v1/channels')
      .expect(200, []);
  });

  it('list one element', async () => {
    // Create a channel
    const channel = {
      id: '123',
      name: 'name',
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    // Ensure we list the channels correctly
    await request(app)
      .get('/api/v1/channels')
      .expect(200, [{
        id: '123',
        name: 'name',
      }]);
  });

  it('create new channel name not given', async () => {
    await request(app)
      .post('/api/v1/channels')
      .expect(400, { name: 'Name is required.' });
  });

  it('create new channel', async () => {
    const { body } = await request(app)
      .post('/api/v1/channels')
      .send({ name: 'channel 1' })
      .expect(201);

    body.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/, // on utilise une regex pour dire que notre id correspond bien à un uui
      name: 'channel 1',
    });
  });

  it('show channel', async () => {
    // Create a channel
    const channel = {
      id: '123',
      name: 'name',
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    // Ensure we list the channels correctly
    await request(app)
      .get('/api/v1/channels/123')
      .expect(200, {
        id: '123',
        name: 'name',
      });
  });
  it('show channel with id who does not exist', async () => {
    // Ensure we list the channels correctly
    await request(app)
      .get('/api/v1/channels/fakeid')
      .expect(404);
  });

  it('update channel ', async () => {
    const channel = {
      id: '123',
      name: 'name',
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));
    // Ensure we list the channels correctly
    await request(app)
      .put('/api/v1/channels/123').send({
        name: 'new_name',
      })
      .expect(200, {
        id: '123',
        name: 'new_name',
      });
  });

  it('update not exist channel', async () => {
    await request(app)
      .put('/api/v1/channels/fakeid').send({
        name: 'new_name',
      })
      .expect(404);
  });

  it('delete channel ', async () => {
    const channel = {
      id: '123',
      name: 'name',
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));
    // Ensure we list the channels correctly
    await request(app)
      .delete('/api/v1/channels/123')
      .expect(204);
  });
});
