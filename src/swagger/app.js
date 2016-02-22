//import 'babel-polyfill';
import fs from 'fs';
import ExSwagger from './exswagger';
import * as exceptions from './../exceptions';
import models from './../models';
import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';

//For quick debug
import gulp from 'gulp';
import babel from 'gulp-babel';
gulp.task('babel', () => {
  return gulp.src(__dirname + '/../')
    .pipe(babel({
      presets: ['stage-3', 'es2015'],
      plugins: [
        ['babel-plugin-transform-builtin-extend', {
          globals: ['Error']
        }]
      ]
    }))
    .pipe(gulp.dest(__dirname + '/../../build'));
});
gulp.start('babel');

const app = express();
const distFile = `${__dirname}/ui/docs.json`;
const swagger = new ExSwagger({
  models,
  projectRoot: `${__dirname}/../../build`,
  exceptionPath: `${__dirname}/../exceptions`,  //这里的exception与exception interface需要保持在同一文件
  exceptionInterface: exceptions.StandardException,
  modelBlacklist: ['sequelize', 'Sequelize'],
  swaggerTemplate: require('./config/config.json'),
});
const port = process.argv[2] || 15638;

app.get('/', (req, res) => {
  const index = `${__dirname}/../../node_modules/swagger-ui/dist/index.html`;
  fs.readFile(index, 'utf8', (err, data) => {
    if (err) {
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

    app.listen(port, () => {
      console.log(`Swagger app listening on port ${port}!`);
    });
  } catch (err) {
    console.log(err.stack);
  }
})();
