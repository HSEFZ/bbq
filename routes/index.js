var express = require('express');
var router = express.Router();
var db = require('../model/db');

/* GET home page. */
router.get('/', function(req, res) {
    db.getBBQByAmount(0, 3, function(err, doc) {
        res.render('index', { title: '华师大二附中表白墙', doc: doc });
    });
});

module.exports = router;
