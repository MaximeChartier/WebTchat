const request = require('supertest');
const app = require('../app');
const db = require('../db_config');

describe('messages api tests', () => {
  beforeEach(async () => {
    await db.clear(); // on va clean la base de données
  });

  it('list empty', async () => {
    // Return an empty message list by default
    await request(app)
      .get('/api/v1/messages')
      .expect(200, []);
  });

  it('list one element', async () => {
    // Create a message
    const now = Date.now();
    const message = {
      id: 'messageid',
      user_id: 'userid',
      message_id: 'messageid',
      content: 'super content',
      created_at: now,
    };
    await db.put(`messages:${message.id}`, JSON.stringify(message));

    // Ensure we list the messages correctly
    await request(app)
      .get('/api/v1/messages')
      .expect(200, [message]);
  });

  it('create new message content not given', async () => {
    await request(app)
      .post('/api/v1/messages')
      .expect(400);
  });

  it('create new message', async () => {
    const user = {
      id: 'userid',
    };
    const channel = {
      id: 'channelid',
    };
    await db.put(`users:${user.id}`, JSON.stringify(user));
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));
    const { body } = await request(app)
      .post('/api/v1/messages')
      .send(
        {
          content: 'message 1',
          user_id: user.id,
          channel_id: channel.id,
        },
      );

    body.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/, // on utilise une regex pour dire que notre id correspond bien à un uui
      content: 'message 1',
    });
  });

  it('show message', async () => {
    // Create a message
    const message = {
      id: '123',
      name: 'name',
    };
    await db.put(`messages:${message.id}`, JSON.stringify(message));

    // Ensure we list the messages correctly
    await request(app)
      .get('/api/v1/messages/123')
      .expect(200, {
        id: '123',
        name: 'name',
      });
  });

  it('show message with id who does not exist', async () => {
    // Ensure we list the messages correctly
    await request(app)
      .get('/api/v1/messages/fakeid')
      .expect(404);
  });

  it('update message ', async () => {
    const message = {
      id: '123',
      content: 'content',
    };
    await db.put(`messages:${message.id}`, JSON.stringify(message));
    // Ensure we list the messages correctly
    await request(app)
      .put('/api/v1/messages/123').send({
        content: 'new_content',
      })
      .expect(200, {
        id: '123',
        content: 'new_content',
      });
  });

  it('update not exist message', async () => {
    await request(app)
      .put('/api/v1/messages/fakeid').send({
        content: 'new_content',
      })
      .expect(404);
  });

  it('delete message ', async () => {
    const message = {
      id: '123',
      name: 'name',
    };
    await db.put(`messages:${message.id}`, JSON.stringify(message));
    // Ensure we list the messages correctly
    await request(app)
      .delete('/api/v1/messages/123')
      .expect(204);
  });
});
