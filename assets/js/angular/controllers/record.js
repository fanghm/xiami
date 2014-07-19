/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-3-27
 */
function RecordController($scope, Record, $timeout, $injector) {
    $injector.invoke(BasicController, this, {$scope: $scope});
    $scope.resource = Record;
    $scope.searchOptions = {};
    $scope.searchOptions.tooltip = '请输入代理商姓名或代理产品';
    $scope.searchOptions.fields = ['owner', 'product'];
    $scope.fields = [
        {name: "owner", title: "代理商"},
        {name: "product", title: "代理产品"},
        {name: "money", title: "代理商获利"},
        {name: "profit", title: "公司获利"},
        {name: "createdAt", title: "创建时间"}
    ];
}
