'use strict';

angular.module('sparkAngularApp')
  .directive('sparkDeviceList', [ '$rootScope','Spark', function ($rootScope, Spark) {
    return {
      templateUrl: 'app/directives/sparkDeviceList/sparkDeviceList.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	scope.sparkDevices = [];
      	console.log('spark no service',spark)
      	console.log('spark service', Spark)
      	$rootScope.$on('sparkLoginSuccess', function sparkLogin (event,data) {
      		console.log(data)
      		spark.listDevices().then(function(devices){
	    		console.log(devices);
	    		scope.sparkDevices = devices;
	    		_.each(scope.sparkDevices,function (device) {
	    			console.log(device)
	    			device.getAttributes(function(err, data) {
					  if (err) {
					    console.log('An error occurred while getting device attrs:', err);
					  } else {
					    console.log('Device attrs retrieved successfully:', data);
					  }
					});
	    		});
	    		scope.$digest();
	    	});
    	});
      
  		
      
      	


      }
    };
  }]);