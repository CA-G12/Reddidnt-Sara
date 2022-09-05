const signOut = (req, res) => {
  res.clearCookie('token').send({ message: 'signed out' });
};

module.exports = signOut;
