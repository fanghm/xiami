/**
 * ArtistController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var tool = require("../services/tool");
var service = require("../services/request");
module.exports = {

    /**
     * 1.判断参数name是否存在，不存在就直接return
     * 2.先重数据库中查有没有当前name的数据
     * 3.如果数据库查询的有值，就直接用数据库中的值
     * 4.没有查到就去爬虾米网
     * @param req
     * @param res
     */
    find: function (req, res) {
        var name = req.query.name;
        if (!name) {
            return res.send(401, {msg: '查询名字为空'});
        }
//      console.log("name", name);
        Artist.findByName(name).done(function(err, result){
            if (err) {
                return res.send(500, {msg: '根据name查艺人资料，数据库返回有误.'});
            }
            if (result.length) {    // 数据库中没有查到
                var a = result[0];  // 需要取0，因为返回的是一个数组
                var obj = {
                    uid: a.uid,             // 艺人的标识id
                    name: a.name,           // 艺人的名字
                    popMusic: a.popMusic,   // 艺人最受欢迎的歌曲
                    comment: a.comment,     // 用户对此艺人的评论
                    account: a.account,     // 艺人的粉丝数等
                    avatar: a.avatar        // 艺人的头像
                };
                req.session.user = {        // 将uid放入session中供其他查询使用。
                    uid: a.uid
                };
                console.log("从数据库中查到此人:");
                return res.json(200, obj);
            } else {
                console.log("数据库中没有此人");
                service.getIndexHtml(name, function (info) {    // 获取根据关键字获取到的html
//          console.log("info", info);
                    var obj = {};
                    if (info.code == 200) {
                        service.getAccount(info.msg, function (account) {
//                  console.log("account", account);
                            req.session.user = {
                                uid: info.uid
                            };
                            obj.account = account;
                            service.getPopMusic(info.msg, function (popMusic) {
                                obj.popMusic = popMusic;
                                service.getComment(info.msg, info.uid, 1, function (comment) {
                                    obj.comment = comment;
                                    obj.uid = info.uid;
                                    obj.name = name;
                                    obj.avatar = info.avatar;
//                            console.log("obj", obj);

                                    Artist.create(obj, function(err, result){
                                        return res.json(obj);
                                    });
                                });
                            });
                        });
                    } else if (info.code == 404){
                        return res.json(404, {msg: '您要找的是不是:' + info.msg})
                    } else if (info.code == 405) {
                        return res.json(404, {msg: info.msg})
                    }
                });
            }
        });
    },

    getBasicInfo: function (req, res) {
        if (!req.session.user) {
            return res.send(500);
        }
        var uid = req.session.user.uid;
        service.getBasicInfo(uid, function (info) {
            if (info.code == 200) {
                Artist.update({uid: uid}, {basicInfo: info}, function(err, result){
                    if (err) {
                        return res.send(500);
                    } else {
                        res.json({msg: info.msg});
                    }
                });
            } else {
                console.log("info.msg", info.msg);
                return res.send(500);
            }

        });
    },

    getSimilarArtist: function (req, res) {
        if (!req.session.user) {
            return res.send(500);
        }
        var uid = req.session.user.uid;
        console.log("uid", uid);
        Artist.findByUid(uid).done(function(err, result){
            if (err) {
                console.log("getSimilarArtist:数据库查询出错");
                return res.send(500);
            } else {
                var a = result[0];
                if (a.similarArtist) { // 数据库有存档
                    res.json(a.similarArtist);
                } else {
                    service.getSimilarArtist(uid, function (info) {
                        if (info.code == 200) {
                            Artist.update({uid: uid}, {similarArtist: info.msg}, function(err, result){
                                if (err) {
                                    console.log("getSimilarArtist:数据库更新出错");
                                    return res.send(500);
                                } else {
                                    res.json(info.msg);
                                }
                            });
                        } else {
                            console.log("info.msg", info.msg);
                            return res.send(500);
                        }
                    });
                }
            }

        })

    },

    getArtistPics: function (req, res) {
        if (!req.session.user) {
            return res.send(500);
        }
        var page = req.query.page || 1;
        var uid = req.session.user.uid;
        Artist.findByUid(uid).done(function(err, result){
            if (err) {
                console.log("getArtistPics:数据库查询出错");
                return res.send(500);
            } else {
                var a = result[0];
                if (a.picture&& a.picture[page]) { // 数据库有存档
                    console.log("直接从数据库中获取艺人图片");
                    res.json(a.picture[page]);
                } else {                           // 数据库中没有直接去爬
                    service.getPic(uid, page, function (info) {
                        console.log("爬来的图片");
                        if (info.code == 200) {
                            Artist.findByUid(uid).done(function(err1, artist){
                                if (err1) {
                                    console.log("getArtistPics:数据库查询2出错");
                                    return res.send(500);
                                } else {
//                                    console.log("artist", artist);
                                    var b = artist[0];
                                    if (!b.picture) {
                                        b.picture = {};
                                    }
                                    b.picture[page] = info.msg;
                                    b.save(function(err2, result){
                                        if (err2) {
                                            console.log("getArtistPics:数据库更新出错");
                                            return res.send(500);
                                        } else {
                                            res.json(info.msg);
                                        }
                                    });
                                }
                            });
                        } else {
                            console.log("info.msg", info.msg);
                            return res.send(500);
                        }
                    });
                }
            }
        });

    },

    getAlbum: function (req, res) {
        if (!req.session.user) {
            return res.send(500);
        }
        var page = req.query.page || 1;
        var uid = req.session.user.uid;
        console.log("uid, page", uid, page);

        Artist.findByUid(uid).done(function(err, result){
            if (err) {
                console.log("getAlbum:数据库查询出错");
                return res.send(500);
            } else {
                var a = result[0];
                if (a.album&& a.album[page]) { // 数据库有存档
                    console.log("直接从数据库中获取艺人专辑");
                    res.json(a.album[page]);
                } else {                           // 数据库中没有直接去爬
                    service.getAlbum(uid, page, function (info) {
                        console.log("爬来的专辑");
                        if (info.code == 200) {
                            Artist.findByUid(uid).done(function(err1, album){
                                if (err1) {
                                    console.log("getAlbum:数据库查询2出错");
                                    return res.send(500);
                                } else {
//                                    console.log("artist", artist);
                                    var b = album[0];
                                    if (!b.album) {
                                        b.album = {};
                                    }
                                    b.album[page] = info.msg;
                                    b.save(function(err2, result){
                                        if (err2) {
                                            console.log("getAlbum:数据库更新出错");
                                            return res.send(500);
                                        } else {
                                            res.json(info.msg);
                                        }
                                    });
                                }
                            });
                        } else {
                            console.log("info.msg", info.msg);
                            return res.send(500);
                        }
                    });
                }
            }
        });
    },

    getBigPic: function (req, res) { // 大图就不存入数据库了，直接爬。
        var id = req.query.id;
        if (!id) {
            return res.send(500);
        }
        service.getBigPic(id, function (info) {
            if (info.code == 200) {
                return res.send(info.msg);
            } else {
                console.log('获取大图失败');
                return res.send(500);
            }
        });
    },
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to ArtistController)
     */
    _config: {}


};
