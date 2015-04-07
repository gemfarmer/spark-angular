'use strict';

angular.module('sparkAngularApp')
  .controller('DevicesCtrl', function ($scope,$http, $rootScope, User, ipCookie) {
    $scope.message = 'Hello';
    $scope.devices;
    var currentUser = $rootScope.currentUser ? $rootScope.currentUser : ipCookie('user');
    $scope.devices = currentUser.devices;
    $scope.listDevices = function(){
    	// $http.get('https://api.spark.io/v1/devices').success(function(data){
    	// 	console.log(data);
    	// 	$scope.devices = data;
    	// })

		$http.get('/api/devices').
		  success(function(devices, status, headers, config) {
		  	console.log(devices)
    		$scope.devices = devices;
    		// $scope.devices.lastHeard = moment($scope.devices).format('MMMM Do YYYY, h:mm:ss a');

    		console.log(currentUser)
    		User.save({ id: currentUser._id }, {devices: [devices]});
		  }).
		  error(function(data, status, headers, config) {
		  	console.log('err: ',data)
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		
    }
    if (!currentUser.devices){
	    $scope.listDevices();
	}
  });
