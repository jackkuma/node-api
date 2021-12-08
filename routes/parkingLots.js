var express = require('express');
var lots = require('../models/parkingLots');

var router = express.Router();

// 獲取 /parking 請求
router.route('/')
    .get(function(req, res) {
        lots.items(req, function(err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            //沒有找到資源
            if (!results.length) {
                res.sendStatus(404);
                return;
            }

            res.json(results);
        });
    });

router.route('/:PakingCode')
    .get(function(req, res) {
        lots.item(req, function(err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            if (!results.length) {
                res.sendStatus(404);
                return;
            }

            res.json(results);
        });
    });

router.route('/Area/:AreaCode')
    .get(function(req, res) {
        lots.itemArea(req, function(err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            if (!results.length) {
                res.sendStatus(404);
                return;
            }

            res.json(results);
        });
    });

router.route('/Scooter/:BusinessHours&:AreaCode')
    .get(function(req, res) {
        lots.itemScooter(req, function(err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            if (!results.length) {
                res.sendStatus(404);
                return;
            }

            res.json(results);
        });
    });

module.exports = router;