/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-4-1
 */
function ProductController($scope, Product, $injector) {
    $injector.invoke(BasicController, this, {$scope: $scope});
    $scope.resource = Product;
    $scope.searchOptions = {};
    $scope.searchOptions.tooltip = '请输入产品名称';
    $scope.searchOptions.fields = ['name'];
    $scope.fields = [
        {name: "name", title: "名称"},
        {name: "price", title: "定价"},
        {name: "brokerage", title: "佣金"},
        {name: "createdAt", title: "创建时间"},
        {name: "updatedAt", title: "更新时间"}
    ];

    $scope.showProfile = function (value) {
        window.location.href = 'product/profile?id=' + value.id;
    }
    $scope.submitEdit = function () {
        var id = document.getElementById('profileID').value;
        window.location.href = 'profileEdit?id=' + id;
    }
}