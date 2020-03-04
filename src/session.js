const crypto = require('crypto');

const idProvider = () =>
  crypto
    .createHash('sha1')
    .update(`${+new Date()}`)
    .digest('hex')
    .slice(0, 10);

class Session {
  constructor() {
    this.sessions = [];
  }

  create() {
    const id = idProvider();
    this.sessions.push(id);
    return id;
  }

  delete(id) {
    const sessionIndex = this.sessions.findIndex(session => session === id);
    this.sessions.splice(sessionIndex, 1);
    return true;
  }
}

module.exports = { Session };
