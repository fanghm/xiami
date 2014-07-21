/**
 * Created by tsq on 14-7-21.
 * 依赖session的查询
 */
var Collection = require('./support/collection');
var should = require('should');

describe('# 依赖session的查询', function(){
    this.timeout(15000);
    before(function(done){   // 创造session.user
        var Find = new Collection('artist');
        Find.get({url: {name: '王力宏'}}, function(err, res, body){
            should.not.exist(err);
            res.statusCode.should.equal(200);
            done();
        });
    });
    it('1.成功获取艺人档案', function(done){
        var GetBasicInfo = new Collection('artist/getBasicInfo');
        GetBasicInfo.get({}, function(err, res, body){
            should.not.exist(err);
            res.statusCode.should.equal(200);
//            console.log("body", body);
            done();
        });
    });
    it('1.成功获取相似艺人', function(done){
        var GetSimilarArtist = new Collection('artist/getSimilarArtist');
        GetSimilarArtist.get({}, function(err, res, body){
            should.not.exist(err);
            res.statusCode.should.equal(200);
//            console.log("body", body);
            done();
        });
    });
    it('1.成功获取艺人图片', function(done){
        var GetArtistPics = new Collection('artist/getArtistPics');
        GetArtistPics.get({url:{page:2}}, function(err, res, body){
            should.not.exist(err);
            res.statusCode.should.equal(200);
//            console.log("body", body);
            done();
        });
    });
    it('1.成功获取艺人专辑', function(done){
        var GetAlbum = new Collection('artist/getAlbum');
        GetAlbum.get({url:{page:1}}, function(err, res, body){
            should.not.exist(err);
            res.statusCode.should.equal(200);
            console.log("body", body);
            done();
        });
    });
    it('1.成功获取图片的大图', function(done){
        var GetBigPic = new Collection('artist/getBigPic');
        GetBigPic.get({url:{id:'23302'}}, function(err, res, body){
            should.not.exist(err);
            res.statusCode.should.equal(200);
            console.log("body", body);
            done();
        });
    });


});