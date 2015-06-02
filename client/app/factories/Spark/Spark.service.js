(function () {
  'use strict';

  angular.module('sparkAngularApp').factory('Spark', [function() {
    var Spark = function () {
      this.sparkLogin = false;
      this.isTouch = false;
      this.isIPad = false;
      this.isIE = false;
      this.isRetina = false;
      return this;
    };

    

    Spark.prototype = {
      sparkLogin: function () {
        addLoginButton();
        addLoginForm();
        addBehaviour(callback);
      },
      checkIPad: function () {
        this.isIPad = navigator.userAgent.match(/iPad/i) ? true : false;
      },
      checkTouch: function(){
        this.isTouch = Modernizr.touch;
      },
      checkIE: function (){
        var isIE = function () {
          var versionIs = function(){
            var myNav = navigator.userAgent.toLowerCase();
            var msie = myNav.indexOf('msie');
            if (msie !== -1) {
              return parseInt(myNav.split('msie')[1]);
            } else {
              return (!!navigator.userAgent.match(/Trident.*rv\:11\./)) ? true : false;
            }
          };
          var thisVersion = versionIs();
          if (_.isBoolean(thisVersion)) {
            return thisVersion;
          } else if (_.isNumber(thisVersion)) {
            if (thisVersion >= 8){
              return true;
            } else {
              return false; // version too old
            }
          }
        };
        this.isIE = isIE();
      },
      checkRetina: function(){
        var retina = window.devicePixelRatio > 1;
        if (retina) {
          this.isRetina = true;
        } else {
          this.isRetina = false;
        }
      }
    };
    return new Spark();
  }]);

}());