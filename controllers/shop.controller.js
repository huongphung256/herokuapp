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
    console.log(result, error);
    var book = {
      id: shortid.generate(),
      title: "Không gia đình",
      description: "Câu chuyện về tình thương giữa 2 con người lạ lẫm",
      coverUrl: "https://cdn.glitch.com/a0fd4135-1b04-45e7-b0fd-e9aac260f6c1%2F4e598e29-e292-417e-955e-99facd76ce55.image.png?v=1589525573393"
    };
    
    Shop.findOneAndUpdate({ userId: res.locals.userId }, book);
  }

//   cloudinary.uploader.upload(image, function(error, result) {
//     console.log(result, error);
//     // var book = {
//     //   id: shortid.generate(),
//     //   title: "Không gia đình",
//     //   description: "Câu chuyện về tình thương giữa 2 con người lạ lẫm",
//     //   coverUrl: "https://cdn.glitch.com/a0fd4135-1b04-45e7-b0fd-e9aac260f6c1%2F4e598e29-e292-417e-955e-99facd76ce55.image.png?v=1589525573393" 
//     // };
    
// //     book.save(function (err, book) {
// //       if (err) return console.error(err);
// //       console.log(book.name + " saved to bookstore collection.");
// //     });
// //   });
  
//     // Shop.findOneAndUpdate({ userId: res.locals.userId }, book);
//   }

  res.redirect("/shops/books");
};
