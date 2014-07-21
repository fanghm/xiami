/**
 * Created by tsq on 14-7-8.
 */

'use strict';

var Collection = require('./support/collection');
var Logout = new Collection('logout');
var should = require('should');
var loggerConfig = process.env.ISLOG || 'yes';
var timeoutTime = process.env.TIMEOUT || 15000;


describe('# 用户登出', function(){
    this.timeout(timeoutTime);
    it('1.登出成功:should success logout', function(done){
        Logout.get({url: {test: true}}, function(err, res, body){
            should.not.exist(err);
            res.statusCode.should.equal(200);
            done();
        })
    });
});