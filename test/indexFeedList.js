/**
 * Created by tsq on 14-6-30.
 */
/**
* 测试：indexFeedList (首页佳作列表)
*/

var Collection = require('./support/collection');
var IndexFeedList = new Collection('indexFeedList');
var should = require('should');
var Tool = require("./support/tool");
var loggerConfig = process.env.ISLOG || 'yes';
var timeoutTime = process.env.TIMEOUT || 15000;

describe('# 首页获取佳作列表', function(){
    this.timeout(timeoutTime);
    it('1.成功获取数据:should success get feedList data', function(done){
        IndexFeedList.get({}, function(err, res, body){
            Tool.logger(err, res, body.length, {}, loggerConfig);
            should.not.exist(err);
            res.statusCode.should.equal(200);
            body.should.be.an.instanceOf(Array); // body应该是一个数组
            //body.length.should.be.equal(12); // body的长度应该为12
            done();
        });
    });
});