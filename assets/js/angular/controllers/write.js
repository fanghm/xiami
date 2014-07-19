/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-3-31
 */
function WriteController($scope, Write) {
    $scope.submit = function () {
        console.log('info:\n', $scope.info);
        Write.save($scope.info, function (result) {
            window.location.href = window.restful.baseURL + 'user';
        }, function (err) {
            console.log('err:\n', err);
        })
    }
}