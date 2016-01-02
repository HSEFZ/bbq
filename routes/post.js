var express = require('express'),
    router = express.Router(),
    db = require('../model/db');

router.get('/', function(req, res) {
    res.render('post', { title: '我要表白' });
});

router.get('/failure', function(req, res) {
    res.send('表白失败，大概是字数太多了或者标题没写或者内容没写之类的。');
    res.status(500).end();
});

router.post('/', function(req, res) {
    var title = req.param('title');
    var content = req.param('content');
    if ((title && title.length > 20) || (content && content.length > 500)) {
        res.redirect(302, '/post/failure');
        return;
    }
    if (title == '' || content == '' || !title || !content) {
        res.redirect(302, '/post/failure');
        return;
    }
    db.getTotal(function(err, doc) {
        var bbq = {
            id: doc.value + 1,
            title: title,
            content: content,
            date: new Date().toString(),
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        };
        db.postBBQ(bbq, function(err, doc) {
            db.addTotal(function(err, doc) {
                res.redirect(302, '/view');
            });
        });
    });
});

module.exports = router;

