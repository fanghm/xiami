/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-3-27
 */
app.factory('Verify', function ($resource) {
    return $resource(window.restful.baseURL + 'verify/:ID',{ID:'@_id'}, {
        count: { method: 'GET' , params: {ID: 'count'}}
    })
})