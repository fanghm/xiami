/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-4-4
 */
function logOutController($scope, User) {
    $scope.logout = function () {
        User.save({}, function (result) {
            window.location.href = window.restful.baseURL + 'log';
        }, function (err) {
            alert('登出失败');
        })
    };
}