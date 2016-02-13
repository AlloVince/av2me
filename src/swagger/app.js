'use strict';

//import 'babel-polyfill';
import fs from 'fs';
import ExSwagger from './exswagger';
import * as exceptions from './../exceptions';
import models from './../models';
import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';

const app = express();
let distFile = __dirname + '/ui/docs.json';
const swagger = new ExSwagger({
    projectRoot: __dirname + '/../../build',
    exceptionInterface: exceptions.StandardException,
    models: models,
    modelBlacklist: [ 'sequelize', 'Sequelize' ],
    swaggerTemplate: require('./config/config.json'),
});
let port = process.argv[ 2 ] || 15638;

app.get('/', (req, res) => {
    let index = __dirname + '/../../node_modules/swagger-ui/dist/index.html';
    fs.readFile(index, 'utf8', function (err, data) {
        if ( err ) {
            return console.log(err);
        }
        res.send(data.replace('http://petstore.swagger.io/v2/swagger.json', 'docs.json'));
    });
});
app.use(serveStatic(path.join(__dirname, '/../../node_modules/swagger-ui/dist')));
app.use(serveStatic(path.join(__dirname, '/ui')));

(async () => {
    try {
        //console.log(`Start parsing swagger docs from`);
        //console.log(swager);
        //console.log(distFile);
        await swagger.exportJson(distFile);
        //console.log(`Swagger docs generated as ${distFile}`);

        //app.listen(port, () => {
        //    console.log(`Swagger app listening on port ${port}!`);
        //});
    } catch (err) {
        console.log(err.stack);
    }
})();

