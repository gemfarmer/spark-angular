'use strict';

angular.module('sparkAngularApp')
  .controller('MainCtrl', function ($scope, $http, User, $cookieStore, $rootScope, ipCookie) {
    $rootScope.currentUser = {};
    if($cookieStore.get('token')) {
      User.get(function(user){
        $rootScope.currentUser = user;
        ipCookie('user', user);
      },function(err){
        console.log(err);
      });
  
    } else {
      console.log('no token')
    }


    // $scope.awesomeThings = [];

    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    // });

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };


    $scope.turnButtonOn = function (buttonType, buttonNumber,status) {
      User.get('/me',function(data){
        console.log('User',data, data.spark_credentials, data.spark_credentials.access_token )
        var api = 'https://api.spark.io/v1/devices/53ff72065075535134221787/led?access_token='+data.spark_credentials.access_token;
          console.log(api)
      
        // console.log(params)
        // $http.post(api, function (response) {
        //   console.log('status:',response)

        // });

        var info = {
          request: {
            buttonType: buttonType,
            buttonNumber: buttonNumber,
            status: status,
            api: api
          },
          user: data
        }
        console.log(info)
        $http.post('api/leds',info)
      });
    }

  });
