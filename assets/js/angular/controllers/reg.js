/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-3-27
 */
function RegController($scope, Reg, $timeout) {
    $scope.user = {};
    $scope.reg = function () {
        Reg.save($scope.user, function (result) {
            $scope.showInfo = true;
            $scope.alertClass = 'alert alert-success';
            $scope.msg = '注册成功';
            $timeout(function () {
                $scope.showInfo = false;
                window.location.href = window.restful.baseURL + 'user';
            }, 1000);
        }, function (err) {
            $scope.showInfo = true;
            $scope.alertClass = 'alert alert-danger';
            $scope.msg = err.data;
            $timeout(function () {
                $scope.showInfo = false;
            }, 2000);
            console.log('err:\n', err);
        })
    };
}
