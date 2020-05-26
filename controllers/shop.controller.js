require("dotenv").config();

var cloudinary = require("cloudinary").v2;

var Shop = require("../models/shop.model.js");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = async function(req, res) {
  var userId = req.params.id;
  var err;
  
  var shop = await Shop.findOne({ userId: userId });
 
  if (!shop.books) {
    err = 'No book in your shop!'
  }
  
  res.render("shop/index", {
    books: shop.books,
    err: err
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
