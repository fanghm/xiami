/**
 * Created by tsq on 14-7-16.
 */
var Collection = require('./support/collection');
var Code = new Collection('getCheckCode');
var should = require('should');
var loggerConfig = process.env.ISLOG || 'yes';
var timeoutTime = process.env.TIMEOUT || 15000;


describe('# 验证码', function(){
    this.timeout(timeoutTime);
    it.skip('1.获取验证码成功:should success get checkcode', function(done){
        Code.get({}, function(err, res, body){
            should.not.exist(err);
            res.statusCode.should.equal(200);
//            console.log("body", body);
            done();
        })
    });
});