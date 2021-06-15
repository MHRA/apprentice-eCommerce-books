const mysql = require('mysql')
const config = require('../config')

const connection = mysql.createConnection(config.mysql)

connection.connect(err => {
    if(err) {
        return err;
    }
})


module.exports = {connection}