'use strict';

var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  title: String,
  category: String,
  chargeable : Boolean,
  description : String,
  skillset : Array,
  effortRequired : { type: String, default: '1 Hour' },
  postedEndDate : { type: Date, default: Date.now },
  startDate : { type: Date, default: Date.now },
  endDate : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
