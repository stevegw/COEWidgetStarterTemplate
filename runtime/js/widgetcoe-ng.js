if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  module.exports = 'widgetcoe-ng';
}

(function () {
  'use strict';

  var widgetcoeModule = angular.module('widgetcoe-ng', []);
  widgetcoeModule.directive('ngWidgetcoe', ['$timeout', '$interval', '$http', '$window', '$injector', ngWidgetcoe]);

  function ngWidgetcoe($timeout, $interval, $http, $window, $injector) {

    return {
      restrict: 'EA',
      scope: {
        autolaunchField: '@',
        incomingdataField : '=',
        actionidField : '@',
        outgoingdataField : '=',
        widthField : '@',
        heightField : '@',
        topoffsetField : '@',
        leftoffsetField : '@',
        delegateField: '='
      },
      template: '<div></div>',
      link: function (scope, element, attr) {

        let widgetcoe = undefined ;

        scope.renderer = $window.cordova ? vuforia : $injector.get('threeJsTmlRenderer');
                     
        var executeWidget = function() {
          console.log('do the custom activities here');
          if (widgetcoe == undefined) {
            try {
               widgetcoe = new Widgetcoe(scope,scope.incomingdataField ,  scope.renderer , scope.actionidField , scope.widthField, scope.heightField , scope.topoffsetField, scope.leftoffsetField );
            }catch(ex) {
              // ignore
            }
          }
           widgetcoe.doAction();
        };


        
        var start = function() {
          console.log('Starting');
          scope.$parent.fireEvent('started');
          executeWidget();
        }
        var stop = function() {
          console.log('Stopping');
          scope.$parent.fireEvent('stopped');
         
        }


        scope.$watch('incomingdataField', function () {
          console.log('dataField='+ scope.incomingdataField);

          if (scope.incomingdataField != undefined && scope.incomingdataField != '') {
            
            if (scope.autolaunchField == "true") {
              start();
            }


          }

        });

        scope.$watch('incomingidField', function () {
          console.log('incomingidField='+ scope.incomingidField);

        });

        scope.$watch('delegateField', function (delegate) {
          if (delegate) {
            delegate.start = function () { 
              start(); 
            };
            delegate.stop = function () { 
              stop(); 
            };
          }
        });



        // Use this initially to see if your extension get deployed
        // If you don't see this message its not deployed
        // Comment out once you have it working
        scope.$watch( function() {
          console.log("widgetcoe Any watch "); 
        });
      }
    };
  }

}());
