/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-4-1
 */
function VerifyController($scope, $injector, Verify) {
    $injector.invoke(BasicController, this, {$scope: $scope});
    $scope.resource = Verify;
    $scope.searchOptions = {};
    $scope.searchOptions.tooltip = '请输入姓名或手机号';
    $scope.searchOptions.fields = ['owner', 'phone'];
    $scope.fields = [
        {name: "contactName", title: "联系人"},
        {name: "contactTel", title: "联系电话"},
        {name: "companyName", title: "公司名称"},
        {name: "updatedAt", title: "提交时间"},
        {name: "status", title: "申请状态"},
        {name: "explanation", title: "备注信息"},
        {name: "operator", title: "操作员"}
    ];

    $scope.showProfile = function (value) {
        window.location.href = 'verify/profile?id=' + value.id;
    }
    $scope.submitEdit = function (value) {
        var id = document.getElementById('profileID').value;
        var explanation = '';
        var status = '1'
        if (value == '2') {
            explanation = document.getElementById('explanation').value;
            status = '2';
        }
        var obj = {
            id: id,
            status: status,
            explanation: explanation
        };
        Verify.save(obj, function (res) {
            window.location.href=window.restful.baseURL + 'verifyIndex';
        }, function (err) {
            alert(err);
        });
    }
}