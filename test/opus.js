/**
 * Created by tsq on 14-7-1.
 *
 * 测试：‘发现’模块下的‘作品排名’页面相关API
 */


var Collection = require('./support/collection');
var should = require('should');
var Tool = require("./support/tool");
var loggerConfig = process.env.ISLOG || 'no';
var timeoutTime = process.env.TIMEOUT || 15000;

describe('# 作品排名', function(){
    this.timeout(timeoutTime);
    it('1.成功获取排名数据:should success get feedList data when init', function(done){
        var Init = new Collection('a/opus/6/1'); // 6：代表最新作品；1：代表第一页
        Init.get({}, function(err, res, body){
            Tool.logger(err, res, body, {}, loggerConfig);
            should.not.exist(err);
            res.statusCode.should.equal(200);
            body.should.be.instanceOf(Array);
            console.log("body.length", body.length);
            done();
        });
    });
});

