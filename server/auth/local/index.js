'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var spark = require('spark');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

    spark.login({ username: req.body.email, password: req.body.password }, function(err, body) {
	    user.spark_credentials = body;
	    user.save(function(err, user) {
	      if (err) return validationError(res, err);
	      var token = auth.signToken(user._id, user.role);
	    	res.json({token: token});
	    });
	  });

  })(req, res, next)
});

module.exports = router;