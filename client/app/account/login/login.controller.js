'use strict';

angular.module('sparkAngularApp')
  .controller('LoginCtrl', [ '$scope', 'Auth', '$location', '$http', function ($scope, Auth, $location, $http) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      console.log(form)
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
        // $http.post('/api/sparklogins', {email: form.email, password: form.password}).success(function(data){
        //   $scope.data = data;
        //   console.log('data', $scope.data)
        // });

      }
    };

  }]);
