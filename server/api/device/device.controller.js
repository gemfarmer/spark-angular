'use strict';

var _ = require('lodash');
var Device = require('./device.model');
var spark = require('spark');
var User = require('./../user/user.model');
// var request = require('request');



// Get list of devices
exports.index = function(req, res) {
  // Device.find(function (err, devices) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, devices);
  // });
  // console.log('devices',spark.devices)
  // console.log(User.spark_credentials)
  spark.listDevices(function(err, devices) {
    // console.log('devices',devices);
    // console.log('attributes',devices[0].attributes)


    console.log('devices----------------------------')




    if (devices){

      
      var device = devices[0].attributes;

      var deviceCore = devices[0];
    
      deviceCore.getAttributes(function(err, data) {
        if (err) {
          
          console.log('An error occurred while getting device attrs:', err);
        } else {
          console.log('Device attrs retrieved successfully:', data);

          device = _.merge(device, data)
          console.log('new device',device)

          res.json(200,device);
          // Device.create(device, function(err, newDevice) {
          //   if(err) { 
          //     res.json(200,device);
          //     return handleError(res, err); 
          //   }
          //   res.json(200,newDevice)
          // });
        }
      });

      
    } else { 
      console.log('else')
      res.send(403) 

    }


    
  });

  

  // console.log('spark', spark.listDevices())
  // var devicesPr = spark.listDevices();
  // console.log(devicesPr)

  // request('https://api.spark.io/v1/devices', function(data){
  //   console.log(data)
  // });

  // devicesPr.then(
  //   function(data){
  //     console.log('data: ',data)
  //     // res.json(200, data);
  //   },
  //   function(err) {
  //     console.log('List devices call failed: ', err);
  //   }
  // );
// res.json(200,spark)
};

// Get a single device
exports.show = function(req, res) {
  Device.findById(req.params.id, function (err, device) {
    if(err) { return handleError(res, err); }
    if(!device) { return res.send(404); }
    return res.json(device);
  });
};

// Creates a new device in the DB.
exports.create = function(req, res) {
  console.log('req.body:',req.body)
  spark.listDevices(function(err, devices) {
    console.log('devices',devices);
    console.log('attributes',devices[0].attributes)
    var device = devices[0].attributes;

    console.log('Device name: ' + device.name);
    console.log('- connected?: ' + device.connected);
    console.log('- variables: ' + device.variables);
    console.log('- functions: ' + device.functions);
    console.log('- version: ' + device.version);
    console.log('- requires upgrade?: ' + device.requiresUpgrade);

    Device.create(device, function(err, newDevice) {
      if(err) { 
        res.json(200,device);
        return handleError(res, err); 
      }
      res.json(200,newDevice)
    });
  });
};

// Updates an existing device in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Device.findById(req.params.id, function (err, device) {
    if (err) { return handleError(res, err); }
    if(!device) { return res.send(404); }
    var updated = _.merge(device, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, device);
    });
  });
};

// Deletes a device from the DB.
exports.destroy = function(req, res) {
  Device.findById(req.params.id, function (err, device) {
    if(err) { return handleError(res, err); }
    if(!device) { return res.send(404); }
    device.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}