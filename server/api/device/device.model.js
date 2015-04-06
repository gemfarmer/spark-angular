'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  id: String,
  name: String,
  lastApp: Boolean,
  lastHeard: Date,
  connected: Boolean
});

module.exports = mongoose.model('Device', DeviceSchema);
