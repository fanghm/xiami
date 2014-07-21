/**
 * Created by tsq on 14-6-24.
 */

'use strict';

var Collection = require('./support/collection');
var Register = new Collection('register');
var registers = require('./data/register');
var Tool = require("./support/tool");
var should = require('should');
var loggerConfig = process.env.ISLOG || 'no';
var timeoutTime = process.env.TIMEOUT || 15000;
function logger(err, res, body, registerUser) {
    if (loggerConfig == 'yes') {
        console.log("\n===============Log-Start=================");
        console.log("the random generate registerUser is: \n", registerUser);
        console.log("err", err);
        console.log("res.statusCode", res.statusCode);
        console.log("body", body);
        console.log("===============Log-End=================\n");
    }
}
describe('# 用户注册', function(){
    this.timeout(timeoutTime);
    it('1.注册成功:should success register user', function(done){
        var tempRegisterUser = registers[0];
        var randomData = Tool.randomNum();
        var registerUser = {
            password: tempRegisterUser.password,
            email: randomData.toString().concat(tempRegisterUser.email),
            username: randomData.toString().concat(tempRegisterUser.username)
        };
        Register.post({json: registerUser}, function (err, res, body) {
            logger(err, res, body, registerUser);
            should.not.exist(err);
            res.statusCode.should.equal(200);
            body.code.should.equal(0);
            done()
        });
    });
    it('2.注册失败:should fail register [bad email format]', function(done){
        var tempRegisterUser = registers[0];
        var randomData = Tool.randomNum();
        var registerUser = {
            password: tempRegisterUser.password,
            email: 'bademail',
            username: randomData.toString().concat(tempRegisterUser.username)
        };
        Register.post({json: registerUser}, function (err, res, body) {
            logger(err, res, body, registerUser);
            should.not.exist(err);
            res.statusCode.should.equal(500);
            body.code.should.equal(20011);
            done()
        });
    });
    it('3.注册失败:should fail register [has been registed]', function(done){
        var tempRegisterUser = registers[0];
        var randomData = Tool.randomNum();
        var registerUser = {
            password: tempRegisterUser.password,
            email: randomData.toString().concat(tempRegisterUser.email),
            username: randomData.toString().concat(tempRegisterUser.username)
        };
        Register.post({json: registerUser}, function (err, res, body) {
            should.not.exist(err);
            res.statusCode.should.equal(200);
            body.code.should.equal(0);
            Register.post({json: registerUser}, function (err, res, body) {
                logger(err, res, body, registerUser);
                res.statusCode.should.equal(500);
                body.code.should.equal(20008)
                done()
            });
        });
    });
});