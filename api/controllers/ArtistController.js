/**
 * ArtistController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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
    
  find: function(req, res){
      var name = req.query.name;
//      console.log("name", name);
      service.getIndexHtml(name, function(info){
//          console.log("info", info);
          if (info.code == 200) {
              service.getAccount(info.msg, function(account){
//                  console.log("account", account);
                  service.getPopMusic(info.msg, function(popMusic){
                      service.getComment(info.msg, info.uid, 1, function(comment){
//                          return res.json(comment);
                          service.getPic(info.uid, 1, function(pic){
                              return res.json(pic);
                          });
                      });
                  });
              });
          } else {
              return res.send('您要找的是不是:' + info.msg);
          }
      });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ArtistController)
   */
  _config: {}

  
};
