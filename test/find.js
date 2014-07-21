/**
 * Created by tsq on 14-7-21.
 * 测试controller中的find接口
 */

var Collection = require('./support/collection');
var should = require('should');


describe('# find接口（web端的首次请求）', function(){
    this.timeout(15000);
    it('1.查询成功', function(done){
        var Find = new Collection('artist');
        Find.get({url: {name: '王力宏'}}, function(err, res, body){
            should.not.exist(err);
            res.statusCode.should.equal(200);
//            console.log("body", body);
            done();
        });
    });
    it('1.查询失败，因为艺人名不存在,但会有推荐艺人', function(done){
        var Find = new Collection('artist');
        Find.get({url: {name: '久石让kkkk'}}, function(err, res, body){
            should.not.exist(err);
            res.statusCode.should.equal(404);
            body.msg.should.equal('您要找的是不是:久石让');
            done();
        });
    });
    it('1.查询失败，因为艺人名不存在, 但没有推荐艺人', function(done){
        var Find = new Collection('artist');
        Find.get({url: {name: '*****'}}, function(err, res, body){
            should.not.exist(err);
            res.statusCode.should.equal(404);
//            console.log("body", body);
            body.msg.should.equal('亲!你又淘气了,不要乱输哟!');
            done();
        });
    });

});


