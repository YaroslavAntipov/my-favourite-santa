const Sequelize = require('sequelize');
const config = {
  define: {
    createdAt: 'createdat',
    updatedAt: 'updatedat'
  }
};

const DATABASE_URL =
  'postgres://pehdyxswejdngk:ece4843a0084c76165133db2d0d3e413447460a4db7edea764f48d0f56514881@ec2-174-129-255-7.compute-1.amazonaws.com:5432/ddkcrpdp4ta7i7';

const database = new Sequelize(DATABASE_URL, config);

module.exports = database;
