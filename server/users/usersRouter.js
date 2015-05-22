'use strict';

var express = require('express');
var router = express.Router();
var User = require('./usersSchema');
var ObjectId = require('mongoose').Types.ObjectId; 

/* GET /users listing. */
router.get('/', function(req, res, next) {
  // console.log(req);
  User.find({},null,{sort : {_id : -1,} },function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* POST /users */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /users/id */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /users/by_id/:user_id */
router.get('/by_id/:user_id', function(req, res, next) {
  User.findOne({user_id: req.params.user_id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /users/upsert/:user_id */
router.put('/upsert/:user_id', function(req, res, next) {
  User.update({ user_id : req.params.user_id}, req.body, {upsert : true} , function (err, post) {
    if (err) return next(err);
    User.findOne({user_id : req.params.user_id},function(err,user){
        if (err) return next(err);
        res.json(user);
    })
  });
});

/* PUT /users/:id */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
    
    
  });
});



/* DELETE /users/:id */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
