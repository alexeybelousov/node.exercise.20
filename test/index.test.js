const supertest = require('supertest');
const expect = require('chai').expect;

describe('REST API', () => {
  let server;

  before((done) => {
    require('../index');

    setTimeout(() => {
      server = supertest.agent('http://localhost:3000');
      done();
    }, 1000);
  });

  it('GET /users, should return empty array', done => {
    server
      .get('/users')
      .expect(200)
      .end((err, res) => {
        expect(res.body).deep.equal([]);
        done();
      })
  });

  it('POST /users, should return Object', done => {
    server
      .post('/users')
      .send({
        "name": "Roma", "score": 400
      })
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).deep.equal({
          id: 0
        });
        done();
      })
  });

  it('DELETE /users/:id, should return status is 200', done => {
    server
      .delete('/users/0')
      .expect(200)
      .end((err, res) => {
        done();
      })
  });
});
