var express = require('express'),
    router = express.Router(),
    db = require('../model/db');

var perPage = 30;

router.get('/', function(req, res) {
    res.redirect(301, '/view/1');
});

router.get('/:pageId', function(req, res) {
    var num = Number(req.params.pageId);
    if (num == NaN || num < 0) {
        res.redirect(302, '/');
        return;
    }
    var pageId = num - 1;
    db.getBBQByAmount(pageId * perPage, perPage, function(err, doc) {
        res.render('view', {title: '查看表白', doc: doc, pageId: pageId + 1});
    });
});

module.exports = router;
