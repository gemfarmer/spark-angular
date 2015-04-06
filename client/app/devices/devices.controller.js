'use strict';

angular.module('sparkAngularApp')
  .controller('DevicesCtrl', function ($scope,$http) {
    $scope.message = 'Hello';
    $scope.devices;
    $scope.listDevices = function(){
    	// $http.get('https://api.spark.io/v1/devices').success(function(data){
    	// 	console.log(data);
    	// 	$scope.devices = data;
    	// })
    	$http.get('/api/devices').
		  success(function(devices, status, headers, config) {
		  	console.log(devices)
    		$scope.devices = devices;
		  }).
		  error(function(data, status, headers, config) {
		  	console.log('err: ',data)
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
    	
    }
  });
