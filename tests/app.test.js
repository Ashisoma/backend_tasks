const supertest = require('supertest')

const userRoutes = require('../src/routes/userRouting');
const app = require('../index');
const { request } = require('express');

// Test for registration is successful
//  describe('POST /auth/register', () => {
//     it('should respond with 200 status code', async () => {
//       const response = await supertest(app)
//         .post('/auth/register')
//         .send({
//           username: 'user',
//           password: '123456',
//         });
  
//       expect(response.statusCode).toBe(200);
//     });
//   });



describe('POST /auth/login', () => {
    it('should respond with the contains token', async () => {
      const response = await supertest(app)
        .post('/auth/login')
        .send({
          username: 'user', // Provide valid login credentials
          password: '123456',
        });
  
      // Check if the response status code is 200 (or any other status code you expect)
      expect(response.statusCode).toBe(200);
  
      // Check if the response body contains token
      expect(response.body).toHaveProperty('accessToken');
    });
  });


  describe('GET /api/v1/tasks', () => {
    it('should respond with 200', async () => {
      const response = await supertest(app)
        .get('/api/v1/tasks');
  
      // Check if the response status code is 200 (or any other status code you expect)
      expect(response.statusCode).toBe(200);
  
      // Check if the response body contains token
    //   expect(response.body).toHaveProperty('accessToken');
    });
  });


