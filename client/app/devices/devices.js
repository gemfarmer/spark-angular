'use strict';

angular.module('sparkAngularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('devices', {
        url: '/devices',
        templateUrl: 'app/devices/devices.html',
        controller: 'DevicesCtrl'
      });
  });