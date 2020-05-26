require("dotenv").config();

const shortid = require("shortid");
var db = require("../db");
var cloudinary = require("cloudinary").v2;

var Book = require("../models/book.model.js");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = function(req, res) {
  // try {
  //   var a; a.b();
  // } catch (err) {
  //   console.log(err);  
  //   res.send('<img style="width: 100%; height: 100%" src="https://bookve.com.vn/Assets/images/error/imgErr500.svg" />');
  //   return;
  // }
  
  Book.find().then(books => {
    res.render("book", {
      books: books
    });
  });
};

module.exports.add = function(req, res) {
  res.render("add");
};

module.exports.delete = function(req, res) {
  var id = req.params.id;
  
  Book.deleteOne({ _id: id }).then(result => {});

  res.redirect("back");
};

module.exports.update = function(req, res) {
  var id = req.params.id;
  res.render("update", {
    id: id
  });
};

module.exports.postAdd = function(req, res) {
  // var id = shortid.generate();
  var title = req.body.title;
  var des = req.body.description;
  var image = "https://25-mongoosee.glitch.me/" + req.file.path.slice(7);

  cloudinary.uploader.upload(image, function(error, result) {
    console.log(result, error);
    // db.get("books")
    //   .push({
    //     id: id,
    //     title: title,
    //     description: des,
    //     coverUrl: result.url
    //   })
    //   .write();
    var book = new Book({
      title: title,
      description: des,
      coverUrl: result.url
    });
    
    book.save(function (err, book) {
      if (err) return console.error(err);
      console.log(book.name + " saved to bookstore collection.");
    });
  });

  res.redirect("/books");
};

module.exports.postUpdate = function(req, res) {
  var id = req.params.id;
  var title = req.body.newTitle;
  
  // db
  //   .get("books")
  //   .find({ id: id })
  //   .value().title = title;
  
  Book.findByIdAndUpdate({ _id: id}, {title: title}).then(result => {});

  res.redirect("/books");
};
