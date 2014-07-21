/**
 * Created by tsq on 14-7-8.
 * 测试：提交评论
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
function comment(callback) {
    commitComment.post({json: commentContent[0]}, function(err, res, body){
        Tool.logger(err, res, body, commentContent, loggerConfig);
        should.not.exist(err);
        res.statusCode.should.equal(200);
        res.body.code.should.equal(0);
        callback();
    });
}
function logout(callback) {
    Logout.get({url: "?test=true"}, function(err, res, body){
        should.not.exist(err);
        res.statusCode.should.equal(200);
        callback();
    });
}
describe('# 提交评论', function(){
    this.timeout(timeoutTime);
    it('1.提交失败：should fail post comment data[no login]', function(done){
        commitComment.post({json: commentContent[0]}, function(err, res, body){
            Tool.logger(err, res, body, commentContent, loggerConfig);
            should.not.exist(err);
            res.statusCode.should.equal(401);
            res.body.code.should.equal(10000001);
            done();
        });
    });
    it('1.提交成功：should success post comment data', function(done){
        async.series([login, comment, logout], function(err){
            done();
        });
    });
});