require('./db_init');
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/user/user.routes');
const oauthRoutes = require('./routes/oauth/oauth.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//라우터
app.use('/api/user', userRoutes);
app.use('/api/oauth', oauthRoutes);

//에러핸들러
app.use(errorHandler);

module.exports = app;
