/**
 * Created by tsq on 14-7-2.
 * 测试：获取评论信息API
 */

var Collection = require('./support/collection');
var should = require('should');
var Tool = require("./support/tool");
var loggerConfig = process.env.ISLOG || 'yes';
var timeoutTime = process.env.TIMEOUT || 15000;

describe('# 作品评论', function(){
    this.timeout(timeoutTime);
    it.skip('1.获取评论数据：should success get comment data', function(done){
        var routeStr = 'a/opus/53a62c4ce4b0840426c36684/3/1'; //opusID为：53a62c4ce4b0840426c36684， 这个opusID可能没有。要注意
        var Comment = new Collection(routeStr);
        Comment.get({}, function(err, res, body){
            Tool.logger(err, res, body, {}, loggerConfig);
            should.not.exist(err);
            res.statusCode.should.equal(200);
            body.should.be.an.instanceOf(Array); // body应该是一个数组
            done();
        });
    });
});