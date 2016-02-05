"use strict";
import 'babel-polyfill';
import express      from 'express';
import path         from 'path';
import favicon      from 'serve-favicon';
import logger       from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import {Injector}   from 'di';
import Request   from 'request';

import routes       from './routes/index';
import users        from './routes/users';

let app = express();

/*
@Injector(Request)
class HttpClient {
    constructor(request) {
        this.request = request;
    }
}

let injector = new Injector();
let client = injector.get(Request);
console.log(client);
*/


app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));

app.use('/', routes);
app.use('/users', users);

// using arrow syntax
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if ( app.get('env') === 'development' ) {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;