/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-3-27
 */
var app = angular.module('agency',[
    'ui.bootstrap',
    'ngResource',
    'angularFileUpload'
]);

app.directive('formAutofillFix', function($timeout) {
  return function(scope, elem, attrs) {
    if(attrs.ngSubmit) {
      $timeout(function() {
        elem.unbind('submit').submit(function(e) {
          e.preventDefault();
          elem.find('input, textarea, select').trigger('input').trigger('change').trigger('keydown');
          scope.$apply(attrs.ngSubmit);
        });
      });
    }
  };
});

window.restful = {
    baseURL: "http://localhost:1337/"
};