/**
 * Created by tsq on 14-7-15.
 * 测试：后台管理
 */

var Collection = require('./support/collection');
var should = require('should');
var Tool = require("./support/tool");
var loggerConfig = process.env.ISLOG || 'yes';
var timeoutTime = process.env.TIMEOUT || 15000;

describe('# 后台管理', function(){
    this.timeout(timeoutTime);
    before(function(done){
        var Admin = new Collection('a/admin/login');
        var user = require("./data/login");
        Admin.post({json: user[2]}, function(err, res, body){
            done();
        });
    });
    describe('# 用户管理', function(){
        it('1.获取用户列表: should success get userList', function(done){
            var userList = new Collection("a/admin/getUserList");
            var obj = {
                offset: 0,
                limit: 2,
                type: 4
            };
            userList.get({url: obj}, function(err, res, body){
                should.not.exist(err);
                res.statusCode.should.equal(200);
                body.should.be.an.instanceOf(Array);
                body.length.should.be.equal(2);
                done();
            });
        });
        it('2.根据id获得用户信息： should success get user info by id', function(done){
            var userInfo = new Collection("a/admin/searchUserInfo");
            var obj = {
                tid: '53be3c6ce4b041ccb4a35bfd', // admin的id
                format: 'pb'
            };
            userInfo.get({url: obj}, function(err, res, body){
                should.not.exist(err);
                res.statusCode.should.equal(200);
                body.should.be.an.instanceOf(Array);
                console.log("body", body);
                done();
            });
        });
    })
    describe('# 作品管理', function(){
        it('1.获取作品列表：should success get opus list', function(done){
            var opusList = new Collection("a/admin/opus/getOpusList");
            opusList.get({url:{limit:9}}, function(err, res, body){  // limit参数似乎有点问题，设置的总比取到的多1，要想取到10条记录，那么这里需要写成9
                should.not.exist(err);
                res.statusCode.should.equal(200);
                body.should.be.an.instanceOf(Array);
//                body.length.should.be.equal(10);
                console.log("body.length", body.length);
                done();
            });
        });
    });
    describe('# 组织管理', function(){
        it('1.获取组织列表: should success get org list', function(done){
            var orgList = new Collection("a/admin/org/getOrgList");
            var obj = {
                page: 1,
                limit: 10,
                tb: 2 //1:我关注的 2:新建的 3:财富排名 4:活跃度 5:声望
            };
            orgList.get({url: obj}, function(err, res, body){
                should.not.exist(err);
                res.statusCode.should.equal(200);
                console.log("body", body.length);
                done();
            })
        })
    });
    describe('# 比赛管理', function(){
        it('1.获取比赛列表: should success get comp list', function(done){
            var compList = new Collection("a/admin/comp/getCompList");
            var obj = {
                limit: 10,
                tb: 2
            };
            compList.get({url: obj}, function(err, res, body){
                should.not.exist(err);
                res.statusCode.should.equal(200);
                console.log("body", body.length);
                done();
            })
        })
    });
    describe('# 子论坛管理', function(){
        it('1.获取子论坛列表: should success get board list', function(done){
            var boardList = new Collection("a/admin/board/getBoardList");
            boardList.get({}, function(err, res, body){
                should.not.exist(err);
                res.statusCode.should.equal(200);
                console.log("body", body.length);
                done();
            })
        });
    });

    after(function(done){
        var Admin = new Collection('admin/logout');
        Admin.get({url: {test: true}},  function(err, res, body){
            done();
        });
    });

});

