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
});
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
    var AjaxForGetBasicInfo = $resource('/artist/getBasicInfo');
    var AjaxForGetAlbum = $resource('/artist/getAlbum');
    var AjaxForGetArtistPics = $resource('/artist/getArtistPics');
    var AjaxGetSimilarArtist = $resource('/artist/getSimilarArtist');
    var AjaxGetComment = $resource('/artist/getComment');
    $scope.search = function (name) {
        AjaxForIndex.get({name: name}, function (result) {
            $scope.info = result;

            AjaxForGetAlbum.query({page: 1}, function (result) {
                $scope.albums = result;
            });

            AjaxForGetBasicInfo.get({}, function(result){
                $scope.basicInfo = result.msg
            });

            AjaxForGetArtistPics.query({}, function(result){
                $scope.pics = result
                console.log("$scope.pics", $scope.pics);
            });

            AjaxForGetAlbum.query({}, function(result){
                $scope.ablums = result;
                console.log("$scope.ablums", $scope.ablums);
            });

            AjaxGetSimilarArtist.query({}, function(result){
                $scope.similarArtist = result;
                console.log("$scope.ablums", $scope.similarArtist);
            });
        }, function(err){
            if (err&&err.data) {
                var code = err.data.code;
                if (code==404) {
                    if (confirm(err.data.msg)) {
                        $scope.search(err.data.name);
                    }
                } else if(code=405) {
                    alert(err.data.msg);
                }
            }
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
    var pageAlbum = 1;
    $scope.pageForAlbum = function(flag){
        if (flag=='down') {
            pageAlbum++;
        } else {
            if (pageAlbum != 1) {
                pageAlbum--;
            } else {
                return
            }
        }
        console.log("pageAlbum", pageAlbum);
        AjaxForGetAlbum.query({page: pageAlbum}, function(result){
            $scope.ablums = result;
            console.log("result", result);
        });
    };
    var pagePic = 1;
    $scope.pageForPic = function(flag){
        if (flag=='down') {
            pagePic++;
        } else {
            if (pagePic != 1) {
                pagePic--;
            } else {
                return
            }
        }
        console.log("pagePic", pagePic);
        AjaxForGetArtistPics.query({page: pagePic}, function(result){
            $scope.pics = result;
            console.log("result", result);
        });
    };

    var pageComment = 1;
    $scope.pageForComment = function(flag){
        if (flag=='down') {
            pageComment++;
        } else {
            if (pageComment != 1) {
                pageComment--;
            } else {
                return
            }
        }
        console.log("pageComment", pageComment);
        AjaxGetComment.query({page: pageComment}, function(result){
            $scope.info.comment = result;
            console.log("result", result);
        });
    };
}]);
