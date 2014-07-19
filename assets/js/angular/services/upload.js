/**
 * @description
 * @author tsq <1530234656@qq.com>.
 * @date 14-3-27
 */
app.factory('Upload', function ($resource) {
    return $resource(window.restful.baseURL + 'file/deleteImage', {

    })
});