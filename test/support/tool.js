/**
 * Created by tsq on 14-6-27.
 */
/**
 * 使用uuid生成随机数
 * @param end
 * @returns {number}
 */
var uuid = require("node-uuid");
var user = require("./../data/login");
var Collection = require('./collection');
var Login = new Collection('login');

exports.randomNum = function(){
    var num = uuid.v1();
    return num;
};
exports.logger = function(err, res, body, obj, loggerConfig){
    if (loggerConfig == 'yes') {
        console.log("\n===============Log-Start=================");
        console.log("the post obj is: \n", obj);
        console.log("err", err);
        console.log("res.statusCode", res.statusCode);
        console.log("body", body);
        console.log("===============Log-End=================\n");
    }
};
exports.userLogin = function(callback){
    Login.post({json: user[1]}, function(err, res, body){
        console.log("\n===============Login-Start===============");
        console.log("err", err);
        console.log("res.statusCode", res.statusCode);
        console.log("body", body);
        console.log("\n===============Login-END===============");
        callback(body.code);
    })
}