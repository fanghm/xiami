/**
 * Created by tsq on 14-7-17.
 */
var req = require('request');
var fs = require("fs");
var async = require("async");
var cheerio = require('cheerio');
var tool = require("./tool");
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

var obj = {
    /**
     * 获取首页的html数据
     * @param
     * @returns 首页的html
     */
    getIndexHtml: function(name, callback){
        var name = tool.toUTF8(name);
        var url = 'http://www.xiami.com/search?key=' + name + '&pos=1';
        //req.get(url).pipe(fs.createWriteStream('xiami2.html'));
        req.get(url, function (e, r, b) {
//    console.log("b", b);
//    console.log("b", b);
            if (!e && r.statusCode == 200) {
                $ = cheerio.load(b);
                var text = $('span', '.search_box').text();
                if (/^您要找/.test(text)) {
                    var name = $('b', '.search_box').text();
//        console.log("name", name);
                    return callback({code: 404, msg: name}); // 未查到艺人后返回推荐的艺人名
//        return res.json();
                }
                var id = $('a', '.top_box').attr('href');
                if (id) {
                    var i1 = id.lastIndexOf('/');
                    var i2 = id.lastIndexOf('?');
                    var uid = id.substring(i1 + 1, i2); // 某个歌手的唯一uid
                    var avatar = $('img', '.top_box').attr('src');
                    var indexUrl = 'http://www.xiami.com' + id;
                    req.get(indexUrl, function (e1, r1, b1) {
                        if (!e1 && r1.statusCode == 200) {
                            return callback({code: 200, msg: b1, id: id, uid: uid, avatar: avatar});
                        } else {
                            return callback({code: 500, msg: 'getIndexHtml函数：根据url爬艺人主页有误'});
                        }

                    });
                } else {
                    return callback({code: 405, msg: '亲!你又淘气了,不要乱输哟!'});
                }
            } else {
                return callback({code: 500, msg: 'getIndexHtml函数：根据url爬网页有误'});
            }

        });
    },

    /**
     * 获取粉丝数和评论数
     * @param
     * @returns 包含粉丝数和评论数的对象
     */
    getAccount: function (html, callback) {
        $ = cheerio.load(html);
        var li = $('li', '.music_counts');
//        console.log("li", li);
//        console.log("li[1]", li[1]);
        var obj = {

        };
        /**
         * 获得试听数
         $.getJSON('/count/getplaycount',{'id':id,'type':'artist'},function(data){
         $('#play_count_num').html(data.plays);
         });
         */
        li.each(function (i, elem) { // li中第二个为粉丝数，第三个为评论数，第一个没有用，直接放在客户端发送ajax
            if (i != 0) {
//            console.log("$(this).text()", $(this).text());
                if (i == 1) {
                    var fans = $(this).text(); //需要拆分一下字符串
                    fans = fans.split('粉丝')[0]; // 获得数字部分
                    obj.fansCount = fans;
//                console.log("fans", fans);
                } else if (i == 2) {
                    var comment = $(this).text();
                    comment = comment.split('评论')[0];
                    obj.commentCount = comment;
//                console.log("comment", comment);
                }
            }

        });
//    console.log("obj", obj);
        return callback(obj);
    },

    /**
     * 获取最受欢迎歌曲列表
     * @param
     * @returns 包含列表的数组
     */
    getPopMusic: function (html, callback) {
        $ = cheerio.load(html);
        var arr = [];
        var table = $('tr', '.track_list');
        table.each(function (i, elem) {
            var obj = {};
            var td = $('td', this);
//        console.log("typeof td", typeof td);
            td.each(function (i1, elem1) {
                if (i1 == 2) {
                    var a = $('a', this);
                    obj.name = a.text();        // 获得歌曲的名字
                    obj.href = a.attr('href');  // 获取链接
//                console.log("$(this).text()", $(this).text());
                    arr.push(obj);
                }
            })

        });
//    console.log("arr", arr);
        return callback(arr);
    },

    /**
     * 获取相似的艺术家
     * @param
     * @returns 包含列表数组
     */
    getSimilarArtist: function (uid, callback) {
        var urlSimilarArtist = 'http://www.xiami.com/artist/similar/id/' + uid;
//    req.get(urlSimilarArtist).pipe(fs.createWriteStream('xiamiXiangSI.html'));
        req.get(urlSimilarArtist, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                $ = cheerio.load(b);
                var a = $('.artist', '#guess_artists');
                var arr = [];
                a.each(function (i, elem) {
                    var name = $('a', this).attr('title');
                    var href = $('a', this).attr('href');
                    var img = $('img', this).attr('src');
                    var obj = {
                        name: name,
                        href: href,
                        img: img
                    };
                    arr.push(obj)

                });
//            console.log("a.text()", a);
//            console.log("arr", arr);
//        console.log(b);
                return callback({code: 200, msg:arr});
            } else {
                return callback({code: 500, msg: 'getSimilarArtist:获取相似艺人出错'});
            }


        })
    },

    /**
     * 获取基本信息
     * @param
     * @returns 包含基本信息的对象
     */
    getBasicInfo: function (id, callback) {
        var urlBasicInfo = 'http://www.xiami.com/artist/profile/id/' + id;
//    req.get(urlBasicInfo).pipe(fs.createWriteStream('xiamiDangan.html'));
        req.get(urlBasicInfo, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                $ = cheerio.load(b);
                var desc = $('.profile').text();
//        console.log("desc", desc);
                return callback({code: 200, msg:desc});
            } else {
                return callback({code: 500, msg: 'getBasicInfo:获取艺人档案出错'});
            }

        })
    },

    /**
     * 获取用户评论
     * @param
     * @returns 包含列表数组
     */
    getComment: function (uid, page, callback) {
        var r = req.post('http://www.xiami.com/commentlist/turnpage/id/' + uid + '/page/' + page +'/ajax/1', function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            $ = cheerio.load(body);
            var div = $('.post_item', 'li');
            var arr = [];
            div.each(function (i, elem) {
                var src = $('img', this).attr('src');
                var author = $('.author', this).text();
                var time = $('.time', this).text();
                var comment = $('.brief', this).text().trim();
//            console.log("src", src);
//            console.log("author", author);
//            console.log("comment", comment);
//            console.log("time", time);
                var obj = {
                    name: author,
                    src: src,
                    content: comment,
                    time: time
                };
                arr.push(obj);

            });
//            console.log("arr", arr);
            callback(arr);
        });
        var form = r.form()
        form.append('type', 3)
    },

    /**
     * 获取专辑
     * @param
     * @returns 包含专辑的数组
     */
    getAlbum: function (uid, page, callback) {
        var page = page || 1;
        var urlGetAlbum = 'http://www.xiami.com/artist/album/id/' + uid + '/d//p//page/' + page;
        console.log("urlGetAlbum", urlGetAlbum);
//    req.get(urlGetAlbum).pipe(fs.createWriteStream('xiamiAlbum.html'));
        req.get(urlGetAlbum, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                $ = cheerio.load(b);
                var li = $('li', '.albumThread_list');
                var arr = [];
                if (li && li.length) {
                    li.each(function (i, elem) {
                        var albumPicSrc = $('img', this).attr('src');
                        var albumName = $('img', this).attr('alt');
                        var p = $('.company', this).text();
                        var albumCompany = $('');
                        var i1 = p.indexOf('唱片公司');
                        var i2 = p.indexOf('发行时间');
                        var i3 = p.indexOf('类别');
                        var albumCompany = p.substring(i1 + 5, i2).trim();
                        var publicTime = p.substring(i2 + 5, i3).trim();
                        var albumType = p.substring(i3 + 3).trim();
                        var albumDesc = $('.des', this).text();
                        var count = $('.counts', '.cate_viewmode').text();
                        var i4 = count.indexOf('张');
                        count = count.substring(1, i4);
                        var obj = {
                            albumPicSrc: albumPicSrc,
                            albumName: albumName,
                            albumCompany: albumCompany,
                            publicTime: publicTime,
                            albumType: albumType,
                            albumDesc: albumDesc,
                            count: count
                        };
                        arr.push(obj);
//            console.log("albumDesc", albumDesc);
//            console.log("albumTime", albumTime);
//            console.log("albumType", albumType);
//            console.log("albumCompany", albumCompany);
//            console.log("i1, i2, i3", i1, i2, i3);
//            console.log("p", p);
//            console.log("albumPicSrc", albumPicSrc);
//            console.log("albumName", albumName);
//            console.log("bigPircHref", bigPircHref);
//            var obj = {
//                bigPircHref: bigPircHref,
//                src: src
//            };
//            arr.push(obj);
                    });
//                    console.log("arr", arr);
                    return callback({code: 200, msg:arr});
//        console.log("p", p);
                } else {
                    return callback({code: 500, msg: 'getAlbum:获取艺人专辑出错'});
                }
            } else {
                return callback({code: 500, msg: 'getAlbum:获取艺人专辑出错'});
            }
        });
    },

    /**
     * 获取图片
     * @param
     * @returns 包含列表数组
     */
    getPic: function (id, page, callback) {
        //    var urlGetPic = 'http://www.xiami.com/artist/pic/arid/6845';
        var page = page || 1;
//        console.log("id", id);
//        console.log("page", page);
        var urlGetPic = 'http://www.xiami.com/artist/pic/arid/' + id + '/page/' + page;
//    req.get(urlGetPic).pipe(fs.createWriteStream('xiamiPic2.html'));
//        console.log("page", page);
//        console.log("urlGetPic", urlGetPic);
        req.get(urlGetPic, function (e, r, b) {
//            console.log("b", b);

            if (!e && r.statusCode == 200) {
                $ = cheerio.load(b);
                var p = $('li', '.photo_list');
//            console.log("p", p);
                var arr = [];
                p.each(function (i, elem) {
                    var bigPircHref = $('a', $('.cover', this)).attr('href');
                    var src = $('img', this).attr('src');
//            console.log("src", src);
//            console.log("bigPircHref", bigPircHref);
                    var obj = {
                        bigPircHref: bigPircHref,
                        src: src
                    };
                    arr.push(obj);
                });
//            console.log("arr", arr);
//        console.log("p", p);
                return callback({code: 200, msg:arr});
            } else {
                return callback({code: 500, msg: 'getPic:获取艺人图片出错'});
            }
        });
    },

    /**
     * 获取某张图片的大图
     * @param
     * @returns 包含大图的src
     */
    getBigPic: function (id, callback) {
        var urlGetBigPic = 'http://www.xiami.com/artist/pic-detail/pid/' + id;

//    req.get(urlGetBigPic).pipe(fs.createWriteStream('xiamiBigPic.html'));
        req.get(urlGetBigPic, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                $ = cheerio.load(b);
                var img = $('img', '.photo_main').attr('src');
                console.log("img", img);
                if (img) {
                    return callback({code: 200, msg:img});
                } else {
                    return callback({code: 500, msg: 'getBigPic:获取大图出错'});
                }

            }
            return callback({code: 500, msg: 'getBigPic:获取大图出错'});
        });
    }
};

module.exports = obj;
