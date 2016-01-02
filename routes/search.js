var express = require('express');
var router = express.Router();
var db = require('../model/db');

router.get('/', function(req, res) {
    var page = req.param('page');
    var keyword = req.param('keyword');
    if (!keyword) {
        res.redirect(302, '/view');
        return;
    }
    if (!page) page = 0; else page = Number(page) - 1;
    db.searchBBQ(keyword, function(err, doc) {
        res.render('view', {title: '查看表白', doc: doc, pageId: page + 1, search: true, keyword: keyword});
    }, page * 30, 30);
});

module.exports = router;

