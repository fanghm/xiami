function UploadController($scope, $fileUploader, Upload, $timeout) {
    // Creates a uploader
    var uploader = $scope.uploader = $fileUploader.create({
        scope: $scope,
        url: 'http://localhost:1337/file/upload'
    });

    // Images only
    uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
        var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
        type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    });
    uploader.bind('completeall', function(event, items) {
        window.location.href=window.restful.baseURL + 'verifyIndex';
    });
    $scope.deleteImage = function () {
        Upload.get({}, function (result) {
            $scope.class = 'alert alert-success';
            $scope.msg = '删除成功，请重新将图片拖放至图片上传区，再点击上传按钮。';
            $timeout(function () {
                $scope.class = '';
                $scope.msg = '';
            }, 4000);
        }, function (err) {
            $scope.class = 'alert alert-danger';
            $scope.msg = '删除失败';
            $timeout(function () {
                $scope.class = '';
                $scope.msg = '';
            }, 2000);
        })
    };
    $scope.uploadAll = function () {
        if ($scope.uploader.queue.length < 3) {
            $scope.class = 'alert alert-danger';
            $scope.msg = '照片不全， 需3张一起上传，请点击重置后，重新上传';
            $timeout(function () {
                $scope.class = '';
                $scope.msg = '';
            }, 4000);
        } else if ($scope.uploader.queue.length > 3) {
            $scope.class = 'alert alert-danger';
            $scope.msg = '只能上传3张照片，请点击重置后，重新上传';
            $timeout(function () {
                $scope.class = '';
                $scope.msg = '';
            }, 4000);
        } else {
            $scope.uploader.uploadAll();
            $scope.class = 'alert alert-success';
            $scope.msg = '若上传状态显示成功，请重新点击左侧菜单‘信息审核’按钮，查看更新后的信息';
            $timeout(function () {
                $scope.class = '';
                $scope.msg = '';
            }, 10000);
        }
    }
    $scope.isShowHelp = false
    $scope.showHelp = function () {
        $scope.isShowHelp = !$scope.isShowHelp
    }

}

