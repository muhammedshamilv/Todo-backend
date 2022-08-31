const bcrypt = require('bcrypt');

// salt and hash password
function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

// compare password
function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports.hashPassword = hashPassword;
module.exports.comparePassword = comparePassword;
