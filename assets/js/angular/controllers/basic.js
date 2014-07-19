/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-4-1
 */
function BasicController($scope, Pagination) {
    $scope.pagination = Pagination;
    $scope.resource = undefined;
    $scope.searchOptions = {};
    $scope.infos = [];
    $scope.params = {};
    $scope.countQs = {};
    $scope.search = {};
    $scope.sortOptions = 'updatedAt DESC';
    $scope.refreshList = function () {
        $scope.resource.count($scope.countQs, function (result) {
            $scope.pagination.paginate(result.count);
        });
        var p = $scope.pagination;
        $scope.params.sort = $scope.sortOptions;
        $scope.params.skip = (p.iPage - 1) * p.iLength;
        $scope.params.limit = p.iLength;
        $scope.resource.query($scope.params, function (results) {
            $scope.entities = results;
        });

    };
    $scope.$watch('pagination.iLength', function () {
        $scope.refreshList()
    });
    $scope.$watch('pagination.iPage', function () {
        $scope.refreshList();
    });
    $scope.$watch('search.text', function () {
        if (!$scope.search.text) {
            delete $scope.params['$or'];
            delete $scope.countQs['$or'];
        }
        else {
            $scope.filters = [];
            $scope.searchOptions.fields.forEach(function(field) {
                var filter = {};
                filter[field] = {contains:$scope.search.text};
                $scope.filters.push(filter);
            })
            $scope.params.$or = JSON.stringify($scope.filters);
            $scope.countQs.$or = JSON.stringify($scope.filters);
        }
    });
    $scope.init = function () {
        $scope.pagination.iPage = 1;
    };

}