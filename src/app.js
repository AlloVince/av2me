/*eslint no-unused-vars: [2, {"args": "after-used", "argsIgnorePattern": "next"}]*/
import 'babel-polyfill';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes/index';
import users from './routes/users';
import { StandardException, ResourceNotFoundException } from './exceptions';

const app = express();

app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/', routes);
app.use('/v1/users', users);

app.use((req, res, next) => {
  const err = new ResourceNotFoundException();
  next(err);
});


if (app.get('env') === 'development') {
  //NOTE: 最后的next是必须的
  app.use((err, req, res, next) => {
    if (!(err instanceof StandardException)) {
      return res.status(500).json({
        code: -1,
        message: err.message,
        errors: [],
        stack: err.stack
      });
    }
    res.status(err.statusCode).json({
      code: err.code(),
      message: err.message,
      errors: [],
      stack: err.stack
    });
  });
}


//NOTE: 最后的next是必须的
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
