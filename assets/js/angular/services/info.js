/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-3-27
 */
app.factory('Info', function ($resource) {
    return $resource(window.restful.baseURL + 'info/:ID',{ID:'@_id'}, {
        write: { method: 'POST' , params: {ID: 'write'}},
        change: { method: 'POST' , params: {ID: 'edit'}}
    })
});
