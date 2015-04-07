'use strict';

angular.module('sparkAngularApp')
  .filter('yesNo', function () {
    return function (input) {
      return input ? 'yes' : 'no';
    };
  });
