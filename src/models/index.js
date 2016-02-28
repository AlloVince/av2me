import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', '..', 'config', 'config.json'))[env];
const sequelize = new Sequelize(config.database, null, null, config);
const db = {};

//https://github.com/angelxmoreno/sequelize-isunique-validator
Sequelize.prototype.validateIsUnique = (col, msg) => {
  const conditions = { where: {} };
  msg = (!msg) ? col + ' must be unique' : msg;
  return function (value, next) {
    const self = this;
    this.Model.describe().then(function (schema) {
      conditions.where[col] = value;
      Object.keys(schema).filter(function (field) {
        return schema[field].primaryKey;
      }).forEach(function (pk) {
        conditions.where[pk] = { $ne: self[pk] };
      });
    }).then(function () {
      return self.Model.count(conditions).then(function (found) {
        return (found !== 0) ? next(msg) : next();
      });
    }).catch(next);
  };
};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    const fileArray = file.split('.');
    return (file.indexOf('.') !== 0) &&
      (['js', 'es6'].indexOf(fileArray.pop()) !== -1) && (fileArray[0] !== 'index');
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
