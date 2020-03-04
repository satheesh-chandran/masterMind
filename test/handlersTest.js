const request = require('supertest');
const { app } = require('../src/routes');

describe('GET', function() {
  describe('GET game files', function() {
    it('should give game.html for url /', done => {
      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(/<title>master mind<\/title>/)
        .expect(200, done);
    });

    it('should give game.css for url /css/game.css', done => {
      request(app)
        .get('/css/game.css')
        .expect('Content-Type', /css/)
        .expect(/container/)
        .expect(200, done);
    });

    it('should give game.js for url /js/game.js', done => {
      request(app)
        .get('/js/game.js')
        .expect('Content-Type', /javascript/)
        .expect(/getDIvTemplate/)
        .expect(200, done);
    });
  });

  describe('GET /sourceColor', function() {
    it('should give the static source colors', done => {
      request(app)
        .get('/sourceColor')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
