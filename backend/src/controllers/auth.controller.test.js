import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../lib/utils.js', () => ({
  __esModule: true,
  generateToken: vi.fn(),
}));

import { signup, login, logout } from './auth.controller.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';

const createResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.cookie = vi.fn().mockReturnValue(res);
  return res;
};

describe('Auth Controller', () => {
  let saveSpy;
  let findOneSpy;
  let compareSpy;
  let genSaltSpy;
  let hashSpy;

  beforeEach(() => {
    vi.clearAllMocks();

    saveSpy = vi.spyOn(User.prototype, 'save').mockResolvedValue(undefined);
    findOneSpy = vi.spyOn(User, 'findOne');
    compareSpy = vi.spyOn(bcrypt, 'compare');
    genSaltSpy = vi.spyOn(bcrypt, 'genSalt');
    hashSpy = vi.spyOn(bcrypt, 'hash');
  });

  it('returns 400 when signup payload is incomplete', async () => {
    const req = { body: { fullName: 'Test', email: '' } };
    const res = createResponse();

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
  });

  it('returns 400 when password is too short', async () => {
    const req = { body: { fullName: 'Test', email: 'test@example.com', password: '123' } };
    const res = createResponse();

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'password must be at least of 6 characters' });
  });

  it('returns 400 when email already exists', async () => {
    findOneSpy.mockResolvedValue({ email: 'test@example.com' });
    const req = { body: { fullName: 'Test', email: 'test@example.com', password: '123456' } };
    const res = createResponse();

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'email already exists' });
  });

  it('creates a new user on successful signup', async () => {
    findOneSpy.mockResolvedValue(null);
    genSaltSpy.mockResolvedValue('salt');
    hashSpy.mockResolvedValue('hashed');

    const req = { body: { fullName: 'Test', email: 'test@example.com', password: '123456' } };
    const res = createResponse();

    await signup(req, res);

    expect(generateToken).toHaveBeenCalled();
    expect(generateToken.mock.calls[0][0]).toBeDefined();
    expect(generateToken.mock.calls[0][1]).toBe(res);
    expect(saveSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@example.com' }));
  });

  it('returns 400 when login credentials are invalid', async () => {
    findOneSpy.mockResolvedValue(null);
    const req = { body: { email: 'test@example.com', password: 'wrong' } };
    const res = createResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('returns 400 when password is incorrect during login', async () => {
    findOneSpy.mockResolvedValue({ _id: 'mock-user-id', password: 'hashed' });
    compareSpy.mockResolvedValue(false);

    const req = { body: { email: 'test@example.com', password: 'wrong' } };
    const res = createResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('logs in successfully with valid credentials', async () => {
    findOneSpy.mockResolvedValue({ _id: 'mock-user-id', fullName: 'Test User', email: 'test@example.com', password: 'hashed', profilePic: '' });
    compareSpy.mockResolvedValue(true);

    const req = { body: { email: 'test@example.com', password: '123456' } };
    const res = createResponse();

    await login(req, res);

    expect(generateToken).toHaveBeenCalledWith('mock-user-id', res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@example.com' }));
  });

  it('returns 200 and clears cookie on logout', () => {
    const req = {};
    const res = createResponse();

    logout(req, res);

    expect(res.cookie).toHaveBeenCalledWith('jwt', '', { maxAge: 0 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Logged Out Succesfully' });
  });
});
