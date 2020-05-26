var db = require("../db");
var User = require("../models/user.model.js");

module.exports.authLogin = async function(req, res, next) {
    var cookie = req.signedCookies.userId;
  
    // var user = db.get("users").find({ id: cookie }).value();
    var user = await User.findById({ _id: cookie});
  
    // var user = User.findOne({ _id: cookie});
    console.log(res.locals.user, user);
    
    if (!cookie) {
      res.redirect('/auth/login');
      return;
    }
  
    next();
};