import chai from 'chai';
import {describe, it} from 'mocha/lib/mocha';
import ExSwagger from '../../src/swagger/exswagger';
import * as exceptions from "../../src/exceptions";
chai.should();
let assert = chai.assert;

console.log(exceptions.StandardException);

describe('ExSwagger', () => {
    describe('Annotations', () => {
        it('Could get file lists', async () => {
            let files = await ExSwagger.scanFiles(__dirname + '/_example/**/*.js');
            assert.include(files, __dirname + '/_example/controller.js');
        });
        it('Could parse annotions', async () => {
            let annoations = await ExSwagger.getAnnotations([ __dirname + '/_example/controller.js' ]);
            assert.lengthOf(annoations, 5);
        });
        it('Multi folders support', async () => {
        });
    });
    describe('Swagger Docs', () => {
        it('Could parse swagger docs', async () => {
            let annoations = await ExSwagger.getAnnotations([ __dirname + '/_example/controller.js' ]);
            let docs = ExSwagger.getSwaggerDocs(annoations);
            console.log(docs);
            assert.lengthOf(docs, 3);
        });
    });
    describe('Exceptions', () => {
        it('Scan exceptions', async () => {
            let scannedExceptions = await ExSwagger.scanExceptions(__dirname + '/../../src/exceptions/**/*.js', exceptions.StandardException);
            assert.isAtLeast(scannedExceptions.length, 3);
        });
    });
});
