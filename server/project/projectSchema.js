'use strict';

var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: { type: String, default: '' },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
