/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-3-27
 */
function AchieveController($scope, Achieve, $timeout, $injector) {
    $injector.invoke(BasicController, this, {$scope: $scope});
    $scope.resource = Achieve;
    $scope.searchOptions = {};
    $scope.searchOptions.tooltip = '请输入用户姓名或手机号或代理商姓名';
    $scope.searchOptions.fields = ['name', 'phone', 'owner'];
    $scope.fields = [
        {name: "owner", title: "代理商"},
        {name: "product", title: "代理产品"},
        {name: "udid", title: "UDID号"},
        {name: "name", title: "用户姓名"},
        {name: "phone", title: "用户手机号"},
        {name: "createdAt", title: "创建时间"},
        {name: "updatedAt", title: "更新时间"},
        {name: "explation", title: "说明"},
        {name: "status", title: "申请状态"}
    ];

    $scope.init =  function(){
      $scope.achieve = {};
      $scope.errContent = {msg:''};
      $scope.getAllProduct();
    };
    $scope.getAllProduct = function (){
        Achieve.getAllProduct({}, function (result){
            console.log("result:\n", result[0].products);
            $scope.products = result[0].products;
        }, function (err){
            console.log("err:\n", err);
        });
    }
    $scope.reset = function() {
      if (!$scope.achieve.id) {
          $scope.achieve = {};
      } else {
          $scope.achieve.udid = '';
          $scope.achieve.name = '';
          $scope.achieve.phone = '';
          $scope.achieve.product = '';
      }
    };
    $scope.submit = function() {
        if (!$scope.check()) {
            return;
        }
        if (!$scope.achieve.id) {
            Achieve.save($scope.achieve, function (result){
                console.log("result:\n", result);
                window.location.href = window.restful.baseURL + 'achieve/list';
            }, function (err){
                console.log("err:\n", err);
                $scope.errContent.msg = err.toString();
                $scope.showAlert();
            });
        } else {
            var v = $scope.achieve;
            var obj = {
                id : v.id,
                udid: v.udid,
                name: v.name,
                phone: v.phone,
                product: v.product
            };
            Achieve.update(obj, function (result){
                console.log("result:\n", result);
                window.location.href = window.restful.baseURL + 'achieve/list';
            }, function (err){
                console.log("err:\n", err);
                $scope.errContent.msg = err.toString();
                $scope.showAlert();
            });
        }

    };
    $scope.check = function (){
        var v = $scope.achieve;
        var m = $scope.errContent;
        if (!v.udid) {
            m.msg = 'udid不能为空';
            $scope.showAlert();
        } else if(!v.name) {
            m.msg = '用户姓名不能为空';
            $scope.showAlert();
        } else if (!(/^\d{7,11}$/.test(v.phone))) {
            m.msg = '手机号码格式不对';
            $scope.showAlert();
        }else if (!v.product) {
            m.msg = '所选商品不能为空';
            $scope.showAlert();
        }else {
            return true;
        }
    };
    $scope.showAlert = function (){
        $timeout(function (){
            $scope.errContent.msg = '';
        }, 2000);
        return false;
    };
    $scope.showEdit = function (value) {
        console.log("value:\n", value.id);
        window.location.href = '/achieve/edit?id=' + value.id;
    }
    $scope.initEdit = function (achieveID){
        console.log("achieveID:\n", achieveID);
        $scope.achieve = {};
        $scope.show = false;
        $scope.reason = '';
        $scope.products = [];
        $scope.errContent = {msg:''};
        Achieve.getOne({id:achieveID}, function (result){
            console.log("result:\n", result);
            $scope.achieve = result;
            Achieve.getAllProduct({owner: result.owner}, function (result){
                console.log("result:\n", result[0].products);
                $scope.products = result[0].products;
            }, function (err){
                console.log("err:\n", err);
            });
        }, function (err){
            console.log("err:\n", err);
        });
    };
    $scope.pass = function (i){
        if (i=='1') {
            var obj = {
                id: $scope.achieve.id,
                status: '1',
                explation:''
            };
            Achieve.update(obj, function (result){
                console.log("result:\n", result);
                window.location.href = window.restful.baseURL + 'achieve/list';
            }, function (err){
                console.log("err:\n", err);
            });
        } else if (i=='2') {
            var obj = {
                id: $scope.achieve.id,
                status: '2',
                explation: $scope.reason
            };
            Achieve.update(obj, function (result){
                console.log("result:\n", result);
                window.location.href = window.restful.baseURL + 'achieve/list';
            }, function (err){
                console.log("err:\n", err);
            });
        }
    }
}
