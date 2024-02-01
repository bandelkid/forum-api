// src/Domains/threads/entities/_test/Thread.test.js
const Thread = require('../Thread');

describe('Thread entities', () => {
  it('should create Thread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'Dummy Title',
      body: 'Dummy Body',
      date: '2022-01-01',
      username: 'user-123',
    };

    // Action
    const thread = new Thread(payload);

    // Assert
    expect(thread.id).toEqual(payload.id);
    expect(thread.title).toEqual(payload.title);
    expect(thread.body).toEqual(payload.body);
    expect(thread.date).toEqual(payload.date);
    expect(thread.username).toEqual(payload.username);
  });

  // Add more test cases as needed
});
