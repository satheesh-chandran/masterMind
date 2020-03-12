const request = require('supertest');
const { app } = require('../src/routes');
const sinon = require('sinon');

describe('GET', function() {
  before(() => {
    app.locals.idProvider = () => 'a';
  });
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
        .expect(/getDivTemplate/)
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

describe('POST for submitColors', function() {
  before(() => {
    app.locals.idProvider = () => 'a';
  });
  it('should return the check result for the given colors', done => {
    request(app)
      .post('/submitColors')
      .set('Cookie', 'session=a')
      .send({ colors: ['red', 'brown', 'blue', 'orange', 'green'] })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should redirect to game page if Cookie is not present', done => {
    request(app)
      .post('/submitColors')
      .send({ colors: ['red', 'brown', 'blue', 'orange', 'green'] })
      .expect(302, done);
  });

  it('should response as bad request if the color field is not found', done => {
    request(app)
      .post('/submitColors')
      .set('Cookie', 'session=a')
      .send({})
      .expect(/Bad request/)
      .expect(400, done);
  });

  before(() => {
    app.locals.games = {
      checkColors: sinon.fake.returns({ gameOver: true }),
      getCodeColor: sinon.fake.returns([
        'red',
        'brown',
        'blue',
        'orange',
        'green'
      ]),
      delete: sinon.fake.returns(true)
    };
  });

  it('should return the check result for the given colors', done => {
    request(app)
      .post('/submitColors')
      .set('Cookie', 'session=a')
      .send({ colors: ['red', 'brown', 'blue', 'orange', 'black'] })
      .expect('Content-Type', /json/)
      .expect(/green/)
      .expect(200, done);
  });
});
