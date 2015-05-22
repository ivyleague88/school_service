'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'School Service App' });
});


/* GET project page. */
router.get('/project', function(req, res) {
  res.render('postproject', {  });
});

/* GET profile page. */
router.get('/my_profile', function(req, res) {
  res.render('profile', {  });
});


module.exports = router;
