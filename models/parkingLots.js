var mysql = require('mysql');
var conf  = require('../conf');

var connection = mysql.createConnection(conf.db);
var sql = '';

module.exports = {
    items: function (req, callback) {
        sql = 'SELECT * FROM tainanPakings';
        return connection.query(sql, callback);
    },
    item: function (req, callback) {
        sql = mysql.format('SELECT * FROM tainanPakings WHERE PakingCode=?', [req.params.PakingCode]);
        return connection.query(sql, callback);
    },
    itemArea: function (req, callback) {
        sql = mysql.format('SELECT * FROM tainanPakings WHERE Area=?', [req.params.AreaCode]);
        return connection.query(sql, callback);
    },
    itemScooter: function (req, callback) {
        sql = mysql.format('SELECT * FROM tainanPakings where Scooter>0 AND BusinessHours=? AND Area=?', [req.params.BusinessHours, req.params.AreaCode]);
        return connection.query(sql, callback);
    }
}