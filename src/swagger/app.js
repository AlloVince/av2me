'use strict';

import 'babel-polyfill';
import fs from "fs";
import doctrine from "doctrine";
import * as acorn from "acorn/dist/acorn.js";
//require('acorn-es7-plugin')(acorn);
import glob from "glob";
import yaml  from 'js-yaml';
import swaggerDoc from './config/config.json';
import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';

async function findFiles(path, options = {}) {
    return new Promise((resolve, reject) => {
        glob(path, options, (err, files) => {
            if ( err ) {
                return reject(err);
            }
            return resolve(files);
        });
    });
}

async function readFile(path, options = {}) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, options, (err, data) => {
            if ( err ) {
                return reject(err);
            }
            return resolve(data);
        })
    });
}

async function writFile(content, dist) {
    return new Promise((resolve, reject) => {
        fs.open(dist, 'w', '0777', (error, fd) => {
            if ( error ) {
                return reject(error);
            }
            return resolve(fs.write(fd, content));
        });
    })
}

async function getSwaggerDocs(path) {
    let comments = [];
    let docs = [];
    let files = await findFiles(path);
    console.log(files);
    for (let filepath of files) {
        let source = await readFile(filepath);
        acorn.parse(source, {
            //ecmaVersion: 7,
            //plugins: {asyncawait: true},
            //sourceType: "module",
            onComment: comments
        });
    }
    //注解首2个字符必须满足条件  *\n
    comments = comments.filter((v) => v.type === 'Block' && v.value.startsWith("*\n"));
    for (let comment of comments) {
        //支持两种注解:
        //1. 所有行首必定为 space*
        //2. 所有行首必定不为 space*
        let unwrap = comment.value.startsWith("*\n *") ? true : false;
        let {tags:doc = []} = doctrine.parse(comment.value, {unwrap: unwrap});
        docs = docs.concat(
            doc.filter(v => v.title === 'swagger').map(v => yaml.load(v.description))
        );
    }
    return docs;
}


const app = express();
let port = process.argv[ 2 ] || 15638;
let sourceFiles = __dirname + '/../../build/**/*.js';
let distFile = __dirname + '/ui/docs.json';

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
        console.log(`Start parsing swagger docs from ${sourceFiles}`);
        let docs = await getSwaggerDocs(sourceFiles);
        console.log(`${docs.length} swagger docs found`);
        console.log(docs);

        for (let doc of docs) {
            for (let key in doc) {
                if ( key.startsWith('/') ) {
                    swaggerDoc.paths[ key ] = doc[ key ];
                } else {
                    swaggerDoc.definitions[ key ] = doc[ key ];
                }
                break;
            }
        }

        await writFile(JSON.stringify(swaggerDoc), distFile);
        console.log(`Swagger docs generated as ${distFile}`);

        app.listen(port, () => {
            console.log(`Swagger app listening on port ${port}!`);
        });
    } catch (err) {
        console.log(err.stack);
    }
})();

