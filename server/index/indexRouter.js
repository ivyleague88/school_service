'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'School Service App' });
});


/* GET project page. */
router.get('/postproject', function(req, res) {
  res.render('postproject', {  });
});

module.exports = router;
