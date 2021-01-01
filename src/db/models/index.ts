import fs from 'fs';
import { basename as _basename, join } from 'path';
import { Sequelize, Model } from 'sequelize';
const config = require('../config/config.js');

interface Database {
  sequelize: Sequelize;
  User?: Model<Model>;
  Role?: Model<Model>;
}

const basename = _basename(__filename);
export const sequelize: Sequelize = new Sequelize(config.url, config);
const db: Database = { sequelize };

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model: Model = require(join(__dirname, file));
    // db[model.name] = model;
    console.log(model);
  });

export default db;
