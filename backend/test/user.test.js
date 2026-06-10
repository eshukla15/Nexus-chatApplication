import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/app.js'; // Import your Express app

describe('GET /users', () => {
  it('should return list of users and include the backend server name header', async () => {
    const response = await request(app).get('/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ name: 'John Doe' }]);
    expect(response.headers['x-backend-server']).toBeDefined();
  });
});