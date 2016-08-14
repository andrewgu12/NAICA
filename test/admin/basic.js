require('babel-register');
const assert     = require('assert');
const should     = require('should');
const request    = require('supertest');
const mongoose   = require('mongoose');
const connection = require('../../config/connection.js');

describe('Login and Logout', () =>{

  before((done) => {
    mongoose.connect(connection.url);
    done();
  });

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
      should.not.exist(err);
      res.status.should.equal(302);
      res.header['location'].should.containEql('/admin');
      done();
    });
  });

  it ('should logout', (done) => {
    request('http://localhost:3000')
    .get('/admin/logout')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(302);
      res.header['location'].should.equal('/admin/login');
      done();
    });
  });
});
