'use strict';

var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  user_id: String,
  name : String,
  email : String,
  email_verified : Boolean,
  nickname : String,
  picture : String,
  given_name : {type : String , default : ''},
  family_name : {type : String , default : ''},
  date_created : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', ProjectSchema);
