import request from 'supertest';
import app from '../src/app.js'; // Import your Express app

describe('GET /users', () => {
  it('should return list of users', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ name: 'John Doe' }]);
  });
});