/**
 * Created by tsq on 14-7-9.
 * 上传图像
 */
var Collection = require('./support/collection');
var should = require('should');
var commentContent = require("./data/commentContent");
var Tool = require("./support/tool");
var loggerConfig = process.env.ISLOG || 'yes';
var timeoutTime = process.env.TIMEOUT || 15000;
var commitComment = new Collection('a/opus/comment');
var Login = new Collection('login');
var user = require("./data/login");
var Logout = new Collection('logout');
var async = require("async");

function login(callback) {
    Login.post({json: user[1]}, function(err, res, body){
        should.not.exist(err);
        res.statusCode.should.equal(200);
        callback();
    });

}
function upload(callback) {
    var request = require("request");
    request = request.defaults({jar: true});
    var fs = require("fs");
    var r = request.post('http://localhost:9000/profile/avatar', function optionalCallback (err, res, body) {
        should.not.exist(err);
        res.statusCode.should.equal(200);
        var body = JSON.parse(body);
        body.should.have.properties('code', 'url');
        body.code.should.equal(0);
        callback();

    });
    var form = r.form();
    form.append('avatar', fs.createReadStream(__dirname + '/data/tsq.jpg'))

}
function logout(callback) {
    Logout.get({url: "?test=true"}, function(err, res, body){
        should.not.exist(err);
        res.statusCode.should.equal(200);
        callback();
    });
}
describe('# 上传图像', function(){
    this.timeout(timeoutTime);
    it('1.上传用户头像：should success upload avatar', function(done){
        async.series([login, upload, logout], function(err){
            done();
        });
    });
});