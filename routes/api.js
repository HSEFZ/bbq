var express = require('express'),
    router = express.Router(),
    db = require('../model/db');

router.post('/total', function(req, res) {
    db.getTotal(function(err, doc) {
        res.send({total: doc.value, stat: 'success'});
    });
});

router.post('/get', function(req, res) {
    var skip = req.param('skip'), limit = req.param('limit');
    if (skip == NaN) skip = 0;
    if (limit == NaN) limit = 0;
    if (limit > 100) {
        res.send({stat: 'failure'});
        return;
    }
    db.getBBQByAmount(skip, limit, function(err, doc) {
        if (err) {
            res.send({stat: 'failure'});
            return;
        }
        res.send({data: doc, stat: 'success'});
    });
});

module.exports = router;

