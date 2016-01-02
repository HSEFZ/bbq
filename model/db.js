var mongo = require('mongodb');
var server = new mongo.Server('127.0.0.1', 27017);
var db = new mongo.Db('bbq', server, {safe: true});

db.open(function(err, db) {});

function getTotal(callback) {
    db.collection('core', function(err, collection) {
        collection.findOne({name: 'total'}, function(err, doc) {
            callback(err, doc);
        });
    });
}

function addTotal(callback) {
    db.collection('core', function(err, collection) {
        collection.update({name: 'total'}, {$inc: {value: 1}}, function(err, doc) {
            callback(err, doc);
        });
    });
}

function getBBQByAmount(skip, amount, callback) {
    db.collection('posts', function(err, collection) {
        collection.find({del: {$ne: true}}, {sort: {id: -1}, skip: skip, limit: amount}, function(err, doc) {
            doc.toArray(function(err, arr) {
                callback(err, arr);
            });
        });
    });
}

function postBBQ(bbq, callback) {
    db.collection('posts', function(err, collection) {
        collection.insert(bbq, function(err, doc) {
            callback(err, doc);
        });
    });
}

function searchBBQ(keyword, callback, skip, limit) {
    if (!skip) skip = 0;
    if (!limit) limit = 30;
    db.collection('posts', function(err, collection) {
        collection.find({del: {$exists: false}, $or: [{title: RegExp(keyword)}, {content: new RegExp(keyword)}]}, {sort: {id: -1}, limit: limit, skip: skip}, function(err, doc) {
            doc.toArray(function(err, arr) {
                callback(err, arr);
            });
        });
    });
}

exports.getTotal = getTotal;
exports.addTotal = addTotal;
exports.getBBQByAmount = getBBQByAmount;
exports.postBBQ = postBBQ;
exports.searchBBQ = searchBBQ;

