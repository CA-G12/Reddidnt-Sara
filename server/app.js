const { join } = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const router = require('./routers');

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable('x-powered-by');

app.set('port', process.env.PORT || 3000);
app.use(express.static(join(__dirname, '..', 'public')));
app.use(router);

module.exports = app;
