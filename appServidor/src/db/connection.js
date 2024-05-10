const mysql = require('mysql');
const Keys = require('../keys');

const connection = mysql.createPool(Keys);

module.exports = connection;
