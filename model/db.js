const Sequelize = require("sequelize");
var pg = require('pg');
pg.defaults.ssl = true;

const config = {
  dialect: "postgres",
  define: {
    createdAt: "createdat",
    updatedAt: "updatedat",
  },
};

const DATABASE_CONF = {
    user: 'pehdyxswejdngk',
    password: 'ece4843a0084c76165133db2d0d3e413447460a4db7edea764f48d0f56514881',
    database: 'ddkcrpdp4ta7i7',
    port: 5432,
    host: 'ec2-174-129-255-7.compute-1.amazonaws.com',
    ssl: true
}

const DATABASE_URL = "postgres://pehdyxswejdngk:ece4843a0084c76165133db2d0d3e413447460a4db7edea764f48d0f56514881@ec2-174-129-255-7.compute-1.amazonaws.com:5432/ddkcrpdp4ta7i7";

const database = new Sequelize(DATABASE_URL, config);

database.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((e) => {
      console.log(e)
    console.log('Database error!');
  });


module.exports = database;
