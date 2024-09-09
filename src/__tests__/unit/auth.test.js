require('dotenv').config();
const request = require('supertest');
const app = require('@root/app');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('@models/user.model');
const { JWT_SECRET } = process.env;

// Mock database connection

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Cleanup database after each test
afterEach(async () => {
  await User.deleteMany();
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Authentication System', () => {
  it('should register a user successfully', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
        role: 'Organizer',
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('email', 'testuser@example.com');
    expect(response.body.user).toHaveProperty('role', 'Organizer');
  });

  it('should login a user successfully and return a JWT', async () => {
    const user = new User({ email: 'testuser@example.com', password: 'password123' });
    await user.save();
    
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    
    const decoded = jwt.verify(response.body.token, JWT_SECRET);
    expect(decoded).toHaveProperty('id', user._id.toString());
  }, 10000);

  it('should not login a user with incorrect credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});
