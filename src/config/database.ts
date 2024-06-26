import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
   dialect: 'mysql',
   database: 'db',
   username: 'root',
   password: 'root',
   host: 'localhost',
   port: 3306,
   logging: false
});

export default sequelize;