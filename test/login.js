/**
 * Created by tsq on 14-6-27.
 */

'use strict';

var Collection = require('./support/collection');
var Register = new Collection('register');
var registers = require('./data/register');
var Login = new Collection('login');
var Tool = require("./support/tool");
var should = require('should');
var loggerConfig = process.env.ISLOG || 'yes';
var timeoutTime = process.env.TIMEOUT || 15000;
function logger(err, res, body, registerUser) {
    if (loggerConfig == 'yes') {
        console.log("\n===============Log-Start=================");
        console.log("the random generate obj is: \n", registerUser);
        console.log("err", err);
        console.log("res.statusCode", res.statusCode);
        console.log("body", body);
        console.log("===============Log-End=================\n");
    }
}
function generateRandomRegisterUser() {
    var tempRegisterUser = registers[0];
    var randomData = Tool.randomNum();
    var registerUser = {
        password: tempRegisterUser.password,
        email: randomData.toString().concat(tempRegisterUser.email),
        username: randomData.toString().concat(tempRegisterUser.username)
    };
    return registerUser;
}
describe('# 用户登录', function(){
    this.timeout(timeoutTime);
    it('1.登录成功:should success login', function(done){
        var registerUser = generateRandomRegisterUser();
        Register.post({json: registerUser}, function (err, res, body) {
            should.not.exist(err);
            res.statusCode.should.equal(200);
            body.code.should.equal(0);
            var loginUser = {
                username: registerUser.email,
                password: registerUser.password,
                test: true
            };
            Login.post({json:loginUser}, function(err, res, body){
                logger(err, res, body, registerUser);
                should.not.exist(err);
                res.statusCode.should.equal(200);
                done();
            });
        });
    });
    it('2.登录失败：should fail login [email unexist]', function(done){
        var tempRegisterUser = registers[0];
        var randomData = Tool.randomNum();
        var loginUser = {
            username: randomData.toString().concat(tempRegisterUser.email),
            password: tempRegisterUser.password,
            test: true
        };
        Login.post({json:loginUser}, function(err, res, body){
            logger(err, res, body, loginUser);
            should.not.exist(err);
            res.statusCode.should.equal(500);
            res.body.code.should.equal(20013);
            done();
        });
    });
    it('3.登录失败:should fail login [wrong password]', function(done){
        var registerUser = generateRandomRegisterUser();
        Register.post({json: registerUser}, function (err, res, body) {
            should.not.exist(err);
            res.statusCode.should.equal(200);
            body.code.should.equal(0);
            var loginUser = {
                username: registerUser.email,
                password: registerUser.password.substring(0, registerUser.password.length-2),
                test: true
            };
            Login.post({json:loginUser}, function(err, res, body){
                logger(err, res, body, loginUser);
                should.not.exist(err);
                res.statusCode.should.equal(500);
                res.body.code.should.equal(20010);
                res.body.message.should.equal('密码错误');
                done();
            });
        });
    });
    it.skip('3.使用ID号登录:should success login by id', function(done){  // 因为这个username可能会被删掉，所以要skip
        var idUser = {
            username: '133382607',
            password: '123456',
            test: true
        };
        Login.post({json:idUser}, function(err, res, body){
            logger(err, res, body, idUser);
            should.not.exist(err);
            done();
        });
    });
});