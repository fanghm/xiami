/**
 * Created by tsq on 14-6-27.
 */
var should = require('should');
var randomNum = require("../tool").randomNum;
describe('# test randomNum', function(){
    it('should success get randomNum', function(){
        var num = randomNum();
        console.log("num", num);
    });
});