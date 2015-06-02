'use strict';

angular.module('sparkAngularApp')
  .directive('sparkLogin', [ '$modal', function ($modal) {
    return {
      templateUrl: 'app/directives/sparkLogin/sparkLogin.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	var loginModalConfig = {
	          	templateUrl: 'app/directives/sparkLogin/modal.tpl.html',
	          	scope: scope,
	          	controller: 'LoginModalInstanceController',
	          	backdrop: true,
	          	keyboard: true
	    }, modalInstance;

      	scope.openLoginModal = function(){
      		console.log('open login modal', $modal)

	        modalInstance = $modal.open(loginModalConfig);
      	}
      }
    };
  }]).controller('LoginModalInstanceController', [ '$scope', '$rootScope','Spark',function ($scope, $rootScope, Spark) {
  		$scope.matchError = false;

		var user = {};
  		$scope.submit = function(form){
  	
  		// define Spark as a provider
  		// spark.login(user,function(){

  		// });
		if(form.$valid) {
		
	  		spark.login({
		          username: $scope.user.email,
		          password: $scope.user.password
		        },function(err, body){
		        console.log('spark: ',body);
		        console.log('error:', err)
		        if (!err){
		        	$scope.matchError = false;
		        	$scope.$dismiss();
		        	Spark = body;
		        	$rootScope.$broadcast('sparkLoginSuccess', body);
		        	
		        } else {
		        	$scope.matchError = true; 
		        }

		       
		    });
		}
	}
  }]);