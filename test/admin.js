/**
 * Created by tsq on 14-7-10.
 * 测试： 管理员登录登出
 */

var Collection = require('./support/collection');
var should = require('should');
var Tool = require("./support/tool");
var loggerConfig = process.env.ISLOG || 'yes';
var timeoutTime = process.env.TIMEOUT || 15000;

describe('# 管理员登录登出', function(){

    describe('# 管理员登录', function(){
        it('1.管理员登录：should success login', function(done){
            var Admin = new Collection('a/admin/login');
            var user = require("./data/login");
            Admin.post({json: user[2]}, function(err, res, body){
                Tool.logger(err, res, body.length, user[2], loggerConfig);
                should.not.exist(err);
                res.statusCode.should.equal(200);
                body.code.should.equal(0)
                done();
            });
        });
    });
    describe('# 用户管理', function(){
        it('1.管理员登出：should success loginout', function(done){
            var Admin = new Collection('admin/logout');
            Admin.get({url: {test: true}},  function(err, res, body){
                should.not.exist(err);
                res.statusCode.should.equal(200);
                done();
            });
        });

    });
      
});

