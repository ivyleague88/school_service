'use strict';

var express = require('express');
var router = express.Router();
var Project = require('./projectSchema');

/* GET /projects listing. */
router.get('/', function(req, res, next) {
  Project.find(function (err, projects) {
    if (err) return next(err);
    res.json(projects);
  });
});

/* GET /projects/by_id/:user_id */
router.get('/completed/by_user_id/:user_id', function(req, res, next) {

  // console.log("USEr ID",req.params.user_id );
  var query = Project.find({'user.user_id' : req.params.user_id, 'status' : 'Completed'  });

  query.exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /projects/by_id/:user_id */
router.get('/by_user_id/:user_id', function(req, res, next) {

  // console.log("USEr ID",req.params.user_id );
  var query = Project.find({'user.user_id' : req.params.user_id  });

  query.or([{status : "Open"},{status : "In Progress"}]);

  query.exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /projects */
router.post('/', function(req, res, next) {
  Project.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /projects/id */
router.get('/:id', function(req, res, next) {
  Project.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /projects/:id */
router.put('/:id', function(req, res, next) {
  Project.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /projects/:id */
router.delete('/:id', function(req, res, next) {
  Project.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
