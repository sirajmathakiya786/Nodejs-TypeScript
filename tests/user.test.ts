import request from 'supertest';
import server from '../server';

describe('User API', () => {
  test('should check if email exists', async () => {
    const existingEmail = 'test@gmail.com';

    
    const responseExisting = await request(server)
      .post('/api/users/add')
      .send({ email: existingEmail });
    console.log('fdfd', responseExisting.body);
    
    expect(responseExisting.status).toBe(400);
    expect(responseExisting.body).toBeDefined(); 
    expect(responseExisting.body.message).toEqual('Email already exists');
  });
});
