const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const Dowloadlist = sequelize.define('doenloadlist', {
  
  downloadlist: {
    type: Sequelize.STRING,
  }
});

module.exports = Dowloadlist;