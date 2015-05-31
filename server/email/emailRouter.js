'use strict';

var express = require('express');
var router = express.Router();


var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'schoolservice2@gmail.com',
        pass: 'Tellmemore'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails


/* GET /projects listing. */
router.post('/apply', function(req, res, next) {
  // Project.find(function (err, projects) {
  //   if (err) return next(err);
  //   res.json(projects);
  // });
    // res.json({ab : "anbinh"});

  var dat = req.body;

  console.log("REQUEST",dat);

  res.render('emails/apply', dat, function(err, final_html) {
    if (err) throw err;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'School WebService ✔ <schoolservice2@gmail.com>', // sender address
        to: dat.owner_email, // list of receivers
        subject: 'New user applying for the project - ' + dat.project_name, // Subject line
        text: 'Hello world ✔', // plaintext body
        html: final_html // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  
      res.json({ab : "anbinh"});
  
    });

  })

  

});

router.post('/invite', function(req, res, next) {
  // Project.find(function (err, projects) {
  //   if (err) return next(err);
  //   res.json(projects);
  // });
    // res.json({ab : "anbinh"});

  var dat = req.body;

  console.log("REQUEST",dat);

  res.render('emails/invite', dat, function(err, final_html) {
    if (err) throw err;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'School WebService ✔ <schoolservice2@gmail.com>', // sender address
        to: dat.user_email, // list of receivers
        subject: 'New invitation for the project - ' + dat.project_name, // Subject line
        text: 'Hello world ✔', // plaintext body
        html: final_html // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  
      res.json({ab : "anbinh"});
  
    });

  })

  

});


module.exports = router;
