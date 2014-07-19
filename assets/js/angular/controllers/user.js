/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-4-1
 */
function UserController($scope, Product, Info) {
    $scope.submit = function () {
        var ids = [];
        $('input[name="chbox"]:checked').each(function () {
            ids.push($(this).val());
        });
        console.log('ids:\n', ids);
        $scope.info.products = ids;
        Info.write($scope.info, function (result) {
            window.location.href = 'user';
        }, function (err) {
            alert(err);
        })

    };
    $scope.initEdit = function () {
        var s = document.getElementById('products').value;
        var arr = s.split(',');
        $("input[name='chbox']").each(function() {
            for(var v = 0; v < arr.length; v++) {
                if (arr[v] == $(this).val()) {
                    $(this).attr("checked", true);
                    break;
                }
            }
        });
    };
    $scope.postEdit = function () {
        var ids = [];
        $('input[name="chbox"]:checked').each(function () {
            ids.push($(this).val());
        });
        var name = $('#name').val();
        var gender = $('#gender').val();
        var age = $('#age').val();
        var phone = $('#phone').val();
        var homeTown = $('#homeTown').val();
        var address = $('#address').val();
        var owner = $('#owner').val();
        var obj = {
            name: name,
            gender: gender,
            age: age,
            phone: phone,
            homeTown: homeTown,
            address: address,
            owner: owner,
            products: ids
        };
        Info.change(obj, function (result) {
            window.location.href = window.restful.baseURL + 'user';
        }, function (err) {
            console.log('err:\n', err);
        })

    }
}