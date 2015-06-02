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

    $scope.login = function(){

      spark.login({ username: 'bshslowfood@gmail.com', password: 'Tamman4722' },function(err, body){
        console.log('spark: ',body)
        spark.listDevices().then(function(data){
          console.log(data)
        })
      })
    }
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
