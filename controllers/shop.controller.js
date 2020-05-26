require("dotenv").config();

var cloudinary = require("cloudinary").v2;
const shortid = require("shortid");

var Shop = require("../models/shop.model.js");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = async function(req, res) {
  var userId = req.params.id;
  
  var shop = await Shop.findOne({ userId: userId });
  
  if (!shop) {
     var shop = new Shop({
      userId: userId,
      books: []
    });
    
    shop.save(function (err, book) {
      if (err) return console.error(err);
      console.log("shop saved to bookstore collection.");
    });
  }
  
  var books = shop.books;
  
  res.render("shop/index", {
    books: books
  });
};

module.exports.create = function(req, res) {
  res.render("add");
};

module.exports.postCreate = function(req, res) {
//   var title = req.body.title;
//   var des = req.body.description;
//   var image = "https://29-my-shop.glitch.me/" + req.file.path.slice(7);

//   cloudinary.uploader.upload(image, function(error, result) {
//     console.log(result, error);
//     var book = new Book({
//       title: title,
//       description: des,
//       coverUrl: result.url
//     });
    
//     book.save(function (err, book) {
//       if (err) return console.error(err);
//       console.log(book.name + " saved to bookstore collection.");
//     });
//   });

  res.redirect("/shops/books");
};
