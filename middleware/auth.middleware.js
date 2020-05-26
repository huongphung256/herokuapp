var db = require("../db");
var User = require("../models/user.model.js");

module.exports.authLogin = function(req, res, next) {
    var cookie = req.signedCookies.userId;
  
    // var user = db.get("users").find({ id: cookie }).value();
    var user = User.findById({ _id: cookie}).then(result => res.locals.user = result);
    console.log(res.locals.user);
    
    if (!cookie) {
      res.redirect('/auth/login');
      return;
    }
  
    next();
};