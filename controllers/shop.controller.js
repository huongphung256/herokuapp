module.exports.create = function(req, res) {
  res.render("add");
};

module.exports.postCreate = function(req, res) {
  var title = req.body.title;
  var des = req.body.description;
  var image = "https://29-my-shop.glitch.me/" + req.file.path.slice(7);

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
