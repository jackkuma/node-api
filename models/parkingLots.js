var mysql = require('mysql');
var conf  = require('../conf');

var connection = mysql.createConnection(conf.db);
var sql = '';

module.exports = {
    items: function (req, callback) {
        sql = 'SELECT * FROM tainanPakings';
        return connection.query(sql, callback);
    },
    itemType: function (req, callback) {
        sql = 'SELECT CarType, Num, pakingNum, case when CarType = "Bus車位" then round((Num/Total) * 100, 2) \
        when CarType = "殘障車位" then round((Num/Total) * 100, 2) when CarType = "婦幼車位" then round((Num/Total) * 100, 2) \
        when CarType = "綠能車位" then round((Num/Total) * 100, 2) else 0 end as Ratio FROM ( SELECT a.CarType, a.Num, a.pakingNum, b.Total \
        FROM (SELECT "Bus車位" as CarType, SUM(CarBus) pakingNum, count(*) Num FROM parking.tainanPakings Where CarBus>0 \
        UNION ALL SELECT "殘障車位" as CarType, SUM(CarSpecial) pakingNum, count(*) Num FROM parking.tainanPakings Where CarSpecial>0 \
        UNION ALL SELECT "婦幼車位" as CarType, SUM(CarKids) pakingNum, count(*) Num FROM parking.tainanPakings Where CarKids>0 \
        UNION ALL SELECT "綠能車位" as CarType, SUM(CarGreen) pakingNum, count(*) Num FROM parking.tainanPakings Where CarGreen>0) a, \
        (SELECT count(*) as Total FROM parking.tainanPakings) b ) tmpData';
        return connection.query(sql, callback);
    },
    item: function (req, callback) {
        sql = mysql.format('SELECT * FROM tainanPakings WHERE PakingCode=?', [req.params.PakingCode]);
        return connection.query(sql, callback);
    },
    itemArea: function (req, callback) {
        sql = mysql.format('SELECT * FROM tainanPakings WHERE Area=?', [req.params.AreaName]);
        return connection.query(sql, callback);
    },
    itemOpen: function (req, callback) {
        sql = mysql.format('SELECT * FROM tainanPakings where BusinessHours=? AND Area=?', [req.params.BusinessHours, req.params.AreaName]);
        return connection.query(sql, callback);
    }
}