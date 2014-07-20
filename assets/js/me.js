/**
 * Created by tsq on 14-7-19.
 */

var app = angular.module('xiami', [
    'ui.bootstrap',
    'ngResource',
    'ngSanitize'
]);
app.controller('MainCtrl', ['$scope', '$resource', '$sce', function ($scope, $resource, $sce) {
    var AjaxForIndex = $resource('/artist');
    $scope.rows = [
        [1, 2, 3, 5, 6, 4, 7, 8, 9, 10, 11, 12],
        [1, 2, 3, 5, 6, 4, 7, 8, 9, 10, 11, 12],
        [1, 2, 3, 5, 6, 4, 7, 8, 9, 10, 11, 12],
        [1, 2, 3, 5, 6, 4, 7, 8, 9, 10, 11, 12],
        [1, 2, 3, 5, 6, 4, 7, 8, 9, 10, 11, 12],
        [1, 2, 3, 5, 6, 4, 7, 8, 9, 10, 11, 12]
    ];
    $scope.search = function (name) {
        AjaxForIndex.get({name: name}, function (result) {
            $scope.info = result;
            var AjaxForGetAlbum = $resource('/artist/getAlbum');
            AjaxForGetAlbum.query({page: 1}, function (result) {
                $scope.albums = result;
            });
            var AjaxForGetBasicInfo = $resource('/artist/getBasicInfo');
            AjaxForGetBasicInfo.get({}, function(result){
                console.log("result", result.msg);
                $scope.basicInfo = result.msg
            })
        })
    };
    $scope.search('西村由纪江');

}]);
