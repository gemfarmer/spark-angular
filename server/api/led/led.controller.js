'use strict';

var _ = require('lodash');
var Led = require('./led.model');
var request = require('request');

// Get list of leds
exports.index = function(req, res) {
  Led.find(function (err, leds) {
    if(err) { return handleError(res, err); }
    return res.json(200, leds);
  });
};

// Get a single led
exports.show = function(req, res) {
  Led.findById(req.params.id, function (err, led) {
    if(err) { return handleError(res, err); }
    if(!led) { return res.send(404); }
    return res.json(led);
  });
};

// Creates a new led in the DB.
exports.create = function(req, res) {
  // Led.create(req.body, function(err, led) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(201, led);
  // });
  console.log(req.body, req.body.request)
  var api = req.body.request.api+'?'+req.body.request.buttonType+req.body.buttonNumber+req.body.request.status
  request(api,function(data){
    console.log(data)
  })
};

// Updates an existing led in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Led.findById(req.params.id, function (err, led) {
    if (err) { return handleError(res, err); }
    if(!led) { return res.send(404); }
    var updated = _.merge(led, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, led);
    });
  });
};

// Deletes a led from the DB.
exports.destroy = function(req, res) {
  Led.findById(req.params.id, function (err, led) {
    if(err) { return handleError(res, err); }
    if(!led) { return res.send(404); }
    led.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}