'use strict';

angular.module('sparkAngularApp')
  .controller('MainCtrl', function ($scope, $http, User, $cookieStore) {
    $scope.currentUser = {};
    if($cookieStore.get('token')) {
      User.get(function(user){
        console.log(user)
        $scope.currentUser = user;
        console.log(user.spark_credentials.access_token)
      },function(err){
        console.log(err);
      });
  
      
      
    } else {
      console.log('no token')
    }

    $scope.devices;
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
        console.log('User',data, data.spark_credentials)
        var api = 'https://api.spark.io/v1/devices/53ff72065075535134221787/led?access_token=09a474aa55942fb33bd32c7f0cf471be9c9a2d22';
          console.log(api)
        var params = {
          access_token:data.spark_credentials.access_token, 
          params: buttonType+buttonNumber+','+status
        }
        params.access_token = '09a474aa55942fb33bd32c7f0cf471be9c9a2d22'
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

    $scope.listDevices = function(){
   
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
