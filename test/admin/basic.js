require('babel-register');
const assert     = require('assert');
const should     = require('should');
const request    = require('supertest');
const mongoose   = require('mongoose');
const connection = require('../../config/connection.js');

describe('Login and Logout', () =>{

  before(done => {
    mongoose.connect(connection.url);
    done();
  })

  describe('Login', () => {
      it ('should let me login as test@test.com', (done) => {
        const user = {
          email: 'test@test.com',
          password: 'test123'
        };

        request('http://localhost:3000')
        .post('/admin/login')
        .send(user)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          res.should.have.status(400);
          done();
        });
      });
  });
});
