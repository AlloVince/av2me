'use strict';

//import 'babel-polyfill';
import fs from "fs";
import doctrine from "doctrine";
import * as acorn from "acorn/dist/acorn";
import glob from "glob";
import yaml  from 'js-yaml';
import path from 'path';

const TYPE_PATH = 'path';
const TYPE_DEFINITION = 'definition';
const TYPE_EXCEPTION = 'exception';
const TYPE_UNKNOWN = 'unknown';
export default class ExSwagger {

    static async scanFiles(path, options = {}) {
        return new Promise((resolve, reject) => {
            glob(path, options, (err, files) => {
                if ( err ) {
                    return reject(err);
                }
                return resolve(files);
            });
        });
    }

    static async readFile(path, options = {}) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, options, (err, data) => {
                if ( err ) {
                    return reject(err);
                }
                return resolve(data);
            })
        });
    }

    static async writeFile(content, dist) {
        return new Promise((resolve, reject) => {
            fs.open(dist, 'w', '0777', (error, fd) => {
                if ( error ) {
                    return reject(error);
                }
                return resolve(fs.write(fd, content));
            });
        })
    }

    static async getAnnotations(files) {
        let comments = [];
        for (let filepath of files) {
            let source = await ExSwagger.readFile(filepath);
            acorn.parse(source, {
                onComment: comments
            });
        }
        //Annotations MUST start with double stars
        return comments.filter((v) => v.type === 'Block' && v.value.startsWith("*\n"));
    }

    static getSwaggerDocs(annotations) {
        return ExSwagger._parseAnnotaions(annotations)
    }

    static _parseAnnotaions(annotations) {
        let docs = [];
        for (let annotation of annotations) {
            if ( !annotation.value ) {
                continue;
            }
            //支持两种注解:
            //1. 所有行首必定为 space*
            //2. 所有行首必定不为 space*
            let unwrap = annotation.value.startsWith("*\n *") ? true : false;
            let {tags:tags = []} = doctrine.parse(annotation.value, {unwrap: unwrap});
            if ( tags.length < 1 ) {
                continue;
            }
            let doc = [];
            doc = tags.filter(v => {
                if ( v.title && (v.title === 'swagger' || v.title === 'throws') && v.description ) {
                    return v;
                }
            }).map(v => {
                //console.log(v);
                if ( v.title === 'swagger' ) {
                    let value = {};
                    let desc = '';
                    let type = TYPE_UNKNOWN;
                    try {
                        //NOTE: Swagger docs 解析错误也不会报错
                        value = yaml.load(v.description);
                        let key = Object.keys(value)[ 0 ];
                        type = key.startsWith('/') ? TYPE_PATH : TYPE_DEFINITION;
                    } catch (e) {
                        //console.log(e)
                        desc = v.description;
                    }
                    return {
                        type: type,
                        //TODO: @swagger 后直接跟字符
                        description: desc,
                        value: value
                    }
                }
                return {
                    type: TYPE_EXCEPTION,
                    description: v.description,
                    value: v.type.name
                }
            });
            if ( doc.length > 0 ) {
                docs.push(doc);
            }
        }
        return docs;
    }

    static async getExceptions() {

    }

    static getModels(models, blacklist = []) {
        //console.log(models);
        //console.log(blacklist);
        let swaggerModels = new Map();
        for (let modelName in models) {
            if ( blacklist.includes(modelName) ) {
                continue;
            }

            let model = models[ modelName ].attributes;
            let definition = {
                type: 'object',
                properties: {}
            };
            let requires = [];
            for (let columnName in model) {
                let column = model[ columnName ];
                let property = {
                    type: "string",
                    format: "int64",
                    description: column.comment,
                    default: column.defaultValue,
                };
                console.log(column);
                if ( false === column.allowNull ) {
                    requires.push(columnName)
                }
                definition.properties[ columnName ] = property;
            }
            definition.required = requires;
            swaggerModels.set(modelName, definition);
        }
        return swaggerModels;
    }

    static async scanExceptions(path, exceptionInterface = Error) {
        let exceptions = [];
        let files = await ExSwagger.scanFiles(path);
        if ( files.length < 1 ) {
            return exceptions;
        }
        for (let file of files) {
            let exceptionsInFile = require(file);
            for (let exceptionName in exceptionsInFile) {
                let exceptionClass = exceptionsInFile[ exceptionName ];
                let exception = new exceptionClass();
                if ( exception instanceof exceptionInterface ) {
                    exceptions.push(exception);
                }
            }
        }
        return exceptions;
    }

    exceptionClassToSwagger(exceptionClass) {
        let exception = new exceptionClass();
        return {
            'code': exception.code(),
            'statusCode': exception.statusCode
        }
    }

    getCommonErrors() {

    }


    async exportJson(dist) {
        /*
         let files = await ExSwagger.scanFiles(this._annotationPath);
         let annotations = await ExSwagger.getAnnotations(files);
         let docs = ExSwagger.getSwaggerDocs(annotations);
         let template = this._swaggerTemplate;
         let key = '';
         for (let section of docs) {
         for (let element of section) {

         if ( element.type === TYPE_PATH ) {
         key = Object.keys(element.value)[ 0 ];
         template.paths[ key ] = element.value[ key ];
         } else if ( element.type === TYPE_DEFINITION ) {
         key = Object.keys(element.value)[ 0 ];
         template.definitions[ key ] = element.value[ key ];
         } else if ( element.type === 'exception' ) {
         //this.exceptionClassToSwagger();
         }

         }
         }
         */
        let models = ExSwagger.getModels(this._models, this._modelBlacklist);
        //console.log(models);

        //return await ExSwagger.writeFile(JSON.stringify(template), dist);

        //model support
        //exception support
    }

    constructor({
        projectRoot,
        swaggerTemplate,
        annotationPath = projectRoot + '/**/*.js',
        exceptionInterface,
        models,
        modelBlacklist,
        exceptionPath = projectRoot + '/**/exceptions/**/*.js',
        }) {
        this._projectRoot = projectRoot;
        this._swaggerTemplate = swaggerTemplate;
        this._models = models;
        this._modelBlacklist = modelBlacklist,
            this._annotationPath = annotationPath;
        this._exceptionPath = exceptionPath;
        this._exceptionInterface = exceptionInterface;
        this._swaggerDocs = {};
        this._annotations = [];
    }
}


/*
 (async () => {
 let exSwagger = new ExSwagger({
 projectRoot: __dirname + '/../../build',
 swaggerTemplate: __dirname + '/config/config.json',
 //modelPaths: [ __dirname + '/../models' ],
 });
 })();
 */
