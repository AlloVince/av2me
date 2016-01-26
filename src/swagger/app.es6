'use strict';

import 'babel-polyfill';
import parse from 'jsdoc-parse';
import yaml  from 'js-yaml';
import swaggerDoc from './config/config.json';
import fs from 'fs';
import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';

async function getAnnotations(file) {
    return new Promise((resolve, reject) => {
        let parseStream = parse({
            src: file
        });
        parseStream.on('readable', () => {
            var chunk = parseStream.read();
            if ( chunk ) {
                let data = JSON.parse(chunk);
                return resolve(data);
            }
        });
        parseStream.on('error', (e) => {
            return reject(e);
        });
    });
}

async function toSwaggerDocs(annotations, dist = __dirname + '/ui/docs.json') {
    let docs = [];
    for (let doc of annotations) {
        let {id, customTags:tags=[]} = doc;
        tags = tags.filter(t => t.tag === 'swagger');
        if ( tags.length < 1 ) {
            continue;
        }
        docs.push({
            id: id,
            value: yaml.load(tags[ 0 ].value)
        });
    }

    for (let doc of docs) {
        for (let key in doc.value) {
            swaggerDoc.paths[ key ] = doc.value[ key ];
        }
    }

    return new Promise((resolve, reject) => {
        fs.open(dist, 'w', '0777', (error, fd) => {
            if ( error ) {
                return reject(error);
            }
            fs.write(fd, JSON.stringify(swaggerDoc));
            return resolve(swaggerDoc);
        });
    })
}

const app = express();
let port = process.argv[ 2 ] || 15638;
let sourceFiles = path.join(__dirname, '/source/*.js');

app.get('/', (req, res) => {
    let index = __dirname + '/../node_modules/swagger-ui/dist/index.html';
    fs.readFile(index, 'utf8', function (err, data) {
        if ( err ) {
            return console.log(err);
        }
        res.send(data.replace('http://petstore.swagger.io/v2/swagger.json', 'docs.json'));
    });
});
app.use(serveStatic(path.join(__dirname, '/../node_modules/swagger-ui/dist')));
app.use(serveStatic(path.join(__dirname, '/ui')));

(async () => {
    try {
        console.log(`Start parsing annotations from ${sourceFiles}`);
        let annotations = await getAnnotations(sourceFiles);
        console.log(`Start generating swagger docs`);
        let doc = await toSwaggerDocs(annotations);
        console.log(`Swagger docs generated:`);
        console.log(doc);

        app.listen(port, () => {
            console.log(`Swagger app listening on port ${port}!`);
        });
    } catch (err) {
        console.log(err.stack);
    }
})();

