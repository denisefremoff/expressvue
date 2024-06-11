const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (inputPassword, storedHash) => {
  const isMatch = await bcrypt.compare(inputPassword, storedHash);
  return isMatch;
};

module.exports = {
  hashPassword,
  comparePassword,
};
