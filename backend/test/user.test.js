const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('GET /users', () => {
  it('should return list of users', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ name: 'John Doe' }]);
  });
});