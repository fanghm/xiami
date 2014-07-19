/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-3-27
 */
app.factory('Product', function ($resource) {
    return $resource(window.restful.baseURL + 'product/:ID',{ID:'@_id'}, {
        count: { method: 'GET' , params: {ID: 'count'}}
    })
})