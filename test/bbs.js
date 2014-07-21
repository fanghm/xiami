/**
 * Created by tsq on 14-7-10.
 * 测试：bbs相关api
 */
var Collection = require('./support/collection');
var BbsList = new Collection('a/bbs/1');
var should = require('should');
var Tool = require("./support/tool");
var loggerConfig = process.env.ISLOG || 'yes';
var timeoutTime = process.env.TIMEOUT || 15000;

describe('# bbs功能相关测试', function(){
    this.timeout(timeoutTime);
    it('1.bbs首页列表数据:should success get list data', function(done){
        BbsList.get({}, function(err, res, body){
            Tool.logger(err, res, body.length, {}, loggerConfig);
            should.not.exist(err);
            res.statusCode.should.equal(200);
            body.should.be.an.instanceOf(Array); // body应该是一个数组
//            body.length.should.be.equal(12); // body的长度应该为12
            done();
        });
    });
    it.skip('2.bbs详情：should success get a  detail data', function(done){
        var BbsDetail = new Collection("a/bbs/5316912abac7bad4dd3b6013/1");// 此bbs的id可能没有，所以这条用例暂时skip
        BbsDetail.get({}, function(err, res, body){
            Tool.logger(err, res, body.length, {}, loggerConfig);
            should.not.exist(err);
            res.statusCode.should.equal(200);
            body.should.be.an.instanceOf(Array); // body应该是一个数组
            done();
        });
    });
});