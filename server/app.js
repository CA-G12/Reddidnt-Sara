const { join } = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const router = require('./routers');
const authenticate = require('./middleware/authentication')

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable('x-powered-by');

app.set('port', process.env.PORT || 3000);

app.use('/post', authenticate);

app.use(express.static(join(__dirname, '..', 'public')));
app.use(router);

app.get('/profile', authenticate, (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'html', 'profile.html'));
});

app.use((req, res, next) => {
  res.status(404).send('not found');
});

app.use((err, req, res, next) => {
  if (err.status === 401) {
    res.redirect('/');
  } else {
    res.status(err.status || 500).json({ message: err.msg || 'something went wrong', status: err.status || 500 });
  }
});

module.exports = app;
