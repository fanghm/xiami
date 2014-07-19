/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-3-27
 */
app.factory('Achieve', function ($resource) {
    return $resource(window.restful.baseURL + 'achieve/:ID',{ID:'@_id'}, {
        count: { method: 'GET' , params: {ID: 'count'}},
        update: { method: 'PUT'},
        getOne: { method: 'GET',  params: {ID: 'getOne'}},
        getAllProduct: { method: 'GET',isArray:true,  params: {ID: 'getAllProduct'}}
    })
})