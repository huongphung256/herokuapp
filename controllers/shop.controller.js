require("dotenv").config();

var cloudinary = require("cloudinary").v2;
const shortid = require("shortid");

var Shop = require("../models/shop.model.js");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = function(req, res) {
  var userId = req.params.id;

  Shop.findOne({ userId: userId }).then(result => {
    if (!result) {
      var shop = new Shop({
        userId: userId,
        books: []
      });
      shop.save(function(err, book) {
        if (err) return console.error(err);
        console.log("shop saved to bookstore collection.");
      });
    }

    console.log(result.books);

    res.render("shop/index", {
      books: result.books
    });
  });
};

module.exports.create = function(req, res) {
  res.render("add");
};

module.exports.postCreate = function(req, res) {
  var title = req.body.title;
  var des = req.body.description;
  var image = "https://29-my-shop.glitch.me/" + req.file.path.slice(7);

  cloudinary.uploader.upload(image, function(error, result) {
    // console.log(result, error);

    var book = [
      {
        id: shortid.generate(),
        title: title,
        description: des,
        coverUrl: result.url
      }
    ];

    Shop.findOneAndUpdate(
      { userId: res.locals.userId },
      { $push: { books: book } },
      function(err, result) {}
    );
  });

  res.redirect("/shops/" + res.locals.userId + "/books");
};
