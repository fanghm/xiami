/**
 * Created by tsq on 14-7-19.
 */

var app = angular.module('xiami', [
    'ui.bootstrap',
    'ngResource',
    'ngSanitize'
]);
app.filter('addDot', function(){
    return function(input){
        if (input && input.length==800) {
            return input + '...';
        } else {
            return input;
        }
    }
})
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
                $scope.basicInfo = result.msg
            });
            var AjaxForGetArtistPics = $resource('/artist/getArtistPics');
            AjaxForGetArtistPics.query({}, function(result){
                $scope.pics = result
                console.log("$scope.pics", $scope.pics);
            });
            var AjaxForGetAlbum = $resource('/artist/getAlbum');
            AjaxForGetAlbum.query({}, function(result){
                $scope.ablums = result
                console.log("$scope.ablums", $scope.ablums);
            });
        })
    };
    $scope.search('西村由纪江');
    $scope.url = {
        bigPicUrl: '/'
    };


    $scope.getBigPic = function(url, id){
        var v = url.lastIndexOf('/');
        var url = url.substr(v+1);
        console.log(url);
        var idName = '#bigPic'+ id;
        console.log("idName", idName);
        var AjaxForGetBigPic = $resource('/artist/getBigPic');
        AjaxForGetBigPic.get({id: url}, function(result){
            console.log("result", result);
            $scope.url = {
                bigPicUrl: result.msg
            };
            $(idName).attr("src",result.msg);
        });
    };
}]);
