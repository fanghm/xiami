/**
 * Created by tsq on 14-7-17.
 * 测试： 个人主页功能
 */

var Collection = require('./support/collection');
var should = require('should');
var Tool = require("./support/tool");
var loggerConfig = process.env.ISLOG || 'no';
var timeoutTime = process.env.TIMEOUT || 15000;

describe('# 个人主页', function(){
    this.timeout(timeoutTime);
    it('1.成功获取个人基本信息:should success get user info', function(done){
        var Init = new Collection('profile/534c8687e4b02d5ad042a1ff');
        Init.get({}, function(err, res, body){
            Tool.logger(err, res, body, {}, loggerConfig);
            should.not.exist(err);
            res.statusCode.should.equal(200);
            done();
        });

    });
    it('1.获取不存在的用户信息:should success get 404', function(done){
        var Init = new Collection('profile/534c8687e4b02d5ad042a1ff' + Math.random());
        Init.get({}, function(err, res, body){
            Tool.logger(err, res, body, {}, loggerConfig);
            should.not.exist(err);
            res.statusCode.should.equal(404);
            done();
        });

    });
    it('1.成功获取用户个人作品:should success get opus data by id', function(done){
        var Init = new Collection('a/opus/5/1'); // 6：代表最新作品；1：代表第一页
        Init.get({url: {uid: '53aa9be3e4b02fabb6750ad9'}}, function(err, res, body){
            Tool.logger(err, res, body, {}, loggerConfig);
            should.not.exist(err);
            res.statusCode.should.equal(200);
            body.should.be.instanceOf(Array);
            console.log("body.length", body.length);
            done();
        });
    });

    it.only('1.成功获取用户个人bbs:should success get bbs data by id', function(done){
        var Init = new Collection('a/profile/1/10');
        Init.get({url: {uid: '53aa9be3e4b02fabb6750ad9'}}, function(err, res, body){
            should.not.exist(err);
            res.statusCode.should.equal(200);
            body.should.be.instanceOf(Array);
            console.log("body.length", body.length);
            console.log("body", body);
            done();
        });
    });


});